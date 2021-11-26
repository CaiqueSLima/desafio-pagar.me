import { ITransactionDatabase } from "../business/ports/ITransactionDatabase"
import { Transaction } from "../models/Transaction"
import { BaseDatabase } from "./BaseDatabase"

export interface TransactionData {
    id: string
    value: number
    description: string
    payment_method: string
    card_number: number
    card_owner: string
    card_exp_date: string
    card_CVV: number
}

export class TransactionDatabase extends BaseDatabase implements ITransactionDatabase {

    private static TABLE_NAME = 'pagar.me_transactions'

    public async createTransaction(transaction: Transaction): Promise<void> {

        const transactionToDB: TransactionData = {
            id: transaction.getId(),
            value: transaction.getValue(),
            description: transaction.getDescription(),
            payment_method: transaction.getPaymentMethod(),
            card_number: transaction.getCardNumber(),
            card_owner: transaction.getCardOwner(),
            card_exp_date: transaction.getCardExpDate(),
            card_CVV: transaction.getCardCVV()
        } 

        await BaseDatabase.connection(TransactionDatabase.TABLE_NAME).insert(transactionToDB)
    }

    public async getTransactions(): Promise<TransactionData[]> {

        const result = await BaseDatabase.connection(TransactionDatabase.TABLE_NAME).select().orderBy('')

        return result
    }
}