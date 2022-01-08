const seedrandom = require('./seedrandom');
const utils = require('./utils');
const data = require('./data');

let persona = {};

const maxTeams = 16;
const playersPerTeam = 50;

// these are singles.
let ownerCount = 0;
let gmCount = 0;
let hcCount = 0;
let directorCount = 0;

// this is a max of 16*50.
let playerCount = 0;

const personaIndexes = {
    "role": 0,
    "personality": 1,
    "class": 2,
    "phobia": 3,
    "vice": 4,
}

persona.getPhobia = function (splooter) {
    if (splooter.name in data.partners) {
        return data.partners[splooter.name][personaIndexes["phobia"]];
    }
    let phobiaSeed = splooter.name + utils.getAttribute(splooter, "Personality") + "phobia";
    let phobiaRng = seedrandom(phobiaSeed);

    let phobiaCount = persona.getCount(phobiaRng);
    // console.log("phobiaCount:", phobiaCount);
    let phobiaList = [];
    for (let i = 0; i < phobiaCount; i++) {
        phobiaList.push(utils.pullFromBag(data.phobias, phobiaRng));
    }
    phobiaList = utils.dedupe(phobiaList);
    let phobias = phobiaList.join(", ");
    if (phobias == "") phobias = "None";
    return phobias;
}

persona.getVice = function (splooter) {
    if (splooter.name in data.partners) {
        return data.partners[splooter.name][personaIndexes["vice"]];
    }
    let viceSeed = splooter.name + utils.getAttribute(splooter, "Personality") + "vice";
    let viceRng = seedrandom(viceSeed);

    let viceCount = persona.getCount(viceRng);
    let viceList = [];
    for (let i = 0; i < viceCount; i++) {
        viceList.push(utils.pullFromBag(data.vices, viceRng));
    }
    viceList = utils.dedupe(viceList);
    let vices = viceList.join(", ");
    if (vices == "") vices = "None";
    return vices;
}

persona.getPersonality = function (splooter) {
    if (splooter.name in data.partners) {
        return data.partners[splooter.name][personaIndexes["personality"]];
    }
    let personalityRng = seedrandom(splooter.dna[0].code + splooter.dna[1].code + splooter.dna[2].code + splooter.dna[3].code + splooter.dna[4].code + splooter.dna[5].code + splooter.dna[6].code + splooter.dna[7].code + splooter.dna[8].code);
    return utils.pullFromBag(data.personalities, personalityRng);
}

persona.getRole = function (splooter) {
    if (splooter.name in data.partners) {
        return data.partners[splooter.name][personaIndexes["role"]];
    }
    let roleSeed = splooter.name + utils.getAttribute(splooter, "Personality");
    let roleRng = seedrandom(roleSeed);
    let roleRoll = roleRng();

    let role = "Superfan";

    if (roleRoll > .97) {
        role = "Management";

    } else if (roleRoll > .8) {
        role = "Staff";

    } else if (roleRoll > .3) {
        role = "Superfan";

    } else {
        // if (playerCount < maxTeams * playersPerTeam) {
        //     role = "Player";
        //     playerCount += 1;
        // }
        role = "Player";
    }

    return role;
}

persona.getClass = function (splooter) {
    if (splooter.name in data.partners) {
        return data.partners[splooter.name][personaIndexes["class"]];
    }
    let role = utils.getAttribute(splooter, "Role");
    let classSeed = splooter.name + role;
    let classRng = seedrandom(classSeed);

    let charClass;

    if (role == "Management") {
        charClass = utils.pullFromWeightedBag(data.managementClasses, 1, classRng);

    } else if (role == "Staff") {
        charClass = utils.pullFromBag(data.staffClasses, classRng);

    } else if (role == "Superfan") {
        charClass = utils.pullFromWeightedBag(data.fanClasses, .4, classRng);

    } else {
        charClass = utils.pullFromWeightedBag(data.playerClasses, 1, classRng);
    }

    return charClass;

}

persona.getCount = function (countRng) {
    let countRoll = countRng();
    let count = 1;
    if (countRoll > .999) {
        count = 0;
    } else if (countRoll > .99) {
        count = 3;
    } else if (countRoll > .65) {
        count = 2;
    }
    return count;
}

module.exports = persona;
