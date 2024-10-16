// services/productService.js
const db = require('../utils/db')
const Product = require('../models/productModel')

exports.getAllProducts = async () => {
  const client = await db.connect()
  const result = await client.query('SELECT * FROM products')
  client.release()
  
  return result.rows.map(row => new Product(row.id, row.name, row.price))
}

exports.getProductById = async (id) => {
  const client = await db.connect()
  const result = await client.query('SELECT * FROM products WHERE id = $1', [id])
  client.release()

  if (result.rows.length > 0) {
    const { id, name, price } = result.rows[0]
    return new Product(id, name, price)
  }
  return null
}

exports.createProduct = async (name, price) => {
  const client = await db.connect()
  const result = await client.query(
    'INSERT INTO products(name, price) VALUES($1, $2) RETURNING *',
    [name, price]
  )
  client.release()

  return new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price)
}

exports.updateProduct = async (id, name, price) => {
  const client = await db.connect()
  const result = await client.query(
    'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  )
  client.release()

  if (result.rows.length > 0) {
    return new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price)
  }
  return null
}

exports.deleteProduct = async (id) => {
  const client = await db.connect()
  const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])
  client.release()

  return result.rowCount > 0
}
