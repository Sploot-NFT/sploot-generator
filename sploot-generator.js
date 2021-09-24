
const getDna = require('./libs/dna');

// DNA: 3 body, 3 mind, 3 soul.
const splooterBase = {
    name: "Unrevealed Splooter",
    dna: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

const generateSplooter = async function (splootId) {

    let splooter = JSON.parse(JSON.stringify(splooterBase));
    splooter.dna = getDna(splootId);

    return splooter;
}


const generateMetadata = async function () {
    const numSplooters = 3;
    let splooterList = [];

    for (let i = 0; i < numSplooters; i++) {
        const newSplooter = await generateSplooter(i);
        splooterList.push(newSplooter);
    }

    console.log(splooterList);
}

generateMetadata();
