CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(320) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	lastLogin TIMESTAMP
);

SELECT * FROM Users;