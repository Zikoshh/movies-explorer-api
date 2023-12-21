import { Router } from 'express';
import { createUser, login } from '../controllers/users.mjs';
import auth from '../middlewares/auth.mjs';
import usersRouter from './users.mjs';
import moviesRouter from './movies.mjs';
import NotFoundError from '../errors/NotFoundError.mjs';

const routes = Router();

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.use(auth);

routes.delete('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);
routes.use('/*', (req, res, next) => next(new NotFoundError('Мы не обрабатываем данный роут')));

export default routes;
