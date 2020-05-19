const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Customer
let Product = new Schema({
  ProductName: {
    type: String
  },
  Quantity: {
    type: Number
  },
   Price: {
    type: Number
  },
  status: {
	  type: String
  },
  priceterm: {
	  type: Number
  },
  term: {
	  type: String
  },
  totalprice: {
	  type: Number
  },
  type: {
	  type: String
  },
  start: {
    type: Date,
    default: Date.now
  },
   end: {
    type: Date,
    default: Date.now
  },
  reminddate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
  },
  custpro: { type: Schema.Types.ObjectId, ref: 'Customer'}
},{
    collection: 'Product'
});
module.exports = mongoose.model('Product', Product);
