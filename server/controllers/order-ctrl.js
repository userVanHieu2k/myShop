const Order = require('../models/order-model');
const StoreNotify = require('../models/notify-model');
CreateOrder = (req,res) => {
    const body = req.body;
    const date = new Date();
    if(!body){
        return res.status(400).json({status: 'ERROR', message: 'body request null'})
    }

     function getWeekfunction() {
      var onejan = new Date(date.getFullYear(),0,1);
      var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
      var dayOfYear = ((today - onejan + 86400000)/86400000);
      return Math.ceil(dayOfYear/7)
    };

    console.log(getWeekfunction())
    const order = new Order({...body, status: 0, status_Order: 1,create: {date: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear(), week: getWeekfunction() + 1} })
    if(!order){
        return res.status(400).json({status: 'ERROR', message: 'Not Create Order - Form'})
    }
    order.save()
      .then(()=> {
        return res.status(200).json({status: 'SUCCESS', message: 'Create order Success', orderId: order._id});

      })
      .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err})
 
      })
      const newNoti = new StoreNotify(body);
      newNoti.save()
}
getOrderUser = (req, res) => {
  const idUser = req.params.userId
  Order.find({idUser: idUser},(err,order)=> {
      if(err){
          return res.status(400).json({status: 'ERROR', message: err})
      }
      if(!order || order.length < 1){
        return res.status(400).json({status: 'ERROR', message: 'Order Form of userId not found'})
      }
      return res.status(200).json({status: 'SUCCESS', data: order, message: 'Success'})
  })
}

getAllOrder = async(req, res) => {
  await Order.find({},(err, order)=> {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order || order.length < 1) {
      return res.status(400).json({status: 'ERROR', message: 'Order not found'});
    }
    return res.status(200).json({status: 'SUCCESS',message: 'Success', data: order})
  })
}

deleteOrder = async(req, res) => {
  const id = req.params.id
  await Order.findByIdAndDelete({_id: id}, (err, order)=>{
     if(err){
       return res.status(400).json({status: 'ERROR', message: 'Delete Success'})
     }
     if(!order){
       return res.status(400).json({status: 'ERROR', message: 'Order not found'})
     }
     return  res.status(200).json({status: 'SUCCESS', message: 'Delete success'});
  })
}

findOrderByMonth = async(req,res) => {
  await Order.find({"create.month" : {
    $gte: 6,
    // $lt: 8
  }}, (err, result) => {
    if(err){
      return res.status(400).json({status: 'ERROR', message : err});
    }

    if(!result || result.length < 1){
      return res.status(200).json({status: 'SUCCESS', message: 'Not found', data: []})
    }
    return res.status(200).json({status: 'SUCCESS', message: 'Success', data: result});
  })
}

getOrderWeekNow = async (req,res) => {
  const body = req.body;
  await Order.find({"create.date": {
    $gte: body.dateStart,
    $lt: body.dateEnd
  },"create.month": body.month,"create.year": body.year }, (err, result) => {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err});
    } 
    if(!result || result.length < 1){
      return res.status(200).json({status: 'SUCCESS', message: 'Not found', data: []})
    }
    const newObject = [];        
    for(var i = 0; i < 7;i ++){
      const data = result.filter(item => item.create.date === body.dateStart + i);
      let count = 0;
      data.map(item => count = count + item.product.sum_price);
      newObject.push({sum: count, total: data.length});
    }
    return res.status(200).json({status: 'SUCCESS', message: 'Success', data: {total: result.length, data: newObject}});

  })
}
getOrderYear = async (req,res) => {
  const body = req.body;
  await Order.find({"create.year": body.year }, (err, result) => {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err});
    } 
    if(!result || result.length < 1){
      return res.status(200).json({status: 'SUCCESS', message: 'Not found', data: []})
    }
    const newObject = [];        
    for(var i = 1; i < 13;i ++){
      const data = result.filter(item => item.create.month === i);
      let count = 0;
      data.map(item => count = count + item.product.sum_price);
      newObject.push({sum: count, total: data.length});
    }
    return res.status(200).json({status: 'SUCCESS', message: 'Success', data: {total: result.length, data: newObject}});

  })
}

editOrder = async(req,res) => {
  const body = req.body;
  if(!body){
    return res.status(400).json({status: 'ERROR', message: 'Body request not found'});
  }
  await Order.findByIdAndUpdate({_id: body._id}, body , (err, order)=> {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order){
      return res.status(400).json({status: 'ERROR', message: 'Order not found'})
    }
    return res.status(200).json({status: 'SUCCESS', message: 'Edit success'})
  })
   
}



searchOrder = async(req,res) => {
  const result = [];
  const keySearch = req.params.search;
  console.log(keySearch)
  await Order.find({}, (err, order) => {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order || order.length < 1){
      return res.status(200).json({status: 'SUCCESS',message: 'Order width name not found', data: []})
    }
    if(order){
      order?.forEach((el) => {
        if (
          el.infor.name.toLowerCase().includes(keySearch.toLowerCase()) ===
          true
        ) {
          result.push(el);
        }
      });
      if (result.length > 0) {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Search Success", result });
      }
      if (!result.length)
        res
          .status(200)
          .json({
            status: "ERROR",
            message: "No result search",
            errorCode: "ERROR.SEARCH.NOT.FOUND",
            result: [],
          });
    }
  })
}
module.exports = {getOrderYear,findOrderByMonth,CreateOrder, getOrderUser, getAllOrder, deleteOrder, editOrder, searchOrder, getOrderWeekNow}