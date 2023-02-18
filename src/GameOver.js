import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
	constructor() {
		super('gameover')

		this.text = ""
	}

	init(data) {
		this.score = data.score
	}

	preload() {

	}

	create() {

		if (this.score >= 200) {
			this.text = "You Won A fire NFT!"
		} else if (this.score >= 100) {
			this.text = "You Won A snow NFT!"
		} else {
			let restart = this.add.text(this.cameras.main.centerX,
				this.cameras.main.centerY, 'Restart')
				.setOrigin(0.5)
				.setPadding(10)
				.setStyle({ backgroundColor: '#111' })
				.setInteractive({ useHandCursor: true })
				.on('pointerdown', () => {
					this.scene.start('shooter', {
						web3: this.web3
					})
				})
				.on('pointerover', () => restart.setStyle({ fill: '#f39c12' }))
				.on('pointerout', () => restart.setStyle({ fill: '#FFF' }))
			this.text = "Sorry You won Nothing!"
		}

		this.add.text(10, 10, this.text);

	}

	claimNFT() {

	}
}
