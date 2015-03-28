$(function() {
	
	$('#popular_tap_btn').click(function() {
		$('#popular_post').show();
		$('#recent_post').hide();
	});

	$('#recent_tab_btn').click(function() {
		$('#popular_post').hide();
		$('#recent_post').show();
	});
	
})