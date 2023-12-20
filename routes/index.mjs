import { Router } from 'express';
import usersRouter from './users.mjs';
import moviesRouter from './movies.mjs';
import { createUser, login } from '../controllers/users.mjs';

const routes = Router();

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);

export default routes;
