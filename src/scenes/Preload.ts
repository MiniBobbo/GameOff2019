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
        this.load.atlas('bgatlas', 'bgatlas.png', 'bgatlas.json');
        this.load.audio('Shinobi', ['./music/Shinobi.mp3', './music/Shinobi.ogg'], {loop:true, volume:.5});
        this.load.audio('Cybernation', ['./music/cybernation.mp3', './music/cybernation.ogg'], {loop:true, volume:.5});
        this.load.audio('Danger Room', ['./music/danger_room.mp3', './music/danger_room.ogg'], {loop:true, volume:.5});
        this.load.audio('Wooly Wanderer Remix', ['./music/Wooly Wanderer.mp3', './music/Wooly Wanderer.ogg'], {loop:true, volume:.5});
        this.load.audio('King and Country', ['./music/Enemy_turn.mp3', './music/Enemy_turn.ogg'], {loop:true, volume:.5});
        this.load.audio('Basil Price', ['./music/Jazzfunk_1.mp3', './music/Jazzfunk_1.ogg'], {loop:true, volume:.5});
        this.load.audio('Wingman', ['./music/pursuer.mp3', './music/pursuer.ogg'], {loop:true, volume:.5});
        this.load.audio('Ronin', ['./music/samurai_battle_2.mp3', './music/samurai_battle_2.ogg'], {loop:true, volume:.5});

        this.LoadSFX();
    }
    LoadSFX() {
        this.load.audio('3', ['./sounds/3.mp3', './sounds/3.ogg']);
        this.load.audio('2', ['./sounds/2.mp3', './sounds/2.ogg']);
        this.load.audio('1', ['./sounds/1.mp3', './sounds/1.ogg']);
        this.load.audio('go', ['./sounds/go.mp3', './sounds/go.ogg']);
        this.load.audio('complete', ['./sounds/compete.mp3', './sounds/compete.ogg']);
        this.load.audio('disgraced', ['./sounds/disgraced.mp3', './sounds/disgraced.ogg']);
        this.load.audio('slash', ['./sounds/slash1.mp3', './sounds/slash1.ogg']);
        this.load.audio('slash2', ['./sounds/slash2.mp3', './sounds/slash2.ogg']);
        this.load.audio('vanish', ['./sounds/vanish.mp3', './sounds/vanish.ogg']);
        this.load.audio('record', ['./sounds/record.mp3', './sounds/record.ogg']);
        this.load.audio('playerdeath', ['./sounds/player_death.mp3', './sounds/player_death.ogg']);
        this.load.audio('smallburst', ['./sounds/crossbow hit.mp3', './sounds/crossbow hit.ogg']);
        this.load.audio('vase', ['./sounds/vase smash.mp3', './sounds/vase smash.ogg']);
        this.load.audio('glass', ['./sounds/glass smash.mp3', './sounds/glass smash.ogg']);
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
        this.anims.create({ key: 'crossbow_stand', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'samurai_stand_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'magistrate_stand', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'magistrate_stand_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'royalsamurai_stand', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'royalsamurai_stand_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'blade_spin', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'blade_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'samurai_killed', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'samurai_killed_', end: 10}), repeat: 0 });
        this.anims.create({ key: 'magistrate_killed', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'magistrate_killed_', end: 10}), repeat: 0 });
        this.anims.create({ key: 'royalsamurai_killed', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'royalsamurai_killed_', end: 10}), repeat: 0 });
        this.anims.create({ key: 'royalsamurai_swing', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'royalsamurai_swing_', end: 4}), repeat: 0 });
        this.anims.create({ key: 'flag_sway', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'bannersway_', end: 58}), repeat: -1 });
        this.anims.create({ key: 'puff', frameRate: 16, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'effects_puff_', end: 4 }), repeat: 0 });
        this.anims.create({ key: 'disappear', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'disappear_', end: 29 }), repeat: 0 });
        this.anims.create({ key: 'pot_break', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'potbreak_', end: 58 }), repeat: 0 });
        this.anims.create({ key: 'bolt_fire', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'bolt_', end: 49 }), repeat: -1 });
        this.anims.create({ key: 'vaffect_vert', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'thing_vert_', end: 3 }), repeat: -1 });
        this.anims.create({ key: 'vaffect_horiz', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'thing_horiz_', end: 3 }), repeat: -1 });
        this.anims.create({ key: 'smallburst', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'smallburst_', end: 16 }), repeat: 0 });
        this.anims.create({ key: 'portal_portal', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'portal_', end: 29 }), repeat: -1 });
        this.anims.create({ key: 'warp_warp', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'warp_', end: 29 }), repeat: -1 });
        this.anims.create({ key: 'grass_sway', frameRate: 30, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'grass_', end: 59 }), repeat: -1 });
        this.anims.create({ key: 'glass_shatter', frameRate: 30, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'glassshatter_', end: 23 }), repeat: 0 });
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