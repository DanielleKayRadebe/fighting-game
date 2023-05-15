const canvas = document.querySelector('canvas');
//used to draw shapes onto the screen
const c = canvas.getContext('2d');

//the amount of pixles we want our canvas to be
canvas.width = 1024
canvas.height = 576

//to differentiate our canvas from the browser background, canvas is now black
c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Rock {

    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 15
        this.width = 15
    }

    draw(){
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){    
        this.draw()
        this.position.x += this.velocity.x
        if(this.position.x + this.width + this.velocity.x >= canvas.width +30){
            this.velocity.x = 0
            keys.d.pressed = false
        } else this.velocity.x += 0.01
    }

}

class Paper {

    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 20
        this.width = 15
    }

    draw(){
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){    
        this.draw()
        this.position.x += this.velocity.x
        if(this.position.x + this.width + this.velocity.x >= canvas.width +30){
            this.velocity.x = 0
            keys.f.pressed = false
        } else this.velocity.x += 0.01
    }

}

class Scissors {

    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 20
        this.width = 5
    }

    draw(){
        c.fillStyle = 'gold'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){    
        this.draw()
        this.position.x += this.velocity.x
        if(this.position.x + this.width + this.velocity.x >= canvas.width +30){
            this.velocity.x = 0
            keys.g.pressed = false
        } else this.velocity.x += 0.01
    }

}

//creating object instances of our characters so that they can act independently from each-other
class Sprite {
    //constructor
    constructor({position, velocity}){
        //main property in game development objects
        //error i had, forgot to assign this.position to position
        this.position = position

        //alter our sprite position so our player and enemy move downwards
        this.velocity = velocity

        this.height = 120
    }

    //drawing our player
    draw(color){
        //makes our fighting player red
        c.fillStyle = color
        //position of the player object and the amount of pixels they take up
        //the position of the object and the size of the object
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update(){
        //whenever we call update we call draw to draw our player
        this.draw("red")
        //making our sprite fall along the y axis until it hits the ground by constantly adding
        //velocity to our y axis
        this.position.y += this.velocity.y


        //this stops our players from falling when they hit the floor
        //when our position y plus our height plus our velocity is more equal to
        //our canvas height then we stop our velocity sprite is zero and stops moving
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            //this just ensures that gravity is real so our player doesnt just chill
            //in the air so it will always fall at gravities rate which we set at 0.2
        } else this.velocity.y += gravity
    }
}

//calling the sprite class we made and creating an object of it with x and y values of 0
//so this is our first player and its called player
const player = new Sprite({
    position:{
        x:40, 
        y:0
    },
    velocity: {
        x:0,
        //how fast our player falls
        y:4
    }
})


//now we create an enemy the same way we create a player
//we ensure the position is at the opposite side of our screen by changing the x and y values
const enemy = new Sprite({
    position:{
        x:900, 
        y:100
    },
    velocity: {
        x:0,
        //how fast our player moves down along the y axis, basically falling, gravity
        y:4
    }
})

//now on our player object we call the draw method to make it visible on our canvas
//thus creating our player
// player.draw()

//we do the same with an enemy, a completely different object with the same properties as our player
//we call the draw method on our enemy to make it visible as well
//we commented this out because we call it in player and enemy update which calls draw
//for both player and enemy
//so that our objects are continuously drawn within our animation
// enemy.drawEnemy()

//printing out the enemy to our canvas
console.log(enemy)

//printing out the player onto our canvas
console.log(player)


//keys that our game uses
//all set to false until they are actually pressed
const keys = {
    d: {
        pressed: false
    },
    f: {
        pressed: false
    },
    g: {
        pressed: false
    }
}

//now we are going to create an animation loop 
//our players will fall to the bottom of the screen and be constantly moving
function animate(){
    //this is an infinite recursion loop that just keeps calling itself
    //until we tell it to stop
    //the condition below recurs the function
    window.requestAnimationFrame(animate)

    //ensuring our canvas stays black
    c.fillStyle = 'black'

    //then removing paint like effect of our players
    c.fillRect(0, 0, canvas.width, canvas.height)

    //these change the drawn position of our players constantly by 10px
    //by constantly calling draw
    player.update()
    enemy.update()

    if (keys.d.pressed){
        console.log(rock)
        rock.update()
    }
    if (keys.f.pressed){
        console.log(paper)
        paper.update()
    }
    if (keys.g.pressed){
        console.log(scissor)
        scissor.update()
    }

}

//remember to call the animate function so that our animation actually takes place
//drawing our player and enemy and updating them so that they appear animated
animate()

//creating event listener
//this will listen for keys we press and execute code assigned to the event
//on our window if we click on it and press a key it will store the key we pressed
// and now we have certain things we do in event of a certain key pressed
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            rock = new Rock({
                position:{
                    x:player.position.x + 30, 
                    y:470
                },
                velocity: {
                    x:12,
                }
            })
            break
        case 'f':
            keys.f.pressed = true
            paper = new Paper({
                position:{
                    x:player.position.x + 30, 
                    y:470
                },
                velocity: {
                    x:12,
                }
                })
                break
        case 'g':
            keys.g.pressed = true
            scissor = new Scissors({
                position:{
                x:player.position.x + 30, 
                y:470
                },
                velocity: {
                x:12,
                }
            })
            break
    }
    console.log(event.key);
})


