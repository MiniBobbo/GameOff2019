export class MenuScene extends Phaser.Scene {
    preload() {

    }

    create() {
        let title = this.add.text(0,30,'Ninja Training Simulator', {align:'center'})
        .setFontFamily('"Yeon Sung"')
        .setFixedSize(480,0)
        .setFontSize(60).setWordWrapWidth(480);

        let start = this.add.text(200,200,'Start')
        .setFontFamily('"Yeon Sung"')
        .setInteractive();
        start.on('pointerdown', () => {
            this.StartLevel();
        }, this);
    }

    StartLevel() {
        this.scene.start('test');
    }
}