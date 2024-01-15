import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { InvoiceUseCase } from "./invoice.usecase";
import { Logger } from "@/business/ports/logger.port";
import { Invoice } from "@/domain/entities";

export class UpdateInvoiceUseCase extends InvoiceUseCase {

    constructor(invoiceStoragePort: InvoiceStoragePort, logger: Logger) {
        super(invoiceStoragePort, logger)
    }

    async execute(invoice: any): Promise<Invoice> {
        const updatedinvoice = await this.invoiceStoragePort.update(invoice)

        this.logger.info(`invoice ${updatedinvoice.invoiceNumber} updated`)

        return updatedinvoice
    }
}