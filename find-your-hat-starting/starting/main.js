const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
    constructor(field) {
        this._field = field;
    }

    print(playerRow, playerCol) {
        for(let i=0; i<this._field.length; i++){
            let row = ''
            for(let j=0; j<this._field[0].length; j++){
                if(playerRow === i && playerCol === j) this._field[i][j] = '*'
                row = row + this._field[i][j]
            }
            console.log(row)
        }
    }

    playGame() {
        
        const {x, y} = this.checkCurrent()
        let playerRow = x;
        let playerCol = y;
        // this.print(playerRow, playerCol);
            
        let hatRow, hatCol;
        for (let i = 0; i < this._field.length; i++) {
            for (let j = 0; j < this._field[i].length; j++) {
                if (this._field[i][j] === "^") {
                    hatRow = i;
                    hatCol = j;
                    break;
                }
            }
        }

        while (true) {
            this.print(playerRow, playerCol);
            const move = prompt("Enter your next move (u/d/r/l): ");

            switch (move) {
                case "u":
                    playerRow--;
                    break;
                case "d":
                    playerRow++;
                    break;
                case "l":
                    playerCol--;
                    break;
                case "r":
                    playerCol++;
                    break;
                default:
                    console.log("Invalid move. Please enter u, d, r, or l.");
                    continue;
            }

            if (
                playerRow < 0 ||
                playerRow >= this._field.length ||
                playerCol < 0 ||
                playerCol >= this._field[0].length
            ) {
                console.log("You moved outside the field. You lose!");
                break;
            }

            if (playerRow === hatRow && playerCol === hatCol) {
                console.log("Congratulations! You found your hat. You win!");
                break;
            }

            if (this._field[playerRow][playerCol] === "O") {
                console.log("Oops! You fell into a hole. You lose!");
                break;
            }
        }
    }

    checkCurrent() {
        const num_rows = this._field.length;
        const num_cols = this._field[0].length;

        let playerPosition = { x: "", y: "" };
        let hatPosition = { x: "", y: "" };

        for (let i = 0; i < num_cols; i++) {
            for (let j = 0; j < num_rows; j++) {
                if (this._field[i][j] === "*") {
                    playerPosition.x = i;
                    playerPosition.y = j;
                }
                if (this._field[i][j] === "^") {
                    hatPosition.x = i;
                    hatPosition.y = j;
                }
            }
        }

        return playerPosition
    }

    static generateField(height, width, percent) {
        if (height < 3 || width < 3) {
            console.log("Height and width must be at least 3.");
            return;
        }

        if (percent < 0 || percent > 100) {
            console.log("Percent must be between 0 and 100.");
            return;
        }

        // Initialize the field with ░
        const field = new Array(height);
        for (let i = 0; i < height; i++) {
            field[i] = new Array(width).fill("░");
        }

        // Place * and ^ in random positions
        const starRow = Math.floor(Math.random() * height);
        const starCol = Math.floor(Math.random() * width);
        field[starRow][starCol] = "*";

        let hatRow, hatCol;
        do {
            hatRow = Math.floor(Math.random() * height);
            hatCol = Math.floor(Math.random() * width);
        } while (hatRow === starRow && hatCol === starCol);
        field[hatRow][hatCol] = "^";

        // Calculate the number of 'O' cells based on the given percent
        const numOCells = Math.floor((percent / 100) * (height * width - 2));

        // Place 'O' cells in random positions
        for (let i = 0; i < numOCells; i++) {
            let oRow, oCol;
            do {
                oRow = Math.floor(Math.random() * height);
                oCol = Math.floor(Math.random() * width);
            } while (
                (oRow === starRow && oCol === starCol) ||
                (oRow === hatRow && oCol === hatCol) ||
                field[oRow][oCol] === "O"
            );
            field[oRow][oCol] = "O";
        }

        return field;
    }
}

const sampleField = Field.generateField(5, 5, 10);

const myField = new Field(sampleField);
myField.playGame();
