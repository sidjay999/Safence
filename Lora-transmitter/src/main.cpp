#include <Arduino.h>
#include <LoRa.h>

// --- pins ---
const int FENCE_IN = 34;   // input
const int SIM_OUT  = 25;   // output for simulation
const int LORA_SS = 5;
const int LORA_RST = 14;
const int LORA_DIO0 = 2;

// classification thresholds
const unsigned long MIN_PULSE_GAP = 800;  // ms, legal energizer pulses ~1s apart
const unsigned long MAX_PULSE_GAP = 1200;

unsigned long lastPulse = 0;
bool lastState = LOW;

// choose mode here:
enum Mode {LEGAL_PULSE, ILLEGAL_DC, ILLEGAL_AC};
Mode simMode = LEGAL_PULSE; // change to test

void setup() {
  Serial.begin(115200);
  pinMode(FENCE_IN, INPUT);
  pinMode(SIM_OUT, OUTPUT);

  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (true);
  }
  Serial.println("LoRa init OK");
}

// generates signal on SIM_OUT depending on simMode
void generateFenceSignal() {
  static unsigned long lastToggle = 0;
  unsigned long now = millis();

  switch(simMode) {
    case LEGAL_PULSE:
      // short HIGH pulse every 1s
      if (now - lastToggle > 1000) {
        digitalWrite(SIM_OUT, HIGH);
        delay(10); // 10 ms pulse
        digitalWrite(SIM_OUT, LOW);
        lastToggle = now;
      }
      break;

    case ILLEGAL_DC:
      digitalWrite(SIM_OUT, HIGH); // constant HIGH = DC
      break;

    case ILLEGAL_AC:
      if (now - lastToggle > 10) { // ~50 Hz toggle
        digitalWrite(SIM_OUT, !digitalRead(SIM_OUT));
        lastToggle = now;
      }
      break;
  }
}

void loop() {
  generateFenceSignal();

  bool val = digitalRead(FENCE_IN);

  // detect rising edge
  if (val == HIGH && lastState == LOW) {
    unsigned long now = millis();
    unsigned long gap = now - lastPulse;
    lastPulse = now;

    String status;
    if (gap >= MIN_PULSE_GAP && gap <= MAX_PULSE_GAP) {
      status = "OK (legal pulse)";
    } else {
      status = "ALERT: Illegal fence pattern";
    }

    // send via LoRa
    LoRa.beginPacket();
    LoRa.print("Gap=");
    LoRa.print(gap);
    LoRa.print("ms ");
    LoRa.print(status);
    LoRa.endPacket();

    Serial.print("Gap=");
    Serial.print(gap);
    Serial.print("ms ");
    Serial.println(status);
  }

  lastState = val;
}

