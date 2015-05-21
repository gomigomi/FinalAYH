/**
 * front 페이지 로그인, 회원가입 버튼 핸들러
 */
$(function() {
	$('#left-top').click(function(){
		$('#login-bot').show();
		$('#signin-bot').hide();
	});
	
	$('#right-top').click(function(){
		$('#login-bot').hide();
		$('#signin-bot').show();
	});
});