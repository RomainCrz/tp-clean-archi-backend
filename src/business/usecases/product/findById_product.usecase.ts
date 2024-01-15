import { Logger } from "@/business/ports/logger.port";
import { ProductStoragePort } from "@/business/ports/storage.port";
import { ProductUseCase } from "./product.usecase";
import { Product } from "@/domain/entities";

export class FindByIdproductUseCase extends ProductUseCase {
    constructor(productStoragePort: ProductStoragePort, logger: Logger) {
        super(productStoragePort, logger);
    }
    async execute(id: string): Promise<Product> {
        this.logger.info(`[FindByIdproductUseCase] Executing with args ${JSON.stringify(id)}`);
        const product = await this.productStoragePort.findById(id);
        if (!product) {
            throw new Error(`product with id ${id} not found`);
        }
        return product;
    }
}