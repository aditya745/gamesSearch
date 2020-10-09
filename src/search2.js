const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchstates = async searchText => {
    const res = await fetch('../data/state.json');
    const states = await res.json();

let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}, gi`);
    return state.name.match(regex) || state.abbr.match(regex);

});

console.log(matches);
outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div>
            <h4>${match.name} ${match.abbr}</h4>
            </div>
        `).join('');
matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchstates(search.value))




import "@babel/polyfill";
const gamesList = document.getElementById("games");
const searchBar = document.getElementById("searchBar");
let games = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredGames = games.lists.filter((game) => {
        return (
            game.title.toLowerCase().includes(searchString) 
           // game.items.map(item => item.title.toLowerCase().includes(searchString))
        );
    });
    displayGames(filteredGames);
});


const loadData = async () => {
    try {
        const res = await fetch("./api/games/lists.json");
        games = await res.json();
        displayGames(games);
    } catch (err) {
        console.error(err);
    }
}; 

const displayGames = (gamesData) => {
    console.log("games", gamesData)
    if(gamesData.lists) {
    const htmlString = gamesData.lists.map((game) => {
    const itemsData = game.items.map((item) => { return `<div key={item.id}><img src ="${item.image}" />${item.title}</div`});
        return `
        <div class="game">
            <h2>${game.title}</h2>
            <div>${itemsData}</div>
        </div>
        `;
    })
    .join("");
    gamesList.innerHTML = htmlString;
}
};

loadData();

