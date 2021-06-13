import{ MainScene } from "./scene.js"
import { Level001 }from "./level001.js";
import { Level002 }from "./level002.js";

const config = {
    width: 2048,
    height: 2048,
    type: Phaser.AUTO,
    parent: 'game-canvas',
    scene: [MainScene, Level001, Level002],
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