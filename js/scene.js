export class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    init() { }

    preload() {
        this.load.image('background', './images/Background.png')
        this.load.spritesheet('player', './images/Ruan.png' ,{
            frameWidth:1500, 
            frameHeight: 1000
        })
        this.load.spritesheet('ground', './images/Platform.png', {
            frameWidth:1500,
            frameHeight: 1000
        });
        }
    

    create() {
        this.createAnimations();

        this.scene.start('Level001');
    }

    createAnimations(){
        this.anims.create({
            key:'walking',
            frames: this.anims.generateFrameNames('player',{
                frames:[0,1,2,3]
            }),
            frameRate:4,
            yoyo:true,
            repeat: -1
        });
    }

    update(time) { }
     
}