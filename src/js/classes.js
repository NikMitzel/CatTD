class PlacementTile {
    constructor({position = {x: 0, y: 0}} ){
        this.position = position
        this.size = 64
        this.color = 'rgba(255,255,255, .2)'
        this.occupied = false
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update (mouse){
        this.draw()
        if  (mouse.x > this.position.x && mouse.x < this.position.x + this.size && 
            mouse.y > this.position.y && mouse.y < this.position.y + this.size) {
              this.color = 'rgba(255,255,255, .5)'
        }else this.color = 'rgba(255,255,255, .2)'
    }
}

class Enemy {
    constructor( {position = {x: 0, y: 0}} ) {
        this.position = position
        this.width = 100
        this.height = 100
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.radius = 50
        this.health = 100
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 2
        this.worth = 25
    }

    draw() {
        c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.beginPath()
        c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        c.fill()
        
        //health bar
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y - 15, this.width, 10)

        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100, 10)
    }

    update() {
        this.draw()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y 
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance)

        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sin(angle) * this.speed

        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y 
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }


        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x)&&
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y)&&
            this.waypointIndex < waypoints.length - 1
          ) {
            this.waypointIndex++
        }

    }
}



