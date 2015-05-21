<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="com.oreilly.servlet.MultipartRequest" %>
<%@ page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.ArrayList, java.util.Arrays" %>
  
    
<jsp:useBean id="udao" class="com.hungry.user.UserDao" />

<%
String root = request.getSession().getServletContext().getRealPath("/");
String savePath = root + "img/common/";
int maxSize = 5*1024*1024;
System.out.println(request);

try{
        MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, "UTF-8", new DefaultFileRenamePolicy());
        
        Map<String, String[]> userParam = new HashMap<String, String[]>();
        
        
        String[] sArrays = new String[1];
       	sArrays[0] = multi.getParameter("id");
       	userParam.put("id",sArrays);
       	String[] sArrays2 = new String[1];
       	sArrays2[0] = multi.getParameter("pw");
       	userParam.put("pass",sArrays2);
       	String[] sArrays3 = new String[1];
       	sArrays3[0] = multi.getParameter("name");
       	userParam.put("name",sArrays3);
       	String[] sArrays4 = new String[1];
       	String thumbName = multi.getFilesystemName("thumbnail");
       	sArrays4[0] = thumbName;
       	userParam.put("thumb",sArrays4);
      	System.out.print(userParam);
      	udao.postUser(userParam);
}finally{
        response.sendRedirect("NewFront.jsp");
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>signin-ing...</title>
</head>
<body>

</body>
</html>