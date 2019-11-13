import { Entity } from "./Entity";
import { TsetScene } from "../scenes/TestScene";

export class Portal extends Entity {
    linked!:Portal;
    ts:TsetScene;
    allow:boolean = true;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.ts = scene as TsetScene;
        this.sprite.name = 'portal';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(12);
        this.PlayAnimation('portal');
    }

    CreateLink(p:Portal) {
        this.linked = p;
        p.linked = this;

    }
    CheckHit() {
        if(this.linked != null && this.allow) {
            this.ts.player.sprite.setPosition(this.linked.sprite.x, this.linked.sprite.y);
            this.allow = false;
            this.linked.allow = false;
            this.ts.cameras.main.flash(300);
            this.ts.time.addEvent({
                delay:300,
                callbackScope:this,
                callback:() => {
                    this.allow = true;
                    this.linked.allow = true;
                }
            });
        }
    }
}