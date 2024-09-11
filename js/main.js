import { Game } from "./game.js";

const creatGame = () => {
  const game = new Game(8, 5);
  game.createPlayingField();
  console.log(game.field);

  const field = document.querySelector(".field");

  game.field.forEach((row, y) =>
    row.forEach((element, x) => {
      const cell = document.createElement("div");
      cell.classList.add("cell", element.suit);
      cell.style.setProperty("grid-column", x + 1);
      cell.style.setProperty("grid-row", y + 1);
      cell.setAttribute("data-x", x);
      cell.setAttribute("data-y", y);
      field.append(cell);
    })
  );

  return game;
};

const game = creatGame();

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const computedStyle = window.getComputedStyle(e.target);
    const x = computedStyle.getPropertyValue("grid-column") - 1;
    const y = computedStyle.getPropertyValue("grid-row") - 1;
    const { group: cellsToRemove, foundSuit: classToRemove } = game.removeCells(
      x,
      y
    );
    game.generateNewElements(cellsToRemove);

    cellsToRemove.forEach(({ x, y }) => {
      const cell = document.querySelector(
        `.cell[data-x="${x}"][data-y="${y}"]`
      );
      if (cell) {
        cell.classList.add("null");
        setTimeout(() => {
          cell.classList.remove(classToRemove, "null");
          cell.classList.add(game.field[y][x].suit);
        }, 1000);
      }
    });
  });
});

console.log(game.field);
