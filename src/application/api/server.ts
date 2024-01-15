import express, { Express } from 'express';
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, getCustomerByName, updateCustomer } from '@/controllers/customerController';

export class Server {
    app: Express;

    constructor() {
        this.app = express();
    }

    init(): void {
        this.app.use(express.json());   
        this.app.post('/customer/create', createCustomer);
        this.app.post('/customer/update', updateCustomer);
        this.app.delete('/customer/:id', deleteCustomer);
        this.app.get('/customer/:id', getCustomerById);
        this.app.get('/customer/name/:name', getCustomerByName);
        this.app.get('/customers', getAllCustomers)
    }

    launch(port: number): void {
        this.app.listen(port, () => console.info(`Listening on port ${port}`));
    }
}
