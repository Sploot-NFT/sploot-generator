const fs = require('fs');

const dna = require('./libs/dna');
const utils = require('./libs/utils');
const names = require('./libs/names');
const persona = require('./libs/persona');

const minStatScore = 1;
const maxStatScore = 10;
const maxSplooters = 1000;

// DNA: 3 body, 3 mind, 3 soul.
const splooterBase = {
    name: "Unrevealed Splooter",
    dna: [
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
        {
            code: 0,
            color: "#000000",
            scale: 0
        },
    ],
    attributes: [
        {
            trait_type: "Speed",
            value: 0
        },
        {
            trait_type: "Stamina",
            value: 0
        },
        {
            trait_type: "Strength",
            value: 0
        },
        {
            trait_type: "Aggression",
            value: 0
        },
        {
            trait_type: "Creativity",
            value: 0
        },
        {
            trait_type: "Luck",
            value: 0
        },
        {
            trait_type: "Focus",
            value: 0
        },
        {
            trait_type: "Influence",
            value: 0
        },
        {
            trait_type: "Agility",
            value: 0
        },
        {
            trait_type: "Phobia",
            value: ""
        },
        {
            trait_type: "Vice",
            value: ""
        },
        {
            trait_type: "Role",
            value: ""
        },
        {
            trait_type: "Personality",
            value: ""
        },
        {
            trait_type: "Class",
            value: ""
        },
        {
            trait_type: "Affinity",
            value: ""
        }
    ],
    image: ""
}


const generateSplooter = async function (splootId) {

    let splooter = JSON.parse(JSON.stringify(splooterBase));
    splooter.dna = dna.getDna(splootId);

    // construct stats.
    splooter = generateStats(splooter);

    // fetch name.
    splooter.name = names.getName(splooter);

    // fetch persona information.
    splooter = utils.setAttribute(splooter, "Personality", persona.getPersonality(splooter));
    splooter = utils.setAttribute(splooter, "Phobia", persona.getPhobia(splooter));
    splooter = utils.setAttribute(splooter, "Vice", persona.getVice(splooter));
    splooter = utils.setAttribute(splooter, "Role", persona.getRole(splooter));
    splooter = utils.setAttribute(splooter, "Class", persona.getClass(splooter));

    return splooter;
}


const generateStats = function (splooter) {
    for (let i = 0; i < splooter.dna.length; i++) {
        splooter.attributes[i].value = Math.round(splooter.dna[i].scale * (maxStatScore - minStatScore)) + minStatScore;
    }

    let affinity = utils.getAffinity(splooter);
    splooter = utils.setAttribute(splooter, "Affinity", affinity);

    return splooter;
}


const generateMetadata = async function () {
    for (let i = 0; i < maxSplooters; i++) {
        const metadataPath = `./metadata/${i}.json`;
        const newSplooter = await generateSplooter(i);
        fs.writeFileSync(metadataPath, JSON.stringify(newSplooter));
    }
}

generateMetadata();
