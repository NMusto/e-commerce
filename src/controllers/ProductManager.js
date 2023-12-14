import fs from 'fs';
import Joi from 'joi';
import  __dirname  from '../../utils.js'


const fileName = __dirname + '/src/api/products.json';

class ProductManager {

    //Generador de id
    generateId = async() => {
        const products = await this.getProducts();
        return String( products.length === 0 ? 1 : products.length + 1 );
    }

    
    //validación con Joi nuevo producto
    validateAddProduct = (product) => {
        
        const ProductSchema = Joi.object({
            title: Joi.string().required(),
            brand: Joi.string().required(),
            description: Joi.string().max(50),
            category: Joi.string().max(50),
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

    //validación con Joi actualizar producto
    validateUpdateProduct = (product) => {
        
        const ProductSchema = Joi.object({
            title: Joi.string(),
            brand: Joi.string(),
            description: Joi.string().max(50),
            category: Joi.string().max(50),
            price: Joi.number().integer(),
            thumbnail: Joi.string(),
            stock: Joi.number().integer(),
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
    
    //GET
    getProducts = async() => {
        
        try {
            const products = await fs.promises.readFile(fileName, 'utf-8');
            if(products) return JSON.parse(products);
            return [];
        }
        catch(error) {
            return error.message;
        }
    }

    getProductByID = async(id) => {
        try {
            const products = await this.getProducts();
        
            const product = products.find( product => product.id == id);
            return product;
        }
        catch(error) {
            return error.message;
        }
    }

    //POST
    addProduct = async(product) =>{
        
        try {

            const objRta = this.validateAddProduct(product)
            if( objRta.value ) {
                
                const products = await this.getProducts();
                
                products.push({ id: await this.generateId(),...product });

                await fs.promises.writeFile(fileName, JSON.stringify(products, null, '\t'));    
                return 'Product successfully added!';
            }
            else {
                return objRta.error;
            }
        } 
        catch (error) {
            return error.message;
        }
    }

    //PUT
    updateProduct = async(id,body) => {
        
        try {
            const objRta = this.validateUpdateProduct(body);

            if(objRta.value) {

                const products = await this.getProducts();

                const index = products.findIndex( product => product.id === id);
                 if( index != -1 ) {

                    const productUpdated = { ...products[index], ...body };
                    products.splice(index,1,productUpdated);
                    
                    await fs.promises.writeFile(fileName, JSON.stringify(products, null, '\t'));
                    return productUpdated;
                }
                else 
                    return 'Product not found!';
            }
            else {
                return objRta.error;
            }
        }
        catch(error) {
            return error.message;
        }
    }

    //DELETE
    deleteProduct = async(id) => {
        try {
            const products = await this.getProducts();

            const index = products.findIndex( product => product.id === id);
            
            if( index != -1 ) {
                products.splice(index,1);
    
                await fs.promises.writeFile(fileName, JSON.stringify(products, null, '\t'));
    
                return `Product id: ${id} successfully removed!`;
            }
            else {
                return `Product id: ${id} does not exist`;
            }
        }
        catch(error) {
            return error.message;
        }
    }

}

export default ProductManager;

