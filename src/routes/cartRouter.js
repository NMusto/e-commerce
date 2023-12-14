import { Router } from 'express';
import CartManager from '../controllers/CartManager.js'

const cartRouter = Router();


//GET
cartRouter.get('/:cid', async(req,res) => {
    try {
        const { cid } = req.params;

        const cartManager = new CartManager();
        const cart = await cartManager.getCartById(cid);

        if( cart ) {
            res.json(cart);
        }
        else res.json(`Id ${cid} does not exist`);
        
    } 
    catch(error) {
        res.send(error.message);
    }
})

//POST 
cartRouter.post('/', async(req,res) => {
    try {
        const products = req.body;

        const cartManager = new CartManager();
        const rtaAdd = await cartManager.addCart(products);
        res.json(rtaAdd);
    } 
    catch(error) {
        res.json(error.message);
    }
})

cartRouter.post('/:cid/product/:pid', async(req,res) => {
    try {
        const { cid, pid } = req.params;

        const cartManager = new CartManager();
        const rta = await cartManager.addProductToCart(cid, pid);

        res.json(rta);
    } 
    catch(error) {
        res.json(error.message);
    }
})

export default cartRouter;