import { Entity } from "./Entity"
import { C } from "../C";

export class Ninja extends Entity {
    vertical:boolean = false;
    prepareForJump:boolean = false;
    dead:boolean = false;
    hidden:boolean = false;
    lastSpeed!:Phaser.Math.Vector2;

    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'ninja';
        this.sprite.on('collide', this.GetJump, this);
        this.sprite.on('dead', () => {this.dead = true;}, this);
        this.scene.events.on('update', this.Update, this);
        this.sprite.on('destroy', this.Destroy, this);
        this.sprite.on('hide', () => {this.hidden = true; this.sprite.alpha = .5;}, this);
        this.sprite.on('unhide', () => {this.hidden = false ; this.sprite.alpha = 1;}, this);
        this.lastSpeed = new Phaser.Math.Vector2();
    }

    GetJump(){
        this.sprite.emit('unhide');
        this.scene.events.emit('JumpInput');
        this.prepareForJump = true;
        if(this.sprite.body.blocked.up)
        this.PlayAnimation('touchup');
        else if(this.sprite.body.blocked.down)
        this.PlayAnimation('touchdown');
    else if(this.sprite.body.blocked.left) {
        this.PlayAnimation('touchside');
        this.sprite.flipX = true;
    }
    else if(this.sprite.body.blocked.right) {
        this.PlayAnimation('touchside');
        this.sprite.flipX = false;
    }
}

    Update(time:number, dt:number) {
        if(this.dead)
            return;
        // console.log('Ninja update');
        this.sprite.setAccelerationY(0);
        if(!this.prepareForJump) {
            if(this.vertical) {
                if(this.sprite.body.velocity.y > 0)
                    this.PlayAnimation('jumpdown');
                    else
                    this.PlayAnimation('jumpup');
            } else {
                this.PlayAnimation('jumpside');
            }
            if(this.sprite.body.velocity.x > 0)
            this.sprite.flipX =false;
            else
            this.sprite.flipX =true;
        } 
        this.lastSpeed.copy(this.sprite.body.velocity);

    }
    Destroy() {
        console.log('Ninja destroy');
        this.scene.events.removeListener('update', this.Update, this);
        this.sprite.removeListener('dead', () => {this.dead = true;}, this);
        this.sprite.removeListener('collide', this.GetJump, this);
        this.sprite.removeListener('destroy', this.Destroy, this);
        this.sprite.removeListener('hide', () => {this.hidden = true; this.sprite.alpha = .5;}, this);
        this.sprite.removeListener('unhide', () => {this.hidden = false ; this.sprite.alpha = 1;}, this);
    }

}