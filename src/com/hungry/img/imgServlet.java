package com.hungry.img;

import java.io.File;
import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

public class imgServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
         
        String pathname = "/Users/gomi/workspace/FinalAYH/WebContent/img/posting";
        System.out.println(pathname);
        
        File f = new File(pathname);
        if(! f.exists()) //폴더가 존재하지 않으면 폴더 작성
            f.mkdirs();
         
        String encType = "UTF-8";
        int maxFilesize = 5*1024*1024;
 
         MultipartRequest mr = new MultipartRequest
                  
        (req, pathname, maxFilesize, encType, new DefaultFileRenamePolicy());
  // (요청객체, 파일이 쓰여질 경로, 파일의 최대크기, 인코딩방식, 파일명이 이미 있을 경우 '파일명+1')
   
         
    }
	
}
