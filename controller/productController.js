 const Product = require('../models/productSchema');
 

const createProduct = async (req, res) => {
    const { name, description, price, color, size } = req.body;
    if (!name || !description || !price || !color || !size) {
        return res.status(400).json({ message: 'Please provide all the required fields' });
    }
     try {
         const product = new Product(req.body);
         await product.save();
         res.json({ message: 'Product created successfully!' });
     } catch (err) {
         console.log(err.message);
     }
}
 
 const getProducts = async (req, res) => {
     try {
         const products = await Product.find();
         if (!products) {
             return res.status(200).json({ message: 'No products posted yet!' });
         }
         res.json(products);
     } catch (err) {
         console.log(err.message);
     }
}

const SearchAproduct = async (req, res) => { 
    const { productName, color, brand, size } = req.query;
    const filter = { };

    if (productName) {
        filter.name = productName;
    }
    if (color) {
        filter.color = color;
    }
    if (size) {
        filter.size = size;
    }
    if (brand) {
        filter.brand = brand
    }
    try {
        const products = await Product.find(filter);
        if (!products) {
            return res.status(200).json({ message: 'No product with such params!' });
        }
        res.json(products);
    } catch (err) {
        console.log(err.message);
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;

    const { name, color, brand, size } = req.body;
    
    try {
        const product = await Product.findByIdAndUpdate(id, { name, color, brand, size });
        if (!product) {
            return res.status(404).json({ message: `No product with the id ${id}` });
        }
        res.json({ message: 'Product updated successfully!' });
    } catch (err) {
        console.log(err.message);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `No user with the id ${id}` });
        }
        res.json({ message: 'Product deleted successfully!' });
    } catch (err) {
        console.log(err.message);
    }
}
 module.exports = {
     getProducts,
     createProduct,
     SearchAproduct,
     updateProduct,
     deleteProduct
 };