import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import { errorResponse } from './src/utils';
import sequelize from './src/db/connection';

const app = express();

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

import userRouter from './src/modules/user/route';
import postRouter from './src/modules/post/route';

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use('*', (req: Request, res: Response) => {
  const path = req.originalUrl;
  const method = req.method;

  return errorResponse(
    res,
    404,
    `The method ${method} is not defined on path ${path}`
  );
});

app.use(function onError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.end(`<h1>${err.toString()}</h1>`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
