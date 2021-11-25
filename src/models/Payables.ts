export interface PayableData {
    id: string
    value: number
    status: string
    paymentDate: string
}

export class Payable {

    constructor(
        private id: string,
        private value: number,
        private status: string,
        private paymentDate: string
    ) { }

    public getId = (): string => this.id
    public getValue = (): number => this.value
    public getStatus = (): string => this.status
    public getPaymentDate = (): string => this.paymentDate

    public static toPayableModel(payable: PayableData): Payable {
        return new Payable(
            payable.id,
            payable.value, 
            payable.status,
            payable.paymentDate
        )
    }
}