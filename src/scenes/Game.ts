import Phaser, { Physics } from "phaser";
import SceneKeys from "~/const/SceneKeys";
import AnimationKeys from "~/const/AnimationKeys";
import TextureKeys from "~/const/TextureKeys";
import RocketMouse from "~/game/RocketMouse";
import LaserObstacle from "~/game/LaserObstacle";
import { Constraint } from "matter";
export class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private mouseHole!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private laserObstacle!: LaserObstacle;
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private scoreLabel!: Phaser.GameObjects.Text;
  private bookcases: Phaser.GameObjects.Image[] = [];
  private windows: Phaser.GameObjects.Image[] = [];
  private mouse!: RocketMouse;
  private score = 0;
  constructor() {
    super(SceneKeys.Game);
  }
  init() {
    this.score = 0;
  }
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.mouseHole = this.add.image(
      Phaser.Math.Between(900, 1500),
      500,
      TextureKeys.MouseHole
    );

    this.bookcase1 = this.add.image(
      Phaser.Math.Between(400, 700),
      350,
      TextureKeys.Bookcase1
    );
    this.bookcase2 = this.add.image(
      Phaser.Math.Between(750, 1000),
      350,
      TextureKeys.Bookcase1
    );
    this.bookcases = [this.bookcase1, this.bookcase2];
    this.windows = [this.window1, this.window2];
    this.window1 = this.add.image(
      Phaser.Math.Between(0, 400),
      150,
      TextureKeys.Window1
    );
    this.window2 = this.add.image(
      Phaser.Math.Between(0, 400),
      150,
      TextureKeys.Window2
    );
    this.scoreLabel = this.add
      .text(10, 10, `Score: ${this.score}`, {
        fontSize: 24,
        color: "#080808",
        backgroundColor: "#F8E71C",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setScrollFactor(0);

    // const mouse = this.physics.add
    //   .sprite(width * 0.5, height - 100, TextureKeys.RocketMouse)
    //   .setOrigin(0, 0)
    //   .play(AnimationKeys.RocketMouseRun);

    const mouse = new RocketMouse(this, width * 0.2, height - 30);
    this.add.existing(mouse);
    this.mouse = mouse;

    this.laserObstacle = new LaserObstacle(this, width * 0.9, height * 0.1);
    this.add.existing(this.laserObstacle);

    this.coins = this.physics.add.staticGroup();
    this.spawnCoins();

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setVelocityX(200);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 50);

    this.cameras.main.startFollow(mouse,true,undefined,undefined,-200);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.physics.add.overlap(
      this.laserObstacle,
      mouse,
      this.handleOverlapLaser,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.coins,
      mouse,
      this.handleCollectCoin,
      undefined,
      this
    );
  }

  //This method called when RocketMouse and Coin overlaped
  private handleCollectCoin(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    // obj2 will be the coin
    const coin = obj2 as Phaser.Physics.Arcade.Sprite;
    // use the group to hide it
    this.coins.killAndHide(coin);
    // and turn off the physics body
    coin.body.enable = false;
    this.score++;
    this.scoreLabel.text = `Score: ${this.score}`;
  }

  //SpawnCoints
  private spawnCoins() {
    this.coins.children.each((child) => {
      const coin = child as Phaser.Physics.Arcade.Sprite;
      this.coins.killAndHide(coin);
      coin.body.enable = false;
    });

    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let x = rightEdge + 100;
    //Randrom number of coins from 1 - 20
    const numCoins = Phaser.Math.Between(1, 20);

    for (let i = 0; i < numCoins; i++) {
      const coin = this.coins.get(
        x,
        Phaser.Math.Between(100, this.scale.height - 100),
        TextureKeys.Coin
      ) as Phaser.Physics.Arcade.Sprite;
      coin.setVisible(true);
      coin.setActive(true);

      const body = coin.body as Phaser.Physics.Arcade.StaticBody;
      body.setCircle(body.width * 0.5);
      body.enable = true;

      body.updateFromGameObject();
      x += coin.width * 1.5;
    }
  }
  private handleOverlapLaser(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const mouse = obj2 as RocketMouse;
    mouse.kill();
  }
  update(t: number, dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.wrapMouseHole();
    this.wrapBookcases();
    this.wrapLaserObtale();
    this.teleportBackwards();
  }
  private wrapMouseHole() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;
    if (this.mouseHole.x + this.mouseHole.width < scrollX) {
      this.mouseHole.x = Phaser.Math.Between(rightEdge + 500, rightEdge + 1000);
      this.spawnCoins;
    }
  }
  private wrapBookcases() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.bookcase1.width * 2;
    if (this.bookcase1.x + width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );
      // const overlap = this.windows.find((win) => {
      //   return Math.abs(this.bookcase1.x - win.x) <= win.width;
      // });

      // this.bookcase1.visible = !overlap;
    }

    width = this.bookcase2.width;
    if (this.bookcase2.x + width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + width + 800
      );

      // const overlap = this.windows.find((win) => {
      //   return Math.abs(this.bookcase2.x - win.x) <= win.width;
      // });

      // this.bookcase2.visible = !overlap;

      //  this.spawnCoins()
    }
  }

  /**
   * Random LaserObtale when this @returns @param:
   */
  private wrapLaserObtale() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody;

    const width = body.width;

    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + 50,
        rightEdge + 1000
      );
      this.laserObstacle.y = Phaser.Math.Between(0, 300);
      body.position.x = this.laserObstacle.x + body.offset.x;
      body.position.y = this.laserObstacle.y;
    }
  }

  /**
   * Backwards all of items when scrollX to maxX
   */
  private teleportBackwards() {
    const scrollX = this.cameras.main.scrollX;
    const maxX = 2380;

    //Teleport mouse and mouse hole
    if (scrollX > maxX) {
      this.mouse.x -= maxX;
      this.mouseHole.x -= maxX;
      //Teleport each bookcases

      this.bookcases.forEach((bc) => {
        bc.x -= maxX;
      });

      //Teleport the laser
      this.laserObstacle.x -= maxX;
      const laserBody = this.laserObstacle
        .body as Phaser.Physics.Arcade.StaticBody;
      laserBody.x -= maxX;

      this.spawnCoins();
      //Teleport any spawn coins
      this.coins.children.each((child) => {
        const coin = child as Phaser.Physics.Arcade.Sprite;
        if (!coin.active) {
          return;
        }
        coin.x -= maxX;
        const coinBody = coin.body as Phaser.Physics.Arcade.StaticBody;
        coinBody.updateFromGameObject();
      });
    }
  }
}

