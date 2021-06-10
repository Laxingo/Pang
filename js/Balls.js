export class Balls extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.initialFrame = frame;
        this.setCollideWorldBounds(true);
        this.setScale(1);
        this.setBounce(1.0);
        this.initial_velocity = {
            min: {
                x: -1000,
                y: -100,
            },
            max: {
                x: 50,
                y: -10,
            }
        }
        this.setVelocity(
            Phaser.Math.Between(
                this.initial_velocity.min.x,
                this.initial_velocity.max.x
        ),
            Phaser.Math.Between(
                this.initial_velocity.min.y,
                this.initial_velocity.max.y
            )
        );
    }
}