var commentDatas;
var favoriteDatas;


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
	})
}

