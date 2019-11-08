import { Entity } from "./Entity"
import { C } from "../C";

export class Ninja extends Entity {
    vertical:boolean = false;
    prepareForJump:boolean = false;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'ninja';
        this.sprite.on('collide', this.GetJump, this);
        this.scene.events.on('update', this.Update, this);
        this.sprite.on('destroy', this.Destroy, this);
    }

    GetJump(){
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
        // console.log('Ninja update');
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
    }
    Destroy() {
        console.log('Ninja destroy');
        this.scene.events.removeListener('update', this.Update, this);
    
    }

}