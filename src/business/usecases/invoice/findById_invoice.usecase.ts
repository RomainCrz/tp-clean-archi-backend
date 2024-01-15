import { Logger } from "@/business/ports/logger.port";
import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { InvoiceUseCase } from "./invoice.usecase";
import { Invoice } from "@/domain/entities";

export class FindByIdInvoiceUseCase extends InvoiceUseCase {
    constructor(invoiceStoragePort: InvoiceStoragePort, logger: Logger) {
        super(invoiceStoragePort, logger);
    }
    async execute(id: string): Promise<Invoice | null> {
        this.logger.info(`[FindByIdinvoiceUseCase] Executing with args ${JSON.stringify(id)}`);
        const invoice = await this.invoiceStoragePort.findById(id);
        if (!invoice) {
            this.logger.info(`[FindByIdinvoiceUseCase] invoice not found`);
            return null;
        }
        return invoice;
    }
}