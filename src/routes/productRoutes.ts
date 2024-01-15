import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductByName, updateProduct } from '@/controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/create', createProduct);
router.post('/update', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);
router.get('/name/:name', getProductByName);

export default router;
