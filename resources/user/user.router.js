import {Router} from 'express';
import controller from './user.controller.js';
const router = Router();

router.route('/create')
    .post(controller.create)

router.route('/login')
    .post(controller.login)

export default router;