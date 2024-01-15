import { Logger } from "@/business/ports/logger.port";
import { ProductStoragePort } from "@/business/ports/storage.port";
import { ProductUseCase } from "./product.usecase";
import { Product } from "@/domain/entities";

export class FindByIdProductUseCase extends ProductUseCase {
    constructor(productStoragePort: ProductStoragePort, logger: Logger) {
        super(productStoragePort, logger);
    }
    async execute(id: string): Promise<Product | null> {
        this.logger.info(`[FindByIdproductUseCase] Executing with args ${JSON.stringify(id)}`);
        const product = await this.productStoragePort.findById(id);
        if (!product) {
            this.logger.info(`[FindByIdproductUseCase] product not found`);
            return null;
        }
        return product;
    }
}