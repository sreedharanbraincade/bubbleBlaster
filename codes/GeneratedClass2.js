
Here's a basic implementation of the PlayerController script in Phaser 3:
```javascript
class PlayerController {
 constructor(scene, playerSpeed, playerSize) {
 this.playerSpeed = playerSpeed;
 this.playerSize = playerSize;
 this.player = null;
 this.playerInput = null;
 this.initialize(scene);
 }
 initialize(scene) {
 // Create player game object
 this.player = scene.physics.add.sprite(100, 100, 'player');
 this.player.setCollideWorldBounds(true);
 // Set player size
 this.player.body.setSize(this.playerSize.width, this.playerSize.height);
 // Initialize player input
 this.playerInput = scene.input.keyboard.createCursorKeys();
 }
 update() {
 // Reset player's velocity
 this.player.body.setVelocity(0);
 // Horizontal movement
 if (this.playerInput.left.isDown) {
 this.player.body.setVelocityX(-this.playerSpeed);
 } else if (this.playerInput.right.isDown) {
 this.player.body.setVelocityX(this.playerSpeed);
 }
 // Vertical movement
 if (this.playerInput.up.isDown) {
 this.player.body.setVelocityY(-this.playerSpeed);
 } else if (this.playerInput.down.isDown) {
 this.player.body.setVelocityY(this.playerSpeed);
 }
 }
}
```
This script creates a player object and handles its movement based on the arrow keys. The player's speed and size can be set when creating an instance of the `PlayerController` class.
To use this script in a Phaser 3 game, you would need to create a scene and instantiate the `PlayerController` class with the scene and desired player speed and size:
```javascript
class GameScene extends Phaser.Scene {
 constructor() {
 super({ key: 'GameScene' });
 }
 preload() {
 // Load player image
 this.load.image('player', 'path/to/player/image.png');
 }
 create() {
 // Create player controller
 const playerController = new PlayerController(this, 200, { width: 32, height: 32 });
 // Update player controller in scene update loop
 this.scene.add('GameScene').events.on('update', playerController.update, playerController);
 }
}
const config = {
 type: Phaser.AUTO,
 width: 800,
 height: 600,
 physics: {
 default: 'arcade',
 arcade: {
 gravity: { y: 300 },
 debug: false
 }
 },
 scene: [GameScene]
};
const game = new Phaser.Game(config);
```
This is a basic implementation and can be extended with more features like animations, actions, and more complex movement patterns.