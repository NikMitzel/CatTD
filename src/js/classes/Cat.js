class Cat extends Sprite{
    constructor({position = {x:0,y:0}}){
        super({
            position,
            imageSrc: './img/FlameTailSprite.png',
            frames: {
                max: 12
            }
        })
        
        this.size = 64
        this.center = {
            x: this.position.x + this.size / 2,
            y: this.position.y + this.size / 2
        }
        this.projectiles = []
        this.shootRadius = 250
        this.shootingSpeed = 100
        this.target
        this.elapsedSpawnTime = 0
        this.cost = 50
    }

    draw() {
       super.draw()


        c.beginPath()
        c.arc(this.center.x, this.center.y, this.shootRadius, 0, 2 * Math.PI, false)
        c.lineWidth = 5;
        c.strokeStyle = 'rgba(192,192,255, .5)';
        c.stroke()

    }

    update(){
        this.draw()
        if (this.elapsedSpawnTime % this.shootingSpeed === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                })
            )
        }
        this.elapsedSpawnTime++
    }
}