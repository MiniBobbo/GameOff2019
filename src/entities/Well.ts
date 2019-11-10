import { Entity } from "./Entity";

export class Well extends Entity {
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'well';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setFrame('well');
        this.sprite.setSize(32,32);
    }

    CheckHit() {
        this.scene.events.emit('touchflag');
    }

}