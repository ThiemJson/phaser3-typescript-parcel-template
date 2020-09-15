import Phaser, { Physics } from "phaser";
import TextureKeys from "../const/TextureKeys";
import AnimationKeys from "~/const/AnimationKeys";
import SceneKeys from "~/const/SceneKeys";
export class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }
  preload() {
    //console.log("Preloading");
    this.load.image(TextureKeys.Background, "house/bg_repeat_340x640.png");
    this.load.image(TextureKeys.Bookcase1, "house/object_bookcase1.png");
    this.load.image(TextureKeys.Bookcase2, "house/object_bookcase2.png");
    this.load.image(TextureKeys.MouseHole, "house/object_mousehole.png");
    this.load.image(TextureKeys.Window1, "house/object_window1.png");
    this.load.image(TextureKeys.Window2, "house/object_window2.png");
    this.load.image(TextureKeys.LaserEnd, "house/object_laser_end.png");
    this.load.image(TextureKeys.LaserMiddle, "house/object_laser.png");
    this.load.image(TextureKeys.Coin, "house/object_coin.png");
    this.load.atlas(
      TextureKeys.RocketMouse,
      "characters/rocket-mouse.png",
      "characters/rocket-mouse.json"
    );
  }
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    // copied from Game Scene
    this.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: [
        { key: TextureKeys.RocketMouse, frame: "rocketmouse_run01.png" },
        { key: TextureKeys.RocketMouse, frame: "rocketmouse_run02.png" },
        { key: TextureKeys.RocketMouse, frame: "rocketmouse_run03.png" },
        { key: TextureKeys.RocketMouse, frame: "rocketmouse_run04.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: "flame",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    //Fly RocketMouse Animation
    this.anims.create({
      key: AnimationKeys.RocketMouseFly,
      frames: [
        {
          key: TextureKeys.RocketMouse,
          frame: "rocketmouse_fly01.png",
        },
      ],
    });

    //Fall RocketMouse Animation
    this.anims.create({
      key: AnimationKeys.RocketMouseFall,
      frames: [
        {
          key: TextureKeys.RocketMouse,
          frame: "rocketmouse_fall01.png",
        },
      ],
    });

    this.anims.create({
      key: AnimationKeys.RocketMouseDead,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: "rocketmouse_dead",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.scene.start(SceneKeys.Game);
  }
}
