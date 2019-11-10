import { TsetScene } from "./scenes/TestScene";

export class EffectFactory {
    static CreateEffect(ts:TsetScene, loc:{x:number, y:number}) {
        let e = ts.GetEffect();
        e.setPosition(loc.x, loc.y);
        e.anims.play('smallburst');
        e.setActive(true);
        e.setVisible(true);
        ts.time.addEvent({
            delay:2000,
            callbackScope:this,
            callback: () => {e.setActive(false); e.setVisible(false);}
        });
    }
}