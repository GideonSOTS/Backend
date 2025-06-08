const router = require('express');
const { getProducts, createProduct, SearchAproduct, updateProduct, deleteProduct } = require('../Controller/productController');

const ProductRouter = router()

ProductRouter
    
    .get('/products', getProducts)
    .post('/product/create', createProduct)

    //query params api
    .get('/product', SearchAproduct)
    .put('/product/update/:id', updateProduct)
    .delete('/product/delete/:id', deleteProduct)



module.exports = ProductRouter;