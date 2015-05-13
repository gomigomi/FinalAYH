var commentDatas;
var favoriteDatas;
var postingDatas;


/*comment를 위한 함수 선언*/
function getCommentData() {
	$.ajax({
		url : 'http://localhost:8080/getComment?writer="'+id+'"',
		method : 'get',
		dataType : 'json',
		async:false,
		success : function(res) {
			console.log("getCommentData()_CF");
			commentDatas=res.result;
			console.log(commentDatas);
		}
	});
}
getCommentData();


/*favorite를 위한 함수 선언*/
function getFavoriteData(){
	var id = window.sessionStorage.getItem('id');
	$.ajax ({
		url : 'http://localhost:8080/getFavorite?id='+id+'&type=2',
		method : 'get',
		dataType : 'json',
		async : false,
		success : function(res){
			console.log('getFavoriteData()_CF');
			favoriteDatas = res.result;	
		}
	})
}
getFavoriteData();

function getFavoriteView() {
	$('#favoritePosting').empty();
	var id = window.sessionStorage.getItem('id');
	$.ajax ({
		url : 'http://localhost:8080/getFavorite?id='+id+'&type=1',
		method : 'get',
		dataType : 'json',
		async : false,
		success : function(res) {
			console.log('getFavoriteView');
			favoriteView = res.result;
			console.log(favoriteView);
			for(var i=0; i<favoriteView.length; i++) {
				if( id == favoriteView[i].writer) {
					$('#favoritePosting').append(getSectionItem(favoriteView[i], false));
					handleRaty();
				} else {
					$('#favoritePosting').append(getSectionItem(favoriteView[i], true));
					handleRaty();
				}
			}
		}
	});
}





/*Posting*/
//
//function renderPostingList(){
//	$('.posts .post').remove();
//	count=0;
//	$.ajax({
//		url: 'http://localhost:8080/getPosting?type=1',
//		method: 'get',
//		dataType: 'json',
//		async : false,
//		success : function(res){
//			console.log("renderPostingList()get_posting");
//			postingDatas = res.result;
//			for(var i=0; i<postingDatas.length; i++ ){
//				renderSectionElem();
//			}
//		}
//	})
//}
//
//function renderSectionElem(){
//	
//	if(window.sessionStorage.getItem('id')==postingDatas[count].writer){
//		$('.posts').append(getSectionItem(postingDatas[count], false));
//		handleRaty();
//		
//		} else if (window.sessionStorage.getItem('id') != postingDatas[count].writer){
//		$('.posts').append(getSectionItem(postingDatas[count], true));
//		handleRaty();
//		
//	} 
//	count++;
//}
//
//
//function getSectionItem(postingDatas, isHide){
//	var display = isHide ? 'none' : 'block';
//	
//	
//	//favorite 하트를 변경하기위한 부분 
//	var favoriteDisplay = "none";
//	var favoriteDisplaySub ='block';
//	
//	/*favorite와 posting 연결*/
//	var currentFavoriteDatas = _.filter(favoriteDatas, function(value){
////		alert("flag"+value.posting_seq+"posting"+postingDatas.seq);
//		return value.posting_seq == postingDatas.seq;
//	});
//			
//	$.each(currentFavoriteDatas, function(idx, item){
//		if (item.flag == "1") {
//			favoriteDisplay = "block";
//			favoriteDisplaySub = "none";
//		}
//	});
//
//	
//	var countstr=leadingZeros(count,3);
//	
//	var sectionElem = 
//		'<section class="post" id="'+countstr+'postseq_'+postingDatas.seq+'">'+
//		'<div class="post-header post-top">'+
//		'<span class="post-avatar post-img">'+
//		'<img src="/img/common/'+postingDatas.thumb+'.jpg"></img>'+
//		'</span>'+
//		'<span class="post-meta bacpost-meta">'+
//		'<p>'+	
//		'<span class="post-writer"><a class="post-author" href="#">'+postingDatas.writer+'</a></span>'+
//		'<span class="posting-buttons" style="display:'+display+'">'+
//		'<a href="#post_edit" rel="modal:open"><button class="post-edit"><i class="fa fa-pencil-square-o"></i></button></a>'+
//		'<button class="post-delete"><i class="fa fa-times"></i></button>'+
//		
//		'</span>'+ 
//		'<span id = mainView_favorite>'+
//		'<button id = "heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button><button id = "heart" class="fa fa-heart favorite-btn" style = "display :'+favoriteDisplay+'"></button>'+
//		'</span>'+
//		
//		'</p>'+
//		'<p>'+
//		'<span class="bac-point">Point '+postingDatas.avg+'</span>'+
//		'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
//		'</p>'+
//		'</span>'+
//		'</div>'+
//		'<div class="post-description bac-content">'+
//		'<p>'+postingDatas.content+
//		'</p>'+
//		'</div>'+
//		'<div class="comment-cnt">'+
//			'<div class="form">'+
//				'<span class="raty" data-score="2.5"></span>'+
//				'<div class="pure-button add-comment-btn">Add</div>'+
//				'<input type="text" name="comment" class="comment"/>'+
//			'</div>'+
//			'<ul class="comment-list">'+
//			'</ul>'+
//		'</div>';
//		'</section>';
//	
//	//alert(JSON.stringify(commentDatas));
//
//
//	
//	/*comment와 posting 연결*/
//	var	currentCommentDatas = _.filter(commentDatas, function(value){
//
//		return value.posting_seq ==  postingDatas.seq;
//	});
//	var sectionObject = $(sectionElem);
//
//	
//	$.each(currentCommentDatas, function(idx, item){
//		var liElem = 
//			'<li>'+
//				'<span class="raty-view" data-score="'+item.point+'"></span>'+
//				'<span class="user">'+item.writer+'</span>'+
//				'<span class="regdate view">'+item.regdate.substr(0,10)+'</span>'+
//				'<span class="comment view">'+item.content+'</span>'+
//			'</li>';
//		
//		sectionObject.find('.comment-list').append(liElem);
//		
//		//console.log(idx);
//		
//	});
//		return sectionObject.get(0).outerHTML;
//}
//
//function handleRaty(){
//	$('span.raty').raty({
//		score: function() {
//			return $(this).attr('data-score');
//		}
//	});
//
//	//List
//	$('span.raty-view').raty({
//		score: function() {
//			return $(this).attr('data-score');
//		},
//		readOnly: true,
//	});
//}
//
//function leadingZeros(n, digits) {
//	  var zero = '';
//	  n = n.toString();
//
//	  if (n.length < digits) {
//	    for (var i = 0; i < digits - n.length; i++)
//	      zero += '0';
//	  }
//	  return zero + n;
//}
//
//function getNowDate(){
//	// GET CURRENT DATE
//	var date = new Date();
//	 
//	// GET YYYY, MM AND DD FROM THE DATE OBJECT
//	var yyyy = date.getFullYear().toString();
//	var mm = (date.getMonth()+1).toString();
//	var dd  = date.getDate().toString();
//	 
//	// CONVERT mm AND dd INTO chars
//	var mmChars = mm.split('');
//	var ddChars = dd.split('');
//	 
//	// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
//	var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
//	
//	return datestring;
//}