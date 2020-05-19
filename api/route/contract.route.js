const express = require('express');
const app = express();
const contractRoute = express.Router();

// Require Customer model in our routes module
let Contract = require('../models/Contract');
let Customer = require('../models/Customer');
// Defined store route
 contractRoute.route('/add/:id').post(function (req, res,next) {
 Contract.create(req.body)
 .then(function(contractt) {
  return Customer.findOneAndUpdate( { _id: req.params.id },{ $push: { contracts: contractt._id } },{ new: true, useFindAndModify: false })
 }).then(function(dbCustomer) {
   res.json(dbCustomer );
 })
 .catch(function(err) {
   res.json(err);
 });
});

/* const createContract = function(statusId, contract) {
  return dbase.Product.create(contract).then(docContract => {
    return dbase.Customer.findByIdAndUpdate(
      statusId,{ $push: { procontracts: docContract._id } }, { new: true, useFindAndModify: false });
  }); */
// Defined get data(index or listing) route
 contractRoute.route('/').get(function (req, res,next) {
  Contract.find({type: 'service'}, {_id: 1}, function(err, docs) {
    var ids = docs.map(function(doc) { return doc._id; });

  Customer.find({contracts: {$in: ids}}).populate({path: 'contracts',model: 'Contract'})
  .exec((err, customers) => {
   if(err){
    console.log(err);
  }
  else {
    Contract.aggregate([
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
      }
    },

     { "$project": {
        "Active": { "$arrayElemAt": ["$Active.Active", 0] },
        "InProgress": { "$arrayElemAt": ["$InProgress.InProgress", 0] },
        "OnHold": { "$arrayElemAt": ["$OnHold.OnHold", 0] },
        "Complete": { "$arrayElemAt": ["$Complete.Complete", 0] },
        "Expired": { "$arrayElemAt": ["$Expired.Expired", 0] }
      },
    },
    ]).exec().then((statuses) => {
          today = new Date();
          Contract.find({"end":{"$gte": new Date()}}).exec((err, remind) => {
          res.status(200).json({
          statuses : statuses,
          customers: customers,
          remind: remind,
          });
         // console.log("today date is" +today);
        });
        }).catch(err => next(err));
      }
    })
  })
})

contractRoute.route('/details/:id').get(function (req, res,next) {
  Customer.find({_id: req.params.id}).populate({path: 'contracts',model: 'Contract'})
      .exec().then((custdetails) => {

        res.json(custdetails);
        console.log(custdetails);
      }).catch(err => next(err));
  });
// Defined edit route
 contractRoute.route('/').get(function (req, res,next) {
  let id = req.params.id;
  Customer.findById(id, function (err, contract){
      res.json(contract);
  });
});
//  Defined update route
contractRoute.route('/update/:id').post(function (req, res,next) {
  Contract.findById(req.params.id, function(err, contract) {
  if (!contract)
    res.status(404).send("Record not found");
  else {
   contract.ContractName = req.body.ContractName;
   contract.price= req.body.price,
   contract.term= req.body.term;
   contract.status= req.body.status;
   contract.totalprice= req.body.totalprice;
   contract.start = req.body.start;
   contract.end= req.body.end;
   contract.ContractDescription = req.body.ContractDescription;
   console.log("updated name" +contract.ContractName);
    contract.save().then(contract => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});
// Defined delete | remove | destroy route
 contractRoute.route('/delete/:id').get(function (req, res,next) {
    Contract.findByIdAndRemove({_id: req.params.id}, function(err, contract){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = contractRoute;
