// controllers/productController.js
const productService = require('../services/productService')

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

exports.getProductById = async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await productService.getProductById(id)
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async (req, res, next) => {
  const { name, price } = req.body
  try {
    const newProduct = await productService.createProduct(name, price)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params
  const { name, price } = req.body
  try {
    const updatedProduct = await productService.updateProduct(id, name, price)
    if (updatedProduct) {
      res.status(200).json(updatedProduct)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    const success = await productService.deleteProduct(id)
    if (success) {
      res.status(200).json({ message: 'Product deleted successfully' })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    next(error)
  }
}
