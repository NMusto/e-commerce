import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req,res) => {
    res.json('Bienvenido al e-commerce!');
})

app.get('/products', async(req,res) => {
    const { limit } = req.query;
    
    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    
    if(!limit) res.json(products);
    else {
        const limitProducts = products.slice(0,limit);
        res.json(limitProducts);
    }
})

app.get('/products/:id', async(req,res) => {
    try {
        const { id } = req.params;
        
        const productManager = new ProductManager();
        const product = await productManager.getProductByID(id);
        
        if( !product ) res.json(`Id ${id} inexistente`);
        res.json(product);
    }
    catch (error) {
        res.send(`Error en recuperar el producto`);
    }
    
})

app.post('/products', (req,res) => {
    const product = req.body;
    
    const productManager = new ProductManager();
    const msj = productManager.addProducts(product);
    msj.then( datos => res.json(datos) )
    msj.catch( error => res.json(error) )
})

const PORT = 8080;
app.listen(PORT, console.log(`Puerto escuchando en http://localhost:${PORT}`))
    .on('error', error => console.log(`Error: ${error.message}`));