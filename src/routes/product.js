import { Router } from 'express';
import { addProduct, updateProduct } from '../controllers/product';

const productRouter = Router();

productRouter.post('/', addProduct);
productRouter.patch('/', updateProduct);

export default productRouter;
