class Arpoon extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y, arpoon){
        super(scene,x,y, 'arpoon');
    }

    fire(x,y){
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-900);
    }
}

class ArpoonGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Arpoon,
            frameQuantity: 30,
            active: false,
            visible: true,
            key: 'arpoon'
        })
    }
    fireArpoon(x, y){
        const arpoon = this.getFirstDead(false);
        if (arpoon){
            arpoon.fire(x,y);
        }
    }
}

export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(0.9);

        this.initialFrame = frame;

        this.horizontal_velocity = 400;

        this.controls = scene.input.keyboard.createCursorKeys();
    
        this.onLadder= false;

        this.lives = 3;

        this.state="stopped";
        this.previous_state=this.state;

        this.arpoonGroup;

    }
    preload(){
        this.load.image('arpoon','./images/arpao.png');
    }

    create(){
        this.laserGroup= new this.ArpoonGroup(this);
    }

    setOnLadder(value){
        this.onLadder = value;
    }

    update(time){

        let onGround = 
        this.body.blocked.down || this.body.touching.down

        this.body.allowGravity = !this.onLadder;

        if(this.controls.left.isDown){
            this.setVelocityX(-this.horizontal_velocity);
            this.flipX = true;
            if(onGround){
            this.state= "walking";
            }

        }else if(this.controls.right.isDown){
            this.setVelocityX(this.horizontal_velocity);
            this.flipX = false;
            if(onGround){
                this.state= "walking";
            }
        }else{
            this.setVelocityX(0);
            if(onGround){
            this.state = "stopped";
            }
        }
  
        if(this.onLadder){
            if(this.controls.up.isDown){
                this.setVelocityY(-this.horizontal_velocity);
                this.state = "climbing";
              
            }else if(this.controls.down.isDown){
                this.setVelocityY(this.horizontal_velocity);
                this.state = "climbing";

            }else{
                this.setVelocityY(0);
                this.state = "stopped";
            }
        }
        if(this.state != this.previous_state){
            this.previous_state = this.state;
            if(this.anims.isPlaying){
                this.anims.stop();
            }

            if(this.state == 'walking'){
                this.anims.play('walking');
            }else if(this.state == 'climbing'){
                this.anims.play('climbing');
            }else if(this.state == 'stopped'){
                this.setFrame(this.initialFrame);
            }
        }
        if(this.controls.space.isDown){
            this.shootArpoon();
        }

    }

   shootArpoon(){
       this.arpoonGroup.fireArpoon(this.player.x, this.player.y -20);
   }

    hit() {
        this.lives--;
    }

    isDead() {
        return this.lives === 0;
    }

    getLives() {
        return this.lives;
    }
}