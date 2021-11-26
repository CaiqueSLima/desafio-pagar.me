import { PayableBusiness } from "../../src/business/PayableBusiness"
import { TransactionBusiness } from "../../src/business/TransactionBusiness"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PayableBusinessMock } from "../mocks/PayableBusinessMock"
import { PayableDatabaseMock } from "../mocks/PayableDatabaseMock"
import { TransactionDatabaseMock } from "../mocks/TransactionDatabaseMock"
import { transactionInputDTOMock } from "../mocks/TransactionsMock"

const transactionBusiness = new TransactionBusiness(
    new IdGeneratorMock(),
    new TransactionDatabaseMock(),
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

