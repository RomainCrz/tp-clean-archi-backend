import { Logger } from "@/business/ports/logger.port";
import { InvoiceStoragePort } from "@/business/ports/storage.port";
import { InvoiceUseCase } from "./invoice.usecase";
import { Invoice } from "@/domain/entities";

export class FindByNumberInvoiceUseCase extends InvoiceUseCase {

    constructor(invoiceStoragePort: InvoiceStoragePort, logger: Logger) {
        super(invoiceStoragePort, logger);
    }

    async execute(number: string): Promise<Invoice> {
        this.logger.info(`[FindByNameinvoiceUseCase] Executing with args ${JSON.stringify(number)}`);
        const invoice = await this.invoiceStoragePort.findByNumber(number);
        if (!invoice) {
            throw new Error(`invoice with name ${number} not found`);
        }
        return invoice;
    }
}