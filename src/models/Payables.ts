export interface PayableData {
    value: number
    status: string
    paymentDate: string
}

export class Payable {

    constructor(
        private value: number,
        private status: string,
        private paymentDate: string
    ) { }

    public getValue = (): number => this.value
    public getStatus = (): string => this.status
    public getPaymentDate = (): string => this.paymentDate

    public static toPayableModel(payable: PayableData): Payable {
        return new Payable(
            payable.value, 
            payable.status,
            payable.paymentDate
        )
    }
}