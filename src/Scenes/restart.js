class restart extends Phaser.Scene{
    constructor(){
        super("restart");
        this.my = {text:{}};
        this.space = null;
    }
    preload(){
        this.load.setPath("./assets/"); 
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
    }
    init(data){
        this.myScore = data;
        //console.log(this.myScore);
        if(JSON.stringify(this.myScore) == "{}"){
            this.myScore = 0;
        }
    }
    create(){
        let my = this.my;

        my.text.prompt = this.add.bitmapText(200, 200, "rocketSquare", "Restart?");
        my.text.prompt.setScale(2);
        my.text.score = this.add.bitmapText(300, 300, "rocketSquare", "Score: " + (JSON.stringify(this.myScore)));
    }
    update(){
        let my = this.my;
        if(Phaser.Input.Keyboard.JustDown(this.space)){
            this.scene.start("oneDim");
        }
    }
}