const db = require('./api/lib/db');
// const productGroupRel = require('./productGroupRel');
// const productGroupRelObj = JSON.parse(productGroupRel);

const products = db.get('products').value()



const uploadFolder = 'uploads/products/';

const productGroupRel = [
    {
        "product_id": 1,
        "productgroup_id": 2
    },
    {
        "product_id": 2,
        "productgroup_id": 2
    },
    {
        "product_id": 3,
        "productgroup_id": 2
    },
    {
        "product_id": 4,
        "productgroup_id": 2
    },
    {
        "product_id": 5,
        "productgroup_id": 2
    },
    {
        "product_id": 6,
        "productgroup_id": 2
    },
    {
        "product_id": 7,
        "productgroup_id": 2
    },
    {
        "product_id": 8,
        "productgroup_id": 2
    },
    {
        "product_id": 9,
        "productgroup_id": 2
    },
    {
        "product_id": 10,
        "productgroup_id": 2
    },
    {
        "product_id": 16,
        "productgroup_id": 2
    },
    {
        "product_id": 11,
        "productgroup_id": 3
    },
    {
        "product_id": 12,
        "productgroup_id": 3
    },
    {
        "product_id": 13,
        "productgroup_id": 3
    },
    {
        "product_id": 14,
        "productgroup_id": 3
    },
    {
        "product_id": 15,
        "productgroup_id": 3
    },
    {
        "product_id": 16,
        "productgroup_id": 3
    },
    {
        "product_id": 17,
        "productgroup_id": 3
    },
    {
        "product_id": 23,
        "productgroup_id": 6
    },
    {
        "product_id": 24,
        "productgroup_id": 6
    },
    {
        "product_id": 25,
        "productgroup_id": 6
    },
    {
        "product_id": 26,
        "productgroup_id": 6
    },
    {
        "product_id": 27,
        "productgroup_id": 6
    },
    {
        "product_id": 28,
        "productgroup_id": 7
    },
    {
        "product_id": 29,
        "productgroup_id": 7
    },
    {
        "product_id": 30,
        "productgroup_id": 7
    },
    {
        "product_id": 31,
        "productgroup_id": 7
    },
    {
        "product_id": 32,
        "productgroup_id": 10
    },
    {
        "product_id": 33,
        "productgroup_id": 10
    },
    {
        "product_id": 34,
        "productgroup_id": 10
    },
    {
        "product_id": 35,
        "productgroup_id": 10
    },
    {
        "product_id": 36,
        "productgroup_id": 11
    },
    {
        "product_id": 37,
        "productgroup_id": 11
    },
    {
        "product_id": 38,
        "productgroup_id": 11
    },
    {
        "product_id": 39,
        "productgroup_id": 11
    },
    {
        "product_id": 40,
        "productgroup_id": 11
    },
    {
        "product_id": 41,
        "productgroup_id": 12
    },
    {
        "product_id": 44,
        "productgroup_id": 13
    },
    {
        "product_id": 18,
        "productgroup_id": 24
    },
    {
        "product_id": 19,
        "productgroup_id": 24
    },
    {
        "product_id": 20,
        "productgroup_id": 25
    },
    {
        "product_id": 21,
        "productgroup_id": 26
    },
    {
        "product_id": 22,
        "productgroup_id": 26
    },
    {
        "product_id": 42,
        "productgroup_id": 27
    },
    {
        "product_id": 43,
        "productgroup_id": 27
    }
];

// function includeFolderInImageUrl() {
//     products.map(product => {
//         // const productImg = product.image;
//         if(!product.image.include(uploadFolder)){
//             db.get('products').find({id : product.id}).assign({image: uploadFolder + product.image}).write()
//         }
//         // return product.image = uploadFolder + 
//     })
// }

const includeFolderInImageUrl = () => {
    products.map(product => {
        // const productImg = product.image;
        if(!product.image.include(uploadFolder)){
            db.get('products').find({id : product.id}).assign({image: uploadFolder + product.image}).write()
        }
        // return product.image = uploadFolder + 
    })
}

exports.includeFolderInImageUrl = includeFolderInImageUrl;

exports.includeProductGroupRel = () => {
    // console.log(Array.isArray(productGroupRel))
    console.clear();
    products.map(product => {
        // const productImg = product.image;
        productGroupRel.map(groupRel => {
            if(product.id === groupRel.product_id)
            db.get('products').find({id : product.id}).assign({productGroup: groupRel.productgroup_id}).write()
        })
        // return product.image = uploadFolder + 
    })
}
// module.exports = () => {
//     includeFolderInImageUrl();
//     return;
//     // db.get('products').write();
// }