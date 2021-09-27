import {Router} from 'express';
import controller from './memo.controller.js';
const router = Router();

router.route('/')
    .post(controller.post)
    .get(controller.getByUserID)

router.route('/:id')
    .get(controller.getByPostID)
    .put(controller.put)
    .delete(controller.del)

export default router;