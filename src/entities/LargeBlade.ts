import { Entity } from "./Entity";

export class LargeBlade extends Entity {
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'blade';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setFrame('blade_0');
        this.sprite.setCircle(32);
        this.scene.events.on('update', this.Update, this);
        this.sprite.on('destroy', this.Destroy, this);
        this.sprite.setAngularVelocity(500);
    }

    CheckHit() {
        this.scene.events.emit('ninjadead');
    }

    Update(time:number, dt:number) {
    }

    Destroy() {
        this.scene.events.removeListener('update', this.Update, this);
        this.sprite.removeListener('destroy', this.Destroy, this);

    }
}