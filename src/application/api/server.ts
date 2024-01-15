import express, { Express } from 'express';
import { createCustomer, updateCustomer } from '@/controllers/customerController';

export class Server {
    app: Express;

    constructor() {
        this.app = express();
    }

    init(): void {
        this.app.use(express.json());   
        this.app.post('/customer/create', createCustomer);
        this.app.post('/customer/update', updateCustomer);
    }

    launch(port: number): void {
        this.app.listen(port, () => console.info(`Listening on port ${port}`));
    }
}
