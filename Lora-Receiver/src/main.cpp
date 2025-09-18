#include <SPI.h>
#include <LoRa.h>

// LoRa pins
#define SS   5
#define RST  14
#define DIO0 2

void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println("===== LoRa Receiver SPI Debug =====");

  // Check if SPI pins are set correctly
  Serial.println("Configuring LoRa pins...");
  Serial.print("SS="); Serial.println(SS);
  Serial.print("RST="); Serial.println(RST);
  Serial.print("DIO0="); Serial.println(DIO0);

  LoRa.setPins(SS, RST, DIO0);

  // Pulse RESET pin
  Serial.println("Pulsing RESET pin...");
  pinMode(RST, OUTPUT);
  digitalWrite(RST, LOW);
  delay(100);
  digitalWrite(RST, HIGH);
  delay(100);

  // Test SPI bus manually
  Serial.println("Testing SPI bus with LoRa module...");
  SPI.begin(); // Initialize SPI
  uint8_t version = 0;
  // Read LoRa version register (address 0x42 = RegVersion)
  digitalWrite(SS, LOW);
  SPI.transfer(0x42 & 0x7F); // read command
  version = SPI.transfer(0x00); // read value
  digitalWrite(SS, HIGH);

  Serial.print("LoRa RegVersion = 0x");
  Serial.println(version, HEX);

  if (version == 0x00 || version == 0xFF) {
    Serial.println("ERROR: SPI communication failed! Check wiring, voltage, or module.");
  } else {
    Serial.println("SPI communication OK. Trying LoRa.begin()...");
    if (!LoRa.begin(433E6)) {
      Serial.println("ERROR: LoRa.begin() failed!");
      Serial.println("Check wiring, module power, frequency, and SPI connections.");
      Serial.print("LoRa RegVersion read earlier: 0x"); Serial.println(version, HEX);
      while (1);
    } else {
      Serial.println("LoRa Receiver Started successfully!");
    }
  }
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    Serial.print("Packet received, size=");
    Serial.println(packetSize);
    Serial.print("Data: ");
    while (LoRa.available()) {
      Serial.print((char)LoRa.read());
    }
    Serial.print(" | RSSI: ");
    Serial.println(LoRa.packetRssi());
  }
  delay(100);
}
