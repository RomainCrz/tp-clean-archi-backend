import { z } from 'zod';

export const customerSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zip: z.string(),
 })

export const customerWithIdSchema = customerSchema.extend({
    id: z.string()
})

export interface CustomerInterface {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export class Customer {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
    city: string;
    state: string;
    country: string;
    zip: string;

    constructor(customer: CustomerInterface) {
        console.log('customerinterface', customer)
        this.id = customer.id || undefined;
        this.name = customer.name;
        this.email = customer.email;
        this.phone = customer.phone;
        this.address = customer.address;
        this.createdAt = customer.createdAt || undefined;
        this.updatedAt = customer.updatedAt || undefined;
        this.city = customer.city;
        this.state = customer.state;
        this.country = customer.country;
        this.zip = customer.zip;
    }
}