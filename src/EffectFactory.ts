import { TsetScene } from "./scenes/TestScene";

export class EffectFactory {
    static CreateEffect(ts:TsetScene, loc:{x:number, y:number}) {
        let e = ts.GetEffect();
        e.setPosition(loc.x, loc.y)
        .setDepth(5)
        .setAngle(0).setScale(1);
        
        e.anims.play('smallburst');
        ts.sound.play('smallburst');
        e.setActive(true);
        e.setVisible(true);
        ts.time.addEvent({
            delay:2000,
            callbackScope:this,
            callback: () => {e.setActive(false); e.setVisible(false);}
        });
    }

    static CreateSpark(ts:TsetScene, loc:{x:number, y:number}):Phaser.GameObjects.Sprite {
        let e = ts.GetEffect();
        e.setPosition(loc.x, loc.y)
        .setDepth(5)
        .setAngle(0)
        .setScale(.5);
        e.anims.play('spark');
        ts.sound.play('smallburst');
        e.setActive(true);
        e.setVisible(true);
        ts.time.addEvent({
            delay:2000,
            callbackScope:this,
            callback: () => {e.setActive(false); e.setVisible(false);}
        });
        return e;
    }

}