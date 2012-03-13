var card = (function cardModel() {

	var posY = app.getScreenCenterY();
	var posX = app.getScreenCenterX();
	var card = {};
	card.parent = "0";

	// render card on screen
	function render(key, card) {
		if (card === undefined) {
			card = JSON.parse(localStorage.getItem(key));
		}
		cardDOM = '<div class="card" contenteditable="false" data-key="' + key
				+ '">' + card.content + '</div>';

		/* drop */
		$('head style').remove();
		var cssAnimation = document.createElement('style');
		cssAnimation.type = 'text/css';
		var rules = document
				.createTextNode('@-webkit-keyframes drop{from { top:-90px; left:'
						+ (posX - (74 + 12))
						+ 'px; -webkit-transform: rotate('
						+ app.rand(-270, 270)
						+ 'deg);}to { top:'
						+ card.top
						+ '; left:' + card.left + ';}}');
		cssAnimation.appendChild(rules);
		document.getElementsByTagName("head")[0].appendChild(cssAnimation);

		$(cardDOM).draggable({
			containment : "parent",
			start : function() {
				$(this).css('z-index', '10000');
			},
			stop : function() {
				$(this).css('z-index', zindex = app.increaseZindex());
				update(key, {
					zindex : zindex,
					left : $(this).css('left'),
					top : $(this).css('top')
				});
			}
		}).selectable().css('left', card.left).css('top', card.top).css(
				'z-index', card.zindex).css('position', 'absolute').appendTo(
				'div#board');
	}

	// Create
	function create(content) {
		var cardKey, newCounter = localStorage.getItem('counter'), highestZindex = localStorage
				.getItem('highestZindex');
		card.content = content;
		card.zindex = highestZindex;
		card.top = (posY - ((74 + 12) + app.rand(-50, 50))) + "px";
		card.left = (posX - ((120 + 12) + app.rand(-400, 400))) + "px";
		newCounter++;
		highestZindex++;
		cardKey = 'card' + newCounter;
		localStorage.setItem('counter', newCounter);
		localStorage.setItem('highestZindex', highestZindex);
		localStorage.setItem(cardKey, JSON.stringify(card));
		render(cardKey);
	}

	// Read
	var read = function() {

	}

	// Update
	function update(cardKey, cardObj) {
		var card = JSON.parse(localStorage.getItem(cardKey));
		for (objKey in cardObj) {
			card[objKey] = cardObj[objKey];
		}
		localStorage.setItem(cardKey, JSON.stringify(card));
	}

	// Remove
	function remove(cardKey, droppedCard) {
		var card = JSON.parse(localStorage.getItem(cardKey));
		card.parent = '-1';
		localStorage.setItem(cardKey, JSON.stringify(card));
		$(droppedCard).remove();
		localStorage.setItem('trash', 'filled');
	}

	// move to Trash
	var trash = function() {

	}

	// get position
	function getPos(cardKey) {
		var card = JSON.parse(localStorage.getItem(cardKey));
		var top = card.top;
		var left = card.left;
		var pos = {
			'x' : parseInt(top.substring(0, ((top.length) - 2)), 10),
			'y' : parseInt(left.substring(0, ((left.length) - 2)), 10)
		};
		return pos;
	}

	return {
		create : create,
		update : update,
		remove : remove,
		trash : trash,
		render : render,
		getPos : getPos
	};
})();