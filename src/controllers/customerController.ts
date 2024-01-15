import { CreateCustomerUseCase } from '@/business/usecases/customer/create_customer.usecase';
import { UpdateCustomerUseCase } from '@/business/usecases/customer/update_customer.usecase';
import { customerSchema, customerWithIdSchema } from '@/domain/entities';
import { CustomerStorage } from '@/infrastructure/repositories';
import { LoggerRepository } from '@/infrastructure/repositories/logger.repository';
import { Request, Response } from 'express';
import { validate } from '../../utils/validate';

export async function createCustomer(request: Request, response: Response) {
    
    const customer = validate(customerSchema, request, response)

    if (!customer) {
        return
    }

    const logger = new LoggerRepository()
    
    const customerStorage = new CustomerStorage()
    const createCustomer = new CreateCustomerUseCase(customerStorage, logger)

    const newCustomer = await createCustomer.execute(customer)

    response.json(newCustomer)
}

export async function updateCustomer(request: Request, response: Response) {
    const customer = validate(customerWithIdSchema, request, response)

    if (!customer) {
        return
    }

    const logger = new LoggerRepository()

    const customerStorage = new CustomerStorage()
    const updateCustomer = new UpdateCustomerUseCase(customerStorage, logger)

    const updatedCustomer = await updateCustomer.execute(customer)

    response.json(updatedCustomer)
}