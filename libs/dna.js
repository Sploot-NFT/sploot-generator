const seedrandom = require('./seedrandom');

// we're gonna use block hashes for our seeds.
const blockHash = "0xa669da6a6e173402b09ad61b9a0dd61b2ab9066a924f49eef0ea12444151832a";

const getDna = function (splootId) {
    var dnaRng = seedrandom(splootId + blockHash);

    // determine affinity.
    // roll each set.

    let returnDna = [];

    // body
    for (let i = 0; i < 3; i++) {
        returnDna.push(roll(dnaRng, 0, 0));
    }
    // mind
    for (let i = 0; i < 3; i++) {
        returnDna.push(roll(dnaRng, 0, 0));
    }
    // soul
    for (let i = 0; i < 3; i++) {
        returnDna.push(roll(dnaRng, 0, 0));
    }

    return returnDna;
}


const roll = function (dnaRng, advantageValue, affinityValue) {
    let rollValue = dnaRng();
    rollValue = Math.round(rollValue * 10000) / 10000;
    return rollValue;
}

module.exports = getDna;