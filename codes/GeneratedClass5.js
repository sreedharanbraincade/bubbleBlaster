
Here's a basic implementation of the PowerUpController in Phaser 3:
```javascript
class PowerUpController {
 constructor(scene, player) {
 this.scene = scene;
 this.player = player;
 this.powerUpCount = 5;
 this.powerUpSpawnRate = 1000; // in milliseconds
 this.powerUpGroup = null;
 this.powerUpSpawnTime = 0;
 this.initialize();
 }
 initialize() {
 this.powerUpGroup = this.scene.physics.add.group();
 }
 update(time) {
 if (time > this.powerUpSpawnTime) {
 this.createPowerUp();
 this.powerUpSpawnTime = time + this.powerUpSpawnRate;
 }
 this.scene.physics.overlap(
 this.player,
 this.powerUpGroup,
 this.collectPowerUp,
 null,
 this
 );
 this.powerUpGroup.children.each(powerUp => {
 powerUp.update();
 });
 }
 createPowerUp() {
 const powerUp = this.scene.physics.add.sprite(
 Phaser.Math.Between(0, this.scene.sys.game.config.width),
 0,
 'powerUp'
 );
 this.powerUpGroup.add(powerUp);
 powerUp.setVelocity(0, 100);
 }
 collectPowerUp(player, powerUp) {
 powerUp.disableBody(true, true);
 this.powerUpCount--;
 // Apply power-up effect to the player
 // This can be modified to apply different effects based on the type of power-up
 player.setScale(player.scaleX + 0.1);
 if (this.powerUpCount === 0) {
 this.powerUpSpawnRate *= 0.8; // Decrease spawn rate after collecting a power-up
 }
 }
}
```
This script creates a PowerUpController class that handles the creation, collection, and application of power-ups. The power-ups are created at a specified spawn rate and are applied to the player when collected. The player's size is increased when a power-up is collected as an example of a power-up effect.
Please note that you need to have a sprite sheet or image with the key 'powerUp' in your Phaser game for this script to work. You also need to create a player object and pass it to the PowerUpController.
This script is a starting point and can be extended and modified to fit your specific game requirements.