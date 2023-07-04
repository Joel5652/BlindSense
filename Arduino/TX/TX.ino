
//Include Libraries
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7, 8);  // CE, CSN

//address through which two modules communicate.
const byte address[6] = "00001";

void setup()
{
  while (!Serial);
    Serial.begin(9600);
    
  radio.begin();
  
  //set the address
  radio.openWritingPipe(address);
  
  //Set module as transmitter
  radio.stopListening();
}

void loop()
{

  //Send message to receiver
  const char text[] = "Hello World";
  radio.write(&text, sizeof(text));
  delay(1000);
}

//
//RF24 radio(CE_PIN, CS_PIN);
//
//void setup() {
//  pinMode(trigPin, OUTPUT);
//  pinMode(echoPin,INPUT);
//  pinMode(CS_PIN, OUTPUT);
//  pinMode(CE_PIN, OUTPUT);
//  Serial.begin(9600);
//  if (!radio.begin()) {
//    Serial.println(F("radio hardware not responding!"));
//    while (1) {} // hold program in infinite loop to prevent subsequent errors
//  } 
//  uint8_t addresses[][6] = {"1Node"};
//  radio.openWritingPipe(addresses[0]);
//}
//
//void loop() {
//  TriggerSensor();
//
//  char* data = "hello";
//  
//  radio.write(&data, sizeof(data));
//  UnitConcat(data);    
//
//}
////Functions
//
//long DistanceCalc(long t){
//  return (t * 0.034) / 2;
//}
//
////Procedures
//
//void TriggerSensor(){
//  digitalWrite(trigPin, HIGH);
//  delayMicroseconds(10);
//  digitalWrite(trigPin, LOW);
//}
//
//void UnitConcat(char* d){
//  Serial.print(d);
//  Serial.println("cm"); 
//}
