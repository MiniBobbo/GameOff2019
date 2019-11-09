import { TsetScene } from "./scenes/TestScene";

export class LevelData {
    Name!:string;
    Goal!:string;
    WinCondition!:(scene:TsetScene)=>boolean;

}