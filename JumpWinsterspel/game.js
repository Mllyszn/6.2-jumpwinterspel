// Create a new Phaser game instance
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    // backgroundColor: '#f3cca3', //background color
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update, //comment = game werkend - uncomment = game niet werkend
    },
};

var game = new Phaser.Game(config);

let player;
let platforms;

function preload() {
    this.load.image("background", "assets/img/sky.png");
    this.load.image("ground", "assets/img/platform.png");
    this.load.image("platform", "assets/img/air_grass-platform.png");
    this.load.atlas('player', 'assets/img/player.png', 'assets/json/player.json');

    // this.load.spritesheet("player", "assets/img/jk_spritesheet_melvin.png", {
    //     frameWidth: 32,
    //     frameHeight: 26,
    // });
}

function create() {
    // Background
    this.add.sprite(0, 0, "background").setOrigin(0, 0);

    // Create platforms group
    platforms = this.physics.add.staticGroup();

    // Ground
    platforms.create(200, 575, "ground").setOrigin(0.5, 0).refreshBody();
    platforms.create(600, 575, "ground").setOrigin(0.5, 0).refreshBody();
    // platforms
    platforms.create(150, 175, "platform").setOrigin(0.5, 0).refreshBody(); // mid-left
    platforms.create(400, 330, "platform").setOrigin(0.5, 0).refreshBody(); // off-center
    platforms.create(625, 40, "platform").setOrigin(0.5, 0).refreshBody(); // top-right

    player = this.physics.add.sprite(100, 450, "player");
    player.setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    // Animations
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('player', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
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

    // var lancelot = this.add.sprite(500, 536)

    // lancelot.setOrigin(0.5, 1);
    //     lancelot.setScale(8);
    //     lancelot.play('idle');
}


function update() {
    this.input.keyboard.on("keydown", function (event) {
        if (event.key=='ArrowLeft') {
            player.setVelocityX(-160);
            player.anims.play("left", true);
        } else if (
            event.key=='ArrowRight'
        ) {
            player.setVelocityX(160);
            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);
            player.anims.play("turn");
        }

        // Jumping/springen
        if (
            event.key=='ArrowUp'
        ) {
            player.setVelocityY(-330);
        }
    });
    // if (this.input.keyboard.KeyDow(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
    //     player.setVelocityX(-160);
    //     player.anims.play("left", true);
    // } else if (this.input.keyboard.KeyDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
    //     player.setVelocityX(160);
    //     player.anims.play("right", true);
    // } else {
    //     player.setVelocityX(0);
    //     player.anims.play("turn");
    // }

    // // Jumping/springen
    // if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP) && player.body.touching.down) {
    //     player.setVelocityY(-330);
    // }
}
