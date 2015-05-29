package com.hungry.search;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SearchDao {
//	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
//	static final String DB_URL = "jdbc:mysql://54.64.160.105:3306/AYH";
	
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

	public List<HashMap<String, Object>> getSearch(Map<String, String[]> searchParam){
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql_ty ="";
			String sql_ti ="";
			String sql_ta ="";
				
			//모두 선택을 위한 코드. 
			if(searchParam.get("f_type")[0].toString().equals("ty-all")){
				sql_ty = "";
			}else{
				sql_ty = "and type='"+searchParam.get("f_type")[0].toString()+"' ";
			}
			if(searchParam.get("time")[0].toString().equals("ti-all")){
				sql_ti = "";
			}else{
				sql_ti = "and time='"+searchParam.get("time")[0].toString()+"' ";
			}
			if(searchParam.get("taste")[0].toString().equals("ta-all")){
				sql_ta = "";
			}else{
				sql_ta = "and taste='"+searchParam.get("taste")[0].toString()+"' ";
			}
			
			String sql = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2), 0.00) AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
					"WHERE location = '"+searchParam.get("location")[0].toString()+"' "+sql_ty+sql_ti+sql_ta+
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
				item.put("type", rs.getString("type"));
				item.put("taste", rs.getString("taste"));
				item.put("time", rs.getString("time"));
				item.put("location", rs.getString("location"));
				item.put("sc_idx",  rs.getString("sc_idx"));
				
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
	
}//end FirstExample