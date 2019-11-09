import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";
import { C } from "../C";

export class Grass extends Entity {
    ts!:TsetScene;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'grass';
        // this.sprite.setOrigin(0,0);
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setSize(16,16);
        this.PlayAnimation('sway');
        // this.scene.events.on('update', this.Update, this);
        // this.sprite.on('destroy', this.Destroy, this);

    }

    CheckHit() {
        this.ts.player.sprite.emit('hide');
    }

}