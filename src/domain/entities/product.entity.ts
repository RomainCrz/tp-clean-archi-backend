export interface ProductInterface {
    id?: string
    baseProductId: string
    name: string
    price: number
    tax: number
    description: string
}

export class Product {
    id?: string
    baseProductId: string
    name: string
    price: number
    tax: number
    description: string

    constructor(parameters: ProductInterface) {
        this.id = parameters.id
        this.baseProductId = parameters.baseProductId
        this.name = parameters.name
        this.price = parameters.price
        this.tax = parameters.tax
        this.description = parameters.description
    }
}