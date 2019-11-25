import { Entity } from "./Entity";
import { EffectFactory } from "../EffectFactory";
import { TsetScene } from "../scenes/TestScene";

export class BouncingBlade extends Entity {
    speed!:Phaser.Math.Vector2;
    lastSpeed!:Phaser.Math.Vector2;


    constructor(scene:Phaser.Scene) {
        super(scene);
        this.lastSpeed = new Phaser.Math.Vector2();
        this.sprite.name = 'bouncingblade';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(16);
        this.sprite.setFrame('blade_1');
        this.sprite.setOffset(16,16 );
        this.sprite.setBounce(1);
        // this.sprite.setVelocity(100,0);
        this.scene.events.on('update', this.Update, this);
        this.sprite.on('destroy', this.Destroy, this);
        this.sprite.setAngularVelocity(500);
    }

    CheckHit() {
        this.scene.events.emit('ninjadead');
    }

    Update(time:number, dt:number) {

        this.sprite.body.velocity.copy(this.lastSpeed);

        if(this.sprite.body.blocked.right) {
            this.sprite.body.velocity.x = -this.lastSpeed.x;
            let e = EffectFactory.CreateSpark(this.scene as TsetScene, this.sprite);            
            e.angle = -90;
        }
        if(this.sprite.body.blocked.left) {
            let e = EffectFactory.CreateSpark(this.scene as TsetScene, this.sprite);            
            e.angle = 90;
            this.sprite.body.velocity.x = -this.lastSpeed.x;
        }
        if(this.sprite.body.blocked.up) {
            this.sprite.body.velocity.y = -this.lastSpeed.y;
            let e = EffectFactory.CreateSpark(this.scene as TsetScene, this.sprite);            
            e.angle = -180;
        }
        if(this.sprite.body.blocked.down) {
            this.sprite.body.velocity.y = -this.lastSpeed.y;
            let e = EffectFactory.CreateSpark(this.scene as TsetScene, this.sprite);            
            e.angle = 0;

        }

        this.lastSpeed.copy(this.sprite.body.velocity);

    }

    Destroy() {
        this.scene.events.removeListener('update', this.Update, this);
        this.sprite.removeListener('destroy', this.Destroy, this);

    }

}