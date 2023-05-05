import { Router } from 'express';
import { createCategory, updateCategory, getAllCategories, getACategory } from '../controllers/category';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.patch('/', updateCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getACategory);

export default categoryRouter;
