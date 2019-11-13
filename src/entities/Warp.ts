import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";
import { Cameras } from "phaser";

export class Warp extends Entity {
    killed:boolean = false;
    allowed:boolean = true;
    strength:number = 200;
    ts!:TsetScene;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'warp';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(16);
        this.PlayAnimation('warp');
        // this.scene.events.on('update', this.Update, this);
        // this.sprite.on('destroy', this.Destroy, this);

    }

    CheckHit() {
        if(this.allowed) {
            this.allowed = false;
            this.ts.cameras.main.flash(300, 100,100,255);
            this.scene.physics.velocityFromAngle(this.sprite.angle, this.strength, this.ts.player.sprite.body.velocity);

            this.scene.time.addEvent({
                delay:300,
                callbackScope:this,
                callback:() => {
                    this.allowed = true;
                }
            });
        }
    }

}