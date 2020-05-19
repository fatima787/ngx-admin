const express = require('express');
const app = express();
const proRoutes = express.Router();
// Require Product model in our routes module
let Product = require('./../../api/models/Product');
let Customer = require('./../../api/models/Customer');
// Defined store route
proRoutes.route('/add/:id').post(function (req, res,next) {
  Product.create(req.body)
  .then(function(productt) {

   return Customer.findOneAndUpdate( { _id: req.params.id },{ $push: { procontracts: productt._id } },{ new: true, useFindAndModify: false })
  }).then(function(dbCustomer) {
    res.json(dbCustomer );
    console.log("dbcustomer" +dbCustomer)
  })
  .catch(function(err) {
    res.json(err);
  });
 });
/*  proRoutes.route('/').get(function (req, res,next) {
Product.find({"enddate":{"$lte":new Date()}}).exec().then((err, remind) => {
if(err){
  console.log(err);
}
else {
  res.json(remind);
  console.log(remind);
}
});
}); */
// Defined get data(index or listing) route
proRoutes.route('/').get(function (req, res,next) {

  Product.find({type: 'product'}, {_id: 1}, function(err, docs) {
    var ids = docs.map(function(doc) { return doc._id; });

  Customer.find({procontracts: {$in: ids}} ).populate({path: 'procontracts',model: 'Product'})
  .exec((err, products) => {
   if(err){
    console.log(err);
  }
  else {
    Product.aggregate([
      { "$facet": {
        "Active": [
          { "$match" : { "status": { "$exists": true, "$in":["active"] }}},
          { "$count": "Active" },
        ],
        "InProgress": [
          { "$match" : { "status": { "$exists": true, "$in":["in progress"] }}},
          { "$count": "InProgress" },
        ],
        "OnHold": [
          { "$match" : { "status": { "$exists": true, "$in":["on hold"] }}},
          { "$count": "OnHold" },
        ],
        "Complete": [
          { "$match" : {"status": { "$exists": true, "$in": ["complete"] }}},
          { "$count": "Complete" }
        ],
        "Expired": [
          { "$match" : {"status": { "$exists": true, "$in": ["expired"] }}},
          { "$count": "Expired" }
        ],
      }},

     { "$project": {
        "Active":  { "$arrayElemAt": ["$Active.Active", 0] },
        "InProgress": { "$arrayElemAt": ["$InProgress.InProgress", 0] },
        "OnHold": { "$arrayElemAt": ["$OnHold.OnHold", 0] },
        "Complete": { "$arrayElemAt": ["$Complete.Complete", 0] },
        "Expired": { "$arrayElemAt": ["$Expired.Expired", 0] },
      },
    }
    ]).exec().then((statuses) => {

      Product.find({"enddate":{"$lte": new Date()}}).exec((err, remind) => {
          res.status(200).json({
          statuses : statuses,
          products: products,
          remind: remind,
          });
          console.log(remind);
        });
        }).catch(err => next(err));
      }
    })
  })
})
proRoutes.route('/details/:id').get(function (req, res,next) {
  Customer.find({_id: req.params.id}).populate({path: 'procontracts',model: 'Product'})
      .exec().then((details) => {

        res.json(details);
        console.log(details);
      }).catch(err => next(err));
  });

// Defined edit route
  proRoutes.route('/').get(function (req, res) {
  let id = req.params.id ;
  Customer.findById(id, function (err, customer){
      res.json(customer);
  });
});
//  Defined update route
  proRoutes.route('/update/:id').post(function (req, res) {
    Product.findById(req.params.id, function(err, product) {
    if (!product)
      res.status(404).send("Record not found");
    else {
     product.ProductName = req.body.ProductName;
     product.Price= req.body.Price;
     product.Quantity= req.body.Quantity;
     product.status= req.body.status;
     product.start = req.body.start;
     product.end= req.body.end;
     product.priceterm= req.body.priceterm;
     product.term= req.body.term;
     product.totalprice= req.body.totalprice;
     console.log(product.ProductName);
      product.save().then(product => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
proRoutes.route('/delete/:id').get(function (req, res) {
    Product.findByIdAndRemove({_id: req.params.id}, function(err, product){
      if(err) res.json(err);
        else res.json('Successfully removed');
    });
});
module.exports = proRoutes;

/* Comment.findByIdAndRemove(req.params.id, function(err, comment){
  if (comment) {
      Capture.update({_id: comment.capture}, {
              $pull : {comments: req.params.id}
          }, function(err, data) { ... });
  }
});  */
