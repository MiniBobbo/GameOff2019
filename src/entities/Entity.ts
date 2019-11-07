export class Entity {
    scene:Phaser.Scene;
    sprite:Phaser.Physics.Arcade.Sprite;

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(50,50, 'mainAtlas');
        this.sprite.setSize(14,14);
        this.sprite.body.setSize(14,14);

    }

}