const db = require("../../lib/db");
const { typeCastIfNumber } = db;
const { transformProductGrp, productGroup } = require("./merge");

// const productGroup = db.get('productGroups').value();

// module.exports = {
//     Query: { brands: () => brands },
// }
module.exports = {
  // productGroups: () => db.get('productGroups').value(),
  productGroups: async () => {
    const prodGrps = await db
      .get("productGroups")
      .cloneDeep()
      .value();

    // const newProducts = await products(prodGrp.id)
    return prodGrps.map(async prodGrp => {
      const productGrp = await productGroup(prodGrp.id);
      return transformProductGrp(productGrp);
    });
  },
  singleProductGroup: async ({ productGroupId }) => {
    const productGrp = await productGroup(productGroupId);
    const retObj = await transformProductGrp(productGrp);
    // console.log("TCL: retObj", retObj)
    return retObj;
  }
};
