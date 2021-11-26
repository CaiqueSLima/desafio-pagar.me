import { TransactionData } from "../../src/data/TransactionDatabase"
import { Transaction } from "../../src/models/Transaction"
import { mockTransCredit, mockTransDebit } from "./TransactionsMock"

export class TransactionDatabaseMock {

    public async createTransaction(transaction: Transaction): Promise<void> {
    }

    public async getTransactions(): Promise<TransactionData[]> {

        const result = [mockTransCredit, mockTransDebit]

        return result
    }
}