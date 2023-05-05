const canvas = document.querySelector('canvas');
//used to draw shapes onto the screen
const c = canvas.getContext('2d');

//the amount of pixles we want our canvas to be
canvas.width = 1024
canvas.height = 576

//to differentiate our canvas from the browser background, canvas is now black
c.fillRect(0, 0, canvas.width, canvas.height)

//creating object instances of our characters so that they can act independently from each-other
class Sprite {
    //constructor
    constructor({position, velocity}){
        //main property in game development objects
        //error i had, forgot to assign this.position to position
        this.position = position

        //alter our sprite position so our player and enemy move downwards
        this.velocity = velocity

        this.heightPlayer = 120
        this.heightEnemy = 170
    }

    //drawing our player
    draw(){
        //makes our fighting player red
        c.fillStyle = 'red'
        //position of the player object and the amount of pixels they take up
        //the position of the object and the size of the object
        c.fillRect(this.position.x, this.position.y, 50, this.heightPlayer);
    }

    drawEnemy(){
        //same as our player method but with the color blue instead of red
        //so that we can tell the difference between our player and enemy
        c.fillStyle = 'blue'
        //we indicate the position of our enemy and we give it a size
        //here ive made the enemy bigger than the player
        c.fillRect(this.position.x, this.position.y, 70, this.heightEnemy);
    }

    update(){
        //whenever we call update we call draw, this is for our animations
        //this means that our position.y is going to have 10 frames added to it everytime we loop
        this.draw()
        this.position.y += this.velocity.y
        //now we change the velocity from 0 to something else
        //we change the position of y constantly and make it add the value of our velocity
        //over and over again making it go down

        //so what we have done here is when we hit the 'd' key our position
        //moves forward by our x axis velocity value
        this.position.x += this.velocity.x

        if(this.position.y + this.heightPlayer + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
    }

    updateEnemy(){
        //whenever we call update we call draw, this is for our animations
        //this means that our position.y is going to have 10 frames added to it everytime we loop
        this.drawEnemy()
        this.position.y += this.velocity.y
        //now we change the velocity from 0 to something else

        if(this.position.y + this.heightEnemy + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
    }

}

//calling the sprite class we made and creating an object of it with x and y values of 0
//so this is our first player and its called player
const player = new Sprite({
    position:{
        x:0, 
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
        x:400, 
        y:100
    },
    velocity: {
        x:0,
        //how fast our player moves down along the y axis, basically falling, gravity
        y:5
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

//now we are going to create an animation loop 
//our players will fall to the bottom of the screen and be constantly moving
function animate(){
    //this is an infinite recursion loop that just keeps calling itself
    //until we tell it to stop
    //the condition below recurs the function
    window.requestAnimationFrame(animate)

    //to avoid a paint like effect we clear our rect
    //like fill rect but removes colour instead of adding
    //no longer using this because it got rid of our canvas colour

    //ensuring our canvas stays black
    c.fillStyle = 'black'

    //then removing paint like effect
    c.fillRect(0, 0, canvas.width, canvas.height)

    //these change the drawn position of our players constantly by 10px
    //by constantly calling draw
    player.update()
    enemy.updateEnemy()
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
        case 'ArrowRight':
            //if the key 'arrow right' is pressed then the velocity of our players x axis is changed
            //so our player moves forward by 1 px so long as our arrow right key is pressed down
            player.velocity.x = 1
            break
        case 'ArrowLeft':
            //if the key 'arrow left' is pressed then the velocity of our players x axis is changed
            //so our player moves back by 1 px so long as our arrow right left is pressed down
            player.velocity.x = -1
            break
    }
    console.log(event.key);
})

//second event listener that looks for key up
//so when we let go of our d key a different action is carried out
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            //if the key 'arrow right' is pressed then the velocity of our players x axis is changed back to 0
            //our players velocity of x is changed to 0 when our arrow right key is lifted 
            //our player stops moving
            player.velocity.x = 0
            break
        case 'ArrowLeft':
            //if the key 'arrow left' is pressed then the velocity of our players x axis is changed back to 0
            //our players velocity of x is changed to 0 when our left key is lifted 
            //our player stops moving
            player.velocity.x = 0
            break    
    }
    console.log(event.key);
})


