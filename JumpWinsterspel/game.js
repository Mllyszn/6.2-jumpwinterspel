// Create a new Phaser game instance
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#f3cca3',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // No gravity for a platformer
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

let player;
let platforms;

function preload() {
    this.load.image("background", "assets/img/sky.png");
    this.load.image("ground", "assets/img/platform.png");
    this.load.image("platform", "assets/img/air_grass-platform.png");
    this.load.spritesheet("player", "assets/img/jk_spritesheet.png", {
        frameWidth: 32,
        frameHeight: 48,
    });
}

function create() {
    // Background
    this.add.sprite(0, 0, "background").setOrigin(0, 0);

    // Create platforms group
    platforms = this.physics.add.staticGroup();

    // Ground
    platforms.create(400, 575, "ground").setOrigin(0.5, 0).refreshBody();
    platforms.create(600, 400, "ground").setOrigin(0.5, 0).refreshBody();
    platforms.create(50, 175, "platform").setOrigin(0.5, 0).refreshBody(); // mid-left
    platforms.create(400, 330, "platform").setOrigin(0.5, 0).refreshBody(); // off-center
    platforms.create(450, 40, "platform").setOrigin(0.5, 0).refreshBody(); // top-right

    // Player
    player = this.physics.add.sprite(100, 450, "player");
    player.setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Collide player with platforms
    this.physics.add.collider(player, platforms);

    // Animations
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
}

function update() {
    // Handle player input for movement
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        player.setVelocityX(-160);
        player.anims.play("left", true);
    } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        player.setVelocityX(160);
        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);
        player.anims.play("turn");
    }

    // Jumping
    if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP) && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}