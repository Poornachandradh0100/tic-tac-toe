document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const status = document.querySelector('.status');
  const restartBtn = document.querySelector('.restart-btn');
  const overlay = document.querySelector('.overlay');
  const overlayMessage = document.querySelector('.overlay-message');
  const newGameBtn = document.querySelector('.new-game-btn');
  let currentPlayer = 'X';
  let gameActive = true;
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    if (cell.textContent !== '' || !gameActive) return;
    
    cell.textContent = currentPlayer;
    
    if (checkWin()) {
      endGame(`Player ${currentPlayer} has won!`);
      return;
    }
    
    if (checkDraw()) {
      endGame('Game ended in a draw!');
      return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = currentPlayerTurn();
  }
  
  function checkWin() {
    return winningConditions.some(condition => {
      return condition.every(index => {
        return cells[index].textContent === currentPlayer;
      });
    });
  }
  
  function checkDraw() {
    return [...cells].every(cell => {
      return cell.textContent !== '';
    });
  }
  
  function restartGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    status.textContent = currentPlayerTurn();
    currentPlayer = 'X';
    gameActive = true;
    overlay.classList.add('hidden');
  }
  
  function endGame(message) {
    overlayMessage.textContent = message;
    overlay.classList.remove('hidden');
    gameActive = false;
  }
  
  function currentPlayerTurn() {
    return `Player ${currentPlayer}'s turn`;
  }
  
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  
  restartBtn.addEventListener('click', restartGame);
  
  newGameBtn.addEventListener('click', () => {
    restartGame();
    overlay.classList.add('hidden');
  });
  
  status.textContent = currentPlayerTurn();
});