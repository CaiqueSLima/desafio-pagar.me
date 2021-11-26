import { Router } from "express"
import { TransactionController } from "../controllers/TransactionController"

const transactionController = new TransactionController()

export const transactionsRouter = Router()

transactionsRouter.get('/all', transactionController.getTransactions)
transactionsRouter.post('/create', transactionController.create)