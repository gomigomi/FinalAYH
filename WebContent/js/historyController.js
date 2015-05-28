$(function() {
	var commentDatas = getCommentData();
	function getCommentData(){
		$.ajax({
			url : 'http://localhost:8080/getComment',
			method : 'get',
			dataType : 'json',
			success : function(res){
				console.log("get comment");
				commentDatas = res.result;
			}
		})
	}

	$('#history-button').click(function() {
		$('#history').show();
		$('#history-posting').show();
		$('#history-comment').hide();
		$('#search').hide();
		$('#favorite').hide();
		$('.top_explain').hide();
		
		$('#history-posting-button').click(function(){
			getPostingUser();
			$('#history-posting').show();
			$('#history-comment').hide();
		})
		$('#history-comment-button').click(function(){
			getCommentUser();
			$('#history-comment').show();
			$('#history-posting').hide();								
		})
	})

	//쓴 포스팅 불러오기 
	function getPostingUser(){
		$('#history-posting').empty();
		var id=window.sessionStorage.getItem('id');
		$.ajax({
			url: 'http://localhost:8080/getPosting?type=2&id='+id,
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				console.log("get user-written-posting");
				postingUserDatas = res.result;
				
				if(postingUserDatas == "") {
					$('#history-posting').empty();
					$('#history-posting').append('<div id="nothingElem">검색결과가 없습니다.</div>');
				}
				
				for(var i=0;i<postingUserDatas.length;i++){
					$('#history-posting').append(getSectionItem(postingUserDatas[i],false));
					handleRaty();
				}
			}
		})
	}	
	//쓴 코멘트 게시물 불러오기 
	function getCommentUser(){
		$('#history-comment').empty();
		var id=window.sessionStorage.getItem('id');
		$.ajax({
			url: 'http://localhost:8080/getPosting?type=3&id='+id,
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				console.log("get-user-written comment");
				postingUserCommentDatas = res.result;
				
				if(postingUserCommentDatas == "") {
					$('#history-comment').empty();
					$('#history-comment').append('<div id="nothingElem">검색결과가 없습니다.</div>');
				}
				
				//콘솔 
//				console.log(postingUserCommentDatas);
				for(var i=0; i<postingUserCommentDatas.length; i++){
					$('#history-comment').append(getSectionItem(postingUserCommentDatas[i],false));
					handleRaty();
				}
			}
		})
	}	
	
})