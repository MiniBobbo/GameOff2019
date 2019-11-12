import { Entity } from "./Entity";
import { C } from "../C";
import { TsetScene } from "../scenes/TestScene";

export class RoyalSamurai extends Entity {
    killed:boolean = false;
    ts:TsetScene;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'royalsamurai';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(16);
        this.PlayAnimation('stand');
        this.sprite.setGravityY(C.GRAVITY_Y);

    }

    CheckHit() {
        if(!this.ts.player.hidden && !this.ts.player.dead && !this.killed) {
            if(this.ts.player.sprite.x < this.sprite.x)
                this.sprite.flipX = true;
            else
                this.sprite.flipX = false;

            this.PlayAnimation('swing');
            this.ts.sound.play('slash');
            this.ts.events.emit('ninjadead');
            return;
        }
        if(!this.killed && !this.ts.player.dead) {
            this.killed = true;
            this.PlayAnimation('killed');
            this.scene.events.emit('royalsamuraikilled');
        }
    }

}