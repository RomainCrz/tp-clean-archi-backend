import { Logger } from "@/business/ports/logger.port";
import { ProductStoragePort } from "@/business/ports/storage.port";
import { ProductUseCase } from "./product.usecase";
import { Product } from "@/domain/entities";

export class FindByNameproductUseCase extends ProductUseCase {

    constructor(productStoragePort: ProductStoragePort, logger: Logger) {
        super(productStoragePort, logger);
    }

    async execute(name: string): Promise<Product[]> {
        this.logger.info(`[FindByNameproductUseCase] Executing with args ${JSON.stringify(name)}`);
        const products = await this.productStoragePort.findByName(name);
        if (!products) {
            throw new Error(`product with name ${name} not found`);
        }
        return products;
    }
}