import { Router } from 'express';
import { addProduct } from '../controllers/product';

const productRouter = Router();

productRouter.post('/', addProduct);

export default productRouter;
