<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>


<%
	//request scope에 담긴 오류메세지 받아오기  나중에 커스텀태그로 둘수도.

	String errMsg = (String)request.getAttribute("errMsg");
	if(errMsg==null){
		errMsg="";
	}
	String errMsg2 = (String)request.getAttribute("errMsg2");
	if(errMsg2==null){
		errMsg2="";
	}
	String signErr = (String)request.getAttribute("signErr");
	if(signErr==null){
		signErr="0";
	}
%>
<!DOCTYPE html>	
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/json2/20140204/json2.js"></script>
	<link rel="stylesheet"
	href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<script>
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
</script>
<link rel="stylesheet" href="css/front.css">
<title>Front</title>
</head>
<body>
<!-- 배경이미지 깔아두기 -->
<div class="container">
<div class="outer-wrapper">
	<div class="inner-wrapper">
	<div id="front-wrapper">
	
		<div id="top-wrapper">
			<div class="top-menu" id="left-top">
			로그인
			</div>
			<div class="top-menu" id="right-top">
			회원가입
			</div>
		</div>
	
		<div id="bot-wrapper">
			<div id="login-bot">
				<form name="form-login" id="form-login" method="POST" action="login.jsp">
					<div class="login-item"><i class="fa fa-user" style="padding-right:2%;"></i><input class="login-input" type="text" name="id" placeholder="  Your ID" style="margin-left:1%; width:150; height:21; background-color:#eeeeee;border:1 solid red; font-family:굴림; font-size:10pt; color:green" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#eeeeee'"/></div>
					<div class="login-item"><i class="fa fa-key" style="padding-right:2%;"></i><input class="login-input" type="password" name="pw" placeholder="  Password" style="width:150; height:21; background-color:#eeeeee;border:1 solid red; font-family:굴림; font-size:10pt; color:green; margin-top:2%;" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#eeeeee'"/></div>
					<!-- <div class="login-item"><input class="login-input" style="margin-top:10%; width:50%; height:10%;" type="submit" value="OK"></div>-->
					<button type="submit" class='button' style="margin-top:15%;">Button</button> 
				</form>
				<div id="error"><%=errMsg %></div>
			</div>
			<div id="signin-bot">
				<form name="form-sign" id="form-sign" method="POST" action="signin.jsp" enctype="multipart/form-data">
				    <div class="signin-item"><i class="fa fa-user"></i></div><input class="signin-input" type="text" name="id" id="id" placeholder="  Your ID" style="width:150; height:21; background-color:#eeeeee;border:1 solid red; font-family:굴림; font-size:10pt; color:green; margin-top:1%;" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#eeeeee'"/>
				    <div class="signin-item"><i class="fa fa-user"></i></div><input class="signin-input" type="text" name="name" id="name" placeholder="  Your Name" style="width:150; height:21; background-color:#eeeeee;border:1 solid red; font-family:굴림; font-size:10pt; color:green; margin-top:1%;" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#eeeeee'"/>
				    <div class="signin-item"><i class="fa fa-key"></i></div><input class="signin-input" type="password" name="pw" id="pw" placeholder="  Your Password" style="margin-left:2%; width:150; height:21; background-color:#eeeeee;border:1 solid red; font-family:굴림; font-size:10pt; color:green; margin-top:1%;" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#eeeeee'"/>
				    <div class="signin-item"><i class="fa fa-picture-o"></i></div><input class="signin-input" type="file" name="thumbnail" id="thumbnail">
				    <!-- <input type="submit" style="margin-top:3%; width:50%;" value="Submit"> -->
				    <button type="submit" class='button' style="margin-top:3%;">Submit</button>
				</form>
				<div id="error"><%=errMsg2 %></div>
			</div>
		</div>
	
	</div>
	</div>
</div>
</div>
<script>	
if(<%=signErr%>=='1'){
	$('#login-bot').hide();
	$('#signin-bot').show();
}
</script>
</body>
</html>