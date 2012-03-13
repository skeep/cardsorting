var app = (function appController() {
	var boardDOM = 'div#board', cardDOM = 'div.card';

	// initialize the cards
	function initRender(count) {
		$(boardDOM + ' ' + cardDOM).remove();
		var i, key, cardObj = {}, trash;
		for (i = 1; i <= count; i++) {
			key = 'card' + i;
			cardObj = JSON.parse(localStorage.getItem(key));
			if (cardObj.parent !== '-1') {
				card.render(key, cardObj);
			}
		}
		trash = localStorage.getItem('trash');
		if (trash === 'filled') {
			$('div#trash').addClass('filled');
		}
	}

	// initialize application
	function init() {
		var counter = localStorage.getItem('counter');
		if (counter === null) {
			localStorage.setItem('counter', '0');
			localStorage.setItem('highestZindex', '1');
			localStorage.setItem('trash', 'empty');
		} else {
			initRender(counter);
		}
	}

	function deleteCards() {
		var count = localStorage.getItem('counter'), i, key;
		for (i = 1; i <= count; i++) {
			key = 'card' + i;
			localStorage.removeItem(key);
		}
		localStorage.setItem('counter', '0');
		localStorage.setItem('highestZindex', '1');
		localStorage.setItem('trash', 'empty');
		$('div#trash').removeClass('filled');
		$(boardDOM + ' ' + cardDOM).remove();
	}

	function increaseZindex() {
		var zindex = parseInt(localStorage.getItem('highestZindex'), 10) + 1;
		localStorage.setItem('highestZindex', zindex);
		return (zindex);
	}

	// Get a random number between two integers
	function rand(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	function getScrollOffset() {
		var y;
		if (self.pageYOffset) {
			y = self.pageYOffset;
		} else if (document.documentElement
				&& document.documentElement.scrollTop) {
			y = document.documentElement.scrollTop;
		} else if (document.body) {
			y = document.body.scrollTop;
		}
		return (y);
	}

	// get the center of the screen
	function getScreenCenterY() {
		var y = 0;
		y = getScrollOffset() + (getInnerHeight() / 2);
		return (y);
	}

	function getScreenCenterX() {
		return (document.body.clientWidth / 2);
	}

	function getInnerHeight() {
		var y;
		if (self.innerHeight) // all except Explorer
		{
			y = self.innerHeight;
		} else if (document.documentElement
				&& document.documentElement.clientHeight)
		// Explorer 6 Strict Mode
		{
			y = document.documentElement.clientHeight;
		} else if (document.body) // other Explorers
		{
			y = document.body.clientHeight;
		}
		return (y);
	}

	return {
		init : init,
		deleteAll : deleteCards,
		increaseZindex : increaseZindex,
		getScreenCenterY : getScreenCenterY,
		getScreenCenterX : getScreenCenterX,
		rand : rand
	};
})();