const fs = require('fs');

const femaleNames = ["Anna", "Barbara", "Katarzyna", "Paulina", "Małgorzata"];
const maleNames = ["Andrzej", "Jan", "Krzysztof", "Piotr", "Mateusz"];
const lastNames = ["Nowak", "Kowalski", "Wiśniewski", "Wójcik", "Kowalczyk"];
const genders = ["Male", "Famale"];

function randomChoice(table) {
    const indeks = Math.floor(Math.random() * table.length);
    return table[indeks];
}
function generateEmail(name, lastName) {
    const domena = 'gmail.com';
    return `${name.toLowerCase()}.${lastName.toLowerCase()}@${domena}`;
}
function generateMobileNumber() {
    let areaCode = '+48 ';

    for (let i = 0; i < 9; i++) {
        areaCode += Math.floor(Math.random() * 10);
    }
    return areaCode;
}
const people = [];

for (let i = 1; i <= 12; i++) {

    const randomGender = randomChoice(genders);
    const randomName = randomGender === 'Male' ? randomChoice(maleNames) : randomChoice(femaleNames);
    const randomLastNames = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomAge = Math.floor(Math.random() * 18) + 60;
    const randomMobileNumber = generateMobileNumber();
    const normalizeName = randomName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
    const normalizeLastname = randomLastNames.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
    const randomEmail = generateEmail(normalizeName, normalizeLastname);
    const data = `${randomName}, ${randomLastNames}, ${randomGender}, ${randomAge}, ${randomEmail}, ${randomMobileNumber}`;

    const filePath = 'people.json.';
    people.push(data);

    const dataJSON = JSON.stringify(people, null, 2);
    fs.writeFile(filePath, dataJSON, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
