<%@ page language="java" contentType="text/html; charset=EUC-KR"
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

	if(!(userHash.isEmpty())){
		System.out.println("it works");
		response.sendRedirect("index.jsp");
	}else{
		System.out.println("wrong");
		request.setAttribute("errMsg", "아이디 또는 비밀번호가 일치하지 않습니다.");
		RequestDispatcher rd = request.getRequestDispatcher("NewFront.jsp");
		rd.forward(request, response);
	}
	
	//서블릿 함수->해쉬맵->스트링->jsp세션스토리지
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

<%--jsp 세션 session to js jquery 세션 session --%>
<%
	String id = (String)session.getAttribute("id");
	String pw = (String)session.getAttribute("pw");
	String name = (String)session.getAttribute("name");
	String thumb = (String)session.getAttribute("thumb");
%>






<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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

</body>
</html>