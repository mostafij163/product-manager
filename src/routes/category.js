import { Router } from 'express';
import { createCategory, updateCategory, getAllCategories } from '../controllers/category';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.patch('/', updateCategory);
categoryRouter.get('/', getAllCategories);

export default categoryRouter;
