#include <Arduino.h>
#include <LoRa.h>

const int LORA_SS = 5;
const int LORA_RST = 14;
const int LORA_DIO0 = 2;

void setup() {
  Serial.begin(115200);
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  LoRa.begin(433E6); // same frequency
  Serial.println("LoRa Receiver Ready");
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String msg = "";
    while (LoRa.available()) msg += (char)LoRa.read();
    Serial.println("Received: " + msg);
  }
}

