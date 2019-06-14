const db = require("../../lib/db");
const { getNewOrderId } = db;
const { transformProduct } = require("./merge");

// const brands = db.get('brands').value();

// module.exports = {
//     Query: { brands: () => brands },
// }

async function findOrderProducts(orderProducts, products) {
  const allProducts = [...products];
  // const allProducts = products || await db.get('products').cloneDeep().value();
  // const allProducts = await db.get('products').filter({});
  const fullProducts = [...orderProducts].map(async orderProduct => {
    const returnObj = allProducts.find(
      product => "" + product.id == "" + orderProduct.id
    );
    // console.log("TCL: findOrderProducts -> allProducts", allProducts)
    const bindProductGrp = await transformProduct(returnObj);

    return {
      ...returnObj,
      ...orderProduct,
      product: { ...bindProductGrp }
      // products: [...bindProducts]
    };
  });
  return fullProducts;
  // console.log("TCL: findOrderProducts -> fullProducts", fullProducts.length)
}
module.exports = {
  orders: async (args, req) => {
    // console.log("TCL: args", args)
    const { isAuth, userId } = req;
    if (!isAuth) {
      const error = new Error("not authorized");
      // const error = "not authorized";
      error.status = 401;
      console.log("TCL: error", error);
      throw error;
    }

    const isSu = await db.verifySuperuser(req);
    console.log("TCL: req", req);

    const products = await db
      .get("products")
      .cloneDeep()
      .value();
    const allOrders = (await isSu)
      ? db
          .get("orders")
          .cloneDeep()
          .value()
      : db
          .get("orders")
          .filter({ userId })
          .cloneDeep()
          .value();
    const realOrders = await allOrders.map(async order => {
      const productGrp = await findOrderProducts(order.products, products);
      const bindProductGrp = await transformProduct(order);

      const returnObj = {
        ...bindProductGrp,
        products: [...productGrp]
      };
      // console.log(returnObj.products);

      return returnObj;
    });
    return realOrders;
  },
  createOrder: async (args, req) => {
    // console.log(req)
    // const { orderInput } = args;
    const { isAuth, userId } = req;
    // console.log(isAuth, userId)
    if (!isAuth) {
      throw new Error("not authorized. Please log in");
    }
    if (!args.orderInput.products || args.orderInput.products.length === 0) {
      throw new Error("Orders must contain products");
    }
    // console.log("TCL: args", {...args.orderInput.products})

    const orderInput = [...args.orderInput.products];
    const countProducts = [...args.orderInput.products];

    // const products = await db.get('products').cloneDeep().value();
    // const sortedProducts = orderInput.map(orderProduct => {
    //     const product = products.find(product => orderProduct.id === product.id);
    //     return transformProduct(product)
    // })

    let totalQuantity = 0;

    countProducts.map(product => {
      // console.log(quantity)
      totalQuantity += +product.quantity;
      return product;
    });
    // console.log(totalQuantity)

    const order = {
      id: await getNewOrderId(),
      // userId: userId,
      userId: userId,
      quantity: +totalQuantity,
      date: "" + Date.now(),
      products: orderInput
    };

    // console.log(order)

    // const result = await db
    await db
      .get("orders")
      .push(order)
      .last()
      .write();

    const realProducts = await findOrderProducts([...order.products]);
    // const returnProducts = realProducts.map(product => transformProduct(product))

    // console.log(realProducts)

    // .value()

    return {
      ...order,
      products: realProducts
    };
    // return order
  }
};
