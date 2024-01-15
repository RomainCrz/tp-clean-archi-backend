import { ProductStoragePort } from "@/business/ports/storage.port";
import { ProductUseCase } from "./product.usecase";
import { Logger } from "@/business/ports/logger.port";
import { Product } from "@/domain/entities";

export class ListProductUseCase extends ProductUseCase {

    constructor(productStoragePort: ProductStoragePort, logger: Logger) {
        super(productStoragePort, logger)
    }

    async execute({limit, offset}: {limit: number, offset: number}): Promise<Product[]> {
    
        const products = await this.productStoragePort.list(limit, offset)

        this.logger.info(`[ListProductUseCase] Executing with args ${JSON.stringify(products)}`)

        return products
    }
}