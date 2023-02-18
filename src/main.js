import Phaser from 'phaser'

import GameOver from './GameOver'
import GameChoose from './GameChoose'
import Home from './Home'
import Shooter from './Shooter'
import Breakout from './breakout'
import DisplayNFT from './DisplayNFT'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [Home, GameChoose, Shooter, Breakout, DisplayNFT, GameOver],
}

export default new Phaser.Game(config)
