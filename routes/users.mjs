import { Router } from 'express';
import { getUserByJwt, updateInfo } from '../controllers/users.mjs';
import { validationConfig } from '../config.mjs';

const { updateInfoValidation } = validationConfig;
const users = Router();

users.get('/me', getUserByJwt);
users.patch('/me', updateInfoValidation, updateInfo);

export default users;
