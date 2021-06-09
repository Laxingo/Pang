export class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    init() { }

    preload() {
        this.load.image('background', './images/cenario.png')
        this.load.spritesheet('player', './images/ruan.png' ,{
            frameWidth:128, 
            frameHeight: 144
        })
        this.load.spritesheet('ground', './images/plataform.png', {
            frameWidth:128,
            frameHeight: 128
        });
        this.load.spritesheet('objects', './images/Rope.png',{
            frameWidth:128,
            frameHeight: 128
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