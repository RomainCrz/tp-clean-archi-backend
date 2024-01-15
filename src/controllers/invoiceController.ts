import { CreateInvoiceUseCase } from '@/business/usecases/invoice/create_invoice.usecase';
import { UpdateInvoiceUseCase } from '@/business/usecases/invoice/update_invoice.usecase';
import { invoiceSchema, invoiceWithIdSchema } from '@/domain/entities';
import { InvoiceStorage } from '@/infrastructure/repositories';
import { LoggerRepository } from '@/infrastructure/repositories/logger.repository';
import { Request, Response } from 'express';
import { validate } from '../../utils/validate';
import { DeleteInvoiceUseCase } from '@/business/usecases/invoice/delete_invoice.usecase';
import { FindByIdInvoiceUseCase } from '@/business/usecases/invoice/findById_invoice.usecase';
import { ListInvoiceUseCase } from '@/business/usecases/invoice/list_invoice.usecase';
import { FindByNumberInvoiceUseCase } from '@/business/usecases/invoice/finByNumber_invoice.usecase';

export async function createInvoice(request: Request, response: Response) {
    
    const invoice = validate(invoiceSchema, request, response)

    if (!invoice) {
        return
    }

    const logger = new LoggerRepository()
    
    const invoiceStorage = new InvoiceStorage()
    const createInvoice = new CreateInvoiceUseCase(invoiceStorage, logger)

    const newInvoice = await createInvoice.execute(invoice)

    response.json(newInvoice)
}

export async function updateInvoice(request: Request, response: Response) {
    const invoice = validate(invoiceWithIdSchema, request, response)

    if (!invoice) {
        return
    }

    const logger = new LoggerRepository()

    const invoiceStorage = new InvoiceStorage()
    const updateInvoice = new UpdateInvoiceUseCase(invoiceStorage, logger)

    const updatedInvoice = await updateInvoice.execute(invoice)

    response.json(updatedInvoice)
}

export async function deleteInvoice(request: Request, response: Response) {
    const invoiceId = request.params.id

    if (!invoiceId) {
        response.status(400).json({ message: 'Missing invoice id' })
        return
    }

    const logger = new LoggerRepository()
    const invoiceStorage = new InvoiceStorage()
    const deleteInvoice = new DeleteInvoiceUseCase(invoiceStorage, logger)

    const deletedInvoice = await deleteInvoice.execute(invoiceId)

    if (!deletedInvoice) {
        response.status(400).json({ message: 'Error deleting invoice' })
        return
    }

    response.json({ message: 'Invoice deleted' })
}

export async function getInvoiceById(request: Request, response: Response) {
    const invoiceId = request.params.id

    if (!invoiceId) {
        response.status(400).json({ message: 'Missing invoice id' })
        return
    }

    const logger = new LoggerRepository()
    const invoiceStorage = new InvoiceStorage()
    const getInvoice = new FindByIdInvoiceUseCase(invoiceStorage, logger)

    const invoice = await getInvoice.execute(invoiceId)

    if (!invoice) {
        response.status(400).json({ message: 'Error getting invoice' })
        return
    }

    response.json(invoice)
}

export async function getInvoiceByNumber(request: Request, response: Response) {
    const invoiceNumber = request.params.number

    if (!invoiceNumber) {
        response.status(400).json({ message: 'Missing invoice number' })
        return
    }

    const logger = new LoggerRepository()
    const invoiceStorage = new InvoiceStorage()
    const getInvoice = new FindByNumberInvoiceUseCase(invoiceStorage, logger)

    const invoice = await getInvoice.execute(invoiceNumber)

    if (!invoice) {
        response.status(400).json({ message: 'Error getting invoice' })
        return
    }

    response.json(invoice)
}

export async function getAllInvoices(request: Request, response: Response) {
    const logger = new LoggerRepository()
    const invoiceStorage = new InvoiceStorage()


    const getInvoice = new ListInvoiceUseCase(invoiceStorage, logger)
    const invoices = await getInvoice.execute({limit: 10, offset: 0})

    if (!invoices) {
        response.status(400).json({ message: 'Error getting invoices' })
        return
    }

    response.json(invoices)
}