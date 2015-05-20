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

		ScoreDao dao = new ScoreDao();
		try{
			String point_id = request.getParameter("id");
			String posting_seq = request.getParameter("posting_seq");
			JObject.put("result",  dao.getScore(point_id, posting_seq));

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

		try{
				JObject.put("result", dao.postScore(scoreParam));

		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

	
	public void doUpdate(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");
		
		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
		
		ScoreDao dao = new ScoreDao();
		Map<String, String[]> scoreParam = request.getParameterMap();
		
		try {
			JObject.put("result", dao.updateScore(scoreParam));
		} catch(JSONException e) {
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}
}