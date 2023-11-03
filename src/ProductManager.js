

import fs from 'fs';


const fileName = './src/products.json';

class ProductManager {
    
    getProducts = async () => {
        
        try {
            const products = await fs.promises.readFile(fileName, 'utf-8');
            return JSON.parse(products);
        }
        catch(e) {
            console.log('No se encontró el archivo', e);
            return [];
        }
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
    
/* ----Pruebas--- */

//const productManager = new ProductManager();

/* 
productManager.addProducts({
    code: 1,
    title: 'Smart TV Samsung',
    description: 'Smart Led Tv Samsung 55 pulgadas 4K UHD',
    price: 355000,
    thumbnail: 'image01-SmartTVSamsung',
    stock: 20
})

productManager.addProducts({
    code: 2,
    title: 'Celular Motorola Edge 30',
    description: 'Celular Motorola Edge 30 Ultra/XT2241-2',
    price: 475000,
    thumbnail: 'image01-CelularMotorolaEdge30',
    stock: 30
})

productManager.addProducts({
    code: 3,
    title: 'Notebook Dell Inspiron 15',
    description: 'Notebook Dell Inspiron 15 3511 Intel Core i5',
    price: 700000,
    thumbnail: 'image01-NotebookDell',
    stock: 10
})
 */

/* const products = await productManager.getProducts();
console.log( products ); */