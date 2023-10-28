As a text-based AI, I can't create a full game, but I can provide you with a basic structure and guidance on how to create an ObstacleController class in Phaser 3.
```javascript
class ObstacleController {
 constructor(scene, obstacleSpeed, obstacleCount) {
 this.scene = scene;
 this.obstacleSpeed = obstacleSpeed;
 this.obstacleCount = obstacleCount;
 this.obstacleGroup = this.scene.physics.add.group();
 this.obstacleSpawnTime = 0;
 }
 createObstacles() {
 for (let i = 0; i < this.obstacleCount; i++) {
 let obstacle = this.scene.physics.add.sprite(100 + i * 100, 200, 'obstacle');
 this.obstacleGroup.add(obstacle);
 obstacle.setVelocityX(-this.obstacleSpeed);
 }
 }
 update(time) {
 if (time > this.obstacleSpawnTime) {
 this.createObstacles();
 this.obstacleSpawnTime = time + 2000; // Adjust the time between obstacle spawns here
 }
 this.obstacleGroup.children.iterate(child => {
 if (child.x < -child.width) {
 child.x = 1000; // Reset the position of the obstacle when it goes off-screen
 }
 });
 }
}
```
In your main game scene, you can initialize the ObstacleController like this:
```javascript
class MainScene extends Phaser.Scene {
 constructor() {
 super({ key: 'MainScene' });
 }
 preload() {
 this.load.image('obstacle', 'path/to/obstacle/image.png');
 }
 create() {
 this.obstacleController = new ObstacleController(this, 200, 5);
 }
 update(time) {
 this.obstacleController.update(time);
 }
}
```
This is a basic structure for an ObstacleController class in Phaser 3. You can extend and modify it to fit your specific game requirements. For example, you can create different types of obstacles, handle collisions, or add a scoring system.