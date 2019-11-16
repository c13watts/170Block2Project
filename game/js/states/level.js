//"use strict"
var level = function(game)
{
	this.player1;
	this.player2;
	this.visual;
	this.stop;
	var pad1;
};

level.prototype = {
	preload: function() {
		//Preload assets
		game.load.spritesheet('player', 'assets/img/image0.png',400, 428);
		game.load.spritesheet('Kalua', 'assets/img/KaluaSprites.png',128, 128);
		game.load.spritesheet('enemy', 'assets/img/CorporateDog.png',128, 128);

		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.J]);
	},
	create: function() {
		//Add background
		game.stage.backgroundColor = "aaaaee";
		
		//For visual purposes
		this.visual = game.add.sprite(-200,200,null);
		game.physics.arcade.enable(this.visual);
		
		//Add Player 1
		this.player1 = new wizard;
		this.player1.spawn(game,500,700,'player');
		
		//Add Player 2
		this.player2 = new coffee_bender;
		this.player2.spawn(game, 600, 700, 'Kalua');
		
		//Enemies group
		this.enemygroup = game.add.group();
		this.enemygroup.enableBody = true;

		//Enemies (CHEAP WAY)
		this.dummy = new enemy();
		this.dummy.spawn(game,-50,game.rnd.integerInRange(0,1080),'enemy')
		this.enemygroup.add(this.dummy.sprite);
		
		this.dummy2 = new enemy();
		this.dummy2.spawn(game,-50,game.rnd.integerInRange(0,1080),'enemy');
		this.enemygroup.add(this.dummy2.sprite);
		
		this.dummy3 = new enemy();
		this.dummy3.spawn(game,-50,game.rnd.integerInRange(0,1080),'enemy');
		this.enemygroup.add(this.dummy3.sprite);
		
		this.dummy4 = new enemy();
		this.dummy4.spawn(game,1900,game.rnd.integerInRange(0,1080),'enemy');
		this.enemygroup.add(this.dummy4.sprite);
		
		this.dummy5 = new enemy();
		this.dummy5.spawn(game,1900,game.rnd.integerInRange(0,1080),'enemy');
		this.enemygroup.add(this.dummy5.sprite);
		
		this.dummy6 = new enemy();
		this.dummy6.spawn(game,1900,game.rnd.integerInRange(0,1080),'enemy');
		this.enemygroup.add(this.dummy6.sprite);
		
		this.dummy7 = new enemy();
		this.dummy7.spawn(game,1900,game.rnd.integerInRange(0,1080),'enemy');
		this.enemygroup.add(this.dummy7.sprite);
		
		//Enable controls
		this.cursors = game.input.keyboard.createCursorKeys();
		this.wasd = { w: game.input.keyboard.addKey(Phaser.Keyboard.W),
						a: game.input.keyboard.addKey(Phaser.Keyboard.A),
						s: game.input.keyboard.addKey(Phaser.Keyboard.S),
						d: game.input.keyboard.addKey(Phaser.Keyboard.D),
						j: game.input.keyboard.addKey(Phaser.Keyboard.J),
						k: game.input.keyboard.addKey(Phaser.Keyboard.K) };
						
		//Gamepad controls
		game.input.gamepad.start();
		pad1 = game.input.gamepad.pad1;
		pad2 = game.input.gamepad.pad2;
	},

	update: function() {
		//Enable and check for player movement, attack, and specials
		if(this.player1.can_move == true){
			this.player1.movement(this.cursors,pad1);
		}
		this.player1.attack(game,this.dummy,pad1);
		if(this.player1.coffee_buff == true || this.player1.channeling == true){
			this.player1.team_attack(game,pad1,this.enemygroup);
		}else if(this.player1.coffee_buff == false){
			this.player1.special(game,this.dummy,pad1);
		}
		
		//Enable and check for player 2 movement, attack, and special
		this.player2.movement(this.wasd,pad2);
		this.player2.attack(game, this.wasd, pad2);
		
		game.physics.arcade.overlap(this.player1.attack_hitbox, this.enemygroup, this.destroy, null, this);
		game.physics.arcade.overlap(this.player1.special_hitbox, this.enemygroup, this.destroy, null, this);
		game.physics.arcade.overlap(this.player1.big, this.enemygroup, this.destroy, null, this);
		game.physics.arcade.overlap(this.player2.melee, this.enemygroup, this.destroy, null, this);
		
		//Handles Coffee Buffing
		if(game.physics.arcade.overlap(this.player1.sprite,this.player2.coffee)){
			this.player2.coffee.destroy();
			this.player2.coffee_placed = false;
			this.player1.enable_coffee_buff(game);
		}
		if(game.physics.arcade.overlap(this.player2.sprite,this.player2.coffee)){
			this.player2.coffee.destroy();
			this.player2.coffee_placed = false;
			this.player2.enable_coffee_buff(game);
		}

		//Enemies pathinding
		this.dummy.pathfind(this.player1.sprite);
		this.dummy2.pathfind(this.player1.sprite);
		this.dummy3.pathfind(this.player1.sprite);
		this.dummy4.pathfind(this.player1.sprite);
		this.dummy5.pathfind(this.player2.sprite);
		this.dummy6.pathfind(this.player2.sprite);
		this.dummy7.pathfind(this.player2.sprite);
		
		game.debug.body(this.visual);
	},

	shutdown: function() {

	},

	destroy: function(player,enemy){
		var side = game.rnd.integerInRange(1,2);
		if(side == 1){
			enemy.x = -200;
			enemy.y = game.rnd.integerInRange(0,1080);
		}else{
			enemy.x = 1920;
			enemy.y = game.rnd.integerInRange(0,1080);
		}
	}
}
