import "@babel/polyfill";
const gamesList = document.getElementById("games");
const searchBar = document.getElementById("searchBar");
let games = [];
searchBar.addEventListener('keyup', (e) => {
		const searchString = e.target.value.toLowerCase();
		const allGames = document.querySelectorAll('.game-name')
			allGames.forEach((game) => {
				console.log({game})
				const title = game.textContent
				if(title.toLowerCase().indexOf(searchString) != -1) {
					console.log('sdfsdf',game.nodeName)
					game.parentNode.style.display = 'block'
				} else {
					game.parentNode.style.display = 'none'
				}
			})
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
			return (
				`
				<div>
					<h1>${game.title}</h1>
					<div class="game-items">
						${game.items.map(({image, title}) => {
							return (
								`
								<div class="game-item">
									<img class="item-image" src="${image}"/>
									<p class="game-name">${title}</p>
								</div>
								`
								)
							})}
					</div>
				</div>
				`
			)
		}).join("").trim();
    gamesList.innerHTML = htmlString;
	}
}
loadData();



`<div key={item.id}><img src ="${item.image}" /><p class="game-name">${item.title}</p></div`