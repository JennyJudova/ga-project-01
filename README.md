# GA Software Engineering Immersive: Project 1
This was my first project on the General Assembly Software Engineering Immersive course (Week 4).

---

# Tetris aka Falling Brick Game
This project is a browser game of Tetris built with Vanilla Javascript.

## Built With

1. HTML5
2. CSS
3. Javascript

## Deployment
The game is deployed on GitHub Pages and it can be found here:https://jennyjudova.github.io/ga-project-01/

## Installation
Use the clone button to download the game source code. Open the index.html file in your browser and the game should start, if not check console for any issues. No images or local audio files where used so the game should work on any machine.

## Features:
* Tetris rendition of  Korobeiniki as the theme music
* Keeping of the Score and Level
* Speed change depending on the level
* Stores the highest level until the game is refreshed
* Shows the next shape
* Allows the half a second window between the shape dropping and locking into position

## Game Architecture and Challenges
Tetris is a puzzle game where the player has to fit different shaped blocks (called Tetrominoes) together so that they make a complete line across the playing board. Once a line is achieved it is removed from the game board and the player’s score is increased.

The player can move the Tetrominoes left and right and rotate them clockwise in 90º increments.

The aim of the game is to get as many points as possible before the game board is filled with Tetrominoes.

[image:95CC727C-E88D-41DA-8496-29E8F39C9DC4-3505-000013A8F2C627CF/Screenshot 2019-11-06 at 22.17.28.png]

The game is traditionally a one player game. The game begins with a ‘Start Game’ screen. When the user presses ‘Enter’ they are taken to an empty grid with the first Tetromino dropping from top to bottom. The user can move the Tetromino to the right and the left, they can quicken the drop by pressing down, and they can rotate the shape clockwise by pressing up.  

[image:4F572E70-D640-4510-9EB4-E3C6D93AA660-3505-000013AC0CDD7FBE/Screenshot 2019-11-06 at 22.18.32.png]


The game build can be divided into three technical challenges:

MOVEMENT and ROTATION 
* the shape moving as one whole element 
* accurate rotations for each shape

COLLISION CHECK
* collision check with the bottom, left and right borders of the game
* collision check with ‘used’ Tetrominoes
* collision check when rotating near the border

LINE DELETION
* deletion of a single and multiple lines

[image:643CFFE2-CE39-4421-9376-0789DDEC0B63-3505-000013B6808049D6/Screenshot 2019-11-06 at 22.20.33.png]

---
## Future improvements
* Scoring system  - Tetris has a very specific scoring system which was not implemented here.
* Leader board - the current game saves the highest level but not does not maintain a leader board.

---

## Author

Jenny Judova
