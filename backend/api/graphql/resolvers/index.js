const productRes = require("./product-resolver");
const brandRes = require("./brand-resolver");
const productGroupRes = require("./productGroup-resolver");
const userRes = require("./user-resolver");
const orderRes = require("./order-resolver");

const RootResolver = {
  ...productRes,
  ...productGroupRes,
  ...brandRes,
  ...userRes,
  ...orderRes
};

module.exports = RootResolver;
