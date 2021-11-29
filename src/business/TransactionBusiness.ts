import { CustomError } from "../error/CustomError"
import { Transaction } from "../models/Transaction"
import { IdGenerator } from "../services/IdGenerator"
import { PayableBusiness } from "./PayableBusiness"
import { IPayableDatabase } from "./ports/IPayableDatabase"
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
        private payableBusiness: PayableBusiness,
        private payableDatabase: IPayableDatabase
    ) { }

    public async createTransactionLogic(transaction: TransactionDTO): Promise<void> {

        try {

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
                (!value || value <= 0) ||
                !description ||
                !paymentMethod ||
                !cardNumber ||
                !cardOwner ||
                !cardExpDate ||
                !cardCVV
            ) {
                throw new CustomError('Missing inputs or invalid value')
            }

            if (cardNumber.toString().length !== 16) {
                throw new CustomError('Invalid Card Number')
            }

            if (cardCVV.toString().length !== 3) {
                throw new CustomError('Invalid CVV')
            }

            const id: string = this.idGenerator.generate()

            const cardLast4Digits: number = Number(cardNumber.toString().slice(-4))

            const newTransaction = new Transaction(
                id,
                value,
                description,
                Transaction.stringToPaymentMethod(paymentMethod),
                cardLast4Digits,
                cardOwner.toUpperCase(),
                cardExpDate,
                cardCVV
            )

            // Before persisting the transaction, we create a new payable with its own validations
            const payable = this.payableBusiness.createPayableLogic(newTransaction)
            await this.transactionDatabase.createTransaction(newTransaction)
            await this.payableDatabase.createPayable(payable)


        } catch (error: any) {
            throw new CustomError(error.message)
        }


    }

    public async getTransactions(): Promise<TransactionDTO[]> {

        try {

            const transactions = await this.transactionDatabase.getTransactions()

            if (!transactions.length) {
                throw new CustomError('No transaction found', 404)
            }

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

        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode)
        }
    }
}