//	
//var formData=new FormData();
//
//function readURL(input) {
//	$('#img_preview').empty();
//	for (i = 0; i < input.files.length; i++) {
//		if (input.files && input.files[i]) {
//			var reader = new FileReader();
//			reader.onload = function(e) {
//				$('#img_preview').append(
//						'<img width="200px" height="200px" id="blah" src="'
//								+ e.target.result + '" alt="your image" />');
//			}
//		}
//		reader.readAsDataURL(input.files[i]);
//		formData.append(i,input.files[i]);
//	}
//}
//
//$(function(){
//    $("#img_Upload").on('change', function(){
//        readURL(this);
//    });
//    
//     $("#write_post_btn").click(function(){ 
//             $.ajax({
//                url: 'img',
//                processData: false,
//                contentType: false,
//                data: formData,
//                type: 'POST',
//                success: function(result){
//                    alert("업로드 성공!!");
//                    $('#img_preview').empty();
//                    $('#img_upload_frm')[0].reset();
//                    formData=new FormData();
//                }
//            });
//         });
//     
//})