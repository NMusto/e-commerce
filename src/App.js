import express from 'express';
import handlebars from 'express-handlebars';
import  __dirname  from './utils.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewRouter from './routes/viewRouter.js';
import defaultRouter from './routes/defaultRouter.js';


//express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handlebars
app.engine('.hbs', handlebars.engine({ extname: '.hbs' }));
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');


//recursos estáticos
app.use(express.static( __dirname + '/public'));


//Ruteo
app.get('/', (req,res) => {
    res.json('Welcome to e-commerce!');
})

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/products', viewRouter);
app.use('*', defaultRouter);




//PORT
const PORT = 8080;
app.listen(PORT, console.log(`Port listening on http://localhost:${PORT}`))
    .on('error', error => console.log(`Error: ${error.message}`));