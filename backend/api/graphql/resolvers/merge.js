const db = require("../../lib/db");

const products = async id => {
  try {
    let newProducts = await db
      .get("products")
      .cloneDeep()
      .filter({ productGroup: +id })
      .value();

    newProducts = newProducts.map(product => {
      // return transformProduct(product)
      return {
        ...product,
        productGroup: () => productGrp(product.productGroup)
        // brand: () => brand(product.brand)
      };
    });

    return newProducts;
  } catch (err) {
    throw err;
  }
};

const productGrp = async id => {
  // throw Error('asdfsdf')
  try {
    let productGrp = await db
      .get("productGroups")
      .find({ id: +id })
      .cloneDeep()
      .value();
    // console.log("TCL: productGrp", productGrp)
    if (!productGrp) {
      throw new Error(`Cannot find product with id: ${id}`);
    }
    // productGrp = transformProductGrp(productGrp)
    const productCount = await products(id);
    // console.log("TCL: productCount", productCount.length)
    // return productGrp
    return {
      ...productGrp,
      productCount: productCount.length,
      // productCount: products(id).length,
      products: () => products(productGrp.id)
    };
  } catch (err) {
    throw err;
  }
};

const brand = async title => {
  try {
    const brand = await db
      .get("brand")
      .find({ title: "" + title })
      .cloneDeep()
      .value();
    // console.log("TCL: productGrp", productGrp)
    if (!brand) {
      throw new Error(`Cannot find product with id: ${title}`);
    }
    // productGrp = transformProductGrp(productGrp)
    const productCount = await db
      .get("products")
      .cloneDeep()
      .filter({ brand: "" + title })
      .value();
    // console.log("TCL: productCount", productCount.length)
    // return productGrp
    return {
      ...brand,
      productCount: productCount.length,
      // productCount: products(id).length,
      products: () => products(brand.id)
    };
  } catch (err) {
    throw err;
  }
};

const transformProduct = product => {
  return {
    ...product,
    productGroup: productGrp.bind(this, product.productGroup)
    // brand: brand.bind(this, product.brand)
  };
};

const transformProductGrp = prodGrp => {
  return {
    ...prodGrp,
    products: products.bind(this, prodGrp.id)
  };
};

exports.transformProduct = transformProduct;
exports.transformProductGrp = transformProductGrp;
exports.products = products;
exports.productGroup = productGrp;
