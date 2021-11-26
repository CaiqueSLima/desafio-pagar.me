import { PayableData } from "../../src/data/PayableDatabase"
import { Payable } from "../../src/models/Payables"
import { PayablePaidMockFromDB, PayableWaitingMockFromDB } from "./PayableMock"

export class PayableDatabaseMock {

    public async createPayable(payable: Payable): Promise<void> {
    }

    public async getPayables(): Promise<PayableData[]> {
        return [PayablePaidMockFromDB, PayableWaitingMockFromDB]
    }
}