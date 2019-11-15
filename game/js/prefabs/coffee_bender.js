//**Feel free to copy/paste code from wizard.js

"use strict"
function coffee_bender() {
	this.sprite;
	this.attack_power = 1;
	this.movementSpeed = 7;
	this.dir = "right";
	this.melee;
	this.coffee;
	this.coffee_placed = false;
	this.cooldown = false;
	this.mCooldown = false;
}

coffee_bender.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet) {
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.scale.setTo(1.3,1.3);
		this.sprite.body.collideWorldBounds = true;

		this.melee = game.add.sprite(0, 0, null);
		game.physics.arcade.enable(this.melee);
		this.melee.body.setSize(100,100);
		this.melee.anchor.setTo(0.5, 0.5);
		this.melee.kill();

		this.coffee = game.add.group();
		this.coffee.enableBody = true;
		this.coffee.physicsBodyType = Phaser.Physics.ARCADE;
		
		this.sprite.animations.add('leftattack', [6,7], 15, false);
		this.sprite.animations.add('rightattack', [1,0], 15, false);
		this.sprite.animations.add('leftspecial', [5,4,7], 7, false);
		this.sprite.animations.add('rightspecial', [2,3,0], 7, false);
		this.sprite.animations.add('leftidle', [7], 1, true);
		this.sprite.animations.add('rightidle', [0], 1, true);
	},
	//Controls (Wizard already uses up, down, left, right)
	movement: function(wasd, pad1) {
		if (wasd.w.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
			this.sprite.y -= this.movementSpeed;
		} else if (wasd.s.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
			this.sprite.y += this.movementSpeed;
		}

		if (wasd.a.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
			this.sprite.x -= this.movementSpeed;
			this.melee.x = this.sprite.x - 100;
			this.melee.y = this.sprite.y;
			if (this.dir != "left") {
				this.dir = "left";
				this.sprite.animations.play('leftidle');
			}
		} else if (wasd.d.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
			this.sprite.x += this.movementSpeed;
			this.melee.x = this.sprite.x + 45;
			this.melee.y = this.sprite.y;
			if (this.dir != "right"){
				this.dir = "right";
				this.sprite.animations.play('rightidle');
			}
		}
	},
	//Basic attack
	attack: function(game, wasd, pad1) {
		if (wasd.j.justPressed() || pad1.justPressed(Phaser.Gamepad.XBOX360_X)) {
			//this.sprite.frame = (game.rnd.integerInRange(1,2) == 1) ? 1 : 3;
			if (this.dir == "right") {
				this.sprite.animations.play('rightattack');
				this.melee.revive();
				game.time.events.add(Phaser.Timer.HALF, this.endMelee, this);
			} else {
				this.sprite.animations.play('leftattack');
				this.melee.revive();
				game.time.events.add(Phaser.Timer.HALF, this.endMelee, this);
			}
			game.physics.arcade.enable(this.melee);
			//game.debug.body(this.melee);
		}
		// drop a cup of coffee (special) 
		// 60s cooldown
		if (wasd.k.justPressed() || pad1.justPressed(Phaser.Gamepad.XBOX360_Y)) {
			if (!this.cooldown) {
				this.cooldown = true;
				this.sprite.frame = 2;
				if(this.dir == 'right'){
					this.sprite.animations.play('rightspecial');
					this.coffee = game.add.sprite(this.sprite.x+100, this.sprite.y, "coffee");
				} else {
					this.sprite.animations.play('leftspecial');
					this.coffee = game.add.sprite(this.sprite.x-120, this.sprite.y, "coffee");
				}
				this.coffee_placed = true;
				game.physics.arcade.enable(this.coffee);
				game.time.events.add(Phaser.Timer.SECOND * 30, this.resetCooldown, this);
				game.time.events.add(Phaser.Timer.SECOND * 15, this.destroyCoffee, this);
			}
		}
	},

	endMelee: function() {
		this.melee.kill();
	},
	resetCooldown: function() {
		this.cooldown = false;
	},
	resetmCooldown: function() {
		this.mCooldown = false;
	},
	destroyCoffee: function(){
		if(this.coffee_placed == true){
			this.coffee.destroy();
		}
	},
	//Enable Coffee Buff
	enable_coffee_buff: function(game){
		this.coffee_buff = true;
		this.attack_power = 2;
		this.movementSpeed = 14;
		game.time.events.add(Phaser.Timer.SECOND * 15, this.end_coffee_buff, this);
	},
	//Ends Coffee Buff
	end_coffee_buff: function(){
		this.coffee_buff = false;
		this.attack_power = 1;
		this.movementSpeed = 7;
	}
}