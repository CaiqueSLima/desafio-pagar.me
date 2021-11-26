import { TransactionData } from "../../data/TransactionDatabase"
import { Transaction } from "../../models/Transaction"

export interface ITransactionDatabase {
    createTransaction(transaction: Transaction): Promise<void>
    getTransactions(): Promise<TransactionData[]>
}