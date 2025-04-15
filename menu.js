// containers
const menuContainer = document.getElementById('menuContainer');
const gameContainer = document.getElementById('gameContainer');

// event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        menuContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        gameStart();
    }
})