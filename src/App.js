import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const defaultController = (req,res) => {
    const { url, method } = req;
    res.status(404).send(`${url} and ${method} do not exist `);
}


//GET
app.get('/', (req,res) => {
    res.json('Welcome to e-commerce!');
})

app.get('/products', async(req,res) => {
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

app.get('/products/:id', async(req,res) => {
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

app.get('*', defaultController);

//POST
app.post('/products', (req,res) => {
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

app.post('*', defaultController);

//PUT

app.put('/products/:id', async(req,res) => {
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

app.put('*', defaultController);

//DELETE

app.delete('/products/:id', async(req,res) => {
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

app.delete('*', defaultController);

//PORT
const PORT = 8080;
app.listen(PORT, console.log(`Port listening on http://localhost:${PORT}`))
    .on('error', error => console.log(`Error: ${error.message}`));