const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const uuid = require("uuid");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Initialize the database if it is empty
db.defaults({
  users: [],
  products: [],
  productGroups: [],
  brands: [],
  orders: []
}).write();

db.verifySuperuser = userToCheck => {
  const { userId } = userToCheck;
  const user = db
    .get("users")
    .find({ id: userId })
    .value();

  if (user.superuser) {
    userToCheck.superuser = true;
    return true;
  } else {
    return false;
  }
};

// Returns true if its a number. More reliable than isNaN() and Number.isNaN()
db.isNumber = num => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

db.typeCastIfNumber = val => {
  return db.isNumber(val) // check if val is a number
    ? parseInt(val) // Typecast to integer if it's a number
    : val; // Just use it as-is if it's not a number (e.g UUID)
};

db.sanitizeIncomingValue = (val, number = false, optional = false) => {
  if (val === undefined || val === "") {
    if (optional) {
      return "";
    } else {
      const error = new Error("value is undefined");
      error.status = 400;
      throw error;
    }
  } else if (number && !db.isNumber(val)) {
    const error = new Error("value should be a number");
    error.status = 400;
    throw error;
  }

  return val;
};

db.getNewProductId = () => {
  const newId = uuid().substring(0, 13); // No need for the long id.
  const found = db
    .get("products")
    .find({ id: newId })
    .value();

  // In the extremely unlikely event that we get a unique id that exist in the database already,
  // call ourselves to try again
  if (found) {
    db.getNewProductId();
  } else {
    return newId;
  }
};

db.getNewUserId = () => {
  const newId = uuid().substring(0, 13); // No need for the long id.
  const found = db
    .get("users")
    .find({ id: newId })
    .value();

  // In the extremely unlikely event that we get a unique id that exist in the database already,
  // call ourselves to try again
  if (found) {
    return db.getNewUserId();
  } else {
    return newId;
  }
};

db.getNewOrderId = () => {
  const newId = uuid().substring(0, 13); // No need for the long id.
  const found = db
    .get("orders")
    .find({ id: newId })
    .value();

  // In the extremely unlikely event that we get a unique id that exist in the database already,
  // call ourselves to try again
  if (found) {
    db.getNewOrderId();
  } else {
    return newId;
  }
};

db.getNewIdFor = dbTable => {
  const newId = uuid().substring(0, 13); // No need for the long id.
  const found = db
    .get("" + dbTable) // db.get() takes a string
    .find({ id: newId })
    .value();

  // In the extremely unlikely event that we get a unique id that exist in the database already,
  // call ourselves to try again
  if (found) {
    db.getNewIdFor(dbTable);
  } else {
    return newId;
  }
};

module.exports = db;
