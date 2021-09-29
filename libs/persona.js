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

persona.getPhobia = function (splooter) {
    return "None";
}

persona.getVice = function (splooter) {
    return "None";
}

persona.getPersonality = function (splooter) {
    let personalityRng = seedrandom(splooter.dna[0].code + splooter.dna[1].code + splooter.dna[2].code + splooter.dna[3].code + splooter.dna[4].code + splooter.dna[5].code + splooter.dna[6].code + splooter.dna[7].code + splooter.dna[8].code);
    return utils.pullFromBag(data.personalities, personalityRng);
}

persona.getRole = function (splooter) {
    let roleSeed = splooter.name + utils.getAttribute(splooter, "Personality");
    let roleRng = seedrandom(roleSeed);
    let roleRoll = roleRng();

    let role = "Staff";

    if (roleRoll > .95) {
        role = "Management";

    } else if (roleRoll > .6) {
        role = "Staff";

    } else if (roleRoll > .4) {
        role = "Superfan";

    } else {
        if (playerCount < maxTeams * playersPerTeam) {
            role = utils.pullFromBag(data.playerRoles, roleRng);
            playerCount += 1;
        }
    }

    return role;
}

persona.getClass = function (splooter) {
    let role = utils.getAttribute(splooter, "Role");
    let classSeed = splooter.name + role;
    let classRng = seedrandom(classSeed);

    let charClass;

    if (role == "Management") {
        charClass = utils.pullFromBag(data.managementClasses, classRng);

    } else if (role == "Staff") {
        charClass = utils.pullFromBag(data.staffClasses, classRng);

    } else if (role == "Superfan") {
        charClass = utils.pullFromBag(data.fanClasses, classRng);

    } else {
        charClass = "Player";
    }

    return charClass;

}


module.exports = persona;
