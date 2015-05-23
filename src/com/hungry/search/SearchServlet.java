package com.hungry.search;

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

import com.hungry.search.SearchDao;

public class SearchServlet extends HttpServlet{

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
		Map<String, String[]> postingParam = request.getParameterMap();
		SearchDao dao = new SearchDao();
		
		try{
			JObject.put("result", dao.getSearch(postingParam));
		}
			catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		printout.print(JObject);
		printout.flush();
	}

//	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.setContentType("application/json; charset=UTF-8");//CREATE
//
//		PrintWriter printout = response.getWriter();
//		JSONObject JObject = new JSONObject();
//		String type=request.getParameter("type");
//
//		SearchDao dao = new SearchDao();
//		
//
//		
//		try{
//			if(type.equals("1")){
//				Map<String, String[]> postingParam = request.getParameterMap();
//			
//				JObject.put("result", dao.postSearch(postingParam));
//			}
//		}catch(JSONException e){
//			
//			e.printStackTrace();
//		}
//		printout.print(JObject);
//		printout.flush();
//	}

}