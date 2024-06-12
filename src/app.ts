import express from 'express'
import orderRoutes from './routes/orderRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(express.json())

app.use(orderRoutes, userRoutes)

export default app
