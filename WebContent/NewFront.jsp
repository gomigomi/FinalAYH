<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>

<%
	//request scope에 담긴 오류메세지 받아오기  나중에 커스텀태그로 둘수도.
	String errMsg = (String)request.getAttribute("errMsg");
	if(errMsg==null){
		errMsg="";
	}
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/json2/20140204/json2.js"></script>
<script src="js/frontHandler.js"></script>
<link rel="stylesheet" href="css/front.css">
<title>Front</title>
</head>
<body style="background:rgb(0, 0, 0)">
<!-- 배경이미지 깔아두기 -->

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
				<div class="login-item"><input type="text" name="id" value="write the ID"/></div>
				<div class="login-item"><input type="password" name="pw" value=""/></div>
				<div class="login-item"><input type="submit" value="OK"></div>
			</form>
			<div id="error"><%=errMsg %></div>
		</div>
		<div id="signin-bot">
			<form name="form-sign" id="form-sign" method="POST" action="signin.jsp" enctype="multipart/form-data">
			    <div class="signin-item">ID       <input type="text" name="id" id="id"></div>
			    <div class="signin-item">name     <input type="text" name="name" id="name"></div>
			    <div class="signin-item">password <input type="password" name="pw" id="pw"></div>
			    <div class="signin-item">thumbnail<input type="file" name="thumbnail" id="thumbnail"></div>
			    <input type="submit" value="전송">
			</form>
		</div>
	</div>

</div>

</body>
</html>