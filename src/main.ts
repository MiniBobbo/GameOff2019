import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { FontScene } from "./scenes/FontScene";

class Main extends Phaser.Game {
    constructor() {
        const config = {
          type: Phaser.AUTO,
          width: 480,
          height: 270,
          zoom:2,
          render: {
            pixelArt:true,
          }
        };
        super(config);

        this.scene.add('preload', Preload, false);
        this.scene.add('font', FontScene, false);
        this.scene.start('preload');
    }
}


window.onload = () => {
    const GameApp: Phaser.Game = new Main();
};