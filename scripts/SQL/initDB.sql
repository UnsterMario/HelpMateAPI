
DROP TABLE IF EXISTS About_us CASCADE;

CREATE TABLE About_us (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,                -- Identifiant unique
    content TEXT NOT NULL,                -- Texte pour la section "À propos de nous"
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de dernière modification
);

INSERT INTO About_us (content) VALUES (
    'HelpMate est une application développée par l''équipe JeF pour rapprocher les voisins et faciliter l''entraide au quotidien.


    Que ce soit pour un petit service, un coup de main ou une tâche plus spécifique, HelpMate. permet de mettre en relation les personnes à proximité qui cherchent à s''entraider.


    Avec une interface simple et intuitive, vous pouvez poster ou accepter des demandes et contribuer à une communauté plus solidaire.


    Rejoignez-nous dans cette aventure et devenez un acteur de l''entraide locale !'
);

DROP TABLE IF EXISTS AppUser CASCADE;


CREATE TABLE AppUser  (
                          userID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                          lastName VARCHAR(50) NOT NULL CHECK (LENGTH(lastName) > 0),
                          firstName VARCHAR(50) NOT NULL CHECK (LENGTH(firstName) > 0),
                          telNumber VARCHAR(20) CHECK (LENGTH(telNumber) > 0) UNIQUE,
                          mailAddress VARCHAR(255) CHECK (LENGTH(mailAddress) > 0) UNIQUE,
                          userPassword VARCHAR NOT NULL CHECK (LENGTH(userPassword) > 0),
                          isAdmin BOOLEAN NOT NULL
);

-- Ajout d'utilisateurs dans AppUser
INSERT INTO AppUser (lastName, firstName, telNumber, mailAddress, userPassword, isAdmin)
VALUES
('System','System','0000000000','system@mail.com','$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', true),
('Doe', 'John', '0489675636', 'john@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', true), -- admin
('Smith', 'Alice', '0490123456', 'alice@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Brown', 'Charlie', '0489001122', 'charlie@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Johnson', 'Diana', '0489556677', 'diana@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false);


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
('Coupe d arbre', 'Besoin de couper un arbre de 3m dans le fond de mon jardin', 2, 3, 1, 50.4631551, 4.8619083);

-- Exemple 2: Service d\'Animaux par Bob
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Garde d un chat', 'Besoin de nourrir mon chat 2x/j pendant 1 semaine', 3, 2, 2, 50.4639551, 4.8659083);

-- Exemple 3: Service de Garde d\'Enfants par Charlie
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Garde de mon fils', 'Besoin de garder mon fils de 3 ans les mercredis après-midi', 4, 3, 50.4675551, 4.8699083);

DROP TABLE IF EXISTS Conversation CASCADE;

-- Table des Conversations
CREATE TABLE Conversation (
    conversationID SERIAL PRIMARY KEY, -- Ajout d'un identifiant unique pour chaque conversation
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    CONSTRAINT FK_Conversation_user1 FOREIGN KEY (user1) REFERENCES AppUser(userID) ON DELETE CASCADE,
    CONSTRAINT FK_Conversation_user2 FOREIGN KEY (user2) REFERENCES AppUser(userID) ON DELETE CASCADE,
    CONSTRAINT CHK_Conversation_Order CHECK (user1 < user2)
);

-- Conversations entre les utilisateurs
INSERT INTO Conversation (user1, user2)
VALUES 
(2, 3), -- John (admin) et Alice
(2, 4), -- John et Charlie
(3, 4), -- Alice et Charlie
(3, 5); -- Alice et Diana

DROP TABLE IF EXISTS Message CASCADE;

-- Table des Messages
CREATE TABLE Message (
    messageID SERIAL PRIMARY KEY,
    sendDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL CHECK (LENGTH(content) > 0),
    conversationID INT NOT NULL,  -- Référence à l'ID de la conversation
    senderID INT NOT NULL,
    CONSTRAINT FK_Message_conversation FOREIGN KEY (conversationID) REFERENCES Conversation(conversationID) ON DELETE CASCADE,
    CONSTRAINT FK_Message_sender FOREIGN KEY (senderID) REFERENCES AppUser(userID) ON DELETE CASCADE
);



-- Exemple de messages
INSERT INTO Message (conversationID, senderID, content, sendDate)
VALUES
(1, 2, 'Salut Alice, comment ça va ?', '2024-10-11T16:06:43.676Z'), -- John envoie un message à Alice
(1, 3, 'Très bien merci John, et toi ?', '2024-11-11T16:06:43.676Z'), -- Alice répond
(2, 2, 'Charlie, on se voit demain ?', '2024-09-11T16:06:43.676Z'), -- John envoie un message à Charlie
(3, 3, 'Salut Charlie', '2024-09-11T16:06:43.676Z'),
(4, 3, 'Diana, on se voit quand ?', '2024-09-11T16:06:43.676Z');