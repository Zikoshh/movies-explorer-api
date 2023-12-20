import { Router } from 'express';
import { getUserByJwt, updateInfo } from '../controllers/users.mjs';

const users = Router();

users.get('/me', getUserByJwt);
users.patch('/me', updateInfo);

export default users;
