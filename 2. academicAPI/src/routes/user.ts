import express, { Router } from 'express';
import routes from './routes.ts';
import UserController from '../controllers/personController.ts';
import { validateRegister } from '../middlewares/userMiddleware.ts'
const router: Router = express.Router();


router.get('/usuarios', UserController.getUsers);
router.post('/usuarios', validateRegister, UserController.registerUser);
router.put('/usuarios/:id', UserController.updateUser);
router.get('/usuarios/:id', UserController.getUserByID);
// router.patch('/usuarios/:id', UserController.updateUserPatch);
router.delete('/usuarios/:id', UserController.deleteUser);

export default router;