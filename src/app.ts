import express from 'express'
import cors from 'cors'
import { transactionsRouter } from './routes/transactionsRouter'
import { payableRouter } from './routes/payableRouter'


const app = express()

app.use(express.json())
app.use(cors())
app.use('/transactions', transactionsRouter)
app.use('/balance', payableRouter)

export default app