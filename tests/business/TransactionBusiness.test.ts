import { PayableBusiness } from "../../src/business/PayableBusiness"
import { TransactionBusiness } from "../../src/business/TransactionBusiness"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PayableBusinessMock } from "../mocks/PayableBusinessMock"
import { PayableDatabaseMock } from "../mocks/PayableDatabaseMock"
import { TransactionDatabaseEmptyMock } from "../mocks/TransactionDatabaseEmptyMock"
import { TransactionDatabaseValidMock } from "../mocks/TransactionDatabaseValidMock"
import { mockTransCreditFromDB, mockTransDebitFromDB, transactionInputDTOMock } from "../mocks/TransactionsMock"

const transactionBusiness = new TransactionBusiness(
    new IdGeneratorMock(),
    new TransactionDatabaseValidMock(),
    new PayableBusinessMock() as PayableBusiness,
    new PayableDatabaseMock()
)

const transactionBusiness2 = new TransactionBusiness(
    new IdGeneratorMock(),
    new TransactionDatabaseEmptyMock(),
    new PayableBusinessMock() as PayableBusiness,
    new PayableDatabaseMock()
)

describe('Testing Transaction Business creating transactions', () => {

    test('Testing missing input, must return an error', async () => {
        const input = { ...transactionInputDTOMock, cardOwner: ''}
        expect.assertions(2)
        try {
            await transactionBusiness.createTransactionLogic(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Missing inputs or invalid value')
        }
    })

    test('Testing invalid value (0 or less), must return an error', async () => {
        const input = { ...transactionInputDTOMock, value: 0}
        expect.assertions(2)
        try {
            await transactionBusiness.createTransactionLogic(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Missing inputs or invalid value')
        }
    })

    test('Testing invalid card number (length different than 16), must return an error', async () => {
        const input = { ...transactionInputDTOMock, cardNumber: 123456}
        expect.assertions(2)
        try {
            await transactionBusiness.createTransactionLogic(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Invalid Card Number')
        }
    })

    test('Testing invalid CVV (length different than 3), must return an error', async () => {
        const input = { ...transactionInputDTOMock, cardCVV: 123456}
        expect.assertions(2)
        try {
            await transactionBusiness.createTransactionLogic(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Invalid CVV')
        }
    })

    test('Testing invalid payment method, must return an error', async () => {
        const input = { ...transactionInputDTOMock, paymentMethod: 'boleto'}
        expect.assertions(2)
        try {
            await transactionBusiness.createTransactionLogic(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Invalid payment method')
        }
    })

    test('Testing success case, should return nothing', async () => {
        const input = transactionInputDTOMock
        expect.assertions(1)
        try {
            const result =await transactionBusiness.createTransactionLogic(input)
            expect(result).toBeUndefined()
        } catch (error: any) {
            console.log(error)
        }
    })
})

describe('Testing Transaction Business getting transactions', () => {

    test('Testing getting transactions, must return an array of transactions', async () => {
        try {
            const result = await transactionBusiness.getTransactions()
            expect(result).toEqual([mockTransCreditFromDB, mockTransDebitFromDB])
        } catch (error: any) {
            console.log(error)
        }
    })

    test('Testing getting transactions, must return an error', async () => {
        expect.assertions(2)
        try {
            await transactionBusiness2.getTransactions()
        } catch (error: any) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toEqual('No transaction found')
        }
    })
})