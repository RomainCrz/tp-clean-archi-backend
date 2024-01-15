import { Logger } from "@/business/ports/logger.port"
import { InvoiceStoragePort } from "@/business/ports/storage.port"
import { UseCase } from "@/business/ports/usecase.port"

export abstract class InvoiceUseCase implements UseCase {
    invoiceStoragePort : InvoiceStoragePort
    logger : Logger

    constructor(invoiceStoragePort : InvoiceStoragePort, logger : Logger) {
        this.invoiceStoragePort = invoiceStoragePort
        this.logger = logger
    }

    abstract execute(args: any): any
}