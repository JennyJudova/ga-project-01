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
  let currentScore = 0
  let level = 0
  let linesDeleted = 0
  let startSpeed = 500

  /************************************************ GAME *******************************************/ 

  //CREATES GRID ***** DO NOT TOUCH *****
  for (let i = 0; i < width * hight; i++) {
    const cell = document.createElement('DIV')
    grid.appendChild(cell)
    cells.push(cell)
  }
  //CREATES GRID ***** DO NOT TOUCH *****
      
  startScreen()
  
  // //DROPS CURRENT SHAPE 
  const shapeDrop = setInterval(function() { 
    checkShape(currentShape)
    checkBtmCollision(currentShape)
  }, startSpeed) // CHANGE SPEED 

  /********************************************** FUNCTIONS ***************************************/
  
  //GAME START SCREEN 
  function startScreen() {
    for (let i = 0; i < width * hight; i++) {
      cells[i].innerHTML = ''
      cells[i].classList.remove('used')
      cells[i].classList.remove('player')
      cells[i].classList.add('black')

      cells[22].innerHTML = 'PR'
      cells[23].innerHTML = 'ES'
      cells[24].innerHTML = 'S '
      cells[26].innerHTML = 'EN'
      cells[27].innerHTML = 'TE'
      cells[28].innerHTML = 'R '

      cells[35].innerHTML = 'TO'
      
      cells[43].innerHTML = 'S'
      cells[44].innerHTML = 'T'
      cells[45].innerHTML = 'A'
      cells[46].innerHTML = 'R'
      cells[47].innerHTML = 'T'

      cells[53].innerHTML = 'G'
      cells[54].innerHTML = 'A'
      cells[55].innerHTML = 'M'
      cells[56].innerHTML = 'E'

      cells[60].innerHTML = '*'
      cells[61].innerHTML = '*'
      cells[62].innerHTML = '*'
      cells[63].innerHTML = '*'
      cells[64].innerHTML = '*'
      cells[65].innerHTML = '*'
      cells[66].innerHTML = '*'
      cells[67].innerHTML = '*'
      cells[68].innerHTML = '*'
      cells[69].innerHTML = '*'

      cells[73].innerHTML = 'PR'
      cells[74].innerHTML = 'ES'
      cells[75].innerHTML = 'S '

      cells[83].innerHTML = '"U'
      cells[84].innerHTML = 'P"'
      cells[85].innerHTML = ''
      cells[86].innerHTML = 'TO'

      cells[93].innerHTML = 'RO'
      cells[94].innerHTML = 'TA'
      cells[95].innerHTML = 'TE'

      cells[100].innerHTML = '*'
      cells[101].innerHTML = '*'
      cells[102].innerHTML = '*'
      cells[103].innerHTML = '*'
      cells[104].innerHTML = '*'
      cells[105].innerHTML = '*'
      cells[106].innerHTML = '*'
      cells[107].innerHTML = '*'
      cells[108].innerHTML = '*'
      cells[109].innerHTML = '*'

      cells[113].innerHTML = 'PR'
      cells[114].innerHTML = 'ES'
      cells[115].innerHTML = 'S '

      cells[123].innerHTML = 'SP'
      cells[124].innerHTML = 'AC'
      cells[125].innerHTML = 'E '

      cells[133].innerHTML = 'FO'
      cells[134].innerHTML = 'R '

      cells[143].innerHTML = 'MU'
      cells[144].innerHTML = 'SI'
      cells[145].innerHTML = 'C '
    }
  }

  //GAME SET UP 
  function gameStart() {
    upCount = 0
    currentScore = 0
    level = 0
    usedDivs = []

    for (let i = 0; i < width * hight; i++) {
      cells[i].innerHTML = ''
      cells[i].classList.remove('used')
      cells[i].classList.remove('player')
      cells[i].classList.remove('black')
    }

    //FIRST LINE 
    for (let i = 0; i < width; i++) {
      cells[i].classList.add('top')
    }

    cells[0].innerHTML = 'LE'
    cells[1].innerHTML = 'VE'
    cells[2].innerHTML = 'L '

    cells[6].innerHTML = 'SC'
    cells[7].innerHTML = 'OR'
    cells[8].innerHTML = 'E '

    //Starts Game 
    shapeArr()
  }
  
  
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

    if (currentScore > 99) { // Updates Score
      level = level + 1
      currentScore = currentScore - 100
    }
    cells[width - 1].innerHTML = currentScore
    cells[3].innerHTML = level


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
    } else if (currentShape[1] % width === width - 2) {
      playerId = currentShape[1] - 1 //RIGHT wall check
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

    if (yMin === 1) return gameOver() 

    //Checks if a row has 10 in a row (it has to start from YMin not 0 do not change the 'for')
    for (let tempY = yMin; tempY <= hight - 1; tempY ++) {
      tempArr = usedDivs.filter(div => Math.floor((div) / width) === tempY)
      if (tempArr.length >= width){
        linesDeleted ++
        currentScore = currentScore + Math.floor(Math.random(1) * 15 )
        usedDivs = deleteRow(usedDivs, tempY)
      }
    }
    return usedDivs
  }

  //Deletes used rows 
  function deleteRow(usedDivs, tempY) {
    let element = new Number
    usedDivs.sort((a, b) => b - a)

    for (let i = 0; i < usedDivs.length; i ++) {
      element = usedDivs[i]
      cells[element].classList.remove('used')
    }

    usedDivs = usedDivs.filter(div => Math.floor((div) / width) !== tempY)

    for (let i = 0; i < usedDivs.length; i ++) {
      element = usedDivs[i]
      if (Math.floor(element / width) < tempY + 1) {
        usedDivs[i] = element + width
        cells[element + width].classList.add('used')
      } else cells[element].classList.add('used')
    }
    return usedDivs
  }


  //GAME OVER SCREEN 
  function gameOver() {
    for (let i = 0; i < width * hight; i++) {

      cells[i].classList.remove('used')
      cells[i].classList.remove('player')
      cells[i].classList.add('black')

      cells[63].innerHTML = 'G'
      cells[64].innerHTML = 'A'
      cells[65].innerHTML = 'M'
      cells[66].innerHTML = 'E'

      cells[73].innerHTML = 'O'
      cells[74].innerHTML = 'V'
      cells[75].innerHTML = 'E'
      cells[76].innerHTML = 'R'

      cells[92].innerHTML = '*'
      cells[93].innerHTML = '*'
      cells[94].innerHTML = '*'
      cells[95].innerHTML = '*'
      cells[96].innerHTML = '*'
      cells[97].innerHTML = '*'

      cells[103].innerHTML = 'PR'
      cells[104].innerHTML = 'ES'
      cells[105].innerHTML = 'S '

      cells[113].innerHTML = 'EN'
      cells[114].innerHTML = 'TE'
      cells[115].innerHTML = 'R '

      cells[123].innerHTML = 'TO'

      cells[133].innerHTML = 'PL'
      cells[134].innerHTML = 'AY'
    }
    clearInterval(shapeDrop)
  }


  /************************************************************ EVENT LISTENERS *****************************************/
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
        break
      
      case 13: //RESTART BUTTON
        gameStart()
        break
    }
  })
})