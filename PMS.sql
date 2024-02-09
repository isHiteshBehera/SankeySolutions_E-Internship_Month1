-- Create Jail Table
CREATE TABLE Jail (
    JailID INT PRIMARY KEY,
    JailName VARCHAR(255) NOT NULL,
    Location VARCHAR(255),
    Capacity INT,
    OpenedDate DATE,
    ClosedDate DATE
);

-- Create Jailer Table
CREATE TABLE Jailer (
    JailerID INT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Gender VARCHAR(10),
    EmploymentDate DATE,
    ContactNumber VARCHAR(15),
    JailID INT,
    FOREIGN KEY (JailID) REFERENCES Jail(JailID)
);


-- Create Cells Table
CREATE TABLE Cells (
    CellNumber INT PRIMARY KEY,
    Capacity INT,
    CurrentOccupancy INT,
    Status VARCHAR(20) DEFAULT 'Vacant' CHECK (Status IN ('Vacant', 'Occupied'))
);

-- Create Prisoners Table
CREATE TABLE Prisoners (
    PrisonerID INT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Gender VARCHAR(10),
    EntryDate DATE,
    ReleaseDate DATE,
    CrimeDescription TEXT,
    CellNumber INT,
    Status VARCHAR(20) DEFAULT 'Active' CHECK (Status IN ('Active', 'Released')),
    FOREIGN KEY (CellNumber) REFERENCES Cells(CellNumber)
);

-- Create Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(20) DEFAULT 'Staff' CHECK (Role IN ('Admin', 'Staff'))
);

-- Create Visitors Table
CREATE TABLE Visitors (
    VisitorID INT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    Gender VARCHAR(10),
    RelationshipToPrisoner VARCHAR(255),
    VisitationDate DATE,
    PrisonerID INT,
    FOREIGN KEY (PrisonerID) REFERENCES Prisoners(PrisonerID)
);


ALTER TABLE Cells
ADD COLUMN JailID INT,
ADD CONSTRAINT fk_cells_jail
FOREIGN KEY (JailID)
REFERENCES Jail(JailID);

ALTER TABLE Jailer
ADD CONSTRAINT fk_jailer_jail
FOREIGN KEY (JailID)
REFERENCES Jail(JailID);

ALTER TABLE Prisoners
ADD CONSTRAINT fk_prisoners_cells
FOREIGN KEY (CellNumber)
REFERENCES Cells(CellNumber);

ALTER TABLE Visitors
ADD CONSTRAINT fk_visitors_prisoners
FOREIGN KEY (PrisonerID)
REFERENCES Prisoners(PrisonerID);


INSERT INTO Cells (CellNumber, Capacity, CurrentOccupancy, Status)
VALUES (1, 10, 0, 'Vacant');

INSERT INTO Cells (CellNumber, Capacity, CurrentOccupancy, Status)
VALUES (2, 10, 0, 'Vacant');


INSERT INTO Prisoners (PrisonerID, FirstName, LastName, DateOfBirth, Gender, EntryDate, ReleaseDate, CrimeDescription, CellNumber, Status)
VALUES (1, 'John', 'Snow', '1990-05-15', 'Male', '2023-07-08', '2024-12-31', 'Theft', 1, 'Active');

INSERT INTO Prisoners (PrisonerID, FirstName, LastName, DateOfBirth, Gender, EntryDate, ReleaseDate, CrimeDescription, CellNumber, Status)
VALUES (2, 'Mike', 'Marklov', '1995-01-29', 'Male', '2023-12-08', '2024-10-31', 'Fraud', 1, 'Active');

INSERT INTO Prisoners (PrisonerID, FirstName, LastName, DateOfBirth, Gender, EntryDate, ReleaseDate, CrimeDescription, CellNumber, Status)
VALUES (3, 'Jane', 'Doe', '1996-01-29', 'Female', '2024-01-08', '2024-07-31', 'Fraud', 2, 'Active');


SELECT FirstName, LastName, CrimeDescription, EntryDate
FROM Prisoners;


-- Query to calculate days the Prisoners have been in the Cell
SELECT
    p.FirstName,
    p.LastName,
    p.CellNumber,
    TIMESTAMPDIFF(DAY, p.EntryDate, p.ReleaseDate) AS DaysInCell
FROM
    Prisoners p
WHERE
    p.ReleaseDate IS NOT NULL;
    
-- Create a new table from the output of the query
CREATE TABLE PrisonerDetails AS
SELECT
    Prisoners.FirstName,
    Prisoners.LastName,
    Prisoners.DateOfBirth AS PrisonerDOB,
    Prisoners.EntryDate,
    Prisoners.ReleaseDate,
    Prisoners.CrimeDescription,
    Cells.CellNumber,
    Cells.Capacity AS CellCapacity,
    Cells.CurrentOccupancy,
    Jail.JailName,
    Jail.Location
FROM
    Prisoners
JOIN
    Cells ON Prisoners.CellNumber = Cells.CellNumber
JOIN
    Jail ON Cells.JailID = Jail.JailID;

-- Show the newly created table
SELECT * FROM PrisonerDetails;

-- Create an index on the EntryDate column of the Prisoners table
CREATE INDEX idx_entry_date ON Prisoners(EntryDate);

-- Create an index on the CellNumber column of the Prisoners table
CREATE INDEX idx_prisoners_cell_number ON Prisoners(CellNumber);

-- Create an index on the JailID column of the Cells table
CREATE INDEX idx_cells_jail_id ON Cells(JailID);

-- Create an index on the Username column of the Users table
CREATE INDEX idx_users_username ON Users(Username);

CREATE TABLE DaysInCell (
    PrisonerID INT PRIMARY KEY,
    DaysInCell INT
);

DELIMITER //

CREATE PROCEDURE CalculateDaysInCell()
BEGIN
    DECLARE prisoner_id INT;
    DECLARE entry_date DATE;
    DECLARE release_date DATE;
    DECLARE days_in_cell INT;

    -- Cursor to iterate through prisoners
    DECLARE prisoner_cursor CURSOR FOR
        SELECT PrisonerID, EntryDate, ReleaseDate
        FROM Prisoners
        WHERE ReleaseDate IS NOT NULL;

    -- Variables for cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET prisoner_id = NULL;

    OPEN prisoner_cursor;

    -- Loop through prisoners
    prisoner_loop: LOOP
        FETCH prisoner_cursor INTO prisoner_id, entry_date, release_date;

        IF prisoner_id IS NULL THEN
            LEAVE prisoner_loop;
        END IF;

        -- Calculate days in cell
        SET days_in_cell = DATEDIFF(release_date, entry_date);

        -- Update or insert into DaysInCell table
        INSERT INTO DaysInCell (PrisonerID, DaysInCell)
        VALUES (prisoner_id, days_in_cell)
        ON DUPLICATE KEY UPDATE DaysInCell = days_in_cell;
    END LOOP;

    CLOSE prisoner_cursor;
END //

DELIMITER ;

/*
-- Alter the Visitors Table
ALTER TABLE Visitors
ADD COLUMN VisitStartTime DATETIME,
ADD COLUMN VisitEndTime DATETIME,
ADD COLUMN VisitOver BOOLEAN DEFAULT FALSE;

-- Trigger to update VisitOver column when the visitation time is over
DELIMITER //

CREATE TRIGGER UpdateVisitOver
BEFORE UPDATE ON Visitors
FOR EACH ROW
BEGIN
    IF NEW.VisitEndTime IS NOT NULL AND NEW.VisitEndTime < NOW() THEN
        SET NEW.VisitOver = TRUE;
    END IF;
END //

DELIMITER ;
*/

SHOW TABLES;
