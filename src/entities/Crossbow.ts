import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";

export class Crossbow extends Entity {
    // direction!:number;
    // delay!:number;
    // offset!:number;
    ts!:TsetScene;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'crossbow';
        this.sprite.setCircle(8);
        this.sprite.visible = false;
    }

    ArmCrossbow(direction:number, velocity:number, delay:number, offset:number) {
        this.scene.time.addEvent({
            callback:() => {
                let a = this.ts.GetAttack();
                a.PlayAnimation('fire');
                a.sprite.setPosition(this.sprite.x, this.sprite.y);
                a.sprite.angle = direction;
                this.scene.physics.velocityFromAngle(direction, velocity, a.sprite.body.velocity);

            },
            callbackScope:this,
            loop:true,
            delay:delay,
            startAt:offset           
        });

    }

}