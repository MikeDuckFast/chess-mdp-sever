const stockfish = new Worker("stockfish.js");

function makeAIMove() {
  stockfish.postMessage(`position fen ${game.fen()}`);
  stockfish.postMessage("go depth 15");
  
  stockfish.onmessage = function (e) {
    if (e.data.startsWith("bestmove")) {
      const move = e.data.split(" ")[1];
      game.move(move, { sloppy: true });
      updateBoard();
    }
  };
}
