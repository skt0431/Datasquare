package com.inndata.services;

import java.sql.SQLException;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;

import com.dream.orbit.exceptions.ErrorConstants;
import com.dream.orbit.exceptions.ServiceCustomException;

@Path("/search")
public class GeoLocation
{
	private static final Logger LOGGER = Logger.getLogger(GeoLocation.class);
	public String output;
	private ConnectHive con;
	private ConnectPresto conPresto;
	private String rankData;
	

	
	@GET
	@Path("/rank")
	@Produces({MediaType.APPLICATION_JSON})
	public String loadRankData(@DefaultValue("en_US") @QueryParam("feature") String feature)
	{
		try
		{
			con = new ConnectHive();
			con.createConnection();
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
