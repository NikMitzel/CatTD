class Cat extends Sprite{
    constructor({position = {x:0,y:0}}){
        super({
            position,
            imageSrc: './img/FlameTailSprite.png',
            frames: {
                max: 12
            },
            offset:{
                x: -20,
                y: -50
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
        if(this.target || (!this.target && this.frames.current !==0)) super.update()
        if(this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0) this.shoot()        
    }

    shoot() {
        this.projectiles.push(
            new Projectile({
                position: {
                    x: this.center.x -47,
                    y: this.center.y - 52
                },
                enemy: this.target
            })
        )
    
    }
}