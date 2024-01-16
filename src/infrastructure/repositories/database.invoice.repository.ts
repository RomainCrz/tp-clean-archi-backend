import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { Invoice } from "@/domain/entities";
import { PrismaClient } from "@prisma/client";
import { Invoice as InvoiceModel, Customer as CustomerModel, Product as ProductModel} from '@prisma/client'

type InvoiceWithRelations = InvoiceModel & {
    customer: CustomerModel,
    products: ProductModel[]

}

export class InvoiceStorage implements InvoiceStoragePort {
    db : PrismaClient
    constructor () {
        this.db = new PrismaClient()
    }

    private toEntity(invoice: InvoiceWithRelations): Invoice {
        const customer = invoice.customer

        const products = invoice.products

        return new Invoice({
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            invoiceDate: invoice.invoiceDate,
            dueDate: invoice.dueDate,
            status: invoice.status,
            totalAmount: invoice.totalAmount,
            totalTax: invoice.totalTax,
            totalAmountWithTax: invoice.totalAmountWithTax,
            customer: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                address: customer.address,
                phone: customer.phone,
                city: customer.city,
                state: customer.state,
                country: customer.country,
                zip: customer.zip
            },
            products: products.map(product => {
                return {
                    id: product.id,
                    baseProductId: product.baseProductId,
                    name: product.name,
                    price: product.price,
                    tax: product.tax,
                    description: product.description
                }
            })
        })
    }
    
    async create (invoice: Invoice) : Promise<Invoice> {
        if (!invoice.customer.id) {
            throw new Error('Customer is required')
        }
        const newInvoice = await this.db.invoice.create({
            data: {
                invoiceNumber: invoice.invoiceNumber,
                invoiceDate: invoice.invoiceDate,
                dueDate: invoice.dueDate,
                status: invoice.status,
                totalAmount: invoice.totalAmount,
                totalTax: invoice.totalTax,
                totalAmountWithTax: invoice.totalAmountWithTax,
                customerId: invoice.customer.id,
                products: {
                    connect: invoice.products.map(product => {
                        return { id: product.id } // Remplacez 'id' par le nom de la clé primaire de vos produits
                    })
                }
            },
            include: {
                customer: true,
                products: true
            }
        })

        return this.toEntity(newInvoice)
    }

    async update(invoice: Invoice): Promise<Invoice> {
        if (!invoice.customer.id) {
            throw new Error('Customer is required')
        }
        const updatedInvoice = await this.db.invoice.update({
            where: {
                id: invoice.id
            },
            data: {
                invoiceNumber: invoice.invoiceNumber,
                invoiceDate: invoice.invoiceDate,
                dueDate: invoice.dueDate,
                status: invoice.status,
                totalAmount: invoice.totalAmount,
                totalTax: invoice.totalTax,
                totalAmountWithTax: invoice.totalAmountWithTax,
                customerId: invoice.customer.id,
                products: {
                    connect: invoice.products.map(product => {
                        return { id: product.id } // Remplacez 'id' par le nom de la clé primaire de vos produits
                    })
                }
            },
            include: {
                customer: true, 
                products: true 
            }
        })   

        return this.toEntity(updatedInvoice)
    }

    async delete(id: string): Promise<void> {
        await this.db.invoice.delete({
            where: {
                id
            }
        })
    }

    async findById(id: string): Promise<Invoice | null> {
        const invoice = await this.db.invoice.findUnique({
            where: {
                id
            },
            include: {
                customer: true,
                products: true
            }
        })

        if (!invoice) return null

        return this.toEntity(invoice)
    }

    async findByNumber(number: string): Promise<Invoice | null> {
        const invoice = await this.db.invoice.findUnique({
            where: {
                invoiceNumber: number
            },
            include: {
                customer: true,
                products: true
            }
        })

        if (!invoice) return null 

        return this.toEntity(invoice)
    }

    async list(): Promise<Invoice[]> {
        const invoices = await this.db.invoice.findMany({
            include: {
                customer: true,
                products: true
            }
        })

        return invoices.map(invoice => this.toEntity(invoice))
    }

    async findByCustomerId(customerId: string): Promise<Invoice[]> {
        const invoices = await this.db.invoice.findMany({
            where: {
                customerId
            },
            include: {
                customer: true,
                products: true
            }
        })

        return invoices.map(invoice => this.toEntity(invoice))
    }
}

