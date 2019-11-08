import { Entity } from "./Entity"
import { C } from "../C";

export class Ninja extends Entity {
    vertical:boolean = false;
    prepareForJump:boolean = false;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.sprite.name = 'Ninja';
        this.sprite.on('collide', this.GetJump, this);
        this.scene.events.on('update', this.Update, this);
        this.sprite.on('destroy', this.Destroy, this);
    }

    GetJump(){
        this.scene.events.emit('JumpInput');
        this.prepareForJump = true;
        if(this.sprite.body.blocked.up)
        this.sprite.anims.play('ninja_touchup');
        else if(this.sprite.body.blocked.down)
        this.sprite.anims.play('ninja_touchdown');
    else if(this.sprite.body.blocked.left) {
        this.sprite.anims.play('ninja_touchside');
        this.sprite.flipX = true;
    }
    else if(this.sprite.body.blocked.right) {
        this.sprite.anims.play('ninja_touchside');
        this.sprite.flipX = false;
    }
}

    Update(time:number, dt:number) {
        // console.log('Ninja update');
        if(!this.prepareForJump) {
            if(this.vertical) {
                if(this.sprite.body.velocity.y > 0)
                    this.sprite.anims.play('ninja_jumpdown');
                    else
                    this.sprite.anims.play('ninja_jumpup');
            } else {
                this.sprite.anims.play('ninja_jumpside');
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