import { C } from "../C";

export class Preload extends Phaser.Scene {
    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // var element = document.createElement('style');

        // document.head.appendChild(element);
    
        // var sheet = element.sheet;
    
        // var styles = '@font-face { font-family: "munro"; src: url("assets/munro.ttf") format("truetype"); }\n';
        //@ts-ignore
        // sheet.insertRule(styles, 0);

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value:any) {
            //@ts-ignore
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        }, this);
        
        this.load.on('fileprogress', function (file:any) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            //@ts-ignore
            this.FinishedThing();
        }, this);
    
        this.load.setBaseURL('./assets/')
        //Load stuff here.
        this.load.spritesheet('ninja', 'ninja.png', {frameWidth:32});
        
        C.Levels.forEach(element => {
            this.load.tilemapTiledJSON(element);
        });
        this.load.image('tileset');
        this.load.atlas('mainatlas', 'atlas.png', 'atlas.json');

    }

    CreateAnimations() {
        let frames  = this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_touchup_', end: 1});
        // this.anims.create({ key: 'ninja_jumpup', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_jumpup_', end: 1}), repeat: 0 });
        // this.anims.create({ key: 'ninja_jumpdown', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_jumpdown_', end: 1}), repeat: 0 });
        // this.anims.create({ key: 'ninja_jumpside', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_jumpside_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'ninja_jumpup', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_jumpup_e_', end: 22}), repeat: 0 });
        this.anims.create({ key: 'ninja_jumpdown', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_jumpdown_e_', end: 28}), repeat: 0 });
        this.anims.create({ key: 'ninja_jumpside', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_jumpside_e_', end: 58}), repeat: 0 });
        this.anims.create({ key: 'ninja_touchup', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_touchup_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'ninja_dead', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_dead_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'ninja_touchdown', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_touchdown_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'ninja_touchside', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'ninja_touchside_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'samurai_stand', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'samurai_stand_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'magistrate_stand', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'magistrate_stand_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'blade_spin', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'blade_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'samurai_killed', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'samurai_killed_', end: 10}), repeat: 0 });
        this.anims.create({ key: 'magistrate_killed', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'magistrate_killed_', end: 10}), repeat: 0 });
        this.anims.create({ key: 'flag_sway', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'bannersway_', end: 58}), repeat: -1 });
        this.anims.create({ key: 'puff', frameRate: 16, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'effects_puff_', end: 4 }), repeat: 0 });
        this.anims.create({ key: 'disappear', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'disappear_', end: 29 }), repeat: 0 });
        this.anims.create({ key: 'pot_break', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'potbreak_', end: 58 }), repeat: 0 });
    }
    create() {
        //@ts-ignore
        WebFont.load({
            google: {
                families: [ 'Yeon Sung' ]
                },
            active: () =>{
                this.FinishedThing();
            },
            
        });
        this.CreateAnimations();

    }

    count:number = 0;
    FinishedThing() {
        this.count++;
        if(this.count == 2)
            this.scene.start('menu');
    }
}