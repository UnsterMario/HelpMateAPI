DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS manager CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS purchase CASCADE;


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
('Coupe d arbre', 'Besoin de couper un arbre de 3m dans le fond de mon jardin', 2, 3, 3, 49.7008546, 5.4065261);

-- Exemple 2: Service d\'Animaux par Bob
INSERT INTO Service (title, serviceDescription, authorUser, serviceType, latitude, longitude)
VALUES
('Garde d un chat', 'Besoin de nourrir mon chat 2x/j pendant 1 semaine', 2, 1, 49.7028546, 5.4075261);

-- Exemple 3: Service de Garde d\'Enfants par Charlie
INSERT INTO Service (title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude)
VALUES
('Garde de mon fils', 'Besoin de garder mon fils de 3 ans les mercredis après-midi', 4, 3, 3, 50.4675551, 4.8699083);


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

-- Ajout d'utilisateurs dans AppUser
INSERT INTO AppUser (lastName, firstName, telNumber, mailAddress, userPassword, isAdmin, isRestricted)
VALUES
('System','System','0000000000','system@mail.com','$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', true, false),
('Doe', 'John', '0489675636', 'john@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', true, false), -- admin
('Smith', 'Alice', '0490123456', 'alice@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Brown', 'Charlie', '0489001122', 'charlie@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Johnson', 'Diana', '0489556677', 'diana@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false), -- restricted
('Taylor', 'Bob', '0489123456', 'bob@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Wilson', 'Eve', '0489234567', 'eve@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Moore', 'Frank', '0489345678', 'frank@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Clark', 'Grace', '0489456789', 'grace@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Lewis', 'Hank', '0489567890', 'hank@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Walker', 'Ivy', '0489678901', 'ivy@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Hall', 'Jack', '0489789012', 'jack@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Allen', 'Kate', '0489890123', 'kate@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('Young', 'Leo', '0489901234', 'leo@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false),
('King', 'Mia', '0489012345', 'mia@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$IfLthWBk4ra2iihE1qovow$+WNyZPw101Ah4MHLR0hYoX/ervjLCEMHLhGaQL53HUQ', false, false);

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
(3, 5), -- Alice et Diana
(4, 6), -- Charlie et Bob
(5, 6), -- Diana et Bob
(5, 7), -- Diana et Eve
(6, 7), -- Bob et Eve
(6, 8), -- Bob et Frank
(7, 8), -- Eve et Frank
(7, 9), -- Eve et Grace
(8, 9), -- Frank et Grace
(8, 10), -- Frank et Hank
(9, 10), -- Grace et Hank
(9, 11), -- Grace et Ivy
(10, 11), -- Hank et Ivy
(10, 12), -- Hank et Jack
(11, 12), -- Ivy et Jack
(11, 13), -- Ivy et Kate
(12, 13), -- Jack et Kate
(12, 14), -- Jack et Leo
(13, 14), -- Kate et Leo
(13, 15), -- Kate et Mia
(14, 15); -- Leo et Mia

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
(4, 3, 'Diana, on se voit quand ?', '2024-09-11T16:06:43.676Z'),

(4, 4, 'Salut Diana, comment ça va ?', '2024-10-11T16:06:43.676Z'), -- Charlie envoie un message à Diana
(4, 5, 'Très bien merci Charlie, et toi ?', '2024-10-11T16:07:43.676Z'), -- Diana répond
(5, 4, 'Salut Bob, tu es dispo demain ?', '2024-10-11T16:08:43.676Z'), -- Charlie envoie un message à Bob
(5, 6, 'Oui, je suis dispo. À quelle heure ?', '2024-10-11T16:09:43.676Z'), -- Bob répond
(6, 5, 'Salut Bob, on se voit quand ?', '2024-10-11T16:10:43.676Z'), -- Diana envoie un message à Bob
(6, 6, 'Quand tu veux, Diana.', '2024-10-11T16:11:43.676Z'), -- Bob répond
(7, 5, 'Salut Eve, tu es libre ce week-end ?', '2024-10-11T16:12:43.676Z'), -- Diana envoie un message à Eve
(7, 7, 'Oui, je suis libre. On fait quoi ?', '2024-10-11T16:13:43.676Z'), -- Eve répond
(8, 6, 'Salut Frank, comment ça va ?', '2024-10-11T16:14:43.676Z'), -- Bob envoie un message à Frank
(8, 8, 'Très bien merci Bob, et toi ?', '2024-10-11T16:15:43.676Z'), -- Frank répond
(9, 7, 'Salut Frank, tu es dispo demain ?', '2024-10-11T16:16:43.676Z'), -- Eve envoie un message à Frank
(9, 8, 'Oui, je suis dispo. À quelle heure ?', '2024-10-11T16:17:43.676Z'), -- Frank répond
(10, 7, 'Salut Grace, comment ça va ?', '2024-10-11T16:18:43.676Z'), -- Eve envoie un message à Grace
(10, 9, 'Très bien merci Eve, et toi ?', '2024-10-11T16:19:43.676Z'), -- Grace répond
(11, 8, 'Salut Hank, tu es libre ce week-end ?', '2024-10-11T16:20:43.676Z'), -- Frank envoie un message à Hank
(11, 10, 'Oui, je suis libre. On fait quoi ?', '2024-10-11T16:21:43.676Z'), -- Hank répond
(12, 9, 'Salut Hank, comment ça va ?', '2024-10-11T16:22:43.676Z'), -- Grace envoie un message à Hank
(12, 10, 'Très bien merci Grace, et toi ?', '2024-10-11T16:23:43.676Z'), -- Hank répond
(13, 9, 'Salut Ivy, tu es dispo demain ?', '2024-10-11T16:24:43.676Z'), -- Grace envoie un message à Ivy
(13, 11, 'Oui, je suis dispo. À quelle heure ?', '2024-10-11T16:25:43.676Z'), -- Ivy répond
(14, 10, 'Salut Ivy, comment ça va ?', '2024-10-11T16:26:43.676Z'), -- Hank envoie un message à Ivy
(14, 11, 'Très bien merci Hank, et toi ?', '2024-10-11T16:27:43.676Z'), -- Ivy répond
(15, 10, 'Salut Jack, tu es libre ce week-end ?', '2024-10-11T16:28:43.676Z'), -- Hank envoie un message à Jack
(15, 12, 'Oui, je suis libre. On fait quoi ?', '2024-10-11T16:29:43.676Z'), -- Jack répond
(16, 11, 'Salut Jack, comment ça va ?', '2024-10-11T16:30:43.676Z'), -- Ivy envoie un message à Jack
(16, 12, 'Très bien merci Ivy, et toi ?', '2024-10-11T16:31:43.676Z'), -- Jack répond
(17, 11, 'Salut Kate, tu es dispo demain ?', '2024-10-11T16:32:43.676Z'), -- Ivy envoie un message à Kate
(17, 13, 'Oui, je suis dispo. À quelle heure ?', '2024-10-11T16:33:43.676Z'), -- Kate répond
(18, 12, 'Salut Kate, comment ça va ?', '2024-10-11T16:34:43.676Z'), -- Jack envoie un message à Kate
(18, 13, 'Très bien merci Jack, et toi ?', '2024-10-11T16:35:43.676Z'), -- Kate répond
(19, 12, 'Salut Leo, tu es libre ce week-end ?', '2024-10-11T16:36:43.676Z'), -- Jack envoie un message à Leo
(19, 14, 'Oui, je suis libre. On fait quoi ?', '2024-10-11T16:37:43.676Z'), -- Leo répond
(20, 13, 'Salut Leo, comment ça va ?', '2024-10-11T16:38:43.676Z'), -- Kate envoie un message à Leo
(20, 14, 'Très bien merci Kate, et toi ?', '2024-10-11T16:39:43.676Z'), -- Leo répond
(21, 13, 'Salut Mia, tu es dispo demain ?', '2024-10-11T16:40:43.676Z'), -- Kate envoie un message à Mia
(21, 15, 'Oui, je suis dispo. À quelle heure ?', '2024-10-11T16:41:43.676Z'), -- Mia répond
(22, 14, 'Salut Mia, comment ça va ?', '2024-10-11T16:42:43.676Z'), -- Leo envoie un message à Mia
(22, 15, 'Très bien merci Leo, et toi ?', '2024-10-11T16:43:43.676Z'); -- Mia répond
