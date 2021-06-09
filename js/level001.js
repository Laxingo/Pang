import { Player } from './player.js';

let levelData = [
    {
        x:1024 - 128,
        y: 2048 -192,
        repeat: 3,
        key: 'ground',
        frame:0,
        width: 128,
        height:128
    }
]


export class Level001 extends Phaser.Scene{
    constructor() {
        super('Level001');
    }

    init(){
        this.controls= this.input.keyboard.createCursorKeys();
    }

    create(){
        this.platforms = this.physics.add.staticGroup({
            allowGravity: false,
            immovable: true
        })

        this.add.image(0, 0, 'background').setOrigin(0).setScale(2);
        this.createPlatforms();
        this.createLadder();

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player', 0
        ).setScale(2);

        this.physics.add.collider(this.player, this.platforms);
        
    }

    createPlatforms(){
        levelData.forEach(
            data => {
                let newPlatform = undefined;
                if(data.repeat == 1) {
                    newPlatform = this.add.sprite(data.x, data.y, data.key, data.frame);
                    newPlatform.setOrigin(0);
                } else{
                    newPlatform = this.add.tileSprite(data.x, data.y, data.repeat * data.width, data.height, data.key, data.frame);
                }
                this.platforms.add(newPlatform)
            }
        )
    }

    createLadder(){
        let ladder = this.add.tileSprite(
            1024 + 256, 2048 - 768, 128, 5* 128, 'objects',3).setOrigin(0);
            let ladderTop = this.add.sprite(
                1024 + 256, 2048 - 896, 'objects', 0).setOrigin(0);
        
    }

    update(time){
        this.player.update(time);
    }
}