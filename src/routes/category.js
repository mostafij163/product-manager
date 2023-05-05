import { Router } from 'express';
import { createCategory } from '../controllers/category';

const categoryRouter = Router();

categoryRouter.post('/', createCategory);

export default categoryRouter;
