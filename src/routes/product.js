import { Router } from 'express';
import { addProduct, updateProduct, getProducts, getProduct, deleteProduct } from '../controllers/product';

const productRouter = Router();

productRouter.post('/', addProduct);
productRouter.patch('/', updateProduct);
productRouter.post('/search', getProducts);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
