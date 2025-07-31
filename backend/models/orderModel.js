const pool = require('../db/db');

exports.getOrderByBuyerId = async (buyerId, offset, limit) => {
    const query = `
        SELECT * FROM Orders
        WHERE buyer_id = $1
        ORDER BY orderdate DESC
        OFFSET $2 LIMIT $3
    `;
    const result = await pool.query(query, [buyerId, offset, limit]);
    return result.rows;
};

exports.countOrdersByBuyerId = async (buyerId) => {
    const query = `SELECT COUNT(*) FROM Orders WHERE buyer_id = $1`;
    const result = await pool.query(query, [buyerId]);
    return parseInt(result.rows[0].count, 10);
};

exports.createOrder = async (status, buyer_id, payment_id) => {
    const query = `
        INSERT INTO Orders (orderDate, status, buyer_id, payment_id)
        VALUES (NOW(), $1, $2, $3)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [status, buyer_id, payment_id]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao criar pedido.', err);
        throw err;
    }
};

exports.addOrderItem = async ( orderId, productId ) => {
    const query = `
        INSERT INTO order_Product (order_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [orderId, productId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao adicionar produto ao pedido.', err);
        throw err;
    }
};

exports.getOrderItem = async ( orderId ) => {
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS nome_produto,
            p.price AS preco,
            p.imageUrl AS imagem_produto
        FROM Order_Product wp
        JOIN Product p ON wp.product_id = p.id
        WHERE wp.order_id = $1
        ORDER BY p.name;
    `;

    try {
        const result = await pool.query(query, [orderId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao listar produtos do pedido.', err);
        throw err;
    }
};

//teste
exports.searchOrdersByKeyword = async (keyword, page, pageSize, buyerId) => {
    const searchKeyword = `%${keyword}%`;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize, 10);

    try {        
        const products = await searchOrdersByKeyword2(searchKeyword, offset, limit, buyerId);

        const totalProducts = await productModel.countProductsByKeyword(searchKeyword);
        const hasNext = (page * pageSize) < totalProducts;

        let orders = await orderModel.getOrderByBuyerId(buyerId, offset, pageSize);
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await orderModel.getOrderItem(order.id);

                console.log(items);



                return {
                    ...order,
                    products: items
                };
            })
        );

        return {
            data: products,
            hasNext
        };
    } catch (err) {
        console.error('Erro ao buscar produtos por palavra-chave com paginação:', err);
        throw err;
    }
};

exports.searchOrdersByKeyword2 = async (keyword, offset, limit, buyerId) => {
  const query = `
        SELECT * 
        FROM Order_Product
        WHERE name ILIKE $1
        AND buyer_id = $2
        OFFSET $3 LIMIT $4
  `;

  try {
      const result = await pool.query(query, [keyword, buyerId, offset, limit]);
      return result.rows;
  } catch (err) {
      console.error('Erro ao buscar produtos no banco de dados.', err);
      throw err;
  }
};