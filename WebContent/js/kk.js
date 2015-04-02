var commentDatas;

function getCommentData() {
	$.ajax({
		url : 'http://localhost:8080/getComment',
		method : 'get',
		dataType : 'json',
		async:false,
		success : function(res) {
			console.log("getCommentData_custom");
			commentDatas=res.result;
		}
	});
}

getCommentData();