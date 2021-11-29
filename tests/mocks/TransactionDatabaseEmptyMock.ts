import { TransactionData } from "../../src/data/TransactionDatabase"
import { Transaction } from "../../src/models/Transaction"

export class TransactionDatabaseEmptyMock {

    public async createTransaction(transaction: Transaction): Promise<void> {
    }

    public async getTransactions(): Promise<TransactionData[]> {

        return []
    }
}