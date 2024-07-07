export default class gameoverScene extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {

        this.load.audio('gameoverSound', './assets/audio/music/gameober.mp3');
        this.load.image('gameoverbackground', './assets/images/gameoverBG.png');
        this.load.image('restartButton', './assets/buttons/replay_BTN.png');
        this.load.image('mainMenuButton', './assets/buttons/menu_BTN.png'); 
    }
    
    create(data) {
        const { score, timeSurvived } = data;
        this.add.image(0, 0, 'gameoverbackground').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
        //SCORE 
            const scoreTextX = this.cameras.main.width / 2;
            const scoreTextY = 300;
            const timeSurvivedTextX = this.cameras.main.width / 2;
            const timeSurvivedTextY = 350;
        
            this.add.text(scoreTextX, scoreTextY, 'Score: ' + score, { fontSize: '32px', fontFamily: 'Times New Roman', fill: '#ffffff' }).setOrigin(0.5);
            this.add.text(timeSurvivedTextX, timeSurvivedTextY, 'Time Survived: ' + timeSurvived + "s", { fontSize: '32px', fontFamily: 'Times New Roman', fill: '#ffffff' }).setOrigin(0.5);

          //MENU
            const mainMenuButton = this.add.image(300, 500, 'mainMenuButton')
            mainMenuButton.setOrigin(0.5);
            mainMenuButton.setScale(.7);
            mainMenuButton.setInteractive();
            mainMenuButton.on('pointerdown', () => {
                this.sound.stopAll(); 
                this.scene.start('titleScene'); 
            });
    
        
        //REPLAY
            const restartButton = this.add.image(490, 500, 'restartButton')
            restartButton.setOrigin(0.5);
            restartButton.setScale(.7);
            restartButton.setInteractive();
            restartButton.on('pointerdown', () => {
                this.sound.stopAll(); 
                this.scene.start('gameScene'); 
            });
    
        
        const gameoverSound = this.sound.add('gameoverSound', { volume: 0.7});
        gameoverSound.play();
    }
}