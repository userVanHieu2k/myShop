const Store = require('../models/store-model');
CreateStore = (req,res) => {
   const body = req.body
   Store.findOne({_id: req.params.userId}, (err, el)=> {
       if(!el){
           const stores = [];
           stores.push(body);
          const  store = new Store({_id: req.params.userId, store: stores})
          store.save()
          .then(()=> {
              return res.status(200).json({status: 'SUCCESS', message: 'Create store of user success'})
          })
          .catch(err => {
              return res.status(400).json({status: 'ERROR', message: err})
          })
       }
       else if(el){
          el.store.push(body);
          el.save()
          .then(()=> {
              return res.status(200).json({status: 'SUCCESS', message: 'Add product join store'})
          })
          .catch(err => {
              return res.status(400).json({status: 'SUCCESS', message: err})
          })
       }
       if(err){
        return res.status(400).json({status: 'ERROR',message: err})
       } 
   })
}
getStore  = async(req,res) => {
   await Store.findOne({_id: req.params.userId}, (err, store)=> {
       if(err){
           return res.status(400).json({status: 'ERROR', message: err})
       }
       if(!store || store.length < 1){
        return res.status(200).json({status: 'SUCCESS', message: 'Not found in store with user ID', data: null})
       }
       else {
           return res.status(200).json({status: 'SUCCESS', message: 'Get Store Success', data: store})
       }
       
   })
}
deleteStore = (req,res) => {
    const idStore = req.params.id
  Store.findOne({_id: idStore}, (err, store)=> {
      if(err){
          return res.status(200).json({status: 'ERROR', message: err})
      }
      if(!store || store.length < 1){
        return res.status(400).json({status: 'ERROR', message: 'Store not found'})

      }
      store.delete()
      .then(()=> {
          return res.status(200).json({status: 'SUCCESS'})
      })
      
  })
}

deleteProductStore = (req, res) => {
  const body = req.body
  Store.findOne({_id: body.userId}, (err,store) => {
      if(err){
          return res.status(400).json({status: 'ERROR', message: err});
      }
      if(!store || store.length < 1){
          return res.status(400).json({status: 'ERROR', message: 'Store with id User not found'});
      }
     const newStore = store.store.filter(el => el._id !== body.idProduct);
     store.store = newStore;
     store.save()
       .then(()=> {
           return res.status(200).json({status: 'SUCCESS', message: 'Delete product out store Success'});
       })
       .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err});

       })
      
  })
}
module.exports = {CreateStore, getStore, deleteStore, deleteProductStore}