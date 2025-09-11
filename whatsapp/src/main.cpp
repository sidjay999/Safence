#include <WiFi.h>
#include <HTTPClient.h>

// ---- Pin mapping ----
#define POT_PIN    35        // analog input simulating fence voltage
#define RELAY_PIN  23        // relay output
#define TAMPER_PIN 18        // push button for tamper

// ---- Config ----
const float SCALE     = 100.0; // scale factor for ADC reading
const float ALLOWED_V = 60.0;  // allowed fence voltage
bool relayState = true;        // relay status

// Wi-Fi credentials
const char* ssid     = "Wokwi-GUEST";
const char* password = "";
const char* serverURL = "http://webhook.site/36b16522-c523-4aa0-a00d-e9efa71d4fe8"; 

// ---- Heartbeat ----
unsigned long lastHeartbeat = 0;
const unsigned long HB_INTERVAL = 10000; // 10s for simulation

// ---- Function prototypes ----
void sendHttp(const String &type, const String &msg);

// ---- Setup ----
void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(TAMPER_PIN, INPUT_PULLUP);
  digitalWrite(RELAY_PIN, HIGH); // fence ON

  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
}

// ---- Main loop ----
void loop() {
  // --- Voltage Monitoring ---
  int adcValue = analogRead(POT_PIN);       
  float vInput = (adcValue / 4095.0) * 3.3; 
  float vFence = vInput * SCALE;            

  if (vFence > ALLOWED_V) {
    if (relayState) {
      relayState = false;
      digitalWrite(RELAY_PIN, LOW);
      Serial.println("!!!! High voltage detected! Fence disconnected.");
      sendHttp("CRITICAL", "Illegal high voltage detected. Fence cut off.");
    }
  } else {
    if (!relayState) {
      relayState = true;
      digitalWrite(RELAY_PIN, HIGH);
      Serial.println("Voltage safe. Fence reconnected.");
      sendHttp("INFO", "Fence reconnected, voltage safe.");
    }
  }
// hjj
  // --- Tamper Detection ---
  if (digitalRead(TAMPER_PIN) == LOW) {  // button pressed
    Serial.println("Tamper event detected!");
    sendHttp("HIGH", "Tamper detected on enclosure.");
    delay(1000); // debounce
  }

  // --- Heartbeat ---
  if (millis() - lastHeartbeat >= HB_INTERVAL) {
    sendHttp("INFO", "Heartbeat alive");
    lastHeartbeat = millis();
  }

  // Debug print
  Serial.print("ADC: "); Serial.print(adcValue);
  Serial.print("  V_fence: "); Serial.print(vFence); Serial.println(" V");
  delay(500);
}

// ---- HTTP helper ----
void sendHttp(const String &type, const String &msg) {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"type\":\"" + type + "\",\"message\":\"" + msg + "\"}";
    int httpCode = http.POST(payload);
    Serial.printf("HTTP [%s]: code=%d\n", type.c_str(), httpCode);
    http.end();
  } else {
    Serial.println("WiFi down. Cannot send HTTP alert.");
  }
}
