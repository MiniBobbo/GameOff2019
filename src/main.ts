import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { TsetScene } from "./scenes/TestScene";
import { MenuScene } from "./scenes/MenuScene";
import { C } from "./C";
import { LevelData } from "./LevelData";
import { RestartScene } from "./scenes/RestartScene";
import { OptionsScene } from "./scenes/OptionsScene";

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

        C.levelData = [];
        C.CreateLevelData();
        this.scene.add('restart', RestartScene, false);
        this.scene.add('preload', Preload, false);
        this.scene.add('menu', MenuScene, false);
        this.scene.add('options', OptionsScene, false);
        this.scene.start('preload');
    }
}


window.onload = () => {
    const GameApp: Phaser.Game = new Main();
};