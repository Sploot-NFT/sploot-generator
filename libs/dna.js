const seedrandom = require('./seedrandom');

let dna = {};

// we're gonna use block hashes for our seeds.
dna.blockHash = "0xa669da6a6e173402b09ad61b9a0dd61b2ab9066a924f49eef0ea12444151832a";

// formatted like a color wheel:  https://upload.wikimedia.org/wikipedia/commons/3/38/BYR_color_wheel.svg
dna.dnaFocusColors = ["#FE2712", "#0247FE", "#FEFE33"] // 3 primary colors.  body=red, mind=blue, soul=yellow
dna.dnaStatColors = ["#A7194B", "#FD5308", "#FB9902", "#FABC02", "#D0EA2B", "#66B032", "#0392CE", "#3D01A4", "#8601AF"] // 9 secondary/tertiary colors.
dna.dnaCode = ["Athletic", "Vitality", "Combat", "Entertainer", "Artistry", "Thaumaturgy", "Perception", "Influence", "Craftwork"];


dna.getDna = function (splootId) {
    let dnaRng = seedrandom(splootId + dna.blockHash);

    // determine rarity.
    let rarityRoll = dnaRng();
    let dnaBase = 0;
    let rarityDigit = 0;
    if (rarityRoll > .99) {
        dnaBase = .6; // unique
        rarityDigit = 100;
    } else if (rarityRoll > .85) {
        dnaBase = .3; // specialized
        rarityDigit = 10;
    }

    // determine affinity.
    let affinityRoll = dnaRng();
    let affinity = "body"; // since we're doing this client-side, making this a string just for ease of readibility.

    if (affinityRoll > .66) {
        affinity = "mind"
    } else if (affinityRoll > .33) {
        affinity = "soul"
    }

    // roll each set.
    let returnDna = [];
    let mod = "none";

    // body
    mod = dna.determineModBonus(affinity, "body");
    for (let i = 0; i < 3; i++) {
        let dnaRoll = dna.roll(dnaRng, mod, dnaBase);
        if (dnaRoll.code >= 2) {
            dnaRoll['color'] = dna.dnaFocusColors[0];
        } else if (dnaRoll.code >= 1) {
            dnaRoll['color'] = dna.dnaStatColors[i];
        }

        dnaRoll.code += rarityDigit;
        returnDna.push(dnaRoll);
    }

    // mind
    mod = dna.determineModBonus(affinity, "mind");
    for (let i = 3; i < 6; i++) {
        let dnaRoll = dna.roll(dnaRng, mod, dnaBase);
        if (dnaRoll.code >= 2) {
            dnaRoll['color'] = dna.dnaFocusColors[1];
        } else if (dnaRoll.code >= 1) {
            dnaRoll['color'] = dna.dnaStatColors[i];
        }

        dnaRoll.code += rarityDigit;
        returnDna.push(dnaRoll);
    }

    // soul
    mod = dna.determineModBonus(affinity, "soul");
    for (let i = 6; i < 9; i++) {
        let dnaRoll = dna.roll(dnaRng, mod, dnaBase);
        if (dnaRoll.code >= 2) {
            dnaRoll['color'] = dna.dnaFocusColors[2];
        } else if (dnaRoll.code >= 1) {
            dnaRoll['color'] = dna.dnaStatColors[i];
        }

        dnaRoll.code += rarityDigit;
        returnDna.push(dnaRoll);
    }

    return returnDna;
}


// NOTE:  the int is a flag representing affinity for that dna value.
// advantage roll = 2.NNN
// straight roll = 1.NNN
// disadvantage roll = 0.NNN
dna.roll = function (dnaRng, mod, dnaBase) {
    let rollValue = dnaRng() * (1 - dnaBase);
    let modRollValue = 0;
    let finalRoll = {
        code: 0,
        color: "#696969",
        scale: 0
    };

    if (mod == "advantage") {
        modRollValue = dnaRng() * (1 - dnaBase);
        // console.log(mod, rollValue, modRollValue);
        if (modRollValue > rollValue) {
            rollValue = 2 + modRollValue + dnaBase;
        } else {
            rollValue += 1 + dnaBase;
        }

    } else if (mod == "disadvantage") {
        modRollValue = dnaRng() * (1 - dnaBase);
        // console.log(mod, rollValue, modRollValue);
        if (modRollValue < rollValue) {
            rollValue = modRollValue + dnaBase;
        } else {
            rollValue += 1 + dnaBase;
        }
    } else {
        // console.log(mod, rollValue, modRollValue);
        rollValue += 1 + dnaBase;
    }

    finalRoll['code'] = (Math.round(rollValue * 10000) / 10000);
    finalRoll['scale'] = (Math.round((finalRoll['code'] % 1) * 10000) / 10000);

    return finalRoll;
}


dna.determineModBonus = function (affinity, focus) {
    let mod = "none";
    if (affinity == "body" && focus == "body") {
        mod = "advantage";
    } else if (affinity == "body" && focus == "mind") {
        mod = "disadvantage";
    } else if (affinity == "mind" && focus == "mind") {
        mod = "advantage";
    } else if (affinity == "mind" && focus == "soul") {
        mod = "disadvantage";
    } else if (affinity == "soul" && focus == "soul") {
        mod = "advantage";
    } else if (affinity == "soul" && focus == "body") {
        mod = "disadvantage";
    }
    return mod;
}

module.exports = dna;
