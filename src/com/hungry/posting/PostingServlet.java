package com.hungry.posting;

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

import com.hungry.posting.PostingDao;

//import com.bac.posting.PostingDao;

public class PostingServlet extends HttpServlet{

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
		//String type = request.getParameter("type");
		String type = request.getParameter("type");
		PostingDao dao = new PostingDao();
		
		try{
			if(type.equals("1")){//get all postings
				JObject.put("result", dao.getPosting());
				}
			else if(type.equals("2")){	//get someones posting
				
				String id = request.getParameter("id");
				
				JObject.put("result", dao.getUserPosting(id));
			}
			else if(type.equals("3")){	//get someones posting
				
				String id = request.getParameter("id");
				
				JObject.put("result", dao.getUserCommentPosting(id));
			}
			else if(type.equals("4")){	//get popular posting
				
				JObject.put("result", dao.getPopularPosting());
			} else if(type.equals("5")) { //get Modal posting
				String posting_seq = request.getParameter("posting_seq");
				JObject.put("result", dao.getModalPosting(posting_seq));
			} else if(type.equals("6")) { //get Modal posting
				String id = request.getParameter("id");
				JObject.put("result", dao.getPreferencePosting(id));
			}
		}
			catch (JSONException e) {
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
		String type=request.getParameter("type");

		PostingDao dao = new PostingDao();
		

		
		try{
			if(type.equals("1")){
				Map<String, String[]> postingParam = request.getParameterMap();
			
				JObject.put("result", dao.postPosting(postingParam));
			}else if(type.equals("2")){
				String seq=request.getParameter("seq");
				String content=request.getParameter("content");
				
				JObject.put("result", dao.updatePosting(seq, content));
				
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

		PostingDao dao = new PostingDao();
		
		String seq = request.getParameter("seq");

		
		try{
			JObject.put("result", dao.deletePosting(seq));
		}catch(JSONException e){
			
			e.printStackTrace();
		}
		printout.print(JObject);
		printout.flush();
	}

}