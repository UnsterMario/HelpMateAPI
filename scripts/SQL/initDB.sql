DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS manager CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS purchase CASCADE;



DROP TABLE IF EXISTS Localisation CASCADE;

CREATE TABLE Localisation (
  localisationID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL
);

DROP TABLE IF EXISTS AppUser CASCADE;


CREATE TABLE AppUser  (
  userID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  lastName VARCHAR(50) NOT NULL CHECK (LENGTH(lastName) > 0),
  firstName VARCHAR(50) NOT NULL CHECK (LENGTH(firstName) > 0),
  telNumber VARCHAR(20) CHECK (LENGTH(telNumber) > 0) UNIQUE,
  mailAddress VARCHAR(255) CHECK (LENGTH(mailAddress) > 0) UNIQUE,
  userPassword VARCHAR NOT NULL CHECK (LENGTH(userPassword) > 0),
 -- Paypal ??????
  isAdmin BOOLEAN NOT NULL,
  isRestricted BOOLEAN NOT NULL,
  localisation INT,
  CONSTRAINT FK_AppUser_localisation FOREIGN KEY (localisation) REFERENCES Localisation(localisationID)
);

INSERT INTO AppUser (lastName,firstName,telNumber,mailAddress,userPassword,isAdmin,isRestricted)
VALUES ('John','Doe','0489675636','john@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ',true,false); --password


DROP TABLE IF EXISTS TypeService CASCADE;

CREATE TABLE TypeService (
  typeID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  typeName VARCHAR(25) NOT NULL CHECK( LENGTH(typeName)>0),
  typeDescription VARCHAR(250) NOT NULL CHECK( LENGTH(typeDescription)>0),
  imagePath VARCHAR(255) NOT NULL CHECK( LENGTH(imagePath)>0)
);


DROP TABLE IF EXISTS Service CASCADE;

CREATE TABLE Service (
  serviceID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  title VARCHAR(50) NOT NULL CHECK (LENGTH(title) > 0),
  serviceDescription VARCHAR(250) NOT NULL CHECK (LENGTH(serviceDescription)>0),
  requestDate DATE NOT NULL,
  executionDate DATE NOT NULL,
  statut VARCHAR(10) NOT NULL CHECK (statut IN ('disponible','indisponible')),
  authorUser INT NOT NULL,
  providerUser INT,
  serviceType INT NOT NULL,
  localisation INT NOT NULL,
  serviceTransaction INT,
  CONSTRAINT FK_Service_author FOREIGN KEY (authorUser) REFERENCES AppUser(userID),
  CONSTRAINT FK_Service_provider FOREIGN KEY (providerUser) REFERENCES AppUser(userID),
  CONSTRAINT FK_Service_type FOREIGN KEY (serviceType) REFERENCES TypeService(typeID),
  CONSTRAINT FK_Service_localisation FOREIGN KEY (localisation) REFERENCES Localisation(localisationID)
);



DROP TABLE IF EXISTS ServiceTransaction CASCADE;


-- Potentiel suppression de cette table si pas de payement 
CREATE TABLE ServiceTransaction (
  transactionID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  paymentMethod VARCHAR(15) NOT NULL CHECK (paymentMethod IN('Paypal','Portefeuille')),
  paymentDate TIMESTAMP NOT NULL,
  transactionStatus VARCHAR(20) NOT NULL CHECK (transactionStatus IN ('en cours', 'complété')),
  service INT NOT NULL,
  CONSTRAINT FK_Transaction_Service FOREIGN KEY (service) REFERENCES Service(serviceID)
);

-- Méthode circulaire afin d éviter une quelconque erreur
ALTER TABLE Service
ADD CONSTRAINT FK_Service_transaction FOREIGN KEY (serviceTransaction) REFERENCES ServiceTransaction(transactionID);


DROP TABLE IF EXISTS Conversation CASCADE;

CREATE TABLE Conversation (
  user1 INT NOT NULL,
  user2 INT NOT NULL,
  PRIMARY KEY (user1, user2),
  CONSTRAINT FK_Conversation_user1 FOREIGN KEY (user1) REFERENCES AppUser(userID),
  CONSTRAINT FK_Conversation_user2 FOREIGN KEY (user2) REFERENCES AppUser(userID),
  CONSTRAINT CHK_Conversation_Order CHECK (user1 < user2) 
);


DROP TABLE IF EXISTS Message CASCADE;

CREATE TABLE Message (
  messageID INT PRIMARY KEY,
  sendDate DATE NOT NULL,
  content VARCHAR(250) NOT NULL CHECK( LENGTH(content)>0),
  user1 INT NOT NULL,
  user2 INT NOT NULL,
  CONSTRAINT FK_Message_conversation FOREIGN KEY (user1, user2) REFERENCES Conversation(user1, user2),
  CONSTRAINT CHK_Message_Order CHECK (user1 < user2)
);

-- user1 < user2 pour fixer une règle et éviter les duplicatas