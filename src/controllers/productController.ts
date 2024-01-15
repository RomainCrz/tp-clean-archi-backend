import { CreateProductUseCase } from '@/business/usecases/product/create_product.usecase';
import { UpdateProductUseCase } from '@/business/usecases/product/update_product.usecase';
import { productSchema, productWithIdSchema } from '@/domain/entities';
import { ProductStorage } from '@/infrastructure/repositories';
import { LoggerRepository } from '@/infrastructure/repositories/logger.repository';
import { Request, Response } from 'express';
import { validate } from '../../utils/validate';
import { DeleteProductUseCase } from '@/business/usecases/product/delete_product.usecase';
import { FindByIdProductUseCase } from '@/business/usecases/product/findById_product.usecase';
import { FindByNameProductUseCase } from '@/business/usecases/product/finByName_product.usecase';
import { ListProductUseCase } from '@/business/usecases/product/list_product.usecase';

export async function createProduct(request: Request, response: Response) {
    
    const product = validate(productSchema, request, response)

    if (!product) {
        return
    }

    const logger = new LoggerRepository()
    
    const productStorage = new ProductStorage()
    const createProduct = new CreateProductUseCase(productStorage, logger)

    const newProduct = await createProduct.execute(product)

    response.json(newProduct)
}

export async function updateProduct(request: Request, response: Response) {
    const product = validate(productWithIdSchema, request, response)

    if (!product) {
        return
    }

    const logger = new LoggerRepository()

    const productStorage = new ProductStorage()
    const updateProduct = new UpdateProductUseCase(productStorage, logger)

    const updatedProduct = await updateProduct.execute(product)

    response.json(updatedProduct)
}

export async function deleteProduct(request: Request, response: Response) {
    const productId = request.params.id

    if (!productId) {
        response.status(400).json({ message: 'Missing product id' })
        return
    }

    const logger = new LoggerRepository()
    const productStorage = new ProductStorage()
    const deleteProduct = new DeleteProductUseCase(productStorage, logger)

    const deletedProduct = await deleteProduct.execute(productId)

    if (!deletedProduct) {
        response.status(400).json({ message: 'Error deleting product' })
        return
    }

    response.json({ message: 'product deleted' })
}

export async function getProductById(request: Request, response: Response) {
    const productId = request.params.id

    if (!productId) {
        response.status(400).json({ message: 'Missing product id' })
        return
    }

    const logger = new LoggerRepository()
    const productStorage = new ProductStorage()
    const getproduct = new FindByIdProductUseCase(productStorage, logger)

    const product = await getproduct.execute(productId)

    if (!product) {
        response.status(400).json({ message: 'Error getting product' })
        return
    }

    response.json(product)
}

export async function getProductByName(request: Request, response: Response) {
    const productName = request.params.name

    if (!productName) {
        response.status(400).json({ message: 'Missing product name' })
        return
    }

    const logger = new LoggerRepository()
    const productStorage = new ProductStorage()
    const getproduct = new FindByNameProductUseCase(productStorage, logger)

    const product = await getproduct.execute(productName)

    if (!product) {
        response.status(400).json({ message: 'Error getting product' })
        return
    }

    response.json(product)
}

export async function getAllProducts(request: Request, response: Response) {
    const logger = new LoggerRepository()
    const productStorage = new ProductStorage()


    const getProduct = new ListProductUseCase(productStorage, logger)
    const products = await getProduct.execute({limit: 10, offset: 0})

    if (!products) {
        response.status(400).json({ message: 'Error getting products' })
        return
    }

    response.json(products)
}