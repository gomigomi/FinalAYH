$(function() {
	console.log("View Ready!");
	
	
	
	
	$('#howAbout, #search, #favorite, #history').hide();
	
	
	

	
	/*collection을 누를 때 */
	$('#collection-button').click(function() {
		if(window.sessionStorage.getItem('id')){
			$('#main-view').hide();
			$('#top').show();
			$('.top_explain').show();			
			$('')
		} else {
			alert("Log-in First!");
		}
	});
	
	/*What about*/
	$('#howAbout-button').click(function(){
		$('#howAbout').show();
		$('#search').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})
	
	
	/*search*/
	$('#search-button').click(function() {
		$('#search').show();
		$('#howAbout').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
	});
	
	$('#search-clear-button').click(function(){
		$('.property').attr('checked', false)
	})
	
	/*favorite*/
	$('#favorite-button').click(function() {
		$('#favorite').show();
		$('#howAbout').hide();
		$('#search').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})
	
	
//	/*history*/
//	$('#history-button').click(function() {
//		$('#history').show();
//		$('#history-posting').show();
//		$('#history-comment').hide();
//		$('#search').hide();
//		$('#favorite').hide();
//		$('.top_explain').hide();
//		
//		$('#history-posting-button').click(function(){
//			$('#history-posting').show();
//			$('#history-comment').hide();
//		})
//		
//		$('#history-comment-button').click(function(){
//			$('#history-comment').show();
//			$('#history-posting').hide();
//		})
//	})
//	
	
	
	
	

	
	/* Timeline을 눌렀을 때 메인페이지 복귀 */
	$('#timeline-button').click(function() {
		$('#main-view').show();
		$('#top').hide();
		$('#search').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
		
	});
	
	/*라겸*/
	
	//
	function getCommentData(){
		$.ajax({
			url : 'http://localhost:8080/getComment',
			method : 'get',
			dataType : 'json',
			success : function(res){
				console.log("getCommentView");
				commentDatas = res.result;			
				renderPopularPostingList();
			}
		});
	}
	getCommentData();

	$('#recent_tab_btn').click(function(){
		$('#recent_post').show();
		$('#popular_post').hide();
	});
	
	$('#popular_tab_btn').click(function(){
		$('#popular_post').show();
		$('#recent_post').hide();
		renderPopularPostingList();
	});
	
	function renderPopularPostingList(){
		$('#popular_post').empty();
		$.ajax({
			url: 'http://localhost:8080/getPosting?type=4',
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				console.log("get populare posting");
				postingPopularDatas = res.result;
				for(var i=0; i<postingPopularDatas.length; i++ ){
					if(window.sessionStorage.getItem('id')==postingPopularDatas[i].writer){
						$('#popular_post').append(getSectionItem(postingPopularDatas[i], false));
						handleRaty();
					}else{
						$('#popular_post').append(getSectionItem(postingPopularDatas[i], true));
						handleRaty();
					}
				}
			}
		})
	}
	
	/**
	 * postingDatas - seq, thumb, writer, regdate, content
	 * isHide - boolean
	 * @desc- render comment elem
	 */
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
			'<button class = "favorite-btn"><div id = "heart-o" class="fa fa-heart-o"></div><div id = "heart" class="fa fa-heart" style = "display : none;"></div></button>'+
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
	
	function leadingZeros(n, digits) {
		  var zero = '';
		  n = n.toString();

		  if (n.length < digits) {
		    for (var i = 0; i < digits - n.length; i++)
		      zero += '0';
		  }
		  return zero + n;
	}
	
	
})
