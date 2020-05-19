const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Customer
let Customer = new Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Country: {
    type: String
  },
   Address: {
   type: String
  },
   Company: {
   type: String
  },
   Email: {
   type: String
  },
   Phone: {
   type: String
  },
  Mobile: {
    type: String
  },

  Website: {
    type: String
  },
   contracts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' }
  ],
  procontracts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  ],
},{
    collection: 'Customer',
     versionKey: false
});
module.exports = mongoose.model('Customer', Customer);
