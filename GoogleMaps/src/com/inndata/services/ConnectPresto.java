package com.inndata.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.log4j.Logger;

public class ConnectPresto
{
	/**
	 * @param args
	 */
	private static String driverName = "com.facebook.presto.jdbc.PrestoDriver";
	private static final Logger LOGGER = Logger.getLogger(ConnectPresto.class);
	private static Statement stmt;
	private String sql;
	private static ResultSet res;
	private String tableName;
	public String count;
	static String json2;
	private static LinkedHashMap<String, String> Lhm ;
	private static List<String> ls;
	
	public void createConnection() throws SQLException
	{
		try
		{
			try {
				 Class.forName(driverName);
				}
			catch (ClassNotFoundException e)
				{
				 // TODO Auto-generated catch block
					e.printStackTrace();
					System.exit(1);
				}
				Connection con = DriverManager.getConnection("jdbc:presto://202.62.86.38:8082/", "hadoop", null);
				con.setCatalog("hive"); 
				con.setSchema("bitool");
				stmt = con.createStatement();
		} 
		catch(SQLException e)
		{
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRank , ERROR :" + e.getMessage(),e);
		}
		catch(Exception e)
		{
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRank , ERROR :" + e.getMessage(),e);
		}
	}
}
