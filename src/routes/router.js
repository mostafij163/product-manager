import { Router } from 'express';
import productRouter from './product';
import categoryRouter from './category';

const router = Router();

router.use('/product', productRouter);
router.use('/category', categoryRouter);

export default router;
