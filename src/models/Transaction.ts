import { CustomError } from "../error/CustomError"
import { TransactionData } from '../data/TransactionDatabase'

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card'
}

export class Transaction {

    constructor(
        private id: string,
        private value: number,
        private description: string,
        private paymentMethod: string,
        private cardNumber: number,
        private cardOwner: string,
        private cardExpDate: string,
        private cardCVV: number
    ) { }

    public getId = (): string => this.id
    public getValue = (): number => this.value
    public getDescription = (): string => this.description
    public getPaymentMethod = (): string => this.paymentMethod
    public getCardNumber = (): number => this.cardNumber
    public getCardOwner = (): string => this.cardOwner
    public getCardExpDate = (): string => this.cardExpDate
    public getCardCVV = (): number => this.cardCVV

    public static stringToPaymentMethod(cardType: string): PaymentMethod {
        switch (cardType.toLowerCase()) {
            case 'credit_card':
                return PaymentMethod.CREDIT_CARD;
            case 'debit_card':
                return PaymentMethod.DEBIT_CARD;
            default:
                throw new CustomError('Invalid payment method')
        }
    }

    public static toTransactionModel(
        id: string,
        value: number,
        description: string,
        paymentMethod: string,
        cardNumber: number,
        cardOwner: string,
        cardExpDate: string,
        cardCVV: number
    ): Transaction {
        return new Transaction(
            id,
            value,
            description,
            Transaction.stringToPaymentMethod(paymentMethod),
            cardNumber,
            cardOwner,
            cardExpDate,
            cardCVV
        )
    }
}