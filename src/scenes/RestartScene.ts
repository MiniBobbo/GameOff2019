import { TsetScene } from "./TestScene";

export class RestartScene extends Phaser.Scene {
    create() {
        this.scene.remove('test');
        this.time.addEvent({
            delay:100,
            callbackScope:this,
            callback: () => {
                this.scene.add('test', TsetScene, false);
                this.scene.start('test');
            }

        });
    }

    update() {

    }
}