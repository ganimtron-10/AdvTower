import Phaser from 'phaser'

let contract_abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_element",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_bulletspeed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ballspeed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_scoreinc",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_color",
				"type": "string"
			}
		],
		"name": "mintPowerUp",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPowerUpList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "element",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "bulletspeed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ballspeed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "scoreinc",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					}
				],
				"internalType": "struct AdvTower.PowerUp[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "powerUpList",
		"outputs": [
			{
				"internalType": "string",
				"name": "element",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bulletspeed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ballspeed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "scoreinc",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export default class GameOver extends Phaser.Scene {
	constructor() {
		super('gameover')

		this.text = ""
	}

	async init(data) {
		this.lastGame = data.lastGame
		this.score = data.score
		this.web3 = data.web3
		this.nftData = data.nftData

		const [address] = await this.web3.eth.requestAccounts();
		this.address = address
		this.myContract = new this.web3.eth.Contract(contract_abi, '0xB4130990BA5C28DA5269c65E297e8e7924728206');
	}

	preload() {

	}

	create() {
		let switchGame = this.add.text(550,
			500, 'SwitchGame')
			.setOrigin(0.5)
			.setPadding(10)
			.setStyle({ backgroundColor: '#111' })
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				this.scene.start('gamechoose', {
					web3: this.web3
				})
			})
			.on('pointerover', () => switchGame.setStyle({ fill: '#f39c12' }))
			.on('pointerout', () => switchGame.setStyle({ fill: '#FFF' }))


		if (this.score >= 200) {
			this.text = "You Won A NFT!"
			this.claimNFT(this.genNFTData())

		} else if (this.score >= 100) {
			this.text = "You Won A NFT!"
			this.claimNFT(this.genNFTData())


		} else {
			let restart = this.add.text(this.cameras.main.centerX,
				this.cameras.main.centerY, 'Restart')
				.setOrigin(0.5)
				.setPadding(10)
				.setStyle({ backgroundColor: '#111' })
				.setInteractive({ useHandCursor: true })
				.on('pointerdown', () => {
					this.scene.start(this.lastGame, {
						web3: this.web3,
						nftData: this.nftData
					})
				})
				.on('pointerover', () => restart.setStyle({ fill: '#f39c12' }))
				.on('pointerout', () => restart.setStyle({ fill: '#FFF' }))
			this.text = "Sorry You won Nothing!"
		}


		let ClaimNFTbtn = this.add.text(250,
			500, 'ClaimNFT & View')
			.setOrigin(0.5)
			.setPadding(10)
			.setStyle({ backgroundColor: '#111' })
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				this.scene.start('displaynft', {
					web3: this.web3,
					contract: this.myContract,
					account: this.address
				})
			})
			.on('pointerover', () => ClaimNFTbtn.setStyle({ fill: '#f39c12' }))
			.on('pointerout', () => ClaimNFTbtn.setStyle({ fill: '#FFF' }))

		this.add.text(10, 10, this.text);

	}

	genNFTData() {
		return {
			element: this.randomElement(),
			bulletspeed: this.randomNum(1, 3),
			ballspeed: this.randomNum(1, 3),
			scoreinc: 5 * this.randomNum(1, 3),
			color: this.randomColor()
		}
	}

	randomElement() {

		var letters = "ABCDEFGHIJKLMNOPQRSTVWXYZ";

		var ele = '';

		for (var i = 0; i < this.randomNum(3, 8); i++)
			ele += letters[(Math.floor(Math.random() * 25))];

		return ele


	}

	randomColor() {

		var letters = "0123456789ABCDEF";

		var color = '0x';

		for (var i = 0; i < 6; i++)
			color += letters[(Math.floor(Math.random() * 16))];

		return color


	}

	randomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	async claimNFT(nftData) {

		const [address] = await this.web3.eth.requestAccounts();
		this.address = address
		this.myContract = new this.web3.eth.Contract(contract_abi, '0xB4130990BA5C28DA5269c65E297e8e7924728206');

		console.log(this.myContract)

		this.myContract.methods.mintPowerUp(this.address,
			nftData.element,
			nftData.bulletspeed,
			nftData.ballspeed,
			nftData.scoreinc,
			nftData.color).send({
				from: this.address,
				value: this.web3.utils.toWei('10', 'wei'),
				gas: 2000000
			}).then(function (recepit) {
				console.log(recepit)

			})
	}
}
