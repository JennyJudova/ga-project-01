document.addEventListener('DOMContentLoaded', () => {
  const width = 10
  const hight = 20
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 0

  //CREATES GRID ***** DO NOT TOUCH *****
  for (let i = 0; i < width * hight; i++) {
    const cell = document.createElement('DIV')
    cell.addEventListener('click', handleClick)
    grid.appendChild(cell)
    cells.push(cell)
  }

  //ADDS PLAYER 
  function handleClick(e) {
    e.target.classList.add('player')
  }

  cells[playerIdx].classList.add('player')

  document.addEventListener('keyup', (e) => {
    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

    switch (e.keyCode) {
      case 37: if (x > 0) playerIdx -= 1 //LEFT
        break
      case 38: if (y > 0) playerIdx -= width //UP
        break
      case 39: if (x < width - 1) playerIdx += 1 //RIGHT
        break
      case 40: if (y < hight - 1) playerIdx += width //DOWN
        break
    }
    cells[playerIdx].classList.add('player')
  })
})


// document.addEventListener('DOMContentLoaded', () => {
//   const width = 10
//   const grid = document.querySelector('.grid')
//   const cells = []
//   let playerIdx = 0

//   function handleClick(e) {
//     e.target.classList.add('player')
//   }

//   for (let i = 0; i < width ** 2; i++) {
//     const cell = document.createElement('DIV')

//     cell.addEventListener('click', handleClick)

//     grid.appendChild(cell)
//     cells.push(cell)
//   }

//   cells[playerIdx].classList.add('player')

//   document.addEventListener('keyup', (e) => {

//     cells[playerIdx].classList.remove('player')
//     const x = playerIdx % width
//     const y = Math.floor(playerIdx / width)

//     switch (e.keyCode) {
//       case 37: if (x > 0) playerIdx -= 1
//         break
//       case 38: if (y > 0) playerIdx -= width
//         break
//       case 39: if (x < width - 1) playerIdx += 1
//         break
//       case 40: if (y < width - 1) playerIdx += width
//         break
//     }

//     cells[playerIdx].classList.add('player')
//   })
// })
