import { Player } from './player.js';

let levelData = [
    //plataforma da esquerda
    {
        x:1024 - 128,
        y: 2048 -192,
        repeat: 1,
        key: 'ground',
        frame:1,
        width: 128,
        height:128,
        physics: true
    },

    //plataforma do meio
    {  x:1024,
        y: 2048 -192,
        repeat: 3,
        key: 'ground',
        frame:0,
        width: 128,
        height:128,
        physics: true

    },
    //platafirna da direita
    {  x:1024 +384,
        y: 2048 -192,
        repeat: 1,
        key: 'ground',
        frame:2,
        width: 128,
        height:128,
        physics: true

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
        });

        this.ladders = this.physics.add.staticGroup({
            allowGravity: false,
            immovable: true
        });

        this.add.image(0, 0, 'background').setOrigin(0).setScale(2);

        this.createPlatforms();
        this.createLadder();

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player', 0
        ).setScale(1);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.ladders, this.onLadder, null, this);
    }

    createPlatforms(){
        levelData.forEach(
            data => {
                let newPlatform = undefined;
                if(data.repeat == 1) {
                    newPlatform = this.add.sprite(data.x, data.y, data.key, data.frame);
                   
                } else{
                    newPlatform = this.add.tileSprite(data.x, data.y, data.repeat * data.width, data.height, data.key, data.frame);
                }
                newPlatform.setOrigin(0);

                if(data.physics){
                    this.platforms.add(newPlatform)
                }
            }
        )
    }

    createLadder(){
        let ladder = this.add.tileSprite(
            1024 + 256, 2048 - 768, 128, 5* 128, 'objects',1).setOrigin(0);
            let ladderTop = this.add.sprite(
                1024 + 256, 2048 - 896, 'objects', 0).setOrigin(0);

                this.ladders.add(ladder);
                this.ladders.add(ladderTop);
    }

    onLadder(player, ladder){
        this.player.setOnLadder(true);
    }

    update(time){
        this.player.update(time);
        this.player.setOnLadder(false);
    }
}