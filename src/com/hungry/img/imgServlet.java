package com.hungry.img;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.hungry.user.UserDao;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;


 
//postUser바꿔야함, Dao함수 수정해야함, 반복문 써서 디비에 넣어야

public class imgServlet extends HttpServlet{
    
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
    	
		PrintWriter printout = resp.getWriter();
		JSONObject JObject = new JSONObject(); 	
    	
		imgDao dao=new imgDao();
		
		try{
		        String pathname = "/Users/John/git/FinalAYH/WebContent/img";
		        System.out.println(req);
		        
		        File f = new File(pathname);
		        if(! f.exists()) f.mkdirs(); //폴더가 존재하지 않으면 폴더 작성
		                   
		        String encType = "UTF-8";
		        int maxFilesize = 5*1024*1024;
		 
		         MultipartRequest mr = new MultipartRequest(req, pathname, maxFilesize, encType, new DefaultFileRenamePolicy());
		         // (요청객체, 파일이 쓰여질 경로, 파일의 최대크기, 인코딩방식, 파일명이 이미 있을 경우 '파일명+1')
		 
		         Enumeration files = mr.getFileNames();
		         
		         ArrayList<String> imgname=new ArrayList<String>();
		         //파일 정보가 있다면
		         while (files.hasMoreElements()) {

		             //input태그 속성이 file 인 태그의 name속성값 : 파라미터 이름
		             String name = (String) files.nextElement();
		             //서버에 저장된 파일 이름
		             String filename = mr.getFilesystemName(name);
		             //전송전 원래의 파일이름
		             String original = mr.getOriginalFileName(name);
		             //전송된 파일의 내용타입
		             String type = mr.getContentType(name);
		             //전송된 파일 속성이  file인 태그의 name 속성값을 이용해 파일 객체 생성
		             //용량을 알아내기 위해서 : file.length();
		             File file = mr.getFile(name);
		             System.out.println("파라미터 이름 : " + name + "<br/>");
		             System.out.println("실제 파일 이름 : " + original + "<br/>");
		             System.out.println("저장된 파일 이름 : " + filename + "<br/>");
		             System.out.println("파일 타입 : " + type + "<br/>");
		             
		             imgname.add(filename);

		             if (file != null) {
		            	 System.out.println("크기 : " + file.length());
		            	 System.out.println("<br/>");
		             }
		         }
							
				JObject.put("result", dao.postImg(imgname));	
			
		}catch(JSONException e){	
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();         
    }
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//READ

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();

		imgDao dao = new imgDao();

		try{{	//User Info API
				String posting_seq=request.getParameter("posting_seq");
				
				JObject.put("result", dao.getImg(posting_seq));
			}


		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		printout.print(JObject);
		printout.flush();
	}
}
