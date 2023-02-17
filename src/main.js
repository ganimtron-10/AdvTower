import Phaser from 'phaser'

import Shooter from './Shooter'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [Shooter],
}

export default new Phaser.Game(config)
