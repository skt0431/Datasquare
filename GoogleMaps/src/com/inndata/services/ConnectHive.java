package com.inndata.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.dream.orbit.exceptions.ErrorConstants;
import com.dream.orbit.exceptions.ServiceCustomException;
import com.google.gson.Gson;

public class ConnectHive {
	private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
	private static final Logger LOGGER = Logger.getLogger(ConnectHive.class);
	private Statement stmt;
	private String sql;
	private ResultSet res;
	public String count;
	String json2;
	private LinkedHashMap<String, String> Lhm ;
	private List<String> ls;
	
	/**
	 * @param args
	 */
	/* Creates connection to Hive */
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
						// TODO Auto-generated catch block
						e.printStackTrace();
						System.exit(1);
					}
				Connection con = DriverManager.getConnection("jdbc:hive://192.168.0.112:9999/weblogs", "", "");
				stmt = con.createStatement();
			} 
		catch(SQLException e)
		{
			LOGGER.error("CLASS:ConnectHive, METHOD: createConnection , ERROR :" + e.getMessage(),e);
		}
		catch(Exception e)
		{
			LOGGER.error("CLASS:ConnectHive, METHOD: createConnection , ERROR :" + e.getMessage(),e);
		}
	}
	
	public String getRank(String tab) throws SQLException{
		try{
			json2 = "";
			sql = "select * from " + "weblogs."+tab;
			res = stmt.executeQuery(sql);
			ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				for (int i = 0; i < meta.getColumnCount(); i++)
		        {
					Lhm.put(meta.getColumnLabel(i+1),res.getString(i + 1).replace("\"", "").replace("(", "").replace(")", ""));
		        }
				Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", ""));
		        json2 = gson.toJson(ls);
			}
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectHive, METHOD:getRank , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}catch(Exception e){
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectHive, METHOD:getRank , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}
	}
	
	public String getGeoLocationData(String feature) throws SQLException{
		try{
			json2 = "";
			sql = "select source,destination,carriers,shippments,status from shippingdata group by source,destination,carriers,shippments,status order by status;"+feature;
			res = stmt.executeQuery(sql);
			ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();
			while (res.next()) 
			{
				Lhm = new LinkedHashMap<String, String>();
				for (int i = 0; i < meta.getColumnCount(); i++)
		       	{
					Lhm.put(meta.getColumnLabel(i+1),res.getString(i + 1).replace("\"", "").replace("(", "").replace(")", ""));
		       	}
				Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", ""));
		        json2 = gson.toJson(ls);
			}
			return "{\"results\":" + ls +  "}";
		}
		catch(SQLException e)
		{
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectHive, METHOD:getRank , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectHive, METHOD:getRank , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}
	}
}
