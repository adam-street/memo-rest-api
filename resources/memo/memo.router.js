import {Router} from 'express';
import controller from './memo.controller.js';

const router = Router();

router.route("/")
    .get(controller.getAll)
    .post(controller.post);

router.route("/:id")
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.del);

export default router;