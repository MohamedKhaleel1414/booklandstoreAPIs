const Product = require('../models/productModel')

const bestSellerBooks = async (req,res) => {
    let bestProducts = await Product.find({"isCourseOrBook":"Book"},{}).sort({sold:-1}).limit(4)
    if(bestProducts){
        res.status(200).send(bestProducts)
    }else{
        res.status(404).send("No books found")
    }
}

const bestSellerCourses = async (req,res)=>{
    let bestProducts = await Product.find({"isCourseOrBook":"Course"},{}).sort({sold:-1}).limit(4)
    if(bestProducts){
        res.status(200).send(bestProducts)
    }else{
        res.status(404).send("No Courses found")
    }
}

module.exports = {bestSellerBooks,bestSellerCourses}