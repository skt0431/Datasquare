/**
 * 
 */
package com.dream.orbit.services;

/**
 * @author vidyasagar.g DO-74
 *
 */


import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.StringTokenizer;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
//import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
//import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.json.JSONObject;




import java.io.*;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;




import com.dream.orbit.exceptions.ErrorConstants;
import com.dream.orbit.exceptions.ServiceCustomException;
import com.google.gson.Gson;


@Path("/search")
public class callGoad {
	private static final Logger LOGGER = Logger.getLogger(callGoad.class);
	public String output;
	private ConnectHive con;
	private ConnectPresto conPresto;
	private ConnectCassandra conCassandra;
	private String rankData;
	private String graphData;
	private String activityData;
	private String sumamryData;	
	private String signupdata;
	private String logindata;
	private String checkUser;

	
	@GET
	@Path("/rank")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadRankData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try
		{
			con = new ConnectHive();
			con.createConnection();
			rankData = con.getRank(feature);
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadRankData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadRankData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return rankData;
	}
	
	@GET
	@Path("/graph")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadGraphData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try {
				con = new ConnectHive();
				con.createConnection();
				graphData = con.getGraph(feature);
			} 
		catch(SQLException e)
			{
				ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
				LOGGER.error("CLASS:callFMS, METHOD:loadGraphData , ERROR :" + e.getMessage(),e);
				return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
			}	
		catch(Exception e)
			{
				ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
				LOGGER.error("CLASS:callFMS, METHOD:loadGraphData , ERROR :" + e.getMessage(),e);
				return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
			}
		return graphData;
	}
	
	
	@GET
	@Path("/activitystats")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadActivityData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try 
		{
			con = new ConnectHive();
			con.createConnection();
			activityData = con.getActivityStats(feature);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return activityData;
	}
	
	@GET
	@Path("/activitygraphs")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadActivityGraphData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try
		{
			con = new ConnectHive();
			con.createConnection();
			activityData = con.getActivityGraph(feature);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return activityData;
	}
	
	@GET
	@Path("/summary")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadSummaryData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try 
		{
			con = new ConnectHive();
			con.createConnection();
			sumamryData = con.getMainTable(feature);
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return sumamryData;
	}
	
	@GET
	@Path("/activitypie")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadActivityPieGraphData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try 
		{
			con = new ConnectHive();
			con.createConnection();
			activityData = con.getActivityPieGraph(feature);
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadActivityData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return activityData;
	}
	
	private String customerData;
	private String shipmentData;
	private String metricsData;
	
	@GET
	@Path("/topcustomers")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadCustomersData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try
		{
			con = new ConnectHive();
			con.createConnection();
			customerData = con.getTopCustomers(feature);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadCustomersData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadCustomersData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return customerData;
	 }
	
	@GET
	@Path("/shipments")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadShipmentsData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try 
		{
			con = new ConnectHive();
			con.createConnection();
			shipmentData = con.getShipments(feature);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadShipmentsData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadShipmentsData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return shipmentData;
	}
	
	
	@GET
	@Path("/servicemetrics")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadServiceData(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{
		try
		{
			con = new ConnectHive();
			con.createConnection();
			metricsData = con.getMetrics(feature);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
//	Web Services using Presto connection
	
	@GET
	@Path("/getRevenue")
	@Produces({MediaType.APPLICATION_JSON})
	public String getRevenue(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("interval") String interval,@QueryParam("date") long date)
	{
		try
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			System.out.println(interval.equals("yesterday"));
				if(interval.equals("today"))
					metricsData = conPresto.getRevenueToday(date);
				else if(interval.equals("yesterday"))
					metricsData = conPresto.getRevenueYesterday(date);
				else if(interval.equals("weekly"))
					metricsData = conPresto.getRevenueWeekly(date);
				else if(interval.equals("monthly"))
					metricsData = conPresto.getRevenueMonthly(date);
				else if(interval.equals("quarterly"))
					metricsData = conPresto.getRevenueQuarterly(date);
				else if(interval.equals("yearly"))
					metricsData = conPresto.getRevenueyearly(date);
				else if(interval.equals("wtd"))
					metricsData = conPresto.getRevenueWeekToDate(date);
				else if(interval.equals("mtd"))
					metricsData = conPresto.getRevenueMonthToDate(date);
				else if(interval.equals("ytd"))
					metricsData = conPresto.getRevenueYearToDate(date);
				else
				System.out.println(" no match intervel");
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/getCargoInfo")
	@Produces({MediaType.APPLICATION_JSON})
	public String getCargoInfo(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("interval") String interval,@QueryParam("date") long date)
	{
		try
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(interval.equals("today"))
					metricsData = conPresto.getCargoToday(date);
				else if(interval.equals("yesterday"))
					metricsData = conPresto.getCargoYesterday(date);
				else if(interval.equals("weekly"))
					metricsData = conPresto.getCargoWeekly(date);
				else if(interval.equals("wtd"))
					metricsData = conPresto.getCargoWeekToDate(date);
				else if(interval.equals("monthly"))
					metricsData = conPresto.getCargoMonthly(date);
				else if(interval.equals("mtd"))
					metricsData = conPresto.getCargoMonthToDate(date);
//			else if(interval.equals("quarterly"))
//				metricsData = conPresto.getCargoQuarterly();
				else if(interval.equals("yearly"))
					metricsData = conPresto.getCargoYearly(date);
				else if(interval.equals("ytd"))
					metricsData = conPresto.getCargoYearToDate(date);
				else
				System.out.println(" no match ");
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	

	@GET
	@Path("/getCargoMapInfo")
	@Produces({MediaType.APPLICATION_JSON})
	public String getCargoMapInfo(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("interval") String interval,@QueryParam("date") long date)
	{
		try 
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(interval.equals("today"))
					metricsData = conPresto.getCargoMapToday(date);
				else if(interval.equals("yesterday"))
					metricsData = conPresto.getCargoMapYesterday(date);
				else if(interval.equals("weekly"))
					metricsData = conPresto.getCargoMapWeekly(date);
				else if(interval.equals("wtd"))
					metricsData = conPresto.getCargoMapWeekToDate(date);
				else if(interval.equals("monthly"))
					metricsData = conPresto.getCargoMapMonthly(date);
				else if(interval.equals("mtd"))
					metricsData = conPresto.getCargoMapMonthToDate(date);
	//			else if(interval.equals("quarterly"))
	//				metricsData = conPresto.getCargoQuarterly();
				else if(interval.equals("yearly"))
					metricsData = conPresto.getCargoMapYearly(date);
				else if(interval.equals("ytd"))
					metricsData = conPresto.getCargoMapYearToDate(date);
				else
					System.out.println(" no match ");
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	

	@GET
	@Path("/getTodayFinancial")
	@Produces({MediaType.APPLICATION_JSON})
	public String getTodayFinancial(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("date") long date)
	{
		try
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			metricsData = conPresto.getTodayFinancialInfo(date);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/getCurrentServices")
	@Produces({MediaType.APPLICATION_JSON})
	public String getCurrentServices(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("date") long date)
	{
		try
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			metricsData = conPresto.getCurrentServicesInfo(date);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/getOnTimeStatistics")
	@Produces({MediaType.APPLICATION_JSON})
	public String getOnTimeStatistics(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("date") long date)
	{
		try 
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			System.out.println(type);
				if(type.equals("chart"))
					metricsData = conPresto.getOnTimeStatisticsInfo(date);
				else if(type.equals("pie"))
					metricsData = conPresto.getOnTimeStatisticsPie(date);
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	
	@GET
	@Path("/getTimeInfo")
	@Produces({MediaType.APPLICATION_JSON})
	public String getTimeInfo(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("interval") String interval,@QueryParam("date") long date)
	{
		try
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(interval.equals("today"))
					metricsData = conPresto.getTimeToday(date);
				else if(interval.equals("yesterday"))
					metricsData = conPresto.getTimeYesterday(date);
				else if(interval.equals("weekly"))
					metricsData = conPresto.getTimeWeek(date);
				else if(interval.equals("wtd"))
					metricsData = conPresto.getTimeWeekToDate(date);
				else if(interval.equals("monthly"))
					metricsData = conPresto.getTimeMonth(date);
				else if(interval.equals("mtd"))
					metricsData = conPresto.getTimeMonthToDate(date);
				else if(interval.equals("yearly"))
					metricsData = conPresto.getTimeYear(date);
				else if(interval.equals("ytd"))
					metricsData = conPresto.getTimeYearToDate(date);
				else
					System.out.println(" no match ");
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	
	@GET
	@Path("/getTopPerformers")
	@Produces({MediaType.APPLICATION_JSON})
	public String getTopCustomers(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("interval") String interval,@QueryParam("date") long date)
	{
		try 
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			System.out.println(type);
				if(type.equals("carriers"))
				{
					if(interval.equals("today"))
						metricsData = conPresto.getCarriersToday(date);
					else if(interval.equals("yesterday"))
						metricsData = conPresto.getCarriersYesterday(date);
					else if(interval.equals("weekly"))
						metricsData = conPresto.getCarriersWeek(date);
					else if(interval.equals("wtd"))
						metricsData = conPresto.getCarriersWeekToDate(date);
					else if(interval.equals("monthly"))
						metricsData = conPresto.getCarriersMonth(date);
					else if(interval.equals("mtd"))
						metricsData = conPresto.getCarriersMonthToDate(date);
					else if(interval.equals("yearly"))
						metricsData = conPresto.getCarriersYear(date);
					else if(interval.equals("ytd"))
						metricsData = conPresto.getCarriersYearToDate(date);
					else
						System.out.println("carriers interval not match ");
				}
				else if(type.equals("customers"))
				{
					if(interval.equals("today"))
						metricsData = conPresto.getCustomersToday(date);
					else if(interval.equals("yesterday"))
						metricsData = conPresto.getCustomersYesterday(date);
					else if(interval.equals("weekly"))
						metricsData = conPresto.getCustomersWeek(date);
					else if(interval.equals("wtd"))
						metricsData = conPresto.getCustomersWeekToDate(date);
					else if(interval.equals("monthly"))
						metricsData = conPresto.getCustomersMonth(date);
					else if(interval.equals("mtd"))
						metricsData = conPresto.getCustomersMonthToDate(date);
					else if(interval.equals("yearly"))
						metricsData = conPresto.getCustomersYear(date);
					else if(interval.equals("ytd"))
						metricsData = conPresto.getCustomersYearToDate(date);
					else
						System.out.println("customers interval not match ");
				}
				else
				System.out.println("Type not match ");
				} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}

	@GET
	@Path("/getCostFinancial")
	@Produces({MediaType.APPLICATION_JSON})
	public String getCostFinancial(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("date") long date)
	{
		try
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(type.equals("component"))
					metricsData = conPresto.getCostFinancialComponent(date);
				else if(type.equals("customer"))
					metricsData = conPresto.getCostFinancialCustomer(date);
				else if(type.equals("carrier"))
					metricsData = conPresto.getCostFinancialCarrier(date);
				else if(type.equals("current"))
					metricsData = conPresto.getCostFinancialInfo(date);
				else
					System.out.println(" no match intervel");
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/getRevenueFinancial")
	@Produces({MediaType.APPLICATION_JSON})
	public String getRevenueFinancial(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("date") long date)
	{
		try
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(type.equals("customer"))
					metricsData = conPresto.getRevenueFinancialCustomer(date);
				else if(type.equals("carrier"))
					metricsData = conPresto.getRevenueFinancialCarrier(date);
				else if(type.equals("current"))
					metricsData = conPresto.getRevenueFinancialInfo(date);
				else
					System.out.println(" no match intervel");
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/getProfitFinancial")
	@Produces({MediaType.APPLICATION_JSON})
	public String getProfitFinancial(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("date") long date)
	{
		try 
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			if(type.equals("customer"))
				metricsData = conPresto.getProfitFinancialCustomer(date);
			else if(type.equals("carrier"))
				metricsData = conPresto.getProfitFinancialCarrier(date);
			else if(type.equals("current"))
				metricsData = conPresto.getProfitFinancialInfo(date);
			else
				System.out.println(" no match intervel");
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/topServices")
	@Produces({MediaType.APPLICATION_JSON})
	public String topServices(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("interval") String interval,@QueryParam("date") long date)
	{
		try
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(type.equals("carriers"))
				{
					if(interval.equals("today"))
						metricsData = conPresto.topServiceCarrierToday(date);
					else if(interval.equals("month"))
						metricsData = conPresto.topServiceCarrierMonth(date);
					else if(interval.equals("quarter"))
						metricsData = conPresto.topServiceCarrierQuarter(date);
					else if(interval.equals("year"))
						metricsData = conPresto.topServiceCarrierYear(date);
					else
						System.out.println("carriers interval not match ");
				}
				else if(type.equals("customers"))
				{
					if(interval.equals("today"))
					metricsData = conPresto.topServiceCustomerToday(date);
				else if(interval.equals("month"))
					metricsData = conPresto.topServiceCustomerMonth(date);
				else if(interval.equals("quarter"))
					metricsData = conPresto.topServiceCustomerQuarter(date);
				else if(interval.equals("year"))
					metricsData = conPresto.topServiceCustomerYear(date);
				else
					System.out.println("customers interval not match ");
				}
				else
					System.out.println("Type not match ");
			}
			catch(SQLException e)
			{
				ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
				LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
				return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
			}
			catch(Exception e)	
			{
				ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
				LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
				return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
			}
			return metricsData;
		}
	
	@GET
	@Path("/topServicesInfo")
	@Produces({MediaType.APPLICATION_JSON})
	public String topServicesInfo(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("interval") String interval,@QueryParam("date") long date,@QueryParam("carrier") String carrier)
	{
		try
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(type.equals("carriers"))
				{
					if(interval.equals("today"))
						metricsData = conPresto.topServiceCarrierTodayInfo(date,carrier);
					else if(interval.equals("month"))
						metricsData = conPresto.topServiceCarrierMonthInfo(date,carrier);
					else if(interval.equals("quarter"))
						metricsData = conPresto.topServiceCarrierQuarterInfo(date,carrier);
					else if(interval.equals("year"))
						metricsData = conPresto.topServiceCarrierYearInfo(date,carrier);
					else
						System.out.println("carriers interval not match ");
				}
				else if(type.equals("customers"))
				{
					if(interval.equals("today"))
						metricsData = conPresto.topServiceCustomerToday(date);
					else if(interval.equals("month"))
						metricsData = conPresto.topServiceCustomerMonth(date);
					else if(interval.equals("quarter"))
						metricsData = conPresto.topServiceCustomerQuarter(date);
					else if(interval.equals("year"))
						metricsData = conPresto.topServiceCustomerYear(date);
					else
						System.out.println("customers interval not match ");
				}
				else
					System.out.println("Type not match ");
			}
			catch(SQLException e)
			{
				ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
				LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
				return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
			}
			catch(Exception e)
			{
				ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
				LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
				return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
			}
			return metricsData;
		}
		
	@GET
	@Path("/topOperators")
	@Produces({MediaType.APPLICATION_JSON})
	public String topOperators(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("type") String type,@QueryParam("date") long date)
	{
		try
		{
			System.out.println(date);
			conPresto = new ConnectPresto();
			conPresto.createConnection();
				if(type.equals("customer"))
					metricsData = conPresto.topOperatorsCustomer(date);
				else if(type.equals("carrier"))
					metricsData = conPresto.topOperatorsCarrier(date);
				else
					System.out.println(" no match intervel");
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: getCostFinancial , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	
	@GET
	@Path("/runQuery")
	@Produces({MediaType.APPLICATION_JSON})
	public String runQuery(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("query") String query)
	{
		try
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			metricsData = conPresto.runPrestoQueries(query);
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	

	@GET
	@Path("/runQueryPresto")
	@Produces({MediaType.APPLICATION_JSON})
	public String runQueryPresto(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("query") String query)
	{
		try
		{
			conPresto = new ConnectPresto();
			conPresto.createConnection();
			metricsData = conPresto.runPrestoQueries();
		}
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: loadServiceData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return metricsData;
	}
	

	@GET
	@Path("/Check")
	@Produces({MediaType.APPLICATION_JSON})
	public String checkMethod(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{		
		try 
		{
			Connection conn = new Connection("172.30.255.27");
			conn.connect();
			@SuppressWarnings("unused")
			boolean isauthenticated = conn.authenticateWithPassword("hadoop","Clpmis@d0");
				if ( isauthenticated=false)
					{
					System.out.println("Authentication failed");
					System.exit(1);
					}
			Session sess = conn.openSession();
			sess.execCommand("/usr/local/hadoop/hadoop-0.20.2-cdh3u5/bin/hadoop fs -ls "+feature);
			InputStream stdout = new StreamGobbler(sess.getStdout());
			@SuppressWarnings("resource")
			BufferedReader br = new BufferedReader(new InputStreamReader(stdout));
			List<String> ls = new ArrayList<String>();;
			LinkedHashMap<String, String> Lhm ;
			int i=0;
			while(true)
			{
				Lhm = new LinkedHashMap<String, String>();
				String line = br.readLine();
				if (line==null)
					{
						break;
					}
				if (i!=0)
					{		
						StringTokenizer st = new StringTokenizer(line);
					    String permissions = st.nextToken();
					    String type = st.nextToken();
					    String Owner = st.nextToken();
					    String group = st.nextToken();
					    String Size = st.nextToken();
					    String Date = st.nextToken();
					    String Time = st.nextToken();
					    String filename = st.nextToken();
						Lhm.put("filename",filename);
						Lhm.put("type",type);
						Gson gson = new Gson();
				        String json = gson.toJson(Lhm);
				        ls.add(json.replace("\\", ""));
					}
				else
					{
						i++;
					}
			}
			sess.close();
			conn.close();
			return "{\"results\":" + ls +  "}";
		}
		catch(Exception e)
		{
			System.out.println(e);
		}    
		return "Nodata";
	}
	
	
	@SuppressWarnings("null")
	@GET
	@Path("/getText")
	@Produces({MediaType.APPLICATION_JSON})
	public String getTextMethod(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("feature") String feature)
	{	
		try
		{
			Connection conn = new Connection("172.30.255.27");
			conn.connect();
			boolean isauthenticated = conn.authenticateWithPassword("hadoop","Clpmis@d0");
				if ( isauthenticated=false)
					{
						System.out.println("Authentication failed");
						System.exit(1);
					}
			Session sess = conn.openSession();
			sess.execCommand("/usr/local/hadoop/hadoop-0.20.2-cdh3u5/bin/hadoop fs -cat "+feature);
			InputStream stdout = new StreamGobbler(sess.getStdout());
			BufferedReader br = new BufferedReader(new InputStreamReader(stdout));
			List<String> ls = ls = new ArrayList<String>();;
			LinkedHashMap<String, String> Lhm ;
			String lineData="";
			while(true)
			{
				Lhm = new LinkedHashMap<String, String>();
				String line = br.readLine();
				if (line==null)
				{
					break;
				}
				lineData+=line.replace("\t", "").replace("\n", "").replace("\"", "").replace("(", "").replace(")", "");
			}
			Lhm.put("data",lineData);
			Gson gson = new Gson();
	        String json = gson.toJson(Lhm);
	        ls.add(json.replace("\\", ""));
			sess.close();
			conn.close();
			System.out.println("check");
			return "{\"results\":" + ls +  "}";
		}
		catch(Exception e)
		{
			System.out.println(e);
		}    
		return "Nodata";
	}

	@GET
	@Path("/checkemail")
	@Produces({MediaType.APPLICATION_JSON})
	public String checkEmail(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("email") String email)
	{
		String status = "";
		try
		{
			conCassandra = new ConnectCassandra();
			conCassandra.createConnection();
			status = conCassandra.checkemail(email);
			System.out.println("email status" +status);
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: checkEmail , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			LOGGER.error("CLASS: CallGoad, METHOD: checkEmail , ERROR :" + e.getMessage(),e);
		}
		return status;
	}
	
	@POST
	@Path("/signup")
	@Produces({MediaType.APPLICATION_JSON})
	public String signup(@FormParam("username") String username, @FormParam("password") String password, @FormParam("email") String email )
	{
		try	
		{
			System.out.println("username" +username);
			System.out.println("password" +password);
			conCassandra = new ConnectCassandra();
			conCassandra.createConnection();
			conCassandra.signuppage(username, password, email );
		}
	    catch(SQLException e)
	    {
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: signup , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			LOGGER.error("CLASS: CallGoad, METHOD: signup , ERROR :" + e.getMessage(),e);
			return e.getMessage();
		}
		return signupdata; 
	}
	
	
	@GET
	@Path("/checkUser")
	@Produces({MediaType.APPLICATION_JSON})
	public String checkUser(@DefaultValue("en_US") @QueryParam("langCode") String langCode,@QueryParam("email_id") String email,@QueryParam("password") String password)
	{
		try {
				conCassandra = new ConnectCassandra();
				conCassandra.createConnection();
				metricsData = conCassandra.checkUserValidation(email,password);
			} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS: CallGoad, METHOD: checkUserData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			LOGGER.error("CLASS: CallGoad, METHOD: checkUserData , ERROR :" + e.getMessage(),e);
		}
		return metricsData;
	}
	//-------------------------------@Sudheer-------------------------------
	@GET
	@Path("/login")
	@Produces({MediaType.APPLICATION_JSON})
	public String routeMap(@DefaultValue("en_US") @QueryParam("feature") String feature){
		try
		{
			con = new ConnectHive();
			con.createConnection();
			con.getGeoLocationData(feature);
			//rankData = con.();
		} 
		catch(SQLException e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_1003,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadRankData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		catch(Exception e)
		{
			ServiceCustomException hasce =  new ServiceCustomException().getBundledError(ErrorConstants.HA_2005,e.getMessage().toString());
			LOGGER.error("CLASS:callFMS, METHOD:loadRankData , ERROR :" + e.getMessage(),e);
			return hasce.getErrorJsonObject(hasce.getErrorCode(),hasce.getErrorMessage());
		}
		return rankData;
	}
	
}

