$(function(){
	$(document).on('click','.add-comment-btn', function(){
		var parentElem = $(this).parents('section');

		
		var section_id=parentElem.attr('id').substring(8);
		console.log(section_id);
		
		var param = {
			posting_seq : section_id,
			writer : window.sessionStorage.getItem('id'),
			content : parentElem.find('input.comment').val()
		};
		
		console.log(param);
		
		$.ajax({
			url: 'http://localhost:8080/postComment',
			method: 'post',
			dataType: 'json',
			data: param,
			success: function(res){
				console.log("postcomment");
				if(res.result=='success'){
					//Append comment to comment list
					var commentItem = 
					'<li class = "comment-list-sub">'+
						'<span class="user" id="commentView-user">'+param.writer+'</span>'+
						'<span class="regdate view" id="commentView-regdate">'+getNowDate()+'</span>'+
					'</li>'+
					'<span class="comment view" id="commentView-content">'+param.content+'</span>'
						parentElem.find('.comment-list').append(commentItem);	
				}else{
					alert('comment add fail');
					parentElem.find('input').focus();
				}
			}
		})
		
	});
})