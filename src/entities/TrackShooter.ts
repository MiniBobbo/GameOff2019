import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";

export class TrackShooter extends Entity {
    ts!:TsetScene;
    eye!:Phaser.GameObjects.Sprite;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'crossbow';
        this.sprite.setFrame('demon_2');
        this.sprite.setCircle(8);
        this.sprite.visible = true;

        this.eye = scene.add.sprite(0,0,'mainatlas', 'demon_1')
        .setDepth(6)
        scene.events.on('update', this.Update, this);
        // let eye = scene.add.sprite();
    }

    Update(time:number, dt:number) {
        this.eye.setPosition(this.sprite.x, this.sprite.y);
        this.eye.rotation = Phaser.Math.Angle.BetweenPoints(this.eye, this.ts.player.sprite);
    }

    SetPosition(x:number, y:number) {
        this.sprite.setPosition(x,y).setDepth(5);
    }

    ArmCrossbow(delay:number, offset:number = 0) {
        this.ts.time.addEvent({
            callback:() => {
                let a = this.ts.GetTrackbolt();
                a.PlayAnimation('fire');
                a.sprite.setPosition(this.sprite.x, this.sprite.y);
                console.log('firing');
            },
            callbackScope:this,
            loop:true,
            delay:delay,
            startAt:offset           
        });

    }

}