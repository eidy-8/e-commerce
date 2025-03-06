--Comandos para criar o banco
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(320) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
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

--Comandos para testes
SELECT * FROM Users;
INSERT INTO Users (username, email, password) VALUES ('teste', 'teste@gmail.com', 'testehash');
TRUNCATE TABLE Users CASCADE;
