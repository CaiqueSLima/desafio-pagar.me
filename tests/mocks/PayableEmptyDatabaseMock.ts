import { PayableData } from "../../src/data/PayableDatabase"
import { Payable } from "../../src/models/Payables"

export class PayableEmptyDatabaseMock {

    public async createPayable(payable: Payable): Promise<void> {
    }

    public async getPayables(): Promise<PayableData[]> {
        return []
    }
}