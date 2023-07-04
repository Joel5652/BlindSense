int trigPin = 2; //Pin number for ultrasonic trigger pin 
int echoPin = 3; //Pin number for ultrasonic output pin
int VM = 10; //Vibrating motor pin

int RANGE = 100;

void setup() { //Set up GPIO pins
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin,INPUT);
  pinMode(VM, OUTPUT);
}

void loop() { //Main loop for system
  TriggerSensor();

  int Distance = DistanceCalc(pulseIn(echoPin, HIGH));
  
  if(Distance <= RANGE && Distance > 0){
    UnitConcat(Distance);
    ActivateVM(Distance);
  } else {
    DeActivateVM();
  }
}

//Functions

long DistanceCalc(long t){
  return (t * 0.034) / 2;
}

//Procedures

void ActivateVM(int d){
  int data = map(d, RANGE, 0, 10, 255);
  analogWrite(VM, data);
}

void DeActivateVM(){
  analogWrite(VM, 0);
}

void TriggerSensor(){
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
}

void UnitConcat(int d){
  Serial.print(d);
  Serial.println("cm"); 
}
