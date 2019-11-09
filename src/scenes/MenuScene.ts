import { TsetScene } from "./TestScene";
import { C } from "../C";
import { LevelData } from "../LevelData";

export class MenuScene extends Phaser.Scene {
    levels!:Array<Phaser.GameObjects.Container>;
    totalTimes:number = 0;
    AllLevelsComplete = true;

    preload() {

    }

    create() {
        this.AllLevelsComplete = true;
        this.totalTimes = 0;
        let title = this.add.text(0,30,'Ninja Training Simulator', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(40).setWordWrapWidth(480);
        let clearData = this.add.text(0,0,'Clear Saved Data', { fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(12)
        .setInteractive()
        .on('pointerdown', ()=> {
            localStorage.clear();
            this.scene.start('menu');
        }, this);
        this.levels = [];

        C.Levels.forEach(element => {
            let group = this.add.container(0,0);
            let g = this.add.graphics({
                x:0,
                y:0
            });
            g.lineStyle(2, 0xffffff);
            g.strokeRect(0,0, 90, 45);
            group.add(g);
            let time = localStorage.getItem(element);
            if (time == null) {
                time = '---';
                this.AllLevelsComplete = false;
            } else {
                this.totalTimes += parseFloat(time);
            } 


            let start = this.add.text(2,2,`${element}\n${time}`, {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
            .setFixedSize(90,45).setInteractive();
            start.on('pointerdown', () => {
                C.CurrentLevel = element;
                this.StartLevel();
            }, this);
            group.add(start);
            this.levels.push(group);
        }); 

        
        Phaser.Actions.GridAlign(this.levels, {
            x:110,
            y: 100,
            cellWidth:100,
            cellHeight:50,
            width: 360,
            height:150
        });

        let totalTime = this.add.text(0,240,'Total Time: ---', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(20)
        .setWordWrapWidth(480);
        if(this.AllLevelsComplete) {
            totalTime.text = `Total Time: ${this.totalTimes}`;
        }

    }

    StartLevel() {
        
        let data = C.levelData.find((d:LevelData) => { return d.Name == C.CurrentLevel});
        if(data == null) {
            throw `Missing level data for ${C.CurrentLevel}`;
            return;
        }
        C.CurrentLevelData = data;

        this.scene.remove('test');
        this.scene.add('test', TsetScene, false);
        this.scene.start('test');
    }
}