const db = require('../lib/db');
const { sanitizeIncomingValue, typeCastIfNumber } = db;

exports.productgroups_get_all = (req, res, next) => {
    res.status(200).json(db.get('productGroups'))
}

exports.productgroups_get_all_and_products = (req, res, next) => {
    const productGroups = db.get('productGroups').cloneDeep().value();
    const products = db.get('products').cloneDeep().value();
    
    productGroups.map(productGroup => productGroup.products = products.filter(product => product.productGroup == productGroup.id))
    
    return res.status(200).json(productGroups)
}

exports.productgroups_get_productgroup_and_products = (req, res, next) => {
    const productGroupId = typeCastIfNumber(req.params.productGroupId);
    // console.log(productGroupId)
    const productGroup = db.get('productGroups').find({ id: productGroupId }).cloneDeep().value();
    const products = db.get('products').cloneDeep().value();
    // console.log(products.length)

    if(!productGroup) {
        return res.status(404).json({ message: `Product group with id ${productGroupId} was not found`});
    }

    productGroup.products = products.filter(product => product.productGroup == productGroupId)

    return res.status(200).json(productGroup);
}

exports.productgroups_get_productgroup = (req, res, next) => {
    const productGroupId = sanitizeIncomingValue(req.params.productGroupId);
    const productGroup = db.get('productGroups').find({ id: productGroupId});

    if(!productGroup) {
        return res.status(404).json({ message: `Product group with id ${productGroupId} was not found`});
    }

    return res.status(200).json(productGroup);
}

exports.productgroups_create_productgroup = (req, res, next) => {
    const {title, parent_id, description} = req.body;

    if(!title || !parent_id || !description) {
        return res.status(400).json({ message: 'Insufficient information to create product group' })
    }

    const productGroupObj = {
        id: db.getNewIdFor('productGroups'),
        title: sanitizeIncomingValue(title),
        parent_id: db.typeCastIfNumber(parent_id),
        description: sanitizeIncomingValue(description),
    }

    db.get('productGroups')
    .push(productGroupObj)
    .last()
    .write();

    return res.status(200).json(productGroupObj)
}

exports.productgroups_delete_productgroup = (req, res, next) => {

}