import { LevelData } from "./LevelData";

export class C {
    static GRAVITY_Y:number = 800;
    static JUMP_STR:number = 500;
    static JUMP_SCALE:number = .5;
    static TILE_SIZE:number = 16;

    static CurrentLevel = '2';
    static CurrentLevelData:LevelData;

    static Levels:Array<string> = ['Level 1', 'Level 2'];
    static WinConditions:Array<LevelData>;

    static levelData:Array<LevelData>;
}