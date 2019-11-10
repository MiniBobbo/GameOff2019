import { LevelData } from "./LevelData";
import { TsetScene } from "./scenes/TestScene";

export class C {
    static GRAVITY_Y:number = 800;
    static JUMP_STR:number = 500;
    static JUMP_SCALE:number = .5;
    static TILE_SIZE:number = 16;

    static music:Phaser.Sound.BaseSound;

    static CurrentLevel = '2';
    static CurrentLevelData:LevelData;

    static Levels:Array<string> = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', "Level 8", 
    'Level 9', 'Level 10', 'Level 11', 'Level 12', 'Level 13'];
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
        C.CreateLevelCondition('Level 5', 'Kill ONLY the magistrate', (level:TsetScene) =>{
            if(level.enemiesKilled == 1) {
                level.events.emit('ninjadead');
            }
            if(level.magistratesKilled==1)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 6', 'Get to the flag.  Be SILENT.', (level:TsetScene) =>{
            if(level.enemiesKilled == 1 || level.loudnoise) {
                level.events.emit('ninjadead');
            }
            if(level.touchingFlag)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 7', 'Reach the flag', (level:TsetScene) =>{
            if(level.touchingFlag)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 8', 'Reach the flag.', (level:TsetScene) =>{
            if(level.touchingFlag)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 9', 'Attack the Oni from the grass.  Reach the flag.', (level:TsetScene) =>{
            if(level.touchingFlag && level.royalSamuraiKilled == 1)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 10', 'Climb the tower.', (level:TsetScene) =>{
            if(level.touchingFlag)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 11', 'Reach the other side.', (level:TsetScene) =>{
            if(level.touchingFlag)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 12', 'Poison the well.', (level:TsetScene) =>{
            if(level.touchingFlag && level.thingCollected == 1)
            return true;
            return false;
        });
        C.CreateLevelCondition('Level 13', 'Get to the flag.  Be SILENT.', (level:TsetScene) =>{
            if(level.enemiesKilled == 1 || level.loudnoise) {
                level.events.emit('ninjadead');
            }
            if(level.touchingFlag)
            return true;
            return false;
        });

    }

    static CenterOfTile(o:{x:number, y:number} ) {
        let xTile = Math.floor(o.x / C.TILE_SIZE);
        let yTile = Math.floor(o.y / C.TILE_SIZE);
        o.y = yTile * C.TILE_SIZE + (C.TILE_SIZE/2);
        o.x = xTile * C.TILE_SIZE + (C.TILE_SIZE/2);
    }

    static CreateLevelCondition(name:string, goal:string, winCondition:(scene:TsetScene)=>boolean) {
        let ld = new LevelData();
        ld.Name = name;
        ld.WinCondition = winCondition;
        ld.Goal = goal;
        C.levelData.push(ld);
    }
}