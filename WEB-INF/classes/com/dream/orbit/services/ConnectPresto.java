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

import org.apache.log4j.Logger;
import com.google.gson.Gson;
import com.dream.orbit.exceptions.*;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

public class ConnectPresto {

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
	
	public void createConnection() throws SQLException{
		try {
			try {
				 Class.forName(driverName);
			} catch (ClassNotFoundException e) {
				 // TODO Auto-generated catch block
				e.printStackTrace();
				System.exit(1);
			}
			Connection con = DriverManager.getConnection("jdbc:presto://202.62.86.38:8082/", "hadoop", null);
			con.setCatalog("hive"); 
			con.setSchema("bitool");
			stmt = con.createStatement();
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRank , ERROR :" + e.getMessage(),e);
		}catch(Exception e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRank , ERROR :" + e.getMessage(),e);
		}
	}
	
	public String getRevenueToday(long date){
		try{
			System.out.println(date);
		    //res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where day("+date+")=day(bookdate) and month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate), year(bookdate)");
			//-------------------------@sudheer-----------------------
			res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where day("+date+")=day(bookdate) and month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate), year(bookdate) order by day(bookdate),month(bookdate), year(bookdate) desc");
		    System.out.println("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where day("+date+")=day(bookdate) and month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate), year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "No data";
	}
	
	public String getRevenueYesterday(long date){
		try{
			System.out.println(date);
		    //res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where day_of_year(bookdate)=day_of_year("+date+")-1 and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate), year(bookdate)");
			res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where day_of_year(bookdate)=day_of_year("+date+")-1 and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate),year(bookdate) order by day(bookdate),month(bookdate),year(bookdate) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueWeekly(long date){
		try{
			System.out.println(date);
		    //res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,week(bookdate) as week,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where week("+date+")=week(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),week(bookdate),month(bookdate), year(bookdate)");
			res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,week(bookdate) as week,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where week("+date+")=week(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),week(bookdate),month(bookdate),year(bookdate) order by day(bookdate),week(bookdate),month(bookdate),year(bookdate) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueWeekly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueMonthly(long date){
		try{
			System.out.println(date);
		    //res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate), year(bookdate)");
			res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate),year(bookdate) order by day(bookdate),month(bookdate),year(bookdate) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueMonthly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueQuarterly(long date){
		try{
		    //res=stmt.executeQuery("select  quarter(bookdate) as quarter,year(bookdate) as year,sum(cost) as cost,sum(revenue) as revenue,(sum(revenue+cost)/2.2) as profit from product_data group by year(bookdate),quarter(bookdate)");
			res=stmt.executeQuery("select  quarter(bookdate) as quarter,year(bookdate) as year,sum(cost) as cost,sum(revenue) as revenue,(sum(revenue+cost)/2.2) as profit from product_data group by year(bookdate),quarter(bookdate) order by year(bookdate),quarter(bookdate) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueQuarterly , ERROR :" + e.getMessage(),e);
		}
		return "No data";
	}
	
	public String getRevenueyearly(long date){
		try{
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where year("+date+")=year(bookdate)  group by month(bookdate),year(bookdate) order by month(bookdate),year(bookdate) desc");
			//res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where year("+date+")=year(bookdate)  group by month(bookdate),year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueyearly , ERROR :" + e.getMessage(),e);
		}
		return "No data";
	}
	
	public String getRevenueWeekToDate(long date){
		try{
			System.out.println(date);
		    //res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,week(bookdate) as week,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+"))group by day(bookdate),week(bookdate),month(bookdate),year(bookdate) order by day(bookdate),week(bookdate),month(bookdate),year(bookdate) desc ");
			res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,week(bookdate) as week,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+"))group by day(bookdate),week(bookdate),month(bookdate),year(bookdate) order by day(bookdate),week(bookdate),month(bookdate),year(bookdate) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueWeekToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueMonthToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+")) group by day(bookdate),month(bookdate),year(bookdate) order by day(bookdate),month(bookdate),year(bookdate) desc");
			//res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,day(bookdate) as day,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+")) group by day(bookdate),month(bookdate),year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueMonthToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueYearToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate),year(bookdate) order by month(bookdate),year(bookdate) desc");
			//res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate),year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueYearToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersToday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost  from product_data where day(bookdate)=day("+date+") and month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersWeek(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where week(bookdate)=week("+date+") and month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersWeek , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	public String getCustomersMonth(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersMonth , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersYear(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where year(bookdate)=year("+date+") group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersYear , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersYesterday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-1,"+date+")) group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersWeekToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+")) group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersWeekToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersMonthToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+")) group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersMonthToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCustomersYearToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select customer,count(cargo) as cargo ,sum(cost) as cost from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by customer order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCustomersYearToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	
	public String getCarriersToday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data  as t1 join carrier as t2 on t1.customer=t2.customer  where day(bookdate)=day("+date+") and month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCarriersWeek(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer  where week(bookdate)=week("+date+") and month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersWeek , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	public String getCarriersMonth(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer  where month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersMonth , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCarriersYear(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer  where month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersYear , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCarriersYesterday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer  where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-1,"+date+")) group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCarriersWeekToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data  as t1 join carrier as t2 on t1.customer=t2.customer where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+")) group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersWeekToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCarriersMonthToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer  where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+")) group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersMonthToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCarriersYearToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select carrier,count(cargo) as cargo ,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer  where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by carrier order by count(cargo) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersYearToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeToday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeWeek(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeWeek , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	public String getTimeMonth(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where month(bookdate)=month("+date+") and year("+date+")=year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeMonth , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeYear(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where year("+date+")=year(bookdate)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeYear , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeYesterday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-1,"+date+"))");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeWeekToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+"))");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeWeekToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeMonthToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+"))");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeMonthToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getTimeYearToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total,count(*)/count_if(pickintime='Yes') as pickintime,count(*)/count_if(dropintime='Yes') as dropintime from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+"))");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTimeYearToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	
	public String getTopPerformers(){
		try{
		    res=stmt.executeQuery("select customer as name, count(cargo) as shipments, sum(revenue) as revenue, floor(sum(cost+revenue)/2.2) as profit from product_data group by customer order by shipments desc,revenue desc,profit");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getTopPerformers , ERROR :" + e.getMessage(),e);
		}
		return "No data";
	}
	
	public String getCargoToday(long date){
		try{
		    res=stmt.executeQuery("SELECT day(bookdate) as day,month(bookdate) as month,year(bookdate) as year, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM ( select bookdate, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate) group by bookdate,status order by bookdate ) group by bookdate");
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
			/*res=stmt.executeQuery("select status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate)");
			meta = res.getMetaData();
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
			*/
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoYesterday(long date){
		try{
			  res=stmt.executeQuery("SELECT day(bookdate) as day,month(bookdate) as month,year(bookdate) as year, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM ( select bookdate, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-1,"+date+")) group by bookdate,status order by bookdate ) group by bookdate");
			//res=stmt.executeQuery("SELECT day(bookdate) as day,month(bookdate) as month,year(bookdate) as year, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM ( select bookdate, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-1,"+date+")) group by bookdate,status order by bookdate,status ) group by bookdate");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoWeekly(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("SELECT week,month, year, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM (select week(bookdate) as week,month(bookdate) as month, year(bookdate) as year, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where week("+date+")=week(bookdate) and month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by week(bookdate),month(bookdate), year(bookdate) ) group by week,month, year");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoWeekly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMonthly(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("SELECT month, year, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM (select day(bookdate) as day,month(bookdate) as month, year(bookdate) as year, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where month("+date+")=month(bookdate) and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate), year(bookdate) ) group by month, year");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoMonthly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoYearly(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("SELECT year, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM (select year(bookdate) as year, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where   month("+date+")>=month(bookdate) and  year("+date+")=year(bookdate) group by year(bookdate) ) group by year");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYearly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoWeekToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count(*) as bookings, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+"))");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoWeekToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMonthToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count(*) as bookings, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+"))");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoMonthToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoYearToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select count(*) as bookings, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+"))");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYearToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}

	
	
	
	public String getCargoMapToday(long date){
		try{
			System.out.println("getCargoMapToday");
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate)  group by status,source,code");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapYesterday(long date){
		try{
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-1,"+date+"))  group by status,source,code");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapWeekly(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where week("+date+")=week(bookdate) and month("+date+")=month(bookdate) and year("+date+")=year(bookdate)  group by status,source,code");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoWeekly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapMonthly(long date){
		try{
			System.out.println(date);
			res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where month(bookdate)=month("+date+") and year("+date+")=year(bookdate)  group by status,source,code");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoMonthly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapYearly(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where year("+date+")=year(bookdate)  group by status,source,code");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYearly , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapWeekToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where (bookdate)<=("+date+") and (bookdate)>(date_add('day',-7,"+date+"))  group by status,source,code");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoWeekToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapMonthToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where (bookdate)<=("+date+") and (bookdate)>(date_add('month',-1,"+date+"))  group by status,source,code");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoMonthToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCargoMapYearToDate(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select  count(*) as count,status,source,code from product_data as t1 join state_codes as t2 on t1.source=t2.state where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+"))  group by status,source,code");
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
			System.out.println(ls);
			
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYearToDate , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	
	
	public String getTodayFinancialInfo(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select day(bookdate) as day,month(bookdate) as month,year(bookdate) as year,sum(cost) as cost,sum(revenue) as revenue,floor(sum(revenue+cost)/5) as profit from product_data where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate) group by day(bookdate),month(bookdate),year(bookdate) ");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getProfitFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCostFinancialInfo(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by year(bookdate),month(bookdate)  order by year(bookdate),month(bookdate),sum(revenue) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getProfitFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCostFinancialComponent(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,floor(sum(cost)*0.3) as labour,floor(sum(cost)*0.3) as fuel,floor(sum(cost)*0.2) as freight,sum(cost)-(floor(sum(cost)*0.3)+floor(sum(cost)*0.3)+floor(sum(cost)*0.2)) as other from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by year(bookdate),month(bookdate)  order by year(bookdate),month(bookdate),sum(revenue) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCostFinancialComponent , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	/* Test Sample*/
	
	public String Sample(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,customer from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),customer order by year(bookdate),month(bookdate),sum(cost) desc");
			ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int costIndex  = res.findColumn("cost");
			int customerIndex  = res.findColumn("customer");
			String temp = "",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String cost = res.getString(costIndex);
			    String customer = res.getString(customerIndex);
			    
			    
			    
			    if(temp == ""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"customer\":\""+customer+"\",\"cost\":\""+cost+"\"}");
			    	temp = month;
			    }else if(temp.equals( month)){
			    	listOfString.add("{\"customer\":\""+customer+"\",\"cost\":\""+cost+"\"}");
			    }else{
			    	Lhm.put("year",year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	listOfString.clear();
			    	listOfString.add("{\"customer\":\""+customer+"\",\"cost\":\""+cost+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCostFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	/* Test Sample*/
	
	public String getCostFinancialCustomer(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,customer from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),customer order by year(bookdate),month(bookdate),sum(cost) desc");
			ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int costIndex  = res.findColumn("cost");
			int customerIndex  = res.findColumn("customer");
			String temp = "",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String cost = res.getString(costIndex);
			    String customer = res.getString(customerIndex);
			    
			    
			    
			    if(temp == ""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"customer\":\""+customer+"\",\"cost\":\""+cost+"\"}");
			    	temp = month;
			    }else if(temp.equals( month)){
			    	listOfString.add("{\"customer\":\""+customer+"\",\"cost\":\""+cost+"\"}");
			    }else{
			    	Lhm.put("year",year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	listOfString.clear();
			    	listOfString.add("{\"customer\":\""+customer+"\",\"cost\":\""+cost+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCostFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCostFinancialCarrier(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(cost) as cost,carrier from bitool.product_data as t1 join carrier as t2 on t1.customer=t2.customer where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),carrier order by year(bookdate),month(bookdate),sum(cost) desc");
			ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int costIndex  = res.findColumn("cost");
			int carrierIndex  = res.findColumn("carrier");
			String temp = "",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String cost = res.getString(costIndex);
			    String carrier = res.getString(carrierIndex);
			    
			    
			    
			    if(temp == ""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"cost\":\""+cost+"\"}");
			    	temp = month;
			    }else if(temp.equals( month)){
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"cost\":\""+cost+"\"}");
			    }else{
			    	Lhm.put("year",year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	listOfString.clear();
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"cost\":\""+cost+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCostFinancialCarrier , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueFinancialInfo(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(revenue) as revenue from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by year(bookdate),month(bookdate)  order by year(bookdate),month(bookdate) asc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getProfitFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	
	public String getRevenueFinancialCustomer(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(revenue) as revenue,customer from bitool.product_data where  (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),customer order by year(bookdate),month(bookdate), sum(revenue) desc");
		    ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int revenueIndex  = res.findColumn("revenue");
			int customerIndex  = res.findColumn("customer");
			String temp = "",temp_year="",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String revenue = res.getString(revenueIndex);
			    String customer = res.getString(customerIndex);
			    
			    
			    
			    if(temp == "" && temp_year==""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"customer\":\""+customer+"\",\"revenue\":\""+revenue+"\"}");
			    	temp = month;
			    	temp_year = year;
			    }else if(temp.equals( month) && temp_year.equals(year)){
			    	listOfString.add("{\"customer\":\""+customer+"\",\"revenue\":\""+revenue+"\"}");
			    }else{
			    	Lhm.put("year",temp_year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	temp_year = year;
			    	listOfString.clear();
			    	listOfString.add("{\"customer\":\""+customer+"\",\"revenue\":\""+revenue+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getRevenueFinancialCarrier(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,sum(revenue) as revenue,carrier from bitool.product_data as t1 join carrier as t2 on t1.customer=t2.customer where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),carrier order by year(bookdate),month(bookdate),sum(revenue) desc");
		    ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int revenueIndex  = res.findColumn("revenue");
			int carrierIndex  = res.findColumn("carrier");
			String temp = "",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String revenue = res.getString(revenueIndex);
			    String carrier = res.getString(carrierIndex);
			    
			    
			    
			    if(temp == ""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"revenue\":\""+revenue+"\"}");
			    	temp = month;
			    }else if(temp.equals( month)){
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"revenue\":\""+revenue+"\"}");
			    }else{
			    	Lhm.put("year",year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	listOfString.clear();
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"revenue\":\""+revenue+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueFinancialCarrier , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}

	public String getProfitFinancialInfo(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,floor(sum(revenue+cost)/5) as profit  from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by year(bookdate),month(bookdate)  order by year(bookdate),month(bookdate),sum(revenue) desc");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getProfitFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getProfitFinancialCustomer(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,floor(sum(revenue+cost)/5) as profit ,customer from bitool.product_data where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),customer order by year(bookdate),month(bookdate),floor(sum(revenue+cost)/5) desc");
		    ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int profitIndex  = res.findColumn("profit");
			int customerIndex  = res.findColumn("customer");
			String temp = "",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String profit = res.getString(profitIndex);
			    String customer = res.getString(customerIndex);
			    
			    
			    
			    if(temp == ""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"customer\":\""+customer+"\",\"profit\":\""+profit+"\"}");
			    	temp = month;
			    }else if(temp.equals( month)){
			    	listOfString.add("{\"customer\":\""+customer+"\",\"profit\":\""+profit+"\"}");
			    }else{
			    	Lhm.put("year",year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	listOfString.clear();
			    	listOfString.add("{\"customer\":\""+customer+"\",\"profit\":\""+profit+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getProfitFinancialCustomer , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getProfitFinancialCarrier(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select year(bookdate) as year,month(bookdate) as month,floor(sum(revenue+cost)/5) as profit ,carrier from bitool.product_data as t1 join carrier as t2 on t1.customer=t2.customer where (bookdate)<=("+date+") and (bookdate)>(date_add('year',-1,"+date+")) group by month(bookdate), year(bookdate),carrier order by year(bookdate),month(bookdate),floor(sum(revenue+cost)/5) desc");
		    ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();

			int yearIndex   = res.findColumn("year");
			int monthIndex    = res.findColumn("month");
			int profitIndex  = res.findColumn("profit");
			int carrierIndex  = res.findColumn("carrier");
			String temp = "",year = null,month=null;
			List<String> listOfString = new ArrayList<String>();
			
			
			while (res.next()) {
				Lhm = new LinkedHashMap<String, String>();
				
				
				year = res.getString(yearIndex);
				month = res.getString(monthIndex);
			    String profit = res.getString(profitIndex);
			    String carrier = res.getString(carrierIndex);
			    
			    
			    
			    if(temp == ""){
//			    	System.out.println(temp);
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"profit\":\""+profit+"\"}");
			    	temp = month;
			    }else if(temp.equals( month)){
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"profit\":\""+profit+"\"}");
			    }else{
			    	Lhm.put("year",year);
			    	Lhm.put("month",temp);
			    	Lhm.put("data", listOfString.toString());
			    	Gson gson = new Gson();
			        String json = gson.toJson(Lhm);
			        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
			        json2 = gson.toJson(ls);
			        
			    	temp = month;
			    	listOfString.clear();
			    	listOfString.add("{\"carrier\":\""+carrier+"\",\"profit\":\""+profit+"\"}");
			    }
			 
			}
			if(!listOfString.isEmpty()){
				Lhm.put("year",year);
		    	Lhm.put("month",temp);
		    	Lhm.put("data", listOfString.toString());
		    	Gson gson = new Gson();
		        String json = gson.toJson(Lhm);
		        ls.add(json.replace("\\", "").replace("\"[{", "[{").replace("}]\"", "}]"));
		        json2 = gson.toJson(ls);
		        
		        listOfString.clear();
			}
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getProfitFinancialCarrier , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getCurrentServicesInfo(long date){
		try{
			System.out.println(date);
			ls = new ArrayList<String>();
		    res=stmt.executeQuery("select customer,carrier from (select t1.customer, RANK() over ( order by sum(revenue) desc) as rank from product_data as t1 join carrier as t2 on t1.customer=t2.customer where DAY_OF_YEAR(bookdate)=DAY_OF_YEAR("+date+") and year(bookdate)=year("+date+") group by t1.customer order by RANK() over ( order by sum(revenue) desc),count(cargo)) as a join (select carrier, RANK() over ( order by sum(revenue) desc) as rank from product_data as t1 join carrier as t2 on t1.customer=t2.customer where day_of_year(bookdate)=day_of_year("+date+") and year(bookdate)=year("+date+") group by carrier order by RANK() over ( order by sum(revenue) desc),count(cargo) desc limit 1) as b on a.rank=b.rank");
		    Lhm = new LinkedHashMap<String, String>();
			ResultSetMetaData meta = res.getMetaData();
			while (res.next()) {
				for (int i = 0; i < meta.getColumnCount(); i++)
		        {
					Lhm.put(meta.getColumnLabel(i+1),res.getString(i + 1).replace("\"", "").replace("(", "").replace(")", ""));
		        }
			}
			res=stmt.executeQuery("select count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total from product_data where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate)");
			meta = res.getMetaData();
			while (res.next()) {
				for (int i = 0; i < meta.getColumnCount(); i++)
		        {
					Lhm.put(meta.getColumnLabel(i+1),res.getString(i + 1).replace("\"", "").replace("(", "").replace(")", ""));
		        }
			}
			
			Gson gson = new Gson();
		    String json = gson.toJson(Lhm);
		    ls.add(json.replace("\\", ""));
		    json2 = gson.toJson(ls);
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCarriersToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String getOnTimeStatisticsInfo(long date){
		try{
//		    res=stmt.executeQuery(" select quarter(bookdate) as quarter, year(bookdate) as year,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total from product_data where ("+date+")>(bookdate) and year("+date+")=year(bookdate) group by quarter(bookdate), year(bookdate)");
			res=stmt.executeQuery("select quarter(bookdate) as quarter, year(bookdate) as year,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total from product_data where ("+date+")>(bookdate) and (bookdate)>=date_add('quarter',-3, "+date+") group by quarter(bookdate), year(bookdate) order by  year(bookdate), quarter(bookdate)");
		    
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}	
	
	public String getOnTimeStatisticsPie(long date){
		try{
//		    res=stmt.executeQuery(" select quarter(bookdate) as quarter, year(bookdate) as year,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as total from product_data where ("+date+")>(bookdate) and year("+date+")=year(bookdate) group by quarter(bookdate), year(bookdate)");
			res=stmt.executeQuery("select reason,count(*) as count from product_data t1 join timeStatistics t2 on t1.customer=t2.customer where ("+date+")>(bookdate) and (bookdate)>=date_add('quarter',-3, "+date+") group by reason");
		    
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCargoYesterday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}	
	
	public String topServiceCustomerToday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t1.customer,count(*) as shipments, RANK() over ( order by sum(revenue) desc) as rank,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer where DAY_OF_YEAR(bookdate)=DAY_OF_YEAR("+date+") and year(bookdate)=year("+date+") group by t1.customer order by RANK() over ( order by sum(revenue) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCustomerMonth(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t1.customer,count(*) as shipments, RANK() over ( order by sum(revenue) desc) as rank,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer where month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by t1.customer order by RANK() over ( order by sum(revenue) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCustomerQuarter(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t1.customer,count(*) as shipments, RANK() over ( order by sum(revenue) desc) as rank,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer where quarter(bookdate)=quarter("+date+") and year(bookdate)=year("+date+") group by t1.customer order by RANK() over ( order by sum(revenue) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCustomerYear(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t1.customer,count(*) as shipments, RANK() over ( order by sum(revenue) desc) as rank,sum(revenue) as revenue,floor(sum(revenue+cost)/2.2) as profit from product_data as t1 join carrier as t2 on t1.customer=t2.customer where year(bookdate)=year("+date+") group by t1.customer order by RANK() over ( order by sum(revenue) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierToday(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t2.carrier,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier as t2 on t1.customer=t2.customer where day_of_year(bookdate)=day_of_year("+date+") and year(bookdate)=year("+date+") group by t2.carrier order by RANK() over ( order by count(*) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierMonth(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t2.carrier,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier as t2 on t1.customer=t2.customer where month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by t2.carrier order by RANK() over ( order by count(*) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierQuarter(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t2.carrier,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier as t2 on t1.customer=t2.customer where quarter(bookdate)=quarter("+date+") and year(bookdate)=year("+date+") group by t2.carrier order by RANK() over ( order by count(*) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierYear(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select t2.carrier,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier as t2 on t1.customer=t2.customer where year(bookdate)=year("+date+") group by t2.carrier order by RANK() over ( order by count(*) desc),count(cargo)");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierTodayInfo(long date,String carrier){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select * from (select t2.carrier as carrier,company,(sum(cost)+sum(revenue))/150 as dbe,sum(cost)/100 as gmt,floor((sum(cost)/count(*))*0.3) as awt,sum(revenue)/100 as acl,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier_Info as t2 on t1.customer=t2.customer where day_of_year(bookdate)=day_of_year("+date+") and year(bookdate)=year("+date+") group by t2.carrier,t2.company order by RANK() over ( order by count(*) desc ),count(cargo)) where carrier='"+carrier+"' ");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierMonthInfo(long date,String carrier){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select * from (select t2.carrier as carrier,company,(sum(cost)+sum(revenue))/150 as dbe,sum(cost)/100 as gmt,floor((sum(cost)/count(*))*0.3) as awt,sum(revenue)/100 as acl,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier_Info as t2 on t1.customer=t2.customer where month(bookdate)=month("+date+") and year(bookdate)=year("+date+") group by t2.carrier,t2.company order by RANK() over ( order by count(*) desc ),count(cargo)) where carrier='"+carrier+"' ");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierQuarterInfo(long date,String carrier){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select * from (select t2.carrier as carrier,company,(sum(cost)+sum(revenue))/150 as dbe,sum(cost)/100 as gmt,floor((sum(cost)/count(*))*0.3) as awt,sum(revenue)/100 as acl,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier_Info as t2 on t1.customer=t2.customer where quarter(bookdate)=quarter("+date+") and year(bookdate)=year("+date+") group by t2.carrier,t2.company order by RANK() over ( order by count(*) desc ),count(cargo)) where carrier='"+carrier+"' ");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topServiceCarrierYearInfo(long date,String carrier){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("select * from (select t2.carrier as carrier,company,(sum(cost)+sum(revenue))/150 as dbe,sum(cost)/100 as gmt,floor((sum(cost)/count(*))*0.3) as awt,sum(revenue)/100 as acl,count_if(pickintime='Yes') as pickup,count_if(dropintime='Yes') as dropin,count(*) as shipments, RANK() over ( order by count(*) desc) as rank,sum(cost) as spend,floor(sum(revenue+cost)/2.2) as profit,sum(cost)/count(*) as aloh, count(*) as customer from product_data as t1 join carrier_Info as t2 on t1.customer=t2.customer where year(bookdate)=year("+date+") group by t2.carrier,t2.company order by RANK() over ( order by count(*) desc ),count(cargo)) where carrier='"+carrier+"' ");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getRevenueToday , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topOperatorsCustomer(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("SELECT customer, sum(total) as bookings, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM ( select customer, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate) group by customer,status ) group by customer");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCostFinancialCarrier , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	public String topOperatorsCarrier(long date){
		try{
			System.out.println(date);
		    res=stmt.executeQuery("SELECT carrier, sum(total) as bookings,sum(Delivered)/ sum(total) as perfect, sum(exception) as exception, sum(cancelled) as cancelled, sum(Delivered) as Delivered, sum(Intransmit) as Intransmit FROM ( select carrier, count(*) as total, count_if(status='Exception') as exception, count_if(status='cancelled') as cancelled, count_if(status='Delivered') as Delivered, count_if(status='Intransmit') as Intransmit from product_data as t1 join carrier as t2 on t1.customer=t2.customer where day_of_year(bookdate)=day_of_year("+date+") and year("+date+")=year(bookdate) group by carrier,status ) group by carrier");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:getCostFinancialCarrier , ERROR :" + e.getMessage(),e);
		}
		return "{\"results\":" + ls +  "}";
	}
	
	
	
	
	public String runPrestoQueries(String  query){
		try{
		    res=stmt.executeQuery(query);
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:runPrestoQueries(String  query) , ERROR :" + e.getMessage(),e);
		}
		return "No data";
	}
	
	public String runPrestoQueries(){
		try{
		    res=stmt.executeQuery("select customer, cargo, status from bitool.product_info group by customer, cargo,status");
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
			System.out.println(ls);
			return "{\"results\":" + ls +  "}";
		} catch(SQLException e){
			LOGGER.error("CLASS:ConnectPresto, METHOD:runPrestoQueries , ERROR :" + e.getMessage(),e);
		}
		return "No data";
	}
	
	/*public String checkUserValidation(String username,String password) throws SQLException{
		try{
			json2 = "";
			sql = "select status from userInfo.userCheck where username='"+username+"' and password='"+password+"'";
			res = stmt.executeQuery(sql.replace("\"", ""));
			System.out.println(sql.replace("\"", ""));
			ResultSetMetaData meta = res.getMetaData();
			ls = new ArrayList<String>();
			
			while (res.next()) {
				System.out.println(res.getString(1).replace("\"", "").replace("(", "").replace(")", ""));
		        return "{\"results\":\"" + res.getString(1).replace("\"", "").replace("(", "").replace(")", "") +  "\"}";
			}
			return "{\"results\":\"failure\"}";
		} catch(SQLException e){
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectHive, METHOD:checkUserValidation , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}catch(Exception e){
			ServiceCustomException apsce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:ConnectHive, METHOD:checkUserValidation , ERROR :" + e.getMessage(),e);
			return apsce.getErrorJsonObject(apsce.getErrorCode(),apsce.getErrorMessage());
		}
	}*/
}
