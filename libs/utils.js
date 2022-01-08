
let utils = {};

utils.uniqueCount = 0;

utils.pullFromBag = function (bag, rng) {
    return bag[Math.floor(rng() * bag.length)];
}

utils.pullFromWeightedBag = function (bag, curveWeight, rng) {
    // bigger the curveWeight, the more extras added.
    // const curveWeight = .3;
    const uniqueCount = bag.length;
    let newBag = JSON.parse(JSON.stringify(bag));

    for (let i = 0; i < uniqueCount; i++) {
        let extras = Math.round((uniqueCount - i) * curveWeight);
        for (let e = 0; e < extras; e++) {
            newBag.push(bag[i])
        }
    }

    return utils.pullFromBag(newBag, rng);
}

utils.isUnique = function (splooter) {
    for (let i = 0; i < splooter.dna.length; i++) {
        if (splooter.dna[i].code >= 100) {
            utils.uniqueCount += 1;
            // console.log("uniques:", utils.uniqueCount);
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

utils.dedupe = function (arr) {
    return Array.from(new Set(arr));
}

module.exports = utils;
