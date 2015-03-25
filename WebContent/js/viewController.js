$(function() {
	console.log("View Ready!");
	
	
	/*collection을 누를 때 */
	$('#collection-button').click(function() {
		if(window.sessionStorage.getItem('id')){
			$('#main-view').hide();
			$('#top').show();
			$('.top_explain').show();
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
	
	
	

	
	/* Timeline을 눌렀을 때 메인페이지 복귀 */
	$('#timeline-button').click(function() {
		$('#main-view').show();
		$('#top').hide();
	});
	
})