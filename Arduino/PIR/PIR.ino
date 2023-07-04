int PIR = 2;
int VM = 10;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(PIR, INPUT);
  pinMode(VM, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int Value = digitalRead(PIR);

  if(Value == 1){
    Serial.println("Detected");
    Serial.println(Value);

    int Data = pulseIn(PIR, HIGH);
    
    
  }
  
  
}
