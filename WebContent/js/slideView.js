var additionalPosting;

function slideContent(posting_seq){	
	console.log("slideContnet");
	$.ajax({
		url : 'http://localhost:8080/getPosting?type=5&posting_seq='+posting_seq,
		method : 'GET',
		dataType : 'JSON',
		async : false,
		success : function(res) {
			additionalPosting = res.result;
			console.log(posting_seq);
			console.log(additionalPosting);
			$('#slideContent').empty();
			console.log(additionalPosting[0].content);
			$('#slideContent').append(getModalItem(additionalPosting));
		}
	})
	
}

function getModalItem(additionalPosting){
	
	//favorite 하트를 변경하기위한 부분 
	var favoriteDisplay = "none";
	var favoriteDisplaySub ='block';
	
	/*favorite와 posting 연결*/
	var currentFavoriteDatas = _.filter(favoriteDatas, function(value){
//			alert("flag"+value.posting_seq+"posting"+additionalPosting.seq);
		return value.posting_seq == additionalPosting.seq;
	});
			
	$.each(currentFavoriteDatas, function(idx, item){
		if (item.flag == "1") {
			favoriteDisplay = "block";
			favoriteDisplaySub = "none";
		}
	});

	var sectionElem = 
	'<section class="post '+additionalPosting[0].seq+'" id="posting_'+additionalPosting[0].seq+'">'+
	'<h1>'+additionalPosting[0].content+'</h1>'+
//	'<div class="post-header post-top">'+
//		'<span class="post-avatar post-img"> '+
//			'<img src="/img/common/'+additionalPosting.thumb+'"/>'+
//		'</span>'+ 
//		'<span class="post-meta bacpost-meta">'+ 
//			'<span class="post-writer">'+ 
//				'<a class="post-author" href="#">'+additionalPosting.writer+'</a>'+
//			'</span>'+ 
////			'<span class="posting-buttons" style="display:'+display+'"> '+
////				'<a href="#post_edit" rel="modal:open">'+
////					'<button class="post-edit">'+
////						'<i class="fa fa-pencil-square-o"></i>'+
////					'</button>'+
////				'</a>'+
////				'<button class="post-delete">'+
////					'<i class="fa fa-times"></i>'+
////				'</button>'+
////			'</span>'+
//			'<span id=mainView_favorite>'+
//				'<button id="heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button>'+
//				'<button id="heart" class="fa fa-heart favorite-btn" style="display:'+favoriteDisplay+'"></button>'+
//			'</span>'+
//			'<div class = "comment-form">'+
//				'<span class="bac-point">Point '+additionalPosting.avg+'</span>'+
//				'<span class="comment-raty-form">'+
//					'<span class="raty" data-score="2.5" style="cursor:pointer;"></span>'+
//					'<span class = "pure-button add-commentRaty-btn">별점주기</span>'+
//				'</span>'+
//				'<span class="post-regdate">'+additionalPosting.regdate+'</span>'+
//			'</div>'+
//		'</span>'+
//	'</div>'+
//	'<div class="post-description bac-content">'+
//		'<span id = "postingContent_div">'+
//			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgNational" src="/img/icon/posting-nationality/nationality-'+additionalPosting.type+'.png"/></span>'+
//			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgLocation" src="/img/icon/posting-location/location-'+additionalPosting.location+'.png"/></span>'+
//			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTaste" src="/img/icon/posting-taste/taste-'+additionalPosting.taste+'.png"/></span>'+
//			'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTime" src="/img/icon/posting-time/time-'+additionalPosting.time+'.png"/></span>'+
//			'<div id = "postingContent_view">'+additionalPosting.content+'</div>'+
//		'</span>'+
//	'</div>'+
//	'<div class="comment-cnt">'+
//		'<div class="comment-text-form">'+
//			'<input type="text" name="comment" class="comment" />'+
//			'<div class="pure-button add-comment-btn">Add</div>'+
//		'</div>'+
//		'<div class = "comment-list">'+
//		
//		'</div>'+
//	'</div>'+
'</section>'

///* comment와 posting 연결 */
//	var currentCommentDatas = _.filter(commentDatas, function(value) {
//		// console.log(JSON.stringify(value) + ' // '+ additionalPosting.seq);
//		// alert("comment:"+value.posting_seq+"posting:"+additionalPosting.seq);
//		return value.posting_seq == additionalPosting.seq;
//	});
	var sectionObject = $(sectionElem);


	return sectionObject.get(0).outerHTML;
}