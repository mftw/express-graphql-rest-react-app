const fs = require('fs');
const db = require('../lib/db');
const { sanitizeIncomingValue, getNewProductId, typeCastIfNumber } = db;

exports.products_get_all = (req, res, next) => {
    res.status(200).json(db.get('products'))
};

exports.products_create_product = (req, res, next) => {

    const {
        title, 
        description_short, 
        description_long, 
        brand,
        price,
        stock,
        productGroup
    } = req.body;


    if(!req.file) {
        return res.status(400).json({ message: 'New products must include an image' })
    }
    
    if(!productGroup) {
        return res.status(400).json({ message: 'New products must have a product group' })
    }

    const titlecheck = db.get('products').find({ title: title }).value();

    if(titlecheck) {
        return res.status(200).json({ message: `Product with title ${title} already exists`})
    }

    const brandCheck = db.get('brands').find({ title: brand }).value();

    if(!brandCheck) {
        return res.status(404).json({ message: `Brand with name ${brand} was not found` })
    }

    const productGroupCheck = db.get('productGroups').find({ id: typeCastIfNumber(productGroup) }).value();

    if(!productGroupCheck) {
        return res.status(404).json({ message: `Product group with id ${productGroup} was not found` })
    }

    
    const dbReqObj = {
        id: getNewProductId(),
        title: sanitizeIncomingValue(title),
        description_short: sanitizeIncomingValue(description_short),
        description_long: sanitizeIncomingValue(description_long),
        brand: sanitizeIncomingValue(brand),
        price: sanitizeIncomingValue(price, true),
        stock: sanitizeIncomingValue(stock, true),
        productGroup: sanitizeIncomingValue(productGroup),
        image: req.file.path,
    }


    db.get('products')
    .push(dbReqObj)
    .last()
    .write()

    return res.status(200).json(dbReqObj); 
};

exports.products_get_product = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.productId);

    const product = db.get('products')
    .find({ id: id }).value();

    if(product) {
        return res.status(200).json(product)
    } else {
        return res.status(404).json({message: 'Nothing found'})
    }
};


exports.products_update_product = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.productId);
    
    const product = db.get('products')
                    .find({ id: id })
                    .value()

    let response = { message: 'Not Found' };

    const invalidMessage = {
        message: 'Invalid PATCH request. Update object expected',
        example: {
            update: {
                description_short: "This is a redacted product description etc."
            }
        }
    }

    if(!product) {
        return res.status(404).json(response)
    } else if(!req.body.update){
        return res.status(400).json(invalidMessage)
    } else {
        response =  db.get('products')
                    .find({ id: id })
                    .assign({...req.body.update})
                    .write()


        return res.status(200).json(response)
    }
};

exports.products_delete = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.productId);
    
    const product = db.get('products')
    .find({ id: id })
    .value()

    if(!product) {
        res.status(404).json({ message: 'Not Found' })
    } else {

        try {
            if(product.image) {
                fs.unlinkSync(product.productImage)
            }
            //file removed
        } catch(err) {
            console.error(err)
        }

        db.get('products')
        .remove({ id: id })
        .write()

        return res.status(200).json({message: `Product with ID: ${id} successfully deleted`})
    }
};
