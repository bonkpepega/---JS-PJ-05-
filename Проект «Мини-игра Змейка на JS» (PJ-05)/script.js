class snakeGame {
    #container;
    #field;
    #rows = 10;
    #cols = 10;
    #snakeBody;
    #direction = 'right';
    #startGame = false;
    #intervalID;
    #appleX;
    #appleY;
    #score = 0;
    #bestScore = localStorage.getItem("bestScore") || 0;
  
    constructor(containerSelector, fieldSelector) {
        this.#container = document.querySelector(containerSelector);
        this.#field = document.querySelector(fieldSelector);
    
        this.#createGrid();  
        this.#initSnake(); 
        this.#addApple(); 
        this.#renderSnake();  
        this.#initControls();  
        this.#showBestScore(); 
    }
  
//добавление клеток на поле grid
    #createGrid() {
        for (let row = 1; row <= this.#rows; row++) {
            for (let col = 1; col <= this.#cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = col;
            cell.dataset.y = row;
            this.#field.appendChild(cell);
            }
        }
        this.#field.style.gridTemplateColumns = `repeat(${this.#cols}, 70px)`;
        this.#field.style.gridTemplateRows = `repeat(${this.#rows}, 70px)`;
    }
  
// массив змейки
    #initSnake() {
        this.#snakeBody = [
            [6, 5],
            [5, 5],
        ];
    }
  
    #renderSnake() {
        this.#snakeBody.forEach(([x, y]) => {
            const cell = this.#getCell(x, y);
            if (cell) cell.classList.add("snake");
        });
    }
  
// стартовое положение змейки 
    #getCell(x, y) {
        return document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    }
  
// лучший счет
    #showBestScore() {
        if (localStorage.getItem("firstGame") === "true") {
            const bestScoreEl = document.querySelector(".best-score");
            bestScoreEl.textContent = "Рекорд: " + this.#bestScore;
            bestScoreEl.style.display = "block";
        }
    }
  
// яблко
    #addApple() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.#cols) + 1;
            y = Math.floor(Math.random() * this.#rows) + 1;
        } while (this.#snakeBody.some(([sx, sy]) => sx === x && sy === y));
    
        this.#appleX = x;
        this.#appleY = y;
    
        const appleCell = this.#getCell(x, y);
        if (appleCell) appleCell.classList.add("apple");
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
    
            if (opposites[this.#direction] !== newDir) {
            this.#direction = newDir;
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
        let [x, y] = this.#snakeBody[0];
    
        switch (this.#direction) {
            case "left": --x; break;
            case "right": ++x; break;
            case "up": --y; break;
            case "down": ++y; break;
        }
    
        const newXY = [x, y];
    
        if (
            x < 1 || y < 1 || x > this.#cols || y > this.#rows ||
            this.#snakeBody.some(([sx, sy]) => sx === x && sy === y)
        ) {
            this.#container.innerHTML = `<div class="game-over">Игра окончена &#9785 <br> Счет: ${this.#score} <button class="restart">Restart</button></div>`;
            localStorage.setItem("firstGame", "true");
            clearInterval(this.#intervalID);
            return;
        }
    
        this.#snakeBody.unshift(newXY); // новые координаты головы
    
        if (x === this.#appleX && y === this.#appleY) {
            const appleCell = this.#getCell(x, y);
            if (appleCell) appleCell.classList.remove("apple");
            this.#addApple();
            this.#score++;
            document.querySelector(".score").textContent = "Текущий счет: " + this.#score;
    
            if (this.#score > this.#bestScore) {
            this.#bestScore = this.#score;
            localStorage.setItem("bestScore", this.#bestScore);
            document.querySelector(".best-score").textContent = "Рекорд: " + this.#bestScore;
            }
        } else {
            const tail = this.#snakeBody.pop();
            const tailCell = this.#getCell(tail[0], tail[1]);
            if (tailCell) tailCell.classList.remove("snake");
        }
    
        this.#snakeBody.forEach(([x, y]) => {
            const cell = this.#getCell(x, y);
            if (cell) cell.classList.add("snake");
        });
    }
  
//перезапуск игры
    restartGame() {
        this.#score = 0;
        this.#container.innerHTML = "";
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
    
        this.#initSnake();
        this.#direction = 'right';
        this.#startGame = true;
        this.#renderSnake();
        this.#addApple();
        this.#intervalID = setInterval(() => this.#moveSnake(), 500);
    }
  }
//запуск
  const game = new snakeGame(".empty", ".game-field");
  