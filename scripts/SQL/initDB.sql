
DROP TABLE IF EXISTS AboutUs CASCADE;

CREATE TABLE AboutUs (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,                -- Identifiant unique
    content TEXT NOT NULL,                -- Texte pour la section "À propos de nous"
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de dernière modification
);

INSERT INTO AboutUs (content) VALUES (
    '   HelpMate est une application développée par l''équipe JeF pour rapprocher les voisins et faciliter l''entraide au quotidien.


    Que ce soit pour un petit service, un coup de main ou une tâche plus spécifique, HelpMate. permet de mettre en relation les personnes à proximité qui cherchent à s''entraider.


    Avec une interface simple et intuitive, vous pouvez poster ou accepter des demandes et contribuer à une communauté plus solidaire.


    Rejoignez-nous dans cette aventure et devenez un acteur de l''entraide locale !'
);

DROP TABLE IF EXISTS AppUser CASCADE;


CREATE TABLE AppUser  (
                          userID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                          lastName VARCHAR(50) NOT NULL CHECK (LENGTH(lastName) > 0),
                          firstName VARCHAR(50) NOT NULL CHECK (LENGTH(firstName) > 0),
                          telNumber VARCHAR(20) NOT NULL CHECK (LENGTH(telNumber) > 0) UNIQUE,
                          mailAddress VARCHAR(255) NOT NULL CHECK (LENGTH(mailAddress) > 0) UNIQUE,
                          userPassword VARCHAR(255) NOT NULL CHECK (LENGTH(userPassword) > 0),
                          isAdmin BOOLEAN NOT NULL
);

-- Ajout d'utilisateurs dans AppUser
INSERT INTO AppUser (lastName, firstName, telNumber, mailAddress, userPassword, isAdmin)
VALUES
('System','System','0000000000','system@mail.com','$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', true),
('Doe', 'John', '0489675636', 'john@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', true), -- admin
('Smith', 'Alice', '0490123456', 'alice@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Brown', 'Charlie', '0489001122', 'charlie@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Johnson', 'Diana', '0489556677', 'diana@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Taylor', 'Emma', '0489123456', 'emma@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Wilson', 'Liam', '0489234567', 'liam@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Martinez', 'Olivia', '0489345678', 'olivia@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Anderson', 'Noah', '0489456789', 'noah@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Thomas', 'Sophia', '0489567890', 'sophia@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Clark', 'Ethan', '0489678901', 'ethan@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Lewis', 'Mia', '0489789012', 'mia@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Walker', 'James', '0489890123', 'james@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Hall', 'Ava', '0489901234', 'ava@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Allen', 'Lucas', '0489012345', 'lucas@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false),
('Young', 'Ella', '0489123457', 'ella@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false);

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

-- Exemple 4: Service de Bricolage par Diana
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Montage de meuble', 'Besoin d''aide pour monter une armoire IKEA', 5, 6, 4, 50.4701551, 4.8729083);

-- Exemple 5: Service de Ménage par Emma
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Nettoyage de printemps', 'Recherche quelqu''un pour un grand ménage de printemps', 6, 5, 50.4711551, 4.8739083);

-- Exemple 6: Service d'Informatique par Liam
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Installation de box', 'Besoin d''aide pour installer une nouvelle box internet', 7, 8, 6, 50.4721551, 4.8749083);

-- Exemple 7: Service de Cours particulier par Olivia
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Cours de mathématiques', 'Recherche professeur pour cours de mathématiques niveau lycée', 8, 7, 50.4731551, 4.8759083);

-- Exemple 8: Service de Déménagement par Noah
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Aide pour déménagement', 'Besoin d''aide pour déménager des meubles lourds', 9, 10, 8, 50.4741551, 4.8769083);

-- Exemple 9: Service de Jardinage par Mia
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Entretien de jardin', 'Besoin d''aide pour entretenir mon jardin', 12, 3, 50.4751551, 4.8779083);

-- Exemple 10: Service de Bricolage par James
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Réparation de plomberie', 'Besoin d''aide pour réparer une fuite d''eau', 13, 14, 4, 50.4761551, 4.8789083);

-- Exemple 11: Service de Ménage par Ava
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Nettoyage de bureau', 'Recherche quelqu''un pour nettoyer mon bureau', 9, 5, 50.4771551, 4.8799083);

-- Exemple 12: Service d'Informatique par Lucas
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Mise à jour logiciel', 'Besoin d''aide pour mettre à jour mes logiciels', 11, 12, 6, 50.4781551, 4.8809083);

-- Exemple 13: Service de Cours particulier par Ella
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Cours de physique', 'Recherche professeur pour cours de physique niveau lycée', 13, 7, 50.4791551, 4.8819083);

-- Exemple 14: Service de Déménagement par Ethan
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Aide pour déménagement', 'Besoin d''aide pour déménager des cartons', 11, 10, 8, 50.4801551, 4.8829083);


DROP TABLE IF EXISTS Conversation CASCADE;

-- Table des Conversations
CREATE TABLE Conversation (
    conversationID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, -- Ajout d'un identifiant unique pour chaque conversation
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
(3, 5), -- Alice et Diana
(5, 6), -- Diana et Emma 
(6, 7); -- Emma et Diana
-- Conversations entre les utilisateurs sans conversation
INSERT INTO Conversation (user1, user2)
VALUES 
(4, 14), -- Charlie et Ava
(7,10);

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
-- Messages pour les nouvelles conversations
INSERT INTO Message (conversationID, senderID, content, sendDate)
VALUES
(5, 5, 'Coucou Diana, quand es-tu disponible ?', '2024-10-12T10:00:00.000Z'), -- Charlie envoie à Diana
(7, 4, 'Salut Ava, comment ça va ?', '2024-10-12T10:00:00.000Z'), -- Charlie envoie un message à Ava
(7, 14, 'Très bien merci Charlie, et toi ?', '2024-10-12T10:05:00.000Z'), -- Ava répond
(6, 7, 'Salut Emma, tu es disponible demain ?', '2024-10-12T11:00:00.000Z'), -- Liam envoie un message à Emma
(6, 6, 'Oui, je suis disponible. À quelle heure ?', '2024-10-12T11:05:00.000Z'), -- Emma répond
(8,7,'Bonjour, je peux vous aider, dites moi en plus', '2024-10-12T13:00:00.000Z'), 
(8,10,'Bonjour, alors voilà étant seule c''est compliqué je n''ai pas le temps', '2024-10-12T13:05:00.000Z'),
(8,10,'Merci énormement pour votre aide', '2024-10-12T13:10:00.000Z'), 
(8,10,'Je vous fournirai le repas le jour du service', '2024-10-12T13:15:00.000Z'),
(8,7,'Avec grand plaisir madame merci pour votre geste', '2024-10-12T13:20:00.000Z'), 
(8,7,'Je vous remercie c''etait bien bon', '2024-10-15T13:25:00.000Z'),
(8,10,'Je suis contente que cela vous ait plu', '2024-10-15T13:30:00.000Z'),
(8,7,'Je n''hésiterai pas à revenir !', '2024-10-15T13:35:00.000Z'),
(8,10,'Je vous en prie, c''etait un plaisir', '2024-10-15T13:40:00.000Z');