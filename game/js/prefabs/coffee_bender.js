//**Feel free to copy/paste code from wizard.js

"use strict"
function coffee_bender() {
	this.sprite;
	this.movementSpeed = 7;
	this.dir = "right";
	this.melee;
}

coffee_bender.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet) {
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
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
			this.sprite.frame = 1;
		} else if (wasd.d.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
			this.sprite.x += this.movementSpeed;
			this.sprite.frame = 0;
		}
	},
	//Basic attack
	attack: function(wasd) {

	},
	//Special Move
	special: function() {
		
	}
}