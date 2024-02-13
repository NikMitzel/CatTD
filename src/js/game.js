const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 20) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}


const placementTiles = []

placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            //add building placement tile
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * 64,
                    y: y * 64
                }
            }))
        }
    })
})

const image = new Image()
image.src = 'assets/map1.png'

image.onload = () => {
    animate()
}

const enemys = []
for (let i = 1; i < 10; i++) {
    const xOffset = i * 150
    enemys.push(new Enemy({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
    })
    )
}

const cats = []
let activeTile = undefined


function animate() {
    requestAnimationFrame(animate)

    c.drawImage(image, 0, 0)
    enemys.forEach(enemy => {
        enemy.update()
    })

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    cats.forEach(cat => {
        cat.draw()
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied) {
        cats.push(new Cat({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }
        ))
        activeTile.isOccupied = true
    }
    console.log(cats)
})

addEventListener('mousemove', (event) => {
    var canvasPos = canvas.getBoundingClientRect();
    mouse.x = event.clientX - canvasPos.left,
        mouse.y = event.clientY - canvasPos.top

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size) {
            activeTile = tile
            break
        }
    }
})