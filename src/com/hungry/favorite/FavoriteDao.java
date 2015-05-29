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
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	static final String DB_URL = "jdbc:mysql://localhost:3306/AYH";


	static final String USER = "root";
	static final String PASS = "900418";
	
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
		
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			String sql = "SELECT A.*, B.thumb, IFNULL(E.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2), 0.00) AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN image E ON E.posting_seq = A.seq "+
					"LEFT OUTER JOIN bookmark D ON D.posting_seq = A.seq "+
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
					"WHERE D.id = '"+id+"'"+
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
				item.put("img", rs.getString("img"));
				item.put("taste", rs.getString("taste"));
				item.put("time", rs.getString("time"));
				item.put("type", rs.getString("type"));
				item.put("location", rs.getString("location"));
				item.put("sc_idx", rs.getString("sc_idx"));
//				item.put("flag",  rs.getString("flag"));
				
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
		
		return result;
	}

}