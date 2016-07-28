	// VARIABLES
	// ==========================================================================
	var characters = [
		{identity:"ob",name:"Obi-Wan Kenobi", picture:"Obi-Wan.jpg", hp:120, hpb:120, ap: 8, apb: 8, cap:16},
		{identity:"ls",name:"Luke Skywalker", picture:"Luke-Skywalker.jpg", hp:100, hpb:100, ap: 6, apb: 6, cap:5},
		{identity:"ds",name:"Darth Sidious", picture:"Darth-Sidious.jpg", hp:150, hpb:150, ap: 12, apb:12, cap:20},
		{identity:"dm",name:"Darth Maul", picture:"Darth-Maul.jpg", hp:180,  hpb:180, ap: 20, apb:20, cap:25}
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
			$('button','#'+characters[opponent].identity).css({'background-color':'black','color':'white', 'border-color':'green'});
			$('.info').html("  ");
			unbindAll();
			gameState="fight";
			$('#attack').unbind('click');
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
		console.log('fought');
		if (gameState=='fight'){
			// characters[player].hp-=characters[opponent].cap;
			characters[opponent].hp-=characters[player].ap;
			var attackstring = "<h3>You attacked "+characters[opponent].name+" for "+characters[player].ap+" damage.</h3>";
			var defendstring = "<h3>"+characters[opponent].name+" attacked you back for "+characters[opponent].cap+" damage.</h3>";
			$('.info').html(attackstring+defendstring);
			// update character images
			characters[player].ap+=characters[player].apb;
			$(charContainer[opponent]).attr('id',characters[opponent].identity).html('<button class="heroes">'+characters[opponent].name+
				'<img src="assets/images/'+characters[opponent].picture+'"><br>'+
				characters[opponent].hp+'</button>');
			$('.defender').html(charContainer[opponent]);
			$('button','#'+characters[opponent].identity).css({'background-color':'black','color':'white', 'border-color':'green'});

			if (characters[opponent].hp <= 0){
				$('#'+characters[opponent].identity).remove("div");
				wins++;
				if (wins == characters.length-1){
					infostring = '<div class="row"><div class="placeholder col-md-1></div></div><div class="row"></div><h3>You Won!!!! GAME OVER!!!</h3>';
					$('.info').html(infostring);
					restartReady();
				}else {
					infostring = '<div class="row"><div class="placeholder col-md-1></div></div><div class="row"></div><h3>You have defeated '
					+characters[opponent].name+', you can choose to fight another enemy.</h3>';
					$('.info').html(infostring);
					gameState="enemyselect";
					$('#attack').bind('click',function(){noEnemy()});
					selectEnemy();
				}
			}else 	{
						characters[player].hp-=characters[opponent].cap;
						if (characters[player].hp <= 0 ){
							infostring = "<h3>You have been defeated...GAME OVER!!!</h3><br>";
							$(charContainer[player]).attr('id',characters[player].identity).html('<button class="heroes">'+characters[player].name+
								'<img src="assets/images/'+characters[player].picture+'"><br>'+
								characters[player].hp+'</button>');
							$('.info').html(infostring);
							$('.character').html(charContainer[player]);
							restartReady();
						} else {
							$(charContainer[player]).attr('id',characters[player].identity).html('<button class="heroes">'+characters[player].name+
								'<img src="assets/images/'+characters[player].picture+'"><br>'+
								characters[player].hp+'</button>');
							$('.character').html(charContainer[player]);
						}
					}
		}	
	}
	function restartReady(){
		$('.info').append('<button class="btn btn-xs col-md-1" id="restart">Restart</button>');
		$('#restart').bind('click', function(){restart();});
		$('#attack').unbind('click');
	}
	function noEnemy(){
		infostring='<div class="row"><div class="placeholder col-md-1></div></div><div class="row"></div><h3>No enemy here.</h3>'
		$('.info').html(infostring);
		$('#attack').unbind('click');
	}
	function restart(){
		// clear screen
		$('.charholder').remove('div');
		$('.info').html('');
		$('.enemy').html('<div class="placeholder"></div><div class="row"><h1>Enemies Available To Attack</h1></div>');
		$('p').remove('p');
		$('#restart').remove('button');

		// reset characters
		for (i=0;i<characters.length;i++){
			characters[i].hp=characters[i].hpb;
			characters[i].ap=characters[i].apb;
		}
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
				$('.placeholder').remove('div');
				for (var i=0;i<characters.length;i++){
					if (characters[i].identity!=$(this).attr('id')){
						$('#'+characters[i].identity).remove("div");
						$('.enemy').append(charContainer[i]);
						$('button','#'+characters[i].identity).css({'background-color':'red', 'border-color':'black'});
						$('#'+characters[i].identity).bind('click');
					}else {
						player=i;
						$('#'+characters[player].identity).unbind('click');
						$('#'+characters[player].identity).remove("div");
						$('.character').append(charContainer[i]);
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
			$(charContainer[i]).attr('id',characters[i].identity).html('<button class="heroes" id='+characters[i].identity+'>'+characters[i].name+
				'<img src="assets/images/'+characters[i].picture+'"><br>'+
				characters[i].hp+'</button>');
			if (characters[i].hp>0){
				$(".stage").append(charContainer[i]);
			}
		}

	}
