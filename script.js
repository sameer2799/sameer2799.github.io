let pomodoroInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

// Focus (Pomodoro Timer)
document.getElementById('focusBtn').addEventListener('click', function() {
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('pomodoro').classList.remove('hidden');
    resetTimer();
});

document.getElementById('startBtn').addEventListener('click', function() {
    startTimer();
});

document.getElementById('stopBtn').addEventListener('click', function() {
    stopTimer();
});

document.getElementById('resetBtn').addEventListener('click', function() {
    resetTimer();
});

document.getElementById('backFromPomodoroBtn').addEventListener('click', function() {
    document.getElementById('pomodoro').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
});

// Snake Game
document.getElementById('chillBtn').addEventListener('click', function() {
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('snakeGame').classList.remove('hidden');
    startSnakeGame();
});

document.getElementById('backFromSnakeBtn').addEventListener('click', function() {
    document.getElementById('snakeGame').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
});

// Pomodoro Timer Functions
function startTimer() {
    pomodoroInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(pomodoroInterval);
            alert('Time is up!');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(pomodoroInterval);
}

function resetTimer() {
    stopTimer();
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Snake Game Functions
let snake;
let snakeDirection;
let food;
let score;
let gameInterval;

function startSnakeGame() {
    score = 0;
    snake = [{ x: 10, y: 10 }];
    snakeDirection = { x: 1, y: 0 };
    food = generateFood();
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        return;
    }
    draw();
}

function moveSnake() {
    const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
        document.getElementById('score').innerText = 'Score: ' + score;
    } else {
        snake.pop();
    }
}

function generateFood() {
    return { x: Math.floor(Math.random() * 40), y: Math.floor(Math.random() * 40) };
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 40 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        return true;
    }
    return false;
}

function draw() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.beginPath();
        ctx.arc(segment.x * 10 + 5, segment.y * 10 + 5, 5, 0, Math.PI * 2); // Draw circle for each segment
        ctx.fill();
    });
    
    // Draw the food
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x * 10 + 5, food.y * 10 + 5, 5, 0, Math.PI * 2); // Draw circle for food
    ctx.fill();
}


// Control snake direction with arrow keys
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
            break;
    }
});
