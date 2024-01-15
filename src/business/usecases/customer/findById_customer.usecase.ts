import { Logger } from "@/business/ports/logger.port";
import { CustomerStoragePort } from "@/business/ports/storage.port";
import { CustomerUseCase } from "./customer.usecase";
import { Customer } from "@/domain/entities";

export class FindByIdCustomerUseCase extends CustomerUseCase {
    constructor(customerStoragePort: CustomerStoragePort, logger: Logger) {
        super(customerStoragePort, logger);
    }
    async execute(id: string): Promise<Customer> {
        this.logger.info(`[FindByIdCustomerUseCase] Executing with args ${JSON.stringify(id)}`);
        const customer = await this.customerStoragePort.findById(id);
        if (!customer) {
            throw new Error(`Customer with id ${id} not found`);
        }
        return customer;
    }
}