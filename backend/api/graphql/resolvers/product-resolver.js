const db = require("../../lib/db");
const { getNewProductId, typeCastIfNumber } = db;

const { transformProduct } = require("./merge");
// const DataLoader = require('dataloader');
// const productLoader = new DataLoader(productId => {
//     const product = db
//       .get("products")
//       .find({ id: typeCastIfNumber(productId) })
//       .value();
//       return product;
// })

// const productsLoader = new DataLoader(() => {
//     return db.get("products").value()
//     // const products = db
//     //   .get("products")
//     //   .value();
//     //   return products;
// })
// const products = db.get('products').value();

// module.exports = {
//     Query: { products: () => products },
// }
module.exports = {
  //   products: () => db.get("products").value(),
  products: async () => {
    const products = db
      .get("products")
      .cloneDeep()
      .value();
    return products.map(product => {
      return transformProduct(product);
    });
  },
  //   products: async () => {
  //       const tmp = await productsLoader.load()
  //       return tmp
  //     },
  getProductRange: async ({ from, to }) => {
    const products = await db
      .get("products")
      .cloneDeep()
      .value();
    const transformProducts = products.map(product =>
      transformProduct(product)
    );
    return transformProducts.splice(from, to);
  },

  singleProduct: async ({ productId }) => {
    // console.log("TCL: productId", productId)
    // console.log("TCL: db", awaitdb)
    const product = await db
      .get("products")
      .find({ id: typeCastIfNumber(productId) })
      .value();
    // console.log("TCL: product", product)

    // console.log("TCL: db", db)

    // console.log("TCL: db.read",await db.read)
    // console.log("TCL: product", Object.keys(await db))
    // const product = await productLoader.load(productId)
    if (!product) {
      throw new Error(`Cannot find product with id: ${productId}`);
    }
    const returnobj = await transformProduct(product);
    // console.log("TCL: returnobj", await returnobj.productGroup(1))

    return returnobj;
  },

  createProduct: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const {
      title,
      item_number,
      brand,
      description_short,
      description_long,
      stock,
      productGroup,
      price
    } = args.productInput;

    try {
      const product = {
        id: await getNewProductId(),
        item_number,
        title,
        description_short,
        description_long,
        brand,
        price,
        stock,
        productGroup: typeCastIfNumber(productGroup) || productGroup,
        image: "not implemented"
      };

      const result = await db
        .get("products")
        .push(product)
        .last()
        .write();

      //   const result = await user.save();
      //   const returnobj = { ...result, password: null };

      return result;
      //   return { ...user, password: null, };
    } catch (err) {
      throw err;
    }
  }
};
