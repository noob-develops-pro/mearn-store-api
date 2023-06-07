import dotenv from 'dotenv'
import { connectDB } from './db/connect.js'
import Product from './models/productSchema.js'
import data from './products.json' assert { type: 'json' }

dotenv.config()

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(data)
    console.log('success !!')
    process.exit(0)
  } catch (error) {
    console.log("couldn't connect to db")
    process.exit(1)
  }
}

start()
