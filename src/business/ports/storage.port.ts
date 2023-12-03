import { Customer } from '@/domain/entities/customer.entity';
import { Invoice, Product } from '@/domain/entities';

export interface CustomerStoragePort {
    create(customer: Customer): Promise<Customer>
    update(customer: Customer): Promise<Customer>
    delete(id: string): Promise<void>
    findById(id: string): Promise<Customer>
    findByName(name: string): Promise<Customer[]>
    list(limit: number, offset: number): Promise<Customer[]>
}

export interface ProductStoragePort {
    create(product: Product): Promise<Product>
    update(product: Product): Promise<Product>
    delete(id: string): Promise<void>
    findById(id: string): Promise<Product>
    findByName(name: string): Promise<Product[]>
    list(limit: number, offset: number): Promise<Product[]>
}

export interface InvoiceStoragePort {
    create(invoice: Invoice): Promise<Invoice>
    update(invoice: Invoice): Promise<void>
    delete(id: string): Promise<void>
    findById(id: string): Promise<Invoice>
    findByNumber(number: string): Promise<Invoice>
    list(limit: number, offset: number): Promise<Invoice[]>
}