package com.hungry.img;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class imgDao {
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
	
	public String postImg(ArrayList<String> list){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();
			
			for(int i=0;i<list.size();i++){
				
				stmt = conn.createStatement();
				String sql= "INSERT INTO image (img, posting_seq) "+
						"VALUES('"+list.get(i)+"',(select max(seq) from posting))";

				stmt.executeUpdate(sql);
			
				stmt.close();
				
			}
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
	
	public ArrayList<String> getImg(String posting_seq) {
		Connection conn = null;
		Statement stmt = null;
		ArrayList<String> result = new ArrayList<String>();
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql ="SELECT * FROM image where posting_seq='"+posting_seq+"'";
			ResultSet rs = stmt.executeQuery(sql);

			while(rs.next()){
				result.add(rs.getString("img"));
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

}