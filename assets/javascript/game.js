	// VARIABLES
	// ==========================================================================
	var characters = [
		{identity:"ob",name:"Obi-Wan Kenobi", picture:"Obi-Wan.jpg", hp:120, hpb:120, ap: 8, apb: 8, cap:16},
		{identity:"ls",name:"Luke Skywalker", picture:"Luke-Skywalker.jpg", hp:100, hpb:100, ap: 6, apb: 6, cap:12},
		{identity:"ds",name:"Darth Sidious", picture:"Darth-Sidious.jpg", hp:150, hpb:150, ap: 12, apb:12, cap:24},
		{identity:"dm",name:"Darth Maul", picture:"Darth-Maul.jpg", hp:180,  hpb:180, ap: 20, apb:20, cap:30}
	]
	var classidentifier = "charholder col-md-1 ";
	var charidentity = [];
	var charContainer=[];
	var player=-1;
	var opponent=-1;
	var wins = 0;
	var gameState="charselect";
	$(document).ready(function(){
		gamestart();
	});

	function selectEnemy(those){
		$('.charholder').on('click', function(){
		var something=$(this).attr('id');
		if (characters[player].identity == something){$("#"+something).unbind('click');}
		else {
			$("#"+something).remove("div");
			opponent = findCharacter(something);
			$('.defender').append(charContainer[opponent]);
			$('.fight').html('<button class="btn btn-warning btn-xs themeButton col-md-1" id="attack">attack</button>');
			$('.info').html("  ");
			unbindAll();
			gameState="fight";
			$('#attack').bind('click', function(){fightEnemy();});
			}
		});
	}
	function findCharacter(something){
		for(var i=0;i<characters.length;i++){
			if (characters[i].identity == something){return i;}
		}
		return -1;
	}
	function unbindAll(){
		for(var i=0;i<characters.length;i++){
			$('#'+characters[i].identity).unbind('click');
		}
	}
	function fightEnemy(){
		// decrement player and opponent health by damage 
		if (gameState=='fight'){
			characters[player].hp-=characters[opponent].cap;
			characters[opponent].hp-=characters[player].ap;
			console.log(characters[player].hp);
			var attackstring = "<p>You attacked "+characters[opponent].name+" for "+characters[player].ap+" damage.</p>";
			var defendstring = "<p>"+characters[opponent].name+" attacked you back for "+characters[opponent].cap+" damage.</p>";
			$('.info').html(attackstring+defendstring);
			// update character images
			characters[player].ap+=characters[player].apb;
			$(charContainer[player]).attr('id',characters[player].identity).html('<button class="heroes">'+characters[player].name+
				'<img src="assets/images/'+characters[player].picture+'"><br>'+
				characters[player].hp+'</button>');
			$(charContainer[opponent]).attr('id',characters[opponent].identity).html('<button class="heroes">'+characters[opponent].name+
				'<img src="assets/images/'+characters[opponent].picture+'"><br>'+
				characters[opponent].hp+'</button>');
			$('.character').html(charContainer[player]);
			$('.defender').html(charContainer[opponent]);
			if (characters[player].hp <= 0 ){
				infostring = "<p>You have been defeated...GAME OVER!!!</p><br>";
				$('.info').html(infostring);
				// $('.fight').unbind('click');
				// $('.info').append('<button class="btn btn-warning btn-xs themeButton col-md-1" id="restart">restart</button>');
				// $('#restart').bind('click', function(){restart();});
				// $('#attack').unbind('click');
				restartReady();
			}else if (characters[opponent].hp <= 0){
				$('#'+characters[opponent].identity).remove("div");
				wins++;
				console.log(wins);
				if (wins == characters.length-1){
					infostring = '<div class="row"><div class="placeholder col-md-1></div></div><div class="row"></div><p>You have defeated '
					+characters[opponent].name+', you have won the game.</p>';
					$('.info').html(infostring);
					// $('.info').append('<button class="btn btn-warning btn-xs themeButton col-md-1" id="restart">restart</button>');
					// $('.charholder, .fight').unbind('click');
					// $('#restart').bind('click', function(){restart();});
					// $('#attack').unbind('click');
					restartReady();
				}else {
					infostring = '<div class="row"><div class="placeholder col-md-1></div></div><div class="row"></div><p>You have defeated '
					+characters[opponent].name+', you can choose to fight another enemy.</p>';
					$('.info').html(infostring);
					gameState="enemyselect";
					// $('.enemy').bind('click', function(){selectEnemy(this);});
					$('#attack').bind('click',function(){noEnemy()});
					selectEnemy();
					// $('.fight').unbind('click');
					// $('.character').unbind('click');
				}
			}
		}	
	}
	function restartReady(){
		$('.info').append('<button class="btn btn-warning btn-xs themeButton col-md-1" id="restart">restart</button>');
		$('#restart').bind('click', function(){restart();});
		$('#attack').unbind('click');
	
	}
	function noEnemy(){
		infostring='<div class="row"><div class="placeholder col-md-1></div></div><div class="row"></div><p>No enemy to fight.</p>'
		$('.info').html(infostring);
		$('#attack').unbind('click');
	}
	function restart(){
		// clear screen
		$('.charholder').remove('div');
		$('.fight').unbind('click');
		$('button').remove('button');
		$('p').remove('p');

		// reset characters
		for (i=0;i<characters.length;i++){
			characters[i].hp=characters[i].hpb;
			characters[i].ap=characters[i].apb;
		}
		// $('.charholder').bind('click');
		player=-1;
		opponent=-1;
		wins=0;
		gameState="charselect";
		gamestart();
	}
	function gamestart(){
		populateChars();
		$('.charholder').on('click', function(){
			if(gameState=="charselect"){
				for (var i=0;i<characters.length;i++){
					if (characters[i].identity!=$(this).attr('id')){
						$('#'+characters[i].identity).remove("div");
						$('.enemy').append(charContainer[i]);
						$('#'+characters[i].identity).bind('click');
					}else {
						player=i;
						$('#'+characters[player].identity).unbind('click');
					}
				}
				gameState="enemyselect";
			}
			if(gameState=="enemyselect"){
				selectEnemy(this);
			}
		});
	}
	function populateChars(){
	for (var i=0;i<characters.length;i++){
		charidentity[i]=classidentifier+characters[i].identity;
		charContainer[i] = $("<div>").addClass(classidentifier);
		$(charContainer[i]).attr('id',characters[i].identity).html('<button class="heroes">'+characters[i].name+
			'<img src="assets/images/'+characters[i].picture+'"><br>'+
			characters[i].hp+'</button>');
		if (characters[i].hp>0){
			$(".character").append(charContainer[i]);
		}
	}

	}
