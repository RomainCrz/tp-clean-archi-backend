import { ProductStoragePort } from "@/business/ports/storage.port";
import { ProductUseCase } from "./product.usecase";
import { Logger } from "@/business/ports/logger.port";
import { Product } from "@/domain/entities";

export class UpdateProductUseCase extends ProductUseCase {

    constructor(productStoragePort: ProductStoragePort, logger: Logger) {
        super(productStoragePort, logger)
    }

    async execute(product: any): Promise<Product> {
        const updatedProduct = await this.productStoragePort.update(product)

        this.logger.info(`product ${updatedProduct.name} updated`)

        return updatedProduct
    }
}