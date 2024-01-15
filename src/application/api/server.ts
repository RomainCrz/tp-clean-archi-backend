import express, { Express } from 'express';

import customerRoutes from '@/routes/customerRoutes';
import productRoutes from '@/routes/productRoutes';
import invoiceRoutes from '@/routes/invoiceRoutes';

export class Server {
    app: Express;

    constructor() {
        this.app = express();
    }

    init(): void {
        this.app.use(express.json());   
        this.app.use('/customer', customerRoutes)
        this.app.use('/product', productRoutes)
        this.app.use('/invoice', invoiceRoutes)
    }

    launch(port: number): void {
        this.app.listen(port, () => console.info(`Listening on port ${port}`));
    }
}
