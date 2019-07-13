

class Test {
    constructor(props) {

        this.var = 'test'
        this.var2 = 'test2';
        this.num = 2;
        this.test = props
    }
    
    value() {
        return 2
    };

    static valx2(val) {
        return val * 2
    }

    addToConsructorVars(add) {
        return this.num += add
    }
}
const test = new Test;

module.exports = test;


// console.log(Test.valx2(2))

// console.log(test.addToConsructorVars(2))
// console.log(test.addToConsructorVars(2))
// console.log(test.addToConsructorVars(2))
// console.log(test.addToConsructorVars(2))