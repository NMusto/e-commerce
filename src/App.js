import express from 'express';
import productsRouter from './routes/productsRouter.js'
import defaultController from './routes/utils/defaultController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.get('/', (req,res) => {
    res.json('Welcome to e-commerce!');
})


app.use('/api/products', productsRouter);
app.use('*', defaultController);




//PORT
const PORT = 8080;
app.listen(PORT, console.log(`Port listening on http://localhost:${PORT}`))
    .on('error', error => console.log(`Error: ${error.message}`));