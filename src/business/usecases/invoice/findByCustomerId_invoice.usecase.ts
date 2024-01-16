import { Logger } from "@/business/ports/logger.port";
import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { InvoiceUseCase } from "./invoice.usecase";
import { Invoice } from "@/domain/entities";

export class FindByCustomerId extends InvoiceUseCase {
    constructor(invoiceStoragePort: InvoiceStoragePort, logger: Logger) {
        super(invoiceStoragePort, logger);
    }
    async execute(userId: string): Promise<Invoice[]> {
        this.logger.info(`[FindByUserId] Executing with args ${JSON.stringify(userId)}`);
        const invoice = await this.invoiceStoragePort.findByCustomerId(userId);
        if (!invoice) {
            this.logger.info(`[FindByUserId] invoice not found`);
            return [];
        }
        return invoice;
    }
}