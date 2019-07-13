const uuid = require("uuid");

function sanitizeIncomingValue(val, number = false, optional = false) {
  const errText = "value is undefined";
  // return val === undefined ? Error(errText) : val;
  if (val === undefined || val === "") {
    if (optional) {
      return "";
    } else {
      throw Error(errText);
      // return;
    }
  } else if (number && isNaN(val)) {
    throw Error("value should be a number");
  }
  return val;
}

module.exports = (req, res, next) => {
  const sanitizeIncomingValue = (val, number = false, optional = false) => {
    const errText = "value is undefined";
    // return val === undefined ? Error(errText) : val;
    if (val === undefined || val === "") {
      if (optional) {
        return "";
      } else {
        // throw Error(errText)
        res.status(400).json({ message: errText });
        return;
        // return;
      }
    } else if (number && isNaN(val)) {
      // throw Error('value should be a number')
      res.status(400).json({ message: "value should be a number" });
      return;
    }
    return val;
  };

  const {
    title,
    description_short,
    description_long,
    brand,
    price,
    stock
  } = req.body;

  let dbReqObj = {
    id: uuid(),
    title: sanitizeIncomingValue(title),
    description_short: sanitizeIncomingValue(description_short),
    description_long: sanitizeIncomingValue(description_long),
    brand: sanitizeIncomingValue(brand),
    price: sanitizeIncomingValue(price, true),
    stock: sanitizeIncomingValue(stock, true)
    // productImage: imagePath,
  };

  req.dbInsertObject = dbReqObj;
  next();
};
