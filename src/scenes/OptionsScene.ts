import { C } from "../C";

export class OptionsScene extends Phaser.Scene {
    songtitle!:Phaser.GameObjects.Text;
    preload() {

    }

    create() {
        let title = this.add.text(0,30,'Ninja Training Simulator', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(40).setWordWrapWidth(480);

        let clear = this.add.text(0,85,'Reset Times', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setInteractive()
        .setFontSize(20).setWordWrapWidth(480)
        .on('pointerdown',  () => {localStorage.clear();});

        let back = this.add.text(0,210,'Back to menu', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(20).setWordWrapWidth(480)
        .setInteractive()
        .on('pointerdown',  () => { this.scene.start('menu');});

        //@ts-ignore
        this.songtitle = this.add.text(0,120,C.songs[C.songnum], {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFixedSize(480,0)
        .setFontSize(20).setWordWrapWidth(480)
        .setInteractive()
        .on('pointerdown',  () => {this.SongUp(); });
    }

    SongUp() {
        C.songnum++;
        if(C.songnum >= C.songs.length)
        C.songnum = 0;
        C.music.destroy();
        C.music = this.sound.add(C.songs[C.songnum]);
        this.songtitle.text = C.songs[C.songnum];
        C.music.play();

    }
    SongDwon() {
        C.songnum--;
        if(C.songnum <0)
        C.songnum = C.songs.length -1;
        C.music.destroy();
        C.music = this.sound.add(C.songs[C.songnum]);
        this.songtitle.text = C.songs[C.songnum];
        C.music.play();

    }

}