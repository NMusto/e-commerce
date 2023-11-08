import fs from 'fs';
import Joi from 'joi';

const fileName = './src/products.json';

class ProductManager {

    //Generador de id
    generateId = async() => {
        const products = await this.getProducts();
        console.log(products.length);
        return String(products.length === 0 ? 1 : products.length + 1);
    }

    
    //validación con Joi
    validateProduct = (product) => {
        
        const ProductSchema = Joi.object({
            title: Joi.string().required(),
            brand: Joi.string().required(),
            description: Joi.string().max(50),
            price: Joi.number().integer().required(),
            thumbnail: Joi.string(),
            stock: Joi.number().integer().required()
        })    

        const { error } = ProductSchema.validate(product);

        if(error) {
            return {
                value: false,
                error: error.details[0].message
            }
        }
        else {
            return {
                value: true
            }
            
        }
    
    }
    
    getProducts = async () => {
        
        try {
            const products = await fs.promises.readFile(fileName, 'utf-8');
            return JSON.parse(products);
        }
        catch(e) {
            return ('Error', e.message);
        }
    }

    getProductByID = async(id) => {
            const products = await this.getProducts();
        
            const product = products.find( product => product.id == id);
            return product;
    }

    addProducts = async(product) =>{
        
        try {

            const objRta = await this.validateProduct(product)
            if( objRta.value ) {
                
                const products = await this.getProducts();
                
                //genera id de producto y lo ubica como primer atributo
                //product.id = await this.generateId();
                //products.push(product);
                products.push({id: await this.generateId(),...product});

                await fs.promises.writeFile(fileName, JSON.stringify(products));    
                return 'Producto agregado exitosamente!';
            }
            else {
                return objRta.error;
            }
        } 
        catch (error) {
            return error.message;
        }
    }

}

export default ProductManager;

