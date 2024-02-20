class Projectile {
    constructor({position = {x: 0,y:0}, enemy}){
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
        this.speed = 5
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'orange'
        c.fill()
    }

    update(){
        this.draw()

        const angle = Math.atan2(this.enemy.center.y -this.position.y, this.enemy.center.x -this.position.x)
        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sign(angle) * this.speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}