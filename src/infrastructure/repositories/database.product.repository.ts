import { ProductStoragePort } from "@/business/ports/storage.port";
import { Product } from "@/domain/entities";
import { PrismaClient } from "@prisma/client";
import { Product as ProductModel} from '@prisma/client'

export class ProductStorage implements ProductStoragePort {
    db: PrismaClient
    
    constructor() {
        this.db = new PrismaClient()
    }

    private toEntity(product: ProductModel): Product {
        return new Product({
            id: product.id,
            baseProductId: product.baseProductId,
            name: product.name,
            price: product.price,
            tax: product.tax,
            description: product.description
        })
    }

    async create(product: Product): Promise<Product> {
        const newProduct = await this.db.product.create({
            data: {
                baseProductId: product.baseProductId,
                name: product.name,
                price: product.price,
                tax: product.tax,
                description: product.description
            }
        })

        return this.toEntity(newProduct)
    }

    async update(product: Product): Promise<Product> {
        const updatedProduct = await this.db.product.update({
            where: {
                id: product.id
            },
            data: {
                baseProductId: product.baseProductId,
                name: product.name,
                price: product.price,
                tax: product.tax,
                description: product.description || ''
            }
        })

        return this.toEntity(updatedProduct)
    }

    async delete(id: string): Promise<void> {
        await this.db.product.delete({
            where: {
                id
            }
        })
    }

    async findById(id: string): Promise<Product> {
        const product = await this.db.product.findUnique({
            where: {
                id
            }
        })

        if (!product) throw new Error('Product not found')

        return this.toEntity(product)
    }

    async findByName(name: string): Promise<Product[]> {
        const products = await this.db.product.findMany({
            where: {
                name
            }
        })

        return products.map((product) => this.toEntity(product))
    }

    async list(limit: number, offset: number): Promise<Product[]> {
        const products = await this.db.product.findMany({
            take: limit,
            skip: offset
        })

        return products.map((product) => this.toEntity(product))
    }

}