<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap" %>

<jsp:useBean id="udao" class="com.hungry.user.UserDao" />
    
<% request.setCharacterEncoding("UTF-8"); %>

<%
	String form_id = request.getParameter("id"); 
	String form_pw = request.getParameter("pw");
%>

<%
	HashMap<String, Object> userHash = new HashMap<String, Object>();
	userHash = udao.loginUser(form_id, form_pw);
	
	
	//¼­ºí¸´ ÇÔ¼ö->ÇØ½¬¸Ê->½ºÆ®¸µ->jsp¼¼¼Ç½ºÅä¸®Áö
	String idHash = (String)userHash.get("id");
	String pwHash = (String)userHash.get("pass");
	String nameHash = (String)userHash.get("name");
	String regdateHash = (String)userHash.get("regdate");
	String thumbHash = (String)userHash.get("thumb");
	
	session.setAttribute("id", idHash);
	session.setAttribute("pass", pwHash);
	session.setAttribute("name", nameHash);
	session.setAttribute("regdate", regdateHash);
	session.setAttribute("thumb", thumbHash);
%>		

<%--jsp ¼¼¼Ç session to js jquery ¼¼¼Ç session --%>
<%
	String id = (String)session.getAttribute("id");
	String pw = (String)session.getAttribute("pw");
	String name = (String)session.getAttribute("name");
	String thumb = (String)session.getAttribute("thumb");
%>

<%
	if(userHash.isEmpty()){
		System.out.println("wrong");
		request.setAttribute("errMsg", "아이디나 비밀번호가 일치하지 않습니다.");
		RequestDispatcher rd = request.getRequestDispatcher("NewFront.jsp");
		rd.forward(request, response);
	}
%>

<!DOCTYPE html>
<html>
<head>


<script type="text/javascript">
	function redirectPage(){
	sessionStorage.setItem("id", "<%=id%>")
	sessionStorage.setItem("pw", "<%=pw%>")
	sessionStorage.setItem("name", "<%=name%>")
	sessionStorage.setItem("thumb", "<%=thumb%>")
	document.location.href= "index.html"
	}

</script>

<script>redirectPage();</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>log-ining...</title>
</head>
<body>

</body>
</html>
