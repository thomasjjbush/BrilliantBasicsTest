// globals
var deckDiv  = document.getElementById('deck'),
	dealtDiv = document.getElementById('dealtCards'),
	input 	 = document.getElementById('dealValue'),
 	suits  	 = ['Clubs','Hearts','Spades','Diamonds'],
	values 	 = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	deck   	 = [],
	card;

// Create deck
var createDeck = function() {
	for( var s = 0; s < suits.length; s++ ) { // loop suits
	    for( var v = 0; v < values.length; v++ ) { // loop values
	        var card 	= {
	        	suit:suits[s],
	        	value:values[v],
	        	bgPosX: -v * 73,
	        	bgPosY: -s * 98
	        };
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
	limitValue();
	input.value = 5;
}

// flip the deck
function flipTheDeck() {
	deckDiv.classList.toggle('flipped');	
}

// deal a card
function dealACard(dealValue) {
	for ( var i = 0; i < dealValue; i++ ) {
		var dealtCard = deckDiv.children[Math.floor(Math.random()*deckDiv.children.length)];
		deckDiv.removeChild(dealtCard);
		dealtDiv.appendChild(dealtCard);
	}
	limitValue();
// alternatively deal the cards on the "top" or random
// var cardToDeal = false ? function(length) { return Math.floor(Math.random()*length) } : function(length) { return length -1 };
// for ( var i = 0; i < dealValue; i++ ) {
// 	var dealtCard = deckDiv.children[cardToDeal(deckDiv.children.length)];
// 	deckDiv.removeChild(dealtCard);
// 	dealtDiv.appendChild(dealtCard);
// }
}

// limit input value
function limitValue() {
	input.setAttribute('max', deckDiv.children.length);
	var max = parseInt(input.max);
	if (parseInt(input.value) > max) {
	    input.value = max; 
	}
}

// pile the deck
function stackTheDeck() {
	deckDiv.classList.toggle('stacked');
}