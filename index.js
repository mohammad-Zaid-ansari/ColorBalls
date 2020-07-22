let canvas = document.getElementById('ctx')
let ctx = canvas.getContext("2d")
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
// ctx.fillStyle = 'red'
// ctx.fillRect(0,0,150,200)



// Ball Class
class Ball {
    constructor(size, x, y, Vx, Vy, color) {
        this.size = size
        this.x = x
        this.y = y
        this.speedx = Vx
        this.speedy = Vy
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.speedx = -(this.speedx)
        } else if ((this.y + this.size) >= height) {
            this.speedy = -(this.speedy)
        } else if ((this.x + this.size) <= 0) {
            this.speedx = -(this.speedx)
        }
        if ((this.y + this.size) <= 0) {
            this.speedy = -(this.speedy)
            // this.y += 19
        }

        this.x += this.speedx
        this.y += this.speedy
    }

    collision() {
        for (let z = 0; z < arr.length; z++) {
            if (!(this === arr[z])) {
                const dx = this.x - arr[z].x
                const dy = this.y - arr[z].y
                const distance = Math.sqrt(dx * dx + dy * dy) //pythagoras Theorem

                if (distance < this.size + arr[z].size) {
                    arr[z].color = 'rgb(' + num1(255, 0) + ',' + num1(255, 0) + ',' + num1(255, 0) + ')'
                    this.color = 'rgb(' + num1(255, 0) + ',' + num1(255, 0) + ',' + num1(255, 0) + ')'
                    // arr[z].speedy = num1(4, 1)
                    // arr[z].speedx = num1(4, 1)
                    // this.speedx = num1(4, 1)
                    // this.speedy = num1(4, 1)
                    this.size = num1(23, 13)

                }
            }

        }

    }
}

class playBall extends Ball {
    constructor(size, x, y, Vx, Vy,color) {
        super(size, x, y, Vx, Vy,color)
    }

    

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    collision() {
        for (let z = 0; z < arr.length; z++) {
            if (!(this === arr[z])) {
                const dx = this.x - arr[z].x
                const dy = this.y - arr[z].y
                const distance = Math.sqrt(dx * dx + dy * dy) //pythagoras Theorem

                if (distance < this.size + arr[z].size) {
                    arr.splice(z-1,z)
                    
                }
            }

        }

    }

    update(){
        if ((this.x +this.size)<= 0) {
            this.x = width-10
        }else if ((this.x +this.size)>= width) {
            this.x = 0
        }
        if ((this.y + this.size)<= 0) {
            this.y = height-10
        }else if ((this.y + this.size)>= height) {
            this.y = 0
        }
    }
}














let num1 = (max, min) => {
    let num = Math.floor(Math.random() * (max - min + 1)) + min
    return num
}

let arr = []


while (arr.length < 20) {
    let size = num1(7, 5)

    let ball = new Ball(size,
        num1(width - size, 0 + size),
        num1(height - size, 0 + size),
        num1(14, 7),
        num1(14, 7),
        "rgb(" + num1(255, 0) + "," + num1(255, 0) + "," + num1(255, 0) + ")")
    arr.push(ball)
}

let playBall1 =new playBall(10, num1(width - num1(13, 8), 0 + num1(13, 8)),
    num1(height - num1(13, 8), 0 + num1(13, 8)), 7, 8,'red')
console.log(playBall1)
// arr.forEach((element,i) => {
//     element.draw()


// });

// ctx.arc(10,50,3,0,2*Math.PI)
// ctx.fillStyle = "red"
// ctx.fill()

// arr[0].draw()


// Function For Moving Balls

function move() {
    ctx.fillStyle = "rgba(0,0,0,0.2)" //this fillstyle and fillRect erase the path traced by balls as they are also called recurrently
    ctx.fillRect(0, 0, width, height)

    arr.forEach((element, i) => {
        element.draw()
        element.update()
        element.collision()

    });
    // debugger
    window.onkeydown = (e) => {
        console.log(e.key);
        let _this = playBall1        
        _this.update()

        switch (e.key) {
            
            case "w":
                _this.y += -(13)
                break;

            case "s":
                _this.y += (13) 
                break;

            case "d":
                _this.x += (13)
                break;

            case "a":
                _this.x += -(13)
                break;

            // default:
            //     console.log();
            //     _this.x = 5
            //     _this.y = 5
            //     break;
        }
        

        
    }
    playBall1.draw()
    // playBall1.update()
    playBall1.collision()
    // playBall1.x += 5
    //     playBall1.y += 5
    

    // for (let i = 0; i < arr.length; i++) {
    //     arr[i].draw()
    //     arr[i].update()
    //     arr[i].collision()

    // }


    requestAnimationFrame(move)

}
move()