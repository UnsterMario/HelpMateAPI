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

INSERT INTO TypeService (typeName, typeDescription, imagePath)
VALUES
    ('Animaux', 'Garde d’animaux, visite à domicile, promenade de chien, toilettage.', 'paw'),
    ('Enfants', 'Garde d’enfants, régulier ou occasionnel.', 'child'),
    ('Jardinage', 'Tonte de pelouse, taillage d’arbustes et haies, aide de jardinage.', 'leaf'),
    ('Bricolage', 'Montage de meuble, petite rénovation, plomberie, pose de sol.', 'gavel'),
    ('Ménage', 'Nettoyage de maison, aide ménagère.', 'recycle'),
    ('Informatique', 'Aide logiciel, nettoyage d’ordinateur, installation de box.', 'laptop'),
    ('Cours particulier', 'Toutes les matières disponibles selon les professeurs.', 'graduation-cap'),
    ('Déménagement', 'Aide pour déménager ou emménager.', 'truck');



DROP TABLE IF EXISTS Service CASCADE;

CREATE TABLE Service (
                         serviceID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

                         title VARCHAR(50) NOT NULL CHECK (LENGTH(title) > 0),
                         serviceDescription VARCHAR(250) NOT NULL CHECK (LENGTH(serviceDescription)>0),
                         authorUser INT NOT NULL,
                         providerUser INT,
                         serviceType INT NOT NULL,
                         latitude FLOAT,
                         longitude FLOAT,
                         CONSTRAINT FK_Service_author FOREIGN KEY (authorUser) REFERENCES AppUser(userID),
                         CONSTRAINT FK_Service_provider FOREIGN KEY (providerUser) REFERENCES AppUser(userID),
                         CONSTRAINT FK_Service_type FOREIGN KEY (serviceType) REFERENCES TypeService(typeID)
);
-- Exemple 1: Service de Jardinage par Alice
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Coupe d arbre', 'Besoin de couper un arbre de 3m dans le fond de mon jardin', 1, 1, 1, 49.7008546, 5.4065261);

-- Exemple 2: Service d\'Animaux par Bob
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Garde d un chat', 'Besoin de nourrir mon chat 2x/j pendant 1 semaine', 1, 1, 2, 49.7028546, 5.4075261);

-- Exemple 3: Service de Garde d\'Enfants par Charlie
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Garde de mon fils', 'Besoin de garder mon fils de 3 ans les mercredis après-midi', 1, 1, 3, 49.6958546, 5.4045261);



DROP TABLE IF EXISTS ServiceTransaction CASCADE;

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
