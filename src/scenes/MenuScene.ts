import { TsetScene } from "./TestScene";
import { C } from "../C";
import { LevelData } from "../LevelData";

export class MenuScene extends Phaser.Scene {
    levels!:Array<Phaser.GameObjects.Container>;
    totalTimes:number = 0;
    AllLevelsComplete = true;
    music!:Phaser.Sound.BaseSound;
    BoxHeight:number = 45;
    BoxWidth:number = 60;

    preload() {

    }

    create() {
        if(C.music == null) {
            C.music = this.sound.add('music');
            C.music.play();
            C.music.on('complete', () => {
                C.music.play();
                console.log('Music finished');
            }, this);
        }

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
            g.strokeRect(0,0, this.BoxWidth, 45);
            group.add(g);
            let time = localStorage.getItem(element);
            if (time == null) {
                time = '---';
                this.AllLevelsComplete = false;
            } else {
                this.totalTimes += parseFloat(time);
            } 


            let start = this.add.text(0,2,`${element}\n${time} s`, {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
            .setFixedSize(this.BoxWidth,45).setInteractive();
            start.on('pointerdown', () => {
                C.CurrentLevel = element;
                this.StartLevel();
            }, this);
            group.add(start);
            this.levels.push(group);
        }); 

        
        Phaser.Actions.GridAlign(this.levels, {
            x:50,
            y:110,
            cellWidth:65,
            cellHeight:50,
            width: 7,
            height:3
        });

        let totalTime = this.add.text(0,5,'Total Time: ---', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(20)
        .setWordWrapWidth(480);
        let hint = this.add.text(3,240,'Press R to restart a level', { fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(120,0)
        .setFontSize(12)
        .setWordWrapWidth(120);
        if(this.AllLevelsComplete) {
            totalTime.text = `Total Time: ${this.totalTimes.toFixed(2)} s`;
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