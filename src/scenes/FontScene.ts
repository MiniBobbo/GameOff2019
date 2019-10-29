export class FontScene extends Phaser.Scene {
    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor(0x555555);
        // this.cameras.main.setRoundPixels(true);

        this.add.text(10,10,'Test Text')
        .setFontFamily('Big Shoulders Text')
        .setFontSize(12)
        .setStroke('black', 6)
        // .setTint(0x2222ff);
    }
}