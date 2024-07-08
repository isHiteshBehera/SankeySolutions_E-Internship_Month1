
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
    PaymentStatus VARCHAR(20) DEFAULT 'Unpaid',
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

INSERT INTO Users (UserID, USername, Password, USerType)
VALUES (4, 'reception1', 'receptionpass', 'Receptionist');

SELECT * FROM Users;


INSERT INTO Patients (PatientID, FirstName, LastName, DateOfBirth, Gender, ContactNumber, Address, AdmissionDate, DischargeDate)
VALUES
    (1, 'John', 'Snow', '1980-05-15', 'Male', '123-456-7890', '123 Main St, City', '2024-02-01', '2024-02-10'),
    (2, 'Jane', 'Doe', '1992-08-22', 'Female', '987-654-3210', '456 Oak St, Town', '2024-02-03', NULL),
    (3, 'Mike', 'Tyson', '1975-12-10', 'Male', '555-123-4567', '789 Pine St, Village', '2024-02-05', NULL);

SELECT * FROM Patients;

-- Assuming you know the PatientID and UserID (Doctor ID) for the diagnosis

INSERT INTO Diagnosis (DiagnosisID, PatientID, UserID, DiagnosisDate, DiagnosisDescription)
VALUES 
    (1, 1, 2, '2024-02-15', 'Respiratory infection'),
    (2, 2, 2, '2024-02-15', 'Digestive infection');

SELECT * FROM Diagnosis;


SELECT *
FROM Patients
WHERE PatientID = 1;

INSERT INTO Bill (BillID, PatientID, UserID, BillDate, TotalAmount, PaymentStatus)
VALUES (1, 1, 4, CURRENT_DATE, 1000, 'Unpaid');

SELECT * FROM Bill;

SELECT
    Patients.PatientID,
    Patients.FirstName,
    Patients.LastName,
    Patients.DateOfBirth,
    Patients.Gender,
    Diagnosis.DiagnosisID,
    Diagnosis.DiagnosisDate,
    Diagnosis.DiagnosisDescription
FROM Patients
JOIN Diagnosis ON Patients.PatientID = Diagnosis.PatientID;


CREATE INDEX idx_diagnosis_patient ON Diagnosis (PatientID);


