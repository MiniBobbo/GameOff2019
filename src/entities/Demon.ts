import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";

export class Demon extends Entity {
    killed:boolean = false;
    ts!:TsetScene;
    acceleration:number = 300;
    maxspeed:number = 200;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'demon';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setFrame('demon_0');
        this.sprite.setCircle(8);
        this.sprite.setOffset(8,8);
        
        // this.scene.events.on('update', this.Update, this);
        // this.sprite.on('destroy', this.Destroy, this);
        this.ts.events.on('update', this.Update,this);
        this.sprite.on('destroy', () => {        this.ts.events.removeListener('update', this.Update,this);
    },this);
    }

    Update() {
        if(this.ts.levelStarted) {
            this.scene.physics.accelerateToObject(this.sprite, this.ts.player.sprite,this.acceleration, this.maxspeed, this.maxspeed);
            this.sprite.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(this.sprite, this.ts.player.sprite)); 
        }
        this.scene.physics.overlap(this.sprite, this.ts.player.sprite, () => {this.ts.events.emit('ninjadead');});
    }


    CheckHit() {
        if(!this.killed) {
            this.scene.events.emit('ninjadead');
        }
    }

}