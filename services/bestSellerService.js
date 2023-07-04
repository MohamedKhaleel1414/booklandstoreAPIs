const Product = require('../models/productModel')

const bestSeller = async (req,res) => {
    let bestProducts = await Product.find({},{}).sort({sold:1}).limit(10)
    if(bestProducts){
        res.status(201).send(bestProducts)
    }else{
        res.status(404).send("No products found")
    }
}

module.exports = {bestSeller}