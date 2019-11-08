import { Entity } from "../entities/Entity";
import { Ninja } from "../entities/Ninja";
import { C } from "../C";

export class TsetScene extends Phaser.Scene {
    player!: Ninja;
    camobj!:Phaser.GameObjects.Graphics;
    waitOnInput:boolean = false;
    debug!:Phaser.GameObjects.Text;
    puff!:Phaser.GameObjects.Sprite;
    preload() {

    }
    create() {
        this.player = new Ninja(this);
        let map = this.make.tilemap({ key: 'testlevel' });
        const tileset = map.addTilesetImage("tileset", "tileset");
        const bg  = map.createDynamicLayer("collide", tileset, 0, 0);
        bg.setCollisionByProperty({collide:true}, true);
        this.camobj = this.add.graphics({});

        this.puff = this.add.sprite(0,0,'mainatlas');
        this.puff.visible = false;

        this.physics.add.collider(this.player.sprite, bg, this.Collided);

        this.cameras.main.startFollow(this.camobj);
        // this.cameras.main.setBounds(0,0,bg.width, bg.height);

        this.input.on('pointerdown', this.Clicked, this);

        this.CreateEvents();

        this.player.sprite.emit('resume');
        this.debug = this.add.text(0,0, '');
        this.debug.setScrollFactor(0,0);
    }

    CreateEvents() {
        this.events.on('JumpInput', this.JumpInput, this);
        this.events.on('puff', this.Puff, this);
    }

    update() {
        // this.camobj.setPosition((this.input.mousePointer.worldX - this.player.sprite.x)/2, (this.input.mousePointer.worldY - this.player.sprite.y) /2);
        this.camobj.setPosition((this.player.sprite.x), (this.player.sprite.y));
        // this.debug.text = `x: ${this.camobj.x}, y: ${this.camobj.y}`;
    }

    Collided(e:any, o:any) {
        e.emit('collide', o);
        e.emit('pause');
        // o.emit('collide', e);
    }

    Destroy() {
        this.events.removeListener('pause');
        this.events.removeListener('JumpInput');
    }

    JumpInput() {
        console.log('JumpInput');
        this.waitOnInput = true;
    }

    Clicked() {
        console.log('clicked');
        if(!this.waitOnInput) 
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
                this.events.emit('puff', [3]);
                else 
                this.events.emit('puff', [3]);

                break;
        
            default:
                break;
        }

        this.physics.velocityFromAngle(a, 300, this.player.holdVelocity);
        if(Math.abs(this.player.holdVelocity.y) > Math.abs(this.player.holdVelocity.x))
            this.player.vertical = true;
        else    
            this.player.vertical = false;
        this.player.sprite.emit('resume');
        this.waitOnInput = false;
        this.player.prepareForJump = false;
        if(this.player.vertical) {
            this.player.sprite.scaleY = 1 + C.JUMP_SCALE;
            this.player.sprite.scaleX = C.JUMP_SCALE;
        } else {
            this.player.sprite.scaleX = 1 + C.JUMP_SCALE;
            this.player.sprite.scaleY = C.JUMP_SCALE;

        }
        this.tweens.add({
            duration:200,
            targets:[this.player.sprite],
            scaleX:1,
            scaleY:1
        });

    }

    Puff(direction:number) {
        this.puff.setPosition(this.player.sprite.x, this.player.sprite.y);
        this.puff.setAngle(90*direction);
        this.puff.setVisible(true);
        this.puff.anims.play('puff');
    }

}