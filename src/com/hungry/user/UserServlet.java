package com.hungry.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

//import com.bac.user.UserDao;

public class UserServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	/**
	 * Select 쿼리를 위한 Ajax GET 핸들러
	 * type=1 : all
	 * type=2 : login
	 * login시 결과값은 success or fail
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//READ

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
		String type = request.getParameter("type");

		UserDao dao = new UserDao();

		try{
			if(type.equals("1")){	//User Info API
				String user_id=request.getParameter("id");
				
				JObject.put("result", dao.getUser(user_id));
			}else if(type.equals("2")){	//Login API
				
				String id = request.getParameter("id");
				String pass = request.getParameter("pass");
				
				JObject.put("result", dao.loginUser(id, pass));
			}else if(type.equals("3")){	//ID중복 API
				
				String check_id = request.getParameter("id");
				
				JObject.put("result", dao.checkUser(check_id));
			}


		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		printout.print(JObject);
		printout.flush();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//CREATE

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
		String type = request.getParameter("type");

		UserDao dao = new UserDao();
//		Map<String, String[]> userParam = request.getParameterMap();

		try{
			if(type.equals("1")){	//Sign in API
				Map<String, String[]> userParam = request.getParameterMap();				
				JObject.put("result", dao.postUser(userParam));
				
			}else if(type.equals("2")){	//Update API

				String savePath = "/Users/gomi/FinalAYH/WebContent/img/common";
				int maxSize = 5*1024*1024;

				MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, "UTF-8", new DefaultFileRenamePolicy());
				
				Map<String, String> userUpdateParam = new HashMap<String, String>();
				
				String thumbName=multi.getFilesystemName("thumb");
				
		       	userUpdateParam.put("id",multi.getParameter("id").toString());
		       	userUpdateParam.put("pass",multi.getParameter("pass").toString());
		       	userUpdateParam.put("name",multi.getParameter("name").toString());
		       	userUpdateParam.put("thumb",thumbName);
		       	
		      	System.out.print(userUpdateParam);
		      	
				JObject.put("result", dao.updateUser(userUpdateParam));
			}


		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//DELETE

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();

		UserDao dao = new UserDao();
		
		String userId = request.getParameter("id");

		
		try{
			JObject.put("result", dao.deleteUser(userId));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}
}