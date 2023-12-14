import express from 'express';
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import defaultRouter from './routes/defaultRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.get('/', (req,res) => {
    res.json('Welcome to e-commerce!');
})


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('*', defaultRouter);




//PORT
const PORT = 8080;
app.listen(PORT, console.log(`Port listening on http://localhost:${PORT}`))
    .on('error', error => console.log(`Error: ${error.message}`));