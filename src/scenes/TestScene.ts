import { Entity } from "../entities/Entity";
import { Ninja } from "../entities/Ninja";
import { C } from "../C";
import { Samurai } from "../entities/Samurai";
import { Flag } from "../entities/Flag";
import { MenuScene } from "./MenuScene";
import { LargeBlade } from "../entities/LargeBlade";
import { Magistrate } from "../entities/Magistrate";
import { Pot } from "../entities/Pot";
import { Attack } from "../entities/Attack";
import { Crossbow } from "../entities/Crossbow";
import { Grass } from "../entities/Grass";
import { RoyalSamurai } from "../entities/RoyalSamurai";
import { ObjectFactory } from "../ObjectFactory";

export class TsetScene extends Phaser.Scene {
    player!: Ninja;
    camobj!:Phaser.GameObjects.Graphics;
    waitOnInput:boolean = false;
    mousedown:boolean = false;
    bg!:Phaser.Tilemaps.DynamicTilemapLayer;
    debug!:Phaser.GameObjects.Text;
    puff!:Phaser.GameObjects.Sprite;
    goal!:Phaser.GameObjects.Text;
    centerText!:Phaser.GameObjects.Text;
    timeText!:Phaser.GameObjects.Text;
    timer:number = 0;
    totalJumps:number = 0;
    levelStarted:boolean = false;
    allSprites!:Array<Phaser.GameObjects.GameObject>;
    enemiesKilled:number = 0;
    magistratesKilled:number = 0;
    royalSamuraiKilled:number = 0;
    touchingFlag:boolean = false;
    thingCollected:number = 0;
    loudnoise:boolean = false;
    private ninjaDead:boolean = false;
    attacks!:Array<Attack>;
    effects!:Array<Phaser.GameObjects.Sprite>;


    preload() {

    }

    ResetLevel() {
        this.enemiesKilled = 0;
        this.touchingFlag = false;
        this.timer = 0;
        this.waitOnInput = false;
        this.ninjaDead = false;
        this.loudnoise = false;
        this.mousedown = false;
    }

    create() {
        this.ResetLevel();
        this.attacks = [];
        this.effects = [];
        this.player = new Ninja(this);
        this.player.PlayAnimation('touchdown');
        this.player.sprite.setDepth(5);
        let map = this.make.tilemap({ key: C.CurrentLevel });
        const tileset = map.addTilesetImage("tileset", "tileset");
        const bg  = map.createDynamicLayer("collide", tileset, 0, 0);
        this.bg = bg;
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

        this.input.on('pointerdown', () => {this.mousedown = true; this.Clicked();}, this);
        this.input.on('pointerup', () => {this.mousedown = false;}, this);
        this.input.keyboard.on('keydown_R', function (event:any) {
            //@ts-ignore
            this.scene.start('restart');
    
        }, this);

        this.player.sprite.emit('resume');
        this.debug = this.add.text(0,0, '');
        this.debug.setScrollFactor(0,0);
        this.goal = this.add.text(0, 5, C.CurrentLevelData.Goal, {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(18)
        .setStroke('#000000', 3)
        // .setWordWrapWidth(480)
        .setFixedSize(480, 0).setScrollFactor(0,0)
        .setDepth(50);

        this.timeText = this.add.text(5, 250, '0.00', {color:0xff0000, fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(18 )
        // .setWordWrapWidth(480)
        .setScrollFactor(0,0).setStroke('#ff0000', 3).setDepth(50);
        // .setShadow(2,2,'0x000000', 2,false, false);
    
        this.centerText = this.add.text(0, 111, '', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(48)
        .setStroke('#000000', 5)
        .setFixedSize(480, 0)
        .setScrollFactor(0,0).setDepth(50);
        
        ObjectFactory.PlaceObjects(map, this);

        this.CreateEvents();
        this.StartLevel();

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
        this.events.on('magistratekilled', this.MagistrateKilled, this);
        this.events.on('royalsamuraikilled', this.RoyalSamuraiKilled, this);
        this.events.on('touchflag', this.TouchFlag, this);
        this.events.on('touchthing', this.TouchThing, this);
        this.events.on('ninjadead', this.NinjaDead, this);
        this.events.on('noise', this.Noise, this);
        
    }
    Destroy() {
        this.input.removeListener('pointerdown', () => {this.mousedown = true;}, this);
        this.input.removeListener('pointerup', () => {this.mousedown = false;}, this);
        this.events.removeListener('touchthing', this.TouchThing, this);
        this.events.removeListener('royalsamuraikilled', this.RoyalSamuraiKilled, this);
        this.events.removeListener('touchflag', this.TouchFlag, this);
        this.events.removeListener('pause');
        this.events.removeListener('puff');
        this.events.removeListener('JumpInput');
        this.events.removeListener('centertext');
        this.events.removeListener('samuraikilled', this.FinishLevel, this);
        this.events.removeListener('ninjadead', this.NinjaDead, this);
        this.events.removeListener('noise', this.Noise, this);

    }

    update(time:number, dt:number) {
        this.touchingFlag = false;
        if(this.mousedown && C.ALLOW_MOUSE_HOLD)
            this.Clicked();
        // this.camobj.setPosition((this.input.mousePointer.worldX - this.player.sprite.x)/2, (this.input.mousePointer.worldY - this.player.sprite.y) /2);
        this.camobj.setPosition((this.player.sprite.x), (this.player.sprite.y));
        // this.debug.text = `x: ${this.camobj.x}, y: ${this.camobj.y}`;
        if(this.player.sprite.y > this.bg.height)
            this.events.emit('ninjadead');
        if(this.levelStarted && !this.ninjaDead) {
            this.timer += dt;
            this.timeText.text = (this.timer/1000).toFixed(2);
        }


    }

    Collided(e:any, o:any) {
        if(this.ninjaDead)
        return;
        e.emit('collide', o);
        e.emit('pause');
        // o.emit('collide', e);
    }


    JumpInput() {
        this.waitOnInput = true;
    }

    Clicked() {
        // this.events.emit('centertext', ['Jumped']);
        if(this.ninjaDead || !this.waitOnInput || !this.levelStarted) 
            return;
        this.totalJumps++;
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
            callback:() => {this.events.emit('centertext', 'GO');  this.levelStarted = true;
        }
        });
    }

    CheckWinCondition() {
        if(!this.ninjaDead && C.CurrentLevelData.WinCondition(this))
            this.FinishLevel();
    }

    TouchFlag() {
        this.touchingFlag = true;
        this.CheckWinCondition();
    }

    FinishLevel() {
        this.levelStarted = false;
        this.ninjaDead = true;
        this.centerText.alpha = 1;
        this.player.sprite.setVelocity(0,0);
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
        this.add.text(0, 210, `Total jumps: ${this.totalJumps}`, {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
        .setFontSize(18)
        .setColor('#ffffff')
        .setStroke('#000000', 5)
        .setFixedSize(480, 0)
        .setScrollFactor(0,0); 

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
    MagistrateKilled(arg0: string, SamuraiKilled: any, arg2: this) {
        this.magistratesKilled++;
        this.CheckWinCondition();
    }
    RoyalSamuraiKilled(arg0: string, RoyalSamuraiKilled: any, arg2: this) {
        this.royalSamuraiKilled++;
        this.CheckWinCondition();
    }

    Noise() {
        this.loudnoise = true;
        this.CheckWinCondition();
    }

    NinjaDead() {
        if(this.ninjaDead)
        return;
        this.player.sprite.emit('dead');
        this.waitOnInput = false;
        this.ninjaDead = true;

        this.player.PlayAnimation('dead');
        this.player.sprite.setVelocity(-40, -100);
        this.player.sprite.setAngularVelocity(500);

        this.time.addEvent({
            delay:500,
            callbackScope:this,
            callback: () => {
                this.player.sprite.setVisible(false);
                let d = this.add.sprite(this.player.sprite.x, this.player.sprite.y, 'mainatlas', '');
                d.anims.play('disappear');
                this.add.text(0, 150, 'Disgraced', {align:'center', fontFamily: '"Yeon Sung", "Arial"'})
                .setFontSize(30)
                .setColor('#ff0000')
                .setStroke('#000000', 5)
                .setFixedSize(480, 0)
                .setScrollFactor(0,0); 
                },
            repeat:0   
        });
        this.time.addEvent({
            delay:3000,
            callbackScope:this,
            callback:() =>{
                this.scene.start('menu');

            }
        });

    }

    GetAttack() {
        let a = this.attacks.find((a:any) => {return !a.alive;});
        if (a==null) {
            a = new Attack(this);
            this.allSprites.push(a.sprite);

        }
        return a;
    }           
    GetEffect() {
        let a = this.effects.find((a:Phaser.GameObjects.Sprite) => {return !a.active;});
        if (a==null) {
            a = this.add.sprite(-100,-100, 'mainatlas', 'smallburst_0');
            this.effects.push(a);
        }
        return a;
    }          
    TouchThing(arg0: string, TouchThing: any, arg2: this) {
        console.log('Thing collected');
        this.thingCollected++;
        this.CheckWinCondition();
    }
 

}