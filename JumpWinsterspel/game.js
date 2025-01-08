// Window.onload= function(){
//     var game = new Phaser.game();
// }

let gameScene = new phaser.scene("Game");

gameScene.init = function () {};

gameScene.preload = function () {
    this.load.image('background', 'assets/img/sky.png');
};

gameScene.create = function () {};

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene,
    title: "winter jumpking",
    pixelArt: false,
};

let game = new Phaser.Game(config);