"use strict"
function wizard(){
	this.sprite;
	this.movementspeed = 7;
	this.direction = 'right';
	this.attack_hitbox;
}

wizard.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
	},
	//Controls
	movement: function(cursors,pad1){
		//Check if input is left
		if (cursors.left.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1){
			//Move to the left
			this.sprite.x += -this.movementspeed;
			this.direction = 'left';
			this.sprite.frame = 1;
		}
		//Check if input is right
		else if (cursors.right.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1){
			//Move to the right
			this.sprite.x += this.movementspeed;
			this.direction = 'right';
			this.sprite.frame = 0;
		}
		//Check if input is up
		if (cursors.up.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1){
			//Move up
			this.sprite.y += -this.movementspeed;
		}
		//Check if input is down
		else if (cursors.down.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1){
			//Move down
			this.sprite.y += this.movementspeed;
		}
	},
	//Basic attack
	attack: function(game,enemy){
		if (game.input.keyboard.justPressed(Phaser.Keyboard.X) || pad1.justPressed(Phaser.Gamepad.XBOX360_X)){
			//Checks if player is facing right or left and places hitbox accordingly
			if(this.direction == 'right'){
				this.attack_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
			}else{
				this.attack_hitbox = game.add.sprite(this.sprite.x - 70,this.sprite.y + 40,null);
			}
			game.physics.arcade.enable(this.attack_hitbox);
			this.attack_hitbox.body.setSize(100,100);
			if(game.physics.arcade.overlap(this.attack_hitbox,enemy.sprite)){
				console.log('Hit');
			}
			game.debug.body(this.attack_hitbox);
			//this.attack_hitbox.destroy();
		}
	},
	//Special Move
	special: function(){
		
	}
}