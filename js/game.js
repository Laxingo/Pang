import{ MainScene } from "./scene.js"
import { Level001 }from "./level001.js";

const config = {
    width: 1500,
    height: 1000,
    type: Phaser.AUTO,
    parent: 'game-canvas',
    scene: [MainScene, Level001],
    physics: {
        default: 'arcade',
        arcade: {
        gravity:{y:800},
            debug: true
        }
    },
    pixelArt: true
}

new Phaser.Game(config);