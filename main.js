// canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// images
const images = {
    blTile: './assets/images/tile-blue.png',
    orTile: './assets/images/tile-orange.png',
    piTile: './assets/images/tile-pink.png',
    spTile: './assets/images/tile-gray.png',
    grTile: './assets/images/tile-green.png'
}

// levels
const level1 = {
    width: 3,
    height: 3,
    map: [
        ['B', 'B', 'B'],
        ['O', 'O', 'O'],
        ['B', 'B', 'B']
    ],
    exit: [4, 2]
}

// maps
class Map {
    constructor(obj) {

    }
    draw() {
        
    }
}

// tiles
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

window.onload = () => {
    level1.map.forEach((array, i) => {
        array.forEach((tile, j) => {
            switch (tile) {
                case 'B':
                    new Tile(100 + j * 55, 100 + i * 55, images.blTile)
                    break
                case 'O':
                    new Tile(100 + j * 55, 100 + i * 55, images.orTile)
                    break
            }
        })
    })
    new Tile(
            100 + (level1.exit[0] - 1) * 55, 
            100 + (level1.exit[1] - 1) * 55, 
            images.spTile
            )
}