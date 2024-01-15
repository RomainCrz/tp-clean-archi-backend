import { Logger } from "@/business/ports/logger.port"
import { CustomerStoragePort } from "@/business/ports/storage.port"
import { UseCase } from "@/business/ports/usecase.port"

export abstract class CustomerUseCase implements UseCase {
    customerStoragePort : CustomerStoragePort
    logger : Logger

    constructor(customerStoragePort : CustomerStoragePort, logger : Logger) {
        this.customerStoragePort = customerStoragePort
        this.logger = logger
    }

    abstract execute(args: any): any
}