// Get all products
import Product from '../models/productSchema.js'

export const getAllProducts = async (req, res) => {
  const { sort, fields, limit } = req.query
  let sortList, fieldsList

  try {
    if (sort) {
      sortList = sort.split(',').join(' ')
    }
    if (fields) {
      fieldsList = fields.split(',').join(' ')
    }
    const products = await Product.find()
      .select(fieldsList)
      .sort(sort)
      .limit(limit ? limit : 10)
    res.json({ products, nHits: products.length })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Get a specific product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json({ msg: 'product added', product: newProduct })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error this one' })
  }
}

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    )

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndDelete(id)

    if (product) {
      res.sendStatus(204)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
