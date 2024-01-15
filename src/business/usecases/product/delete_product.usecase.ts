import { ProductUseCase } from "./product.usecase";

export class DeleteProductUseCase extends ProductUseCase {

    constructor(productStoragePort: any, logger: any) {
        super(productStoragePort, logger)
    }

    async execute(id: string): Promise<boolean> {
        try {
            await this.productStoragePort.delete(id)

            this.logger.info(`product deleted`)
    
            return true   
        } catch (error) {
            this.logger.error('Error deleting product')
            return false
        }
    }
}