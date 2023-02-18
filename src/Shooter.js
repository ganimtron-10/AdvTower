import Phaser, { Time } from 'phaser'

let player
let cursors
let keys
let keySpace
let speed = 200
let playerBullets
let mousepoint

let enemies


let score = 0
let scoretext

class Bullet extends Phaser.GameObjects.Image {

    constructor(scene) {
        super(scene, 0, 0, 'box');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.scale = (0.3)
        this.setSize(1, 1);
    }

    // Fires a bullet from the player to the reticle
    fire(shooter, target) {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.worldX - this.x) / (target.worldY - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.worldY >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    }

    // Updates the position of the bullet each cycle
    update(time, delta) {

        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}



export default class Shooter extends Phaser.Scene {

    constructor() {
        super('shooter')
    }

    preload() {
        this.load.image('box', 'Box.png')
    }

    init(data) {
        this.web3 = data.web3
        score = 0
    }

    async create() {

        player = this.physics.add.sprite(150, 150, 'box')
        player.setCollideWorldBounds(true)

        playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        cursors = this.input.keyboard.createCursorKeys()
        keys = this.input.keyboard.addKeys('A,S,D,W');
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        mousepoint = this.input.activePointer

        // Fires bullet from player on left click of mouse
        this.input.on('pointerdown', function (pointer, time, lastFired) {
            if (player.active === false)
                return;

            // Get bullet from bullets group
            var bullet = playerBullets.get().setActive(true).setVisible(true);

            if (bullet) {
                bullet.fire(player, mousepoint);
                this.physics.add.collider(enemies, bullet, this.enemyHitCallback);
            }
        }, this);


        enemies = this.physics.add.group({
            key: "box",
            setOrigin: { x: 0, y: 0 },
        }).setTint(0xff0000);
        this.physics.add.collider(enemies, player, this.killPlayer, null, this)

        scoretext = this.add.text(10, 30, "Score: 0");

    }

    killPlayer(enemies, player) {
        this.scene.start('gameover', { score: score, lastGame: "shooter", web3: this.web3 })
    }

    update() {

        player.angle = (-180 / Math.PI) * Math.atan((mousepoint.worldX - player.x) / (mousepoint.worldY - player.y));

        if (cursors.left.isDown || keys.A.isDown) {
            player.setVelocityX(-speed);
        }
        else if (cursors.right.isDown || keys.D.isDown) {
            player.setVelocityX(speed);
        } else {
            player.setVelocityX(0)
        }

        if (cursors.up.isDown || keys.W.isDown) {
            player.setVelocityY(-speed);
        }
        else if (cursors.down.isDown || keys.S.isDown) {
            player.setVelocityY(speed);
        } else {
            player.setVelocityY(0)
        }

        this.moveToPlayer(player);


    }

    moveToPlayer(player) {
        let enemySpeed = 0.3
        enemies.getChildren().forEach(enemy => {
            enemy.angle = (-180 / Math.PI) * Math.atan((player.x - enemy.x) / (player.y - enemy.y));

            if (player.y >= enemy.y) {
                enemy.x += enemySpeed * Math.sin(-enemy.angle);
                enemy.y += enemySpeed * Math.cos(-enemy.angle);
            }
            else {
                enemy.x += -enemySpeed * Math.sin(-enemy.angle);
                enemy.y += -enemySpeed * Math.cos(-enemy.angle);
            }
        });

    }

    enemyHitCallback(enemy, bullet) {
        enemy.destroy()
        bullet.destroy()

        score += 10
        scoretext.text = "Score: " + score.toString()

        enemies.create(
            Math.random() * 1000 % 800,
            Math.random() * 1000 % 600,
            "box").setTint(0xff0000);

        if (Math.round(Math.random())) {
            enemies.create(
                Math.random() * 1000 % 800,
                Math.random() * 1000 % 600,
                "box").setTint(0xff0000);
        }
    }
}
