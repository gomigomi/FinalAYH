var commentDatas;
var favoriteDatas;
var postingDatas;
var scoreDatas;


/*comment를 위한 함수 선언*/
function getCommentData() {
	$.ajax({
		url : 'http://localhost:8080/getComment',
		method : 'get',
		dataType : 'json',
		async:false,
		success : function(res) {
			console.log("getCommentData()_CF");
			commentDatas=res.result;
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



//Score
$(document).on('click', '.add-commentRaty-btn', function() {
	var parentElem = $(this).parents('section');
	var param = {
			posting_seq : parentElem.attr('id').substring(11),
			id : window.sessionStorage.getItem('id'),
			point : parentElem.find('.raty').raty('score')
	};
	
	$.ajax ({
		url : 'http://localhost:8080/getScore?id='+param.id+'&posting_seq='+param.posting_seq,
		method : 'GET',
		dataType : 'JSON',
		success : function(res) {
			if(res.result == "1") {
				var check = confirm("Do you want to re-estimate?")
				if(check) {
					$.ajax({
						url : 'http://localhost:8080/postScore?type=2',
						method : 'POST',
						dataType : 'JSON',
						data : param,
						success : function(res) {
							if(res.result == 'success') {
								alert("Thank you again!");
								return false;
							} else {
								alert("Point has not been changed.");
							}
						}
					})
				} else {
					return false;
				}
				return false;
			} else if (res.result == "0"){
				$.ajax ({
					url : 'http://localhost:8080/postScore?type=1',
					method : 'POST',
					dataType : 'JSON',
					data : param,
					success : function(res) {
						if(res.result =='success') {
							console.log("postScore_CF");
							alert("Thank you!");
							return false;
						} else if(!window.sessionStorage.getItem('id')){
							alert ("Please Log-in first!");
							return false;
						} else {
							alert("Point has not uploaded.");
							return false;
						}	
					} 
				})
			}
		}
	})

})


//function handleRaty(){
//	$('span.raty').raty({
//		half : true,
//		cancle : true,
//		canclePlace : 'left',
//		score: function() {
//			return $(this).attr('data-score');
//		}
//	});
//
//	//List
//	$('span.raty-view').raty({
//		score: function() {
//			//half : true,
//			return $(this).attr('data-score');
//		},
//		readOnly: true,
//	});
//}