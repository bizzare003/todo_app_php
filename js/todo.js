$(function () {
	// update
	$('.updateTodo').on('click', function() {
		var id = $(this).parents('li').data('id');
		$.post('_ajax.php', {
			id: id,
			mode: 'update',
			token: $('#token').val()
		}, function (res) {
			if(res.state === '1') {
				$('.todoTitle').addClass('done');
			} else {
				$('.todoTitle').removeClass('done');
				$('#todoUl').prepend(s);
			}
		});
	});
	// delete
	$('.deleteTodo').on('click', function() {
		var id = $(this).parents('li').data('id');
		if(!confirm('Are You Sure?')) {return;}
		$.post('_ajax.php', {
			id: id,
			mode: 'delete',
			token: $('#token').val()
		}, function () {
			$('.list' + id).fadeOut(1500).queue(function() {
				this.remove();
			});
		});
	});
	// create
	$('#todoForm').on('submit', function() {
		var title = $('#newTodo').val();
		$.post('_ajax.php', {
			title: title,
			mode: 'create',
			token: $('#token').val()
		}).done ((res) => {
			var $newLi = $('<li>', { class: 'list' + res.id});
			$newLi.attr('data-id', res.id);
			$newLi.prepend(
				$('<label></label>')
				.prepend(
					$('<input>', { type: 'checkbox', class: 'updateTodo'}),
					$('<span>', { text: title, class: 'todoTitle'})
				)
			).append($('<div>', { class: 'deleteTodo'}));
			$('#todoUl').prepend($newLi.fadeIn(1000, function() {
				location.reload();
			}));
		});
		return false;
	});
});
