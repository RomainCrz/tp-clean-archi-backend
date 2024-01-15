import { CustomerStoragePort } from "@/business/ports/storage.port";
import { Customer } from "@/domain/entities";
import { PrismaClient } from "@prisma/client";
import { Customer as CustomerModel} from '@prisma/client'

export class CustomerStorage implements CustomerStoragePort {
    db : PrismaClient
    constructor () {
        this.db = new PrismaClient()
    }

    private toEntity(customer: CustomerModel): Customer {
        return new Customer({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            country: customer.country,
            zip: customer.zip
        })
    }

    async create(customer: Customer): Promise<Customer> {
        const newCustomer = await  this.db.customer.create({
            data: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                city: customer.city,
                state: customer.state,
                country: customer.country,
                zip: customer.zip
            }
        })

        return this.toEntity(newCustomer)
    }

    async update(customer: Customer): Promise<Customer> {
        const updatedCustomer = await this.db.customer.update({
            where: {
                id: customer.id
            },
            data: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                city: customer.city,
                state: customer.state,
                country: customer.country,
                zip: customer.zip
            }
        })

        return this.toEntity(updatedCustomer)
    }

    async delete(id: string): Promise<void> {
        await this.db.customer.delete({
            where: {
                id: id
            }
        })
    }

    async findById(id: string): Promise<Customer | null> {
        const customer = await this.db.customer.findUnique({
            where: {
                id: id
            }
        })

        if (!customer) return null

        return this.toEntity(customer)
    }

    async findByName(name: string): Promise<Customer[]> {
        const customer = await this.db.customer.findMany({
            where: {
                name: name
            }
        })

        if (!customer) return []

        return customer.map(this.toEntity)
    }

    async list(limit: number, offset: number): Promise<Customer[]> {
        const customers = await this.db.customer.findMany({
            take: limit,
            skip: offset
        })

        return customers.map(this.toEntity)
    }
}