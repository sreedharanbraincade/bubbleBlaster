const config = {
    type: Phaser.AUTO,
    width: 724,
    height: 350,
    backgroundColor: "000000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0,
            },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

let bubbles;
let spawnTimer = 0;
const spawnInterval = 1; // 3 seconds
let bubbleCount = 0; // Initialize the bubble count variable outside the functions
let bubbleCountText; // Variable to hold the text object
let instructionText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('bubble1', 'assets/bubble1.png');
    this.load.image('bubble2', 'assets/bubble2.png');
    this.load.image('bubble3', 'assets/bubble3.png');
    this.load.image('bubble4', 'assets/bubble4.png');
    this.load.image('bubble5', 'assets/bubble5.png');
   this.load.image('customCursor', 'assets/cursor.png');
}

let destroyedBubbleCount = 0; // Initialize the destroyed bubble count variable outside the functions
let destroyedBubbleCountText; // Variable to hold the text object for destroyed bubbles
let startGameText;
let gameStarted=false;
function create() {
    bubbles = this.physics.add.group();

    let bg = this.add.image(0, 0, 'background');
    bg.setDisplaySize(config.width, config.height); // Set the size of the background to match the game's width and height
    bg.setOrigin(0, 0);

    // Initialize the text object at the top right of the screen for total bubbles
  bubbleCountText = this.add.text(config.width - 10, 10, `Bubbles: ${bubbleCount}`, {
    fontSize: '16px',
    fill: '#fff',
    backgroundColor: '#000000', // Set the background color to black
    padding: { left: 10, right: 10, top: 5, bottom: 5 }, // Add some padding
    borderRadius: 5
  });
  bubbleCountText.setOrigin(1, 0); // Aligns the text to the top right

    // Initialize the text object at the top left of the screen for destroyed bubbles
  destroyedBubbleCountText = this.add.text(10, 10, `Destroyed: ${destroyedBubbleCount}`, {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#000000', // Set the background color to black
      padding: { left: 10, right: 10, top: 5, bottom: 5 }, // Add some padding
      borderRadius: 5
  });


  // Display the "Start Game" text in the center of the screen
  startGameText = this.add.text(config.width / 2, config.height / 2, 'Start Game', {
      fontSize: '32px',
      fill: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
      borderRadius: 5
  });
  startGameText.setOrigin(0.5, 0.5); // Center the text
  instructionText = this.add.text(config.width / 2, config.height / 2 + 40, 'Pop the bubbles and don\'t let the bubble count on screen reach 10', {
    fontSize: '16px',
    fill: '#ffffff',
    fontStyle: 'bold',
    align: 'center',
    wordWrap: { width: config.width - 20 }
  });
  instructionText.setOrigin(0.5, 0.5); // Center the text

  // Make the text interactive and start the game when clicked
  startGameText.setInteractive();
  startGameText.on('pointerdown', startGame, this);

  this.input.setDefaultCursor('url(assets/cursor.png), pointer');
}

function update(time, delta) {
if(!gameStarted)
{
  
  return;
}
  
    spawnTimer += delta / 1000; // Convert delta to seconds

    if (spawnTimer >= spawnInterval){// && bubbleCount <= 10) { // Check bubbleCount here
        spawnBubble();
        spawnTimer = 0;
    }
  
}
function startGame() {
    // Destroy the "Start Game" text
    startGameText.destroy();

    // Destroy the instruction text
    instructionText.destroy();

    // Set the gameStarted flag to true
    gameStarted = true;

    // Start spawning bubbles
    spawnTimer = spawnInterval;
}



function spawnBubble() {
    let x = Phaser.Math.Between(0, config.width);
    let y = Phaser.Math.Between(0, config.height);

    // Array of bubble names
    let bubbleNames = ['bubble1', 'bubble2', 'bubble3', 'bubble4', 'bubble5'];

    // Select a random bubble name from the array
    let randomBubbleName = Phaser.Utils.Array.GetRandom(bubbleNames);

    if (bubbleCount >= 10) {
        showGameOverText();
        return; // Don't spawn any more bubbles
    }
  
    let bubble = bubbles.create(x, y, randomBubbleName);
    let size = Phaser.Math.Between(.5, .75);
    bubble.setScale(.6);
    bubble.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    bubble.setCollideWorldBounds(true);
    bubble.setBounce(1, 1);

  // Make the bubble interactive and destroy it when clicked
  bubble.setInteractive();
  bubble.on('pointerdown', function() {
      bubble.destroy();
      bubbleCount--;
      destroyedBubbleCount++; // Increase the destroyed bubble count
      updateBubbleCountText();
      updateDestroyedBubbleCountText(); // Update the destroyed bubble count text
  });

    bubbleCount++;
    updateBubbleCountText();
}
function showGameOverText() {
    // let gameOverText = this.add.text(config.width / 2, config.height / 2, 'YOU LOSE!', {
    //     fontSize: '32px',
    //     fill: '#ff0000',
    //     fontStyle: 'bold'
    // });
    // gameOverText.setOrigin(0.5, 0.5); // Center the text

    //Wait for 1 second and then reload the game
   location.reload();
  
    // this.time.delayedCall(1000, function() {
    //     location.reload(); // Reloads the game
    // }, [], this);
}

function updateBubbleCountText() {
    bubbleCountText.setText(`Bubbles: ${bubbleCount}`);
}

function updateDestroyedBubbleCountText() {
    destroyedBubbleCountText.setText(`Destroyed: ${destroyedBubbleCount}`);
}
