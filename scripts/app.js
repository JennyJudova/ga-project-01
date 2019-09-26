document.addEventListener('DOMContentLoaded', () => {
  //GLOBAL VARIABLES

  //GRID variables
  const width = 10
  const hight = 25
  const grid = document.querySelector('.grid')
  const cells = []

  //SHAPE VARIABLES
  let currentShape = []
  let allShapes = []
  let zShape = []
  let sShape = []
  let lShape = []
  let l2Shape = []
  let tShape = []
  let sqShape = []
  let iShape = []
  const shapeSpace = [21,22,23,24,25,31,32,33,34,35,41,42,43,44,36]
  let nextShape = null
  let firstShape = true
  let firstLocation = []

  //OTHER VARS
  let usedDivs = []
  let upCount = 0
  let currentScore = 0
  let highestLevel = 0
  let level = 0
  let startSpeed = 500
  let speed = 500
  let playerId = 0
  let shapeDrop = null
  let gameEnd = false

  //MUSIC VARIABLES
  const music = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e8/Korobeiniki.ogg')
  music.loop = true
  let musicCount = 0

  /************************************************ GAME *******************************************/ 

  //CREATES GRID ***** DO NOT TOUCH *****
  for (let i = 0; i < width * hight; i++) {
    const cell = document.createElement('DIV')
    grid.appendChild(cell)
    cells.push(cell)
  }
  //CREATES GRID ***** DO NOT TOUCH *****
      
  startScreen()

  /********************************************** FUNCTIONS ***************************************/
  //GAME PLAY 

  //DROPS CURRENT SHAPE + Speeds up with every level
  function speedUpDrop() {
    if (gameEnd) {
      startSpeed = 500
      speed = 500
      gameEnd = false
      return
    }
    shapeDrop = setInterval(() => { 
      if (speed < startSpeed) {
        startSpeed = speed
        clearInterval(shapeDrop)
        speedUpDrop()
      }
      checkShape(currentShape)
      checkBtmCollision(currentShape)
    }, speed) // CHANGE SPEED 
  }

  //SCORE CHECK
  function scoreCheck() {
    if (currentScore > 99) { // Updates Score
      level = level + 1
      speed = speed / 2
      currentScore = currentScore - 100
    }
    cells[width - 1].innerHTML = currentScore
    cells[3].innerHTML = level
    return speed
  }

  //GAME START SCREEN 
  function startScreen() {
    for (let i = 0; i < width * hight; i++) {
      cells[i].innerHTML = ''
      cells[i].classList.remove('used')
      cells[i].classList.remove('player')
      cells[i].classList.add('start')

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
      cells[i].classList.remove('start')
    }

    //5 LINES AT THE TOP - SCORE BOARD
    for (let i = 0; i < width * 5; i++) {
      cells[i].classList.add('top')
    }

    cells[0].innerHTML = 'LE'
    cells[1].innerHTML = 'VE'
    cells[2].innerHTML = 'L '

    cells[6].innerHTML = 'SC'
    cells[7].innerHTML = 'OR'
    cells[8].innerHTML = 'E '

    cells[10].innerHTML = 'BE'
    cells[11].innerHTML = 'ST'

    cells[16].innerHTML = 'LE'
    cells[17].innerHTML = 'VE'
    cells[18].innerHTML = 'L '
    cells[19].innerHTML = highestLevel

    cells[36].innerHTML = 'NE'
    cells[37].innerHTML = 'XT'

    cells[46].innerHTML = 'SH'
    cells[47].innerHTML = 'AP'
    cells[48].innerHTML = 'E '

    //Starts Game 
    shapeArr()
  }
  
  
  //AN ARRAY OF ALL SHAPES
  function shapeArr() {
    allShapes = []
    zShape = [24,25,35,36] //[23,24,34,35]//[25,26,36,37] //[3,4,14,15] - done
    sShape = [26,25,35,34] //[34,25,26,35]//[35,26,27,36]//[13,4,5,14] - done
    lShape = [24,34,44,45] //[24,34,44,45] //[26,36,46,47]//[4,14,24,25] - done
    l2Shape = [25,35,45,44] //[24,43,34,44]//[26,45,36,46]//[4,23,14,24] - done
    tShape = [34,25,35,36] //[33,24,34,35]//[35,26,36,37]//[13,4,14,15] - done
    sqShape = [24,25,34,35]//[26,27,36,37]//[4,5,14,15]
    iShape = [34,35,36,37]//[35,36,37,38]//[3,4,5,6]
    allShapes.push(zShape)
    allShapes.push(sShape)
    allShapes.push(lShape)
    allShapes.push(l2Shape)
    allShapes.push(tShape)
    allShapes.push(sqShape)
    allShapes.push(iShape)

    nextShapeCheck(allShapes)
  }

  //NEXT SHAPE CHECK 
  function nextShapeCheck(allShapes) {
    if (firstShape) {
      firstLocation = []
      currentShape = allShapes[Math.floor(Math.random() * 7 )]
      firstShape = false
    } else {
      firstLocation = []
      currentShape = nextShape
      currentShape.forEach(element => {
        firstLocation.push(element)
      })
    } 
    nextShape = allShapes[Math.floor(Math.random() * 7 )]
    drawShape(nextShape, currentShape)
  }

  //DRAWS NEXT SHAPE + CURRENT SHAPE 
  function drawShape(currentShape) {
    scoreCheck()
    const drawNShape = nextShape.map(element => element - 2)
    //Clears the next shape board
    shapeSpace.forEach(element => {
      cells[element].classList.remove('next')
    })
    //Draws next shape
    drawNShape.forEach(element => {
      cells[element].classList.add('next')
    })
    //Draws current shape
    currentShape.forEach(element => {
      cells[element].classList.add('player')
    })
  }


  //ALL SHAPES & POSITIONS
  //Get Player ID
  function getPlayerId() {
    const wallCheck = currentShape[1] % width
    if (wallCheck === width - 1) {
      return playerId = currentShape[1] - 1 //RIGHT wall check
    } else if (wallCheck === 0) {
      return playerId = currentShape[1] + 1 // LEFT Wall check
    } else return playerId = currentShape[1]
  }

  //ALL zSHAPE POSITIONS //
  function zShapeUp(upCount) {
    playerId = getPlayerId()
    currentShape.map(element => cells[element].classList.remove('player'))
    if (upCount % 2 === 1) {
      currentShape[0] = playerId - width
      currentShape[1] = playerId
      currentShape[2] = playerId - 1
      currentShape[3] = playerId + width - 1
    } else { // default position 
      currentShape[0] = playerId - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + 1 
    }
    currentShape.map(element => cells[element].classList.add('player'))
  }

  //ALL sSHAPE POSITIONS //
  function sShapeUp(upCount) {
    playerId = getPlayerId()
    currentShape.map(element => cells[element].classList.remove('player'))
    if (upCount % 2 === 1) {
      currentShape[0] = playerId - width
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width + 1
    } else { // default position 
      currentShape[0] = playerId + 1
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width - 1
    }
    currentShape.map(element => cells[element].classList.add('player'))
  }

  //ALL lShapeUp POSITIONS // REWRITTEN 
  function lShapeUp(upCount) {
    playerId = getPlayerId()
    currentShape.map(element => cells[element].classList.remove('player'))
    if (upCount % 4 === 1) {
      currentShape[0] = playerId - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width - 1
    } else if (upCount % 4 === 2) {   
      currentShape[0] = playerId + width
      currentShape[1] = playerId 
      currentShape[2] = playerId - width
      currentShape[3] = playerId - width - 1
    } else if (upCount % 4 === 3) {
      currentShape[0] = playerId - 1
      currentShape[1] = playerId 
      currentShape[2] = playerId + 1
      currentShape[3] = playerId - width + 1
    } else if (upCount % 4 === 0) { // default position 
      currentShape[0] = playerId - width
      currentShape[1] = playerId 
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + 1
    }
    currentShape.map(element => cells[element].classList.add('player'))
  }

  //ALL l2Shape POSITIONS // REWRITTEN
  function lShapeUp2(upCount) {
    playerId = getPlayerId()
    currentShape.map(element => cells[element].classList.remove('player'))
    if (upCount % 4 === 1) {
      currentShape[0] = playerId + 1
      currentShape[1] = playerId 
      currentShape[2] = playerId - 1
      currentShape[3] = playerId - width - 1
    } else if (upCount % 4 === 2) {  
      currentShape[0] = playerId + width
      currentShape[1] = playerId 
      currentShape[2] = playerId - width
      currentShape[3] = playerId - width + 1 
    } else if (upCount % 4 === 3) {
      currentShape[0] = playerId - 1
      currentShape[1] = playerId 
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width + 1
    } else if (upCount % 4 === 0) { // default position 
      currentShape[0] = playerId - width
      currentShape[1] = playerId 
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width - 1
    }
    currentShape.map(element => cells[element].classList.add('player'))
  }

  //ALL tShape POSITIONS // 
  function tShapeUp(upCount) {
    playerId = getPlayerId()

    currentShape.map(element => cells[element].classList.remove('player'))
    
    if (upCount % 4 === 1) {
      currentShape[0] = playerId - width - 1
      currentShape[1] = playerId 
      currentShape[2] = playerId - 1 
      currentShape[3] = playerId + width - 1
    } else if (upCount % 4 === 2) { 
      currentShape[0] = playerId - width - 1
      currentShape[1] = playerId
      currentShape[2] = playerId - width
      currentShape[3] = playerId - width + 1
    } else if (upCount % 4 === 3) {
      currentShape[0] = playerId - width + 1 
      currentShape[1] = playerId
      currentShape[2] = playerId + 1
      currentShape[3] = playerId + width + 1
    } else if (upCount % 4 === 0) { // default position 
      currentShape[0] = playerId + width - 1
      currentShape[1] = playerId
      currentShape[2] = playerId + width
      currentShape[3] = playerId + width + 1
    }
    currentShape.map(element => cells[element].classList.add('player'))
  }

  //ALL iShape POSITIONS
  function iShapeUp(upCount) {
    if (currentShape[1] % width === width - 1) {
      playerId = currentShape[1] - 2 //RIGHT wall check
    } else if (currentShape[1] % width === width - 2) {
      playerId = currentShape[1] - 1 //RIGHT wall check
    } else if (currentShape[1] % width === 0) {
      playerId = currentShape[1] + 1 // LEFT Wall check
    } else playerId = currentShape[1]

    currentShape.map(element => cells[element].classList.remove('player'))

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
    currentShape.map(element => cells[element].classList.add('player'))
  }


  //COLLISION FUNCTIONS

  //CHECKS BOTTOM COLLISION
  function checkBtmCollision(currentShape) {
    if ((Math.max(...currentShape) + width) < width * hight) {
      for (let i = currentShape.length - 1; i >= 0; i--) {
        cells[currentShape[i]].classList.remove('player')
        currentShape[i] += width
        //cells[currentShape[i]].classList.add('player')
      }
      currentShape.map(element => cells[element].classList.add('player'))
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
    let tempArr = []
    const yMin = Math.floor(Math.min(...usedDivs) / width)

    if (yMin <= 6) return gameOver() 

    //Checks if a row has 10 in a row (it has to start from YMin not 0 do not change the 'for' loop)
    for (let tempY = yMin; tempY <= hight - 1; tempY ++) {
      tempArr = usedDivs.filter(div => Math.floor((div) / width) === tempY)
      if (tempArr.length >= width){
        currentScore = currentScore + Math.floor(Math.random(1) * 15 )
        usedDivs = deleteRow(usedDivs, tempY)
      }
    }
    return usedDivs
  }

  //Deletes used rows 
  function deleteRow(usedDivs, tempY) {
    let element = 0
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
    gameEnd = true
    musicCount = 0
    if (highestLevel < level ) {
      highestLevel = level
      cells[19].innerHTML = highestLevel
    }

    for (let i = 0; i < width * hight; i++) {
      cells[i].classList.remove('used')
      cells[i].classList.remove('player')
      cells[i].classList.remove('next')
      cells[i].classList.add('black')

      cells[36].innerHTML = ''
      cells[37].innerHTML = ''
  
      cells[46].innerHTML = ''
      cells[47].innerHTML = ''
      cells[48].innerHTML = ''

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

      cells[123].innerHTML = '*T'
      cells[124].innerHTML = 'WI'
      cells[125].innerHTML = 'CE'
      cells[126].innerHTML = '*'

      cells[133].innerHTML = 'TO'

      cells[143].innerHTML = 'PL'
      cells[144].innerHTML = 'AY'
    }
    
    clearInterval(shapeDrop)
  }

  //***************MUSIC FUNCTION ************************* */
  
  function playMusic(musicCount) {
    if (musicCount % 2 === 1) return music.play()
    if (musicCount % 2 === 0) return music.pause()
  }

  /************************************************************ EVENT LISTENERS *****************************************/
  //MOVESHAPE LEFT // RIGHT // DOWN 
  document.addEventListener('keydown', (e) => {
    
    let tempArr = []

    switch (e.keyCode) {
      case 37: //LEFT
        //Check before going left that all elements in array are within the board & for colission to the left
        tempArr = currentShape.filter(element => element % width > 0).filter(element => usedDivs.includes(element - 1) === false) 
        if (tempArr.length === 4) {
          for (let i = 0; i < currentShape.length; i++) {
            cells[currentShape[i]].classList.remove('player')
            currentShape[i] -= 1
          }
          currentShape.map(element => cells[element].classList.add('player'))
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

        if (firstLocation[0] === zShape[0] && firstLocation[1] === zShape[1]) return zShapeUp(upCount)
        if (firstLocation[0] === sShape[0] && firstLocation[1] === sShape[1]) return sShapeUp(upCount)
        if (firstLocation[0] === lShape[0] && firstLocation[1] === lShape[1]) return lShapeUp(upCount)
        if (firstLocation[0] === l2Shape[0] && firstLocation[1] === l2Shape[1]) return lShapeUp2(upCount)
        if (firstLocation[0] === tShape[0] && firstLocation[1] === tShape[1]) return tShapeUp(upCount)
        if (firstLocation[0] === iShape[0] && firstLocation[1] === iShape[1]) return iShapeUp(upCount)
        break

      case 39: //RIGHT
        //Check before going right that all elements in array are within the board & for colission to the right
        tempArr = currentShape.filter(element => element % width < width - 1).filter(element => usedDivs.includes(element + 1) === false) 
        
        if (tempArr.length === 4) {
          for (let i = 0; i < currentShape.length; i++) {
            cells[currentShape[i]].classList.remove('player')
            currentShape[i] += 1
          }
          currentShape.map(element => cells[element].classList.add('player'))
        }
        break

      case 40: //DOWN 
        //CHECKS IF SHAPE IS IN USED DIVS ARRAY
        checkShape(currentShape)
        checkBtmCollision(currentShape)
        break
      
      case 13: //ENTER - START & RESTART BUTTON
        speedUpDrop()
        gameStart()
        break

      case 32: //SPACE - MUSIC ON/PAUSE
        musicCount ++
        playMusic(musicCount)
    }
  })
})