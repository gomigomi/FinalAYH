$(function() {
	$('.posts').on('click','.more-content',function(){
		$('#img-slider').empty();
		var slidecontent='';
		slidecontent=
			"<img data-slidr='one' src='img/common/1.jpg'/>"+
			"<img data-slidr='two' src='img/common/2.jpg'/>"+
			"<img data-slidr='three' src='img/common/3.jpg'/>"
		$('#img-slider').append(slidecontent);
		
		var slider=slidr.create('img-slider',{overflow:true});
		slider.add('h',['one','two','three','one']);
		slider.start();
	})	
});

//function sliderLoop(slider,num){
//	slider=slidr.create('img-slider', {overflow: true});
//	if(num==1){
//		
//	}else if(num==2){
//		slider.add('h', ['one', 'two','one']);
//	}else if(num==3){slider.add('h', ['one', 'two', 'three','one']);}
//
//	slider.start();
//}