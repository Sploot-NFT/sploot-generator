
const getDna = require('./libs/dna');

const splooterBase = {
    name: "Unrevealed Splooter",
    dna: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

const generateSplooter = async function () {

    let splooter = JSON.parse(JSON.stringify(splooterBase));
    splooter.dna = getDna();

    return splooter;
}


const generateMetadata = async function () {
    const numSplooters = 3;
    let splooterList = [];

    for (let i = 0; i < numSplooters; i++) {
        const newSplooter = await generateSplooter();
        splooterList.push(newSplooter);
    }

    console.log(splooterList);
}

generateMetadata();
