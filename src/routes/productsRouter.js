import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productsRouter = Router();


//GET
productsRouter.get('/', async(req,res) => {
    try {
        const { limit } = req.query;
    
        const productManager = new ProductManager();
        const products = await productManager.getProducts();
        
        if(!limit) res.json(products);
        else {
            const limitProducts = products.slice(0,limit);
            res.json(limitProducts);
        }
    }
    catch(error) {
        res.json({error: error.message});
    }
})

productsRouter.get('/:id', async(req,res) => {
    try {
        const { id } = req.params;
        
        const productManager = new ProductManager();
        const product = await productManager.getProductByID(id);
        
        if( !product ) res.json(`Id ${id} does not exist`);
        res.json(product);
    }
    catch (error) {
        res.send(error.message);
    }
    
})


//POST
productsRouter.post('/', (req,res) => {
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
productsRouter.put('/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const productManager = new ProductManager();
        const rtaUpdate = await productManager.updateProduct(id,body);
        res.json(rtaUpdate);
    } 
    catch (error) {
        res.json({error: error.message});
    }
})


//DELETE
productsRouter.delete('/:id', async(req,res) => {
    try {
        const { id } = req.params;

        const productManager = new ProductManager();
        const rtaDelete = await productManager.deleteProduct(id);
        res.json(rtaDelete);
    } 
    catch (error) {
        res.json({error: error.message});
    }
})




export default productsRouter;