

var field = document.getElementById("field-of-play");

	var intro = document.createElement("div");
	intro.id = "intro";
	intro.style.width = "800px";
	intro.style.minHEIGHT = "600px";
	intro.style.position = "absolute";
	intro.style.backgroundColor = "aqua";
	intro.style.top = 0;
	intro.style.left = 0;
	intro.style.zIndex = "10";
	intro.style.margin = "auto";
	intro.innerHTML = "<center><br>WELCOME to DEADRUN Laboratories!</center><br><br>We're excited for your first day here with us.  Please pay close attention to the emergency instructions contained in this notice.  In case of an emergency, they could be the difference between safety and disaster.<br><br>As a new employee, you have been issued a blue lab coat.  This is to help your coworkers recognize your new status so they will better be able to assist you.  <font size='1'>(Legal Disclaimer: Please note that roughly 10% of your coworkers feel threatened by any new coworkers and may target you due to your blue labcoat.</font><br><br>As you already know, we here at DeadRun Laboratories handle dangerous viruses every day, so it is important to know the proper protocols if an outbreak were to occur.<br><br>1: Recognizing an outbreak has occurred:<br><br>Your labcoat will serve as a test to confirm if you have been affected by the virus.  They are specially made to turn red when coming into contact with our most dangerous viruses, such as H2Z, colloquially known as the Human-to-Zombie virus.  If you notice your labcoat has turned red, please report to the incinerator immediately for further instructions.  Additionally, if you notice a coworker's labcoat has turned red, DO NOT COME INTO CONTACT WITH THAT COWORKER.  Please report your coworker to the nearest security personnel and follow all instructions.<br><br>2: What to do in case of a confirmed outbreak:<br><br>If an outbreak has been confirmed by a red labcoat, all employees will be directed to the nearest safe room where they will await further instructions.  The door to the safe room is to remain locked for the entirety of the incident and will not be opened until the all clear is given.<br><br>3: If an emergency occurs in the safe room:<br><br>Federal Regulations have required us to provide employees with an emergency exit.  If an emergency were to occur, the door can be unlocked by entering security codes into security terminals spaced around the safe room.  The codes must be entered in the terminals in the following order: ORANGE, YELLOW, GREEN, AQUA, then PURPLE. The emergency exit will reflect the current color of the security terminal that is needed to proceed with the emergency protocol.  The emergency exit will be marked with a large X. The security terminals will be marked with triangles of the corresponding color.  After the codes are entered and when the door is PINK, the exit can be opened.  <br><br>Thank you for paying attention to this vital informaion and enjoy your first day here.  We are glad to have you on board!<br><br>Please direct any further questions to Don T. Care of Human Resources.<br><br><center><button type='button' onclick='startGame(200)'>Click start playing!</button></center><br><br>P.S. TIPS FOR PLAYING:<br><br>Use your arrow keys or wasd keys to move around the room.<br><br>Try not to touch any coworkers.  Coworkers in white labcoats will seriously slow you down, coworkers in red labcoats will KILL YOU.<br><br>You're not being paranoid, there are some red labcoats that are hunting you down.  Sometimes they'll jump out when you least expect it.<br><br>Clicking the button above will let you start a standard game, which is enough to be a challenge, but not impossible.  If you would prefer to play an easier or harder round, click one of the buttons below:<br><br><center><button type='button' onclick='startGame(100)'>Click here for easy mode</button></center><br><center><button type='button' onclick='startGame(300)'>Click here for hard mode</button></center><br><br>Good luck!";
	field.appendChild(intro);

function startGame(numOfCoworkers){
	alert("An outbreak of H2Z has been confirmed.  You are being escorted to the nearest safe room.");
	document.getElementById("intro").remove();
	populateGame(numOfCoworkers);
	gameTime = 0;
	gameCycle = setInterval(function () {update()}, 25);

}


var exit = {
	id: document.getElementById("exit"),
	x: Math.floor(Math.random() * 790 + 1),
	y: Math.floor(Math.random() * 590 + 1),
	locked: true,
	colorStates: ["orange", "yellow", "green", "aqua", "purple", "pink"],
	currentColor: 0,
	type: "exit",

	updateColor: function() {
		this.currentColor++;
		if (this.currentColor == this.colorStates.length-2)
		{
			securityKey.lastOne = true;
		}
	},

	openDoor: function(){
		this.locked = false;
		this.id.innerHTML = "∏"
	},

	update: function() {
		this.id.style.left = this.x;
		this.id.style.top = this.y;
		this.id.style.backgroundColor = this.colorStates[this.currentColor];
		this.id.innerHTML = "X";
		this.id.style.textAlign = "center";
	},

}

var securityKey = {
	id: document.getElementById("key"),
	x: Math.floor(Math.random() * 790 + 1),
	y: Math.floor(Math.random() * 590 + 1),
	lastOne: false,
	type: "key",

	update: function() {
		this.id.style.left = this.x;
		this.id.style.top = this.y;
	},

	nextPhase: function() {
		if (this.lastOne == true)
		{
			this.id.style.borderBottom = "10px solid gray";
			this.x = 0;
			this.y = 0;
			exit.updateColor();
			exit.openDoor();
		}
		else
		{
			this.x = Math.floor(Math.random() * 790 + 1),
			this.y = Math.floor(Math.random() * 590 + 1),
			exit.updateColor();
			this.id.style.borderBottom = "10px solid " + exit.colorStates[exit.currentColor];
		}
	}
}

var player = {
	id: document.getElementById("player"),
	zombie: false,
	type: "player",
	moveUp: false,
	moveDown: false,
	moveRight: false,
	moveLeft: false,
	speed: 2.5,
	x: 20,
	y: 20,
	width: 10,
	height: 10,
	velocityX: 0,
	velocityY: 0,
	win: false,

	collidesWith: function (object){
		if ((Math.abs(this.x - object.x) < 10) && Math.abs(this.y - object.y) < 10)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	handleCollision: function (object) {
		if (object.type == "key")
		{	
			object.nextPhase();
		}
		if (object.type == "exit")
		{
			if (object.locked == false)
			{
				this.win = true;
			}
			else
			{
				alert("Find the " + exit.colorStates[exit.currentColor] + " security console!");
			}
		}
		

		if (Math.abs(this.x - object.x) < 10)
		{
			if ((this.x < object.x && this.velocityX > 0) || (this.x > object.x && this.velocityX < 0))
			{
				this.velocityX = 0;
			}
		}
		if (Math.abs(this.y - object.y) < 10)
		{
			if ((this.y < object.y && this.velocityY > 0) || (this.y > object.y && this.velocityY < 0))
			{
				this.velocityY = 0;
			}
		}
	},

	setVelocity: function (inX,inY) {

		this.y += inY;
		this.x += inX;

		if (this.x > 790)
		{
			this.x = 790;
		}
		else if (this.x < 0)
		{
			this.x = 0;
		}

		if (this.y > 590)
		{
			this.y = 590;
		}
		else if (this.y < 0)
		{
			this.y = 0;
		}
		this.id.style.top = this.y + "px";
		this.id.style.left = this.x + "px";
	},

	update: function () {

		for (var i = 0; i < allObjects.length; i++)
		{
			if (this.collidesWith(allObjects[i]))
			{
				this.handleCollision(allObjects[i]);
			}
		}
		//obstacles slowed the game down way too much!
		// for (var i = 0; i < obstacles.length; i++)
		// {
		// 	if (this.collidesWith(obstacles[i]))
		// 	{
		// 		//alert("i got here")
		// 		this.handleCollision(obstacles[i]);
		// 	}
		// }
		// if (this.collidesWith(npc))
		// {
		// 	this.handleCollision(npc);
		// }
		this.setVelocity(this.velocityX, this.velocityY);
	},

	turnIntoZombie: function() {
		this.zombie = true;
		this.id.style.backgroundColor = "red";
	}

};

function nonPlayerCharacter(divID) {
	this.id = document.getElementById(divID);
	this.type = "npc";
	this.zombie = false;
	this.speed = (Math.random() * 1);
	this.x = 400;
	this.y = 300;
	this.width = 10;
	this.height = 10;
	this.velocityX = 0;
	this.velocityY = 0;
	this.moving = false;
	this.wanderTime = 0;
	this.startTime = 0;
	this.waitTime = 0;
	this.chaser = false;
	this.chasing = false;
	this.runner = false;

	this.collidesWith = function (object) {
		if ((Math.abs(this.x - object.x) < 10) && Math.abs(this.y - object.y) < 10)
		{
			return true;
		}
		else
		{
			return false;
		}
	};

	this.handleCollision = function (object) {

			if (this.zombie && !object.zombie)
			{
				object.turnIntoZombie();
			}
		

		if (Math.abs(this.x - object.x) < 10)
			{
				if (((this.x < object.x && this.velocityX > 0) || (this.x > object.x && this.velocityX < 0)) && (!this.zombie))
				{
					this.velocityX = -this.velocityX;
				}
			}
			if (Math.abs(this.y - object.y) < 10)
			{
				if (((this.y < object.y && this.velocityY > 0) || (this.y > object.y && this.velocityY < 0)) && (!this.zombie))
				{
					this.velocityY = -this.velocityY;
				}
			}
	};

	this.setVelocity = function (inX, inY) {

		this.y += inY;
		this.x += inX;

		if (this.x > 790)
		{
			this.x = 790;
		}
		else if (this.x < 0)
		{
			this.x = 0;
		}

		if (this.y > 590)
		{
			this.y = 590;
		}
		else if (this.y < 0)
		{
			this.y = 0;
		}

		this.id.style.top = this.y + "px";
		this.id.style.left = this.x + "px";
	};

	this.wander = function () {
		//setTimeout won't work since I have setInterval running and Javascript is a single thread language.  Who knew? Ugh. It seems very hacky to me, but it works.
		if (this.zombie && this.chaser)
		{	
			this.chase(allCharacters[allCharacters.length-1]);
		}
		else if (this.moving == false && this.waitTime < gameTime - this.startTime)
		{	
			this.moving = true;
			this.startTime = gameTime;
			this.wanderTime = Math.random() * 9000 + 1000;
			var wanderX = Math.floor(Math.random() * 20 - 9);
			var wanderY = Math.floor(Math.random() * 20 - 9);
			this.velocityY = (wanderY/(Math.abs(wanderY)+Math.abs(wanderX))) * this.speed;
			this.velocityX = (wanderX/(Math.abs(wanderY)+Math.abs(wanderX))) * this.speed;
		}
		else if (this.wanderTime < gameTime - this.startTime)
			{
				this.velocityY = 0;
				this.velocityX = 0;
				this.moving = false;
				this.startTime = gameTime;
				//zombies don't stop moving!
				if (!this.zombie)
				{
					this.waitTime = Math.random() * 1500 + 1;
				}
			}
	};
//since npcs arent's chased, they don't have to flee anymore
	// this.flee = function () {

	// };

	this.chase = function (target) {
		this.chasing = true;
	this.velocityX = (this.speed * (target.x - this.x)/(Math.abs(target.x - this.x)+Math.abs(target.y - this.y)));
	this.velocityY = (this.speed * (target.y - this.y)/(Math.abs(target.x - this.x)+Math.abs(target.y - this.y)));
	};

	this.turnIntoZombie = function () {
		this.zombie = true;
		this.id.style.backgroundColor = "red";
		this.speed *= 0.5;
	};

	this.update = function () {
		this.wander();
		this.setVelocity(this.velocityX, this.velocityY);
		for (var i = 0; i < allCharacters.length; i++)
		{
			if (this.collidesWith(allCharacters[i]))
			{
				this.handleCollision(allCharacters[i]);
			}
		}
	};

//killed it so that all chasing zombies chase the player. Otherwise, some zombies would "jitter" between two close npcs.  Weird.
	// this.findClosestFoe = function()
	// {
	// 	var result = false;
	// 	for (var i = 0; i < allCharacters.length; i++)
	// 	{
	// 		if (allCharacters[i].zombie != this.zombie)
	// 		{
	// 			if (result == false)
	// 			{
	// 				if (findDistance(this.x, this.y, allCharacters[i].x, allCharacters[i].y) < 600)
	// 				{
	// 					result = allCharacters[i];
	// 				}
	// 			}
	// 			else if (findDistance(result.x, result.y, this.x, this.y) > findDistance(allCharacters[i].x, allCharacters[i].y, this.x, this.y))
	// 			{
	// 				result = allCharacters[i];
	// 			}
	// 		}
	// 	}
	// 	return result;
	// };
}

// var npc1 = new nonPlayerCharacter("npc1");
// var npc2 = new nonPlayerCharacter("npc2");
//now I need to make a loop that creates divs, then assigns them to npc prototypes.  yay.  Someday I'll understand objects in javascript.

var field = document.getElementById("field-of-play");
npcList = []
allCharacters = []
allObjects = []
function populateGame(numberOfCoworkers)
{
	var maxNPC = numberOfCoworkers;
	for (var i = 0; i < maxNPC; i++)
	{
		var div = document.createElement("div");
		div.style.width = "10px";
		div.style.height = "10px";
		div.style.backgroundColor = "white";
		div.style.position = "absolute";
		div.style.borderRadius = "50%";
			div.id = "npc" + i;

		field.appendChild(div);

		npcList[i] = new nonPlayerCharacter("npc".concat(i));
		npcList[i].x = Math.floor(Math.random() * 790 + 1);
		npcList[i].y = Math.floor(Math.random() * 590 + 1);
		if (i%10==0)
		{
			npcList[i].chaser = true;
			npcList[i].speed = Math.random() * 3 + 1;
		}
		if (i%5==0)
		{
			npcList[i].runner = true;
		}
		allCharacters.push(npcList[i]);
		allObjects.push(npcList[i])
	}
	allCharacters[0].turnIntoZombie();
	allCharacters.push(player);
	allObjects.push(exit);
	allObjects.push(securityKey);
}

//obstacles removed for now
// obstaclePlacement = [];

// for (var i = 0; i < 60; i++)
// {
// 	obstaclePlacement[i] = [-10, i*10];
// }
// for (var i = 60; i < 120; i++)
// {
// 	obstaclePlacement[i] = [800, (i-60)*10];
// }
// for (var i = 120; i < 200; i++)
// {
// 	obstaclePlacement[i] = [(i-120)*10, -10];
// }
// for (var i = 200; i < 280; i++)
// {
// 	obstaclePlacement[i] = [(i-200)*10, 600];
// }

//slowed the game down to crap.  I need a better way to do this.  it's weird because I can add as many npcs as I want and there's no slow down, and they're the ones doing all of the action here!  Would prototyping the obstacles, instead of making them object literals, like the npcs speed things up?

// var obstacles = [];
// for (var i = 0; i < 280; i++)
// {

// 	var div = document.createElement("div");
// 	div.style.width = "10px";
// 	div.style.height = "10px";
// 	div.style.backgroundColor = "black";
// 	div.style.position = "absolute";
// 		div.id = "obstacle" + i;
// 		//alert(div.id);
// 	field.appendChild(div);

// 	obstacles[i] = {
// 		id: document.getElementById("obstacle".concat(i)),
// 		type: "obstacle",
// 		x: obstaclePlacement[i][0],
// 		y: obstaclePlacement[i][1],
// 		width: 10,
// 		height: 10
// 	};

// 	div.style.left = obstacles[i].x;
// 	div.style.top = obstacles[i].y;
// }

// var obstacle = {
// 	id: document.getElementById("obstacle"),
// 	type: "obstacle",
// 	x: 0,
// 	y: 0,
// 	width: 10,
// 	height: 10
// }



function keyPressed(key)
{
	if (key.keyCode == 40 || key.keyCode == 83)
	{
		player.velocityY = player.speed;
		player.moveDown = true;
	}
	else if (key.keyCode == 38 || key.keyCode == 87)
	{
		player.velocityY = -player.speed;
		player.moveUp = true;
	}


	if (key.keyCode == 39 || key.keyCode == 68)
	{
		player.velocityX = player.speed;
		player.moveRight = true;
	}
	else if (key.keyCode == 37 || key.keyCode == 65)
	{
		player.velocityX = -player.speed;
		player.moveLeft = true;
	}

}

function keyReleased(key)
{
	if ((key.keyCode == 40 || key.keyCode == 83))
	{
		player.moveDown = false;
	}
	else if (key.keyCode == 38 || key.keyCode == 87)
	{
		player.moveUp = false;
	}

	if (!player.moveUp && !player.moveDown)
	{
		player.velocityY = 0;
	}


	if (key.keyCode == 39 || key.keyCode == 68)
	{
		player.moveRight = false;
	}
	else if (key.keyCode == 37 || key.keyCode == 65)
	{
		player.moveLeft = false;
	}

	if (!player.moveRight && !player.moveLeft)
	{
		player.velocityX = 0;
	}
}

function findDistance(x1, x2, y1, y2) 
{
	return Math.sqrt( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2) ) 
}

function presentOptions(result)
{
	if (result == "win")
	{
		alert("Hey, you lived!  Good thing, too.  We're going to need you to come in to work this weekend.  We've had a lot of our lab techs call off for some reason.");
		if (confirm("Work this weekend?"))
		{
			location.reload();
		}
	}
	else 
	{
		alert("TERMINATION NOTICE:\n\nIt has come to our attention that you have turned into a zombie.  We regret to inform you that this is in violation of our ethics policy.  As such, your employment with DeadRun Laboratories is terminated immediately.  Please report to human resources to collect any belongings or limbs you may have left behind.");
		if (confirm("Apply to work here again?"))
		{
			location.reload();
		}
	}
}

function update()
{
	gameTime += 25;
	player.update();
	exit.update();
	securityKey.update();

	for (var i = 0; i < npcList.length; i++)
	{
		npcList[i].update();
	}

	if (player.zombie == true)
	{
		presentOptions("loss");
		clearInterval(gameCycle);
	}
	else if (player.win == true)
	{
		//alert("you win!");
		presentOptions("win");
		clearInterval(gameCycle);
	}
}

document.onkeydown = keyPressed;
document.onkeyup = keyReleased;