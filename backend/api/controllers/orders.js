const db = require('../lib/db');

exports.orders_get_all = (req, res, next) => {
    res.status(200).json(db.get('orders').value())
};

exports.orders_get_by_user = (req, res, next) => {
    const { userId } = req.userData;

    const orders = db.get('orders').cloneDeep().value();

    // const userOrders = orders.filter(order => {
    //     return order.user === userId
    // })
    const userOrders = orders.filter(order =>  order.user === userId )

    if(userOrders.length === 0) {
        return res.status(200).json({message: 'You currently have no orders'});
    }

    return res.status(200).json(userOrders)
};

exports.orders_create_order = (req, res, next) => {
    const productId = db.typeCastIfNumber(req.body.productId)
    const quantity = db.typeCastIfNumber(req.body.quantity);
    const { userId, email } = req.userData;

    if(!productId || !quantity) {
        return res.status(400).json({message: 'no product or quantity'});
    } else if (db.isNumber(quantity)) {
        return res.status(400).json({message: 'quantity must be a number'});
    }

    const product = db.get('products').find({ id: productId}).value()

    if(!product) {
        return res.status(404).json({message: 'Product not found'});
    }

    const orderObj = {
        id: db.getNewOrderId(),
        productId: productId,
        quantity: +quantity,
        user: userId,
        email: email,
        timestamp: Date.now(), // Convert to human readable time by Date(date)
    }

    db.get('orders')
    .push(orderObj)
    .last()
    .write();

    return res.status(200).json(orderObj);
};

exports.orders_get_order = (req, res, next) => {
    const { orderId } = req.params;
    const { userId } = req.userData;

    if(!orderId) {
        return res.status(400).json({ message: 'Must have an order id', example: { orderId: '47d9f1cb-6b2c' } })
    }

    const order = db.get('orders').find({id : orderId}).value();

    if(!order || (order.user !== userId)) {
        // if(!db.verifySuperuser(userId)) {
        if(!db.verifySuperuser(req.userData)) {
            return res.status(404).json({message: `No order with id ${orderId} found.`})
        }
    }

    return res.status(200).json(order)
};

exports.orders_delete_order = (req, res, next) => {
    const { orderId } = req.params;
    const { userId } = req.userData;

    if(!orderId) {
        return res.status(400).json({ message: 'Must have an order id', example: { orderId: '47d9f1cb-6b2c' } })
    }

    const order = db.get('orders').find({id : orderId}).value();

    if(!order || (order.user !== userId)) {
        if(!db.verifySuperuser(req.userData)) {
            return res.status(404).json({message: `No order with id ${orderId} found.`})
        }
    }

    db.get('orders')
    .remove({ id: orderId })
    .write()

    return res.status(200).json({message: `Order with id ${orderId} successfully deleted.`})
};
