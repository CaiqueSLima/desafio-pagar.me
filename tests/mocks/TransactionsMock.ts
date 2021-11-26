import { TransactionDTO } from "../../src/business/TransactionBusiness"
import { TransactionData } from "../../src/data/TransactionDatabase"

export const mockTransDebit: TransactionData = {
    id: 'debit_1',
    value: 100,
    description: 'Debit Transaction from DB',
    payment_method: 'debit_card',
    card_number: 1111,
    card_owner: 'CAÍQUE LIMA',
    card_exp_date: '12/21',
    card_CVV: 123
}

export const mockTransCredit: TransactionData = {
    id: 'credit_1',
    value: 200,
    description: 'Credit Transaction from DB',
    payment_method: 'credit_card',
    card_number: 1111,
    card_owner: 'CAÍQUE LIMA',
    card_exp_date: '12/21',
    card_CVV: 123
}

export const transactionInputDTOMock: TransactionDTO = {
    value: 100,
    description: 'Mock transaction input',
    paymentMethod: 'debit_card',
    cardNumber: 1234567812345678,
    cardOwner: 'Card Owner',
    cardExpDate: '12/21',
    cardCVV: 123
}