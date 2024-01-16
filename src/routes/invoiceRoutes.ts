import express from 'express';
import { createInvoice, deleteInvoice, getAllInvoices, getInvoiceById, getInvoiceByNumber, getInvoicesByCustomerId, updateInvoice } from '@/controllers/invoiceController';

const router = express.Router();

router.get('/', getAllInvoices);
router.post('/create', createInvoice);
router.post('/update', updateInvoice);
router.delete('/:id', deleteInvoice);
router.get('/:id', getInvoiceById);
router.get('/number/:number', getInvoiceByNumber);
router.get('/customer/:customerId', getInvoicesByCustomerId);

export default router;
