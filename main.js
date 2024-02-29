window.addEventListener('load', () => {
  const canvas = document.getElementById('display');
  const display = canvas.getContext('2d');

  let board;
  let nextBoard;
  let boardRules;
  let tmp;
  let imageData;

  function should_cell_survive(x, y, n) {
    return boardRules[y][x].survival.includes(n) || Math.random() > 0.999;
  }

  function should_cell_be_born(x, y, n) {
    return boardRules[y][x].birth.includes(n) || Math.random() > 0.999;
  }

  function draw_board(board) {
    const data = imageData.data;
    for (let y = 1; y < height + 1; ++y) {
      for (let x = 1; x < width + 1; ++x) {
        const pixelId = ((y - 1) * width * 4 + (x - 1) * 4);
        const cell = board[y][x];
        const rules = boardRules[y][x].bits;
        const rulesR = rules >> 12;
        const rulesG = rules >> 6 & 0b000000111111;
        const rulesB = rules & 0b000000000000111111;
        //111111
        //111111
        //111111
        if (cell) {
          data[pixelId] = rulesR << 2;
          data[pixelId + 1] = rulesG << 2;
          data[pixelId + 2] = rulesB << 2;
          data[pixelId + 3] = Math.random() * 100 + 155;
        } else {
          data[pixelId] = rulesR;
          data[pixelId + 1] = rulesG;
          data[pixelId + 2] = rulesB;
          data[pixelId + 3] = Math.random() * 10 + 245;
        }
      }
    }
    display.putImageData(imageData, 0, 0);
  }

  function advance_board(board, nextBoard) {
    // toroidal
    for (let y = 1; y < height + 1; ++y) {
      let row = board[y];
      row[0] = row[width];
      row[width + 1] = row[1];
    }
    board[0] = board[height];
    board[height + 1] = board[1];
    for (let y = 1; y < height + 1; ++y) {
      const row = board[y];
      const prev_row = board[y - 1];
      const next_row = board[y + 1];
      for (let x = 1; x < width + 1; ++x) {
        const cell = row[x];
        const prev_x = x - 1;
        const next_x = x + 1;
        const n = prev_row[prev_x] + prev_row[x] + prev_row[next_x]
          + row[prev_x] + row[next_x]
          + next_row[prev_x] + next_row[x] + next_row[next_x];

        if (cell) {
          nextBoard[y][x] = should_cell_survive(x, y, n);
        } else nextBoard[y][x] = should_cell_be_born(x, y, n);
      }
    }
  }
  
  function tick() {
    requestAnimationFrame(tick);
    draw_board(board);
    advance_board(board, nextBoard);
    tmp = board;
    board = nextBoard;
    nextBoard = tmp;
  }

  function initialize_board(width, height) {
    board = Array(height + 2).fill(0).map((row, y) => {
      return Array(width + 2).fill(0).map((cell, x) => {
        return Math.random() > 0.5;
      });
    });
    nextBoard = Array(height + 2).fill(0).map((row, y) => {
      return Array(width + 2).fill(false);
    });
    boardRules = Array(height + 2).fill(0).map((row, y) => {
      return Array(width + 2).fill(0).map(() => {
        return { survival: [2, 3], birth: [3, 6], bits: (Math.random() * 0b1111111_111111_111111) | 0 }
      });
    });
  }

  const width = (window.innerWidth / 8) | 0;
  const height = (window.innerHeight / 8) | 0;
  const run = () => {
    canvas.width = width;
    canvas.height = height;
    imageData = display.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 3; i < data.length; i += 4) {
      data[i] = Math.random() * 10 + 245;
    }
    initialize_board(width, height);
    requestAnimationFrame(tick);
  };

  run();
});
