
//Include Libraries
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>


//create an RF24 object
RF24 radio(7, 8);  // CE, CSN

//address through which two modules communicate.
const byte address[6] = "00001";

void setup()
{
  while (!Serial);
    Serial.begin(9600);
  
  radio.begin();
  
  //set the address
  radio.openReadingPipe(0, address);
  
  //Set module as receiver
  radio.startListening();
}
void loop()
{
  //Read the data if available in buffer
  if (radio.available())
  {
    Serial.println("Working...");
    char text[32] = {0};
    radio.read(&text, sizeof(text));
    Serial.println(text);
  } 

}

//#include <SPI.h>
//#include <nRF24L01.h>
//#include <printf.h>
//#include <RF24.h>
//#include <RF24_config.h>
//#include <stdio.h>
//#include <stdlib.h>
//#include <limits.h>
//#include <stdbool.h>
//
//#define CE_PIN 9
//#define CS_PIN 10 
//#define RANGE 50
//#define VM 6
//
//RF24 radio(CE_PIN, CS_PIN); //Initialise Radio object
//
//void setup() {  
//  Serial.begin(9600);
//
//  pinMode(CE_PIN, OUTPUT);
//  pinMode(CS_PIN, OUTPUT);  
//  pinMode(VM, OUTPUT);
//  
//  if (!radio.begin()) {
//    Serial.println(F("radio hardware not responding!"));
//    while (1) {} // hold program in infinite loop to prevent subsequent errors
//  } 
//  
//  uint8_t addresses[][6] = {"1Node"};
//  radio.openReadingPipe(1, addresses[0]);
//  radio.startListening();
//}
//
//int data = malloc(sizeof(int));
//
//void loop() {  
//  if(radio.available()){
//    radio.read(&data, sizeof(data));
//
//    if(data <= RANGE && data > 0)
//    {
//      ActivateVM(data);
//      Serial.println(data);
//    } else {
//      DeActivateVM();
//    }
//  }
//}
//
////Procedures for Vibrating Motor
//
//void ActivateVM(int d){
//  int data = map(d, RANGE, 0, 0, 255);
//  analogWrite(VM, data);
//}
//
//void DeActivateVM(){
//  analogWrite(VM, 0);
//}
