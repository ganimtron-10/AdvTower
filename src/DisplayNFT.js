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
            500, 'PlayGame')
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
                let x = 200, y = 50;
                receipt.forEach(arr => {
                    arr.forEach(ele => {
                        nftString += ele.toString() + "  "
                    });

                    y += 50
                    this.add.text(x, y, nftString, { fontSize: 20 }).setOrigin(0.5);
                    let equipText = this.add.text(x + 200, y, "Equip", { fontSize: 20 }).setOrigin(0.5)
                        .setInteractive({ useHandCursor: true })
                        .on('pointerdown', () => {
                            this.scene.start('gamechoose', {
                                web3: this.web3,
                                nftData: arr
                            })
                        })
                        .on('pointerover', () => equipText.setStyle({ fill: '#f39c12' }))
                        .on('pointerout', () => equipText.setStyle({ fill: '#FFF' }));


                    nftString = ""

                })


            })
        } else {
            console.log("Contract undefined")
        }






    }
}
