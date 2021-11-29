import { TransactionData } from "../../src/data/TransactionDatabase"
import { Transaction } from "../../src/models/Transaction"
import { mockTransCreditFromDB, mockTransDebitFromDB } from "./TransactionsMock"

export class TransactionDatabaseValidMock {

    public async createTransaction(transaction: Transaction): Promise<void> {
    }

    public async getTransactions(): Promise<TransactionData[]> {

        const result = [mockTransCreditFromDB, mockTransDebitFromDB]

        return result
    }
}