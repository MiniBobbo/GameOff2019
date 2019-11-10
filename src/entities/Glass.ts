import { Entity } from "./Entity";

export class Glass extends Entity {
    killed:boolean = false;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'glass';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setFrame('thing_glass_0');
        this.sprite.setSize(10,16);
        // this.sprite.setOrigin(.5,1);

    }
    CheckHit(arg0: string, CheckHit: any, arg2: this) {
        if(!this.killed) {
            // this.sprite.setOrigin(.5,.5);
            this.PlayAnimation('shatter');
            this.killed = true;
            this.scene.time.addEvent({
                delay:500,
                callbackScope:this,
                callback:() => {this.sprite.visible = false;}
            });
        }
    }

}