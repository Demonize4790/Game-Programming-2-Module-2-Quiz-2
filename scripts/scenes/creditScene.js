export default class creditScene extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload() {
        this.load.image('creditBackground', './assets/images/credits.png');
        this.load.image('backButton', './assets/buttons/Close_BTN.png');
    }

    create() {

        this.background = this.add.image(0, 0, 'creditBackground').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const backButton = this.add.image(750, 50, 'backButton')
        backButton.setOrigin(0.5);
        backButton.setScale(.3);
        backButton.setInteractive();
        backButton.on('pointerdown', () => this.Back());

        backButton.on('pointerover', () => {
            backButton.setTint(0xb2ffb2);
        });
        backButton.on('pointerout', () => {
            backButton.clearTint();
        });


    }

    Back() {
       
        const backgroundMusic = this.sound.get('backgroundMusic');
        if (backgroundMusic && backgroundMusic.isPlaying) {
            backgroundMusic.stop();
        }
        this.scene.start('titleScene');
    }
}