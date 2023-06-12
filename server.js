import express from 'express'

import { connectDB } from './db/connect.js'
import dotenv from 'dotenv'
import cors from 'cors'
import productsRouter from './routes/productsRouter.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1/', productsRouter)

// Error handling middleware
app.use(errorHandler)

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log("couldn't connect to db")
  }
}

start()
