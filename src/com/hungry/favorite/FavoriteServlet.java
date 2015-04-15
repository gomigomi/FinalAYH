package com.hungry.favorite;

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

//import com.bac.user.UserDao;

public class FavoriteServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//READ

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
//		String type = request.getParameter("type");

		FavoriteDao dao = new FavoriteDao();

		try{
//			if(type.equals("1")){	//User Info API
//				String user_id=request.getParameter("id");
//				
//				JObject.put("result", dao.getUser(user_id));
//			}else if(type.equals("2")){	//Login API
//				
//				String id = request.getParameter("id");
//				String pass = request.getParameter("pass");
//				
//				JObject.put("result", dao.loginUser(id, pass));
//			}else if(type.equals("3")){	//ID중복 API
//				
//				String check_id = request.getParameter("id");
//				
//				JObject.put("result", dao.checkUser(check_id));
//			}
			String bm_id = request.getParameter("id");
			JObject.put("result", dao.getFavorite(bm_id));


		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		printout.print(JObject);
		printout.flush();
	}

	
	//Post service
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//CREATE

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();

		FavoriteDao dao = new FavoriteDao();
//		Map<String, String[]> userParam = request.getParameterMap();

		try{
			//Bookmark controller
				
				String posting_seq = request.getParameter("posting_seq");
				String id = request.getParameter("id");
				
				JObject.put("result", dao.postFavorite(posting_seq, id));

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

		FavoriteDao dao = new FavoriteDao();
		
		String id = request.getParameter("id");
		String posting_seq = request.getParameter("posting_seq");

		
		try{
			JObject.put("result", dao.deleteFavorite(id, posting_seq));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}
}