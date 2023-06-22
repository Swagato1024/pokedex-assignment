const fs = require("fs");
let imgIndex = 1;
const closingTd = "</td>";
const opeingTr = "<tr>";
const closingTr = "</tr>";
const openingTable = '<table class="card-elements">';
const closingTable = "</table>";
const img = '<div class="poke-img card-elements"></div>';
const openingP = '<p class="name card-elements">';
const closingP = "</p>";
const opeingCard = '<div class="card">';
const closingCard = "</div>";
const opeingCardRow = '<div class="card-rows">';
const closingDiv = "</div>";

const generateCard = (line) => {
  const [id, ...stats] = line.split("|");

  const pokemon = {
    Name: stats[0],
    Types: stats[1],
    HP: stats[3],
    XP: stats[4],
    Attack: stats[5],
    Defense: stats[6],
    Weight: stats[7],
  };

  const attributes = ["Types", "Weight", "HP", "XP", "Attack", "Defense"];
  const openingTr = "<tr>";
  const openingTdAttribute = '<td class="attributes">';
  const openingTdValues = '<td class="values">';

  const rows = attributes
    .map((attribute) => {
      let cardRow = openingTr;
      cardRow += openingTdAttribute + attribute + closingTd;
      cardRow += openingTdValues + pokemon[attribute] + closingTd;
      cardRow += closingTr;
      return cardRow;
    })
    .join("");

  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(imgIndex++)
    .toString()
    .padStart(3, 0)}.png`;

  const table = openingTable + rows + closingTable;
  const name = openingP + pokemon["Name"] + closingP;
  const card =
    opeingCard +
    `
  <div class="card-elements poke-img">
  <img src="${imgUrl}"/>
  </div>` +
    name +
    table +
    closingCard;

  return card;
};

const generateCardRow = (lines) => {
  const row = lines
    .map((line) => {
      return generateCard(line);
    })
    .join("");

  return `<div class="card-rows">
              ${row}
          <\div>`;
};

const main = () => {
  const data = fs.readFileSync("./resources.txt", "utf-8");

  const [heading, ...lines] = data.trim().split("\n");

  let parsedData = "";

  for (index = 0; index < 8; index += 4) {
    const rows = lines.slice(index, index + 4);
    parsedData += generateCardRow(rows);
  }

  console.log(parsedData);
};
main();

