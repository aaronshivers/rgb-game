let numSquares = 6
let colors = []
let pickedColor

const h1 = document.querySelector('h1')
const resetButton = document.querySelector('#reset')
const modeButtons = document.querySelectorAll('.mode')
const squares = document.querySelectorAll('.square')
const colorDisplay = document.querySelector('#colorDisplay')
const messageDisplay = document.querySelector('#message')

const randomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${ r }, ${ g }, ${ b })`
}

const generateRandomColors = num => {
  // make array
  const arr = []

  // add num random colors to array
  for (let i = 0; i < num; i++) {
    // get random color and push into array
    arr.push(randomColor())
  }
  // return the array
  return arr
}

colors = generateRandomColors(numSquares)

const pickColor = () => {
  const random = Math.floor(Math.random() * colors.length)
  return colors[random]
}

pickedColor = pickColor()

const resetSquares = () => {
  // change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block'
      squares[i].style.backgroundColor = colors[i]
    } else {
      squares[i].style.display = "none"
    }
  }
}

const reset = () => {
  // generate new colors
  colors = generateRandomColors(numSquares)
  //pick random color from array
  pickedColor = pickColor()
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor

  messageDisplay.textContent = ''
  resetButton.textContent = 'New Colors'

  resetSquares()

  h1.style.backgroundColor = 'steelblue'
}

const setupModeButtons = () => {
  // mode buttons event listeners
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', event => {
      modeButtons[0].classList.remove('selected')
      modeButtons[1].classList.remove('selected')
      event.target.classList.add('selected')

      event.target.textContent.toLowerCase() === 'easy' ? numSquares = 3 : numSquares = 6
      
      reset()
    })
  }
}

const compareColors = square => {
  // compare square color to pickedColor
  if (square.style.backgroundColor === pickedColor) {
    messageDisplay.textContent = 'Correct'
    resetButton.textContent = 'Play Again?'
    changeColors(square.style.backgroundColor)
    h1.style.backgroundColor = square.style.backgroundColor
  } else {
    square.style.backgroundColor = '#232323'
    messageDisplay.textContent = 'Try Again'
  }
}

const setupSquares = () => {
  for (let i = 0; i < squares.length; i++) {
    // add event listeners to squares
    squares[i].addEventListener('click', event => {      
      compareColors(event.target)
    })
  }
}

const init = () => {

  setupModeButtons()

  setupSquares()

  reset()
}

init()

const changeColors = color => {
  // loop through all squares
  for (let i = 0; i < squares.length; i++) {
    // change each color to match given color
    squares[i].style.backgroundColor = color
  }
}

resetButton.addEventListener('click', event => {
  reset()
})
