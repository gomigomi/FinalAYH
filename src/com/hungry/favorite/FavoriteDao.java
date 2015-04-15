package com.hungry.favorite;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FavoriteDao {
//	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
//	static final String DB_URL = "jdbc:mysql://54.64.160.105:3306/AYH";
	//DB test
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost:3306/AYH";


	static final String USER = "root";
	static final String PASS = "900418";
	
	/**
	 * 커넥션 공동 메소드
	 * @returna
	 * @throws ClassNotFoundException
	 */
	public Connection getConnection() throws ClassNotFoundException{
		Connection dbConn = null;
		
		try{
			Class.forName(JDBC_DRIVER);
			dbConn = DriverManager.getConnection(DB_URL,USER,PASS);
			
		}catch(SQLException e){
			e.printStackTrace();
		}
		return dbConn;
	}
	//type1

	public List<HashMap<String, Object>> getFavoriteView(String id) {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();
		System.out.println("BOOKMARK : user "+id+" is on MainView.");
		
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			String sql = "SELECT A.*, B.thumb, C.posting_seq, D.flag, D.posting_seq AS bm_pos_seq, IFNULL(AVG(C.point), 2.5) AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN comment C ON C.posting_seq = A.seq "+ 
					"JOIN bookmark D ON D.posting_seq = A.seq "+
					"GROUP BY A.seq "+
					"ORDER BY A.seq DESC";

			ResultSet rs = stmt.executeQuery(sql);

			while(rs.next()){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.put("seq", rs.getString("seq"));
				item.put("content", rs.getString("content"));
				item.put("writer", rs.getString("writer"));
				item.put("regdate", rs.getString("regdate"));
				item.put("thumb", rs.getString("thumb"));
				item.put("avg", rs.getString("avg"));
				item.put("flag", rs.getString("flag"));
				item.put("bm_pos_seq", rs.getString("bm_pos_seq"));
				
				result.add(item);
			}

			rs.close();
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}

		return result;
	}
	
	//type2
	public List<HashMap<String, Object>> getFavorite(String id) {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();
		System.out.println("BOOKMARK : user "+id+" has used getFavorite");
		
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			String sql ="SELECT * FROM bookmark where id='"+id+"'";
			ResultSet rs = stmt.executeQuery(sql);

			while(rs.next()){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.put("flag", rs.getString("flag"));
				item.put("posting_seq", rs.getString("posting_seq"));
				item.put("id", rs.getString("id"));
				
				result.add(item);
			}

			rs.close();
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}

		return result;
	}
	
	
	
	public String deleteFavorite(String id, String posting_seq){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";

		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "DELETE from bookmark where id='"+id+"' and posting_seq='"+posting_seq+"'";
			stmt.executeUpdate(sql);

			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
			result = "fail";
		}catch(Exception e){
			e.printStackTrace();
			result = "fail";
		}finally{
			
		}
		System.out.println("BOOKMARK : User "+id+" has deleted "+posting_seq);
		return result;
	}
	
	public String postFavorite(String posting_seq, String id){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql= "INSERT INTO bookmark (flag, id, posting_seq) "+
						"VALUES('1', '"+id+"', '"+posting_seq+"')";

			stmt.executeUpdate(sql);
		
			stmt.close();
			conn.close();

		}catch(SQLException se){
			se.printStackTrace();
			result = "fail";
		}catch(Exception e){
			e.printStackTrace();
			result = "fail";
		}finally{
			
		}
		System.out.println("BOOKMARK : User "+id+ " added posting"+posting_seq+" as favorite.");
		return result;
	}

}