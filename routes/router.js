import Router  from "express";
import Controller from "../Controller.js";

const router = new Router();

router.post('/users', Controller.create)
router.get('/users', Controller.getAll)
router.get('/users/:id', Controller.read)
router.put('/users', Controller.update)
router.delete('/users/:id', Controller.delete)

export default router;