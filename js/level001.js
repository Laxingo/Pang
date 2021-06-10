import { Player } from './player.js';
import { Balls } from './Balls.js';

let levelData = [
    //plataforma da esquerda
    {
        x:1024 - 128,
        y: 2048 -300,
        repeat: 1,
        key: 'ground',
        frame:1,
        width: 128,
        height:128,
        physics: true
    },

    //plataforma do meio
    {  x:1024,
        y: 2048 -300,
        repeat: 3,
        key: 'ground',
        frame:0,
        width: 128,
        height:128,
        physics: true

    },
    //platafirna da direita
    {  x:1024 +384,
        y: 2048 -300,
        repeat: 1,
        key: 'ground',
        frame:2,
        width: 128,
        height:128,
        physics: false

    }
]

export class Level001 extends Phaser.Scene{
    constructor() {
        super('Level001');

    }

    init(){
        this.controls= this.input.keyboard.createCursorKeys();

        this.hearts=[];
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
            this.game.config.height * 1,
            'player', 0
        );

        this.ball1 = new Balls(
            this,
            this.game.config.width * 0.3,
            this.game.config.height * 0.3,
            'ball', 0
        )
        this.ball2 = new Balls(
            this,
            this.game.config.width * 0.6,
            this.game.config.height * 0.7,
            'ball', 0
        )

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.ball1, this.platforms);
        this.physics.add.collider(this.ball2, this.platforms);
        this.physics.add.overlap(this.player, this.ladders, this.onLadder, null, this);
        this.physics.add.overlap(this.player, this.ball1, this.onBall, null, this);
        this.physics.add.overlap(this.player, this.ball2, this.onBall, null, this);
        this.prepareHUD();


    }

    prepareHUD(){
        let nLives = this.player.getLives();

        for(let i=0; i < nLives; i++){
            this.hearts.push(
                this.add.image(128 +i * 128, 128, 'full_heart')
            );
        }
    }

    updateHUD(){
        let availableLives= this.player.getLives();

        for(let i = this.hearts.length -1; i>= availableLives; --i){
            this.hearts[i].setTexture('empty_heart');
        }
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
            1024 +384, 2048 - 620, 128, 5* 128, 'objects',1).setOrigin(0);
            let ladderTop = this.add.sprite(
                1024 +384, 2048 - 750, 'objects', 0).setOrigin(0);

                this.ladders.add(ladder);
                this.ladders.add(ladderTop);
    }

    onLadder(player, ladder){
        this.player.setOnLadder(true);
    }

    onBall(player, ball) {
        player.hit();
        if(!player.isDead()) {
            player.setPosition(
                this.game.config.width * 0.5,
                this.game.config.height * 1,
            )
        } else {
            this.scene.restart();
        }
    }



    update(time){
        this.player.update(time);
        this.player.setOnLadder(false);
        this.updateHUD();
    }
}