document.addEventListener('DOMContentLoaded', () => {
  //GRID variables
  const width = 10
  const hight = 22
  const grid = document.querySelector('.grid')
  const cells = []

  //SHAPE VARIABLES
  let currentShape = new Array 
  let allShapes = new Array
  let zShape = new Array
  let sShape = new Array
  let lShape = new Array
  let l2Shape = new Array
  let tShape = new Array
  let sqShape = new Array
  let iShape = new Array

  //OTHER VARS
  let usedDivs = new Array
  let upCount = 0

  //************************************************ GAME *******************************************/ 
  //CREATES GRID ***** DO NOT TOUCH *****
  for (let i = 0; i < width * hight; i++) {
    const cell = document.createElement('DIV')
    grid.appendChild(cell)
    cells.push(cell)
  }
  //CREATES GRID ***** DO NOT TOUCH *****

  //Starts Game 
  shapeArr()

  // //DROPS CURRENT SHAPE 
  // let shapeDrop = setInterval(function() { 
  //   checkShape(currentShape)
  //   checkBtmCollision(currentShape)
  // }, 
  // 500) // CHANGE SPEED 


  //********************************************** FUNCTIONS ***************************************/
  //CREATES AN ARRAY OF ALL SHAPES
  function shapeArr() {
    allShapes = []
    zShape = [3,4,14,15]
    sShape = [13,4,14,5]
    lShape = [4,14,24,25]
    l2Shape = [4,14,23,24]
    tShape = [13,4,14,15]
    sqShape = [4,5,14,15]
    iShape = [3,4,5,6]
    allShapes.push(zShape)
    allShapes.push(sShape)
    allShapes.push(lShape)
    allShapes.push(l2Shape)
    allShapes.push(tShape)
    allShapes.push(sqShape)
    allShapes.push(iShape)
    drawShape(allShapes)
  }

  //DRAWS EVERY NEW CURRENT SHAPE  
  function drawShape(allShapes) {
    console.log('New Shape Here')
    console.log(usedDivs)
    currentShape = allShapes[Math.floor(Math.random() * 7 )]
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }


  //ALL SHAPES & POSITIONS

  //Get Player ID
  function getPlayerId() {
    let playerId = new Number
    if (currentShape[1] % width === width - 1) {
      return playerId = currentShape[1] - 1 //RIGHT wall check
    } else if (currentShape[1] % width === 0) {
      return playerId = currentShape[1] + 1 // LEFT Wall check
    } else return playerId = currentShape[1]
  }

  //ALL zSHAPE POSITIONS //
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
      currentShape[3] = playerId + width + 1
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
    const playerId = getPlayerId()
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

  //ALL l2Shape POSITIONS //
  function lShapeUp2(upCount) {
    const playerId = getPlayerId()
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

  //ALL tShape POSITIONS // 
  function tShapeUp(upCount) {
    const playerId = currentShape[1]
    currentShape.forEach(element => {
      cells[element].classList.remove('player')
    })
    if (upCount % 4 === 1) {
      currentShape[0] = playerId - width - 1
      currentShape[1] = playerId - 1
      currentShape[2] = playerId 
      currentShape[3] = playerId + width - 1
    } else if (upCount % 4 === 2) {   
      currentShape[0] = playerId - width
      currentShape[1] = playerId + 1 - width
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + 1 - width + 1
    } else if (upCount % 4 === 3) {
      currentShape[0] = playerId + width - width + 1
      currentShape[1] = playerId + width
      currentShape[2] = playerId + width + 1
      currentShape[3] = playerId + width + width + 1
    } else if (upCount % 4 === 0) { // default position 
      currentShape[0] = playerId + width - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + 1
    }
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }

  //ALL iShape POSITIONS
  function iShapeUp(upCount) {
    let playerId = new Number

    if (currentShape[1] % width === width - 1) {
      playerId = currentShape[1] - 2 //RIGHT wall check
    } else if (currentShape[1] % width === 0) {
      playerId = currentShape[1] + 1 // LEFT Wall check
    } else playerId = currentShape[1]

    currentShape.forEach(element => {
      cells[element].classList.remove('player')
    })
    if (upCount % 2 === 1) {
      currentShape[0] = playerId - width
      currentShape[1] = playerId 
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + width
    } else { // default position 
      currentShape[0] = playerId - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + 1 + 1
    }
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }

  //COLLISION FUNCTIONS

  //CHECKS BOTTOM COLLISION
  function checkBtmCollision(currentShape) {
    if ((Math.max(...currentShape) + width) < width * hight) {
      for (let i = currentShape.length - 1; i >= 0; i--) {
        cells[currentShape[i]].classList.remove('player')
        currentShape[i] += width
        cells[currentShape[i]].classList.add('player')
      }
    } else { //DROPS shape to a used array 
      currentShape.forEach(element => {
        cells[element].classList.add('used')
        cells[element].classList.remove('player')
        usedDivs.push(element)
      })
      usedDivs = rowCheck(usedDivs)
      shapeArr() // creates figure array and draws new shape
    }
  }

  //CHECKS if the next step will make it collide with the used divs when going Down
  function checkShape(currentShape) {
    const isUsed = true
    if (usedDivs.includes(currentShape[0] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[1] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[2] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[3] + width)) return isDivUsed(currentShape, isUsed)
  }
  
  //CHECKS if div is 'used' for colission
  function isDivUsed(currentShape, isUsed) {   // Is Div Used -> Row Check -> delete Row (used divs is passed from Delete Row back to Is Div Used. Is DIv Used calls the Shape Arr)
    console.log('isDivUsed')
    if (isUsed === true) {
      currentShape.forEach(element => {
        cells[element].classList.add('used')
        cells[element].classList.remove('player')
        usedDivs.push(element)
      })
      usedDivs = rowCheck(usedDivs)
    }
    shapeArr()
  }

  //CHECK ROW
  function rowCheck(usedDivs) {
    console.log(usedDivs)
    let tempArr = new Array
    const yMin = Math.floor(Math.min(...usedDivs) / width)

    //Checks if a row has 10 in a row (it has to start from YMin not 0 do not change the 'for')
    for (let tempY = yMin; tempY <= hight - 1; tempY ++) {
      tempArr = usedDivs.filter(div => Math.floor((div) / width) === tempY)
      if (tempArr.length >= width){
        usedDivs = deleteRow(tempArr, usedDivs, tempY)
      }
    }
    return usedDivs
  }

  //Deletes used rows 
  function deleteRow(tempArr, usedDivs, tempY) {
    let element = new Number
    let tempDivArr = new Array
    usedDivs.sort((a, b) => b - a)

    for (let i = 0; i < usedDivs.length; i ++) {
      element = usedDivs[i]
      cells[element].classList.remove('used')
    }

    tempDivArr = usedDivs.filter(div => Math.floor((div) / width) !== tempY)

    for (let i = 0; i < tempDivArr.length; i ++) {
      element = tempDivArr[i]
      if (Math.floor(element / width) < tempY + 1) {
        tempDivArr[i] = element + width
        cells[element + width].classList.add('used')
      } else cells[element].classList.add('used')
    }
    usedDivs = tempDivArr
    return usedDivs
  }



  //************************************************************ EVENT LISTENERS *****************************************/
  //MOVESHAPE LEFT // RIGHT // DOWN 
  document.addEventListener('keydown', (e) => {
    
    let tempArr = new Array

    switch (e.keyCode) {
      case 37: //LEFT
        //Check before going left that all elements in array are within the board & for colission to the left
        tempArr = currentShape.filter(element => element % width > 0).filter(element => usedDivs.includes(element - 1) === false) 
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
        if (currentShape === tShape) return tShapeUp(upCount)
        if (currentShape === iShape) return iShapeUp(upCount)
        break

      case 39: //RIGHT
        //Check before going right that all elements in array are within the board & for colission to the right
        tempArr = currentShape.filter(element => element % width < width - 1).filter(element => usedDivs.includes(element + 1) === false) 
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
        console.log('keydown')
        checkShape(currentShape)
        checkBtmCollision(currentShape)
    }
  })


})


// tempArr.forEach(element => {
//   cells[element].classList.remove('used')
// })

//WORKING
// usedDivs.forEach(element => {
//   cells[element].classList.remove('used')
// })


//OLD ROW CHECK
/*      { 

        tempArr.forEach(element => {
          cells[element].classList.remove('used')
        })
        usedDivs.forEach(element => {
          cells[element].classList.remove('used')
        })
        usedDivs = usedDivs.filter(div => Math.floor((div) / width) !== tempY)
        console.log(usedDivs)
        usedDivs = usedDivs.map(div => div + width)
        console.log(usedDivs)
        usedDivs.forEach(element => {
          cells[element].classList.add('used')
        })
      }
*/

///Original isDivUsed function
// function isDivUsed(currentShape, isUsed) {
//   console.log('isDivUsed')
//   if (isUsed === true) {
//     currentShape.forEach(element => {
//       cells[element].classList.add('used')
//       cells[element].classList.remove('player')
//       usedDivs.push(element)
//     })
//   }
//   return shapeArr()
// } 



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