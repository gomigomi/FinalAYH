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

$(document).on('click', '.comment-delete', function() {
	var seq = $(this).closest('li').attr('id');
	
	$.ajax({
		url : 'http://localhost:8080/deleteComment?seq='+seq,
		method : 'DELETE',
		async : false,
		dataType : 'JSON',
		success : function(res) {		
			$('li[id$="'+seq+'"]').closest('div').remove();
		},
		error : function() {
			alert("Please Try Again.");
		}
	})
})


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

			if (favoriteView == "") {
				var  nothingElem = 
					$('#favoritePosting').empty();
					$('#favoritePosting').append('<div id="nothingElem">검색결과가 없습니다.</div>');
			}
			
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
			posting_seq : parentElem.attr('id').substring(8),
			id : window.sessionStorage.getItem('id'),
			point : parentElem.find('.raty').raty('score')
	};
	
	$.ajax ({
		url : 'http://localhost:8080/getScore?type=1&id='+param.id+'&posting_seq='+param.posting_seq,
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
								alert("감사합니다!!");
								
								//점수화면 동적 제어.
								var myPoint =Number(parentElem.find('.raty').attr('data-score'));
								var currentPoint = Number(param.point);
								var pre_idx = Number(parentElem.find('scIdx').attr('id'));
								var sc_idx = Number(parentElem.find('scIdx').attr('id'));
								if(sc_idx == 0) {
									sc_idx+=1;
								}
								
								var basePoint = Number(parentElem.find('.bac-point').attr('id'));
								var newAvg = (basePoint*pre_idx+currentPoint-myPoint)/(sc_idx);
								
								//소수점 두 자리로 맞추기 위한 코드.
								//방법 1.
//								var zeroCounter = 0;
//								zeroCounter = newAvg.indexOf(".");
//
//								if(zeroCounter == -1) {
//									newAvg = String(newAvg+'.00');
//								}		
								//방법 2.
//								newAvg = newAvg*1.01;
//								newAvg = String(newAvg);
//								parseFloat(newAvg, 2);
//								newAvg.toFixed(2)
								//방법 3.
//								Math.round(newAvg*100)/1;
								//방법 4. 유레카!!
								var printNum = newAvg.toFixed(2);

								parentElem.find('.bac-point').empty();
								parentElem.find('.bac-point').append('Point '+printNum);
								
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

							alert("감사합니다!\n점수는 재평가가 가능합니다.");
							
							//점수화면 동적 제어.
							var myPoint =Number(parentElem.find('.raty').attr('data-score'));
							var currentPoint = Number(param.point);
							var pre_idx = Number(parentElem.find('scIdx').attr('id'));
							var sc_idx = Number(parentElem.find('scIdx').attr('id'));
							if(sc_idx == 0) {
								sc_idx+=1;
							}
							
							var basePoint = Number(parentElem.find('.bac-point').attr('id'));
							var newAvg = (basePoint*pre_idx+currentPoint-myPoint)/(sc_idx);
							
							//소수점 두 자리로 맞추기 위한 코드.
							//방법 1.
//							var zeroCounter = 0;
//							zeroCounter = newAvg.indexOf(".");
//
//							if(zeroCounter == -1) {
//								newAvg = String(newAvg+'.00');
//							}		
							//방법 2.
//							newAvg = newAvg*1.01;
//							newAvg = String(newAvg);
//							parseFloat(newAvg, 2);
//							newAvg.toFixed(2)
							//방법 3.
//							Math.round(newAvg*100)/1;
							//방법 4. 유레카!!
							var printNum = newAvg.toFixed(2);

							parentElem.find('.bac-point').empty();
							parentElem.find('.bac-point').append('Point '+printNum);
							
							return false;
							
//							console.log("내가 준 점수 "+currentPoint);
//							console.log("내가 줬던 점수 "+myPoint);
//							console.log("기존 평균 "+basePoint);
//							console.log("인덱스 "+sc_idx);
//							var testAvg = ();/
//							console.log("평균 "+current)
							
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

function getBasisScore() {
	var parentElem = $(this).parents('section');
	var id = window.sessionStorage.getItem("id");
	$.ajax({
		url : 'http://localhost:8080/getScore?type=2&id='+id,
		method : 'GET',
		dataType : 'JSON',
		async : false,
		success : function(res) {
			scoreDatas = res.result;
		}
	})
}
getBasisScore();