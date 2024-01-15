import { CustomerStoragePort } from "@/business/ports/storage.port";
import { CustomerUseCase } from "./customer.usecase";
import { Customer } from "@/domain/entities";
import { Logger } from "@/business/ports/logger.port";

export class UpdateCustomerUseCase extends CustomerUseCase {

    constructor(customerStoragePort: CustomerStoragePort, logger: Logger) {
        super(customerStoragePort, logger)
    }

    async execute(customer: Customer): Promise<Customer> {
        const updatedCustomer = await this.customerStoragePort.update(customer)

        this.logger.info(`Customer ${updatedCustomer.name} updated`)

        return updatedCustomer
    }
}