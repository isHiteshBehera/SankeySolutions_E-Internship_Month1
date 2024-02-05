
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    UserType VARCHAR(20) NOT NULL 
);

CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    ContactNumber VARCHAR(15),
    Address VARCHAR(100),
    AdmissionDate DATE,
    DischargeDate DATE
);

CREATE TABLE Diagnosis (
    DiagnosisID INT PRIMARY KEY,
    PatientID INT,
    UserID INT,
    DiagnosisDate DATE,
    DiagnosisDescription TEXT,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Bill (
    BillID INT PRIMARY KEY,
    PatientID INT,
    UserID INT,
    BillDate DATE,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    PaymentStatus VARCHAR(20) DEFAULT 'Unpaid',A
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


SHOW TABLES;

INSERT INTO Users (UserID, Username, Password, UserType)
VALUES (1, 'admin', 'adminpass', 'Admin');

INSERT INTO Users (UserID, Username, Password, UserType)
VALUES (2, 'doctor1', 'docpass1', 'Doctor');

INSERT INTO Users (UserID, Username, Password, UserType)
VALUES (3, 'nurse1', 'nursepass1', 'Nurse');

SELECT * FROM Users;


INSERT INTO Patients (PatientID, FirstName, LastName, DateOfBirth, Gender, ContactNumber, Address, AdmissionDate, DischargeDate)
VALUES
    (1, 'John', 'Snow', '1980-05-15', 'Male', '123-456-7890', '123 Main St, City', '2024-02-01', '2024-02-10'),
    (2, 'Jane', 'Doe', '1992-08-22', 'Female', '987-654-3210', '456 Oak St, Town', '2024-02-03', NULL),
    (3, 'Mike', 'Tyson', '1975-12-10', 'Male', '555-123-4567', '789 Pine St, Village', '2024-02-05', NULL);

SELECT * FROM Patients;
