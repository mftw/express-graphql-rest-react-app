const db = require("../../lib/db");

// const brands = db.get('brands').value();

// module.exports = {
//     Query: { brands: () => brands },
// }
module.exports = {
  brands: () => db.get("brands").value()
};
