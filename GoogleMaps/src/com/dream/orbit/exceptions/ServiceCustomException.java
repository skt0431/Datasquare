/**
 * 
 */
package com.dream.orbit.exceptions;

/**
 * @author vidyasagar.g
 *
 */
import java.util.ResourceBundle;

public class ServiceCustomException {
	public final ResourceBundle errorBundle = ResourceBundle.getBundle("HA_ERROR");
	
	private String errorMessage;
	private String errorCode;
	private String errorType;
	
	public ServiceCustomException() {		
	}
	
	public ServiceCustomException getBundledError(String errorCode,String errorType) {
		this.errorCode = errorCode;
		this.errorType = errorType;
		this.errorMessage = errorBundle.getString(this.errorCode);
		return this;
	}
	
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public String getErrorType() {
		return errorType;
	}
	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}	
	public String getErrorJsonObject(String errorCode,String errorMessage){
		this.errorType = this.errorType.replace(":", "-");
		return "{\"error\":[{\"errorCode\":\""+errorCode+"\",\"errorMessage\":\""+errorMessage +" Detailed Error - "+this.errorType+"\"}]}";
	}
}
