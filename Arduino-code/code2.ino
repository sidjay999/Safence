#include <SPI.h>
#include <LoRa.h>

#define SS   5
#define RST  14
#define DIO0 2

void setup() {
  Serial.begin(115200);
  while (!Serial);

  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(433E6)) {  
    Serial.println("LoRa init failed. Check wiring.");
    while (1);
  }
  Serial.println("LoRa transmitter ready");
}

void loop() {

  float latitude  = 10.123456;
  float longitude = 76.543210;

  Serial.print("Sending packet: Illegal Fence detected at ");
  Serial.print(latitude, 6);
  Serial.print(", ");
  Serial.println(longitude, 6);

  LoRa.beginPacket();
  LoRa.print("Illegal Fence detected at: ");
  LoRa.print(latitude, 6);
  LoRa.print(", ");
  LoRa.print(longitude, 6);
  LoRa.endPacket();

  delay(2000); // Send every 2 seconds
}
