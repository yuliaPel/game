export class Game {
  suits = ["diamonds", "hearts", "spades", "clubs"];
  field = [];

  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
  }

  generateRandomIndex() {
    return Math.floor(Math.random() * this.suits.length);
  }

  createPlayingField() {
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        const cell = {
          suit: this.suits[this.generateRandomIndex()],
          visited: false,
        };
        row.push(cell);
      }
      this.field.push(row);
    }
  }

  removeCells(x, y) {
    const group = [];
    const foundSuit = this.field[y][x].suit;

    const checkNearbyCells = (x, y) => {
      if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
        return;
      }

      const currentCell = this.field[y][x];

      if (!currentCell.visited) {
        if (currentCell.suit === foundSuit) {
          group.push({ x, y });
          currentCell.visited = true;
          currentCell.suit = null;

          checkNearbyCells(x - 1, y);
          checkNearbyCells(x + 1, y);
          checkNearbyCells(x, y - 1);
          checkNearbyCells(x, y + 1);
        }
      }
    };

    checkNearbyCells(x, y);
    return { group, foundSuit };
  }

  generateNewElements(cells) {
    cells.forEach(cell => {
      const { x, y } = cell;
      const newSuitIndex = this.generateRandomIndex();
      this.field[y][x].suit = this.suits[newSuitIndex];
      this.field[y][x].visited = false;
    });
  }
}
