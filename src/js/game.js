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


function spawnEnemies(spawnCount){
    for (let i = 1; i < spawnCount +1; i++) {
        const xOffset = i * 150
        enemys.push(new Enemy({
            position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
        })
        )
    }
}



const cats = []
let activeTile = undefined
let enemyCount = 2

spawnEnemies(enemyCount)


function animate() {
    requestAnimationFrame(animate)

    c.drawImage(image, 0, 0)
    for (let i = enemys.length - 1; i >= 0; i--) {
        const enemy = enemys[i]
        enemy.update()
    }

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    cats.forEach(cat => {
        cat.update()
        cat.target = null
        const enemysInRadius = enemys.filter((enemy) => {
            const xDistance = enemy.center.x - cat.center.x
            const yDistance = enemy.center.y - cat.center.y
            const distance = Math.hypot(xDistance, yDistance)
            return distance < enemy.radius + cat.shootRadius
        })
        cat.target = enemysInRadius[0]

        for (let i = cat.projectiles.length - 1; i >= 0; i--) {
            const projectile = cat.projectiles[i]
            projectile.update()

            const xDistance = projectile.enemy.center.x - projectile.position.x
            const yDistance = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDistance, yDistance)

            //when a projektile hits an enemy
            if (distance < projectile.enemy.radius + projectile.radius) {
                //enemy health and removal
                projectile.enemy.health -= 20
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemys.findIndex((enemy) =>{
                        return projectile.enemy === enemy
                    })

                    if(enemyIndex > -1) enemys.splice(enemyIndex, 1)
                }

                //tracking total amount of enemies
                if (enemys.length === 0){
                    enemyCount ++
                    spawnEnemies(enemyCount)
                }
                cat.projectiles.splice(i, 1)
            }
        }
    })


}

const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('click', (event) => {
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