class Engine3D {

    constructor(x, y) {

        this.x = x
        this.y = y
        this.angleX = Math.PI / 180
        this.angleY = Math.PI / 180
        this.angleZ = Math.PI / 180
        this.balls = []
        this.ballsize = 150
        this.offset = 150
        this.fl = 500
        this.color = undefined
    }

    Create() {

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                for (let k = -1; k <= 1; k++) {

                    let ball = new Ball(0, 0, this.ballsize, this.color)
                    ball.xpos = j * this.offset
                    ball.ypos = i * this.offset
                    ball.zpos = k * this.offset
                    this.balls.push(ball)
                }
            }
        }
    }

    render() {

        this.balls.sort((a, b) => b.zpos - a.zpos)

        this.rotateX()
        this.rotateY()
        this.rotateZ()
        this.setPerspective()

        this.balls.forEach(ball => {
            ball.draw()
        })
    }

    rotateX() {

        this.balls.forEach(ball => {

            let sin = Math.sin(this.angleX)
            let cos = Math.cos(this.angleX)

            let y1 = ball.ypos * cos - ball.zpos * sin
            let z1 = ball.zpos * cos + ball.ypos * sin

            ball.ypos = y1
            ball.zpos = z1

        })

    }

    rotateY() {

        this.balls.forEach(ball => {

            let sin = Math.sin(this.angleY)
            let cos = Math.cos(this.angleY)

            let x1 = ball.xpos * cos - ball.zpos * sin
            let z1 = ball.zpos * cos + ball.xpos * sin

            ball.xpos = x1
            ball.zpos = z1
        })

    }

    rotateZ() {

        this.balls.forEach(ball => {

            let sin = Math.sin(this.angleZ)
            let cos = Math.cos(this.angleZ)

            let x1 = ball.xpos * cos - ball.ypos * sin
            let y1 = ball.ypos * cos + ball.xpos * sin

            ball.xpos = x1
            ball.ypos = y1

        })

    }

    setPerspective() {

        this.balls.forEach(ball => {

            if (ball.zpos > -this.fl) {

                let scale = this.fl / (this.fl + ball.zpos)
                ball.size = this.ballsize * scale
                ball.x = this.x + ball.xpos * scale
                ball.y = this.y + ball.ypos * scale

            }
        })
    }
}