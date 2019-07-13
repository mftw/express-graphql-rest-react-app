const db = require('../lib/db');
const { sanitizeIncomingValue, getNewbrandId, typeCastIfNumber } = db;
const fs = require('fs');

exports.brands_get_all = (req, res, next) => {
    res.status(200).json(db.get('brands'))
};

exports.brands_and_products_get_all = (req, res, next) => {
    // Use cloneDeep or else the array and object mutations persists in other routes and requests
    const brands = db.get('brands').cloneDeep().value();
    const products = db.get('products').cloneDeep().value();
    // const brands = db.get('brands').value();
    // const products = db.get('products').value();

    brands.map(brand => brand.products = products.filter(product => product.brand === brand.title));    
        // console.log(brands)

    res.status(200).json(brands)
};

exports.brands_create_brand = (req, res, next) => {

    const {
        title, 
        description_short, 
        description_long, 
    } = req.body;


    if(!req.file) {
        res.status(400).json({ message: 'New brands must include either a JPG/JPEG or PNG image' })
        return;
    }

    const dbReqObj = {
        id: getNewbrandId(),
        title: sanitizeIncomingValue(title),
        description_short: sanitizeIncomingValue(description_short),
        description_long: sanitizeIncomingValue(description_long),
        brandImage: req.file.path,
    }


    db.get('brands')
    .push(dbReqObj)
    .last()
    .write();

    res.status(200).json(dbReqObj); 
};

exports.brands_get_brand = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.brandId);

    const brand = db.get('brands')
    .find({ id: id }).value();

    if(brand) {
        res.status(200).json(brand)
    } else {
        res.status(404).json({message: 'Nothing found'})
    }
};


exports.brands_get_brand_and_products = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.brandId);

    const brand = db.get('brands').find({ id: id }).cloneDeep().value();
    const products = db.get('products').cloneDeep().value();

    brand.products = products.filter(product => product.brand === brand.title)

    if(brand) {
        res.status(200).json(brand)
    } else {
        res.status(404).json({message: 'Nothing found'})
    }
};


exports.brands_update_brand = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.brandId);
    
    const brand = db.get('brands')
                    .find({ id: id })
                    .value()

    let response = { message: 'Not Found' };

    const invalidMessage = {
        message: 'Invalid PATCH request. Update object expected',
        example: {
            update: {
                description_short: "This is a redacted brand description etc."
            }
        }
    }

    if(!brand) {
        res.status(404).json(response)
    } else if(!req.body.update){
        res.status(400).json(invalidMessage)
    } else {
        response =  db.get('brands')
                    .find({ id: id })
                    .assign({...req.body.update}) // Object spread is the shit!!
                    .write()


        res.status(200).json(response)
    }
};

exports.brands_delete = (req, res, next) => {
    // params comes as strings so remember to typecast if it is stored in the database as a number
    const id = typeCastIfNumber(req.params.brandId);
    
    const brand = db.get('brands')
    .find({ id: id })
    .value()

    let response = { message: 'Not Found' };

    if(!brand) {
        res.status(404).json(response)
    } else {

        try {
            if(brand.brandImage) {
                fs.unlinkSync(brand.brandImage)
            }
            //file removed
        } catch(err) {
            console.error(err)
        }

        db.get('brands')
        .remove({ id: id })
        .write()

        res.status(200).json({message: `brand with ID: ${id} successfully deleted`})
    }
};
