class Grid {
    #field; // Grid
    #rows = 10; // Grid
    #cols = 10; // Grid

    constructor( fieldSelector) {
        this.#field = document.querySelector(fieldSelector);
        this.#createGrid();  // Grid
    }
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
// стартовое положение змейки 
    getCell(x, y) {
        return document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    }

    get cols() {
        return this.#cols;
    }

    get rows() {
        return this.#rows;
    }



}

export default Grid;