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
import { BouncingBlade } from "./entities/BouncingBlade";
import { Portal } from "./entities/Portal";
import { Warp } from "./entities/Warp";
import { VAffect } from "./entities/VAffect";

export class ObjectFactory {
    static PlaceObjects(map: Phaser.Tilemaps.Tilemap, ts:TsetScene) {
        let o = map.getObjectLayer('o');
        let ninja:any = o.objects.find( (obj:any) =>{return obj.name == 'ninja'}  );
        let ypos = Math.round(ninja.y / C.TILE_SIZE) * C.TILE_SIZE;
        ts.player.sprite.setPosition(ninja.x, ypos).setDepth(6).setTint(C.GetNinjaColor());

        let sams = o.objects.filter( (obj:any) => {return obj.name == 'samurai'});
        sams.forEach( (o:any) => {
            let s = new Samurai(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            ts.allSprites.push(s.sprite);
            if(o.properties != null && o.properties.find((p:any)=> {return p.name == 'flipX'}) != null)
                s.sprite.flipX = true;
        });
        let demons = o.objects.filter( (obj:any) => {return obj.name == 'demon'});
        demons.forEach( (o:any) => {
            let d = new Demon(ts);
            d.sprite.setPosition(o.x,o.y).setDepth(5);
            if(o.properties != null && o.properties.find((p:any)=> {return p.name == 'flipX'}) != null)
                d.sprite.flipX = true;
        });
        let mag = o.objects.filter( (obj:any) => {return obj.name == 'magistrate'});
        mag.forEach( (o:any) => {
            let s = new Magistrate(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            ts.allSprites.push(s.sprite);
        });
        let rs = o.objects.filter( (obj:any) => {return obj.name == 'royalsamurai'});
        rs.forEach( (o:any) => {
            let s = new RoyalSamurai(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            ts.allSprites.push(s.sprite);
        });
        let pots = o.objects.filter( (obj:any) => {return obj.name == 'pot'});
        pots.forEach( (o:any) => {
            let p = new Pot(ts);
            let ypos = Math.round(o.y / C.TILE_SIZE) * C.TILE_SIZE;
            p.sprite.setPosition(o.x,ypos - 8).setDepth(5);
            ts.allSprites.push(p.sprite);
        });
        let blades = o.objects.filter( (obj:any) => {return obj.name == 'blade'});
        blades.forEach( (o:any) => {
            let s = new LargeBlade(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            ts.allSprites.push(s.sprite);
        });
        let grasses = o.objects.filter( (obj:any) => {return obj.name == 'grass'});
        grasses.forEach( (o:any) => {
            let s = new Grass(ts);
            s.sprite.setDepth(7);
            let ypos = Math.round(o.y / C.TILE_SIZE) * C.TILE_SIZE;
            let xpos = Math.round(o.x / C.TILE_SIZE) * C.TILE_SIZE;

            s.sprite.setPosition(xpos,ypos+8);
            ts.allSprites.push(s.sprite);
        });
        let bolts = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'bolt'});
        bolts.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let s = new Crossbow(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            let angle = o.properties.find((p:any) => {return p.name == 'angle'});
            let vel = o.properties.find((p:any) => {return p.name == 'velocity'});
            let d = o.properties.find((p:any) => {return p.name == 'firedelay'});
            let off = o.properties.find((p:any) => {return p.name == 'fireoffset'});
            s.ArmCrossbow(angle.value, vel.value, d.value, off.value);
            ts.allSprites.push(s.sprite);
        });
        let warps = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'warp'});
        warps.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let s = new Warp(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            let angle = o.properties.find((p:any) => {return p.name == 'angle'});
            let strength = o.properties.find((p:any) => {return p.name == 'strength'});
            let rotation = o.properties.find((p:any) => {return p.name == 'rotate'});
            if(rotation != null)
                s.sprite.setAngularVelocity(rotation.value);
            s.sprite.angle = angle.value;
            s.strength = strength.value;
            
            ts.allSprites.push(s.sprite);
        });
        let bblades = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'bblade'});
        bblades.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let s = new BouncingBlade(ts);
            s.sprite.setPosition(o.x,o.y).setDepth(5);
            let angle = o.properties.find((p:any) => {return p.name == 'angle'});
            let vel = o.properties.find((p:any) => {return p.name == 'velocity'});
            ts.physics.velocityFromAngle(angle.value, vel.value, s.sprite.body.velocity);
            s.lastSpeed.copy(s.sprite.body.velocity);
            // s.speed.copy(s.sprite.body.velocity);
            ts.allSprites.push(s.sprite);
        });
        let poisons = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'poison'});
        poisons.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let p = new Poison(ts);
            p.sprite.setPosition(o.x,o.y).setDepth(5);
            ts.allSprites.push(p.sprite);
        });
        let downs = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'vaffect'});
        downs.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let p = new VAffect(ts);
            //@ts-ignore
            C.CenterOfTile(o);
            p.sprite.setPosition(o.x,o.y).setDepth(5);
            if(o.type == '1')
                p.IsVertical(false);
            ts.allSprites.push(p.sprite);
        });
        let portals = o.objects.filter( (obj:Phaser.Types.Tilemaps.TiledObject) => {return obj.name == 'portal'});
        let allPortals:Array<{key:number, portal:Portal}> = [];
        portals.forEach( (o:Phaser.Types.Tilemaps.TiledObject) => {
            let p = new Portal(ts);
            let n:number = parseInt(o.type);
            //Find a matching portal if there is one.
            let match = allPortals.find((o) => {return o.key==n});
            if(match != null) {
                p.CreateLink(match.portal);
            } else {
                allPortals.push({key:n, portal:p});

            }

            //@ts-ignore
            C.CenterOfTile(o);
            p.sprite.setPosition(o.x,o.y).setDepth(5);
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
                g.sprite.setPosition(xpos, ypos).setDepth(5);
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
            f.sprite.setPosition(flag.x, ypos).setDepth(5);
            ts.allSprites.push(f.sprite); 
        }
        let well = o.objects.find( (obj:any) => {return obj.name == 'well';});
        if(well != null) {
            let w = new Well(ts);
            //@ts-ignore
            let ypos = Math.round(well.y / C.TILE_SIZE) * C.TILE_SIZE;
            w.sprite.setPosition(well.x, ypos).setDepth(5);
            ts.allSprites.push(w.sprite); 
        }
    }

}