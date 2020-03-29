// Create our application instance
var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2c3e50
});
document.body.appendChild(app.view);

// Load the bunny texture
app.loader
.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png')
    .load(startup);

function startup()
{
    var bunny = new PIXI.Sprite(app.loader.resources.bunny.texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 4;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add(function(delta)
    {
        // Rotate mr rabbit clockwise
        bunny.rotation += -0.1 * delta;
    });


// Dragging functionality
// enable the bunny to be interactive
    bunny.interactive = true;

    // changes mouse to interactive cursor
    bunny.buttonMode = true;

    // center the bunny's anchor point
    bunny.anchor.set(0.5);

    // make it bigger
    bunny.scale.set(1.75);

    // setup events for mouse + touch using
    // the pointer events
    bunny
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    
    // move the sprite to its designated position
    bunny.x = x;
    bunny.y = y;

    // add it to the stage
    app.stage.addChild(bunny);
}

function onDragStart(event) {
    // store a reference to the data

    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

// Font, Padding & Tutorial
const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: '',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 1000,
});

const richText = new PIXI.Text('Drag the Bunny!', style);
richText.x = 375;
richText.y = 25;
richText.anchor.set(0.5);

const buttonText = new PIXI.Text('Click Here!', style);
buttonText.x = 375;
buttonText.y = 625;
buttonText.anchor.set(0.5);
app.stage.addChild(richText);
app.stage.addChild(buttonText);

// Bunny Spawner
const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
greenSquare.position.set(375,550);
greenSquare.width = 150;
greenSquare.height = 50;
greenSquare.anchor.set(0.5);
greenSquare.tint = '0x00FF00';
greenSquare.alpha = 0.5
app.stage.addChild(greenSquare);

// Set the interactivity.
greenSquare.interactive = true;
greenSquare.buttonMode = true;

greenSquare
    .on('pointerdown', onButtonDown)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOff)
    .on('pointercancel', onButtonRelease)

function onButtonDown() {
    // Load texture
    const bunnieSpawn = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');

    // Create a new Sprite
    var bunnieSpawnedSprite = new PIXI.Sprite(bunnieSpawn);
    bunnieSpawnedSprite.x = Math.random() * app.screen.width;
    bunnieSpawnedSprite.y = Math.random() * app.screen.height;
    bunnieSpawnedSprite.anchor.set(0.5);

    app.ticker.add(function(delta)
    {
        bunnieSpawnedSprite.rotation += 0.1 * delta;
        
    });
    app.stage.addChild(bunnieSpawnedSprite);
 }

function onButtonOver() {
    // Change alpha to highlight
    this.alpha = 1;

}
function onButtonOff() {
    // return alhpa
    this.alpha = 0.5;

}
function onButtonRelease() {
    score =+1
}

//Reset button
const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
redSquare.position.set(375,100);
redSquare.width = 150;
redSquare.height = 50;
redSquare.anchor.set(0.5);
redSquare.tint = '#FF0000';
redSquare.alpha = 0.5
app.stage.addChild(redSquare);

// Set the interactivity.
redSquare.interactive = true;
redSquare.buttonMode = true;

redSquare
    .on('pointerdown', killSwitch)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOff)

function killSwitch() {
   window.location.reload()
};

// Counter & Text
const counterStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fontStyle: '',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 1000,
});

const counterText = new PIXI.Text('Bunny Count:', counterStyle);
counterText.x = 100;
counterText.y = 625;
counterText.anchor.set(0.5);
app.stage.addChild(counterText);

// Number of Bunnies (NEED FIXING)
var score = i;
var counter = new PIXI.Text(score, counterStyle);
counter.x = counterText.x+65;
counter.y = counterText.y+0;
counter.anchor.set(0.5);
app.stage.addChild(counter);