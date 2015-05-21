<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="EUC-KR"%>
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






<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>log-ining...</title>
</head>
<body>
<script type="text/javascript">

	sessionStorage.setItem("id", "<%=id%>")
	sessionStorage.setItem("pw", "<%=pw%>")
	sessionStorage.setItem("name", "<%=name%>")
	sessionStorage.setItem("thumb", "<%=thumb%>")

</script>

<%
	if(!(userHash.isEmpty())){
		System.out.println("it works");
		response.sendRedirect("index.html");
	}else{
		System.out.println("wrong");
		request.setAttribute("errMsg", "¾ÆÀÌµð ¶Ç´Â ºñ¹Ð¹øÈ£°¡ ÀÏÄ¡ÇÏÁö ¾Ê½À´Ï´Ù.");
		RequestDispatcher rd = request.getRequestDispatcher("NewFront.jsp");
		rd.forward(request, response);
	}
%>

</body>
</html>