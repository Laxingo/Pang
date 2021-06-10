/*export class Arpoon extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.controls = scene.input.keyboard.createCursorKeys();

        this.arpoonCount = 0;
    }

    update(time){
        if(this.controls.space.isDown){
            ShootArpoon();
        }
        this.setVelocityX(1000);
    }

    ShootArpoon(){
         this.setVelocityX(-this.velocity);
        if(this.arpoonCount >= 2)
        { 
            return;
        } else {
        this.arpoonCount = this.arpoonCount + 1;
        
        var arpoon = this.add.image(this.player.x, 1000, 'arpoon').setOrigin(0).setScale(10);
        arpoon.scaleY=0;
        this.physics.add.overlap(arpoon,this.groupBall,this.hitArpoon,null,this);
        }
    }
}*/