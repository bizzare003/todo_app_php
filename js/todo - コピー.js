$(function () {
	'use strict';
	$('#todoUl').on('click', '.updateTodo', function() {
		var id = $(this).parents('li').data('id');
		// console.log(id);
		$.post('_ajax.php', {
			id: id,
			mode: 'update',
			token: $('#token').val()
		}, function(res) {
		});
	});

	// Delete
	$('#todoUl').on('click', '.deleteTodo', function() {
		var id = $(this).parents('li').data('id');
		// console.log(id);
		if (confirm('Are you sure?')) {
			$.post('_ajax.php', {
				id: id,
				mode: 'delete',
				token: $('#token').val()
			}, function() {
				$('.list' + id).fadeOut(500);
			});
		}
	});

	// Create
	$('#todoForm').on('submit', function() {
		var title = $('#newTodo').val();
		$.post('_ajax.php', {
			title: title,
			mode: 'create',
			token: $('#token').val()
		}, function(res) {
			var $li = 	$('#todoUl li:first').clone();
			$li.attr('class', 'list' + res.id).data('id', res.id).find('.todoTitle').text(title);
			$('#todoUl').prepend($li.fadeIn());
		});
		return false;
	});
});
