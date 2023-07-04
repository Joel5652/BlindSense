DROP DATABASE IF EXISTS BlindSense;
CREATE DATABASE BlindSense;
USE BlindSense;

CREATE TABLE Users (
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
    UserID varchar(255) NOT NULL UNIQUE, /* Primary key */
    EncodedPassword varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE Devices (
	DeviceID int NOT NULL UNIQUE,
    DeviceName varchar(255)
);

CREATE TABLE UserDevices ( /* Compound Key Table */
	ID int NOT NULL,
	UserID varchar(255) NOT NULL, 
    DeviceID int NOT NULL,
    FOREIGN KEY (ID) REFERENCES Users(ID),
    FOREIGN KEY (DeviceID) REFERENCES Devices(DeviceID)
);


