import { Player } from './player.js';
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

        this.add.image(0, 0, 'background').setOrigin(0);

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player', 0
        ).setScale(0.15);

        let plat = this.add.tileSprite(1024, 2048 - 1300, 3* 1500, 1000, 'ground', 0).setScale(2);
        this.platforms.add(plat);
        
    }

    update(time){
        this.player.update(time);
    }
}