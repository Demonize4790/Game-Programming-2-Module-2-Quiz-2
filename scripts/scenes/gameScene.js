export default class gameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }

    init() {
        this.score = 0;
        this.timeSurvived = 0;
    }

    preload() {
        //IMAGES
        this.load.image('gSBackground', 'assets/images/bgv.png');
        this.load.image('player', 'assets/images/spaceship.png');
        this.load.image('projectile', 'assets/images/bullets2.png');
        this.load.image('obstacle', 'assets/images/alien1.png');
        this.load.image('obstacleTwo', 'assets/images/alien2.png');  
        this.load.image('obstacleThree', 'assets/images/alien1.png');  

        //AUDIO
        this.load.audio('gameMusic', 'assets/audio/music/gameplayMusic.mp3');
        this.load.audio('shotSound', 'assets/audio/sound-effect/bullet2.mp3');
        this.load.audio('hitSound', 'assets/audio/sound-effect/slap.mp3');
    }

    create() {
        this.sound.stopAll();

   

        this.backgroundMusic = this.sound.add('gameMusic', { volume: 0.5, loop: true });
        this.backgroundMusic.play();
        this.gSBackground = this.add.image(0, 0, 'gSBackground').setOrigin(0, 0);
        this.gSBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
        // SHOOT
            this.shot = this.sound.add('shotSound', { volume: 0.4 });
            this.hit = this.sound.add('hitSound', { volume: 0.4}); 
        
            this.player = this.physics.add.sprite(400, 1100, 'player').setCollideWorldBounds(true);

        //PLAYER MOVEMENT
            this.cursors = this.input.keyboard.createCursorKeys();
            this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // BULLET
            this.projectiles = this.physics.add.group({
                classType: Phaser.Physics.Arcade.Image,
                defaultKey: 'projectile',
                maxSize: -1
            });
    

        this.obstacles = this.physics.add.group();
        this.physics.add.collider(this.projectiles, this.obstacles, this.destroyObstacle, null, this);
        this.physics.add.collider(this.player, this.obstacles, this.gameOver, null, this);
    
        // SCORE + TIME
            this.scoreText = this.add.text(10, 10, 'Score: 0 sec', { fontSize: '50px', fill: '#ffef' });
            this.timeText = this.add.text(10, 40, 'Time: 0 sec', { fontSize: '50px', fill: '#ffef' });
    
        // Timed events
            this.spawnObstacleTimer = this.time.addEvent({
                delay: 400, 
                callback: this.spawnObstacle,
                callbackScope: this,
                loop: true
            });
        
        this.updateTimeTimer = this.time.addEvent({
            delay: 700,
            callback: () => {
                this.timeSurvived += 1;
                this.timeText.setText(`Time: ${this.timeSurvived}s`);
                if (this.timeSurvived === 3000000) { 
                    this.winGame();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    spawnObstacle() {
        const obstacleTypes = ['obstacle', 'obstacleTwo', 'obstacleThree'];
        for (let i = 0; i < 5; i++) { 
            const x = Phaser.Math.Between(20, 800);
            const obstacleType = Phaser.Math.RND.pick(obstacleTypes);
            const obstacle = this.obstacles.create(x, 0, obstacleType);
            obstacle.setVelocityY(690);


            obstacle.checkWorldBounds = true;
            obstacle.outOfBoundsKill = true;
        }
    }

    destroyObstacle(projectile, obstacle) {
        if (projectile) {
            projectile.destroy(); 
            obstacle.destroy();
            this.hit.play();
 
        
            this.score += 50;
            this.scoreText.setText('Score: ' + this.score);
        }
    }

    gameOver(player, obstacle) {
        this.backgroundMusic.stop();
        this.scene.start('gameoverScene', { score: this.score, timeSurvived: this.timeSurvived });
    }

    winGame() {
        this.backgroundMusic.stop();
        this.scene.start('winningScene', { score: this.score, timeSurvived: this.timeSurvived, win: true });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-500);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(500);
        } else {
            this.player.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            const projectile = this.projectiles.get(this.player.x, this.player.y - 100, 'projectile');
        
            if (projectile) {
                
                this.physics.world.enable(projectile);
        
                projectile.setActive(true);
                projectile.setVisible(true);
                projectile.setPosition(this.player.x, this.player.y - 100);
                projectile.setVelocityY(-800); 

                this.shot.play();
            }
        }
    }
}