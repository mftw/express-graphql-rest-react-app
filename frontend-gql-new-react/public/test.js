

let myNumber = 2;
let myNumber2 = 3;
// let Calcnumber

let calculatedNum = calculateNumber(myNumber, myNumber2);

// let calcNew = ;
// 10

function calculateNumber(number1, number2) {
    return number1 + number2
    // calculatedNum = number1 + number2;
}

function newFunction(number1, number2) {
    return number1 - number2;
}

console.log('this is the number: ' + calculatedNum)

// 5


function maybeThisWorks() {
    // veryDangerousThing()
    try {
        // veryDangerousThing()
        calculateNumber(9, 1);
        return true;

    } catch (e) {
        console.log(e);
        // doSomethingElse()
        return false;
    }
}

let didItWork = maybeThisWorks();

console.log(didItWork);

// true / false