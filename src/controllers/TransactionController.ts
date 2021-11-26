import { Request, Response } from 'express'
import { TransactionBusiness, TransactionInputDTO } from '../business/TransactionBusiness'
import { TransactionDatabase } from '../data/TransactionDatabase'
import { IdGenerator } from '../services/IdGenerator'

const transactionBusiness = new TransactionBusiness(
    new IdGenerator(),
    new TransactionDatabase()
)

export class TransactionController {
    public async create(req: Request, res: Response): Promise<void> {
        try {

            const input: TransactionInputDTO = {
                value: req.body.value,
                description: req.body.description,
                paymentMethod: req.body.paymentMethod,
                cardNumber: req.body.cardNumber,
                cardOwner: req.body.cardOwner,
                cardExpDate: req.body.cardExpDate,
                cardCVV: req.body.cardCVV
            }

            res.end()



        } catch (error: any) {
            res.status(error.statusCode).send({ message: error.sqlMessage || error.message })
        }
    }
}