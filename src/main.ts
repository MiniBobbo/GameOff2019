import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { TsetScene } from "./scenes/TestScene";

class Main extends Phaser.Game {
    constructor() {
        const config = {
          type: Phaser.AUTO,
          width: 480,
          height: 270,
          zoom:2,
          render: {
            pixelArt:true,
          },
          physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                // debug: true
            }
          },
    
        };
        super(config);

        this.scene.add('preload', Preload, false);
        this.scene.add('test', TsetScene, false);
        this.scene.start('preload');
    }
}


window.onload = () => {
    const GameApp: Phaser.Game = new Main();
};