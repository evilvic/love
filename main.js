/* ----- CANVAS ----- */
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

/* ----- INTERVAL ----- */
let interval
let frames = 0

/* ----- VARIABLES ----- */
let boardLeft
let boardRigth
let boy

/* ----- IMAGES ----- */
const images = {
    boy: './assets/images/ch-boy.png',
    blTile: './assets/images/tile-blue.png',
    orTile: './assets/images/tile-orange.png',
    piTile: './assets/images/tile-pink.png',
    spTile: './assets/images/tile-gray.png',
    grTile: './assets/images/tile-green.png',
    token: './assets/images/token.png'
}

/* ----- LEVELS ----- */
const level1 = {
    width: 3,
    height: 3,
    map: [
        ['B', 'B', 'B'],
        ['O', 'O', 'O'],
        ['B', 'B', 'B']
    ],
    exit: [4, 2],
    start: [1, 2],
    key:  [2, 2]

}

const level2 = {
    width: 4,
    height: 4,
    map: [
        ['O', 'B', 'B', 'P'],
        ['B', 'P', 'P', 'B'],
        ['B', 'P', 'P', 'B'],
        ['B', 'B', 'B', 'O']
    ],
    exit: [4, 5],
    start: [4, 4],
    key: [1, 1]
}

/* ----- CLASSES ----- */
class Map {
    constructor(x, obj) {
        this.x = x
        this.width = obj.width
        this.height = obj.height
        this.map = obj.map
        this.exit = obj.exit
        this.key = obj.key
    }
    draw() {
        this.map.forEach((array, i) => {
            array.forEach((tile, j) => {
                switch (tile) {
                    case '0':
                        break
                    case 'B':
                        new Tile(this.x + j * 55, 200 + i * 55, images.blTile)
                        break
                    case 'O':
                        new Tile(this.x + j * 55, 200 + i * 55, images.orTile)
                        break
                    case 'P':
                        new Tile(this.x + j * 55, 200 + i * 55, images.piTile)
                }
            })
        })
        new Tile(
                this.x + (this.exit[0] - 1) * 55, 
                200 + (this.exit[1] - 1) * 55, 
                images.spTile
                )
        new Key(
                this.x + 15 + (this.key[0] - 1) * 55, 
                200 + 13 + (this.key[1] - 1) * 55, 
                images.token
                )
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
    right() {
        this.x += 55
    }
}

/* ----- MOVE --- */
document.onkeydown = (e) => { 
    if (e.keyCode === 39) return boy.right()
}

/* ----- RENDER ----- */
window.onload = () => {
    document.querySelector('#play').onclick = function() {
        startGame();
        boy = new Character(105 , 225, images.boy)
    };

    boardLeft = new Map(100, level1)
    boardRight = new Map(550, level2)
    boardLeft.draw()
    boardRight.draw()

    function startGame() {
        if (interval) return
        interval = setInterval(update, 1000 / 1)
    }
}

function update() {
    frames++
    ctx.clearRect(0, 0, 900, 600)
    boardLeft.draw()
    boardRight.draw()
    boy.draw()
}