import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";
import { C } from "../C";

export class VAffect extends Entity {
    ts!:TsetScene;
    vertical:boolean = true;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'vaffect';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setSize(16,16);
        this.PlayAnimation('vert');

    }

    IsVertical(value:boolean) {
        this.vertical = value;
        if(this.vertical)
            this.PlayAnimation('vert');
        else
            this.PlayAnimation('horiz');
    }

    CheckHit() {
        let  p = this.ts.player.sprite;
        if(this.vertical)
            p.setVelocityX(0);
        else {
            p.setAccelerationY(-C.GRAVITY_Y);
            if(Math.abs(p.body.velocity.y) < 10) {
                // let vy = p.body.velocity.y;
                let vy =-30;
                p.setVelocityY(vy);
            } else 
               p.setVelocityY(0);
        }
    }   

}