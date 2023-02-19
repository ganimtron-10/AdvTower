// This code is taken from phaser docs and modified to support the project idea


import Phaser from 'phaser'

export default class Breakout extends Phaser.Scene {

    constructor() {
        super('breakout');

        this.bricks;
        this.paddle;
        this.ball;
        this.lives = 3;
        this.liveText;
        this.score = 0;
        this.bspeed = 1;
    }

    init(data) {
        this.web3 = data.web3
        this.lives = 3
        this.nftData = data.nftData
        this.score = 0;
    }

    preload() {
        this.load.atlas('assets', 'breakout.png', 'breakout.json');
    }

    create() {
        this.scoretext = this.add.text(10, 10, `Score: ${this.score}`)
        this.liveText = this.add.text(10, 30, `Lives: ${this.lives}`)
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });

        this.ball = this.physics.add.image(400, 500, 'assets', 'ball2').setCollideWorldBounds(true).setBounce(1);
        if (this.nftData) {
            this.ball.setTint(this.nftData[4])
            this.bspeed = this.nftData[2]
            this.scorei = this.nftData[3]

        }
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

        //  Our colliders
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        //  Input events
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.on('pointerup', function (pointer) {

            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }

        }, this);
    }

    hitBrick(ball, brick) {
        brick.disableBody(true, true);
        if (this.scorei) {
            this.score += parseInt(this.scorei)
        } else {
            this.score += 5
        }
        this.scoretext.text = `Score: ${this.score}`

        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }
    }

    resetBall() {
        if (this.lives > 1) {
            this.ball.setVelocity(0);
            this.ball.setPosition(this.paddle.x, 500);
            this.ball.setData('onPaddle', true);
            this.lives--;
            this.liveText.text = `Lives: ${this.lives}`
        } else {
            this.resetLevel()
        }
    }

    resetLevel() {

        // this.resetBall();

        // this.bricks.children.each(function (brick) {

        //     brick.enableBody(false, 0, 0, true, true);

        // });
        this.scene.start('gameover', { score: this.score, lastGame: "breakout", web3: this.web3 })
    }

    hitPaddle(ball, paddle) {
        var diff = 0;

        if (ball.x < paddle.x) {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * this.bspeed * diff);
        }
        else if (ball.x > paddle.x) {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * this.bspeed * diff);
        }
        else {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 * this.bspeed + Math.random() * 8);
        }
    }

    update() {
        if (this.ball.y > 600) {
            this.resetBall();
        }
    }


}