const seedrandom = require('./seedrandom');

const dnalist = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const getDna = function () {
    var myrng = seedrandom('hello.');
    console.log(myrng());                // Always 0.9282578795792454
    console.log(myrng());                // Always 0.3752569768646784

    return [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

module.exports = getDna;