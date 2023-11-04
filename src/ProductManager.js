import fs from 'fs';


const fileName = './src/products.json';

class ProductManager {
    
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

    addProducts = async( {title, description, price, thumbnail, stock} ) =>{
        
        if( !title || !description || !price || !thumbnail || !stock ) return 'Los campos son obligatorios';

        try {
            const products = await this.getProducts();
            const id = products.length + 1;
            
            products.push({
                id,
                title,
                description,
                price,
                thumbnail,
                stock
            })

             await fs.promises.writeFile(fileName, JSON.stringify(products));    
             return 'Producto agregado exitosamente!';
        } 
        catch (error) {
            return error.message;
        }
    }

}

export default ProductManager;
