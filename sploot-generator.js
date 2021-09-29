
const dna = require('./libs/dna');

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
        }
    ],
    image: ""
}


const generateSplooter = async function (splootId) {

    let splooter = JSON.parse(JSON.stringify(splooterBase));
    splooter.dna = dna.getDna(splootId);

    return splooter;
}


const generateMetadata = async function () {
    const numSplooters = 3;
    let splooterList = [];

    for (let i = 0; i < numSplooters; i++) {
        const newSplooter = await generateSplooter(i);
        splooterList.push(newSplooter);
    }

    console.log(JSON.stringify(splooterList));
}

generateMetadata();
