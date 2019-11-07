export class Preload extends Phaser.Scene {
    preload() {
        // // this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // var element = document.createElement('style');

        // document.head.appendChild(element);
    
        // var sheet = element.sheet;
    
        // var styles = '@font-face { font-family: "munro"; src: url("assets/munro.ttf") format("truetype"); }\n';
        // //@ts-ignore
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
        this.load.tilemapTiledJSON('testlevel');
        this.load.image('tileset');
        this.load.atlas('mainAtlas', 'atlas.png', 'atlas.json');


    }
    create() {
        //@ts-ignore
        // WebFont.load({
        //     google: {
        //         families: [ 'Big Shoulders Text' ]
        //         },
        //     active: () =>{
        //         this.FinishedThing();
        //     },
            
        // });

    }

    count:number = 0;
    FinishedThing() {
        this.count++;
        if(this.count == 1)
            this.scene.start('test');
    }
}