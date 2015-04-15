$(function() {
	console.log("favoriteController Ready!");
	var flag = 0;
	
	
	
	
	$('#favorite-button').click(function(){
		getCommentData();
		getFavoriteData();
	})
	
	
	$(document).on('click', '.favorite-btn', function(){
		if(flag == 0) {
			flag = 1;
			$(this).closest('#heart-o').hide();
			$(this).closest('#heart').show();
			alert("Added to Favorite!");
		} else if (flag == 1){
			flag = 0;
			$(this).closest('#heart-o').show();
			$(this).closest('#heart').hide();
			alert("Deleted!");
		}
		
	});
	
})