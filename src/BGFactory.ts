import { TsetScene } from "./scenes/TestScene";

export class BGFactory {
    static ChangeBG(ts:Phaser.Scene, array:Array<Phaser.GameObjects.TileSprite>, newBG:string) {
        let t = ts;

        array.forEach(element => {
            element.destroy();
        });

        switch (newBG) {
            case 'waves':
                let t1 = t.add.tileSprite(0,0,480, 270, 'bgatlas', 'bgs_0')
                .setOrigin(0,0)
                .setScrollFactor(0,0)
                .setDepth(1)
                .setPosition(0, 0);

                let t2 = t.add.tileSprite(0,0,480, 270, 'bgatlas', 'bgs_1')
                .setOrigin(0,1)
                .setScrollFactor(0,0)
                .setDepth(1)
                .setPosition(0,270);
                t1.on('update', () => {t1.tilePositionX = ts.cameras.main.scrollX/3});
                t2.on('update', () => {t2.tilePositionX = ts.cameras.main.scrollX/2});
                array.push(t1);
                array.push(t2);

                break;

                case 'mountains':
                    let m1 = t.add.tileSprite(0,0,480, 270, 'bgatlas', 'bgs_2')
                    .setOrigin(0,0)
                    .setScrollFactor(0,0)
                    .setDepth(2)
                    .setPosition(0, 0);
    
                    let m2 = t.add.tileSprite(0,0,480, 270, 'bgatlas', 'bgs_3')
                    .setOrigin(0,1)
                    .setScrollFactor(0,0)
                    .setDepth(1)
                    .setPosition(0,270);
                    // m1.on('update', () => {m1.tilePositionX = ts.cameras.main.scrollX/3});
                    m2.on('update', () => {m2.tilePositionX = ts.cameras.main.scrollX/2});
                    array.push(m1);
                    array.push(m2);

                    break;
                    case 'sea':
                        let s1 = t.add.tileSprite(0,0,480, 270, 'bgatlas', 'bgs_5')
                        .setOrigin(0,0)
                        .setScrollFactor(0,0)
                        .setDepth(1)
                        .setPosition(0, 0);
        
                        let s2 = t.add.tileSprite(0,0,480, 270, 'bgatlas', 'bgs_4')
                        .setOrigin(0,1)
                        .setScrollFactor(0,0)
                        .setDepth(2)
                        .setPosition(0,270);
                        // m1.on('update', () => {m1.tilePositionX = ts.cameras.main.scrollX/3});
                        s2.on('update', () => {s2.tilePositionX = ts.cameras.main.scrollX/2});
                        array.push(s1);
                        array.push(s2);
    

                    break;
    
                    
            default:
                break;
        }
    }
}