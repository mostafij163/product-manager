import { Router } from 'express';
import { createCategory, updateCategory } from '../controllers/category';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.patch('/', updateCategory);

export default categoryRouter;
