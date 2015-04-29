//bookmark 추가  
$(document).on('click', '.fa-heart-o', function() {
	var param = {
			id : window.sessionStorage.getItem('id'),
			posting_seq : $(this).closest('section').attr('id').substring(11, 13)
	};
	console.log(param.posting_seq);
	$.ajax({
		url : 'http://localhost:8080/postFavorite',
		method : 'post',
		dataType : 'json',
		data : param,
		success :  function(res){
			console.log("BOOKMARK : Updated");
			//attr과 substring이용해 적용 필요  
			$(this).closest('div').hide();
			$(this).closest('button').show();
		}
	})
})


//bookmark 삭제  
$(document).on('click', '.fa-heart', function(){
	var id  = window.sessionStorage.getItem('id');
	var posting_seq = $(this).closest('section').attr('id').substring(11, 13);
	
	$.ajax({
		url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
		method : 'delete',
		success : function(res){
			console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
		}
	})
})



//Rendering section

function getSectionItem(favoriteView, isHide) {

	var display = isHide ? 'none' : 'block';

	var sectionElem = '<section class="post" id="postseq_'
			+ favoriteView.seq
			+ '">'
			+ '<div class="post-header post-top">'
			+ '<span class="post-avatar post-img">'
			+ '<img src="/img/common/'
			+ favoriteView.thumb
			+ '.jpg"></img>'
			+ '</span>'
			+ '<span class="post-meta bacpost-meta">'
			+ '<p>'
			+ '<span class="post-writer"><a class="post-author" href="#">'
			+ favoriteView.writer
			+ '</a></span>'
			+ '<span class="posting-buttons" style="display:'
			+ display
			+ '">'
			+ '<button class = "favorite-btn"><div id = "heart-o" class="fa fa-heart-o"></div><div id = "heart" class="fa fa-heart" style = "display : none;"></div></button>'
			+ '<a href="#post_edit" rel="modal:open"><button class="post-edit"><i class="fa fa-pencil-square-o"></i></button></a>'
			+ '<button class="post-delete"><i class="fa fa-times"></i></button>'
			+ '</span>' + '</p>' + '<p>' + '<span class="bac-point">Point '
			+ favoriteView.avg + '</span>' + '<span class="post-regdate">'
			+ favoriteView.regdate + '</span>' + '</p>' + '</span>' + '</div>'
			+ '<div class="post-description bac-content">' + '<p>'
			+ favoriteView.content + '</p>' + '</div>'
			+ '<div class="comment-cnt">' + '<div class="form">'
			+ '<span class="raty" data-score="2.5"></span>'
			+ '<div class="pure-button add-comment-btn">Add</div>'
			+ '<input type="text" name="comment" class="comment"/>' + '</div>'
			+ '<ul class="comment-list">' + '</ul>' + '</div>';
	'</section>';

	//alert(JSON.stringify(commentDatas));
	var currentCommentDatas = _.filter(commentDatas, function(value) {
		//console.log(JSON.stringify(value) + ' // '+ favoriteView.seq);
		return value.posting_seq == favoriteView.seq;
	});
	var sectionObject = $(sectionElem);

	$.each(currentCommentDatas, function(idx, item) {
		var liElem = '<li>' + '<span class="raty-view" data-score="'
				+ item.point + '"></span>' + '<span class="user">'
				+ item.writer + '</span>' + '<span class="regdate view">'
				+ item.regdate.substr(0, 10) + '</span>'
				+ '<span class="comment view">' + item.content + '</span>'
				+ '</li>';

		sectionObject.find('.comment-list').append(liElem);

		//console.log(idx);

	});
	return sectionObject.get(0).outerHTML;
}

function handleRaty() {
	$('span.raty').raty({
		score : function() {
			return $(this).attr('data-score');
		}
	});

	//List
	$('span.raty-view').raty({
		score : function() {
			return $(this).attr('data-score');
		},
		readOnly : true,
	});
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}
