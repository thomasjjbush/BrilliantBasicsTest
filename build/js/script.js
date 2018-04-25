// globals
var deckDiv  = document.getElementById('deck'),
	dealtDiv = document.getElementById('dealtCards'),
 	suits  	 = ['Clubs','Hearts','Spades','Diamonds'],
	values 	 = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	deck   	 = [],
	card;

// Create deck
var createDeck = function() {
	for( var s = 0; s < suits.length; s++ ) { // loop suits
	    for( var v = 0; v < values.length; v++ ) { // loop values
	        var card 	= {};
		    card.suit 	= suits[s];
		    card.value 	= values[v];
		    card.bgPosX = -v * 73;
		    card.bgPosY = -s * 98;
		    deck.push(card);
	    }
	}
}
createDeck();

// Create card divs
var arrayToDom = function() {

	deckDiv.innerHTML = ""; // Clear
	dealtDiv.innerHTML = ""; // Clear

	for ( d in deck ) {

			card = document.createElement('div');
			card.id = deck[d].suit + '_' + deck[d].value;
			card.className = 'card';
			card.setAttribute(
				'style', 'background-position-y:' + deck[d].bgPosY + 'px; background-position-x:' + deck[d].bgPosX + 'px;'
			);

		deckDiv.appendChild(card);

	}
}
arrayToDom(); 

// shuffle deck
function shuffle() {
	for (var i = deckDiv.children.length; i >= 0; i--) {
	    deckDiv.appendChild(deckDiv.children[Math.random() * i | 0]);
	}
}

// unshuffle deck
function unShuffle() {
	arrayToDom();
}

// flip the deck
function flipTheDeck() {
	var card = deckDiv.children;
	for ( var i = 0; i < card.length; i++ ) {
		var hasClass = card[i].classList.contains('flipped');
		if ( hasClass === true ) {
			card[i].classList.remove('flipped');
		} else { card[i].classList.add('flipped'); }
	}
}

// deal a card
function dealACard() {
	for ( var i = 0; i < 5; i++ ) {
		var dealtCard = deckDiv.children[Math.floor(Math.random()*deckDiv.children.length)];
		deckDiv.removeChild(dealtCard);
		dealtDiv.appendChild(dealtCard);
	}
	
}

