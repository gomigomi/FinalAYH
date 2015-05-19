$(function() {
	//console.log(commentDatas);
////	//모든 코멘트를 불러온
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
				//콘솔 
				console.log(postingUserCommentDatas);
				for(var i=0; i<postingUserCommentDatas.length; i++){
					$('#history-comment').append(getSectionItem(postingUserCommentDatas[i],false));
					handleRaty();
				}
			}
		})
	}	
//	function getCommentUser() {
//		$('#history-comment').empty();
//		var id = window.sessionStorage.getItem('id');
//		$.ajax ({
//			url : 'http://localhost:8080/getComment?'
//		})
//	}
	
	function getSectionItem(postingDatas, isHide){
		
		var display = isHide ? 'none' : 'block';
		var favoriteDisplay = "none";
		var favoriteDisplaySub ='block';
		
		/*favorite와 posting 연결*/
		var currentFavoriteDatas = _.filter(favoriteDatas, function(value){
//			alert("flag"+value.posting_seq+"posting"+postingDatas.seq);
			return value.posting_seq == postingDatas.seq;
		});
				
		$.each(currentFavoriteDatas, function(idx, item){
			if (item.flag == "1") {
				favoriteDisplay = "block";
				favoriteDisplaySub = "none";
			}
		});
		
		var sectionElem = 
			'<section class="post '+postingDatas.seq+'" id="posting_'+postingDatas.seq+'">'+
			'<div class="post-header post-top">'+
				'<span class="post-avatar post-img"> '+
					'<img src="/img/common/'+postingDatas.thumb+'.jpg"/>'+
				'</span>'+ 
				'<span class="post-meta bacpost-meta">'+ 
					'<span class="post-writer">'+ 
						'<a class="post-author" href="#">'+postingDatas.writer+'</a>'+
					'</span>'+ 
					'<span class="posting-buttons" style="display:'+display+'"> '+
						'<a href="#post_edit" rel="modal:open">'+
							'<button class="post-edit">'+
								'<i class="fa fa-pencil-square-o"></i>'+
							'</button>'+
						'</a>'+
						'<button class="post-delete">'+
							'<i class="fa fa-times"></i>'+
						'</button>'+
					'</span>'+
					'<a href="#more_content" rel="modal:open"><button class="more-content"><img src="#"/></button></a>'+
					'<span id=mainView_favorite>'+
						'<button id="heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button>'+
						'<button id="heart" class="fa fa-heart favorite-btn" style="display:'+favoriteDisplay+'"></button>'+
					'</span>'+
					'<p>'+
						'<span class="bac-point">Point '+postingDatas.avg+'</span>'+
						'<span class="comment-raty-form">'+
							'<span class="raty" data-score="3"></span>'+
							'<span class = "pure-button add-commentRaty-btn">별점주기</span>'+
						'</span>'+
						'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
					'</p>'+
				'</span>'+
			'</div>'+
			'<div class="post-description bac-content">'+
				'<span id = "postingImg_view">'+
				'<a href="#more_content" rel="modal:open"><button class="more-content"><img width="200px" height="200px" src="img/no-image.jpg"/></button></a>'+
				'</span>'+
				'<span id = "postingContent_div">'+
					'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgNational" src="/img/icon/posting-nationality/nationality-korea.png"/></span>'+
					'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgLocation" src="/img/icon/posting-location/location-seoul.png"/></span>'+
					'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTaste" src="/img/icon/posting-taste/taste-swe.png"/></span>'+
					'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTime" src="/img/icon/posting-classification/time-morning.png"/></span>'+
					'<div id = "postingContent_view">'+postingDatas.content+'</div>'+
				'</span>'+
			'</div>'+
			'<div class="comment-cnt">'+
				'<div class="comment-text-form">'+
					'<input type="text" name="comment" class="comment" />'+
					'<div class="pure-button add-comment-btn">Add</div>'+
				'</div>'+
				'<div class = "comment-list">'+
				
				'</div>'+
			'</div>'+
		'</section>'
		
		//alert(JSON.stringify(commentDatas));
		var	currentCommentDatas = _.filter(commentDatas, function(value){
			//console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
			return value.posting_seq ==  postingDatas.seq;
		});
		var sectionObject = $(sectionElem);
		
		$.each(currentCommentDatas, function(idx, item){
			var liElem = 
			'<li class = "comment-list-sub">'+
				'<span class="user" id="commentView-user">'+item.writer+'</span>'+
				'<span class="regdate view" id="commentView-regdate">'+item.regdate.substr(0, 10)+'</span>'+
			'</li>'+
			'<span class="comment view" id="commentView-content">'+item.content+'</span>'
			
			sectionObject.find('.comment-list').append(liElem);
			
			//console.log(idx);
			
		});
			return sectionObject.get(0).outerHTML;
	}
	
	//별점관리 
	function handleRaty(){
		$('span.raty').raty({
			score: function() {
				return $(this).attr('data-score');
			}
		});

		//List
		$('span.raty-view').raty({
			score: function() {
				return $(this).attr('data-score');
			},
			readOnly: true,
		});
	}
//renderSectionElem->getSectionItem->renderPostingList
	
})