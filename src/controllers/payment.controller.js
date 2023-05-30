import mercadopago from "mercadopago";
import { HOST, MERCADOPAGO_API_KEY } from "../config.js";
export const createOrder = async (req, res) => {

mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
});
 
const result = await mercadopago.preferences.create({
    items: [{
        title: "Laptop Gamer",
        unit_price: 1000,
        currency_id: "MXN",
        quantity: 1,
    }],
    back_urls: {
        success: '${HOST}/success-order',
        failure: '${HOST}/failure-order',
        pending: '${HOST}/pending-order',
    },
    notification_url: "https://46b9-201-174-186-202.ngrok.io/webhook",

})

console.log(result);
    res.send(result.body);
}

export const receiveWebhook = async (req, res) => {
    const payment = req.query;

    try {
        if(payment.type === 'payment'){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data);
            //store in database
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({error: error.message});    
    }



    
}