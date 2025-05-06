class Ball {

    constructor(x, y, size, color) {

        this.x = x
        this.y = y
        this.xpos = 0
        this.ypos = 0
        this.zpos = 0
        this.size = size
        this.color = color
       
    }

    draw() {

        var gradient = c.createRadialGradient(this.x - this.size / 5, this.y - this.size / 5, this.size / 50, this.x, this.y, this.size * .6)

        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "black")

        c.beginPath()
        c.fillStyle = gradient
        c.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI)
        c.fill()
        c.closePath()

    }
}