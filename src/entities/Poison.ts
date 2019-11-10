import { Entity } from "./Entity";

export class Poison extends Entity {
    killed:boolean = false;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'pot';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setFrame('thing_poison_0');
        this.sprite.setCircle(8);

    }

    CheckHit() {
        this.scene.events.emit('touchthing');
        this.sprite.disableBody(true);
        this.sprite.visible = false;
    }
}