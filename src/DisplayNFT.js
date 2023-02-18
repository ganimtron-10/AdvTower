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

        let switchGame = this.add.text(400,
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

        this.displayNFT()

    }

    displayNFT() {

        if (this.contract) {
            this.contract.methods.getPowerUpList().call({
                from: this.account,
                gas: 2000000
            }).then((receipt) => {
                console.log("displaynft", receipt)
                let nftString = ""
                receipt.forEach(arr => {
                    arr.forEach(ele => {
                        nftString += ele + "  "
                    });
                    nftString += "\n"
                })

                console.log(nftString)

                this.add.text(400, 150, nftString).setOrigin(0.5);
            })
        }






    }
}
