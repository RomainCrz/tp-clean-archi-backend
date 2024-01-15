import { InvoiceUseCase } from "./invoice.usecase";

export class DeleteInvoiceUseCase extends InvoiceUseCase {

    constructor(invoiceStoragePort: any, logger: any) {
        super(invoiceStoragePort, logger)
    }

    async execute(id: string): Promise<boolean> {
        try {
            await this.invoiceStoragePort.delete(id)

            this.logger.info(`invoice deleted`)
    
            return true   
        } catch (error) {
            this.logger.error('Error deleting invoice')
            return false
        }
    }
}