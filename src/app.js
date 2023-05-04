import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes/router';
import globalErrorHandler from './utils/errors/globalErrorHandler';

const app = express();

// Middleware
app.use(json());
app.use(cors());
if (process.env.STAGE === 'Development') {
  app.use(morgan('[:date[iso]] :method :url :status :res[content-length] - :response-time ms'));
}

// Router
app.get('/', (_req, res) => {
  res.redirect('/docs');
});
app.use('/api/v1', router);
app.get('/docs', (_req, res) => {
  res.redirect('');
});

app.all('*', (req, _res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.statusCode = 404;
  error.flag = true;
  return next(error);
});

// Error handler
app.use(globalErrorHandler);

export default app;
