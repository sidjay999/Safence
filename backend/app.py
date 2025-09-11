"""
FastAPI Backend for ESP32 Alert System
Handles heartbeat, tamper, and critical alerts with Twilio SMS notifications
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from twilio.rest import Client
from datetime import datetime
import os
import logging
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="ESP32 Alert System API",
    description="Receives alerts from ESP32 and sends SMS notifications for critical events",
    version="1.0.0"
)

# Pydantic models for request/response validation
class AlertRequest(BaseModel):
    type: str  # "INFO", "HIGH", "CRITICAL"
    message: str

class StatusResponse(BaseModel):
    last_heartbeat: Optional[str] = None
    last_tamper: Optional[str] = None
    last_critical: Optional[str] = None
    system_status: str

class HealthResponse(BaseModel):
    status: str
    timestamp: str

# In-memory storage for alert timestamps
alert_storage = {
    "last_heartbeat": None,
    "last_tamper": None,
    "last_critical": None
}

# Twilio configuration from environment variables
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER")  # Your Twilio phone number
ALERT_TO_NUMBER = os.getenv("ALERT_TO_NUMBER")        # Recipient phone number

# Initialize Twilio client (only if credentials are provided)
twilio_client = None
if all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ALERT_TO_NUMBER]):
    try:
        twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        logger.info("Twilio client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Twilio client: {e}")
else:
    logger.warning("Twilio credentials not found. SMS notifications disabled.")

def send_sms_alert(message: str) -> bool:
    """
    Send SMS alert using Twilio
    Returns True if successful, False otherwise
    """
    if not twilio_client:
        logger.warning("Twilio not configured - SMS alert not sent")
        return False
    
    try:
        message_obj = twilio_client.messages.create(
            body=f"🚨 SECURITY ALERT: {message}",
            from_=TWILIO_FROM_NUMBER,
            to=ALERT_TO_NUMBER
        )
        logger.info(f"SMS sent successfully: {message_obj.sid}")
        return True
    except Exception as e:
        logger.error(f"Failed to send SMS: {e}")
        return False

@app.post("/alerts")
async def receive_alert(alert: AlertRequest):
    """
    Receive alerts from ESP32
    Processes heartbeat, tamper, and critical alerts
    """
    try:
        current_time = datetime.now().isoformat()
        alert_type = alert.type.upper()
        
        logger.info(f"Received {alert_type} alert: {alert.message}")
        
        # Process different alert types
        if alert_type == "INFO":
            # Heartbeat - just update timestamp
            alert_storage["last_heartbeat"] = current_time
            logger.info("Heartbeat received - system alive")
            
        elif alert_type == "HIGH":
            # Tamper alert - update timestamp and send SMS
            alert_storage["last_tamper"] = current_time
            logger.warning(f"TAMPER ALERT: {alert.message}")
            
            # Send SMS notification
            sms_sent = send_sms_alert(f"TAMPER: {alert.message}")
            
        elif alert_type == "CRITICAL":
            # Critical alert - update timestamp and send SMS
            alert_storage["last_critical"] = current_time
            logger.error(f"CRITICAL ALERT: {alert.message}")
            
            # Send SMS notification
            sms_sent = send_sms_alert(f"CRITICAL: {alert.message}")
            
        else:
            # Unknown alert type
            logger.warning(f"Unknown alert type received: {alert_type}")
            raise HTTPException(status_code=400, detail=f"Unknown alert type: {alert_type}")
        
        return {"status": "ok", "message": "Alert processed successfully"}
        
    except Exception as e:
        logger.error(f"Error processing alert: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/status", response_model=StatusResponse)
async def get_system_status():
    """
    Get current system status including last alert timestamps
    """
    try:
        # Determine system status based on recent heartbeat
        system_status = "unknown"
        if alert_storage["last_heartbeat"]:
            last_heartbeat = datetime.fromisoformat(alert_storage["last_heartbeat"])
            time_since_heartbeat = (datetime.now() - last_heartbeat).total_seconds()
            
            if time_since_heartbeat < 30:  # Heartbeat every 10s, allow 30s tolerance
                system_status = "online"
            else:
                system_status = "offline"
        
        return StatusResponse(
            last_heartbeat=alert_storage["last_heartbeat"],
            last_tamper=alert_storage["last_tamper"],
            last_critical=alert_storage["last_critical"],
            system_status=system_status
        )
        
    except Exception as e:
        logger.error(f"Error getting system status: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Simple health check endpoint for monitoring
    """
    return HealthResponse(
        status="ok",
        timestamp=datetime.now().isoformat()
    )

@app.get("/")
async def root():
    """
    Root endpoint with basic API information
    """
    return {
        "message": "ESP32 Alert System API",
        "version": "1.0.0",
        "endpoints": {
            "POST /alerts": "Receive alerts from ESP32",
            "GET /status": "Get system status",
            "GET /health": "Health check",
            "GET /docs": "API documentation"
        }
    }

# Add startup event to log configuration
@app.on_event("startup")
async def startup_event():
    """
    Log startup information
    """
    logger.info("ESP32 Alert System API starting up...")
    logger.info(f"Twilio SMS enabled: {'Yes' if twilio_client else 'No'}")
    if twilio_client:
        logger.info(f"SMS alerts will be sent to: {ALERT_TO_NUMBER}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)