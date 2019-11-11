import { TsetScene } from "./scenes/TestScene";
import { C } from "./C";
import { Samurai } from "./entities/Samurai";
import { Magistrate } from "./entities/Magistrate";
import { RoyalSamurai } from "./entities/RoyalSamurai";
import { Pot } from "./entities/Pot";
import { LargeBlade } from "./entities/LargeBlade";
import { Grass } from "./entities/Grass";
import { Crossbow } from "./entities/Crossbow";
import { Flag } from "./entities/Flag";
import { Well } from "./entities/Well";
import { Poison } from "./entities/Poison";
import { Glass } from "./entities/Glass";
import { Demon } from "./entities/Demon";

export class ObjectFactory {
    static PlaceObjects(map: Phaser.Tilemaps.Tilemap, ts:TsetScene) {
        let o = map.getObjectLayer('o');
        let ninja:any = o.objects.find( (obj:any) =>{return obj.name == 'ninja'}  );
        let ypos = Math.round(ninja.y / C.TILE_SIZE) * C.TILE_SIZE;
        ts.player.sprite.setPosition(ninja.x, ypos);

        let sams = o.objects.filter( (obj:any) => {return obj.name == 'samurai'});
        sams.forEach( (o:any) => {
            let s = new Samurai(ts);
            s.sprite.setPosition(o.x,o.y);
            ts.allSprites.push(s.sprite);
            if(o.properties != null && o.properties.find((p:any)=> {return p.name == 'flipX'}) != null)
                s.sprite.flipX = true;
        });
        let demons = o.objects.filter( (obj:any) => {return obj.name == 'demon'});
        demons.forEach( (o:any) => {
            let d = new Demon(ts);
            d.sprite.setPosition(o.x,o.y);
            if(o.properties != null && o.properties.find((p:any)=> {return p.name == 'flipX'}) != null)
                d.sprite.flipX = true;
        });
        let mag = o.objects.filter( (obj:any) => {return obj.name == 'magistrate'});
        mag.forEach( (o:any) => {
            let s = new Magistrate(ts);
            s.sprite.setPosition(o.x,o.y);
            ts.allSprites.push(s.sprite);
        });
        let rs = o.objects.filter( (obj:any) => {return obj.name == 'royalsamurai'});
        rs.forEach( (o:any) => {
            let s = new RoyalSamurai(ts);
            s.sprite.setPosition(o.x,o.y);
            ts.allSprites.push(s.sprite);
        });
        let pots = o.objects.filter( (obj:any) => {return obj.name == 'pot'});
        pots.forEach( (o:any) => {
            let p = new Pot(ts);
            let ypos = Math.round(o.y / C.TILE_SIZE) * C.TILE_SIZE;
            p.sprite.setPosition(o.x,ypos - 8);
            ts.allSprites.push(p.sprite);
        });
        let blades = o.objects.filter( (obj:any) => {return obj.name == 'blade'});
        blades.forEach( (o:any) => {
            let s = new LargeBlade(ts);
            s.sprite.setPosition(o.x,o.y);
            ts.allSprites.push(s.sprite);
        });
        let grasses = o.objects.filter( (obj:any) => {return obj.name == 'grass'});
        grasses.forEach( (o:any) => {
            let s = new Grass(ts);
            s.sprite.setDepth(6);
            let ypos = Math.round(o.y / C.TILE_SIZE) * C.TILE_SIZE;
            let xpos = Math.round(o.x / C.TILE_SIZE) * C.TILE_SIZE;

            s.sprite.setPosition(xpos,ypos+8);
            ts.allSprites.push(s.sprite);
        });
        let bolts = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'bolt'});
        bolts.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let s = new Crossbow(ts);
            s.sprite.setPosition(o.x,o.y);
            let angle = o.properties.find((p:any) => {return p.name == 'angle'});
            let vel = o.properties.find((p:any) => {return p.name == 'velocity'});
            let d = o.properties.find((p:any) => {return p.name == 'firedelay'});
            let off = o.properties.find((p:any) => {return p.name == 'fireoffset'});
            s.ArmCrossbow(angle.value, vel.value, d.value, off.value);
            ts.allSprites.push(s.sprite);
        });
        let poisons = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'poison'});
        poisons.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let p = new Poison(ts);
            p.sprite.setPosition(o.x,o.y);
            ts.allSprites.push(p.sprite);
        });
        let glasses = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'glass'});
        glasses.forEach( (o:any) => {
            let linkedGlass:Array<Glass> = [];
            let xpos = o.x;
            let ypos = o.y;
            C.CenterOfTile({x:xpos, y:ypos});
            // xpos += C.TILE_SIZE/2;
            ypos += C.TILE_SIZE/2;

            while (ypos < o.height + o.y) {
                let g = new Glass(ts);
                g.sprite.setPosition(xpos, ypos);
                ts.allSprites.push(g.sprite);
                linkedGlass.push(g);
                ypos += C.TILE_SIZE;
            }

            linkedGlass.forEach(element => {
                element.LinkGlass(linkedGlass);
            });


        });

        let flag = o.objects.find( (obj:any) => {return obj.name == 'flag';});
        if(flag != null) {
            let f = new Flag(ts);
            //@ts-ignore
            let ypos = Math.round(flag.y / C.TILE_SIZE) * C.TILE_SIZE;
            f.sprite.setPosition(flag.x, ypos);
            ts.allSprites.push(f.sprite); 
        }
        let well = o.objects.find( (obj:any) => {return obj.name == 'well';});
        if(well != null) {
            let w = new Well(ts);
            //@ts-ignore
            let ypos = Math.round(well.y / C.TILE_SIZE) * C.TILE_SIZE;
            w.sprite.setPosition(well.x, ypos);
            ts.allSprites.push(w.sprite); 
        }
    }

}