import fs from 'fs';
import __dirname from '../utils.js';
import ProductManager from './ProductManager.js';

const fileName = __dirname + '/api/carts.json';

class CartManager {

    //Generador de id
    generateId = async() => {
        const carts = await this.getCarts();
        return String( carts.length === 0 ? 1 : carts.length + 1 );
    }

    //GET
    getCarts = async() => {
        try {
            const carts = await fs.promises.readFile(fileName, 'utf-8');
            if(carts) return JSON.parse(carts);
            return [];
        } 
        catch (error) {
            return 'error.message';
        }
    }
    
    getCartById = async(cid) => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find( cart => cart.id === cid );
            return cart;
        } 
        catch (error) {
            return error.message;
        }
    }

    //POST
    addCart = async(products) => {
        try {
            const carts = await this.getCarts();
            const newCart = {
                id: await this.generateId(),
                products: [ products ] 
            }

            carts.push(newCart);

            await fs.promises.writeFile(fileName, JSON.stringify(carts, null, '\t'));
            return `Cart successfully add!`;
        }
        catch(error) {
            return error.message;
        }
    }

    addProductToCart = async(cid, pid) => {

    
       try {
            const cart = await this.getCartById(cid);
            if( !cart ) return 'Invalid Cart id!'

            const productManager = new ProductManager();
            const product = await productManager.getProductByID(pid);
            if( !product ) return 'Invalid Product id!'
            
            const existingProduct = cart.products.find( product => product.id === pid );
            if( existingProduct ) {
                existingProduct.quantity++;
            } 
            else {
                const newProduct = {
                    id: pid,
                    quantity: 1
                }
                cart.products.push(newProduct);
            }

            const carts = await this.getCarts();

            const index = carts.findIndex( cart => cart.id === cid );
            carts.splice(index,1,cart);

            await fs.promises.writeFile(fileName, JSON.stringify(carts, null, '\t'));
            return 'Product successfully add to cart!';
       } 
       catch (error) {
            return error.message;
       }

    }
}

export default CartManager;