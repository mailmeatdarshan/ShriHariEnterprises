import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const addProducts = asyncHandler(async (req, res) => {
    try {
        
        const {name, brand, category, quantity, description, price} = req.fields;
        
        //validation
        switch(true){
            case !name:
                return res.json({message:"Name is required"})
            case !brand:
                return res.json({message:"Brand is required"})
            case !category:
                return res.json({message:"Category is required"})
            case !quantity:
                return res.json({message:"Quantity is required"})
            case !description:
                return res.json({message:"Description is required"})
            case !price:
                return res.json({message:"Price is required"})
        }

        const product = new Product({...req.fields})
        await product.save()
        res.json(product)
        
    }catch(error){
     console.error(error)
     res.status(400).json(error.message)   
    }
});

const updateProductDetails = asyncHandler(async (req, res) => {
    try{
         const {name, brand, category, quantity, description, price} = req.fields;
        
        //validation
        switch(true){
            case !name:
                return res.json({message:"Name is required"})
            case !brand:
                return res.json({message:"Brand is required"})
            case !category:
                return res.json({message:"Category is required"})
            case !quantity:
                return res.json({message:"Quantity is required"})
            case !description:
                return res.json({message:"Description is required"})
            case !price:
                return res.json({message:"Price is required"})
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new:true});

        await product.save();
        res.json(product);

    } catch (error){
        console.error(error)
        res.status(400).json(error.message)
    }
});

export { addProducts, updateProductDetails };