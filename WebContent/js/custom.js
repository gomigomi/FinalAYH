$(function() {

	var postingDatas;	//Posting
	var commentDatas;	//Comment
	var count=0;

	//comment process

	
	getCommentData();

	
	//log-out process
	$('#log_out').click(function(){
		sessionStorage.clear();

		$('.logon').hide();
		$('.logoff').show();

		renderPostingList();
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
					
					$('.logon').show();
					$('.logoff').hide();

					renderPostingList();

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
							
							
							//auto log-in
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
	});

	
	//posting process
	$('#write_post_btn').click(function(){
		if(!window.sessionStorage.getItem('id')){
			alert('login first!');
			return false;
		}

		var content = $('#write').val();

		if(content == ''){
			alert('please write something');
			$('#write').focus();
			return false;
		}

		$.ajax({
			url: 'http://localhost:8080/postPosting?type=1',
			method : 'post',
			dataType: 'json',
			data : {
				content : content,
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
					var avg = 2.5;
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
					parentElem.find('.raty').raty('score', '2.5');
					
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
				console.log("getposting");
				
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
		}else{
			$('.posts').append(getSectionItem(postingDatas[count], true));
			handleRaty();
		}
		count++;
	}
//포스팅삭제 
	$(document).on('click', '.post-delete' , function(){
		var seq=$(this).parent().parent().parent().parent().parent().attr('id');
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
	/*파일 입출력 처리 
     $("#uploadbutton").click(function(){
         var form = $('#postingimg')[0];
         var formData = new FormData(form);
             $.ajax({
                url: '/fileupload',
                processData: false,
                    contentType: false,
                data: formData,
                type: 'POST',
                success: function(result){
                    alert("업로드 성공!!");
                }
            });
         });
	*/
	/**
	 * postingDatas - seq, thumb, writer, regdate, content
	 * isHide - boolean
	 * @desc- render comment elem
	 */
	function getSectionItem(postingDatas, isHide){
		
		var display = isHide ? 'none' : 'block';
		
		var countstr=leadingZeros(count,3);
		
		var sectionElem = 
			'<section class="post" id="'+countstr+'postseq_'+postingDatas.seq+'">'+
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

function getCommentData(){
	$.ajax({
		url : 'http://localhost:8080/getComment',
		method : 'get',
		dataType : 'json',
		success : function(res){
			console.log("getCommentData_custom");
			commentDatas = res.result;
			renderPostingList();
		}
	});
}