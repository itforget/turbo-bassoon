import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import orderRoutes from './routes/orderRoutes'
import authRoutes from './routes/authRoutes'
import authMiddleware from './middlewares/authMiddleware'

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', authMiddleware, orderRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
