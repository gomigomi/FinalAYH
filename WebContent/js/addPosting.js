function getSectionItem(postingDatas, isHide){
	var display = isHide ? 'none' : 'block';

	//favorite 하트를 변경하기위한 부분 
	var favoriteDisplay = "none";
	var favoriteDisplaySub ='block';
	var point = "0";
	var sc_idx = "0";
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
	
	var currentScoreDatas = _.filter(scoreDatas, function(value) {
		return value.posting_seq == postingDatas.seq;
	})
	
	$.each(currentScoreDatas, function(idx, item) {
		point = item.point;
	})
	
	var currentAllScoreDatas = _.filter(allScoreDatas, function(value) {
		return value.posting_seq == postingDatas.seq;
	})
	
	$.each(currentAllScoreDatas, function(idx, item) {
		sc_idx = item.sc_idx;
	})
			
	var sectionElem = 
	'<section class="post '+postingDatas.seq+'" id="posting_'+postingDatas.seq+'">'+
	'<scIdx id="'+sc_idx+'"/>'+
	'<div class="post-header post-top">'+
		'<span class="post-avatar post-img"> '+
			'<img src="/img/common/'+postingDatas.thumb+'"/>'+
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
			'<span id=mainView_favorite>'+
				'<button id="heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button>'+
				'<button id="heart" class="fa fa-heart favorite-btn" style="display:'+favoriteDisplay+'"></button>'+
			'</span>'+
			'<div class = "comment-form">'+
				'<span class="bac-point" id="'+postingDatas.avg+'">Point '+postingDatas.avg+'</span>'+
				'<span class="comment-raty-form">'+
					'<span class="ex">내가 준 점수&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
					'<span class="raty" data-score="'+point+'" style="cursor:pointer;"></span>'+
					'<span class = "pure-button add-commentRaty-btn">평가</span>'+
				'</span>'+
				'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
			'</div>'+
		'</span>'+
	'</div>'+
	'<div class="post-description bac-content">'+
		'<span id = "postingImg_view">'+
		'<a href="#more_content" rel="modal:open"><button class="more-content"><img width="200px" height="200px" src="img/'+postingDatas.img+'"/></button></a>'+
		'</span>'+
		'<span id = "postingContent_div" style="overflow-x:hidden; overflow-y:hidden;">'+
			'<span id = "postingClassifyImg"><img id = "'+postingDatas.type+'" class ="type postingCI" src="/img/icon/posting-nationality/nationality-'+postingDatas.type+'.png"/></span>'+
			'<span id = "postingClassifyImg"><img id = "'+postingDatas.location+'" class ="location postingCI" src="/img/icon/posting-location/location-'+postingDatas.location+'.png"/></span>'+
			'<span id = "postingClassifyImg"><img id = "'+postingDatas.taste+'" class ="taste postingCI" src="/img/icon/posting-taste/taste-'+postingDatas.taste+'.png"/></span>'+
			'<span id = "postingClassifyImg"><img id = "'+postingDatas.time+'" class ="time postingCI" src="/img/icon/posting-time/time-'+postingDatas.time+'.png"/></span>'+
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
	
/* comment와 posting 연결 */
	var currentCommentDatas = _.filter(commentDatas, function(value) {
		// console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
		// alert("comment:"+value.posting_seq+"posting:"+postingDatas.seq);
		return value.posting_seq == postingDatas.seq;
	});
	var sectionObject = $(sectionElem)

	$.each(currentCommentDatas, function(idx, item) {
		//댓글 삭제 버튼 추가
		var id = window.sessionStorage.getItem('id');
		var cmtDisplay = "none";
		if(item.writer==id) {
			cmtDisplay = "inline-block";
		}
		
		var liElem = 
			'<div class="comment-wrap">'+
				'<li class = "comment-list-sub" id="'+item.seq+'">'+
					'<span class="user" id="commentView-user">' + item.writer+'</span>'+
					'<span class="regdate view" id="commentView-regdate">'+item.regdate.substr(0, 10)+
						'<button class="comment-delete" style="display:'+cmtDisplay+'">'+
							'<i class="fa fa-times"></i>'+
						'</button>'+
					'</span>' + '</li>'+
					'<span class="comment view" id="commentView-content">'+ item.content + '</span>'+
			'</div>'
		sectionObject.find('.comment-list').append(liElem);
	});
	return sectionObject.get(0).outerHTML;

}