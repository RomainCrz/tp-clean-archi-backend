import { Logger } from "@/business/ports/logger.port"
import { ProductStoragePort } from "@/business/ports/storage.port"
import { UseCase } from "@/business/ports/usecase.port"

export abstract class ProductUseCase implements UseCase {
    productStoragePort : ProductStoragePort
    logger : Logger

    constructor(productStoragePort : ProductStoragePort, logger : Logger) {
        this.productStoragePort = productStoragePort
        this.logger = logger
    }

    abstract execute(args: any): any
}