import { C } from "../C";
import { BGFactory } from "../BGFactory";

export class OptionsScene extends Phaser.Scene {
    songtitle!:Phaser.GameObjects.Text;
    bgs!:Array<Phaser.GameObjects.TileSprite>;
    ninja!:Phaser.GameObjects.Sprite;
    preload() {

    }

    create() {
        this.bgs = [];
        let title = this.add.text(0,30,'Ninja Training Simulator', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setScrollFactor(0,0)
        .setDepth(50)
        .setFontSize(40).setWordWrapWidth(480);

        this.ninja = this.add.sprite(100,100,'mainatlas', 'ninja_stand_0')
        .setScrollFactor(0,0)
        .setDepth(50)
        .setTint(C.GetNinjaColor());

        let clear = this.add.text(0,85,'Reset Times', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(20).setWordWrapWidth(480)
        .on('pointerdown',  () => {localStorage.clear();});

        let changeColor = this.add.text(0,110,'Change Ninja Color', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(20).setWordWrapWidth(480)
        .on('pointerdown',  () => {this.NextColor();});

        let changeBG = this.add.text(0,135,'Change Background', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(20).setWordWrapWidth(480)
        .on('pointerdown',  () => {this.NextBG();});

        let back = this.add.text(0,210,'Back to menu', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(20).setWordWrapWidth(480)
        .setScrollFactor(0,0)
        .setDepth(50)
        .setInteractive()
        .on('pointerdown',  () => { this.scene.start('menu');});

        // //@ts-ignore
        // this.songtitle = this.add.text(0,120, 'Change Background Music', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        // .setFixedSize(480,0)
        // .setScrollFactor(0,0)
        // .setDepth(50)
        // .setFontSize(20).setWordWrapWidth(480)
        // .setInteractive()
        // .on('pointerdown',  () => {this.SongUp(); });

        BGFactory.ChangeBG(this, this.bgs, C.GetBG());
    }

    SongUp() {
        C.songnum++;
        if(C.songnum >= C.songs.length)
        C.songnum = 0;
        C.music.destroy();
        C.music = this.sound.add(C.songs[C.songnum]);
        // this.songtitle.text = C.songs[C.songnum];
        C.music.play();
        C.music.on('complete', () => {
            C.music.play();
        }, this);


    }

    NextColor() {
        C.CurrentNinjaColor++;
        if(C.CurrentNinjaColor >= C.NinjaColorList.length)
            C.CurrentNinjaColor = 0;
        this.ninja.setTint(C.GetNinjaColor());
    }

    NextBG() {
        C.CurrentBG++;
        if(C.CurrentBG >= C.BGList.length)
            C.CurrentBG = 0;
        this.ninja.setTint(C.GetNinjaColor());
        BGFactory.ChangeBG(this, this.bgs, C.GetBG());
    }

    SongDwon() {
        C.songnum--;
        if(C.songnum <0)
        C.songnum = C.songs.length -1;
        C.music.destroy();
        C.music = this.sound.add(C.songs[C.songnum]);
        // this.songtitle.text = C.songs[C.songnum];
        C.music.play();
        C.music.on('complete', () => {
            C.music.play();
        }, this);

    }

    update(time:number, dt:number) {
        this.cameras.main.scrollX -= 100 * dt/1000;
        this.bgs.forEach(element => {
            element.emit('update');
        });
    }

}