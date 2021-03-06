package com.hungry.score;

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

public class ScoreServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;


	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//READ

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
		String type = request.getParameter("type");
		ScoreDao dao = new ScoreDao();
		try{
			if(type.equals("1")){
				String point_id = request.getParameter("id");
				String posting_seq = request.getParameter("posting_seq");
				JObject.put("result", dao.getScore(point_id, posting_seq));
			} else if(type.equals("2")){
				String point_id = request.getParameter("id");
				JObject.put("result", dao.getBasisScore(point_id));
			} else if (type.equals("3")) {
				JObject.put("result", dao.getAllScore());
			}

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

		ScoreDao dao = new ScoreDao();
		Map<String, String[]> scoreParam = request.getParameterMap();
		String type = request.getParameter("type");

		try{
				if(type.equals("1")){	//User Info API
					JObject.put("result", dao.postScore(scoreParam));
				}else if(type.equals("2")){	//Login API
					JObject.put("result", dao.updateScore(scoreParam));
				}

		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}
}