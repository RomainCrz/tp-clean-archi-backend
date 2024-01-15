import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { InvoiceUseCase } from "./invoice.usecase";
import { Logger } from "@/business/ports/logger.port";
import { Invoice } from "@/domain/entities";

export class ListInvoiceUseCase extends InvoiceUseCase {

    constructor(invoiceStoragePort: InvoiceStoragePort, logger: Logger) {
        super(invoiceStoragePort, logger)
    }

    async execute({limit, offset}: {limit: number, offset: number}): Promise<Invoice[]> {
    
        const invoices = await this.invoiceStoragePort.list(limit, offset)

        this.logger.info(`[ListinvoiceUseCase] Executing with args ${JSON.stringify(invoices)}`)

        return invoices
    }
}