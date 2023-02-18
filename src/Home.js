import Phaser from 'phaser'
import Web3 from 'web3';


export default class Home extends Phaser.Scene {
	constructor() {
		super('home')

	}

	preload() {
	}

	create() {

		this.add.text(this.cameras.main.centerX,
			this.cameras.main.centerY - 100, 'AdvTower', {
			fontSize: 75
		}).setOrigin(0.5)

		let connectWallet = this.add.text(this.cameras.main.centerX,
			this.cameras.main.centerY, 'Connect Wallet ')
			.setOrigin(0.5)
			.setPadding(10)
			.setStyle({ backgroundColor: '#111' })
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', this.connectWallet)
			.on('pointerover', () => connectWallet.setStyle({ fill: '#f39c12' }))
			.on('pointerout', () => connectWallet.setStyle({ fill: '#FFF' }))
	}

	async connectWallet() {
		// Connect wallet if sucessfull go to next scene

		if (window.ethereum) {
			const web3 = new Web3(window.ethereum)
			this.scene.scene.start('gamechoose', {
				web3: web3
			})
		} else {
			alert("Please Install MetaMask!")
		}


	}
}
