import { PayableData } from "../../data/PayableDatabase"
import { Payable } from "../../models/Payables"

export interface IPayableDatabase {
    createPayable(payable: Payable): Promise<void>
    getPayables(): Promise<PayableData[]>
}