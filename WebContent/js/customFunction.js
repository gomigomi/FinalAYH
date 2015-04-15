var commentDatas;

function getCommentData() {
	$.ajax({
		url : 'http://localhost:8080/getComment',
		method : 'get',
		dataType : 'json',
		async:false,
		success : function(res) {
			console.log("getCommentData_CF");
			commentDatas=res.result;
		}
	});
}

getCommentData();


/*favorite를 위한 함수 선언*/

var favoriteDatas;

function getFavoriteData(){
	var id = window.sessionStorage.getItem('id');
	$.ajax ({
		url : 'http://localhost:8080/getFavorite?id='+id,
		method : 'get',
		dataType : 'json',
		success : function(res){
			console.log('getFavorite');
			alert('OK');
			favoriteDatas = res.result;
			console.log(favoriteDatas);
			
		}
	})
}


//function postFavorite() {
//	$.()
//}
//
//$(document).on('click','.post-edit', function(){

