import { Entity } from "../entities/Entity";
import { Ninja } from "../entities/Ninja";
import { C } from "../C";
import { Samurai } from "../entities/Samurai";
import { Flag } from "../entities/Flag";
import { MenuScene } from "./MenuScene";

export class TsetScene extends Phaser.Scene {
    player!: Ninja;
    camobj!:Phaser.GameObjects.Graphics;
    waitOnInput:boolean = false;
    debug!:Phaser.GameObjects.Text;
    puff!:Phaser.GameObjects.Sprite;
    goal!:Phaser.GameObjects.Text;
    centerText!:Phaser.GameObjects.Text;
    timeText!:Phaser.GameObjects.Text;
    timer:number = 0;
    levelStarted:boolean = false;
    allSprites!:Array<Phaser.GameObjects.Sprite>;
    enemiesKilled:number = 0;
    touchingFlag:boolean = false;


    preload() {

    }

    ResetLevel() {
        this.enemiesKilled = 0;
        this.touchingFlag = false;
        this.timer = 0;
        this.waitOnInput = false;
    }

    create() {
        this.ResetLevel();
        this.player = new Ninja(this);
        let map = this.make.tilemap({ key: C.CurrentLevel });
        const tileset = map.addTilesetImage("tileset", "tileset");
        const bg  = map.createDynamicLayer("collide", tileset, 0, 0);
        bg.setCollisionByProperty({collide:true}, true);
        this.camobj = this.add.graphics({});

        this.allSprites = [];
        this.puff = this.add.sprite(0,0,'mainatlas');
        this.puff.visible = false;

        this.physics.add.collider(this.player.sprite, bg, this.Collided);
        this.physics.add.collider(this.allSprites, bg, this.Collided);
        this.physics.add.overlap(this.player.sprite, this.allSprites, (n:any, s:any) => {s.emit('ninjahit');});

        this.cameras.main.startFollow(this.camobj);
        this.cameras.main.setBounds(0,0,bg.width, bg.height);

        this.input.on('pointerdown', this.Clicked, this);


        this.player.sprite.emit('resume');
        this.debug = this.add.text(0,0, '');
        this.debug.setScrollFactor(0,0);
        this.goal = this.add.text(0, 5, C.CurrentLevelData.Goal, {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(18)
        .setStroke('#000000', 3)
        // .setWordWrapWidth(480)
        .setFixedSize(480, 0).setScrollFactor(0,0);

        this.timeText = this.add.text(5, 250, '0.00', {color:0xff0000, fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(18 )
        // .setWordWrapWidth(480)
        .setScrollFactor(0,0).setStroke('#ff0000', 3);
        // .setShadow(2,2,'0x000000', 2,false, false);
    
        this.centerText = this.add.text(0, 111, '', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(48)
        .setStroke('#000000', 5)
        .setFixedSize(480, 0)
        .setScrollFactor(0,0);
        
        this.PlaceObjects(map);

        this.CreateEvents();
        this.StartLevel();

    }

    PlaceObjects(map: Phaser.Tilemaps.Tilemap) {
        let o = map.getObjectLayer('o');
        let ninja:any = o.objects.find( (obj:any) =>{return obj.name == 'ninja'}  );
        let ypos = Math.round(ninja.y / C.TILE_SIZE) * C.TILE_SIZE;
        this.player.sprite.setPosition(ninja.x, ypos);

        let sams = o.objects.filter( (obj:any) => {return obj.name == 'samurai'});
        sams.forEach( (o:any) => {
            let s = new Samurai(this);
            s.sprite.setPosition(o.x,o.y);
            this.allSprites.push(s.sprite);
        });

        let flag = o.objects.find( (obj:any) => {return obj.name == 'flag';});
        if(flag != null) {
            let f = new Flag(this);
            //@ts-ignore
            let ypos = Math.round(flag.y / C.TILE_SIZE) * C.TILE_SIZE;
            f.sprite.setPosition(flag.x, ypos);
            this.allSprites.push(f.sprite); 

        }
    }

    CreateEvents() {
        this.events.on('JumpInput', this.JumpInput, this);
        this.events.on('puff', this.Puff, this);
        this.events.on('centertext', (message:string) => {
            this.centerText.text = message;
            this.centerText.alpha = 1;
            this.tweens.add({
                delay:200,
                duration:100, 
                targets:[this.centerText],
                alpha:0
            });

        }, this)
        this.events.on('samuraikilled', this.SamuraiKilled, this);
        this.events.on('touchflag', this.TouchFlag, this);
    }
    Destroy() {
        this.events.removeListener('touchflag', this.TouchFlag, this);
        this.events.removeListener('pause');
        this.events.removeListener('puff');
        this.events.removeListener('JumpInput');
        this.events.removeListener('centertext');
        this.events.removeListener('samuraikilled', this.FinishLevel, this);

    }

    update(time:number, dt:number) {
        this.touchingFlag = false;
        // this.camobj.setPosition((this.input.mousePointer.worldX - this.player.sprite.x)/2, (this.input.mousePointer.worldY - this.player.sprite.y) /2);
        this.camobj.setPosition((this.player.sprite.x), (this.player.sprite.y));
        // this.debug.text = `x: ${this.camobj.x}, y: ${this.camobj.y}`;
        if(this.levelStarted) {
            this.timer += dt;
            this.timeText.text = (this.timer/1000).toFixed(2);
        }

    }

    Collided(e:any, o:any) {
        console.log('Called collided');
        e.emit('collide', o);
        e.emit('pause');
        // o.emit('collide', e);
    }


    JumpInput() {
        this.waitOnInput = true;
    }

    Clicked() {
        // this.events.emit('centertext', ['Jumped']);
        if(!this.waitOnInput || !this.levelStarted) 
            return;

        let a = Phaser.Math.Angle.Between(this.player.sprite.x, this.player.sprite.y, this.input.mousePointer.worldX, this.input.mousePointer.worldY);
        a = Phaser.Math.RadToDeg(a);
        // console.log(`Angle: ${a}`);
        let anim = this.player.sprite.anims.getCurrentKey();
        switch (anim) {
            case 'ninja_touchdown':
                this.events.emit('puff', [0]);
                break;
            case 'ninja_touchup':
                this.events.emit('puff', [2]);
                break;
            case 'ninja_touchside':
                if(this.player.sprite.flipX)
                this.events.emit('puff', [1]);
                else 
                this.events.emit('puff', [3]);

                break;
        
            default:
                break;
        }

        this.physics.velocityFromAngle(a, C.JUMP_STR, this.player.holdVelocity);
        if(Math.abs(this.player.holdVelocity.y) > Math.abs(this.player.holdVelocity.x))
            this.player.vertical = true;
        else    
            this.player.vertical = false;
        this.player.sprite.emit('resume');
        this.waitOnInput = false;
        this.player.prepareForJump = false;
        // if(this.player.vertical) {
        //     this.player.sprite.scaleY = 1 + C.JUMP_SCALE;
        //     this.player.sprite.scaleX = C.JUMP_SCALE;
        // } else {
        //     this.player.sprite.scaleX = 1 + C.JUMP_SCALE;
        //     this.player.sprite.scaleY = C.JUMP_SCALE;

        // }
        // this.tweens.add({
        //     duration:200,
        //     targets:[this.player.sprite],
        //     scaleX:1,
        //     scaleY:1
        // });

    }

    Puff(direction:number) {
        this.puff.setPosition(this.player.sprite.x, this.player.sprite.y);
        this.puff.setAngle(90*direction);
        this.puff.setVisible(true);
        this.puff.anims.play('puff');
    }

    StartLevel() {
        this.player.Resume();
        this.events.emit('centertext', '3');
        this.time.addEvent({
            delay:350,
            callbackScope:this,
            callback:() => {this.events.emit('centertext', '2');}
        });
        this.time.addEvent({
            delay:700,
            callbackScope:this,
            callback:() => {this.events.emit('centertext', '1');}
        });
        this.time.addEvent({
            delay:1050,
            callbackScope:this,
            callback:() => {this.events.emit('centertext', 'GO');  this.levelStarted = true;}
        });
    }

    CheckWinCondition() {
        if(C.CurrentLevelData.WinCondition(this))
            this.FinishLevel();
    }

    TouchFlag() {
        this.touchingFlag = true;
        this.CheckWinCondition();
    }

    FinishLevel() {
        this.levelStarted = false;
        this.centerText.alpha = 1;
        this.centerText.setText('COMPLETE'); 
        let bestTime = localStorage.getItem(C.CurrentLevel);
        if(bestTime == null || parseFloat(bestTime) > parseFloat(this.timeText.text)) {
            this.add.text(0, 170, '** NEW RECORD **', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
            .setFontSize(30)
            .setColor('#ff0000')
            .setStroke('#000000', 5)
            .setFixedSize(480, 0)
            .setScrollFactor(0,0); 
            localStorage.setItem(C.CurrentLevel, this.timeText.text);          
        }
        this.time.addEvent({
            delay:4000,
            callbackScope:this,
            callback:() => {
                this.scene.start('menu');
            }
        });
    }
    SamuraiKilled(arg0: string, SamuraiKilled: any, arg2: this) {
        this.enemiesKilled++;
        this.CheckWinCondition();
    }

}