import {Router} from "express";
import {createOrder, receiveWebhook} from "../controllers/payment.controller.js";

const router = Router();

router.post('/create-order', createOrder);

router.get('/success-order', (req, res) => res.send('Success order'));

router.get('/failure-order', (req, res) => res.send('Failure order'));

router.get('/pending-order', (req, res) => res.send('Pending order'));

router.post('/webhook', receiveWebhook);

export default router;