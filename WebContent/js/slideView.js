var additionalPosting;

function slideContent(posting_seq){	
	console.log("slideContnet");
	$.ajax({
		url : 'http://localhost:8080/getPosting?type=5&posting_seq='+posting_seq,
		method : 'GET',
		dataType : 'JSON',
		async : false,
		success : function(res) {
			additionalPosting = res.result;
			
			console.log(posting_seq);
			console.log(additionalPosting);
			
			$('#slideContent').empty();
			console.log(additionalPosting[0].content);
			$('#slideContent').append(getModalItem(additionalPosting));
		}
	})
	
}

function getModalItem(additionalPosting){
	
	//favorite 하트를 변경하기위한 부분 
	var favoriteDisplay = "none";
	var favoriteDisplaySub ='block';
	
	/*favorite와 posting 연결*/
	var currentFavoriteDatas = _.filter(favoriteDatas, function(value){
//			alert("flag"+value.posting_seq+"posting"+additionalPosting.seq);
		return value.posting_seq == additionalPosting.seq;
	});
			
	$.each(currentFavoriteDatas, function(idx, item){
		if (item.flag == "1") {
			favoriteDisplay = "block";
			favoriteDisplaySub = "none";
		}
	});

	var sectionElem = 
	'<section id = "slideSection" class="post '+additionalPosting[0].seq+'" id="posting_'+additionalPosting[0].seq+'">'+
	'<span id = "slidePoint">'+
		'<span class="bac-point">Point '+additionalPosting[0].avg+'</span>'+
	'</span>'+
	'<span id = "slideIcon">'+
		'<span id = "postingClassifyImg"><img class = "imgNational postingCI" src="/img/icon/posting-nationality/nationality-'+additionalPosting[0].type+'.png"/></span>'+
		'<span id = "postingClassifyImg"><img class = "imgLocation postingCI" src="/img/icon/posting-location/location-'+additionalPosting[0].location+'.png"/></span>'+
		'<span id = "postingClassifyImg"><img class = "imgTaste postingCI" src="/img/icon/posting-taste/taste-'+additionalPosting[0].taste+'.png"/></span>'+
		'<span id = "postingClassifyImg"><img class = "imgTime postingCI" src="/img/icon/posting-time/time-'+additionalPosting[0].time+'.png"/></span>'+
	'<span>'+
	'<div id = "slideContentModal">'+
		'<h2>'+additionalPosting[0].content+'</h2>'+
	'</div>'+
	

'</section>'

	var sectionObject = $(sectionElem);

	
	return sectionObject.get(0).outerHTML;
	additionalPosting = null;
}