import Phaser from 'phaser'

export default class GameChoose extends Phaser.Scene {
	constructor() {
		super('gamechoose')

	}

	init(data) {
		this.web3 = data.web3
	}

	preload() {

	}

	async create() {
		const [address] = await this.web3.eth.requestAccounts()
		this.add.text(50, 0, `Wallet Connected with Address: ${address}`)


		let game1 = this.add.text(this.cameras.main.centerX - 150,
			this.cameras.main.centerY, 'Game 1')
			.setOrigin(0.5)
			.setPadding(10)
			.setStyle({ backgroundColor: '#111' })
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', this.selectGame1)
			.on('pointerover', () => game1.setStyle({ fill: '#f39c12' }))
			.on('pointerout', () => game1.setStyle({ fill: '#FFF' }))

		let game2 = this.add.text(this.cameras.main.centerX + 150,
			this.cameras.main.centerY, 'Game 2')
			.setOrigin(0.5)
			.setPadding(10)
			.setStyle({ backgroundColor: '#111' })
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', this.selectGame2)
			.on('pointerover', () => game2.setStyle({ fill: '#f39c12' }))
			.on('pointerout', () => game2.setStyle({ fill: '#FFF' }))
	}

	selectGame1() {
		this.scene.scene.start('shooter', {
			web3: this.web3
		})
	}

	selectGame2() {
		this.scene.scene.start('breakout', {
			web3: this.web3
		})
	}
}
