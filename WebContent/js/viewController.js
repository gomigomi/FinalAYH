$(function() {
////	console.log("View Ready!");
//	var commentDatas = getCommentData();
	
	$('#howAbout, #search, #favorite, #history').hide();

	
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
	
	/*What about*/
	$('#howAbout-button').click(function(){
		$('#howAbout').show();
		$('#search').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})
	
	
	/*search*/
	$('#search-button').click(function() {
		$('#search').show();
		$('#howAbout').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
	});
	
	$('#search-clear-button').click(function(){
		$('.property').attr('checked', false)
	})
	
	/*favorite*/
	$('#favorite-button').click(function() {
		$('#favorite').show();
		$('#howAbout').hide();
		$('#search').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})
	
	
	/* Timeline을 눌렀을 때 메인페이지 복귀 */
	$('#timeline-button').click(function() {
		$('#main-view').show();
		$('#top').hide();
		$('#search').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
		
	});


	$('#recent_tab_btn').click(function(){
		$('#recent_post').show();
		$('#popular_post').hide();
	});
	
	$('#popular_tab_btn').click(function(){
		$('#popular_post').show();
		$('#recent_post').hide();
		renderPopularPostingList();
	});
	
	function renderPopularPostingList(){
		$('#popular_post').empty();
		$.ajax({
			url: 'http://localhost:8080/getPosting?type=4',
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				console.log("get populare posting");
				postingPopularDatas = res.result;
				
				if(postingPopularDatas == "") {
					$('#popular_post').empty();
					$('#popular_post').append('<div id="nothingElem">검색결과가 없습니다.</div>');
				}
				
				for(var i=0; i<postingPopularDatas.length; i++ ){
					if(window.sessionStorage.getItem('id')==postingPopularDatas[i].writer){
						$('#popular_post').append(getSectionItem(postingPopularDatas[i], false));
						handleRaty();
					}else{
						$('#popular_post').append(getSectionItem(postingPopularDatas[i], true));
						handleRaty();
					}
				}
			}
		})
	}
})
