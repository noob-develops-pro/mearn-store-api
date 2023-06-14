// Get all products
import Product from '../models/productSchema.js'

export const getAllProducts = async (req, res) => {
  try {
    const {
      featured,
      company,
      name,
      sort = 'createdAt',
      fields,
      numericFilters,
      limit = 10,
      page = 1,
    } = req.query

    const queryObject = {}

    if (featured) {
      queryObject.featured = featured === 'true'
    }
    if (company) {
      queryObject.company = company
    }
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      }
      numericFilters.split(',').forEach((filter) => {
        const [field, operator, value] = filter.split(/(>|>=|=|<|<=)/)

        if (operatorMap.hasOwnProperty(operator)) {
          queryObject[field] = { [operatorMap[operator]]: Number(value) }
        }
      })
    }

    const sortList = sort.split(',').join(' ')
    const fieldList = fields ? fields.split(',').join(' ') : ''
    const skip = (page - 1) * limit

    let products = await Product.find(queryObject)
      .sort(sortList)
      .select(fieldList)
      .skip(skip)
      .limit(Number(limit))

    res.json({ products, nbHits: products.length })
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
