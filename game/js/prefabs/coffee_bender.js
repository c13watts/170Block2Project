//**Feel free to copy/paste code from wizard.js

"use strict"
function coffee_bender() {
	this.sprite;
	this.movementSpeed = 7;
	this.dir = "right";
	this.melee;
	this.coffee;
}

coffee_bender.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet) {
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.anchor.setTo(0.5);
		this.sprite.body.collideWorldBounds = true;

		this.melee = game.add.sprite(0, 0, null);
		game.physics.arcade.enable(this.melee);
		this.melee.body.setSize(100,100);
		this.melee.anchor.setTo(0.5);
		this.melee.kill();
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
			if (this.dir != "left")
				this.dir = "left";
			this.sprite.frame = 1;
		} else if (wasd.d.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
			this.sprite.x += this.movementSpeed;
			this.sprite.frame = 0;
			if (this.dir != "right")
				this.dir = "right";
		}
	},
	//Basic attack
	attack: function(game, wasd, pad1) {
		if (wasd.j.justPressed() || pad1.justPressed(Phaser.Gamepad.XBOX360_X)) {
			if (this.dir == "right") {
				this.melee.x = this.sprite.x + 45;
				this.melee.y = this.sprite.y;
				this.melee.revive();
				game.time.events.add(Phaser.Timer.HALF * 0.2, this.endMelee, this);
			} else {
				this.melee.x = this.sprite.x - 45;
				this.melee.y = this.sprite.y;
				this.melee.revive();
				game.time.events.add(Phaser.Timer.HALF * 0.2, this.endMelee, this);
			}
			game.physics.arcade.enable(this.melee);
			this.melee.body.setSize(100,100);
			this.melee.anchor.setTo(0.5);
			game.debug.body(this.melee);
		}
		// drop a cup of coffee (special)
		if (wasd.k.justPressed() || pad1.justPressed(Phaser.Gamepad.XBOX360_Y)) {
			this.coffee = game.add.sprite(this.sprite.x, this.sprite.y, "null");
			game.physics.arcade.enable(this.coffee);
			this.coffee.body.setSize(50,50);
			this.coffee.anchor.setTo(0.5);
		}
	},

	endMelee: function() {
		this.melee.kill();
	}
}