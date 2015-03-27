$(function() {
	console.log("View Ready!");
	
	$('#preference, #favorite, #history').hide();
	
	/*collection을 누를 때 */
	$('#collection-button').click(function() {
		if(window.sessionStorage.getItem('id')){
			$('#main-view').hide();
			$('#top').show();
			$('.top_explain').show();
			
			$('')
		} else {
			alert("Log-in First!");
		}
	});
	
	/*preference*/
	$('#recommend-button').click(function() {
		$('#preference').show();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
	});
	
	/*favorite*/
	$('#favorite-button').click(function() {
		$('#favorite').show();
		$('#preference').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})
	
	
	/*history*/
	$('#history-button').click(function() {
		$('#history').show();
		$('#history-posting').show();
		$('#history-comment').hide();
		$('#preference').hide();
		$('#favorite').hide();
		$('.top_explain').hide();
		
		$('#history-posting-button').click(function(){
			$('#history-posting').show();
			$('#history-comment').hide();
		})
		
		$('#history-comment-button').click(function(){
			$('#history-comment').show();
			$('#history-posting').hide();
		})
	})
	
	
	
	
	

	
	/* Timeline을 눌렀을 때 메인페이지 복귀 */
	$('#timeline-button').click(function() {
		$('#main-view').show();
		$('#top').hide();
		$('#preference').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
		
	});
	
})