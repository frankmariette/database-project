$(function(){
	$('#trivia').on('submit',function(){
		var e = document.getElementById('trivia');
		var query = e.options[e.selectedIndex].value;
		console.log(query);
		$.get('/trivia',parameters, function(data){
			$('#results').html(data);
			console.log(data);
		});
	});
});