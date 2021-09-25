import {Router} from 'express';
import controller from './memo.controller.js';
const router = Router();

router.route('/')
    .post(controller.post)
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getById)
    .put(controller.put)
    .delete(controller.del)

export default router;