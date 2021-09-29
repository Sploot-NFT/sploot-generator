
let utils = {};

utils.pullFromBag = function (bag, rng) {
    return bag[Math.floor(rng() * bag.length)];
}

utils.isUnique = function (splooter) {
    for (let i = 0; i < splooter.dna.length; i++) {
        if (splooter.dna[i].code >= 100) {
            return true;
        }
    }
    return false;
}

utils.getAffinity = function (splooter) {
    let affinity = "None";
    for (let i = 0; i < splooter.dna.length; i++) {
        if (i < 3 && splooter.dna[i].code % 10 >= 2) {
            affinity = "Body";
        } else if (i < 6 && splooter.dna[i].code % 10 >= 2) {
            affinity = "Soul";
        } else if (splooter.dna[i].code % 10 >= 2) {
            affinity = "Mind";
        }
    }
    return affinity;
}

utils.setAttribute = function (splooter, attribute, value) {
    for (let i = 0; i < splooter.attributes.length; i++) {
        if (splooter.attributes[i].trait_type == attribute) {
            splooter.attributes[i].value = value;
            return splooter;
        }
    }
    return splooter;
}

utils.getAttribute = function (splooter, attribute) {
    for (let i = 0; i < splooter.attributes.length; i++) {
        if (splooter.attributes[i].trait_type == attribute) {
            return splooter.attributes[i].value;
        }
    }
    return "";
}

module.exports = utils;
