import { Router } from 'express';
import {
  createCategory,
  updateCategory,
  getAllCategories,
  getACategory,
  deleteCategory,
} from '../controllers/category';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);
categoryRouter.patch('/', updateCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getACategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
