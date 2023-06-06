import express from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/products.js'

const router = express.Router()

// GET all products
router.get('/products', getAllProducts)

// GET product by ID
router.get('/products/:id', getProductById)

// POST create a new product
router.post('/products', createProduct)

// PUT update a product
router.put('/products/:id', updateProduct)

// DELETE a product
router.delete('/products/:id', deleteProduct)

export default router
