<?php
	session_start();
	require_once(__DIR__ . '/config.php');
	require_once(__DIR__ . '/function.php');
	require_once(__DIR__ . '/Todo.php');

	$todoApp = new \MyApp\Todo();
	$todos = $todoApp->getAll();


?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>My Todos</title>
		<link rel="stylesheet" href="./css/style.css">
</head>
<body>
	<div id="container">
		<h1>Todos</h1>
		<form action="" id="todoForm">
			<div class="inputArea">
				<input type="text" id="newTodo" placeholder="What needs to be done?">
			</div>
		</form>

		<ul id="todoUl">
			<?php
				foreach($todos as $todo):
					$id = $todo->id;
					$state = $todo->state;
					$title = h($todo->title);
			?>
			<li class="list<?php echo $id;?>" data-id="<?php echo $id;?>">
				<label>
					<input type="checkbox" class="updateTodo"<?php if($state === '1'){echo ' checked';};?>>
					<span class="todoTitle"><?php echo $title;?></span>
				</label>
				<div class="deleteTodo">x</div>
			</li>
		<?php endforeach;?>

		</ul>
	</div>
<input type="hidden" id="token" value="<?php echo h($_SESSION['token']);?>">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="./js/todo.js"></script>
</body>
</html>
