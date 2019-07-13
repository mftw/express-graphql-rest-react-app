const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync')

const uuid = require('uuid')

const adapter = new FileAsync('db.json')
// let database = low(adapter);
// const db = database;
(async () => {
    var database;
    database = await low(adapter);

    // Initialize the database if it is empty
    await database.defaults({ 
        users: [], 
        products: [],
        productGroups: [],
        brands: [],
        orders: []
    })
    .write()
    
    database.verifySuperuser = async userToCheck => {
        const { userId } = userToCheck;
        const user = await database.get('users').find({ id: userId }).value()
    
        if(user.superuser) {
            userToCheck.superuser = true;
            return true;
        } else {
            return false
        }
    }
    
    // Returns true if its a number. More reliable than isNaN() and Number.isNaN()
    database.isNumber = (num) => {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }
    
    database.typeCastIfNumber = val => {
        return database.isNumber(val) // check if val is a number
                ? parseInt(val) // Typecast to integer if it's a number
                : val;          // Just use it as-is if it's not a number (e.g UUID)
    }
    
    database.sanitizeIncomingValue = async (val, number = false, optional = false) => {
        if(val === undefined || val === '') {
            if(optional) {
                return '';
            } else {
                const error = new Error('value is undefined');
                error.status = 400;
                throw error;
            }
        } else if(number && !await database.isNumber(val)) {
            const error = new Error('value should be a number');
            error.status = 400;
            throw error;
        }
    
        return val
    }
    
    database.getNewProductId = async () => {
        const newId = uuid().substring(0, 13); // No need for the long id.
        const found = await database.get('products')
                            .find({id: newId})
                            .value();
    
        // In the extremely unlikely event that we get a unique id that exist in the database already,
        // call ourselves to try again
        if(found){
            await database.getNewProductId()
        } else {
            return newId;
        }
    }
    
    database.getNewUserId = async () => {
        const newId = uuid().substring(0, 13); // No need for the long id.
        const found = await database.get('users')
                            .find({id: newId})
                            .value();
    
        // In the extremely unlikely event that we get a unique id that exist in the database already,
        // call ourselves to try again
        if(found){
            await database.getNewUserId()
        } else {
            return newId;
        }
    }
    
    database.getNewOrderId = async () => {
        const newId = uuid().substring(0, 13); // No need for the long id.
        const found = await database.get('orders')
                            .find({id: newId})
                            .value();
    
        // In the extremely unlikely event that we get a unique id that exist in the database already,
        // call ourselves to try again
        if(found){
            await database.getNewOrderId()
        } else {
            return newId;
        }
    }
    
    database.getNewIdFor = async dbTable => {
        const newId = uuid().substring(0, 13); // No need for the long id.
        const found = await database.get(''+dbTable) // db.get() takes a string
                            .find({id: newId})
                            .value();
    
        // In the extremely unlikely event that we get a unique id that exist in the database already,
        // call ourselves to try again
        if(found){
            await database.getNewIdFor(dbTable)
        } else {
            return newId;
        }
    }
    return database;
    }
)

module.exports = database;