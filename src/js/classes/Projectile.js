class Projectile extends Sprite {
    constructor({position = {x: 0, y: 0}, enemy}) {
        super({position, imageSrc: 'assets/CatFireballsmol.png'});
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
        this.speed = 8

        this.image = new Image()
        this.image.src = 'assets/CatFireballsmol.png'
    }

    update() {
        this.draw()

        const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x)
        this.velocity.x = Math.cos(angle) * this.speed
        this.velocity.y = Math.sign(angle) * this.speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}