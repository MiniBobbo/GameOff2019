import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { TsetScene } from "./scenes/TestScene";
import { MenuScene } from "./scenes/MenuScene";
import { C } from "./C";
import { LevelData } from "./LevelData";

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
        let l1 = new LevelData();
        l1.Goal = 'Kill the samurai';
        l1.Name = 'Level 1';
        l1.WinCondition = (level:TsetScene) =>{
          if(level.enemiesKilled == 1)
            return true;
            return false;
        };
        C.levelData.push(l1);

        let l2 = new LevelData();
        l2.Goal = 'Kill both samurai and reach the flag';
        l2.Name = 'Level 2';
        l2.WinCondition = (level:TsetScene) =>{
          if(level.enemiesKilled == 2 && level.touchingFlag)
            return true;
            return false;
        };
        C.levelData.push(l2);

        this.scene.add('preload', Preload, false);
        this.scene.add('menu', MenuScene, false);
        this.scene.start('preload');
    }
}


window.onload = () => {
    const GameApp: Phaser.Game = new Main();
};