var formData=new FormData();
var favoriteDatas;
var commentDatas;
var postingDatas;

function readURL(input) {
	$('#img_preview').empty();
	for (i = 0; i < input.files.length; i++) {
		var file=input.files[i].name
		if(file !=""){
			var fileExt=file.substring(file.lastIndexOf(".") +1);
			var reg=/gif|jpg|jpeg|png/i;
			if(reg.test(fileExt)==false){
				alert("첨부파일은 gif, jpg, png로 된 이미지만 가능합니다.");
				 $('#img_upload_frm')[0].reset();
				return;
			}
		}
		if (input.files && input.files[i]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#img_preview').append(
						'<img width="200px" height="200px" id="blah" src="'
								+ e.target.result + '" alt="your image" />');
			}
		}
		reader.readAsDataURL(input.files[i]);
		formData.append(i,input.files[i]);
	}
}


$(function() {
	console.log(commentDatas);
	console.log(favoriteDatas);

	var postingDatas;	
	var count=0;

	renderPostingList();
	
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
	
	//log-out process
	$('#log_out').click(function(){
		sessionStorage.clear();

//		$('.logon').hide();
//		$('.logoff').show();
//
//		renderPostingList();
		location.reload([false]);
	});

	$('#write_post').click(function(){

		if($('#w_checkbox').css('display') == 'none'){
		    $('#w_checkbox').show();
		} else {
		    $('#w_checkbox').hide();
		}
	});
	
	
	//profile edit process
	$('#profile-edit-submit').click(
			function() {
				var id = $('#user_edit_id').val();
				var name = $('#user_edit_name').val();
				var pass = $('#user_edit_pass').val();
				var passconf = $('#user_edit_passconf').val();
				if (!passconf) {
					alert("please fill out password confirm blank");
				} else if (passconf == pass) {
					$.ajax({
						url : 'http://localhost:8080/postUser?type=2&id=' + id + '&pass=' + pass + '&name=' + name,
						method : 'POST',
						dataType : 'json',
						success : function(res) {
							console.log("profile-edit");
							window.sessionStorage.setItem('name', name);
							window.sessionStorage.setItem('pass', pass);
							$('#user_edit_name').val(name);
							$('#user_edit_pass').val(pass);
							$('#user_edit_passconf').val('');

							alert('edit success');
							$.modal.close();
							$('.info').text(id + '('+name+')');
						}
					});
				} else {
					alert('please check your password confirm again');
				}
			});

	
	//user delete process
	$('#user-delete-submit').click(function(){
		var id = $('#user_edit_id').val();
		var pass = $('#user_edit_pass').val();
		var passconf = $('#user_edit_passconf').val();

		if (!passconf) {
			alert("please fill out password confirm blank");
		} else if (passconf == pass) {
			var check=confirm('Are you sure to delete your id? All your postings will be deleted');
			if (check){
				$.ajax({
					url :'http://localhost:8080/deleteUser?&id=' + id,
					method :'DELETE',
					dataType :'json',
					success : function(res) {
						console.log("user-delete");
						
						$('#user_edit_id').val('');
						$('#user_edit_name').val('');
						$('#user_edit_pass').val('');
						$('#user_edit_passconf').val('');

						$.modal.close();

						sessionStorage.clear();

						$('.logoff').show();
						$('.logon').hide();

						renderPostingList();
					}
				});
			}else{return false;}
		} else {
			alert('please check your password confirm again');
		}
	});
	
	
	/**
	 * Login Btn Handler
	 */
	//log-in process
	$('#login-submit').click(function(){
		var id = $('#user_id').val();
		var pass = $('#user_pass').val();

		if(id == '' || pass == ''){
			alert('please write your id or pass');
			return false;
		}

		$.ajax({	//Request Login API
			url: 'http://localhost:8080/getUser?type=2&id='+id+'&pass='+pass,
			method : 'get',
			dataType : 'json',
			success : function(res){
				console.log("login-api");
				if(res.result.id){
					$('#user_id').val('');
					$('#user_pass').val('');
					$.modal.close();
					window.sessionStorage.setItem('id', res.result.id);
					window.sessionStorage.setItem('name',res.result.name);
					window.sessionStorage.setItem('thumb',res.result.thumb);
					window.sessionStorage.setItem('pass',res.result.pass);

					var name = res.result.name;
					var id = res.result.id;
					var pass=res.result.pass;
					var thumb=res.result.thumb;
					
//					$('.logon').show();
//					$('.thumb').show();
//					$('info').show();
//					$('.logoff').hide();
//
//					renderPostingList();
					location.reload([false]);
					$('.thumb').css("background-image", 'url('+'"/img/common/'+thumb+'.jpg"'+')');
					$('.info').text(id + '('+name+')');

					$('#user_edit_id').val(id);
					$('#user_edit_name').val(name);
					$('#user_edit_pass').val(pass);
					//$('.thumb').css('background-image : ', 'url('+_+')') 썸네일 처리
				}else{
					alert('log in Fail')
				}
			},
			error : function(){

			}

		});
	});
	
	
	//sign-in process
	$('#signin-submit').click(function(){
		var id = $('#user_signin_id').val();
		var name = $('#user_signin_name').val();
		var pass = $('#user_signin_pass').val();
		var passconf = $('#user_signin_passconf').val();
		
		var regexp = /[0-9a-z]/; // 예외처리를 위한 변수 선언 : 숫자,영문,특수문자

		if(id == '' || pass == '' || name =='' || passconf =='' ){
			alert('please fill out the all blanks');
			return false;
		}
		else if(pass!=passconf){
			alert('password confirm failed');
			return false;
		} //한글 예외처리 
		else if(id != " " && regexp.test(id) == false ){
			alert("영(소)문자와 숫자만 입력 가능합니다.");
			return false;
		}
			
				
		$.ajax({	//ID 중복 체크
			url: 'http://localhost:8080/getUser?type=3&id='+id,
			method : 'get',
			dataType : 'json',
			success : function(res){
				console.log("id overlap");
				if(res.result==1){
					alert('Sorry. Id is already exist');
					$('#user_signin_id').val('');
					$('#user_signin_id').focus();
					return false;
				}
				else{
					$.ajax({	//Request Signin API
						url: 'http://localhost:8080/postUser?type=1&id='+id+'&pass='+pass+'&name='+name,
						method : 'post',
						dataType : 'json',
						success : function(res){
							console.log("create user");
							
							alert('sign in success!')
							$('#user_signin_id').val('');
							$('#user_signin_name').val('');
							$('#user_signin_pass').val('');
							$('#user_signin_passconf').val('');
							$.modal.close();
							
							window.sessionStorage.setItem('id', id);
							window.sessionStorage.setItem('name', name);
							
							
							$('.logon').show();
							$('.thumb').show()
							$('.info').show();
							$('.logoff').hide();
							
							
						},
						error : function(){

						}

					});
				}
			},
			error : function(){

			}

		});
		//auto log-in
		
	});
	
    $("#img_Upload").on('change', function(){
        readURL(this);
    });
	
	//posting process
	$('#write_post_btn').click(function(){
		if(!window.sessionStorage.getItem('id')){
			alert('login first!');
			return false;
		}

		var location=$("#locationSel option:selected").val();
		var content = $('#write').val();
		
		console.log(f_type, taste, time, content);
		
		if(content==false){
			alert('please write something');
			$('#write').focus();
			return false;
		}else if(location == 'none' || f_type=="" || taste=="" || time==""){
			alert('please fill out the location');
			return false;
		}
		
		
		$.ajax({
			url: 'http://localhost:8080/postPosting?type=1',
			method : 'post',
			dataType: 'json',
			data : {
				f_type: f_type,
				taste : taste,
				time : time,
				content : content,
				location : location,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res){
				console.log("postposting");
				if(res.result == 'success'){
					$('#write').val('');

					//renew posting list
					renderPostingList();

				}else{
					alert('post fail!');
				}
			},
			error : function(){}
		});
		
		$.ajax({
             url: 'http://localhost:8080/postImg',
             method : 'post',
             dataType : 'multipart/form-data',
             processData: false,
             contentType: false,
             data: formData,
             type: 'POST',
             success: function(result){
                 alert("업로드 성공!!");
                 $('#img_preview').empty();
                 $('#img_upload_frm')[0].reset();
                 formData=new FormData();
             }
         });
      });
	
	
	//add comment handler
	$('.posts').on('click','.add-comment-btn', function(){
		var parentElem = $(this).parents('section');
		
		//console.log(parentElem.size());
		
		var section_id=parentElem.attr('id');
		var count_num = parentElem.attr('id').substr(0,3);
		count_num=Number(count_num);
		
		var param = {
			posting_seq : parentElem.attr('id').substring(11),
			writer : window.sessionStorage.getItem('id'),
			content : parentElem.find('input.comment').val(),
			point : parentElem.find('.raty').raty('score')
		};
		
		
		$.ajax({
			url: 'http://localhost:8080/postComment',
			method: 'post',
			dataType: 'json',
			data: param,
			success: function(res){
				console.log("postcomment");
				if(res.result=='success'){
					//Append comment to comment list
					var commentItem = '<li>'+
						'<span class="raty-view" data-score="'+param.point+'"></span>'+
						'<span class="user">'+param.writer+'</span>'+
						'<span class="regdate view">'+getNowDate()+'</span>'+
						'<span class="comment view">'+param.content+'</span>'+
					'</li>';
					parentElem.find('ul.comment-list').append(commentItem);
					handleRaty();
					
					
					//count avg and update posting point
					var avg = 3;
					var sum = 0;
					var currentCommentList = parentElem.find('ul.comment-list > li');
					
					currentCommentList.each(function(idx, item){
						//var currentCommentElem = $(this);
						var currentPoint = $(this).find('.raty-view').raty('score');
						sum = sum + currentPoint;
						
						if(idx == currentCommentList.size()-1){
							avg = (sum/currentCommentList.size());
							parentElem.find('.bac-point').text(avg);
							//console.log('avg : '+avg);
							
						}
					});
					
					
					
					
					parentElem.find('input.comment').val('');
					parentElem.find('.raty').raty('score', '3');
					
				}else{
					alert('comment add fail');
					parentElem.find('input').focus();
				}
			}
		})
	});


	function renderPostingList(){
		$('.posts .post').remove();
		count=0;
		$.ajax({
			url: 'http://localhost:8080/getPosting?type=1',
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				console.log("renderPostingList()get_posting");
				postingDatas = res.result;
				for(var i=0; i<postingDatas.length; i++ ){
					renderSectionElem();
				}
			}
		})
	}
/* 스크롤 내릴때마다 자동 로딩되게 해주는
	var timer = setInterval(function() {scrollOK = true;}, 100);
	var scrollOK = true;
	$(window).bind('scroll',function() {
		if (scrollOK) {
			scrollOK = false;
			if ($(this).scrollTop() + $(this).height() >= ($(document).height() - 100)) {
				console.log('You Hit Bottom!');
				if(postingDatas.length-count<5){
					for(var i=0; i<postingDatas.length-count; i++ ){

						renderSectionElem();
					}
				}else{
					for(var i=0; i<5; i++ ){
						renderSectionElem();
					}
				}
			
			}
		}
	});
	*/
	
	/**
	 * 
	 */

	function renderSectionElem(){
		
		if(window.sessionStorage.getItem('id')==postingDatas[count].writer){
			$('.posts').append(getSectionItem(postingDatas[count], false));
			handleRaty();
			
			} else if (window.sessionStorage.getItem('id') != postingDatas[count].writer){
			$('.posts').append(getSectionItem(postingDatas[count], true));
			handleRaty();
			
		} 
		count++;
	}
//포스팅삭제 
	$(document).on('click', '.post-delete' , function(){
		var seq = $(this).closest('section').attr('id');
		seq= seq.substring(11);
		var check=confirm('Are you sure to delete this post?');
		if (check){
			$.ajax({
				url :'http://localhost:8080/deletePosting?seq=' + seq,
				method :'DELETE',
				dataType :'json',
				success : function(res) {
					console.log("deleteposting");
					renderPostingList();
				}
			});
		}else{return false;}
	});
//포스팅 수정 
	$(document).on('click','.post-edit', function(){
		var seq = $(this).closest('section').attr('id');
		seq= seq.substring(11);

		console.log(seq);
		$(document).on('click', '#post-edit-submit' , function(){
			var content=$('#post_edit_area').val();
			$.ajax({
				url :'http://localhost:8080/postPosting?type=2',
				method :'post',
				dataType :'json',
				data:{
					seq : seq,
					content : content
				},
				success : function(res) {
					console.log("posting-edit");
					$('#post_edit_area').val('');
					$.modal.close();
					renderPostingList();
				}
			});
		});
	});

	/**
	 * postingDatas - seq, thumb, writer, regdate, content
	 * isHide - boolean
	 * @desc- render comment elem
	 */
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

		
		var countstr=leadingZeros(count,3);
		var sectionElem = 
		'<section class="post '+postingDatas.seq+'" id="'+countstr+'posting_'+postingDatas.seq+'">'+
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
				'<p>'+
					'<span class="bac-point">Point '+postingDatas.avg+'</span>'+
					'<span class="comment-raty-form">'+
						'<span class="raty" data-score="3"></span>'+
						'<span class = "pure-button add-commentRaty-btn">별점주기</span>'+
					'</span>'+
					'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
				'</p>'+
			'</span>'+
		'</div>'+
		'<div class="post-description bac-content">'+
			'<span id = "postingImg_view"></span>'+
			'<span id = "postingContent_div">'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgNational" src="/img/icon/posting-nationality/nationality-korea.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgLocation" src="/img/icon/posting-location/location-seoul.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTaste" src="/img/icon/posting-taste/taste-swe.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "postingCI" class = "imgTime" src="/img/icon/posting-classification/time-morning.png"/></span>'+
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
 



/*comment와 posting 연결*/
var	currentCommentDatas = _.filter(commentDatas, function(value){
//console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
//alert("comment:"+value.posting_seq+"posting:"+postingDatas.seq);
return value.posting_seq ==  postingDatas.seq;
});
var sectionObject = $(sectionElem);


$.each(currentCommentDatas, function(idx, item){
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
	
	function getNowDate(){
		// GET CURRENT DATE
		var date = new Date();
		 
		// GET YYYY, MM AND DD FROM THE DATE OBJECT
		var yyyy = date.getFullYear().toString();
		var mm = (date.getMonth()+1).toString();
		var dd  = date.getDate().toString();
		 
		// CONVERT mm AND dd INTO chars
		var mmChars = mm.split('');
		var ddChars = dd.split('');
		 
		// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
		var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
		
		return datestring;
	}
	


});