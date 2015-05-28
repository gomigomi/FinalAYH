var searchDatas;

$(function() {
	var taste="",f_type="",time="";
	//라디오 요소처럼 동작시킬 체크박스 그룹 셀렉터
	$('input[type="checkbox"][name="f_type"]').click(function(){
	    //클릭 이벤트 발생한 요소가 체크 상태인 경우
	    if ($(this).prop('checked')) {
	        //체크박스 그룹의 요소 전체를 체크 해제후 클릭한 요소 체크 상태지정
	        $('input[type="checkbox"][name="f_type"]').prop('checked', false);
	        $(this).prop('checked', true);
	        f_type=this.value;
	    }
	});
	$('input[type="checkbox"][name="taste"]').click(function(){
	    //클릭 이벤트 발생한 요소가 체크 상태인 경우
	    if ($(this).prop('checked')) {
	        //체크박스 그룹의 요소 전체를 체크 해제후 클릭한 요소 체크 상태지정
	        $('input[type="checkbox"][name="taste"]').prop('checked', false);
	        $(this).prop('checked', true);
	        taste=this.value;
	    }
	});
	$('input[type="checkbox"][name="time"]').click(function(){
	    //클릭 이벤트 발생한 요소가 체크 상태인 경우
	    if ($(this).prop('checked')) {
	        //체크박스 그룹의 요소 전체를 체크 해제후 클릭한 요소 체크 상태지정
	        $('input[type="checkbox"][name="time"]').prop('checked', false);
	        $(this).prop('checked', true);
	        time=this.value;
	    }
	});
	
	$(document).on('click', '#search-submit-button', function() {

		var location = $("#location_search option:selected").val();
		console.log(f_type, taste, time, location);
		
		if(location == 'none' || f_type=="" || taste=="" || time==""){
			alert('please fill out the form');
			return false;
		}

		$.ajax({
			url : 'http://localhost:8080/doSearch',
			method : 'GET',
			dataType : 'JSON',
			data : {
				f_type : f_type,
				taste : taste,
				time : time,
				location : location,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res) {
				var id = window.sessionStorage.getItem("id");
				console.log("letSearch");
				searchDatas = res.result;
				
				if(searchDatas == "") {
					$('#searchContent').empty();
					$('#searchContent').append('<div id="nothingElem">검색결과가 없습니다.</div>');	
				}
					
				$('#write').val('');
				$('input[type="checkbox"][name="f_type"]').prop('checked', false);
				$('input[type="checkbox"][name="taste"]').prop('checked', false);
				$('input[type="checkbox"][name="time"]').prop('checked', false);
				$("#location_search > option[value=none]").attr("selected", "ture");
					
				console.log(searchDatas);
				
				for(var i=0; i<searchDatas.length; i++) {
					if( id == searchDatas[i].writer) {
						$('#searchContent').append(getSectionItem(searchDatas[i], false));
						handleRaty();
					} else {
						$('#searchContent').append(getSectionItem(searchDatas[i], true));
						handleRaty();
					}
				}	
			},
			error : function() {
				alert("Error");
			}
		});
	})
})


function getSectionItem(searchDatas, isHide) {

	var favoriteDisplay = 'block';
	var favoriteDisplaySub = 'none';
	
	var display = isHide ? 'none' : 'block';

	var sectionElem = 		
	'<section class="post '+searchDatas.seq+'" id="posting_'+searchDatas.seq+'">'+
		'<div class="post-header post-top">'+
		'<span class="post-avatar post-img"> '+
			'<img src="/img/common/'+searchDatas.thumb+'"/>'+
		'</span>'+ 
		'<span class="post-meta bacpost-meta">'+ 
			'<span class="post-writer">'+ 
				'<a class="post-author" href="#">'+searchDatas.writer+'</a>'+
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
			'<p>'+
				'<span class="bac-point">Point '+searchDatas.avg+'</span>'+
				'<span class="comment-raty-form">'+
					'<span class="raty" data-score="3"></span>'+
					'<span class = "pure-button add-commentRaty-btn">별점주기</span>'+
				'</span>'+
				'<span class="post-regdate">'+searchDatas.regdate+'</span>'+
			'</p>'+
			'</span>'+
		'</div>'+
		'<div class="post-description bac-content">'+
			'<span id = "postingImg_view"></span>'+
			'<span id = "postingContent_div">'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgNational" src="/img/icon/posting-nationality/nationality-'+searchDatas.type+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgLocation" src="/img/icon/posting-location/location-'+location+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTaste" src="/img/icon/posting-taste/taste-'+taste+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTime" src="/img/icon/posting-classification/time-'+time+'.png"/></span>'+
				'<div id = "postingContent_view">'+searchDatas.content+'</div>'+
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
		return value.posting_seq == searchDatas.seq;
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
