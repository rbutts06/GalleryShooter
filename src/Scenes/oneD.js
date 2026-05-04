class oneDim extends Phaser.Scene{
    constructor(){
        super("oneDim");
        this.my = {sprite: {}, text: {}, animal: {}};
        this.SpaceKey = null;
        this.Akey = null;
        this.Dkey = null;
    }

    preload(){
        this.load.setPath("./assets/");

        //sprites
        this.load.image("avatar", "spike_top.png");
        this.load.image("bullet", "flame.png");
        this.load.image("bunny", "bunny2_ready.png");
        this.load.image("elephant", "elephant.png");
        this.load.image("hippo", "hippo.png");
        this.load.image("giraffe", "giraffe.png");
        this.load.image("parrot", "parrot.png");
        this.load.image("bush1", "grass1.png");
        this.load.image("bush2", "grass2.png");
        this.load.image("rock", "particle_darkGrey.png");

        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.audio("bink", "impactMetal_light_002.ogg");
    }

    create(){
        let my = this.my;
        this.initGame();

        this.playerSpeed = 350;
        this.bulletSpeed = 350;
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "avatar");
        my.animal.bunny = this.add.sprite(game.config.width/2, 80, "bunny");
        my.animal.bunny.setScale(0.25);
        my.animal.bunny.scorePoints = 30;
        my.animal.elephant = this.add.sprite(100, 300, "elephant");
        my.animal.elephant.setScale(0.35);
        my.animal.elephant.scorePoints = 10;
        my.animal.hippo = this.add.sprite(600, 200, "hippo");
        my.animal.hippo.setScale(0.25);
        my.animal.hippo.scorePoints = 20;
        my.animal.parrot = this.add.sprite(550, 50, "parrot");
        my.animal.parrot.setScale(0.10);
        my.animal.parrot.scorePoints = 50;
        my.animal.giraffe = this.add.sprite(200,150, "giraffe");
        my.animal.giraffe.setScale(0.2);
        my.animal.giraffe.scorePoints = 25;
       
        // Initialize shoot timers for each animal
        for(let key in my.animal){
            if(my.animal[key]){
                my.animal[key].shootTimer = Phaser.Math.Between(60, 300);
            }
        }

        my.sprite.plant1 = this.add.sprite(200, 300, "bush1");
        my.sprite.plant1.setScale(2);
        my.sprite.plant2 = this.add.sprite(500, 220, "bush2");
        my.sprite.plant2.setScale(2);

        my.text.score = this.add.bitmapText(550, 0, "rocketSquare", "Score: " + this.myScore);
        my.text.timer = this.add.bitmapText(590, 570, "rocketSquare", "Timer: " + (this.time));
        my.text.lives = this.add.bitmapText(10, 570, "rocketSquare", "Lives: " + this.lives);
        //my.sprite.emit = this.add.sprite(my.sprite.body.x, my.sprite.body.y, "hat");
        //my.sprite.emit.visible = false;
        this.add.text(10, 5, "Animal Cruelty", {
            fontFamily: "Times, serif",
            fontSize: 24,
            wordWrap: {
                width: 60
            }
        });

        //Rectangle.visible = true;
        //this.animalMove();
        this.move = this.tweens.add({
            targets: [my.animal.hippo, my.animal.elephant],
            x: this.animalx,
            ease: 'Power0',
            duration: 3600,
            repeat:-1,
            yoyo: true
        });
        this.fastestMove = this.tweens.add({
            targets: my.animal.parrot,
            x: {from: 0, to: 800},
            ease: 'Power0',
            duration: 1000,
            repeat: -1,
            yoyo: true
        });
        this.fastMove = this.tweens.add({
            targets: my.animal.bunny,
            x:{from:0, to:800},
            ease: 'Power0',
            duration: 2000,
            repeat:-1,
            yoyo:true
        });
        this.medMove = this.tweens.add({
            targets: my.animal.giraffe,
            x: {from:0, to:800},
            ease: 'Power0',
            duration:3000,
            repeat:-1,
            yoyo:true
        });

        this.mySound = this.sound.add("bink", 1);

        for(let i = 0; i < this.rockMax; i++){
            my.animal.rocks.push(this.add.sprite(-100, -100, "rock"));
        }

    }

    update(time, delta){
        let my = this.my;
        let scale = (this.playerSpeed * delta) / 1000;
        //my.sprite.emit.y = my.sprite.body.y;
        //my.sprite.emit.x = my.sprite.body.x;
        this.counter--;
        this.time = Phaser.Math.RoundTo(this.counter/60);

        //this.move()

        this.updateTimer();
        if(this.counter == 0 || this.lives == 0){
            this.scene.start("restart", this.myScore);
            //game over
        }
        if(this.Akey.isDown){
            if(my.sprite.body.x < 20){

            }
            else{
                my.sprite.body.x -=scale;
            }
        }
        if(this.Dkey.isDown){
            if(my.sprite.body.x > 780){
                //continue;
            }
            else{
                my.sprite.body.x +=scale;
            }
            //my.sprite.body.x +=scale;
        }
        if(Phaser.Input.Keyboard.JustDown(this.SpaceKey)){
            //my.sprite.new.emit = this.add.sprite(my.sprite.body.x, my.sprite.body.y, "hat");
            if(my.sprite.bullet.length < this.bulletMax){
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.body.x, my.sprite.body.y, "bullet")
                );
            }
        }
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        my.animal.rocks = my.animal.rocks.filter((rock) => rock.y > -(rock.displayHeight/2));

        for(let rock of my.animal.rocks){
            if(this.collides(rock, my.sprite.body)){
                this.mySound.play();
                rock.y = -100;
                this.lives -=1;
                this.updateLives();
            }
        }

        for(let bullet of my.sprite.bullet){
            if(this.collides(bullet, my.sprite.plant1) || this.collides(bullet, my.sprite.plant2)){
                bullet.y = -100;
                continue;
            }

            for(let key in my.animal){
                let animal = my.animal[key];
                if(!animal || !animal.visible) continue;

                if(this.collides(animal, bullet)){
                    this.mySound.play();
                    bullet.y = -100;
                    animal.visible = false;
                    //animal.x = -100;
                    //animal.visible = true;
                    animal.y = (Math.random() *(config.height-200) + 10);
                    this.animalx = Math.random() * config.width;
                    this.myScore += animal.scorePoints;
                    this.updateScore();
                    break;
                }
            }
        }
        if(this.myScore %135 == 0){
            my.animal.bunny.visible = true;
            my.animal.hippo.visible = true;
            my.animal.elephant.visible = true;
            my.animal.giraffe.visible = true;
            my.animal.parrot.visible = true;
        }

        for(let key in my.animal){
            let animal = my.animal[key];
            if(animal && animal.visible){
                animal.shootTimer--;
                if(animal.shootTimer <= 0){
                    if(my.animal.rocks.length < this.rockMax){
                        let rock = this.add.sprite(animal.x, animal.y, "rock");
                        rock.visible = true;
                        my.animal.rocks.push(rock);
                    }
                    animal.shootTimer = Phaser.Math.Between(60, 300);
                }
            }
        }

        for(let bullet of my.sprite.bullet){
            bullet.y -= scale;
        }

        for(let rock of my.animal.rocks){
            if(rock.visible == true){
                rock.y += scale;
            }
        }
    }
    collides(a, b) {
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
    updateScore(){
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }
    updateTimer(){
        let my = this.my;
        my.text.timer.setText("Timer: " + (this.time));
    }
    updateLives(){
        let my = this.my;
        my.text.lives.setText("Lives: " + this.lives);
    }

    initGame(){
        this.counter = 1800;
        this.time = Phaser.Math.RoundTo(this.counter/60);
        this.myScore = 0;
        this.my.sprite.bullet = [];
        this.my.animal.rocks = [];
        this.rockMax = 20;
        this.bulletMax = 10;
        this.animalx = Math.random() *config.width;
        this.lives = 3;
        this.bodyX = 350;
        this.bodyY = 550;

    }
}