/* ----- CANVAS ----- */
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const audio = document.querySelector('audio')


/* ----- IMAGES ----- */
const images = {
    blTile: './assets/images/tile-blue.png',
    orTile: './assets/images/tile-orange.png',
    piTile: './assets/images/tile-pink.png',
    grTile: './assets/images/tile-gray.png',
    exTile: './assets/images/tile-green.png',
    boy: './assets/images/ch-boy.png',
    girl: './assets/images/ch-girl.png',
    token: './assets/images/token.png',
    wasd: './assets/images/wasd.png',
    arrows: './assets/images/arrows.png'
}

/* ----- VARIABLES ----- */
let levelBoy = 0
let levelGirl = 1
let boardLeft
let boardRight
let positionKey
let positionKeyGirl
let moves = []
let movesGirl = []
let token = false
let tokenGirl = false

/* ----- LEVELS ----- */
const levels = [
    {
        id: '1 boy',
        width: 5,
        height: 5,
        map: [
            [0, 0, 0, 0, 0],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 0],
            [0, 0, 4, 0, 0],
        ],
        exit: [4, 2],
        start: [1, 2],
        key:  [2, 2]
    },
    {
        id: '1 girl',
        width: 5,
        height: 5,
        map: [
            [0, 0, 0, 0, 0],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 0],
            [0, 0, 4, 0, 0],
        ],
        exit: [4, 2],
        start: [1, 2],
        key:  [2, 2]
    },
    {
        id: '2 boy',
        width: 6,
        height: 6,
        map: [
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 0],
            [0, 1, 3, 3, 1, 0],
            [0, 1, 3, 3, 1, 0],
            [0, 3, 1, 1, 2, 4],
            [0, 0, 0, 0, 0, 0]
        ],
        exit: [4, 5],
        start: [4, 4],
        key: [1, 1]
    },
    {
        id: '2 girl',
        width: 6,
        height: 6,
        map: [
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 0],
            [0, 1, 3, 3, 1, 0],
            [0, 1, 3, 3, 1, 0],
            [0, 3, 1, 1, 2, 4],
            [0, 0, 0, 0, 0, 0]
        ],
        exit: [4, 5],
        start: [4, 4],
        key: [1, 1]
    },
    {
        id: '3 boy',
        width: 7,
        height: 7,
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 3, 1, 1, 3, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 2, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 3, 1, 1, 1, 3, 0],
            [0, 0, 0, 4, 0, 0, 0]
        ],
        exit: [6, 3],
        start: [1, 1],
        key: [1, 5]
    },
    {
        id: '3 girl',
        width: 7,
        height: 7,
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 3, 1, 1, 3, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 2, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 3, 1, 1, 1, 3, 0],
            [0, 0, 0, 4, 0, 0, 0]
        ],
        exit: [6, 3],
        start: [1, 1],
        key: [1, 5]
    },
    {
        id: '4 boy',
        width: 7,
        height: 8,
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 1, 3, 1, 3, 0],
            [0, 3, 1, 3, 1, 3, 0, 0],
            [0, 3, 1, 1, 2, 3, 0, 0],
            [0, 3, 1, 3, 1, 3, 0, 0],
            [0, 0, 3, 1, 3, 1, 3, 0],
            [0, 0, 0, 0, 0, 4, 0, 0]
        ],
        exit: [6, 5],
        start: [2, 2],
        key: [2, 4]
    },
    {
        id: '4 girl',
        width: 7,
        height: 8,
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 1, 3, 1, 3, 0],
            [0, 3, 1, 3, 1, 3, 0, 0],
            [0, 3, 1, 1, 2, 3, 0, 0],
            [0, 3, 1, 3, 1, 3, 0, 0],
            [0, 0, 3, 1, 3, 1, 3, 0],
            [0, 0, 0, 0, 0, 4, 0, 0]
        ],
        exit: [6, 5],
        start: [2, 2],
        key: [2, 4]
    },
    {
        id: '5 boy',
        width: 8,
        height: 8,
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 2, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 3, 0, 1, 0],
            [0, 1, 1, 1, 2, 1, 1, 0],
            [0, 3, 0, 3, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 4, 0, 0]
        ],
        exit: [7, 5],
        start: [3, 2],
        key: [1, 5]
    },
    {
        id: '5 girl',
        width: 8,
        height: 8,
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 2, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 3, 0, 1, 0],
            [0, 1, 1, 1, 2, 1, 1, 0],
            [0, 3, 0, 3, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 4, 0, 0]
        ],
        exit: [7, 5],
        start: [3, 2],
        key: [1, 5]
    },
    {
        id: '6 boy',
        width: 7,
        height: 7,
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 3, 1, 0, 0, 0],
            [0, 1, 0, 3, 0, 0, 0],
            [0, 3, 1, 2, 1, 1, 0],
            [0, 0, 0, 2, 0, 1, 0],
            [0, 0, 0, 1, 3, 1, 0],
            [0, 0, 0, 0, 0, 4, 0]
        ],
        exit: [6, 5],
        start: [1, 1],
        key: [5, 3]
    },
    {
        id: '6 girl',
        width: 7,
        height: 7,
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 3, 1, 0, 0, 0],
            [0, 1, 0, 3, 0, 0, 0],
            [0, 3, 1, 2, 1, 1, 0],
            [0, 0, 0, 2, 0, 1, 0],
            [0, 0, 0, 1, 3, 1, 0],
            [0, 0, 0, 0, 0, 4, 0]
        ],
        exit: [6, 5],
        start: [1, 1],
        key: [5, 3]
    },
    {
        id: '7 boy',
        width: 8,
        height: 7,
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 4, 0],
            [0, 1, 1, 0, 1, 0, 0],
            [0, 1, 1, 0, 3, 1, 0],
            [0, 0, 1, 1, 3, 1, 0],
            [0, 0, 3, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ],
        exit: [1, 5],
        start: [1, 2],
        key: [3, 1]
    },
    {
        id: '7 girl',
        width: 8,
        height: 7,
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 4, 0],
            [0, 1, 1, 0, 1, 0, 0],
            [0, 1, 1, 0, 3, 1, 0],
            [0, 0, 1, 1, 3, 1, 0],
            [0, 0, 3, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ],
        exit: [1, 5],
        start: [1, 2],
        key: [3, 1]
    }
]

/* ----- CLASSES ----- */
class Map {
    constructor(x, obj) {
        this.x = x
        this.id = obj.id
        this.width = obj.width
        this.height = obj.height
        this.map = obj.map
        this.exit = obj.exit
        this.start = obj.start
        this.key = obj.key
    }
    draw() {
        this.map.forEach((array, i) => {
            array.forEach((tile, j) => {
                switch (tile) {
                    case 0:
                        break
                    case 1:
                        new Tile(this.x + i * 55, 100 + j * 55, images.blTile)
                        break
                    case 2:
                        new Tile(this.x + i * 55, 100 + j * 55, images.orTile)
                        break
                    case 3:
                        new Tile(this.x + i * 55, 100 + j * 55, images.piTile)
                        break
                    case 4:
                        new Tile(this.x + i * 55, 100 + j * 55, images.grTile)
                        break
                    case 5:
                        new Tile(this.x + i * 55, 100 + j * 55, images.exTile)
                        break
                }
            })
        })
        new Key(
                this.x + 15 + this.key[0] * 55, 
                113 + this.key[1] * 55, 
                images.token
                )
        if (this.x < 450) {
            new Character(
                    this.x + 6 + this.start[0] * 55, 
                    75 + this.start[1] * 55, 
                    images.boy
                    )
        } else {
            new Character(
                this.x + 6 + this.start[0] * 55, 
                75 + this.start[1] * 55, 
                images.girl
                )
        }
    }
}

class Tile {
    constructor(x, y, src) {
        this.x = x
        this.y = y
        this.width = 50
        this.height = 50
        this.img = new Image()
        this.img.src = src
        this.img.onload = () => {
            this.draw()
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Key {
    constructor(x, y, src) {
        this.x = x
        this.y = y
        this.width = 20
        this.height = 20
        this.img = new Image()
        this.img.src = src
        this.img.onload = () => {
            this.draw()
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Character {
    constructor(x, y, src) {
        this.x = x
        this.y = y
        this.width = 37.5
        this.height = 65
        this.img = new Image()
        this.img.src = src
        this.img.onload = () => {
            this.draw()
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Keyboard {
    constructor(x, y, src) {
        this.x = x
        this.y = y
        this.width = 120
        this.height = 85
        this.img = new Image()
        this.img.src = src
        this.img.onload = () => {
            this.draw()
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

/* ----- RENDER ----- */
window.onload = () => {

    ctx.font = '30px Comfortaa'
    ctx.fillStyle = 'pink'
    ctx.fillText('\\{^_^}/ Welcome!', 325, 75)

    ctx.font = '20px Comfortaa'
    ctx.fillStyle = 'gray'
    new Tile(250, 125, images.blTile)
    ctx.fillText('Disappear after one step', 350, 160)
    new Tile(250, 200, images.orTile)
    ctx.fillText('Never disappear', 350, 235)
    new Tile(250, 275, images.piTile)
    ctx.fillText('Step on one and all will disappear', 350, 310)
    new Tile(250, 350, images.exTile)
    ctx.fillText('Escape portal', 350, 385)

    new Keyboard(335, 440, images.wasd)
    new Keyboard(485, 440, images.arrows)
    ctx.font = '16px Comfortaa'
    ctx.fillStyle = 'rgba(55, 159, 243, 0.75)'
    ctx.fillText('BOY', 380, 550)
    ctx.fillStyle = 'pink'
    ctx.fillText('GIRL', 525, 550)

    
    
    document.querySelector('#play').onclick = function() {
        document.querySelector('#play').blur()
        audio.play()
        startGame();
    };
    
    function startGame() {
        
        ctx.clearRect(0, 0, 910, 600)
        boardLeft = new Map(25, levels[levelBoy])
        boardRight = new Map(475, levels[levelGirl])
        boardLeft.draw()
        boardRight.draw()
        positionKey = boardLeft.start
        positionKeyGirl = boardRight.start
        let aux
        let auxGirl

        let interval = setInterval(function() {
            if (positionKey[0] === boardLeft.exit[0] &&
                positionKey[1] === boardLeft.exit[1] &&
                positionKeyGirl[0] === boardRight.exit[0] &&
                positionKeyGirl[1] === boardRight.exit[1]) {
                nextLevel()
            }
        }, 1000)

        function nextLevel() {

            clearInterval(interval)
            ctx.clearRect(0, 0, 900, 600)

            levelBoy += 2
            levelGirl += 2
            positionKey = null
            positionKeyGirl = null
            aux = null
            auxGirl = null

            if (levelBoy === 14) {
                endGame()
            } else {
                startGame()
            }

        }

        /* ----- MOVE BOY --- */
        function boyRight() {
            if (boardLeft.map[boardLeft.start[0] + 1][boardLeft.start[1]] > 0 &&
                boardLeft.map[boardLeft.start[0] + 1][boardLeft.start[1]] != 4){
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 470, 600)
                boardLeft.start[0]++
                removeTile()
                boardLeft.draw()
                key()
            }
        }
        
        function boyLeft() {
            if (boardLeft.map[boardLeft.start[0] - 1][boardLeft.start[1]] > 0 &&
                boardLeft.map[boardLeft.start[0] - 1][boardLeft.start[1]] != 4) {
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 470, 600)
                boardLeft.start[0]--
                removeTile()
                boardLeft.draw()
                key()
            }
        }
        
        function boyUp() {
            if (boardLeft.map[boardLeft.start[0]][boardLeft.start[1] - 1] > 0 &&
                boardLeft.map[boardLeft.start[0]][boardLeft.start[1] - 1] != 4) {
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 470, 600)
                boardLeft.start[1]--
                removeTile()
                boardLeft.draw()
                key()
            }
        }
        
        function boyDown() {
            if (boardLeft.map[boardLeft.start[0]][boardLeft.start[1] + 1] > 0 &&
                boardLeft.map[boardLeft.start[0]][boardLeft.start[1] + 1] != 4) {
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 470, 600)
                boardLeft.start[1]++
                removeTile()
                boardLeft.draw()
                key()
            }
        }

        function key() {
            if (boardLeft.key[1] === positionKey[1] && boardLeft.key[0] === positionKey[0]) {
                token = true
                if (token) {
                    boardLeft.map[boardLeft.exit[0]][boardLeft.exit[1]] = 5
                    boardLeft.key = []
                }
            }
        }

        function removeTile() {
            if (boardLeft.map[moves[moves.length - 1][0]][moves[moves.length - 1][1]] === 1) {
                boardLeft.map[moves[moves.length - 1][0]][moves[moves.length - 1][1]] = 0
            } else if (boardLeft.map[moves[moves.length - 1][0]][moves[moves.length - 1][1]] === 3) {
                boardLeft.map.forEach((array,i) => {
                    array.forEach((element,j) => {
                        if (element === 3) {
                            boardLeft.map[i][j] = 0
                        }
                    })
                })
            }
        }

        /* ----- MOVE GIRL --- */
        function girlRight() {
            if (boardRight.map[boardRight.start[0] + 1][boardRight.start[1]] > 0 &&
                boardRight.map[boardRight.start[0] + 1][boardRight.start[1]] != 4){
                auxGirl = [...boardRight.start]
                movesGirl.push(auxGirl)
                ctx.clearRect(450, 0, 480, 600)
                boardRight.start[0]++
                removeTileGirl()
                boardRight.draw()
                keyGirl()
            }
        }

        function girlLeft() {
            if (boardRight.map[boardRight.start[0] - 1][boardRight.start[1]] > 0 &&
                boardRight.map[boardRight.start[0] - 1][boardRight.start[1]] != 4) {
                auxGirl = [...boardRight.start]
                movesGirl.push(auxGirl)
                ctx.clearRect(450, 0, 480, 600)
                boardRight.start[0]--
                removeTileGirl()
                boardRight.draw()
                keyGirl()
            }
        }

        function girlUp() {
            if (boardRight.map[boardRight.start[0]][boardRight.start[1] - 1] > 0 &&
                boardRight.map[boardRight.start[0]][boardRight.start[1] - 1] != 4) {
                auxGirl = [...boardRight.start]
                movesGirl.push(auxGirl)
                ctx.clearRect(450, 0, 480, 600)
                boardRight.start[1]--
                removeTileGirl()
                boardRight.draw()
                keyGirl()
            }
        }

        function girlDown() {
            if (boardRight.map[boardRight.start[0]][boardRight.start[1] + 1] > 0 &&
                boardRight.map[boardRight.start[0]][boardRight.start[1] + 1] != 4) {
                auxGirl = [...boardRight.start]
                movesGirl.push(auxGirl)
                ctx.clearRect(450, 0, 480, 600)
                boardRight.start[1]++
                removeTileGirl()
                boardRight.draw()
                keyGirl()
            }
        }

        function keyGirl() {
            if (boardRight.key[1] === positionKeyGirl[1] && boardRight.key[0] === positionKeyGirl[0]) {
                tokenGirl = true
                if (tokenGirl) {
                    boardRight.map[boardRight.exit[0]][boardRight.exit[1]] = 5
                    boardRight.key = []
                }
            }
        }

        function removeTileGirl() {
            if (boardRight.map[movesGirl[movesGirl.length - 1][0]][movesGirl[movesGirl.length - 1][1]] === 1) {
                boardRight.map[movesGirl[movesGirl.length - 1][0]][movesGirl[movesGirl.length - 1][1]] = 0
            } else if (boardRight.map[movesGirl[movesGirl.length - 1][0]][movesGirl[movesGirl.length - 1][1]] === 3) {
                boardRight.map.forEach((array,i) => {
                    array.forEach((element,j) => {
                        if (element === 3) {
                            boardRight.map[i][j] = 0
                        }
                    })
                })
            }
        }

        function win() {
            if (positionKey[0] === boardLeft.exit[0]) {
                console.log('win')
            }
        }

        function endGame() {
            ctx.font = '30px Comfortaa'
            ctx.fillStyle = 'pink'
            ctx.fillText('\\{^_^}/ Congratulations!', 250, 150)

            ctx.font = '20px Comfortaa'
            ctx.fillStyle = 'gray'
            ctx.fillText('♥ Love wins.', 375, 275)
            new Character(400, 325, images.boy)
            new Character(450, 325, images.girl)
        }

        document.onkeydown = (e) => { 
            if (e.keyCode === 68) return boyRight()
            if (e.keyCode === 65) return boyLeft()
            if (e.keyCode === 87) return boyUp()
            if (e.keyCode === 83) return boyDown()
            if (e.keyCode === 39) return girlRight()
            if (e.keyCode === 37) return girlLeft()
            if (e.keyCode === 38) return girlUp()
            if (e.keyCode === 40) return girlDown()
        }

        document.querySelector('#reload').onclick = () => {
            document.querySelector('#reload').blur()
            location.reload()
        }

        document.querySelector('#fullscreen').onclick = () => {
            document.querySelector('#fullscreen').blur()
            if (canvas.webkitRequestFullScreen) {
              canvas.webkitRequestFullScreen()
            } else {
              canvas.mozRequestFullScreen()
            }
          }

    }

}