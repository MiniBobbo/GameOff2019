import { LevelData } from "./LevelData";
import { TsetScene } from "./scenes/TestScene";

export class C {
    static GRAVITY_Y:number = 800;
    static JUMP_STR:number = 500;
    static JUMP_SCALE:number = .5;
    static TILE_SIZE:number = 16;

    static CurrentLevel = '2';
    static CurrentLevelData:LevelData;

    static Levels:Array<string> = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
    static WinConditions:Array<LevelData>;

    static levelData:Array<LevelData>;

    static CreateLevelData() {
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

        C.CreateLevelCondition('Level 3', 'Kill the samurai', (level:TsetScene) =>{
            if(level.enemiesKilled == 1)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 4', 'Reach the flag', (level:TsetScene) =>{
            if(level.touchingFlag)
            return true;
            return false;
        });

    }

    static CreateLevelCondition(name:string, goal:string, winCondition:(scene:TsetScene)=>boolean) {
        let ld = new LevelData();
        ld.Name = name;
        ld.WinCondition = winCondition;
        ld.Goal = goal;
        C.levelData.push(ld);
    }
}