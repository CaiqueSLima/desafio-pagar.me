export interface TransactionData {
    value: number
    description: string
    payment_method: string
    card_number: number
    card_owner: string
    card_exp_date: string
    card_CVV: number
}

export class Transaction {

    constructor(
        private value: number,
        private description: string,
        private paymentMethod: string,
        private cardNumber: number,
        private cardOwner: string,
        private cardExpDate: string,
        private cardCVV: number
    ) { }

    public getValue = (): number => this.value
    public getDescription = (): string => this.description
    public getPaymentMethod = (): string => this.paymentMethod
    public getCardNumber = (): number => this.cardNumber
    public getCardOwner = (): string => this.cardOwner
    public getCardExpDate = (): string => this.cardExpDate
    public getCardCVV = (): number => this.cardCVV

    public static toTransactionModel(transaction: TransactionData): Transaction {
        return new Transaction(
            transaction.value,
            transaction.description,
            transaction.payment_method,
            transaction.card_number,
            transaction.card_owner,
            transaction.card_exp_date,
            transaction.card_CVV
        )
    }
}