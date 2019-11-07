import { Entity } from "../entities/Entity";

export class TsetScene extends Phaser.Scene {
    player!: Entity;
    camobj!:Phaser.GameObjects.Graphics;
    preload() {

    }
    create() {
        this.player = new Entity(this);
        let map = this.make.tilemap({ key: 'testlevel' });
        const tileset = map.addTilesetImage("tileset", "tileset");
        const bg  = map.createDynamicLayer("collide", tileset, 0, 0);
        this.camobj = this.add.graphics({});

        this.cameras.main.startFollow(this.camobj);
        this.cameras.main.setBounds(0,0,bg.width, bg.height);
    }
    update() {
        this.camobj.setPosition(this.player.sprite.x, this.player.sprite.y);
    }


}