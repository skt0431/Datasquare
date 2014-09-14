/**
 * @author vidyasagar.g DO-74
 */
$(document).ready(function() {
	//Default call to get table data and graph data at page load
	getGraphs("unique_visitors"); // call to get graph
	//Enabling all the JQPLot plugins
	$.jqplot.config.enablePlugins = true;

	// Add Capitalize prototype to String type
	String.prototype.capitalize = function() {
		    return this.charAt(0).toUpperCase() + this.slice(1);
	};
						
	// add Contains method to Array
	Array.prototype.contains = function(obj) {
			var i = this.length;
			while (i--) {
				if (this[i] == obj) {
					return true;
				}
			}
		return false;
	};
						
						
	//Function to Load the Graphs
	function getGraphs(feat) {
		$("#charts").empty();
		$("#charts").append('<div id="chart1" style="height: 250px;"></div>');
     	$("#charts").show();
	    $("#chart1").show();
	    alert(feat);
	    	/* ajax call to retrieve the data*/
		$.ajax({
			url : 'rest/search/activitygraphs?feature='+feat,
		    //data : {feature : feat},
			datatype : 'json',
			type : "GET",
			cache : false,
			success : function(data) {
					//Declaring all the required variables
				var tickss = [];         // x axis ticks for the graph
				var myPlotData = [ [] ];  // 2 dimensional array data for graph
				var myData = data;  
				var rendering;  // rendering value either bar or line 
				var yaxisHeight = 0;  // y axis range of the graph
				var legedLabels = [];
			
				/* Type of x axis ticks ,	Page types = type of the pages ,Brosers and Errors = date */
				
				// find out the x axis ticks for the page typse
				for ( var k = 0; k < myData.results.length; k++) {
					if (tickss.length == 0) {
						tickss.push(myData.results[k].pagetype);
					}
					if (!tickss.contains(myData.results[k].pagetype)) {
						tickss.push(myData.results[k].pagetype);
					}		
				}
						
				// since unique visitors hasuniquevisits 
				for ( var k = 0; k < myData.results.length; k++) {
					// finding maximum value 
					if( parseInt(yaxisHeight) < parseInt(myData.results[k].uniquevisits)){
						yaxisHeight = myData.results[k].uniquevisits;
					}
				}
				//Add 10%
				yaxisHeight = parseInt(yaxisHeight) + parseInt(yaxisHeight)/10;
				
												
				legedLabels = new Array();
				legedLabels.push(feat.capitalize());
				rendering = $.jqplot.LineRenderer;
				myPlotData[0] = new Array();
				for ( var i = 0; i < tickss.length; i++) {
					if (data.results[i]) {
						myPlotData[0].push([tickss[i],data.results[i].uniquevisits ]);
					}
				}
												
				// Jqplot for graphs
				plot1 = $jqplot("chart1",myPlotData,{
					// Turns on animation for all series in this plot.
					animate : true,
					// Will animate plot on calls to plot1.replot({resetAxes:true})
					animateReplot : true,
					seriesDefaults : {
							renderer : rendering,
							disableStack : true,//otherwise it wil be added to values of previous series
							lineWidth : 2,
							pointLabels : {
								show : false
							},
							markerOptions : {
								size : 5
							},
							pointLabels : {
								show : true
							},
							rendererOptions : {
								//Speed up the animation a little bit.
								//This is a number of milliseconds.  
									//Default for bar series is 3000.  
								animation : {
									speed : 2500
								},
								highlightMouseOver : true
							}
					},
					axesDefaults : {
						//	pad : 3,
						tickRenderer : $.jqplot.CanvasAxisTickRenderer,
					},
					axes : {
						// These options will set up the x axis like a category axis.
						xaxis : {
							renderer : $.jqplot.CategoryAxisRenderer,
							label : 'Date',
							tickOptions: {angle: -30}
						},
						yaxis : {
							labelOptions : {
								angle : 270
							},
							min:0,
							max: yaxisHeight, 
							numberTicks: 11
						},
					},
					legend : {
						labels : legedLabels,
						show : true,
						location : 'ne',
						placement : 'insideGrid'
					}
				});
	
			//	success section ends here 
				},
				error : function(xhr, data, statusText,errorThrown) {
						// log the error to the console
						console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
	}
});
