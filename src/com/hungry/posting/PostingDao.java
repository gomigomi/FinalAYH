package com.hungry.posting;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostingDao {
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

	public List<HashMap<String, Object>> getPosting() {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img,  count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2), '평가안됨') AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
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
				item.put("sc_idx", rs.getString("sc_idx"));
				
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
	//writer=id
	public List<HashMap<String, Object>> getUserPosting(String id) {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2), '평가안됨') AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
					"WHERE A.writer = '"+id+"'"+
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
				item.put("type",  rs.getString("type"));
				item.put("taste", rs.getString("taste"));
				item.put("time",  rs.getString("time"));
				item.put("location", rs.getString("location"));
				item.put("sc_idx", rs.getString("sc_idx"));
				
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
	public List<HashMap<String, Object>> getUserCommentPosting(String id) {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql = "SELECT A.*, B.thumb, IFNULL(D.img,'no-image.jpg') AS img,  count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2), '평가안됨') AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN comment C ON C.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN image D ON D.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
					"WHERE C.writer = '"+id+"'"+
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
				item.put("type", rs.getString("type"));
				item.put("location", rs.getString("location"));
				item.put("time", rs.getString("time"));
				item.put("sc_idx", rs.getString("sc_idx"));
				
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
	
	public List<HashMap<String, Object>> getPopularPosting() {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2), '평가안됨') AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
					"GROUP BY A.seq "+
					"ORDER BY avg DESC";
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
				item.put("location", rs.getString("location"));
				item.put("time", rs.getString("time"));
				item.put("sc_idx", rs.getString("sc_idx"));
				
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
	
	public String postPosting(Map<String, String[]> postingParam){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";

		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "INSERT INTO posting (content, writer, taste, type, time, location, regdate) "+
						"VALUES('"+postingParam.get("content")[0].toString()+"','"+postingParam.get("writer")[0].toString()+"','"+postingParam.get("taste")[0].toString()+"','"+postingParam.get("f_type")[0].toString()+"','"+postingParam.get("time")[0].toString()+"','"+postingParam.get("location")[0].toString()+"', now())";

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
	
	public String deletePosting(String seq){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";

		try{
			conn = getConnection();

			stmt = conn.createStatement();
			String sql= "DELETE from posting where seq='"+seq+"'";
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
	
	public String updatePosting(String seq, String content){
		Connection conn = null;
		Statement stmt = null;
		String result = "success";
		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql= "UPDATE posting SET content='"+content.toString()+"' where seq='"+seq+"'";
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
	
	public List<HashMap<String, Object>> getModalPosting(String posting_seq) {
		Connection conn = null;
		Statement stmt = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt = conn.createStatement();
			
			String sql = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(S.point), 2),'평가안됨') AS avg "+
					"FROM posting AS A "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+ 
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"LEFT OUTER JOIN score S ON S.posting_seq = A.seq "+
					"WHERE A.seq = '"+posting_seq+"' "+
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
				item.put("sc_idx", rs.getString("sc_idx"));
				
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
	
	public List<HashMap<String, Object>> getPreferencePosting(String id) {
		Connection conn = null;
		Statement stmt1, stmt2, stmt3, stmt4, stmt5 = null;
		List<HashMap<String, Object>> result = new ArrayList<HashMap<String, Object>>();

		try{
			conn = getConnection();
			stmt1 = conn.createStatement();
			stmt2 = conn.createStatement();
			stmt3 = conn.createStatement();
			stmt4 = conn.createStatement();
			stmt5 = conn.createStatement();
			
			String sql = "Create View TempScoreView As SELECT * FROM score WHERE score.id = '"+id+"'";

			String sql1 = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(D.point), 2),'not rated') AS avg "+
								"FROM posting AS A "+
								"LEFT JOIN TempScoreView S ON S.posting_seq = A.seq "+
								"LEFT JOIN score D ON D.posting_seq = A.seq "+
								"LEFT OUTER JOIN user B ON B.id = A.writer "+
								"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
								"where S.seq is null "+
								"and A.taste IN (Select * from (SELECT A.taste FROM posting AS A INNER JOIN score S ON S.posting_seq = A.seq where S.id='"+id+"' ORDER BY s.point desc limit 1) As taste) "+ 
								"and A.type IN (Select * from (SELECT A.type FROM posting AS A INNER JOIN score S ON S.posting_seq = A.seq where S.id='"+id+"' ORDER BY s.point desc limit 1) As type) "+ 
								"and A.time IN (Select * from (SELECT A.time FROM posting AS A INNER JOIN score S ON S.posting_seq = A.seq where S.id='"+id+"' ORDER BY s.point desc limit 1) As time) "+ 
								"group by A.seq	"+
								"order by avg desc ";
			
			String sql2 = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(D.point), 2),'not rated') AS avg "+
					"FROM posting AS A "+
					"LEFT JOIN TempScoreView S ON S.posting_seq = A.seq "+
					"LEFT JOIN score D ON D.posting_seq = A.seq "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"where S.seq is null "+
					"and A.taste IN (Select * from (SELECT A.taste FROM posting AS A INNER JOIN score S ON S.posting_seq = A.seq where S.id='"+id+"' ORDER BY s.point desc limit 1) As taste) "+ 
					"and A.type IN (Select * from (SELECT A.type FROM posting AS A INNER JOIN score S ON S.posting_seq = A.seq where S.id='"+id+"' ORDER BY s.point desc limit 1) As type) "+ 
					"group by A.seq	"+
					"order by avg desc ";
			
			String sql3 = "SELECT A.*, B.thumb, IFNULL(C.img,'no-image.jpg') AS img, count(S.point) as sc_idx, IFNULL(round(avg(D.point), 2),'not rated') AS avg "+
					"FROM posting AS A "+
					"LEFT JOIN TempScoreView S ON S.posting_seq = A.seq "+
					"LEFT JOIN score D ON D.posting_seq = A.seq "+
					"LEFT OUTER JOIN user B ON B.id = A.writer "+
					"LEFT OUTER JOIN image C ON C.posting_seq = A.seq "+ 
					"where S.seq is null "+
					"and A.taste IN (Select * from (SELECT A.taste FROM posting AS A INNER JOIN score S ON S.posting_seq = A.seq where S.id='"+id+"' ORDER BY s.point desc limit 1) As taste) "+ 
					"group by A.seq	"+
					"order by avg desc ";
			
			String sql4 = "Drop View if exists TempScoreView";

			stmt5.executeUpdate(sql4);
			System.out.println("sql4 exeute");
			
			stmt1.executeUpdate(sql);
			System.out.println("sql exeute");
			
			ResultSet rs = stmt2.executeQuery(sql1);
			System.out.println("sql1 exeute");
			
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
				item.put("sc_idx", rs.getString("sc_idx"));
				
				result.add(item);
			}
			
			if (result.isEmpty()){
				ResultSet rs2=stmt3.executeQuery(sql2);
				System.out.println("sql2 exeute");
				
				while(rs2.next()){
					HashMap<String, Object> item2 = new HashMap<String, Object>();
					item2.put("seq", rs2.getString("seq"));
					item2.put("content", rs2.getString("content"));
					item2.put("writer", rs2.getString("writer"));
					item2.put("regdate", rs2.getString("regdate"));
					item2.put("thumb", rs2.getString("thumb"));
					item2.put("avg", rs2.getString("avg"));
					item2.put("img", rs2.getString("img"));
					item2.put("type", rs2.getString("type"));
					item2.put("taste", rs2.getString("taste"));
					item2.put("time", rs2.getString("time"));
					item2.put("location", rs2.getString("location"));
					item2.put("sc_idx", rs2.getString("sc_idx"));
					
					result.add(item2);
					
					if(result.isEmpty()){
						ResultSet rs3=stmt4.executeQuery(sql3);
						System.out.println("sql3 exeute");
						
						while(rs3.next()){
							HashMap<String, Object> item3 = new HashMap<String, Object>();
							item3.put("seq", rs3.getString("seq"));
							item3.put("content", rs3.getString("content"));
							item3.put("writer", rs3.getString("writer"));
							item3.put("regdate", rs3.getString("regdate"));
							item3.put("thumb", rs3.getString("thumb"));
							item3.put("avg", rs3.getString("avg"));
							item3.put("img", rs3.getString("img"));
							item3.put("type", rs3.getString("type"));
							item3.put("taste", rs3.getString("taste"));
							item3.put("time", rs3.getString("time"));
							item3.put("location", rs3.getString("location"));
							item3.put("sc_idx", rs3.getString("sc_idx"));
							
							result.add(item3);
						}
					}
				}
			}
						
			System.out.println(result);
			
			rs.close();
			stmt1.close();
			stmt2.close();
			stmt3.close();
			stmt4.close();
			stmt5.close();
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