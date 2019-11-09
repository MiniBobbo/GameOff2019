import { Entity } from "./Entity";

export class Flag extends Entity {
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'flag';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setSize(10,20);
        this.PlayAnimation('sway');
        this.sprite.body.offset.y += 6;
        // this.sprite.setOffset(0, 0);
        // this.sprite.setGravityY(C.GRAVITY_Y);
        // this.scene.events.on('update', this.Update, this);
        // this.sprite.on('destroy', this.Destroy, this);

    }

    CheckHit() {
        this.scene.events.emit('touchflag');
    }
}