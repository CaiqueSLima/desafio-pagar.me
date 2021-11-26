import { CustomError } from "../error/CustomError"
import { Transaction } from "../models/Transaction"
import { IdGenerator } from "../services/IdGenerator"
import { PayableBusiness } from "./PayableBusiness"
import { ITransactionDatabase } from "./ports/ITransactionDatabase"

export interface TransactionDTO {
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
        private transactionDatabase: ITransactionDatabase,
        private payableBusiness: PayableBusiness
    ) { }

    public async createTransactionLogic(transaction: TransactionDTO): Promise<void> {

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

        const id: string = this.idGenerator.generate()

        const cardLast4Digits: number = Number(cardNumber.toString().slice(-4))

        const newTransaction = new Transaction(
            id,
            value,
            description,
            paymentMethod,
            cardLast4Digits,
            cardOwner,
            cardExpDate,
            cardCVV
        )
        
        // Before persisting the transaction, we create a new payable with its own validations
        await this.payableBusiness.createPayableLogic(newTransaction)

        await this.transactionDatabase.createTransaction(newTransaction)
    }

    public async getTransactions(): Promise<TransactionDTO[]> {

        const transactions = await this.transactionDatabase.getTransactions()

        const result: TransactionDTO[] = transactions.map(transaction => {
            return {
                id: transaction.id,
                value: transaction.value,
                description: transaction.description,
                paymentMethod: transaction.payment_method,
                cardNumber: transaction.card_number,
                cardOwner: transaction.card_owner,
                cardExpDate: transaction.card_exp_date,
                cardCVV: transaction.card_CVV
            }
        })

        return result
    }

}


