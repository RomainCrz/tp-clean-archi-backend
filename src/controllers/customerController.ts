import { CreateCustomerUseCase } from '@/business/usecases/customer/create_customer.usecase';
import { UpdateCustomerUseCase } from '@/business/usecases/customer/update_customer.usecase';
import { customerSchema, customerWithIdSchema } from '@/domain/entities';
import { CustomerStorage } from '@/infrastructure/repositories';
import { LoggerRepository } from '@/infrastructure/repositories/logger.repository';
import { Request, Response } from 'express';
import { validate } from '../../utils/validate';
import { DeleteCustomerUseCase } from '@/business/usecases/customer/delete_customer.usecase';
import { FindByIdCustomerUseCase } from '@/business/usecases/customer/findById_customer.usecase';
import { FindByNameCustomerUseCase } from '@/business/usecases/customer/findByName_customer.usecase';
import { ListCustomerUseCase } from '@/business/usecases/customer/list_customer.usecase';

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

export async function deleteCustomer(request: Request, response: Response) {
    const customerId = request.params.id

    if (!customerId) {
        response.status(400).json({ message: 'Missing customer id' })
        return
    }

    const logger = new LoggerRepository()
    const customerStorage = new CustomerStorage()
    const deleteCustomer = new DeleteCustomerUseCase(customerStorage, logger)

    const deletedCustomer = await deleteCustomer.execute(customerId)

    if (!deletedCustomer) {
        response.status(400).json({ message: 'Error deleting customer' })
        return
    }

    response.json({ message: 'Customer deleted' })
}

export async function getCustomerById(request: Request, response: Response) {
    const customerId = request.params.id

    if (!customerId) {
        response.status(400).json({ message: 'Missing customer id' })
        return
    }

    const logger = new LoggerRepository()
    const customerStorage = new CustomerStorage()
    const getCustomer = new FindByIdCustomerUseCase(customerStorage, logger)

    const customer = await getCustomer.execute(customerId)

    if (!customer) {
        response.status(400).json({ message: 'Error getting customer' })
        return
    }

    response.json(customer)
}

export async function getCustomerByName(request: Request, response: Response) {
    const customerName = request.params.name

    if (!customerName) {
        response.status(400).json({ message: 'Missing customer name' })
        return
    }

    const logger = new LoggerRepository()
    const customerStorage = new CustomerStorage()
    const getCustomer = new FindByNameCustomerUseCase(customerStorage, logger)

    const customer = await getCustomer.execute(customerName)

    if (!customer) {
        response.status(400).json({ message: 'Error getting customer' })
        return
    }

    response.json(customer)
}

export async function getAllCustomers(request: Request, response: Response) {
    const logger = new LoggerRepository()
    const customerStorage = new CustomerStorage()


    const getCustomer = new ListCustomerUseCase(customerStorage, logger)
    const customers = await getCustomer.execute({limit: 10, offset: 0})

    if (!customers) {
        response.status(400).json({ message: 'Error getting customers' })
        return
    }

    response.json(customers)
}