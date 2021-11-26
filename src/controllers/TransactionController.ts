import { Request, Response } from 'express'
import { PayableBusiness } from '../business/PayableBusiness'
import { TransactionBusiness, TransactionDTO } from '../business/TransactionBusiness'
import { PayableDatabase } from '../data/PayableDatabase'
import { TransactionDatabase } from '../data/TransactionDatabase'
import { IdGenerator } from '../services/IdGenerator'

const transactionBusiness = new TransactionBusiness(
    new IdGenerator(),
    new TransactionDatabase(),
    new PayableBusiness(new IdGenerator(), new PayableDatabase()),
    new PayableDatabase()
)

export class TransactionController {
    public async create(req: Request, res: Response): Promise<void> {
        try {

            const input: TransactionDTO = {
                value: req.body.value,
                description: req.body.description,
                paymentMethod: req.body.paymentMethod,
                cardNumber: req.body.cardNumber,
                cardOwner: req.body.cardOwner,
                cardExpDate: req.body.cardExpDate,
                cardCVV: req.body.cardCVV
            }

            await transactionBusiness.createTransactionLogic(input)

            res.status(200).send({ message: 'Transaction processed' })

        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.message })
        }
    }

    public async getTransactions(req: Request, res: Response): Promise<void> {
        try {

            const result: TransactionDTO[] = await transactionBusiness.getTransactions()

            res.status(200).send({ transactions: result })
        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.message })
        }
    }
}