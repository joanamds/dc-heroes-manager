const fs = require('fs').promises;
const path = require('path');

const fileName = '../dc_heroes.json';
const filePath = path.join(__dirname, fileName);

const readHeroes = async () => {
  const heroes = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(heroes)
}

const writeHeroes = async (data) => {
  const newHero = await fs.writeFile(filePath, JSON.stringify(data));
  return newHero;
}

module.exports = {
  readHeroes,
  writeHeroes
}