const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Customer
let Contract = new Schema({
  ContractName: {
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
  reminder: {
    type: Date,
    default: Date.now
  },
  status: {
	  type: String
  },
  price: {
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
  ContractDescription: {
    type: String
  },type: {
    type: String
  },
},{
    collection: 'Contract'  ,
    versionKey: false
},
);
module.exports = mongoose.model('Contract', Contract);
