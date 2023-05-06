import { Router } from 'express';
import { addProduct, updateProduct, getProducts } from '../controllers/product';

const productRouter = Router();

productRouter.post('/', addProduct);
productRouter.patch('/', updateProduct);
productRouter.post('/search', getProducts);

export default productRouter;
