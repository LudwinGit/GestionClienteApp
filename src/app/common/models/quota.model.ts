import { Timestamp } from "@angular/fire/firestore"

export interface Quota{
    no: number
    total: number
    total_quotas: number
    date_limit: Timestamp
    date_payment: Timestamp
    status: string
    customer_email: string
    customer_name: string
    customer_uid: string
    order_no: number
    order_uid: string
}