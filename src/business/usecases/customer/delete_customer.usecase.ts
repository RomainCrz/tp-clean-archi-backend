import { CustomerUseCase } from "./customer.usecase";

export class DeleteCustomerUseCase extends CustomerUseCase {

    constructor(customerStoragePort: any, logger: any) {
        super(customerStoragePort, logger)
    }

    async execute(id: any): Promise<any> {
        try {
            await this.customerStoragePort.delete(id)

            this.logger.info(`Customer deleted`)
    
            return true   
        } catch (error) {
            this.logger.error('Error deleting customer')
            return false
        }
    }
}