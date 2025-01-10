// Window.onload= function(){
//     var game = new Phaser.game();
// }

let gameScene = new Phaser.Scene("Game");

gameScene.init = function () {};

gameScene.preload = function () {
    this.load.image("background", "assets/img/sky.png");
    this.load.image("ground", "assets/img/platform.png");
    this.load.image("platform", "assets/img/air_grass-platform.png");
    // this.load.image("player", "assets/img/slime.png");
    this.load.spritesheet("player", "assets/img/jk_spritesheet.png", {
        frameWidth: 32,
        frameHeight: 48,
    });
};

let player;

gameScene.create = function () {
    // background
    this.add.sprite(0, 0, "background").setOrigin(0, 0);
    // ground
    this.add.sprite(0, 575, "ground").setOrigin(0, 0);
    this.add.sprite(400, 575, "ground").setOrigin(0, 0);
    // air platforms
    this.add.sprite(50, 175, "platform").setOrigin(0, 0); //mid-left
    this.add.sprite(400, 330, "platform").setOrigin(0, 0); //off-center
    this.add.sprite(450, 40, "platform").setOrigin(0, 0); //top-right
    // player

    player = this.physics.add.sprite(100, 450, "player");

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "turn",
        frames: [{ key: "player", frame: 4 }],
        frameRate: 20,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: gameScene,
    title: "winter jumpking",
    pixelArt: false,
};

let game = new Phaser.Game(config);
