let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

let engine3D = new Engine3D(canvas.width / 2, canvas.height / 2)
let mouse = { x: 0, y: 0 }


if (window.innerWidth > 768) {

    engine3D.color = "blue"
    engine3D.Create()

} else {

    engine3D.x = canvas.width / 2
    engine3D.y = canvas.height * .6

    engine3D.color = "red"
    engine3D.Create()
}

draw()

function draw() {

    c.clearRect(0, 0, canvas.width, canvas.height)
    engine3D.render()
    requestAnimationFrame(draw)

}


addEventListener("mousemove", function (e) {

    mouse.x = e.clientX * devicePixelRatio
    mouse.y = e.clientY * devicePixelRatio

    let dx = mouse.x - engine3D.x
    let dy = mouse.y - engine3D.y
    engine3D.angleY = dy * .0002
    engine3D.angleX = dx * .0002

})

canvas.addEventListener("touchmove", function (e) {

    e.preventDefault()

    let touch = e.touches[0]
    let x = touch.clientX * devicePixelRatio
    let y = touch.clientY * devicePixelRatio

    let dx = x - engine3D.x
    let dy = y - engine3D.y
    engine3D.angleY = dy * .0002
    engine3D.angleX = dx * .0002
})