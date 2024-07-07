export default class titleScene extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        // IMAGES and AUDIO
        this.load.image('background', './assets/images/bgv.png');
        this.load.image('logo', './assets/images/BBGLogo.png');
        this.load.image('startButton', './assets/buttons/start_BTN.png');
        this.load.image('creditButton', './assets/buttons/Info_BTN.png');
        this.load.image('quitButton', './assets/buttons/Exit_BTN.png');
        this.load.image('unmute', './assets/images/mute.png');
        this.load.image('mute', './assets/images/unmute.png');
        this.load.audio('backgroundMusic', './assets/audio/music/Boboiboy.mp3');
    }

    create() {
        this.sound.stopAll();
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Logo
        this.logo = this.add.image(400, 350, 'logo');
        this.logo.setOrigin(0.5);
        this.logo.setScale(2);

        this.tweens.add({
            targets: this.logo,
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Linear',
        });

        // Background Music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.3 });
        if (!this.backgroundMusic.isPlaying && !this.sound.mute) {
            this.backgroundMusic.play();
        }

        // Sound Toggle Icon
        this.soundStatusIcon = this.add.image(this.cameras.main.width - 50, 50, 'unmute');
        this.soundStatusIcon.setOrigin(0.5);
        this.soundStatusIcon.setInteractive();
        this.soundStatusIcon.setScale(0.3);
        this.soundStatusIcon.on('pointerdown', this.toggleSound, this);

        // START BUTTON
        const startButton = this.add.image(400, 550, 'startButton');
        startButton.setOrigin(0.5);
        startButton.setScale(0.7);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('gameScene');
        });

        startButton.on('pointerover', () => {
            startButton.setTint(0x00ff00);
        });
        startButton.on('pointerout', () => {
            startButton.clearTint();
        });

        // CREDITS BUTTON
        const creditButton = this.add.image(50, 50, 'creditButton');
        creditButton.setOrigin(0.5);
        creditButton.setScale(0.4);
        creditButton.setInteractive();
        creditButton.on('pointerdown', () => {
            if (!this.scene.isActive('creditScene')) {
                this.scene.stop('titleScene');
                this.scene.start('creditScene');
            }
        });

        creditButton.on('pointerover', () => {
            creditButton.setTint(0xb2ffb2);
        });
        creditButton.on('pointerout', () => {
            creditButton.clearTint();
        });

        // QUIT BUTTON
        const quitButton = this.add.image(400, 650, 'quitButton');
        quitButton.setOrigin(0.5);
        quitButton.setScale(0.7);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            if (window.confirm("Taking a Break?")) {
                alert("Conquering Galaxies Delayed ");
                window.close();
            }
        });

        quitButton.on('pointerover', () => {
            quitButton.setTint(0x00FF00);
        });
        quitButton.on('pointerout', () => {
            quitButton.clearTint();
        });

        
        this.gameScene = this.scene.get('gameScene');
    }

    toggleSound() {
        if (this.sound.mute) {
            this.sound.setMute(false);
            this.soundStatusIcon.setTexture('unmute');
        } else {
            this.sound.setMute(true);
            this.soundStatusIcon.setTexture('mute');
        }
    }

    shutdown() {
        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
            this.backgroundMusic.stop();
        }
    }
}
