import { C } from "../C";
import { BGFactory } from "../BGFactory";

export class OptionsScene extends Phaser.Scene {
    songtitle!:Phaser.GameObjects.Text;
    bgs!:Array<Phaser.GameObjects.TileSprite>;
    ninja!:Phaser.GameObjects.Sprite;
    songDesc!:Phaser.GameObjects.Text;
    songTitle!:Phaser.GameObjects.Text;
    preload() {

    }

    create() {
        this.bgs = [];
        let title = this.add.text(0,10,'Options', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setScrollFactor(0,0)
        .setDepth(50)
        .setFontSize(30).setWordWrapWidth(240);

        this.ninja = this.add.sprite(200,70,'mainatlas', 'ninja_stand_0')
        .setScrollFactor(0,0)
        .setDepth(50)
        .setTint(C.GetNinjaColor());

        let clear = this.add.text(380,10,'Reset Times\n(Be Careful!)', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(100,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(12).setWordWrapWidth(240)
        .on('pointerdown',  () => {localStorage.clear();});

        let changeColor = this.add.text(10,60,'Change Ninja Color', { fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(240,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(20).setWordWrapWidth(240)
        .on('pointerdown',  () => {this.NextColor();});

        let changeBG = this.add.text(10,90,'Change Background', {fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(240,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(20).setWordWrapWidth(240)
        .on('pointerdown',  () => {this.NextBG();});

        let changeMusic = this.add.text(10,120,'Change Music', {fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(240,0)
        .setScrollFactor(0,0)
        .setInteractive()
        .setDepth(50)
        .setFontSize(20).setWordWrapWidth(240)
        .on('pointerdown',  () => {this.SongUp();});

        let back = this.add.text(0,210,'Back to menu', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(20).setWordWrapWidth(480)
        .setScrollFactor(0,0)
        .setDepth(50)
        .setInteractive()
        .on('pointerdown',  () => { this.scene.start('menu');});

        this.songDesc = this.add.text(240,95,'', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(240,0)
        .setFontSize(12).setWordWrapWidth(240)
        .setScrollFactor(0,0)
        .setDepth(50)

        this.songTitle = this.add.text(240,70,'', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(240,0)
        .setFontSize(20).setWordWrapWidth(240)
        .setScrollFactor(0,0)
        .setDepth(50)
        let musicInfo = this.add.text(240,50,'Music Info', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(240,0)
        .setFontSize(14).setWordWrapWidth(240)
        .setScrollFactor(0,0)
        .setDepth(50)

        // //@ts-ignore
        // this.songtitle = this.add.text(0,120, 'Change Background Music', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        // .setFixedSize(480,0)
        // .setScrollFactor(0,0)
        // .setDepth(50)
        // .setFontSize(20).setWordWrapWidth(480)
        // .setInteractive()
        // .on('pointerdown',  () => {this.SongUp(); });

        this.SetSongDesc();
        BGFactory.ChangeBG(this, this.bgs, C.GetBG());
    }

    SongUp() {
        C.songnum++;
        if(C.songnum >= C.songs.length)
        C.songnum = 0;
        this.SetSongDesc();
        C.music.destroy();
        C.music = this.sound.add(C.songs[C.songnum]);
        // this.songtitle.text = C.songs[C.songnum];
        C.music.play();
        C.music.on('complete', () => {
            C.music.play();
        }, this);
    }

    SetSongDesc() {
        this.songDesc.text = `${C.songDesc[C.songnum]}`;
        this.songTitle.text = `${C.songs[C.songnum]}`;
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
        this.SetSongDesc();
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