class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        this.Skey = null;
        this.Fkey = null;
        this.Akey = null;
        this.Dkey = null;
        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        this.Skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.Fkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueF.png");
        my.sprite.rightLeg = this.add.sprite(this.bodyX+60, this.bodyY+150, "monsterParts", "leg_darkA.png");
        my.sprite.leftLeg= this.add.sprite(this.bodyX-50, this.bodyY +150, "monsterParts", "leg_darkA.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightHand = this.add.sprite(this.bodyX + 70, this.bodyY, "monsterParts", "arm_whiteE.png");
        my.sprite.leftHand = this.add.sprite(this.bodyX-70, this.bodyY, "monsterParts", "arm_whiteE.png");
        my.sprite.leftHand.flipX = true;
        my.sprite.belly = this.add.sprite(this.bodyX+2, this.bodyY+50, "monsterParts", "eye_dead.png");
        my.sprite.head = this.add.sprite(this.bodyX, this.bodyY-150, "monsterParts", "body_blueD.png");
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "eye_red.png");
        my.sprite.mouth = this.add.sprite(this.bodyX, this.bodyY-120, "monsterParts", "mouthA.png");
        my.sprite.headArmR = this.add.sprite(this.bodyX+70, this.bodyY-250, "monsterParts", "arm_greenA.png");
        my.sprite.headArmL = this.add.sprite(this.bodyX-70, this.bodyY-250, "monsterParts", "arm_greenA.png");
        my.sprite.headArmR.flipY = true;
        my.sprite.headArmL.flipX = true;
        my.sprite.headArmL.flipY = true;
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY-120, "monsterParts", "mouthB.png");


        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        //my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if(Phaser.Input.Keyboard.JustDown(this.Skey)){
            my.sprite.mouth.visible = true;
            my.sprite.fangs.visible= false;
        }
        if(Phaser.Input.Keyboard.JustDown(this.Fkey)){
            my.sprite.mouth.visible = false;
            my.sprite.fangs.visible = true;
        }
        if(this.Akey.isDown){
            for(let item in my.sprite){
                my.sprite[item].x -=1;
            }
        }
        if(this.Dkey.isDown){
            for(let item in my.sprite){
                my.sprite[item].x += 1;
            }
        }
        
       
    }

}