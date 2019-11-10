import { Entity } from "./Entity";
import { C } from "../C";

export class Pot extends Entity {
    killed:boolean = false;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'pot';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setFrame('thing_pot_0');
        this.sprite.setCircle(8);
        this.sprite.on('collide', this.Collide, this);

    }

    Collide(arg0: string, Collide: any, arg2: this) {
        
        
    }

    CheckHit() {
        if(!this.killed) {
            this.killed = true;
            this.sprite.setGravity(0, C.GRAVITY_Y);
            this.sprite.setAngularVelocity(200);
            this.sprite.on('collide', () => {
                this.sprite.setVisible(false);
                let b = this.scene.add.sprite(this.sprite.x, this.sprite.y, 'mainatlas', 'potbreak_0');
                b.angle = this.sprite.angle;
                b.play('pot_break');
                this.scene.events.emit('noise');
                this.scene.time.addEvent({
                    delay:1000,
                    callbackScope:this,
                    callback:() => {b.visible = false;}
                });

            }, this)
        }
    }
}