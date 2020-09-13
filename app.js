//Array holding all possible "winning" combinations in the 3x3 grid
const win_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
//Other variables
const x_class = 'x'
const circle_class = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

//Call startGame function to begin game
startGame()

//Listener for when user clicks restart button at end of game to reset the board
restartButton.addEventListener('click', startGame)

//Start game clears board before starting to make sure game board is always reset
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(x_class)
    cell.classList.remove(circle_class)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

//Function to handle the clicks on the board from users, swap users after a selection is made
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? circle_class : x_class
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

//Function handling the end of the game
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "Player O" : "Player X"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

//Function checking if cell has been marked or is empty
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
  })
}

//Function marking a cell clicked on by a player
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//After a player makes a selection, this function switches to other player
function swapTurns() {
  circleTurn = !circleTurn
}

//Function handling when player hovers over an empty cell
function setBoardHoverClass() {
  board.classList.remove(x_class)
  board.classList.remove(circle_class)
  if (circleTurn) {
    board.classList.add(circle_class)
  } else {
    board.classList.add(x_class)
  }
}

//Function to check if a winning combination has occured to end the game
function checkWin(currentClass) {
  return win_combos.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}