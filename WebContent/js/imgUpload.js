//아이디 한번 더 체크해주세요 아직 변경 안했습니다.
//전송해야할 데이터가 이미지 외에 더 있습니다. 같이 처리해주세요.


var form = $('form')[0];
var formData = new FormData(form);

function readURL(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

      reader.readAsDataURL(input.files[0]);
    }
}

$(function(){
	
    $("#imgInp").on('change', function(){
        readURL(this);
    });
    
     $("#uploadbutton").click(function(){
         var form = $('form')[0];
         var formData = new FormData(form);
             $.ajax({
                url: 'Uploader',
                processData: false,
                    contentType: false,
                data: formData,
                type: 'POST',
                success: function(result){
                    alert("업로드 성공!!");
                    $('#img_preview').append(formData);
                }
            });
         });
     
})