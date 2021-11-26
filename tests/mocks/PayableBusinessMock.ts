import { BalanceOutputDTO } from "../../src/business/PayableBusiness"
import { CustomError } from "../../src/error/CustomError"
import { Payable } from "../../src/models/Payables"
import { Transaction } from "../../src/models/Transaction"
import { PayablePaidMock, PayableWaitingMock } from "./PayableMock"

export class PayableBusinessMock {
    public createPayableLogic(transaction: Transaction): Payable {

        if (transaction.getPaymentMethod() === 'debit_card') {
            return PayablePaidMock
        } else {
            return PayableWaitingMock
        }
    }

    public async getBalance(): Promise<BalanceOutputDTO> {

        const balance: BalanceOutputDTO = {
            available: 0,
            waitingFunds: 0
        }

        return balance
    }
}