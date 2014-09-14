/**
 * @author Phani & Harsha
 *
 */

package com.dream.orbit.services;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

import javax.ws.rs.Path;

import org.apache.log4j.Logger;

import com.dream.orbit.exceptions.ErrorConstants;
import com.dream.orbit.exceptions.ServiceCustomException;
import com.google.gson.Gson;

	public class ConnectCassandra 
	{
		private static String driverName = "org.apache.cassandra.cql.jdbc.CassandraDriver";
		private static final Logger LOGGER = Logger.getLogger(ConnectPresto.class);
		private static Statement stmt;
		private String sql;
		private static ResultSet res;
		private String tableName;
		public String count;
		static String json2;
		private static LinkedHashMap<String, String> Lhm ;
		private static List<String> ls;

		/**
		 * @param args
		 */
		/* Creates connection to cassandra */
		public void createConnection() throws SQLException
		{
			try 
			{
				try 
					{
						Class.forName(driverName);
					}
				catch (ClassNotFoundException e)
				{
					e.printStackTrace();
					System.exit(1);
				}
			Connection con = DriverManager.getConnection("jdbc:cassandra://localhost:9160/datasquare", "", "");
			stmt = con.createStatement();
			} 
			catch(SQLException e)
			{
				LOGGER.error("CLASS:ConnectCassandra, METHOD:getRank , ERROR :" + e.getMessage(),e);
			}
			catch(Exception e)
			{
				LOGGER.error("CLASS:ConnectCassandra, METHOD:getRank , ERROR :" + e.getMessage(),e);
			}
		}
		/* widget settings for daashboard */
	public String widgetSettings(String customers,String carriers,String revenues,String profit,String cost,String today_deliveries,String total_deliveries) throws SQLException
	{
		try
		{
				String data="INSERT INTO views(user_id,customers,carriers,revenues, profit , cost , today_deliveries , total_deliveries ) VALUES ( 10, '0', '1', '0', '1', '0', '1', '0');";
				stmt.execute(data);
				System.out.println("Running data:" +data);
				if(stmt != null)
				{
					System.out.println("Inserted");
				}
				else 
				{
						System.out.println("Not Inserted");
				}
			
		 } 
		catch(SQLException e)
		{
			LOGGER.error("CLASS:ConnectCassandra, METHOD:widgetSettings , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":\"success\" }";
	}
	/* validation for checkemail */
	public String checkemail(String email) throws Exception
	{
		System.out.println("email in connection " +email);
	    String query="select count(*) from datasquare.users where email_id = '"+email+"';"; 
	    ResultSet rs=stmt.executeQuery(query);
	    System.out.println("query is:"+query);
	    String checkEmail = "";
	    System.out.println("check val:"+checkEmail);
	    checkEmail=rs.getString(1);
	    System.out.println("check value:"+Integer.parseInt(checkEmail));
	    return "{\"results\": [{\"values\": \""+Integer.parseInt(checkEmail)+"\"}]}";
	}
	/* Retreiving the data from signuppage */
	public String signuppage(String username, String password, String email ) throws SQLException
	{
		try
		{
			System.out.println("username in ");
			Random randomno = new Random();
		    int rnum = randomno.nextInt(10000);
		    System.out.println("rnum" + rnum);
			String data="INSERT INTO datasquare.users(email_id, password, user_id, user_name) VALUES ('"+email+"','"+password+"','"+rnum+"', '"+username+"');";
			stmt.execute(data);
			System.out.println("Running data:" +data);
			if(stmt != null)
			{
				System.out.println("Created");
			}
			else 
			{
				System.out.println("Not Created");
			}
		} 
		catch(SQLException e)
		{
			LOGGER.error("CLASS:ConnectCassandra, METHOD:signuppage, ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":\"success\" }";
	}
	/* Login page validation */
	public String checkUserValidation(String email,String password) throws SQLException
	{
		try
		{
			System.out.println("checkuser " +email);
			json2 = "";
			String sql = "SELECT email_id,password FROM datasquare.users WHERE email_id = '"+email+"' and password = '"+password+"' ALLOW FILTERING";
			System.out.println(sql);
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()){
			String orgUname = "", orPass = "";
			orgUname = rs.getString("email_id");
            System.out.println("email_id:" +orgUname);
            orPass = rs.getString("password");
            System.out.println("password:" +orPass);
			}
           /*while (rs.next()) {
                orgUname = rs.getString("email_id");
                System.out.println("email_id:" +orgUname);
                orPass = rs.getString("password");
                System.out.println("password:" +orPass);
            } *///end while
            /*if (orPass.equals(password)) {
                //do something
                
               // rs.close();
            } else {
                //do something
            	
            }*/
				/*while (rs.next())
				{
					int checkUserValidation = rs.getInt("count");
					System.out.println("checkuserval:"+checkUserValidation);
				}
			rs.next();*/
			//int checkUserValidation = rs.getInt("count");
			String checkUserValidation = rs.getString("email_id");
		    System.out.println("check val:"+checkUserValidation);
		    //rs.close();
		    //System.out.println("check value:"+Integer.parseInt(checkUserValidation));
		   return "{\"results\": [{\"values\": \""+Integer.parseInt(checkUserValidation)+"\"}]}";
			//return "{\"results\": [{\"values\": \""+String.valueOf(checkUserValidation)+"\"}]}";
		} 
		catch(SQLException e)
		{
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectCassandra, METHOD:checkUserValidation , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectCassandra, METHOD:checkUserValidation , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}
		//return "{\"results\":\"values\" }";
	}
}
