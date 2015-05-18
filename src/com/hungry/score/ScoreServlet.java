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

//import com.bac.user.UserDao;

public class ScoreServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;


	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");//READ

		PrintWriter printout = response.getWriter();
		JSONObject JObject = new JSONObject();
		String type = request.getParameter("type");

		ScoreDao dao = new ScoreDao();
		try{
			//type1 = 일반 포스팅 화면을 위한 join
			if(type.equals("1")) {
				String bm_id = request.getParameter("id");
				JObject.put("result", dao.getScoreView(bm_id));
			} //type2 = favorite view에서만 사용 
			  else if(type.equals("2")) {  
				String bm_id = request.getParameter("id");
				JObject.put("result", dao.getScore(bm_id));
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
//		Map<String, String[]> userParam = request.getParameterMap();

		try{
			//Bookmark controller
				
				String posting_seq = request.getParameter("posting_seq");
				String id = request.getParameter("id");
				
				JObject.put("result", dao.postScore(posting_seq, id));

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

		ScoreDao dao = new ScoreDao();
		
		String id = request.getParameter("id");
		String posting_seq = request.getParameter("posting_seq");

		
		try{
			JObject.put("result", dao.deleteScore(id, posting_seq));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}
}