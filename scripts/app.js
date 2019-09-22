document.addEventListener('DOMContentLoaded', () => {
  //GRID variables
  const width = 10
  const hight = 20
  const grid = document.querySelector('.grid')
  const cells = []

  //SHAPE VARIABLES
  let currentShape = new Array 
  let allShapes = new Array
  let zShape = new Array
  let sShape = new Array
  let lShape = new Array
  let l2Shape = new Array

  //OTHER VARS
  const usedDivs = new Array
  let upCount = 0


  //CREATES GRID ***** DO NOT TOUCH *****
  for (let i = 0; i < width * hight; i++) {
    const cell = document.createElement('DIV')
    //cell.addEventListener('click', handleClick)
    grid.appendChild(cell)
    cells.push(cell)
  }
  //CREATES GRID ***** DO NOT TOUCH *****


  //*******************************FUNCTIONS */
  //CREATES AN ARRAY OF ALL SHAPES
  function shapeArr() {
    console.log('its here')
    allShapes = []
    zShape = [3,4,14,15]
    sShape = [13,4,14,5]
    lShape = [4,14,24,25]
    l2Shape = [4,14,23,24]
    allShapes.push(zShape)
    allShapes.push(sShape)
    allShapes.push(lShape)
    allShapes.push(l2Shape)
    drawShape(allShapes)
  }
  shapeArr()


  //DRAWS EVERY NEW SHAPE  
  function drawShape(allShapes) {
    currentShape = allShapes[Math.floor(Math.random() * 4 )]
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }


  //ALL SHAPES
  //ALL zSHAPE POSITIONS // position ===1 [dbca] ===0 [abcd]
  function zShapeUp(upCount) {
    const playerId = currentShape[1]
    currentShape.forEach(element => {
      cells[element].classList.remove('player')
    })
    if (upCount % 2 === 1) {
      currentShape[0] = playerId - width + 1
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width
    } else { // default position 
      currentShape[0] = playerId - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = currentShape[2] + 1
    }
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }

  //ALL sSHAPE POSITIONS //
  function sShapeUp(upCount) {
    const playerId = currentShape[1]
    currentShape.forEach(element => {
      cells[element].classList.remove('player')
    })
    if (upCount % 2 === 1) {
      currentShape[0] = playerId - width
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width + 1
    } else { // default position 
      currentShape[0] = playerId + width - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = playerId + 1
    }
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }

  //ALL lShapeUp POSITIONS //
  function lShapeUp(upCount) {
    const playerId = currentShape[1]
    currentShape.forEach(element => {
      cells[element].classList.remove('player')
    })
    if (upCount % 4 === 1) {
      currentShape[0] = playerId - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width - 1
    } else if (upCount % 4 === 2) {   
      currentShape[0] = playerId - width - 1
      currentShape[1] = playerId - width
      currentShape[2] = playerId 
      currentShape[3] = playerId + width
    } else if (upCount % 4 === 3) {
      currentShape[0] = playerId + width - 1
      currentShape[1] = playerId + width
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width + 1
    } else if (upCount % 4 === 0) { // default position 
      currentShape[0] = playerId - width
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + 1
    }
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }

  //ALL l2Shape POSITIONS // ******** CHANGE 
  function lShapeUp2(upCount) {
    const playerId = currentShape[1]
    currentShape.forEach(element => {
      cells[element].classList.remove('player')
    })
    if (upCount % 4 === 1) {
      currentShape[0] = playerId - width - 1 
      currentShape[1] = playerId - 1
      currentShape[2] = playerId
      currentShape[3] = playerId + 1
    } else if (upCount % 4 === 2) {   
      currentShape[0] = playerId - width + 1
      currentShape[1] = playerId - width + 2
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width + 1
    } else if (upCount % 4 === 3) {
      currentShape[0] = playerId + width - 2
      currentShape[1] = playerId + width - 1
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + width 
    } else if (upCount % 4 === 0) { // default position 
      currentShape[0] = playerId - width
      currentShape[1] = playerId
      currentShape[2] = playerId + width - 1
      currentShape[3] = playerId + width
    }
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }


  function checkShape(currentShape) {
    let isUsed = true
    if (usedDivs.includes(currentShape[0] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[1] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[2] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[3] + width)) return isDivUsed(currentShape, isUsed)
  }
  
  function isDivUsed(currentShape, isUsed) {
    console.log('isDivUsed')
    if (isUsed === true) {
      currentShape.forEach(element => {
        cells[element].classList.add('used')
        cells[element].classList.remove('player')
        usedDivs.push(element)
      })
    }
    return shapeArr()
  }



  //*************************************************EVENT LISTENERS
  //MOVESHAPE LEFT // RIGHT // DOWN 
  document.addEventListener('keyup', (e) => {
    
    let tempArr = new Array

    switch (e.keyCode) {
      case 37: //LEFT
        tempArr = currentShape.filter(element => element % width > 0)
        if (tempArr.length === 4) {
          for (let i = 0; i < currentShape.length; i++) {
            cells[currentShape[i]].classList.remove('player')
            currentShape[i] -= 1
            cells[currentShape[i]].classList.add('player')
          }
        }
        break

      case 38: //UP changes position
        upCount ++
        if (currentShape === zShape) return zShapeUp(upCount)
        if (currentShape === sShape) return sShapeUp(upCount)
        if (currentShape === lShape) return lShapeUp(upCount)
        if (currentShape === l2Shape) return lShapeUp2(upCount)
        break

      case 39: //RIGHT case 39: if (x < width - 1) playerIdx += 1 //RIGHT
        tempArr = currentShape.filter(element => element % width < width - 1)
        if (tempArr.length === 4) {
          for (let i = currentShape.length - 1; i >= 0; i--) {
            cells[currentShape[i]].classList.remove('player')
            currentShape[i] += 1
            cells[currentShape[i]].classList.add('player')
          }
        }
        break

      case 40: //DOWN 
        //CHECKS IF SHAPE IS IN USED DIVS ARRAY
        checkShape(currentShape)

        //Checks if shape hit the bottom 
        if ((Math.max(...currentShape) + width) < 200) {
          for (let i = currentShape.length - 1; i >= 0; i--) {
            cells[currentShape[i]].classList.remove('player')
            currentShape[i] += width
            cells[currentShape[i]].classList.add('player')
            console.log(currentShape)
          }
        } else { //DROPS shape to a used array 
          currentShape.forEach(element => {
            cells[element].classList.add('used')
            cells[element].classList.remove('player')
            usedDivs.push(element)
            console.log(usedDivs)
          })
          return shapeArr() // creates figure array and draws new shape
        }
        break
    }
  })


})


//First USED DIV   === went on  a wierd loop sometimes
// currentShape.forEach(element => {
//   console.log(element)
//   if (usedDivs.includes(element + width)) return isDivUsed(currentShape, isUsed)
// })

//MOVING UP 
// for (let i = 0; i < currentShape.length; i++) {
//     cells[currentShape[i]].classList.remove('player')
//     currentShape[i] -= width
//     cells[currentShape[i]].classList.add('player')
//     console.log(currentShape[i])
//     console.log(currentShape)
//   }

// //CHEAKS IF SHAPE IS IN USED DIVS ARRAY 
// isUsed = false
// currentShape.forEach(element => {
//   console.log(element)
//   if (usedDivs.includes(element + width)) isUsed = true
// })

// if (isUsed === true) {
//   currentShape.forEach(element => {
//     cells[element].classList.add('used')
//     cells[element].classList.remove('player')
//     usedDivs.push(element)

//     console.log(isUsed)
//     console.log(usedDivs)
//     isUsed = false
//     return shapeArr() // creates figure array and draws new shape
//   })
// }

// usedDivs.some((index) => {
//   zShape.forEach(element => {
//     cells[element].classList.add('used')
//     cells[element].classList.remove('player')
//     usedDivs.push(element)
//     console.log(usedDivs)
//     return drawShape() // draws new shape
//   })
// })

// for (let i = 0; i < zShape.length; i++) {

// }
// function containsFalsey(array) {
//   console.log(array)
//   const falsy = [undefined, null, NaN, 0, '', 'false']
//   const falsyCheck = array.some((string) => {
//     return falsy.includes(string)
//   })
//   console.log(falsyCheck)
//   return falsyCheck
// }

        

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