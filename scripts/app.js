document.addEventListener('DOMContentLoaded', () => {
  //GRID variables
  const width = 10
  const hight = 20
  const grid = document.querySelector('.grid')
  const cells = []

  //SHAPE VARIABLES
  let zShape = [3,4,14,15]
  let playerIdx = 0

  //OTHER VARS
  let usedDivs = new Array


  //const tempArr = new Array

  // const zShape = {
  //   position1: [3, 4, 14, 15]
  //   position2: [] 
  // }

  //SHAPES
  // zShape
  // zShape[0] = playerIdx - 1
  // zShape[1] = playerIdx
  // zShape[2] = playerIdx - width
  // zShape[3] = playerIdx - width - 1


  //CREATES GRID ***** DO NOT TOUCH *****
  for (let i = 0; i < width * hight; i++) {
    const cell = document.createElement('DIV')
    //cell.addEventListener('click', handleClick)
    grid.appendChild(cell)
    cells.push(cell)
  }
  //CREATES GRID ***** DO NOT TOUCH *****

  //Draws Z Shape
  function drawShape() {
    zShape = [3,4,14,15]
    playerIdx = width / 2
    zShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }
  drawShape()



  //EVENT LISTENERS
  //MOVESHAPE LEFT // RIGHT // DOWN
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37: //LEFT
        if ((Math.min(...zShape) % width) > 0) {
          for (let i = 0; i < zShape.length; i++) {
            cells[zShape[i]].classList.remove('player')
            zShape[i] -= 1
            cells[zShape[i]].classList.add('player')
            console.log(zShape[i])
            console.log(zShape)
          }
        }
        break
      case 38: //UP **** Take Away later cant move up 
        for (let i = 0; i < zShape.length; i++) {
          cells[zShape[i]].classList.remove('player')
          zShape[i] -= width
          cells[zShape[i]].classList.add('player')
          console.log(zShape[i])
          console.log(zShape)
        }
        break
      case 39: //RIGHT
        if ((Math.max(...zShape) % width) < width - 1) {
          for (let i = zShape.length - 1; i >= 0; i--) {
            cells[zShape[i]].classList.remove('player')
            zShape[i] += 1
            cells[zShape[i]].classList.add('player')
            console.log(zShape)
          }
        }
        break
      case 40: //DOWN

        // for (let i = 0; i < zShape.length; i++) {

        // }

        // if (zShape.forEach(element => {
        //   usedDivs.includes(element + width) === true
        // })) {
        //   zShape.forEach(element => {
        //     cells[element].classList.add('used')
        //     cells[element].classList.remove('player')
        //     usedDivs.push(element)
        //     console.log(usedDivs)
        //     return drawShape() // draws new shape
        //   })
        // }

        if ((Math.max(...zShape) + width) < 200) {
          for (let i = zShape.length - 1; i >= 0; i--) {
            cells[zShape[i]].classList.remove('player')
            zShape[i] += width
            cells[zShape[i]].classList.add('player')
            console.log(zShape)
          }
        } else { //DROPS shape to a used array 
          zShape.forEach(element => {
            cells[element].classList.add('used')
            cells[element].classList.remove('player')
            usedDivs.push(element)
            console.log(usedDivs)
          })
          return drawShape() // draws new shape
        }
        break
    }
  })


})

// if (zShape.forEach(element => {
//   usedDivs.includes(element + width)
// })) {
//   zShape.forEach(element => {
//     cells[element].classList.add('used')
//     cells[element].classList.remove('player')
//     usedDivs.push(element)
//     console.log(usedDivs)
//   })
// }

// zShape.forEach(element => {
//   usedDivs.includes(element)
//   cells[element].classList.add('used')
//   cells[element].classList.remove('player')
//   usedDivs.push(element)
//   console.log(usedDivs)
// })


// zShape.forEach(element => {
//   cells[element].classList.add('player')
// })




//CHANGE SHAPE

// const zShape = {
//   position1: [3, 4, 14, 15]
//   position2: [] 
// }






//if ((zShape.reduce((a, b) => a + b)) + width > 790) 

//DISCARDED CODE

// if (zShape.forEach(element => {
//   zShape[element] + width > 200
// })) 

// if (e.keyCode === 37) {
//   console.log(typeof zShape.index)

//   for (let i = 0; i < zShape.length; i++) {
//     cells[zShape[i]].classList.remove('player')
//     zShape[i] -= 1
//     cells[zShape[i]].classList.add('player')
//     console.log(zShape[i])
//     console.log(zShape)
//   }
// }




//   zShape.index.forEach(element => {
//     cells[element].classList.remove('player')
//     console.log(zShape.index[element])
//     zShape.index[element] -= 1
//     console.log(zShape.index[element])
//     console.log(zShape.index)
//     cells[element].classList.add('player')
//   }) 
// } else console.log(e.keyCode)
// console.log(typeof e.keyCode)

//cells[playerIdx].classList.remove('player')
//const x = playerIdx % width
//const y = Math.floor(playerIdx / width)

//const zShape = [(playerIdx - width - 1), playerIdx - width, playerIdx, playerIdx + 1]

  
// //ADDS PLAYER ON CLICK
// function handleClick(e) {
//   e.target.classList.add('player')
// }



// document.addEventListener('keyup', (e) => {
//   cells[playerIdx].classList.remove('player')

//   const x = playerIdx % width
//   const y = Math.floor(playerIdx / width)

//   switch (e.keyCode) {
//     case 37: if (x > 0) playerIdx -= 1 //LEFT
//       break
//     case 38: if (y > 0) playerIdx -= width //UP
//       break
//     case 39: if (x < width - 1) playerIdx += 1 //RIGHT
//       break
//     case 40: if (y < hight - 1) playerIdx += width //DOWN
//       break
//   }
//   cells[playerIdx].classList.add('player')
// })


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