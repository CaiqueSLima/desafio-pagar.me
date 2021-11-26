import { Payable } from "../models/Payables"
import { BaseDatabase } from "./BaseDatabase"

export interface PayableData {
    id: string
    value: number
    status: string
    payment_date: string
}

export class PayableDatabase extends BaseDatabase {

    private static TABLE_NAME = 'pagar.me_payables'

    public async createPayable(payable: Payable): Promise<void> {

        const payableToDB: PayableData = {
            id: payable.getId(),
            value: payable.getValue(),
            status: payable.getStatus(),
            payment_date: payable.getPaymentDate()
        }

        await BaseDatabase.connection(PayableDatabase.TABLE_NAME).insert(payableToDB)
    }

}