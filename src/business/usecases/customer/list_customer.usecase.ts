import { CustomerStoragePort } from "@/business/ports/storage.port";
import { CustomerUseCase } from "./customer.usecase";
import { Logger } from "@/business/ports/logger.port";
import { Customer } from "@/domain/entities";

export class ListCustomerUseCase extends CustomerUseCase {

    constructor(customerStoragePort: CustomerStoragePort, logger: Logger) {
        super(customerStoragePort, logger)
    }

    async execute({limit, offset}: {limit: number, offset: number}): Promise<Customer[]> {
    
        const customers = await this.customerStoragePort.list(limit, offset)

        this.logger.info(`[ListCustomerUseCase] Executing with args ${JSON.stringify(customers)}`)

        return customers
    }
}