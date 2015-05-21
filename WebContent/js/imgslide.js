$(function() {
	$(document).on('click','.more-content',function(){
		
		var posting_seq=$(this).closest('section').attr('id');
		posting_seq=posting_seq.substring(8);
		
		var imgDatas;
		var slidecontent;
		
		$.ajax({	//Request Login API
			url: 'http://localhost:8080/getImg?posting_seq='+posting_seq,
			method : 'get',
			dataType : 'json',
			async : false,
			success : function(res){
				imgDatas = res.result;
			}
		});
		if(imgDatas[0]=='no-image.jpg'){
			
		}
		else if(imgDatas.length==1){
			slidecontent=
				'<div id="img-slider" style="display: inline-block">'+
				'<img data-slidr="one" src="img/'+imgDatas[0]+'"/>'+
				'</div>'
			$('#more_content_body').append(slidecontent);
		}else if(imgDatas.length==2){
			slidecontent=
				'<div id="img-slider" style="display: inline-block">'+
				'<img data-slidr="one" src="img/'+imgDatas[0]+'"/>'+
				'<img data-slidr="two" src="img/'+imgDatas[1]+'"/>'+
				'</div>'
			$('#more_content_body').append(slidecontent);
			
			var slider=slidr.create('img-slider',{overflow:true});
			slider.add('h',['one','two','one']);
			slider.start();
		}else if(imgDatas.length==3){
			slidecontent=
				'<div id="img-slider" style="display: inline-block">'+
				'<img data-slidr="one" src="img/'+imgDatas[0]+'"/>'+
				'<img data-slidr="two" src="img/'+imgDatas[1]+'"/>'+
				'<img data-slidr="three" src="img/'+imgDatas[2]+'"/>'+
				'</div>'
			$('#more_content_body').append(slidecontent);
			
			var slider=slidr.create('img-slider',{overflow:true});
			slider.add('h',['one','two','three','one']);
			slider.start();
				
		}
		

	})
	
	$('#more_content').on($.modal.BEFORE_CLOSE, function(event, modal) {
		$('#img-slider').remove();
	});

});
