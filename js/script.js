$(document).ready(
		function() {
			// initialize the cards
			app.init();

			$('input.card-content').keyup(function(e) {
				if (e.keyCode === 13) {
					var content = $('input').val();
					card.create(content);
					$('input').val('');
				}
			});

			$('button#add').click(function() {
				var content = $('input').val();
				card.create(content);
			});

			$('button#delete').click(function() {
				app.deleteAll();
			});
			// open editable card on double click
			$('div.card').on(
					'dblclick',
					function() {
						$('div.card.selected').removeClass('selected').attr(
								'contenteditable', 'false');
						$(this).addClass('selected').attr('contenteditable',
								'true').css('z-index', '10000').focus();
					});
			$('div.card').on(
					'blur',
					function() {
						$('div.card.selected').removeClass('selected').attr(
								'contenteditable', 'false');
						var key = $(this).attr('data-key');
						card.update(key, {
							content : $(this).text()
						})
					});
			$('#trash').droppable({
				hoverClass : 'hover',
				drop : function(event, ui) {
					var droppedCard = ui.draggable;
					var key = $(droppedCard).attr('data-key');
					card.remove(key, droppedCard);
					$(this).addClass('filled');
				}
			});
			$('.stacker').droppable({
				hoverClass : 'hover',
				drop : function(event, ui) {
					var droppedCard = ui.draggable;
					var key = $(droppedCard).attr('data-key');
					
					$(droppedCard).remove();
					$(this).append(droppedCard);
				}
			});
		});
