// Window.onload= function(){
//     var game = new Phaser.game();
// }

let gameScene = new Phaser.Scene("Game");

gameScene.init = function () {};

gameScene.preload = function () {
    this.load.image('background', 'assets/img/sky.png');
    this.load.image('platform', 'assets/img/platform.png');
    this.load.image('character', 'assets/img/slime.png');
};

gameScene.create = function () {

    this.add.sprite(0,0, 'background').setOrigin(0,0);
};

let config = {
    type: Phaser.AUTO,
    width: 650,
    height: 400,
    scene: gameScene,
    title: "winter jumpking",
    pixelArt: false,
};

let game = new Phaser.Game(config);