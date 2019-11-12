import { Entity } from "./Entity";

export class BouncingBlade extends Entity {
    speed!:Phaser.Math.Vector2;
    constructor(scene:Phaser.Scene) {
        super(scene);
        this.speed = new Phaser.Math.Vector2();
        this.sprite.name = 'bouncingblade';
        this.sprite.on('ninjahit', this.CheckHit, this);
        this.sprite.setCircle(16);
        this.sprite.setFrame('blade_1');
        this.sprite.setOffset(16,16 );
        this.sprite.setBounce(1);
        // this.sprite.setVelocity(100,0);
        this.scene.events.on('update', this.Update, this);
        this.sprite.on('destroy', this.Destroy, this);
        this.sprite.setAngularVelocity(500);
    }

    CheckHit() {
        this.scene.events.emit('ninjadead');
    }

    Update(time:number, dt:number) {
        if(this.sprite.body.blocked.right)
            this.sprite.body.velocity.x = -this.speed.x;
        if(this.sprite.body.blocked.left)
            this.sprite.body.velocity.x = this.speed.x;
        if(this.sprite.body.blocked.up)
            this.sprite.body.velocity.y = this.speed.y;
        if(this.sprite.body.blocked.down)
            this.sprite.body.velocity.y = -this.speed.y;
    }

    Destroy() {
        this.scene.events.removeListener('update', this.Update, this);
        this.sprite.removeListener('destroy', this.Destroy, this);

    }

}