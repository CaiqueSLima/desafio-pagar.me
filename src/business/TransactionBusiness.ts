import { CustomError } from "../error/CustomError"
import { Transaction } from "../models/Transaction"
import { IdGenerator } from "../services/IdGenerator"
import { PayableBusiness } from "./PayableBusiness"
import { ITransactionDatabase } from "./ports/ITransactionDatabase"


const payableBusiness = new PayableBusiness(new IdGenerator())

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
        await payableBusiness.createPayable(newTransaction)
        
        await this.transactionDatabase.createTransaction(newTransaction)

    }

}



