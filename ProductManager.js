class ProductManager {
    
    #products

    constructor(){
        this.#products = [];
    }

    addProducts = ( {code, title, description, price, thumbnail, stock} ) =>{

        if( !code || !title || !description || !price || !thumbnail || !stock ) return           // sale del programa sin devolver nada 

        if( this.#products.some( product => product.code === code ) ) return

       this.#products.push({
            code,
            title, 
            description,
            price,
            thumbnail,
            stock
       })
    }
    getProducts = () =>{
        return this.#products;
    }

    getProductsById = (findCode) => {
        const product = this.#products.find(producto => producto.code === findCode) 
        if (product) return product
        else console.log('No se encontró el código buscado');
    }

}

/* ----Pruebas--- */

const productManager = new ProductManager();


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
 
console.log( productManager.getProducts() );

console.log( productManager.getProductsById(1) );
//console.log( productManager.getProductsById(3) );

