import { PayableData } from "../../src/data/PayableDatabase";
import { Payable } from "../../src/models/Payables";

export const PayablePaidMock = new Payable('id_mock', 100, 'paid', '2021-11-26', 'transaction_id')
export const PayableWaitingMock = new Payable('id_mock', 200, 'waiting_funds', '2021-12-26', 'transaction_id')

export const PayablePaidMockFromDB: PayableData = {
    id: 'id_mock',
    value: 100,
    status: 'paid',
    payment_date: '2021-11-26',
    transaction_id: 'transaction_id'
}

export const PayableWaitingMockFromDB: PayableData = {
    id: 'id_mock',
    value: 200,
    status: 'waiting_funds',
    payment_date: '2021-11-26',
    transaction_id: 'transaction_id'
}