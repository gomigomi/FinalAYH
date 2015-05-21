function getSectionItem(postingDatas, isHide){
	var display = isHide ? 'none' : 'block';
	
	
	//favorite 하트를 변경하기위한 부분 
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
			'<span id=mainView_favorite>'+
				'<button id="heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button>'+
				'<button id="heart" class="fa fa-heart favorite-btn" style="display:'+favoriteDisplay+'"></button>'+
			'</span>'+
			'<div class = "comment-form">'+
				'<span class="bac-point">Point '+postingDatas.avg+'</span>'+
				'<span class="comment-raty-form">'+
					'<span class="raty" data-score="2.5" style="cursor:pointer;"></span>'+
					'<span class = "pure-button add-commentRaty-btn">별점주기</span>'+
				'</span>'+
				'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
			'</div>'+
		'</span>'+
	'</div>'+
	'<div class="post-description bac-content">'+
		'<span id = "postingImg_view">'+
		'<a href="#more_content" rel="modal:open"><button class="more-content"><img width="200px" height="200px" src="img/'+postingDatas.img+'"/></button></a>'+
		'</span>'+
		'<span id = "postingContent_div">'+
			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgNational" src="/img/icon/posting-nationality/nationality-'+postingDatas.type+'.png"/></span>'+
			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgLocation" src="/img/icon/posting-location/location-'+postingDatas.location+'.png"/></span>'+
			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTaste" src="/img/icon/posting-taste/taste-'+postingDatas.taste+'.png"/></span>'+
			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTime" src="/img/icon/posting-time/time-'+postingDatas.time+'.png"/></span>'+
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
	var sectionObject = $(sectionElem);

	$.each(currentCommentDatas, function(idx, item) {
		var liElem = '<li class = "comment-list-sub">'
				+ '<span class="user" id="commentView-user">' + item.writer
				+ '</span>'
				+ '<span class="regdate view" id="commentView-regdate">'
				+ item.regdate.substr(0, 10) + '</span>' + '</li>'
				+ '<span class="comment view" id="commentView-content">'
				+ item.content + '</span>'

		sectionObject.find('.comment-list').append(liElem);
	});
	return sectionObject.get(0).outerHTML;
}