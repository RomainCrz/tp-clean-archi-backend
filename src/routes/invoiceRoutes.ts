import express from 'express';
import { createInvoice, deleteInvoice, getAllInvoices, getInvoiceById, getInvoiceByNumber, updateInvoice } from '@/controllers/invoiceController';

const router = express.Router();

router.post('/create', createInvoice);
router.post('/update', updateInvoice);
router.delete('/:id', deleteInvoice);
router.get('/:id', getInvoiceById);
router.get('/number/:number', getInvoiceByNumber);
router.get('/', getAllInvoices);

export default router;
