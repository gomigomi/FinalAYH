var favoriteView;
//Favorite View Button
$(document).on('click', '#favorite-button', function() {
	getFavoriteView();	
})


//Posting process in Favorite view
$(document).on('click', '#favoriteView .fa-heart-o', function() {
	var param = {
			id : window.sessionStorage.getItem('id'),
			posting_seq : $(this).closest('section').attr('id').substring(8)
	};

	$.ajax ({
		url : 'http://localhost:8080/postFavorite',
		method : 'post',
		dataType : 'json',
		data : param,
		success : function(res) {
			console.log("BOOKMARK : UPDATED");
			getFavoriteView();
		}
	})
})

//Delete process in Favorite view
$(document).on('click', '#favoriteView .fa-heart', function() {
	var check = confirm("DELETE this from your FAVORITE?\n\nIf you click OK, this will be disappeared immediately.");
	
	if(check) {
		var id = window.sessionStorage.getItem('id');
		var posting_seq = $(this).closest('section').attr('id').substring(8);
		
		$.ajax ({
			url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
			method : 'delete',
			success : function(res) {
				console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
				getFavoriteView();
			}
		})
	} else { return false; }
})



/*Main view*/
//Posting process in Main view  
$(document).on('click', '#mainView_favorite .fa-heart-o', function(e) {
	var param = {
			id : window.sessionStorage.getItem('id'),
			posting_seq : $(this).closest('section').attr('id').substring(8)
	};
	console.log(param.posting_seq);
	
	$.ajax({
		url : 'http://localhost:8080/postFavorite',
		method : 'post',
		dataType : 'json',
		data : param,
		success :  function(res){
			console.log("BOOKMARK : Updated");

			$('section[id$="'+param.posting_seq+'"] .fa-heart').show();
			$('section[id$="'+param.posting_seq+'"] .fa-heart-o').hide();
			

		}
	})
})


//Delete process in Main view
$(document).on('click', '#mainView_favorite .fa-heart', function(){
	var check = confirm('DELETE this from your FAVORITE?');
	
	if(check) {
		var id = window.sessionStorage.getItem('id');
		var posting_seq = $(this).closest('section').attr('id').substring(8);
		
		$.ajax ({
			url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
			method : 'delete',
			success : function(res) {
				console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
				
				$('section[id$="'+posting_seq+'"] .fa-heart-o').show();
				$('section[id$="'+posting_seq+'"] .fa-heart').hide();
			}
		})
	} else { return false; }
})

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}


//Rendering section
/**
 * 하트 문제해결 및 데이터 통신 단
 */
function getFavSectionItem(favoriteView, isHide) {

	var display = isHide ? 'none' : 'block';
	var point = "0";
	
	var currentScoreDatas = _.filter(scoreDatas, function(value) {
		return value.posting_seq == favoriteView.seq
	})
	
	$.each(currentScoreDatas, function(idx, item) {
		point = item.point;
	})
	
	var sectionElem = 
		'<section class="post '+favoriteView.seq+'" id="posting_'+favoriteView.seq+'">'+
		'<scIdx id="'+favoriteView.sc_idx+'"/>'+
		'<div class="post-header post-top">'+
			'<span class="post-avatar post-img"> '+
				'<img src="/img/common/'+favoriteView.thumb+'"/>'+
			'</span>'+ 
			'<span class="post-meta bacpost-meta">'+ 
				'<span class="post-writer">'+ 
					'<a class="post-author" href="#">'+favoriteView.writer+'</a>'+
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
					'<button id="heart" class="fa fa-heart favorite-btn" style="display:block"></button>'+
				'</span>'+
				'<div class = "comment-form">'+
					'<span class="bac-point" id="'+favoriteView.avg+'">Point '+favoriteView.avg+'</span>'+
					'<span class="comment-raty-form">'+
						'<span class="ex">내가 준 점수&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
						'<span class="raty" data-score="'+point+'" style="cursor:pointer;"></span>'+
						'<span class = "pure-button add-commentRaty-btn">평가</span>'+
					'</span>'+
					'<span class="post-regdate">'+favoriteView.regdate+'</span>'+
				'</div>'+
			'</span>'+
		'</div>'+
		'<div class="post-description bac-content">'+
			'<span id = "postingImg_view">'+
			'<a href="#more_content" rel="modal:open"><button class="more-content"><img width="200px" height="200px" src="img/'+favoriteView.img+'"/></button></a>'+
			'</span>'+
			'<span id = "postingContent_div">'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.type+'" class ="type postingCI" src="/img/icon/posting-nationality/nationality-'+favoriteView.type+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.location+'" class ="location postingCI" src="/img/icon/posting-location/location-'+favoriteView.location+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.taste+'" class ="taste postingCI" src="/img/icon/posting-taste/taste-'+favoriteView.taste+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.time+'" class ="time postingCI" src="/img/icon/posting-time/time-'+favoriteView.time+'.png"/></span>'+
				'<div id = "postingContent_view">'+favoriteView.content+'</div>'+
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

	var currentCommentDatas = _.filter(commentDatas, function(value) {
		return value.posting_seq == favoriteView.seq;
	});
	var sectionObject = $(sectionElem);

	$.each(currentCommentDatas, function(idx, item) {
		var liElem = 
				'<li class = "comment-list-sub">'+
					'<span class="user" id="commentView-user">'+item.writer+'</span>'+
					'<span class="regdate view" id="commentView-regdate">'+item.regdate.substr(0, 10)+'</span>'+
				'</li>'+
				'<span class="comment view" id="commentView-content">'+item.content+'</span>'

		sectionObject.find('.comment-list').append(liElem);
	});
	return sectionObject.get(0).outerHTML;
}