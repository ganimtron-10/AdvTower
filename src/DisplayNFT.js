import Phaser from 'phaser'


export default class DisplayNFT extends Phaser.Scene {
    constructor() {
        super('displaynft')
    }

    init(data) {
        this.web3 = data.web3
        this.contract = data.contract
        this.account = data.account
    }


    create() {

        this.add.text(this.cameras.main.centerX,
            50, 'Display NFT').setOrigin(0.5)

        this.displayNFT()

    }

    displayNFT() {
        this.contract.methods.getPowerUpList().call({
            from: this.account,
            gas: 2000000
        }).then((receipt) => {
            console.log("displaynft", receipt)
        })




    }
}
