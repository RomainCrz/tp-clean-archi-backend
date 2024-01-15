import { Logger } from "@/business/ports/logger.port";
import { ProductStoragePort } from "@/business/ports/storage.port";
import { Product } from "@/domain/entities";
import { ProductUseCase } from "./product.usecase";

export class CreateproductUseCase extends ProductUseCase {
  
    constructor(productStoragePort : ProductStoragePort, logger : Logger) {
        super(productStoragePort, logger)
    }

    async execute(product: Product): Promise<Product> {
        const newProduct = await this.productStoragePort.create(product)

        this.logger.info(`product ${newProduct.name} created`)

        return newProduct
    }
}