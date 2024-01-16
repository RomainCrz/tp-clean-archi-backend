import { z } from "zod"
import { Customer, customerSchema } from './customer.entity';
import { Product, productSchema } from "./product.entity"


export const invoiceSchema = z.object({
    id: z.string().optional(),
    invoiceNumber: z.string(),
    invoiceDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    status: z.enum(['draft', 'sent', 'paid', 'cancelled', 'overdue']),
    totalAmount: z.number(),
    totalTax: z.number(),
    totalAmountWithTax: z.number(),
    customer: customerSchema,
    products: z.array(productSchema)

})

export const invoiceWithIdSchema = invoiceSchema.extend({
    id: z.string()
})
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