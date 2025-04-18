  import Grid from './Grid.js';
  import Snake from './Snake.js';
  import Apple from './Apple.js';


  class snakeGame {
    #container; // SnakeGame
    #startGame = false; //SnakeGame
    #intervalID; //SnakeGame
    #score = 0; //SnakeGame
    #bestScore = localStorage.getItem("bestScore") || 0; //SnakeGame
  
    constructor(containerSelector, fieldSelector) {
        this.#container = document.querySelector(containerSelector);

        this.grid = new Grid(fieldSelector);
        this.snake = new Snake(this.grid);
        this.apple = new Apple(this.grid, this.snake);

        this.#initControls();  //SnakeGame
        this.#showBestScore(); //SnakeGame
    }

  
// лучший счет
    #showBestScore() {
        if (localStorage.getItem("firstGame") === "true") {
            const bestScoreEl = document.querySelector(".best-score");
            bestScoreEl.textContent = "Рекорд: " + this.#bestScore;
            bestScoreEl.style.display = "block";
        }
    }
  
  
// назначение событий на стрелочки
    #initControls() {
        document.addEventListener("keydown", (e) => {
            const keyMap = {
            ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
            w: 'up', s: 'down', a: 'left', d: 'right',
            ц: 'up', ы: 'down', ф: 'left', в: 'right',
            };
            const newDir = keyMap[e.key];
            if (!newDir) return;
    
            const opposites = {
            up: 'down', down: 'up', left: 'right', right: 'left'
            };
    
            if (!this.#startGame) {
            this.#startGame = true;
            this.#intervalID = setInterval(() => this.#moveSnake(), 500);
            }
    
            if (opposites[this.snake.direction] !== newDir) {
            this.snake.direction = newDir;
            }
        });
    
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("restart")) {
            this.restartGame();
            }
        });
    }
  
// движение змейки
    #moveSnake() {
        let [x, y] = this.snake.snakeBody[0];
    
        switch (this.snake.direction) {
            case "left": --x; break;
            case "right": ++x; break;
            case "up": --y; break;
            case "down": ++y; break;
        }
    
        const newXY = [x, y];
    
        if (
            x < 1 || y < 1 || x > this.grid.cols || y > this.grid.rows ||
            this.snake.snakeBody.some(([sx, sy]) => sx === x && sy === y)
        ) {
            this.#container.innerHTML = `<div class="game-over">Игра окончена &#9785 <br> Счет: ${this.#score} <button class="restart">Restart</button></div>`;
            localStorage.setItem("firstGame", "true");
            clearInterval(this.#intervalID);
            return;
        }
    
        this.snake.snakeBody.unshift(newXY); // новые координаты головы
    
        if (x === this.apple.appleX && y === this.apple.appleY) {
            const appleCell = this.grid.getCell(x, y);
            if (appleCell) appleCell.classList.remove("apple");
            this.apple.addApple();
            this.#score++;
            document.querySelector(".score").textContent = "Текущий счет: " + this.#score;
    
            if (this.#score > this.#bestScore) {
            this.#bestScore = this.#score;
            localStorage.setItem("bestScore", this.#bestScore);
            document.querySelector(".best-score").textContent = "Рекорд: " + this.#bestScore;
            }
        } else {
            const tail = this.snake.snakeBody.pop();
            const tailCell = this.grid.getCell(tail[0], tail[1]);
            if (tailCell) tailCell.classList.remove("snake");
        }
    
        this.snake.snakeBody.forEach(([x, y]) => {
            const cell = this.grid.getCell(x, y);
            if (cell) cell.classList.add("snake");
        });
    }
  
//перезапуск игры
    restartGame() {
        // location.reload();
        this.#score = 0;
        this.#container.innerHTML = " ";
        document.querySelector(".score").textContent = "Текущий счет: " + this.#score;
        if (localStorage.getItem("firstGame") === "true") {
            const bestScoreEl = document.querySelector(".best-score");
            bestScoreEl.textContent = "Рекорд: " + this.#bestScore;
            bestScoreEl.style.display = "block";
        }
    
        clearInterval(this.#intervalID);
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("snake", "apple");
        });
    
        this.snake.initSnake();
        this.snake.direction = 'right';
        this.#startGame = true;
        this.snake.renderSnake();
        this.apple.addApple();
        this.#intervalID = setInterval(() => this.#moveSnake(), 500);
    }
  }


//запуск
  const game = new snakeGame(".empty", ".game-field");
  