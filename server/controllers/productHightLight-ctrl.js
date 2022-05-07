const HightLight = require('../models/productHightLight-model');
getProductHightLight = async(req,res)=> {
   await HightLight.find({}, (err, result) => {
        if(err){
            return res.status(400).json({staus: 'ERROR', message: err});
        }
        if(!result || result.length < 1){
            return res.status(200).json({status: 'SUCCESS', message: 'Product not found', data: []});
        }
        return res.status(200).json({status: 'SUCCESS', message : 'SUCCESS', data: result});
    })
}

CreateProductHightLight = async(req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({status: 'ERROR', message: 'Body not found'});
    }
    const product = new HightLight(body);
    console.log(product, 'product')
    if(!product){
        return res.status(400).json({status: 'ERROR', message: 'Not create product'});
    }
    product.save()
     .then(()=>{
        return  res.status(200).json({status: 'SUCCESS', message: 'Create success'});
     })
     .catch(err =>{ return res.status(400).json({status: 'ERROR', message: err})});
}


UpdateProductHightLight = async(req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({status: 'ERROR', message: 'Body not found'});
    }
    await HightLight.findByIdAndUpdate({_id: body._id}, body, (err, result)=> {
        if(err){
            return res.status(400).json({status: 'ERROR', message: err});
        }
        if(!result || result.lenght < 1){
            return res.status(200).json({status: 'ERROR', message: 'Cant not find product by Id'});
        }
        return res.status(200).json({status: 'SUCCESS', message: 'Success'})
    })
};


module.exports = {getProductHightLight, CreateProductHightLight, UpdateProductHightLight};