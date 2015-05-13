var favoriteView;
//Favorite View Button
$(document).on('click', '#favorite-button', function() {
	getFavoriteView();	
})


//Posting process in Favorite view
$(document).on('click', '#favoriteView .fa-heart-o', function() {
	var param = {
			id : window.sessionStorage.getItem('id'),
			posting_seq : $(this).closest('section').attr('id').substring(11)
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
			posting_seq : $(this).closest('section').attr('id').substring(11)
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
//			$(this).closest('div').hide();
//			$(this).closest('button').show();
//			$('.')
			location.reload([false]);
		}
	})
})


//Delete process in Main view
$(document).on('click', '#mainView_favorite .fa-heart', function(){
	var check = confirm('DELETE this from your FAVORITE?');
	
	if(check) {
		var id = window.sessionStorage.getItem('id');
		var posting_seq = $(this).closest('section').attr('id').substring(11);
		
		$.ajax ({
			url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
			method : 'delete',
			success : function(res) {
				console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
				location.reload([false]);
			}
		})
	} else { return false; }
})

//Rendering section
function getSectionItem(favoriteView, isHide) {

	var favoriteDisplay = 'block';
	var favoriteDisplaySub = 'none';
	
	var display = isHide ? 'none' : 'block';

	var sectionElem = '<section class="post" id="postseq_'
			+ favoriteView.seq+ '">'
			+ '<div class="post-header post-top">'
			+ '<span class="post-avatar post-img">'
			+ '<img src="/img/common/'+ favoriteView.thumb+ '.jpg"></img>'
			+ '</span>'
			+ '<span class="post-meta bacpost-meta">'
			+ '<p>'
			+ '<span class="post-writer"><a class="post-author" href="#">'+ favoriteView.writer+ '</a></span>'
			+ '<span class="posting-buttons" style="display:'+ display+ '">'
			+ '<a href="#post_edit" rel="modal:open"><button class="post-edit"><i class="fa fa-pencil-square-o"></i></button></a>'
			+ '<button class="post-delete"><i class="fa fa-times"></i></button>'
			+ '</span>' 
			
			+'<span id="favoriteView">'
			+'<button id = "heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button><button id = "heart" class="fa fa-heart favorite-btn" style = "display :'+favoriteDisplay+'"></button>'
			+'</span>'
			
			+ '</p>' + '<p>' + '<span class="bac-point">Point '+ favoriteView.avg + '</span>' + '<span class="post-regdate">'+ favoriteView.regdate + '</span>' + '</p>' + '</span>' + '</div>'
			+ '<div class="post-description bac-content">' + '<p>'+ favoriteView.content + '</p>' + '</div>'
			+ '<div class="comment-cnt">' + '<div class="form">'
			+ '<span class="raty" data-score="2.5"></span>'
			+ '<div class="pure-button add-comment-btn">Add</div>'
			+ '<input type="text" name="comment" class="comment"/>' + '</div>'
			+ '<ul class="comment-list">' + '</ul>' + '</div>';
	'</section>';

	var currentCommentDatas = _.filter(commentDatas, function(value) {
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
