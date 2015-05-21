var favoriteView;
//Favorite View Button
$(document).on('click', '#favorite-button', function() {
	getFavoriteView();	
})


//Posting process in Favorite view
//$('#favoritePosting').on('click', '#mainView_favorite .fa-heart-o', function() {
//	var param = {
//			id : window.sessionStorage.getItem('id'),
//			posting_seq : $(this).closest('section').attr('id').substring(8)
//	};
//
//	$.ajax ({
//		url : 'http://localhost:8080/postFavorite',
//		method : 'post',
//		dataType : 'json',
//		data : param,
//		success : function(res) {
//			console.log("BOOKMARK : UPDATED");
//			getFavoriteView();
//		}
//	})
//})

//Delete process in Favorite view
$('#favoritePosting').on('click', '#mainView_favorite .fa-heart', function() {
	var check = confirm("DELETE this from your FAVORITE?\n\nIf you click OK, this will be disappeared immediately.");
	
	if(check) {
		var id = window.sessionStorage.getItem('id');
		var posting_seq = $(this).closest('section').attr('id').substring(8);
		
		$.ajax ({
			url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
			method : 'delete',
			success : function(res) {
				console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
				$((this).closest('section')).remove();
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
//			attr과 substring이용해 적용 필요  
			$('section[id$="'+param.posting_seq+'"] .fa-heart').show();
			$('section[id$="'+param.posting_seq+'"] .fa-heart-o').hide();
			
			//location.reload([false]);
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

