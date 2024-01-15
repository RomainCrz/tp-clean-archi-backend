import { Logger } from "@/business/ports/logger.port";
import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { Invoice } from "@/domain/entities";
import { InvoiceUseCase } from "./invoice.usecase";

export class CreateInvoiceUseCase extends InvoiceUseCase {
  
    constructor(invoiceStoragePort : InvoiceStoragePort, logger : Logger) {
        super(invoiceStoragePort, logger)
    }

    async execute(invoice: Invoice): Promise<Invoice> {
        const newinvoice = await this.invoiceStoragePort.create(invoice)

        this.logger.info(`invoice ${newinvoice.id} created`)

        return newinvoice
    }
}