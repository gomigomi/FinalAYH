$(function() {
	//console.log(commentDatas);
////	//모든 코멘트를 불러온
//	var commentDatas = getCommentData();
//	function getCommentData(){
//		$.ajax({
//			url : 'http://localhost:8080/getComment',
//			method : 'get',
//			dataType : 'json',
//			success : function(res){
//				console.log("get comment");
//				commentDatas = res.result;
//			}
//		})
//	}

	
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

	getCommentData();
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
	function getSectionItem(postingDatas, isHide){
		
		var display = isHide ? 'none' : 'block';
		
		var sectionElem = 
			'<section class="post" id="postseq_'+postingDatas.seq+'">'+
			'<div class="post-header post-top">'+
			'<span class="post-avatar post-img">'+
			'<img src="/img/common/'+postingDatas.thumb+'.jpg"></img>'+
			'</span>'+
			'<span class="post-meta bacpost-meta">'+
			'<p>'+
			'<span class="post-writer"><a class="post-author" href="#">'+postingDatas.writer+'</a></span>'+
			'<span class="posting-buttons" style="display:'+display+'">'+
			'<a href="#post_edit" rel="modal:open"><button class="post-edit"><i class="fa fa-pencil-square-o"></i></button></a>'+
			'<button class="post-delete"><i class="fa fa-times"></i></button>'+
			'</span>'+ 
			'</p>'+
			'<p>'+
			'<span class="bac-point">Point '+postingDatas.avg+'</span>'+
			'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
			'</p>'+
			'</span>'+
			'</div>'+
			'<div class="post-description bac-content">'+
			'<p>'+postingDatas.content+
			'</p>'+
			'</div>'+
			'<div class="comment-cnt">'+
				'<div class="form">'+
					'<span class="raty" data-score="2.5"></span>'+
					'<div class="pure-button add-comment-btn">Add</div>'+
					'<input type="text" name="comment" class="comment"/>'+
				'</div>'+
				'<ul class="comment-list">'+
				'</ul>'+
			'</div>';
			'</section>';
		
		//alert(JSON.stringify(commentDatas));
		var	currentCommentDatas = _.filter(commentDatas, function(value){
			//console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
			return value.posting_seq ==  postingDatas.seq;
		});
		var sectionObject = $(sectionElem);
		
		$.each(currentCommentDatas, function(idx, item){
			var liElem = 
				'<li>'+
					'<span class="raty-view" data-score="'+item.point+'"></span>'+
					'<span class="user">'+item.writer+'</span>'+
					'<span class="regdate view">'+item.regdate.substr(0,10)+'</span>'+
					'<span class="comment view">'+item.content+'</span>'+
				'</li>';
			
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