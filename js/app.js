$(function() {

var $homer = $('<audio>').attr('src', 'http://www.springfieldfiles.com/sounds/homer/hacker.mp3')
var $burns = $('<audio>').attr('src', 'http://www.springfieldfiles.com/sounds/burns/excellnt.mp3')
$whoseTurn = $('<span>').html(": it is currently your turn")

$('button').click(function(){
	$homer.trigger('play')
	//grabs values from input boxes
	$p1 = $('#name1').val()
	$p2 = $('#name2').val()
	//puts these as html into spans
	$span1 = $('<span>').html($p1)
	$span2 = $('<span>').html($p2)
	//spans are added to their respective places in score box
	$('#player1').append($span1)
	$('#player2').append($span2)
	// vanish buttons
	$('input').remove()
	$('button').remove()
	$("#must-fill").remove()
	//this adds the "playable" class to the bottom row, required for moves to be made
	$('.row-0').children().addClass("playable")
	var p1Wins = 0
	var p2Wins = 0
	$("#p1wins").html($p1 + " Wins: "  + p1Wins)
	$("#p2wins").html($p2 + " Wins: " +  p2Wins)


	
})

var winner
var horizontals = function(x,y){
	if ((board[x][y] == "red" && board[x][y+1] == "red" && board[x][y+2] == "red" && board[x][y+3] == "red") ||
		(board[x][y]== "red" && board[x][y-1] == "red" && board[x][y-2] == "red" && board [x][y-3] == "red")) 
		{winner = "red"}
	if ((board[x][y] == "yellow" && board[x][y+1] == "yellow" && board[x][y+2] == "yellow" && board[x][y+3] == "yellow") ||
	   	(board[x][y]== "yellow" && board[x][y-1] == "yellow" && board[x][y-2] == "yellow" && board [x][y-3] == "yellow"))
		{winner = "yellow"}	
}
var verticals = function (x,y){
	if (board[x][y] == "red" && board[x+1][y] == "red" && board[x+2][y] == "red" && board[x+3][y] == "red")
		{winner = "red"}
	if (x>3){
			if(board[x][y]== "red" && board[x-1][y] == "red" && board[x-2][y] == "red" && board [x-3][y] == "red")
			{winner = "red"} 		
		} 
	if (board[x][y] == "yellow" && board[x+1][y] == "yellow" && board[x+2][y] == "yellow" && board[x+3][y] == "yellow")
		{winner = "yellow"}
	if (x>3){
			if (board[x][y]== "yellow" && board[x-1][y] == "yellow" && board[x-2][y] == "yellow" && board [x-3][y] == "yellow")
			{winner = "yellow"}
		}
}
var diagonals = function (x,y){

	if (board[x][y] == "red" && board[x+1][y+1] == "red" && board[x+2][y+2] == "red" && board[x+3][y+3] == "red")
		{winner = "red"}
	if (board[x][y] == "red" && board[x+1][y-1] == "red" && board[x+2][y-2] == "red" && board[x+3][y-3] == "red")
		{winner = "red"}
		if (x>3){
			if(board[x][y]== "red" && board[x-1][y-1] == "red" && board[x-2][y-2] == "red" && board [x-3][y-3] == "red")
			{winner = "red"}
		}
	if (board[x][y] == "yellow" && board[x+1][y+1] == "yellow" && board[x+2][y+2] == "yellow" && board[x+3][y+3] == "yellow")
		{winner = "yellow"}
	if (board[x][y] == "yellow" && board[x+1][y-1] == "yellow" && board[x+2][y-2] == "yellow" && board[x+3][y-3] == "yellow")
		{winner = "yellow"}
		if (x>3){
			if(board[x][y]== "yellow" && board[x-1][y-1] == "yellow" && board[x-2][y-2] == "yellow" && board [x-3][y-3] == "yellow")
			{winner = "yellow"}
		}	
}

var p1Wins = 0
var p2Wins = 0

var check = function(x,y){
	var $movesLeft = $('.unplayed').length
	for (var x = 0; x < 6; x++){
		for(var y = 0; y < 7; y++){
			horizontals(x,y);
			if (winner){break;}
			verticals(x,y);
			if (winner){break;}
			diagonals(x,y);
			if (winner){break;}
			}
		}
	if (winner){

		//this sets html data in the score box
		$burns.trigger('play')
		if ($movesLeft%2 == 1) 
			{p1Wins = p1Wins+1;
				$whoseTurn.html(": you have lost"); winner = $p1; $("#p1wins").html($p1 + " Wins: "  + p1Wins); alert("The winner is " + winner); } 
		else {p2Wins = p2Wins + 1; $whoseTurn.html(": you have lost"); winner = $p2; $("#p2wins").html($p2 + " Wins: "  + p2Wins); alert("the winner is " + winner)}

	}

}
//make an empty array board
var board = []

for (var i = 0; i <6; i++){
	var rows = []	
	//push 6 empty arrays "rows" into "board"
	board.push(rows)
	//create 6 "$rows" divs, add a class of row-0, row-1, row-2... row-5 to each										
	var $rows = ($('<div>').addClass("row-" + i))
	// prepend rows to board div on base html 
	// (this should have been append, but this is compensated for math-wise later) FIX
	$("#board").prepend($rows)
	for (var j = 0; j < 7; j++){
		//create 7 "$cols" divs, add classes col-0, col-1, col-2... etc to each
		//add text ("0 0" "0 1" etc ) for visual reference while building, 
		//css breaks if i remove, so i just made it transparent)
		//oh, and add class "unplayed" - this means there are 42 elements with class "unplayed"
		var $cols = ($('<div>').addClass("col-" + j).addClass("unplayed").text(i +" " + j)).css("color","transparent")
			// append $cols (which are divs) to $rows (the long divs)
			$rows.append($cols)
				// the tricky part:
				// "board" is currently an array with six empty "rows" arrays in it
				board[i][j] = $cols.click (function() {
    		  // board **NOW** looks like[ [$cols,$cols,$cols,$cols,$cols,$cols,$cols],
									   // [$cols,$cols,$cols,$cols,$cols,$cols,$cols], 
									   // [$cols,$cols,$cols,$cols,$cols,$cols,$cols], 
									   // [$cols,$cols,$cols,$cols,$cols,$cols,$cols], 
									   // [$cols,$cols,$cols,$cols,$cols,$cols,$cols],
									   // [$cols,$cols,$cols,$cols,$cols,$cols,$cols] ]
			  // these $cols are jquery objects, each with a click handler which executes the following:

			  		// $colPosition is a number equal to $(this)'s (the thing clicked on's) index
			  		// within its parent (the row) + 1
			  		// 1 is added because this will be used to call the nth-child
			  		// of the above (.prev) row to give it the "playable" class
			  		// (necessary because nth-child() is 1 indexed and index() is 0 indexed
					var $colPosition = $(this).index() + 1;
					// $nextRowUp is the clicked div's parent's previous sibling
					var $nextRowUp = $(this).parent().prev();
					// $rowPosition is ultimately the index number of row that contains the clicked div
					// there are 6 rows, so indices 0 through 5
					// 5 - (the currently clicked row's index) yields an index number equal to its position from the bottom
					// this bit of inversion is so that board[0][0] (not board [5][0]) will be equal to the value of the bottom rows's first position
					var $rowPosition = 5 - $nextRowUp.next().index()
					// if the clicked div is red/yellow/playable (if you are allowed to place above it...)
					if($(this).hasClass("red") || $(this).hasClass("yellow") || $(this).hasClass("playable")){
					// we want the circle above a colored circle to become "playable"
					// we give the playable class to above row's child with the same index as the clicked div
					// could I have just used index all throughout and not bothered switching between children
					$nextRowUp.find(">:nth-child(" + $colPosition + ")").addClass("playable")
						}
					// movesLeft starts at 42 and goes down by 1 as makeRed/makeYellow remove the "unplayed" class
					// if movesLeft is even, makeRed runs, odd, makeYellow
					var movesLeft = $('.unplayed').length
					if(movesLeft %2 == 0 && $(this).hasClass("playable")){
						// the string $whoseTurn gets appended to the appropriate player div within the score box
						$('#player2').append($whoseTurn)
						makeRed($(this));
						//colPosition -= 1 because it was previously increased by 1 to
						//compensate for index() vs. nth-child() return
						$colPosition -=1;
						// if we are dealing with the top row, program will try to reference a sibling with an index of -1
						// $rowPosition calculcautes 5--1 = 6
						// 1 is subtracted from $rowPosition in this case so that the top row is referenced
						if ($rowPosition == 6){$rowPosition = $rowPosition-1}
						// sets array position to a string "red"	
						board[$rowPosition][$colPosition] = "red"
						// runs check function, above
						check($rowPosition, $colPosition)
					}
					if(movesLeft %2 == 1 && $(this).hasClass("playable")){
						$('#player1').append($whoseTurn)
						makeYellow($(this))
						$colPosition -=1;
						if ($rowPosition == 6){$rowPosition = $rowPosition-1}
						board[$rowPosition][$colPosition] = "yellow"
						check($rowPosition, $colPosition)
				}
			})	
	}
}



var makeRed = function(x){
	x.addClass("red");
	x.removeClass("unplayed");
	x.removeClass("playable");
}
var makeYellow = function(x){
	x.addClass("yellow");
	x.removeClass("unplayed");
	x.removeClass("playable");
}

})