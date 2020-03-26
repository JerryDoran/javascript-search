const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let characters = [];

searchBar.addEventListener('keyup', e => {
  const filteredCharacters = characters.filter(character => {
    let searchString = e.target.value.toLowerCase();
    let name = character.name.toLowerCase();
    let house = character.house.toLowerCase();
    return name.includes(searchString) || house.includes(searchString);
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch('http://hp-api.herokuapp.com/api/characters');
    characters = await res.json();
    displayCharacters(characters);
  } catch (error) {
    console.error(error);
  }
};

const displayCharacters = characters => {
  const html = characters
    .map(character => {
      return `
    <li class="character">
      <h2>${character.name}</h2>
      <p>House: ${character.house}</p>
      <img src="${character.image}"></img>
    </li>
    `;
    })
    .join('');
  charactersList.innerHTML = html;
};

loadCharacters();
