export interface Order {
    date: Date;
    id: string;
    status: string;
    total: number;
    discount: number;
    no: string;
    total_installments: number
    paid_installments: number
    customer_uid: string
}