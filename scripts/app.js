document.addEventListener('DOMContentLoaded', () => {
  //GLOBAL VARIABLES

  //GRID VARIABLES
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

  //ROTATION & MOVEMENT VARIABLES
  let usedDivs = []
  let upCount = 0
  let playerId = 0

  //SCORE VARIABLES
  let currentScore = 0
  let highestLevel = 0
  let level = 0

  //SPEED VARIABLES
  let startSpeed = 500
  let speed = 500
  let shapeDrop = null
  let gameEnd = false

  //MUSIC VARIABLES
  const music = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e8/Korobeiniki.ogg')
  music.loop = true
  let musicCount = 0

  //PLAY GAME VARIABLE
  let enterCount = 0 

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

      cells[10].innerHTML = '*'
      cells[11].innerHTML = '*'
      cells[12].innerHTML = 'T'
      cells[13].innerHTML = 'E'
      cells[14].innerHTML = 'T'
      cells[15].innerHTML = 'R'
      cells[16].innerHTML = 'I'
      cells[17].innerHTML = 'S'
      cells[18].innerHTML = '*'
      cells[19].innerHTML = '*'

      cells[32].innerHTML = 'PR'
      cells[33].innerHTML = 'ES'
      cells[34].innerHTML = 'S '
      cells[36].innerHTML = 'EN'
      cells[37].innerHTML = 'TE'
      cells[38].innerHTML = 'R '

      cells[45].innerHTML = 'TO'
      
      cells[53].innerHTML = 'S'
      cells[54].innerHTML = 'T'
      cells[55].innerHTML = 'A'
      cells[56].innerHTML = 'R'
      cells[57].innerHTML = 'T'

      cells[63].innerHTML = 'G'
      cells[64].innerHTML = 'A'
      cells[65].innerHTML = 'M'
      cells[66].innerHTML = 'E'

      cells[70].innerHTML = '*'
      cells[71].innerHTML = '*'
      cells[72].innerHTML = '*'
      cells[73].innerHTML = '*'
      cells[74].innerHTML = '*'
      cells[75].innerHTML = '*'
      cells[76].innerHTML = '*'
      cells[77].innerHTML = '*'
      cells[78].innerHTML = '*'
      cells[79].innerHTML = '*'

      cells[83].innerHTML = 'PR'
      cells[84].innerHTML = 'ES'
      cells[85].innerHTML = 'S '

      cells[93].innerHTML = '"U'
      cells[94].innerHTML = 'P"'
      cells[95].innerHTML = ''
      cells[96].innerHTML = 'TO'

      cells[103].innerHTML = 'RO'
      cells[104].innerHTML = 'TA'
      cells[105].innerHTML = 'TE'

      cells[110].innerHTML = '*'
      cells[111].innerHTML = '*'
      cells[112].innerHTML = '*'
      cells[113].innerHTML = '*'
      cells[114].innerHTML = '*'
      cells[115].innerHTML = '*'
      cells[116].innerHTML = '*'
      cells[117].innerHTML = '*'
      cells[118].innerHTML = '*'
      cells[119].innerHTML = '*'

      cells[123].innerHTML = 'PR'
      cells[124].innerHTML = 'ES'
      cells[125].innerHTML = 'S '

      cells[133].innerHTML = 'SP'
      cells[134].innerHTML = 'AC'
      cells[135].innerHTML = 'E '

      cells[143].innerHTML = 'FO'
      cells[144].innerHTML = 'R '

      cells[153].innerHTML = 'MU'
      cells[154].innerHTML = 'SI'
      cells[155].innerHTML = 'C '
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
    zShape = [24,25,35,36]
    sShape = [26,25,35,34]
    lShape = [24,34,44,45]
    l2Shape = [25,35,45,44] 
    tShape = [34,25,35,36] 
    sqShape = [35,34,44,45]
    iShape = [34,35,36,37]
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
    upCount = 0
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

  //CHECKS COLLISION WITH FLOOR 
  function checkBtmCollision(currentShape) {
    if ((Math.max(...currentShape) + width) < width * hight) {
      for (let i = currentShape.length - 1; i >= 0; i--) {
        cells[currentShape[i]].classList.remove('player')
        currentShape[i] += width
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

  //CHECKS COLLISION WITH 'USED' DIVS if the next step will make it collide with the used divs when going Down
  function checkShape(currentShape) {
    const isUsed = true
    if (usedDivs.includes(currentShape[0] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[1] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[2] + width)) return isDivUsed(currentShape, isUsed)
    if (usedDivs.includes(currentShape[3] + width)) return isDivUsed(currentShape, isUsed)
  }
  
  //MOVES THE SHAPE FROM IN PLAY TO USED
  function isDivUsed(currentShape, isUsed) {   // Is Div Used -> Row Check -> delete Row (used divs is passed from Delete Row back to Is Div Used. Is DIv Used calls the Shape Arr)
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
    const yMin = Math.floor(Math.min(...usedDivs) / width) // Checks not the whole playfield but up to the top of 'used' divs pile
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
    clearInterval(shapeDrop)
    enterCount = 0
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
  }

  /********************************************* MUSIC FUNCTION ***************************************/
  
  function playMusic(musicCount) {
    if (musicCount % 2 === 1) return music.play()
    if (musicCount % 2 === 0) return music.pause()
  }

  /********************************************* EVENT LISTENERS *************************************/
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
        //The check for the first tetromino
        if (currentShape === zShape) return zShapeUp(upCount)
        if (currentShape === sShape) return sShapeUp(upCount)
        if (currentShape === lShape) return lShapeUp(upCount)
        if (currentShape === l2Shape) return lShapeUp2(upCount)
        if (currentShape === tShape) return tShapeUp(upCount)
        if (currentShape === iShape) return iShapeUp(upCount)
        //The check for all subsequent tetromino
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
        if (enterCount < 2) {
          speedUpDrop()
          gameStart()
          enterCount++
        }
        break

      case 32: //SPACE - MUSIC ON/PAUSE
        musicCount ++
        playMusic(musicCount)
    }
  })
})