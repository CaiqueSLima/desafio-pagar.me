import { IPayableDatabase } from "../business/ports/IPayableDatabase"
import { Payable } from "../models/Payables"
import { BaseDatabase } from "./BaseDatabase"

export interface PayableData {
    id: string
    value: number
    status: string
    payment_date: string
    transaction_id: string
}

export class PayableDatabase extends BaseDatabase implements IPayableDatabase {

    private static TABLE_NAME = 'pagar_me_payables'

    public async createPayable(payable: Payable): Promise<void> {

        const payableToDB: PayableData = {
            id: payable.getId(),
            value: payable.getValue(),
            status: payable.getStatus(),
            payment_date: payable.getPaymentDate(),
            transaction_id: payable.getTransactionId()
        }

        await BaseDatabase.connection(PayableDatabase.TABLE_NAME).insert(payableToDB)
    }

    public async getPayables(): Promise<PayableData[]> {
        return await BaseDatabase.connection(PayableDatabase.TABLE_NAME).select()
    }

}