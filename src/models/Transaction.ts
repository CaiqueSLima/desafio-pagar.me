import { CustomError } from "../error/CustomError"

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card'
}

export interface TransactionData {
    id: string
    value: number
    description: string
    payment_method: PaymentMethod
    card_number: number
    card_owner: string
    card_exp_date: string
    card_CVV: number
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
                throw new CustomError('Invalid card type')
        }
    }

    public static toTransactionModel(transaction: TransactionData): Transaction {
        return new Transaction(
            transaction.id,
            transaction.value,
            transaction.description,
            Transaction.stringToPaymentMethod(transaction.payment_method),
            transaction.card_number,
            transaction.card_owner,
            transaction.card_exp_date,
            transaction.card_CVV
        )
    }
}