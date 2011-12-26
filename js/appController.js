var app = (function appController() {
	var boardDOM = 'div#board', cardDOM = 'div.card';

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

	// initialize the cards
	function initRender(count) {
		$(boardDOM + ' ' + cardDOM).remove();
		for (i = 1; i <= count; i++) {
			var key = 'card' + i;
			var cardObj = JSON.parse(localStorage.getItem(key));
			if (cardObj.parent !== '-1') {
				card.render(key, cardObj);
			}
		}
		var trash = localStorage.getItem('trash');
		if (trash === 'filled') {
			$('div#trash').addClass('filled')
		}
	}

	function deleteCards() {
		var count = localStorage.getItem('counter');
		for (i = 1; i <= count; i++) {
			var key = 'card' + i;
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
	
	//Get a random number between two integers
	function rand(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	//get the center of the screen
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

	function getScrollOffset() {
		var y;
		if (self.pageYOffset) // all except Explorer
		{
			y = self.pageYOffset;
		} else if (document.documentElement
				&& document.documentElement.scrollTop)
		// Explorer 6 Strict
		{
			y = document.documentElement.scrollTop;
		} else if (document.body) // all other Explorers
		{
			y = document.body.scrollTop;
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