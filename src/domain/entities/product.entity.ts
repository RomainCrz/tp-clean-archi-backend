import { z } from "zod"

export const productSchema = z.object({
    id: z.string().optional(),
    baseProductId: z.string(),
    name: z.string(),
    price: z.number(),
    tax: z.number(),
    description: z.string(),
    active: z.boolean()
})

export const productWithIdSchema = productSchema.extend({
    id: z.string()
})



export interface ProductInterface {
    id?: string
    baseProductId: string
    name: string
    price: number
    tax: number
    description: string
    active: boolean
}

export class Product {
    id?: string
    baseProductId: string
    name: string
    price: number
    tax: number
    description: string
    active: boolean

    constructor(parameters: ProductInterface) {
        this.id = parameters.id
        this.baseProductId = parameters.baseProductId
        this.name = parameters.name
        this.price = parameters.price
        this.tax = parameters.tax
        this.description = parameters.description
        this.active = parameters.active
    }
}