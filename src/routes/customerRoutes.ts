import express from 'express';
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, getCustomerByName, updateCustomer } from '@/controllers/customerController';

const router = express.Router();

router.post('/create', createCustomer);
router.post('/update', updateCustomer);
router.delete('/:id', deleteCustomer);
router.get('/:id', getCustomerById);
router.get('/name/:name', getCustomerByName);
router.get('/', getAllCustomers);

export default router;
