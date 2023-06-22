const fs = require("fs");

const imgId = (id) => id.toString().padStart(3, 0);

const generateCard = (stats) => {
  const [id, name, types, speed, hp, xp, attack, defense, weight] = stats;

  const typesTemplate = types
    .split(",")
    .map((type) => `<div class="${type} poke-types"> ${type} </div>`)
    .join("\n");

  return `<div class="card">
<div class="poke-container">
  <img
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgId(
      id
    )}.png"
    class="poke-img"
  />
</div>

<p class="name">${name}</p>

<div class="pokemon-detail">
  <div class="attribute">
    <div class="label">Types</div>
    <div class="value">
    ${typesTemplate}
    </div>
  </div>

  <div class="attribute">
    <div class="label">Weight</div>
    <div class="value">${weight}</div>
  </div>

  <div class="attribute">
    <div class="label">HP</div>
    <div class="value">${hp}</div>
  </div>

  <div class="attribute">
    <div class="label">XP</div>
    <div class="value">${xp}</div>
  </div>

  <div class="attribute">
    <div class="label">Attack</div>
    <div class="value">${attack}</div>
  </div>

  <div class="attribute">
    <div class="label">Defense</div>
    <div class="value">${defense}</div>
  </div>
</div>
</div>`;
};

const main = () => {
  fs.readFile("./resources.txt", "utf-8", (err, data) => {
    const [header, ...stats] = data.trim().split("\n");

    const cards = stats.map((stat) => generateCard(stat.split("|"))).join("\n");

    console.log(
      `
      <div class="card-collections"> 
      ${cards}
      </div>
      `
    );
  });
};

main();
