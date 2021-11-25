import { CustomError } from "../error/CustomError"

export enum PayableStatus {
    PAID = 'paid',
    WAITING_FUNDS = 'waiting_funds'
}

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

    public static stringToStatus(status: string): PayableStatus {
        switch (status.toLowerCase()) {
            case 'paid':
                return PayableStatus.PAID;
            case 'waiting_funds':
                return PayableStatus.WAITING_FUNDS;
            default:
                throw new CustomError('Invalid status')
        }
    }

    public static toPayableModel(payable: PayableData): Payable {
        return new Payable(
            payable.id,
            payable.value, 
            payable.status,
            payable.paymentDate
        )
    }
}