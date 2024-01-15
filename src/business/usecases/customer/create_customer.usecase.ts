import { Logger } from "@/business/ports/logger.port";
import { CustomerStoragePort } from "@/business/ports/storage.port";
import { Customer } from "@/domain/entities";
import { CustomerUseCase } from "./customer.usecase";

export class CreateCustomerUseCase extends CustomerUseCase {
  
    constructor(customerStoragePort : CustomerStoragePort, logger : Logger) {
        super(customerStoragePort, logger)
    }

    async execute(customer: Customer): Promise<Customer> {
        const newCustomer = await this.customerStoragePort.create(customer)

        this.logger.info(`Customer ${newCustomer.name} created`)

        return newCustomer
    }
}