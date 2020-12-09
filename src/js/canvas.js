import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousedown', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('mouseup', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Pendulum {
  constructor(anchor_x, anchor_y, arm_len1, start_theta1, arm_len2, start_theta2, mass1, mass2) {
    this.time_scale = .01
    this.gravity = 9.8

    this.anchor_x = anchor_x
    this.anchor_y = anchor_y
    this.arm_len1 = arm_len1
    this.arm_len2 = arm_len2
    this.theta1 = start_theta1
    this.theta2 = start_theta2
    this.mass1 = mass1
    this.mass2 = mass2
    this.bob_radius1 = mass1 * .5
    this.bob_radius2 = mass2 * .5

    this.bob_x1 = this.anchor_x + this.arm_len1 * Math.sin(this.theta1)
    this.bob_y1 = this.anchor_y + this.arm_len1 * Math.cos(this.theta1)
    this.bob_x2 = this.bob_x1 + this.arm_len2 * Math.sin(this.theta2)
    this.bob_y2 = this.bob_y1 + this.arm_len2 * Math.cos(this.theta2)
    this.angular_acceleration1 = 0
    this.angular_velocity1 = 0
    this.angular_acceleration2 = 0
    this.angular_velocity2 = 0
  }

  draw() {
    //Bob 1
    c.beginPath()
    c.moveTo(this.anchor_x, this.anchor_y)
    c.lineTo(this.bob_x1, this.bob_y1)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(this.bob_x1, this.bob_y1, this.bob_radius1, 0, 2*Math.PI, false)
    c.fill()
    c.closePath()

    //Bob 2
    c.beginPath()
    c.moveTo(this.bob_x1, this.bob_y1)
    c.lineTo(this.bob_x2, this.bob_y2)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(this.bob_x2, this.bob_y2, this.bob_radius2, 0, 2 * Math.PI, false)
    c.fill()
    c.closePath()
  }

  update() {
    this.bob_x1 = this.anchor_x + this.arm_len1 * Math.sin(this.theta1)
    this.bob_y1 = this.anchor_y + this.arm_len1 * Math.cos(this.theta1)

    this.bob_x2 = this.bob_x1 + this.arm_len2 * Math.sin(this.theta2)
    this.bob_y2 = this.bob_y1 + this.arm_len2 * Math.cos(this.theta2)

    // this.angular_velocity1 *= .998
    // this.angular_velocity2 *= .998
    
    this.angular_acceleration1 = ((-this.gravity * (2 * this.mass1 + this.mass2) * Math.sin(this.theta1)
    - this.mass2 * this.gravity * Math.sin(this.theta1 - 2 * this.theta2)
    - 2 * Math.sin(this.theta1 - this.theta2) * this.mass2 
    * (Math.pow(this.angular_velocity2, 2) * this.arm_len2 + Math.pow(this.angular_velocity1, 2) * this.arm_len1 * Math.cos(this.theta1 - this.theta2)))
    / (this.arm_len1 * (2 * this.mass1 + this.mass2 - this.mass2 * Math.cos(2 * this.theta1 - 2 * this.theta2)))) * this.time_scale
    
    this.angular_acceleration2 = ((2 * Math.sin(this.theta1 - this.theta2) 
    * (Math.pow(this.angular_velocity1, 2) * this.arm_len1 * (this.mass1 + this.mass2)
    + this.gravity * (this.mass1 + this.mass2) * Math.cos(this.theta1)
    + Math.pow(this.angular_velocity2, 2) * this.arm_len2 * this.mass2 * Math.cos(this.theta1 - this.theta2)))
    / (this.arm_len2 * ((2 * this.mass1 + this.mass2 - this.mass2 * Math.cos(2 * this.theta1 - 2 * this.theta2))))) * this.time_scale
    
    this.angular_velocity1 += this.angular_acceleration1
    this.angular_velocity2 += this.angular_acceleration2
    this.theta1 += this.angular_velocity1
    this.theta2 += this.angular_velocity2

    this.draw()
  }
}

// Implementation
let objects
function init() {
  objects = [new Pendulum(canvas.width / 2, canvas.height / 2, 100, Math.PI/2, 100, Math.PI, 10, 10)]

  // for (let i = 0; i < 400; i++) {
  //    objects.push()
  // }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  objects.forEach(object => {
   object.update()
  })
}

init()
animate()
