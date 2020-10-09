import '@babel/polyfill';
const gamesList = document.getElementById('games');
const searchBar = document.getElementById('searchBar');
const categoryTitle = document.getElementById('category-title');
const categoryDecription = document.getElementById('category-description');
let games = [];
let searchHistory = [];

searchBar.addEventListener('keyup', (e) => {
    console.log('h', e.target.value)
    console.log('search', searchHistory.push(e.target.value));
    console.log('arr', searchHistory)
    const searchString = e.target.value.toLowerCase();
    const allGames = document.querySelectorAll('.game-name')
        allGames.forEach((game) => {
            const title = game.textContent;
            if(title.toLowerCase().indexOf(searchString) != -1) {
                game.parentNode.style.display = 'block'
            } else {
                game.parentNode.style.display = 'none'
            }
        })
});


const loadData = async () => {
    try {
        const res = await fetch('./api/games/lists.json');
        games = await res.json();
        displayGames(games);
    } catch (err) {
        console.error(err);
    }
}; 

const displayGames = (gamesData) => {
    if(gamesData.lists) {
        categoryTitle.innerHTML = gamesData.title;
        categoryDecription.innerHTML = gamesData.description;
        const htmlString = gamesData.lists.map((game) => {
			return (
				`
                <div>
					<h2>${game.title}</h2>
					<div class='game-items'>
						${game.items.map(({image, title}) => {
							return (
								`
                                    <div key={item.id}>
                                        <img src ='${image}' />
                                        <p class='game-name'>${title}</p>
                                    </div>
								`
								)
							})}
					</div>
				</div>
				`
			)
        })
        .join()
    gamesList.innerHTML = htmlString.replace(/,/g, ' ');
}
};

loadData();