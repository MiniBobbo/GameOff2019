import { Entity } from "./Entity";
import { C } from "../C";

export class Magistrate extends Entity{
    killed:boolean = false;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'magistrate';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(8);
        this.PlayAnimation('stand');
        this.sprite.setGravityY(C.GRAVITY_Y);
        // this.scene.events.on('update', this.Update, this);
        // this.sprite.on('destroy', this.Destroy, this);

    }

    CheckHit() {
        if(!this.killed) {
            this.killed = true;
            this.PlayAnimation('killed');
            this.scene.events.emit('magistratekilled');
        }
    }

}