var searchDatas;

$(function() {
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
	
	$(document).on('click', '#search-submit-button', function() {

		var location = $("#location_search option:selected").val();
		console.log(f_type, taste, time, location);
		
		if(location == 'none' || f_type=="" || taste=="" || time==""){
			alert('please fill out the form');
			return false;
		}

		$.ajax({
			url : 'http://localhost:8080/doSearch',
			method : 'GET',
			dataType : 'JSON',
			data : {
				f_type : f_type,
				taste : taste,
				time : time,
				location : location,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res) {
				console.log("letSearch");
				if(searchDatas = res.result){
					$('#write').val('');
					$('input[type="checkbox"][name="f_type"]').prop('checked', false);
					$('input[type="checkbox"][name="taste"]').prop('checked', false);
					$('input[type="checkbox"][name="time"]').prop('checked', false);
					$("#location_search > option[value=none]").attr("selected", "ture");
					
					console.log(searchDatas);
				} else {
					alert ('죄송합니다. 다시 시도해주세요.');
				}
			},
			error : function() {
				alert("Error");
			}
		});
	})
})

