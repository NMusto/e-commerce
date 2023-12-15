import { Router } from 'express';
import ProductManager from '../controllers/ProductManager.js';

const productRouter = Router();


//GET
productRouter.get('/', async(req,res) => {
    try {
        const { limit } = req.query;
    
        const productManager = new ProductManager();
        const products = await productManager.getProducts();
        
        if(!limit) res.status(200).json(products);
        else {
            const limitProducts = products.slice(0,limit);
            res.status(200).json(limitProducts);
        }
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
})

productRouter.get('/:pid', async(req,res) => {
    try {
        const { pid } = req.params;
        
        const productManager = new ProductManager();
        const product = await productManager.getProductByID(pid);
        
        if( !product ) res.status(404).json(`Id ${pid} does not exist`);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
    
})


//POST
productRouter.post('/', (req,res) => {
    try {
        const product = req.body;
    
        const productManager = new ProductManager();
        const rtaAdd = productManager.addProduct(product);
        rtaAdd.then( datos => res.json(datos) )
        rtaAdd.catch( error => res.json(error) )
    } 
    catch(error) {
        res.json({error: error.message});
    }
})


//PUT
productRouter.put('/:pid', async(req,res) => {
    try {
        const { pid } = req.params;
        const body = req.body;

        const productManager = new ProductManager();
        const rtaUpdate = await productManager.updateProduct(pid,body);
        res.json(rtaUpdate);
    } 
    catch (error) {
        res.json({error: error.message});
    }
})


//DELETE
productRouter.delete('/:pid', async(req,res) => {
    try {
        const { pid } = req.params;

        const productManager = new ProductManager();
        const rtaDelete = await productManager.deleteProduct(pid);
        res.json(rtaDelete);
    } 
    catch (error) {
        res.json({error: error.message});
    }
})




export default productRouter;