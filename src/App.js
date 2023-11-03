import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req,res) => {
    res.json('Bienvenido al e-commerce!');
})

app.get('/products', (req,res) => {
    const productManager = new ProductManager();
    const products = productManager.getProducts();
    products.then( datos => res.json(datos) )
    products.catch( error => res.json(error) )
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