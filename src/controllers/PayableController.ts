import { Request, Response } from 'express'
import { BalanceOutputDTO, PayableBusiness } from '../business/PayableBusiness'
import { PayableDatabase } from '../data/PayableDatabase'
import { IdGenerator } from '../services/IdGenerator'

const payableBusiness = new PayableBusiness(
    new IdGenerator(),
    new PayableDatabase()
)

export class PayableController {
    public async getBalance(req: Request, res: Response): Promise<void> {
        try {

            const result: BalanceOutputDTO = await payableBusiness.getBalance()

            res.status(200).send({ balance: result })

        } catch (error: any) {

            res.status(error.statusCode).send({ message: error.message })
        }
    }
}