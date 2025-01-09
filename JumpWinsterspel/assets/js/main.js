import './style.css'
import phaser from 'phaser'

const sizes={
    width: 500,
    height: 500
}

const config = {
    type: Phaser.WEBGL,
    width: 500,
    height: 500,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
parent : "game-container",
backgroundColor: "#028af8",
scale:{
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
},
  scene: [Boot, Preloader, MainMenu, Game, GameOver]
}

const game = new Phaser.Game(config)