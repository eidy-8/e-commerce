--Comandos para criar o banco
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(320) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	imageUrl VARCHAR(512),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	lastLogin TIMESTAMP
);

CREATE TABLE Buyer (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Cart (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	buyer_id UUID UNIQUE NOT NULL REFERENCES Buyer(id) ON DELETE CASCADE
);

CREATE TABLE Wishlist (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	buyer_id UUID UNIQUE NOT NULL REFERENCES Buyer(id) ON DELETE CASCADE
);

CREATE TABLE Seller (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id UUID UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Category (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name VARCHAR(255) NOT NULL
);

CREATE TABLE Product (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name VARCHAR(255) NOT NULL,
	price DECIMAL(18,2),
	isUsed CHAR(1),
	isActive CHAR(1),
	imageUrl VARCHAR(512),
	description VARCHAR(5000),
	quantity NUMERIC(18),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP,
	seller_id UUID NOT NULL REFERENCES Seller(id) ON DELETE CASCADE,
	category_id UUID NOT NULL REFERENCES Category(id) ON DELETE CASCADE
);

--Comandos para testes
SELECT * FROM Product;

INSERT INTO Seller (user_id) VALUES ('77ebb9bf-6426-428a-8cc0-98a286b8a2da');

INSERT INTO Product (name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id) 
VALUES ('nameTeste', 50.0, 'F', 'T', 'testeImageUrl', 'descriptionTeste', 2, '2815099b-0cb2-4192-8d08-edff52609209', '4935a834-10ee-408c-b573-987ff8533c20');

ALTER TABLE Users ADD COLUMN imageUrl VARCHAR(512);

UPDATE Product 
SET name = COALESCE('nameTesteModificado', name), 
         price = COALESCE(25, price),
         isUsed = COALESCE('T', isUsed),
         isActive = COALESCE('F', isActive),
         imageUrl = COALESCE('testeImageUrlModificado', imageUrl),
         description = COALESCE('descriptionTesteModificado', description),
         quantity = COALESCE(1, quantity)
     WHERE id = 'f9593da0-00c0-4f6f-9595-f4ff98ae25cd';

DELETE FROM Product WHERE id = 'f9593da0-00c0-4f6f-9595-f4ff98ae25cd';

TRUNCATE TABLE Users CASCADE;

DROP TABLE Product;
