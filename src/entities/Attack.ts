import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";
import { EffectFactory } from "../EffectFactory";

export class Attack extends Entity {
    alive:boolean = true;
    ts!:TsetScene;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'bolt';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(4);

        this.sprite.on('collide', ()=> {
            this.alive = false;
            this.sprite.disableBody(true, true);
            let e = this.ts.GetEffect();
            EffectFactory.CreateEffect(this.ts, this.sprite);
        }, this);
    }

    CheckHit() {
        this.scene.events.emit('ninjadead');
    }
}