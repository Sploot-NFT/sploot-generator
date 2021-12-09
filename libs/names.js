const seedrandom = require('./seedrandom');
const utils = require('./utils');
const data = require('./data');

let names = {};
let uniqueNameIndex = 0;

names.getName = function (splooter) {

    if (utils.isUnique(splooter)) {
        return names.getUniqueName();
    }

    let firstName = "";
    let lastName = "";

    // first name is based on mind values.
    let firstNameRng = seedrandom(splooter.dna[6].code + splooter.dna[7].code + splooter.dna[8].code);
    firstNameRoll = firstNameRng();

    if (firstNameRoll > .8) {
        firstName = utils.pullFromBag(data.weirdNames, firstNameRng);

    } else if (firstNameRoll > .4) {
        firstName = utils.pullFromBag(data.uncommonFirstNames, firstNameRng);

    } else {
        firstName = utils.pullFromBag(data.commonFirstNames, firstNameRng);
    }


    // last name is based on soul values.
    let lastNameRng = seedrandom(splooter.dna[3].code + splooter.dna[4].code + splooter.dna[5].code);
    lastNameRoll = lastNameRng();

    if (lastNameRoll > .8) {
        lastName = utils.pullFromBag(data.weirdNames, lastNameRng);

    } else if (lastNameRoll > .4) {
        lastName = utils.pullFromBag(data.uncommonLastNames, lastNameRng);

    } else {
        lastName = utils.pullFromBag(data.commonLastNames, lastNameRng);
    }

    return firstName + " " + lastName;
}

names.getUniqueName = function () {
    let returnName;

    if (uniqueNameIndex < data.uniqueNames.length) {
        returnName = data.uniqueNames[uniqueNameIndex];
        uniqueNameIndex += 1;

    } else {
        // we'll probably run out of unique names.
        let rng = seedrandom(uniqueNameIndex);
        returnName = utils.pullFromBag(data.uncommonFirstNames, rng) + " " + utils.pullFromBag(data.weirdNames, rng);
        uniqueNameIndex += 1;
    }

    return returnName;
}


module.exports = names;
