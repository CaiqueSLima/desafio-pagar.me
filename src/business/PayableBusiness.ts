import { PayableDatabase } from "../data/PayableDatabase"
import { CustomError } from "../error/CustomError"
import { Payable } from "../models/Payables"
import { Transaction } from "../models/Transaction"
import { IdGenerator } from "../services/IdGenerator"

export interface BalanceOutputDTO {
    available: number
    waitingFunds: number
}

export class PayableBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private payableDatabase: PayableDatabase
    ) { }

    public async createPayableLogic(transaction: Transaction): Promise<void> {

        const debitCardFee = 0.97
        const creditCardFee = 0.95

        let payableStatus: string = ''
        let paymentDate: string = ''
        let value: number = 0

        function addDays(date: Date, days: number): Date {
            let result = date
            result.setDate(date.getDate() + days)
            return result
        }

        if (transaction.getPaymentMethod() === 'debit_card') {
            payableStatus = 'paid'
            paymentDate = new Date().toISOString().split('T')[0]
            value = transaction.getValue() * debitCardFee
        } else {
            payableStatus = 'waiting_funds'
            const today: Date = new Date()
            paymentDate = addDays(today, 30).toISOString().split('T')[0]
            value = transaction.getValue() * creditCardFee
        }

        const id: string = this.idGenerator.generate()

        const newPayable = new Payable(id, value, payableStatus, paymentDate)

        await this.payableDatabase.createPayable(newPayable)
    }

    public async getBalance(): Promise<BalanceOutputDTO> {

        const payables = await this.payableDatabase.getPayables()

        if(!payables.length) {
            throw new CustomError('No payable found', 404)
        }

        let availableArr = []
        let waitingFundsArr = []

        for (const payable of payables) {
            if (payable.status === 'paid') {
                availableArr.push(payable)
            } else {
                waitingFundsArr.push(payable)
            }
        }

        const totalAvailable: number = availableArr.reduce(function(a, b) {
            return a + b.value
        }, 0)

        const totalWaitingFunds: number = waitingFundsArr.reduce(function(a, b) {
            return a + b.value
        }, 0)

        const balance: BalanceOutputDTO = {
            available: totalAvailable,
            waitingFunds: totalWaitingFunds
        }

        return balance
    }

}