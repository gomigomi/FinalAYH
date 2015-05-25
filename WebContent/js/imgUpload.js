$(function(){
	var postingPreferenceDatas;
	
     $("#howAbout-button").click(function(){ 
    	 
    	var id=window.sessionStorage.getItem('id');
 		
    	$('#howAbout').show();
		$('#search').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
		
 		$.ajax({
 			url: 'http://localhost:8080/getPosting?type=6&id='+id,
 			method: 'get',
 			dataType: 'json',
 			async : false,
 			success : function(res){
 				$('#howAbout').empty();
 				postingPreferenceDatas = res.result;
 				console.log(postingPreferenceDatas);
 				for(var i=0; i<postingPreferenceDatas.length; i++ ){
					if(window.sessionStorage.getItem('id')==postingPreferenceDatas[i].writer){
						$('#howAbout').append(getSectionItem(postingPreferenceDatas[i], false));
						handleRaty();
					}else{
						$('#howAbout').append(getSectionItem(postingPreferenceDatas[i], true));
						handleRaty();
					}
				}
 			}
 		})
     })
})