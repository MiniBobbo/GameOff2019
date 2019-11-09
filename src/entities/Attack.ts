import { Entity } from "./Entity";

export class Attack extends Entity {
    alive:boolean = true;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'bolt';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(4);

        this.sprite.on('collide', ()=> {
            this.alive = false;
            this.sprite.disableBody(true, true);
        }, this);
    }

    CheckHit() {
        this.scene.events.emit('ninjadead');
    }
}