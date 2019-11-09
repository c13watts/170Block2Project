"use strict"
function wizard(){
	this.sprite;
	this.attack_power;
	this.movementspeed = 7;
	this.direction = 'right';
	this.attack_hitbox;
	this.special_hitbox;
	this.scrolling = false;
	this.special_direction = 'right';
	this.cooldown = false;
	this.x = 0;
}

wizard.prototype = {
	//Spawn function
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
	},
	//Controls
	movement: function(cursors,pad){
		//Check if input is left
		if (cursors.left.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1){
			//Move to the left
			this.sprite.x += -this.movementspeed;
			this.direction = 'left';
			this.sprite.frame = 1;
		}
		//Check if input is right
		else if (cursors.right.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1){
			//Move to the right
			this.sprite.x += this.movementspeed;
			this.direction = 'right';
			this.sprite.frame = 0;
		}
		//Check if input is up
		if (cursors.up.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1){
			//Move up
			this.sprite.y += -this.movementspeed;
		}
		//Check if input is down
		else if (cursors.down.isDown || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1){
			//Move down
			this.sprite.y += this.movementspeed;
		}
	},
	//Basic attack
	attack: function(game,enemy,pad){
		//Checks for button input
		if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) || pad.justPressed(Phaser.Gamepad.XBOX360_X)){
			//Checks if player is facing right or left and places hitbox accordingly
			if(this.direction == 'right'){
				this.attack_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
			}else{
				this.attack_hitbox = game.add.sprite(this.sprite.x - 70,this.sprite.y + 40,null);
			}
			//Enable hitbox
			game.physics.arcade.enable(this.attack_hitbox);
			this.attack_hitbox.body.setSize(100,100);
			if(game.physics.arcade.overlap(this.attack_hitbox,enemy.sprite)){
				console.log('Melee: Hit');
			}
			game.debug.body(this.attack_hitbox);
			//Destroy hitbox
			this.attack_hitbox.destroy();
		}
	},
	//Special Move
	special: function(game,enemy,pad){
		//Checks for button input
		if (game.input.keyboard.justPressed(Phaser.Keyboard.X) || pad.justPressed(Phaser.Gamepad.XBOX360_Y)){
			//Instant Beam
			/*if (this.cooldown == false) {
				this.cooldown = true;
				//Checks if player is facing right or left and places hitbox accordingly
				if(this.direction == 'right'){
					this.special_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
				}else{
					this.special_hitbox = game.add.sprite(this.sprite.x - 1880,this.sprite.y + 40,null);
				}
				//Enable hitbox
				game.physics.arcade.enable(this.special_hitbox);
				this.special_hitbox.body.setSize(1920,100);
				if(game.physics.arcade.overlap(this.special_hitbox,enemy.sprite)){
					console.log('Special: Hit');
				}
				game.debug.body(this.special_hitbox);
				//Destroy hitbox
				this.special_hitbox.destroy();
				game.time.events.add(Phaser.Timer.SECOND * 5, this.resetCooldown, this);
				console.log('Player 1 Special on cooldown');
			}*/
			
			//Kamehameha style (Scrolling)
			//Check Direction player is facing
			if(this.cooldown == false && this.scrolling == false){
				if(this.direction == 'right'){
					this.special_hitbox = game.add.sprite(this.sprite.x + 130,this.sprite.y + 40,null);
					this.special_direction = 'right';
				}else{
					this.special_hitbox = game.add.sprite(this.sprite.x,this.sprite.y + 40,null);
					this.special_direction = 'left';
				}
				this.scrolling = true;
				//Enable hitbox
				game.physics.arcade.enable(this.special_hitbox);
				this.special_hitbox.body.setSize(0,100);
			}
		}
		//Scroll beam to the right
		if(this.scrolling == true && this.cooldown == false && this.special_direction == 'right'){
			if( this.x < 1980){
				this.x += 20;
				this.special_hitbox.body.setSize(this.x,100);
				game.debug.body(this.special_hitbox);
			}else{
				this.x = 0;
				this.scrolling = false;
				this.cooldown = true;
				this.special_hitbox.destroy();
				game.time.events.add(Phaser.Timer.SECOND * 5, this.resetCooldown, this);
				console.log('Player 1 Special on cooldown');
			}
		}
		//Scroll beam to the left
		if(this.scrolling == true && this.cooldown == false && this.special_direction == 'left'){
			if( this.x < 1980){
				this.x += 20;
				this.special_hitbox.x -= 20;
				this.special_hitbox.body.setSize(this.x,100);
				game.debug.body(this.special_hitbox);
			}else{
				this.x = 0;
				this.scrolling = false;
				this.cooldown = true;
				this.special_hitbox.destroy();
				game.time.events.add(Phaser.Timer.SECOND * 5, this.resetCooldown, this);
				console.log('Player 1 Special on cooldown');
			}
		}
	},
	//Resets Special Cooldown
	resetCooldown: function() {
		this.cooldown = false;
		console.log('Player 1 Special Ready');
	}
}