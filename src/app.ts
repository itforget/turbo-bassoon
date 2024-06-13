import express from 'express'
import orderRoutes from './routes/orderRoutes'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import authRoutes from './routes/authRoutes'

const app = express()

app.use(express.json())

app.use(orderRoutes, userRoutes, productRoutes, authRoutes)

export default app
