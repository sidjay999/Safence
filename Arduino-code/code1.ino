#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_HMC5883_U.h>


Adafruit_HMC5883_Unified mag = Adafruit_HMC5883_Unified(12345);

const float coilRadius = 0.05;    
const int turns = 100;             
const float coilResistance = 10.0; 

const float mu0 = 4 * M_PI * 1e-7;

void setup() {
  Serial.begin(115200);

  if (!mag.begin()) {
    Serial.println("Magnetometer not detected. Check wiring!");
    while (1);
  }

  Serial.println("Magnetometer ready. Measuring magnetic field...");
}

void loop() {
  sensors_event_t event;
  mag.getEvent(&event);

  float B = sqrt(event.magnetic.x * event.magnetic.x +
                 event.magnetic.y * event.magnetic.y +
                 event.magnetic.z * event.magnetic.z) * 1e-6; 

  float current = (2 * coilRadius * B) / (mu0 * turns);

  float voltage = current * coilResistance;

  Serial.print("Magnetic Field: ");
  Serial.print(B, 9); 
  Serial.print(" T | Current: ");
  Serial.print(current, 3);
  Serial.print(" A | Voltage: ");
  Serial.print(voltage, 2);
  Serial.println(" V");

  delay(1000); // 1 second update
}
