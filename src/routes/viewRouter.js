import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const viewRouter = Router();

viewRouter.use('/', async(req,res) => {
    try {
        const productManager = new ProductManager();
        const products = await productManager.getProducts();
        
        res.render('products', { 
            products: products,
            style: 'style.css'
     });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})



export default viewRouter;