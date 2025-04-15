// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 670;

// game variables
const tileTypes = {
    0: 'empty',
    1: 'wall',
    2: 'dot',
    3: 'power'
};
  

const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,0,0,0,0,1,1,0,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,0,2,0,0,0,1,1,0,0,0,0,1,1,0,0,0,2,0,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,2,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1],
    [1,2,1,1,1,1,2,1,0,1,1,1,2,1,1,2,0,0,0,1,2,2,2,1,0,0,0,0],
    [1,2,1,1,1,1,2,1,0,1,1,1,2,1,1,2,1,0,1,1,2,1,2,1,1,1,1,1],
    [1,3,2,2,1,1,2,2,2,2,0,0,2,2,2,2,1,0,2,2,2,2,2,2,2,2,3,1],
    [1,1,1,2,1,1,2,1,1,2,0,1,1,1,1,0,1,0,1,1,2,1,1,1,1,1,2,1],
    [1,1,1,2,1,1,2,1,1,2,0,1,1,1,1,0,0,0,1,0,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,1,1,2,2,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
  
  
// draw map
function drawMap() {
    const tileSize = canvas.width / 28;
    const radius = tileSize / 2;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const tile = map[y][x];
            const posX = x * tileSize;
            const posY = y * tileSize;

            switch (tile) {
                case 1: // Wall with curved corners
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 2;
                    ctx.beginPath();

                    const top = y > 0 && map[y - 1][x] === 1;
                    const bottom = y < map.length - 1 && map[y + 1][x] === 1;
                    const left = x > 0 && map[y][x - 1] === 1;
                    const right = x < map[y].length - 1 && map[y][x + 1] === 1;

                    // top line
                    if (!top) {
                        ctx.moveTo(posX, posY);
                        ctx.lineTo(posX + tileSize, posY);
                    }

                    // right line
                    if (!right) {
                        ctx.moveTo(posX + tileSize, posY);
                        ctx.lineTo(posX + tileSize, posY + tileSize);
                    }

                    // bottom line
                    if (!bottom) {
                        ctx.moveTo(posX + tileSize, posY + tileSize);
                        ctx.lineTo(posX, posY + tileSize);
                    }

                    // left line
                    if (!left) {
                        ctx.moveTo(posX, posY + tileSize);
                        ctx.lineTo(posX, posY);
                    }

                    ctx.stroke();
                    break;

                case 2: // Dot - small pink circle
                    ctx.fillStyle = 'pink';
                    ctx.beginPath();
                    ctx.arc(
                        posX + tileSize / 2,
                        posY + tileSize / 2,
                        tileSize * 0.1,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                    break;

                case 3: // Power-up - green circle
                    ctx.fillStyle = 'pink';
                    ctx.beginPath();
                    ctx.arc(
                        posX + tileSize / 2,
                        posY + tileSize / 2,
                        tileSize * 0.25,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                    break;

                default: // Empty
                    ctx.fillStyle = 'black';
                    ctx.fillRect(posX, posY, tileSize, tileSize);
                    break;
            }
        }
    }
}





// game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();

    requestAnimationFrame(gameLoop);
}

function gameStart() {
    gameLoop();
}