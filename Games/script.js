const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1 = { x: 50, y: 180, width: 20, height: 20, color: 'blue', dx: 0, dy: 0 };
const player2 = { x: 730, y: 180, width: 20, height: 20, color: 'red', dx: 0, dy: 0 };
const ball = { x: 400, y: 200, radius: 10, color: 'white', dx: 2, dy: 2 };

const keys = {};

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function update() {
    movePlayers();
    moveBall();
    detectCollisions();
    draw();
    requestAnimationFrame(update);
}

function movePlayers() {
    if (keys['a']) player1.dx = -2;
    else if (keys['d']) player1.dx = 2;
    else player1.dx = 0;
    
    if (keys['w']) player1.dy = -2;
    else if (keys['s']) player1.dy = 2;
    else player1.dy = 0;
    
    if (keys['ArrowLeft']) player2.dx = -2;
    else if (keys['ArrowRight']) player2.dx = 2;
    else player2.dx = 0;
    
    if (keys['ArrowUp']) player2.dy = -2;
    else if (keys['ArrowDown']) player2.dy = 2;
    else player2.dy = 0;

    player1.x += player1.dx;
    player1.y += player1.dy;
    player2.x += player2.dx;
    player2.y += player2.dy;

    // Prevent players from going out of bounds
    player1.x = Math.max(0, Math.min(canvas.width - player1.width, player1.x));
    player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));
    player2.x = Math.max(0, Math.min(canvas.width - player2.width, player2.x));
    player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }
}

function detectCollisions() {
    if (collide(player1, ball)) {
        ball.dx *= -1;
        ball.dy *= -1;
    }
    if (collide(player2, ball)) {
        ball.dx *= -1;
        ball.dy *= -1;
    }
}

function collide(player, ball) {
    const distX = Math.abs(ball.x - player.x - player.width / 2);
    const distY = Math.abs(ball.y - player.y - player.height / 2);

    if (distX > (player.width / 2 + ball.radius) || distY > (player.height / 2 + ball.radius)) {
        return false;
    }
    if (distX <= (player.width / 2) || distY <= (player.height / 2)) {
        return true;
    }

    const dx = distX - player.width / 2;
    const dy = distY - player.height / 2;
    return (dx * dx + dy * dy <= (ball.radius * ball.radius));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(player1);
    drawPlayer(player2);
    drawBall();
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

update();
