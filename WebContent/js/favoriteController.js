
//bookmark 추가  
$(document).on('click', '.fa-heart-o', function() {
	var param = {
			id : window.sessionStorage.getItem('id'),
			posting_seq : $(this).closest('section').attr('id').substring(11, 13)
	};
	
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