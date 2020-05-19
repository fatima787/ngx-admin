const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  config = require("./DB");
const dbase = require("./models");
const customerRoute = require("./route/customer.route");
const contractRoute = require("./route/contract.route");
const proRoute = require("./route/product.route");
const userRoutes = require("./route/user")
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/pages/customer", customerRoute);
app.use("/pages/contract/services", contractRoute);
app.use("/pages/contract/products", proRoute);
app.use("/api/user", userRoutes);
/* app.route('/pages/contract/services').get(status.countActive); */
const port = process.env.PORT || 4001;
const server = app.listen(port, function () {
  console.log("Listening on port " + port);
});



/*    const createCustomer = function(customer) {
  return dbase.Customer.create(customer).then(docStatus => {
    console.log("\n>> Created Tutorial:\n", docStatus);
    return docStatus;
  });
};

 	const createContract = function(statusId, contract) {
  return dbase.Contract.create(contract).then(docContract => {
    console.log("\n>> Created Contract:\n", docContract);

    return dbase.Customer.findByIdAndUpdate( statusId,{ $push: { contracts: docContract._id } },{ new: true, useFindAndModify: false }
    );
  });
};

 const getCustomerWithPopulate = function(id) {
  return dbase.Customer.findById(id).populate("contracts");
};

 const run = async function() {
  var customer = await createCustomer({
    FirstName: "FF",
    LastName: "Ndr",
    Country: "Lebanon",
    Address: "Beirut",
    Company: "CIA",
    Email: "f@gmail.com",
    Phone: "123",
    Mobile: "123",
    Website: "ww.bla.com",

  });

  customer = await createContract(customer._id, {
    ContractName: "contra5",
    status: "in progress",
    priceterm: 1000,
    term: "Monthly",
    totalprice: 5000,
    type: "service",

  });
  console.log("\n>> customer:\n", customer);

  console.log("\n>> customer:\n", customer);

  customer = await getCustomerWithPopulate(customer._id);
  console.log("\n>> populated Tutorial:\n", customer);
};
run();
*



 const createCustomer = function(customer) {
  return dbase.Customer.create(customer).then(docStatus => {
    console.log("\n>> Created Tutorial:\n", docStatus);
    return docStatus;
  });
};

	const createContract = function(statusId, contract) {
  return dbase.Product.create(contract).then(docContract => {
    console.log("\n>> Created Contract:\n", docContract);

    return dbase.Customer.findByIdAndUpdate(
      statusId,
      { $push: { procontracts: docContract._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

  const getCustomerWithPopulate = function(id) {
  return dbase.Customer.findById(id).populate("procontracts");
};

 const run = async function() {
  var customer = await createCustomer({
    FirstName: "Planet",
    LastName: "Nd",
    Country: "Lebanon",
    Address: "Beirut",
    Company: "CIA",
    Email: "f@gmail.com",
    Phone: "123",
    Mobile: "123",
    Website: "ww.bla.com",

  });

  customer = await createContract(customer._id, {
    ProductName: "pro14",
    Price: 11,
    Quantity: 100,
    status: "complete",
    priceterm: 1000,
    term: "Monthly",
    totalprice: 5000,
    type: "product",

  });
  console.log("\n>> customer:\n", customer);

  console.log("\n>> customer:\n", customer);

  customer = await getCustomerWithPopulate(customer._id);
  console.log("\n>> populated Tutorial:\n", customer);
};
run();
*/
