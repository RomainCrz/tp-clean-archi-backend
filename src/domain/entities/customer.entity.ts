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