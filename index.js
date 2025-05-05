let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

let balls = []
let center = { x: 0, y: 0 }
let ballsize , offset , fl , step , ballcolor
let angleX = Math.PI / 180
let angleY = Math.PI / 180
let angleZ = Math.PI / 180
let mouse = { x: 0, y: 0 }


if (window.innerWidth > 768) {

    center.x = canvas.width/2
    center.y = canvas.height/2
    ballsize = 100
    offset = 100
    fl = 500
    step = 1
    ballcolor = "blue"

}else{

    center.x = canvas.width/2
    center.y = canvas.height * .6

    ballsize = 100
    offset = 100
    fl = 300
    step = 1
    ballcolor = "red"
}


CreateBalls()

draw()

function CreateBalls() {

    for (let x = -1; x <= 1; x+=step) {
        for (let y = -1; y <= 1; y+=step) {
            for (let z = -1; z <= 1; z+=step) {
                let ball = new Ball(0, 0, ballsize, ballcolor);
                ball.xpos = x * offset;
                ball.ypos = y * offset;
                ball.zpos = z * offset;
                balls.push(ball);
            }
        }
    }
}

function drawCenter() {
    c.save()
    c.translate(center.x, center.y)
    c.beginPath()
    c.strokeStyle = "red"
    c.moveTo(0, -10)
    c.lineTo(0, 10)
    c.moveTo(-10, 0)
    c.lineTo(10, 0)
    c.stroke()
    c.closePath()
    c.restore()
}

function draw() {

    c.clearRect(0, 0, canvas.width, canvas.height)

    balls.sort((a, b) => b.zpos - a.zpos)

    //draw center
    drawCenter()

    balls.forEach(ball => {

        rotateX(ball, angleX)
        rotateY(ball, angleY)
        rotateZ(ball, angleZ)
        setPerspective(ball)

        ball.draw()
    })

    requestAnimationFrame(draw)

}


function rotateX(ball, angle) {

    let sin = Math.sin(angle)
    let cos = Math.cos(angle)

    let y1 = ball.ypos * cos - ball.zpos * sin
    let z1 = ball.zpos * cos + ball.ypos * sin

    ball.ypos = y1
    ball.zpos = z1
}

function rotateY(ball, angle) {

    let sin = Math.sin(angle)
    let cos = Math.cos(angle)

    let x1 = ball.xpos * cos - ball.zpos * sin
    let z1 = ball.zpos * cos + ball.xpos * sin

    ball.xpos = x1
    ball.zpos = z1


}

function rotateZ(ball, angle) {

    let sin = Math.sin(angle)
    let cos = Math.cos(angle)

    let x1 = ball.xpos * cos - ball.ypos * sin
    let y1 = ball.ypos * cos + ball.xpos * sin

    ball.xpos = x1
    ball.ypos = y1
}

function setPerspective(ball) {

    if (ball.zpos > -fl) {

        let scale = fl / (fl + ball.zpos)
        ball.size = ballsize * scale
        ball.x = center.x + ball.xpos * scale
        ball.y = center.y + ball.ypos * scale

    }
}

addEventListener("mousemove", function (e) {

    mouse.x = e.clientX * devicePixelRatio
    mouse.y = e.clientY * devicePixelRatio

    let dx = mouse.x - center.x 
    let dy = mouse.y - center.y 
    angleY = dy * .0002
    angleX = dx * .0002

})

canvas.addEventListener("touchmove", function (e) {

    e.preventDefault()

    let touch = e.touches[0]
    let x = touch.clientX * devicePixelRatio
    let y = touch.clientY * devicePixelRatio

    let dx = x - center.x 
    let dy = y - center.y 
    angleY = dy * .0002
    angleX = dx * .0002
})