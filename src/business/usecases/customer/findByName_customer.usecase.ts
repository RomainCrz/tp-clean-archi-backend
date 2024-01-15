import { Logger } from "@/business/ports/logger.port";
import { CustomerStoragePort } from "@/business/ports/storage.port";
import { CustomerUseCase } from "./customer.usecase";
import { Customer } from "@/domain/entities";

export class FindByNameCustomerUseCase extends CustomerUseCase {

    constructor(customerStoragePort: CustomerStoragePort, logger: Logger) {
        super(customerStoragePort, logger);
    }

    async execute(name: string): Promise<Customer[]> {
        this.logger.info(`[FindByNameCustomerUseCase] Executing with args ${JSON.stringify(name)}`);
        const customer = await this.customerStoragePort.findByName(name);
        if (!customer) {
            throw new Error(`Customer with name ${name} not found`);
        }
        return customer;
    }
}