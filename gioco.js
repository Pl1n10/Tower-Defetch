class TowerDefenseGame extends Phaser.Scene {
    constructor() {
        super({ key: 'TowerDefenseGame' });
    }

    preload() {
        this.load.image('tower', 'assets/tower.png');
        this.load.image('dog', 'assets/dog.png');
        this.load.image('ball', 'assets/ball.png');
    }

    create() {
        this.towers = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            createCallback: (tower) => tower.setScale(0.05) // Ridimensiona la torre
        });
        this.dogs = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            createCallback: (dog) => dog.setScale(0.05) // Ridimensiona il cane
        });
        this.balls = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            createCallback: (ball) => ball.setScale(0.05) // Ridimensiona la palla
        });

        this.input.on('pointerdown', this.onPointerDown, this);
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnDog,
            callbackScope: this,
            loop: true
        });
        this.physics.add.overlap(this.dogs, this.balls, this.hitDog, null, this);
    }

    update() {
        this.dogs.getChildren().forEach(dog => {
            if (dog.x > this.sys.game.config.width) {
                dog.destroy();
            }
        });
    }

    onPointerDown(pointer) {
        let tower = this.towers.getChildren().find(tower => tower.getBounds().contains(pointer.x, pointer.y));
        if (tower) {
            this.shootBall(tower.x, tower.y);
        } else if (!this.towers.getChildren().some(tower => tower.getBounds().contains(pointer.x, pointer.y))) {
            let newTower = this.towers.create(pointer.x, pointer.y, 'tower');
            newTower.setImmovable(true).setScale(0.05); // Ridimensiona la nuova torre creata
        }
    }

    spawnDog() {
        let dog = this.dogs.create(0, Phaser.Math.Between(100, this.sys.game.config.height - 100), 'dog').setScale(0.05);
        dog.setVelocityX(Phaser.Math.Between(50, 100));
    }

    shootBall(x, y) {
        let ball = this.balls.create(x, y, 'ball').setScale(0.05);
        ball.setVelocityY(-300);
    }

    hitDog(dog, ball) {
        ball.destroy();
        dog.setVelocityX(-200);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [TowerDefenseGame]
};

const game = new Phaser.Game(config);

