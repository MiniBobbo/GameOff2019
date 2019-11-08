import { C } from "../C";

export class Entity {
    scene:Phaser.Scene;
    sprite:Phaser.Physics.Arcade.Sprite;
    holdVelocity!:Phaser.Math.Vector2;

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(100,50, 'mainatlas');
        this.sprite.setSize(14,14);
        this.sprite.body.setSize(14,14);
        this.sprite.name = 'entity'; 

        this.sprite.on('pause', this.Pause, this);
        this.sprite.on('resume', this.Resume, this);



        this.holdVelocity = new Phaser.Math.Vector2();
    }

    Pause() {
        this.holdVelocity.copy(this.sprite.body.velocity);
        this.sprite.setVelocity(0,0);
        this.sprite.anims.pause();
        this.sprite.setGravity(0,0);
    }

    Resume() {
        this.sprite.body.velocity.copy(this.holdVelocity);
        this.sprite.anims.resume();
        this.sprite.setGravity(0,C.GRAVITY_Y);
    }

    SetVelocity(v:Phaser.Math.Vector2) {
        this.holdVelocity.copy(v);
    }

}