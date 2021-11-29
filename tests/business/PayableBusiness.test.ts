import { PayableBusiness } from "../../src/business/PayableBusiness"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PayableDatabaseMock } from "../mocks/PayableDatabaseMock"
import { PayableEmptyDatabaseMock } from "../mocks/PayableEmptyDatabaseMock"
import { mockTransCredit, mockTransDebit } from "../mocks/TransactionsMock"

const payableBusiness = new PayableBusiness(new IdGeneratorMock(), new PayableDatabaseMock())
const payableBusinessEmpty = new PayableBusiness(new IdGeneratorMock(), new PayableEmptyDatabaseMock())


function addDays(date: Date, days: number): Date {
    let result = date
    result.setDate(date.getDate() + days)
    return result
}

const date = new Date().toISOString().split('T')[0]
const futureDate = addDays(new Date, 30).toISOString().split('T')[0]

describe('Testing Payable Business create payable logic', () => {

    test('Creating a debit payable', () => {
        const debitTransaction = mockTransDebit
        const result = payableBusiness.createPayableLogic(debitTransaction)

        expect(result.getId()).toEqual('id_mock')
        expect(result.getPaymentDate()).toEqual(date)
        expect(result.getStatus()).toEqual('paid')
        expect(result.getValue()).toBe(97)
        expect(result.getTransactionId()).toEqual('debit_1')
    })

    test('Creating a credit payable', () => {
        const creditTransaction = mockTransCredit
        const result = payableBusiness.createPayableLogic(creditTransaction)

        expect(result.getId()).toEqual('id_mock')
        expect(result.getPaymentDate()).toEqual(futureDate)
        expect(result.getStatus()).toEqual('waiting_funds')
        expect(result.getValue()).toBe(190)
        expect(result.getTransactionId()).toEqual('credit_1')
    })
})

describe('Testing get balance logic', () => {

    test('Getting balance with no payable in the database, must return an error', async () => {
        expect.assertions(2)
        try {
            await payableBusinessEmpty.getBalance()
        } catch (error: any) {
            expect(error.message).toEqual('No payable found')
            expect(error.statusCode).toBe(404)
        }
    })

    test('Getting balance with payable in the database, must return a balance', async () => {
        try {
            const result = await payableBusinessEmpty.getBalance()
            expect(result.available).toBe(100)
            expect(result.waitingFunds).toBe(200)
        } catch (error: any) {
            console.log(error)
        }
    })
})