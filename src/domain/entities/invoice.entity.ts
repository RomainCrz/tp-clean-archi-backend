import { Customer } from "./customer.entity"
import { Product } from "./product.entity"

export interface InvoiceInterface {
    id?: string
    invoiceNumber: string
    invoiceDate: Date
    dueDate: Date
    status: 'draft' | 'sent' | 'paid' | 'cancelled' | 'overdue'
    totalAmount: number
    totalTax: number
    totalAmountWithTax: number
    customer : Customer
    products: Product[]

}

export class Invoice {
    id?: string
    invoiceNumber: string
    invoiceDate: Date
    dueDate: Date
    status: 'draft' | 'sent' | 'paid' | 'cancelled' | 'overdue'
    totalAmount: number
    totalTax: number
    totalAmountWithTax: number
    customer: Customer
    products: Product[]

    constructor(invoice: InvoiceInterface) {
        this.id = invoice.id || undefined
        this.invoiceNumber = invoice.invoiceNumber
        this.invoiceDate = invoice.invoiceDate
        this.dueDate = invoice.dueDate
        this.status = invoice.status
        this.totalAmount = invoice.totalAmount
        this.totalTax = invoice.totalTax
        this.totalAmountWithTax = invoice.totalAmountWithTax
        this.customer = invoice.customer
        this.products = invoice.products
    }
}