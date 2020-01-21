/* ----- CANVAS ----- */
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

/* ----- IMAGES ----- */
const images = {
    blTile: './assets/images/tile-blue.png',
    orTile: './assets/images/tile-orange.png',
    piTile: './assets/images/tile-pink.png',
    grTile: './assets/images/tile-gray.png',
    exTile: './assets/images/tile-green.png',
    boy: './assets/images/ch-boy.png',
    girl: './assets/images/ch-girl.png',
    token: './assets/images/token.png'
}

/* ----- VARIABLES ----- */
let level = 0
let boardLeft
let boardRigth
let position
let moves = []
let token = false

/* ----- LEVELS ----- */
const levels = [
    {
        id: 0,
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
        id: 1,
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
        id: 2,
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

/* ----- RENDER ----- */
window.onload = () => {
    
    boardLeft = new Map(25, levels[2])
    boardRight = new Map(475, levels[0])
    boardLeft.draw()
    boardRight.draw()
    positionKey = boardLeft.start
    position = [...boardLeft.start]
    let aux
    ctx.beginPath()
    ctx.moveTo(450,0)
    ctx.lineTo(450,600)
    ctx.stroke()
    ctx.closePath()
    
    document.querySelector('#play').onclick = function() {
        document.querySelector('#play').blur()
        startGame();
    };
    
    function startGame() {

        /* ----- MOVE --- */
        function boyRight() {
            if (boardLeft.map[boardLeft.start[0] + 1][boardLeft.start[1]] > 0){
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 450, 600)
                boardLeft.start[0]++
                removeTile()
                boardLeft.draw()
                key()
            }
        }
        
        function boyLeft() {
            if (boardLeft.map[boardLeft.start[0] - 1][boardLeft.start[1]] > 0) {
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 450, 600)
                boardLeft.start[0]--
                removeTile()
                boardLeft.draw()
                key()
            }
        }
        
        function boyUp() {
            if (boardLeft.map[boardLeft.start[0]][boardLeft.start[1] - 1] > 0) {
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 450, 600)
                boardLeft.start[1]--
                removeTile()
                boardLeft.draw()
                key()
            }
        }
        
        function boyDown() {
            if (boardLeft.map[boardLeft.start[0]][boardLeft.start[1] + 1] > 0) {
                aux = [...boardLeft.start]
                moves.push(aux)
                ctx.clearRect(0, 0, 450, 600)
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
            return key
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

        document.onkeydown = (e) => { 
            if (e.keyCode === 68) return boyRight()
            if (e.keyCode === 65) return boyLeft()
            if (e.keyCode === 87) return boyUp()
            if (e.keyCode === 83) return boyDown()
        }

    }

}