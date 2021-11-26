import { CustomError } from "../error/CustomError"
import { Transaction } from "../models/Transaction"
import { IdGenerator } from "../services/IdGenerator"
import { ITransactionDatabase } from "./ports/ITransactionDatabase"

export interface TransactionInputDTO {
    value: number
    description: string
    paymentMethod: string
    cardNumber: number
    cardOwner: string
    cardExpDate: string
    cardCVV: number
}

export class TransactionBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private transactionDatabase: ITransactionDatabase
    ) { }

    public async createTransactionLogic(transaction: TransactionInputDTO): Promise<void> {

        const {
            value,
            description,
            paymentMethod,
            cardNumber,
            cardOwner,
            cardExpDate,
            cardCVV
        } = transaction


        if (
            !value ||
            !description ||
            !paymentMethod ||
            !cardNumber ||
            !cardOwner ||
            !cardExpDate ||
            !cardCVV
        ) {
            throw new CustomError('Missing inputs')
        }

        const payableId: string = this.idGenerator.generate()
        let payableStatus: string = ''

        if (paymentMethod.toLowerCase() === 'debit_card') {
            payableStatus = 'paid'
        } else if (paymentMethod.toLowerCase() === 'credit_card') {
            payableStatus = 'waiting_funds'
        } else {
            throw new CustomError('Invalid payment method')
        }

        const transactionId: string = this.idGenerator.generate()

        const cardLast4Digits: number = Number(cardNumber.toString().slice(-4))

        const newTransaction = new Transaction(
            transactionId,
            value,
            description,
            paymentMethod,
            cardLast4Digits,
            cardOwner,
            cardExpDate,
            cardCVV
        )





        await this.transactionDatabase.createTransaction(newTransaction)

    }

}



