--Comandos para criar o banco
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET TIMEZONE = 'America/Sao_Paulo';

CREATE TABLE Users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(320) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	imageUrl VARCHAR(512),
	address VARCHAR(512),
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

CREATE TABLE Cart_Product (
    cart_id UUID NOT NULL REFERENCES Cart(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Product(id) ON DELETE CASCADE,
	quantity DECIMAL(18,2)
);

CREATE TABLE Wishlist_Product (
    wishlist_id UUID NOT NULL REFERENCES Wishlist(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Product(id) ON DELETE CASCADE
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
	createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP,
	sale NUMERIC(18) DEFAULT 0,
	seller_id UUID NOT NULL REFERENCES Seller(id) ON DELETE CASCADE,
	category_id UUID NOT NULL REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE PayType (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paymentMethod VARCHAR(255)
);

CREATE TABLE Payment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchaseDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	totalPrice DECIMAL(18,2),
	order_id UUID,
    payType_id UUID NOT NULL REFERENCES PayType(id) ON DELETE CASCADE
);

CREATE TABLE Orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    orderDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255),
    buyer_id UUID NOT NULL REFERENCES Buyer(id) ON DELETE CASCADE,
    payment_id UUID NOT NULL REFERENCES Payment(id) ON DELETE CASCADE
);

CREATE TABLE Order_Product (
    order_id UUID NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES Product(id) ON DELETE CASCADE
);

--Comandos para testes
SELECT * FROM Users;
SELECT * FROM Seller WHERE user_id = '7101788d-b49d-4c1d-bf26-0d6fc13b1427';
SELECT * FROM Buyer WHERE user_id = '7101788d-b49d-4c1d-bf26-0d6fc13b1427';
SELECT * FROM Orders;
SELECT * FROM Payment;
SELECT * FROM paytype;
SELECT * FROM Cart_Product;

SELECT * FROM Cart WHERE buyer_id = 'd23f16b6-e10f-4991-8156-1ed69523ccdd';

INSERT INTO Orders (orderDate, status, seller_id, buyer_id, payment_id) 
VALUES (NOW(), 'Em preparação', '58f4df34-9162-4d32-a773-7fc600fec3e4', 'a4b08eae-0bcb-4c85-868c-5b6c2d22a5d6', 'cf28552b-da29-41b0-a39d-d51a4b6c5b39');

INSERT INTO Payment (purchaseDate, payType_id) 
VALUES (NOW(), 'cbc8dc06-9e95-4212-a18f-e985f110b65a');

SELECT * FROM Wishlist WHERE buyer_id = '7acd543e-1067-465c-bb18-ff68b1ee7599';

SELECT * FROM Product WHERE name ILIKE $1

SELECT * FROM Wishlist_Product WHERE wishlist_id = 'a6eaba31-9a03-4f22-aeee-4dd4299f8493' AND product_id = 'f014b047-a2c9-4d5f-bdf0-00ef012b3a5f';

INSERT INTO Seller (user_id) VALUES ('77ebb9bf-6426-428a-8cc0-98a286b8a2da');
INSERT INTO Buyer (user_id) VALUES ('77ebb9bf-6426-428a-8cc0-98a286b8a2da');

INSERT INTO Product (name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id, sale) 
VALUES ('123', 
53.0, 'F', 'T', 
'https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png', 
'descriptionTeste3', 0, '2815099b-0cb2-4192-8d08-edff52609209', '4935a834-10ee-408c-b573-987ff8533c20', 0);

ALTER TABLE Orders DROP COLUMN seller_id;

ALTER TABLE Product
ALTER COLUMN isUsed TYPE boolean
USING isUsed::INTEGER::BOOLEAN;

UPDATE Product 
SET name = COALESCE('nameTesteModificado', name), 
         price = COALESCE(25, price),
         isUsed = COALESCE('T', isUsed),
         isActive = COALESCE('F', isActive),
         imageUrl = COALESCE('testeImageUrlModificado', imageUrl),
         description = COALESCE('descriptionTesteModificado', description),
         quantity = COALESCE(0, quantity)
     WHERE id = '2ea49fdc-d045-443d-9df6-a749e9229f9c';

UPDATE Product 
SET imageUrl = COALESCE('https://raw.githubusercontent.com/eidy-8/imagens/main/e-commerce/esporte/vecteezy_vibrant-cricket-helmet-in-yellow-with-a-polished-surface_55985493.png', 
imageUrl)
WHERE id = '07255487-dc91-4585-847c-711b6836a0b6';

UPDATE Product 
SET sale = COALESCE(1, sale)
WHERE id = '07255487-dc91-4585-847c-711b6836a0b6';

DELETE FROM Users WHERE id = '648efb8c-3571-4541-b654-9b3270144ef9';

TRUNCATE TABLE Payment CASCADE;

DROP TABLE Payment CASCADE;

SHOW timezone;

SELECT wp.product_id
FROM Wishlist_Product wp
WHERE wp.wishlist_id = 'a6eaba31-9a03-4f22-aeee-4dd4299f8493';
