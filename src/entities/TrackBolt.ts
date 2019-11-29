import { Attack } from "./Attack";
import { EffectFactory } from "../EffectFactory";
import { TsetScene } from "../scenes/TestScene";

export class TrackBolt extends Attack {
    alive:boolean = true;
    ts!:TsetScene;
    accel:number = 400;
    maxSpeed:number = 400;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'trackbolt';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(4)
        .setDepth(10);
        
        this.ts.events.on('update', this.Update, this);

        this.sprite.on('collide', ()=> {
            this.alive = false;
            this.sprite.disableBody(true, true);
            let e = this.ts.GetEffect();
            EffectFactory.CreateEffect(this.ts, this.sprite);
            this.ts.events.removeListener('update', this.Update, this);
        }, this);
    }

    Update() {
        this.ts.physics.accelerateToObject(this.sprite, this.ts.player.sprite, this.maxSpeed);
        this.sprite.rotation = this.sprite.body.velocity.angle();
    }

}