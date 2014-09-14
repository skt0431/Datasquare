/* ==========================================================
 * ErgoAdmin v1.2
 * index.js
 * 
 * http://www.mosaicpro.biz
 * Copyright MosaicPro
 *
 * Built exclusively for sale @Envato Marketplaces
 * ========================================================== */ 

$(function()
{
	/* Notification */
	$('#content .filter-bar').after('<div id="content-notification"></div>');
	$('#content-notification').notyfy({
		text: '<h4>Welcome back Mr.Awesome!</h4><p>You have <strong>3,450</strong> unread messages. Click here to close the notification and see a dark color variation.</p>',
		type: 'default',
		layout: 'top',
		closeWith: ['click'],
		events: {
			hidden: function(){
				$('#content-notification').notyfy({
					text: '<h4>Welcome back Mr.Awesome!</h4><p>You have <strong>3,450</strong> unread messages. Click here to close the notification and see a primary color variation.</p>',
					type: 'dark',
					layout: 'top',
					closeWith: ['click'],
					events: {
						hidden: function(){
							$('#content-notification').notyfy({
								text: '<h4>Welcome back Mr.Awesome!</h4><p>You have <strong>3,450</strong> unread messages. You can click here to close me.</p>',
								type: 'primary',
								layout: 'top',
								closeWith: ['click']
							});
						}
					}
				});
			}
		}
	});
	
	var compareOne,compareTwo;
	$('#revcategory ul li a').live("click",function(){
//		console.log("check the value")
//		console.log("check the value"+$(this).attr("value"))
		$('#revcategory ul li').removeClass('primary');
		$(this).parent().addClass('primary');
	
		feat = $(this).attr("value");
		LineCharts(feat);
	});	
	
	$('#cargoStatus ul li a').live("click",function(){
		$('#cargoStatus ul li').removeClass('primary');
		$(this).parent().addClass('primary');
		feat = $(this).attr("value");
		Store("operationsTimeFrame",feat)
		cargoTable(feat);
		if(Retrieve("plotMapStat")=="true"){
			feat=Retrieve("operationsTimeFrame")
			MapMarkers(feat)
		}
	});	
		
	
	var interval="today",type="customers",Financial,Service;
	
	$('#serviceStatus ul li a').live("click",function(){
		$('#serviceStatus ul li').removeClass('primary');
		$(this).parent().addClass('primary');
		interval = $(this).attr("value");
		console.log(interval+"<<<>>>"+type)
		ServiceMetrics(interval,type);

	});	
	
	
	$("#serviceStatu").change(function () {
		type = $("#serviceStatu").val();
		console.log(interval+"<<<>>>"+type)
		ServiceMetrics(interval,type);
//		LineCharts(feat);
	});	
		
	$("#costcategory").change(function () {
		period = $("#costcategory").val();
		BarCharts(period);
	});
	
	$('#details').live("click",function(){
		console.log("View Details")
		$("#cargoStatus").show();
		$("#operations").show();
		$("#compareResults").hide();
		$("#maps").hide();
		$("#details").show();
		Store("plotMapStat","false")
	});	
	$('#plotMap').live("click",function(){
		console.log("Plot Map")
		$("#cargoStatus").show();
		$("#operations").show();
		$("#compareResults").hide();
		$("#maps").show();
		$("#details").hide();
		feat=Retrieve("operationsTimeFrame")
		Store("plotMapStat","true")
		MapMarkers(feat)
	});
	$('#compare').live("click",function(){
		$("#compareResults").show();
		$("#cargoStatus").hide();
		$("#operations").hide()
		cargoTableOne($("#part_one").val())
		compareTwo=MapId=setInterval(function(){cargoTableTwo($("#part_two").val())},1000);
		Store("plotMapStat","false")
	});
	
	$("#part_one").change(function () {
		$("#part_one_timeframe").text($("#part_one").val())
		cargoTableOne($("#part_one").val())
	});
	$("#part_two").change(function () {
		$("#part_two_timeframe").text($("#part_two").val())
		cargoTableTwo($("#part_two").val())
	});
	
	var id;
	
	// initialize charts
	if (typeof charts != 'undefined') {
		var feat = "today";
		var period = "costbreakup_monthly";
//		LineCharts("today");
		cargoTable("today");
		Store("operationsTimeFrame","today")
		Financial=setInterval(function(){LineCharts("today")},1000);
		Service=setInterval(function(){ServiceMetrics(interval,type)},2000);
//		ServiceMetrics(interval,type);
//		BarCharts(period);
		console.log("Check It out");
		charts.initIndex();

	}
		
		

	/*
	 * Chat widget
	 */
	if ($('.widget-chat').length)
	{
		$('.widget-chat form').submit(function(e)
		{
			e.preventDefault();
			
			var direction = $(this).parents('.widget-chat').find('.media:first blockquote').is('.pull-right') ? 'left' : 'right';
			var media = $(this).parents('.widget-chat').find('.media:first').clone();
			var message = $(this).find('[name="message"]');
			
			// prepare media
			media.hide();
			media.find('blockquote small a.strong').text('Mr.Awesome');
			
			// apply direction
			media.find('.media-body').removeClass('right').addClass(direction);
			media.find('blockquote').attr('class', '').addClass('pull-' + direction);
			media.find('.media-object').removeClass('pull-left pull-right').addClass('pull-' + direction);
			
			// apply message
			media.find('blockquote p').text(message.val());
			
			// reset input
			message.val('');
			
			// jump slimScroll to top
			$(this).parents('.widget-chat:first').find('.slim-scroll').slimScroll({ scrollTo: '0' });
			
			// insert media in the conversation
			$(this).parents('.widget-chat:first').find('.chat-items').prepend(media).find('.media:hidden').slideDown();
		});
	}
	
	if (Modernizr.touch)
		return;
	
	if (!$('#guided-tour').length || $('html').is('.lt-ie9'))
		return;
	
	// gritter Guided Tour notification
	setTimeout(function()
	{
		$.gritter.add({
			title: 'Guided Tour Available',
			text: "<strong>You can start our assisted Guided Tour</strong> any time, on any page, from the top right corner, so you can't miss on any of the cool stuff!",
			time: 5000,
			class_name: 'gritter-primary'
		});
	}, 3000);
	
	function MapMarkers(feat){
	 	var date = new Date().getTime()/1000;
//	 	console.log(Math.round(date));
		$.ajax({
				url : 'rest/search/getCargoMapInfo?interval='+feat+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					clearTimeout(id);
					console.log("done --> "+id)
				},
			    complete: function(){
			    	
			    },
				success : function(sdata){
					console.log(sdata);
					initialize()
					 var map,infowindow ;

					 infowindow = new google.maps.InfoWindow();
					 function initialize() {
						 console.log("map")
						 
						  var mapOptions = {
						    zoom:3,
						    center: new google.maps.LatLng(42.832322, -102.109375)
						  }
						  map = new google.maps.Map(document.getElementById('maps'),
						                                mapOptions);
					}
					 
					 
					 
					var value=0;
					id=setInterval(function(){
								markerIco();
							},1000);
					console.log(id)
					
//					for (var i = 0; i < sdata.results.length ; i++) {
////						
//						markerIco(sdata.results[value].status,sdata.results[value].code,sdata.results[value].count);
//					}
					
					function markerIc(){
						console.log();
					}
					
					function markerIco(){
						
						if(value<sdata.results.length){
							console.log("Value --> "+value+"Length --> "+sdata.results.length);
							var stat=sdata.results[value].status;
							var location=sdata.results[value].code;
							var count=sdata.results[value].count;
							
						
							  var geocoder = new google.maps.Geocoder();
						      geocoder.geocode({
						    	  'region':  'US',
						    	  'address': location
							   }, 
							   function(results, status) {
								   
								  console.log("Markers --> "+stat+" < > "+location+" < > "+status)
								   console.log(results)
							      if(status == google.maps.GeocoderStatus.OK) {
							    	  var marker = new google.maps.Marker({
							            position:results[0].geometry.location,
							            map: map,
							            icon: "img/"+stat+'.ico'
							         });
//							    	  infowindow.setContent(count+' '+stat); 
//							    	  infowindow.open(map,marker);
							         google.maps.event.addListener(marker, 'click', function() {
							    	     infowindow.setContent(count+' '+stat); 
							    	     infowindow.open(map,marker);
							    	  });
							         value++;
							      }
							     /* else {
						              // === if we were sending the requests to fast, try this one again and increase the delay
						              if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
						            	  //markerIco(image,location,count)
	//					            	  setTimeout('markerIco("'+image+'","'+location+'")', delay);
						            	  
	//					            	   markerIco(sdata.results[i].status,sdata.results[i].code,sdata.results[i].count);
						              } 
						            }*/
							   });
						}
					  	if(value>=sdata.results.length){
							clearTimeout(id);
							console.log("done --> "+id)
						}
					  }
						
						google.maps.event.addDomListener(window, 'load', initialize);
						
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	function ServiceMetrics(interval,type){
	 	var date = new Date().getTime()/1000;
	 	console.log(Math.round(date));
	 	$.ajax({
				url : 'rest/search/getTimeInfo?interval='+interval+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(Service);
			    },
			    complete: function(){
			    	
			    },
				success : function(sdata){
					$.ajax({
						url : 'rest/search/getTopPerformers?type='+type+'&interval='+interval+'&date='+Math.round(date),
						//data : {feature : feat},
						datatype : 'json',
						type : "GET",
						cache : false,
						beforeSend: function(){
							$("#topPerform").empty();
					    },
					    complete: function(){
					    	
					    },
						success : function(cdata){
							console.log(cdata.results)
							if(type=="customers"){
								var str = "<thead>" +
											"<tr>" +
												"<th class='center'>customer</th>" +
												"<th class='center'>cargo</th>" +
												"<th class='center'>cost</th>" +
											"</tr>" +
										"</thead>";
									str=str+"<tbody>"
									for (var i = 0; i < cdata.results.length && i<3 ; i++) {
										str=str+"<tr>" +
													"<th class='center'>"+
													cdata.results[i].customer+
													"</th>" +
													"<th class='center'>" +
													cdata.results[i].cargo+
													"</th>" +
													"<th class='center'>" +
													cdata.results[i].cost+
													"</th>" +
												"</tr>";
									}
									str=str+"</tbody>"
									$("#topPerform").append(str);
							}
							if(type=="carriers"){
								var str = "<thead>" +
											"<tr>" +
												"<th class='center'>Carrier</th>" +
												"<th class='center'>Shipments</th>" +
												"<th class='center'>Revenue</th>" +
												"<th class='center'>Profit</th>" +
											"</tr>" +
										"</thead>";
									str=str+"<tbody>";
									for (var i = 0; i < cdata.results.length && i<3; i++) {
										str=str+"<tr>" +
													"<th class='center'>"+
													cdata.results[i].carrier+
													"</th>" +
													"<th class='center'>" +
													cdata.results[i].cargo+
													"</th>" +
													"<th class='center'>" +
													cdata.results[i].revenue+
													"</th>" +
													"<th class='center'>" +
													cdata.results[i].profit+
													"</th>" +
												"</tr>";
									}
									str=str+"</tbody>"
									$("#topPerform").append(str);
							}
						},error : function(xhr, data, statusText,errorThrown) {
							// log the error to the console
							console.log("The following error occured: "+ statusText,errorThrown);
						}
					});
					
					if(sdata.results.length==1){
						console.log(sdata.results);
						var pickupper=parseInt((sdata.results[0].pickup/sdata.results[0].total)*100)
						
						$('.pickup').data('easyPieChart').update(pickupper);
						$('.pickup span').text(pickupper);
						var deliveryper=parseInt((sdata.results[0].dropin/sdata.results[0].total)*100)
						$('.dropin').data('easyPieChart').update(deliveryper);
						$('.dropin span').text(deliveryper);
						
						console.log(pickupper+"<<<<pd>>>>"+deliveryper);
						
						$('#leadTime').text(sdata.results[0].pickintime);
						$('#delivTime').text(sdata.results[0].dropintime);
					}
					else{
						$('.pickup').data('easyPieChart').update("NA");
						$('.pickup span').text("NA");
						$('.dropin').data('easyPieChart').update("NA");
						$('.dropin span').text("NA");
						$('#leadTime').text("NA");
						$('#delivTime').text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		
	}
	
	function cargoTable(feat){
	 	var date = new Date().getTime()/1000;
	 	console.log(Math.round(date));
		$.ajax({
				url : 'rest/search/getCargoInfo?interval='+feat+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					$("#imgStat").attr("src","img/spinners.gif")
			    },
			    complete: function(){
			    	
			    },
				success : function(sdata){
					if(sdata.results.length==1){
						console.log(sdata.results.length+" . . . .");
						$("#booked").text(sdata.results[0].bookings);
						$("#cancel").text(sdata.results[0].cancelled);
						$("#delivered").text(sdata.results[0].Delivered);
						$("#intransmit").text(sdata.results[0].Intransmit);
						$("#delivery").text(sdata.results[0].bookings);
						$("#exception").text(sdata.results[0].exception);
						var perOrder=parseInt(Math.floor((sdata.results[0].Delivered/sdata.results[0].bookings)*100));
						$("#orderPercent").text(perOrder);
						if(perOrder>25)
							$("#imgStat").attr("src","img/up.png")
						else
							$("#imgStat").attr("src","img/down.png")
					}
					else{
						$("#booked").text("NA");
						$("#cancel").text("NA");
						$("#intransmit").text("NA");
						$("#delivery").text("NA");
						$("#delivered").text("NA");
						$("#exception").text("NA");
						$("#orderPercent").text("NA");
						$("#imgStat").attr("src","img/spinners.gif")
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	function cargoTableOne(feat){
	 	var date = new Date().getTime()/1000;
	 	console.log(Math.round(date));
		$.ajax({
				url : 'rest/search/getCargoInfo?interval='+feat+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
			    },
			    complete: function(){
			    },
				success : function(sdata){
					if(sdata.results.length==1){
						console.log(sdata.results.length+" . . . .");
						$("#part_one_booked").text(sdata.results[0].bookings);
						$("#part_one_canceled").text(sdata.results[0].cancelled);
						$("#part_one_delivered").text(sdata.results[0].Delivered);
						$("#part_one_exceptions").text(sdata.results[0].exception);
						$("#part_one_intransit").text(sdata.results[0].Intransmit);
						$("#part_one_orders").text(sdata.results[0].Delivered);
						var perOrder=parseInt(Math.floor((sdata.results[0].Delivered/sdata.results[0].bookings)*100));
						$("#part_one_orders_percent").text(perOrder);
					}
					else{
						$("#part_one_booked").text("NA");
						$("#part_one_canceled").text("NA");
						$("#part_one_delivered").text("NA");
						$("#part_one_exceptions").text("NA");
						$("#part_one_intransit").text("NA");
						$("#part_one_orders").text("NA");
						$("#part_one_orders_percent").text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	function cargoTableTwo(feat){
	 	var date = new Date().getTime()/1000;
	 	console.log(Math.round(date));
		$.ajax({
				url : 'rest/search/getCargoInfo?interval='+feat+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(compareTwo)
			    },
			    complete: function(){
			    },
				success : function(sdata){
					if(sdata.results.length==1){
						$("#part_two_booked").text(sdata.results[0].bookings);
						$("#part_two_canceled").text(sdata.results[0].cancelled);
						$("#part_two_delivered").text(sdata.results[0].Delivered);
						$("#part_two_exceptions").text(sdata.results[0].exception);
						$("#part_two_intransit").text(sdata.results[0].Intransmit);
						$("#part_two_orders").text(sdata.results[0].Delivered);
						var perOrder=parseInt(Math.floor((sdata.results[0].Delivered/sdata.results[0].bookings)*100));
						$("#part_two_orders_percent").text(perOrder);
					}
					else{
						$("#part_two_booked").text("NA");
						$("#part_two_canceled").text("NA");
						$("#part_two_delivered").text("NA");
						$("#part_two_exceptions").text("NA");
						$("#part_two_orders").text("NA");
						$("#part_two_intransit").text("NA");
						$("#part_two_orders_percent").text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	function LineCharts(feat){
		
		var costData = [], revenueData = [], profitData = [], xticks = [];
		   var date = new Date().getTime()/1000;
		   console.log(Math.round(date*1000)); // Wrong result
		   		$.ajax({
				url : 'rest/search/getRevenue?interval='+feat+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(Financial);
					$("#charts").empty();
					$("#GetDataRevenue").empty();
					$("#charts").append('<div id="choices" style="text-align: center;"></div>');
					$("#charts").append('<div id="revenue"></div>');
					$("#charts").append('<div id="load" class="load2"><h4><img src="img/spinners.gif"><h4> </div>');
					
				
			    },
			    complete: function(){
			    	$(".load2").remove();
			    	//xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
			    	//xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
			    				    	
			   /*if(feat=="today" || feat=="yesterday"){
			    		//$("#charts").empty();
						//$('#charts').append('<div class="noData center"><br><br>No data</div>');
			    		xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
					}*/
			    },
				success : function(sdata){
					var totalCost=0,totalRevenue=0,totalProfit=0,lines=true,bars=false;
					console.log(sdata.results.length)
						if(sdata.results.length==1){
							lines=false,bars=true
						}
						var months = new Array('Jan', 'Feb',
							'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
							'Oct', 'Nov', 'Dec');						
								
						
						for (var i = 0; i < sdata.results.length ; i++) {
							/*totalCost+=parseInt(sdata.results[i].cost);
							totalRevenue+=parseInt(sdata.results[i].revenue);
							totalProfit+=parseInt(sdata.results[i].profit);*/
							
							costData.push([i,parseInt(sdata.results[i].cost)]);
							revenueData.push([i,parseInt(sdata.results[i].revenue)]);
							profitData.push([i,parseInt(sdata.results[i].profit)]);
							//xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
							
							
							/*
							if(feat=="monthly"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="weekly"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}*/
							//-------------------modified@Sudheer---------------
							if(feat=="today"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="yesterday"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
                            //------------------------------modified@sudheer-----------------------
							else if(feat=="weekly"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="monthly"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="quarterly"){
								xticks.push([i,"Q"+sdata.results[i].quarter+" "+sdata.results[i].year]);
							}
							else if(feat=="yearly"){
								xticks.push([i,months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="wtd"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="mtd"){
								xticks.push([i,sdata.results[i].day+" "+months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
							else if(feat=="ytd"){
								xticks.push([i,months[sdata.results[i].month-1]+" "+sdata.results[i].year]);
							}
						}
						/*console.log(totalCost+">><<"+totalRevenue+">><<"+totalProfit)
						
						$("#totalRevenue").text(totalRevenue);
						$("#totalCost").text(totalCost);
						$("#totalProfit").text(totalProfit);*/
						
						var dataSet=[{
			         			label: "Cost", 
			         			data: costData,
			         			points: {fillColor: "#058DC7"}, color: '#058DC7'
			         		}, 
			         		{	
			         			label: "Revenue", 
			         			data: revenueData,
			         			points: {fillColor: "#AA4643"}, color: '#AA4643'
			         		}, 
			         		{	
			         			label: "Profit", 
			         			data: profitData,
			         			points: {fillColor: "#50B432"}, color: '#50B432'
			         		}];
					
						$('#graphType a').removeClass('btn-primary');
						$('#graphType a').addClass('btn-inverse');
						$('.default').removeClass('btn-inverse').addClass('btn-primary');
						
						$('#graphType a').click(function() {
							if ($(this).attr("disabled") != "disabled") {
								if($(this).text()=="Bar"){
									lines=false;
									bars=true;
								}
								else if($(this).text()=="Line"){
									lines=true;
									bars=false;
								}
								$('#graphType a').removeClass('btn-primary');
								$('#graphType a').addClass('btn-inverse');
								$(this).removeClass('btn-inverse').addClass('btn-primary');
								plotAccordingToChoices();
							}
						});
						$.each(dataSet, function(key, val) {
							$("#choices").append("<input type='checkbox' name='" + key +
								"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
								+ val.label + "</input>" 
								);
						});
						GetDataRevenue();
						function GetDataRevenue(){
							html2canvas($('#charts'), {
								  onrendered: function(canvas) {
									  $("#GetDataRevenue").empty();
									  $("#GetDataRevenue").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getData"><span class="btn btn-block btn-default btn-icon glyphicons download_alt" style="width:120px;float:right"><i></i>Get Data</span></a>');
//									  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
								  }
								});
						}
						$("#choices").find("input").click(plotAccordingToChoices);

						
						plotAccordingToChoices();
						function plotAccordingToChoices() {
							
							var data = [];
							$("#choices").find("input:checked").each(function () {
								var key = $(this).attr("name");
								if (key && dataSet[key]) {
									data.push(dataSet[key]);
								}
							});

							if (data.length > 0) {

								this.plot = $.plot(
									'#revenue', 
									data,{
										grid: {
											show: true,
										    aboveData: true,
										    color: themerPrimaryColor,
										    labelMargin: 5,
										    axisMargin: 0, 
										    borderWidth: 0,
										    borderColor:null,
										    minBorderMargin: 5,
										    clickable: true, 
										    hoverable: true,
										    autoHighlight: true,
										    mouseActiveRadius: 20,
										    backgroundColor : { colors: ["transparent", "transparent"] }
										},
								        series: {
								        	grow: {active:true},
								            lines: {
							            		show: lines,
							            		fill: lines,
							            		lineWidth: 2,
							            		steps: false
							            	},
							            	bars: {
												show: bars,
												barWidth: 0.6
											},
								            points: {show:false}
								        },
								        legend: { position: "nw", backgroundColor: null, backgroundOpacity: 0 },
								        yaxis: {
								        	tickFormatter : function(v, axis) {
												return '$ '+v.toFixed(axis.tickDecimals);
											},
								        },
								        xaxis: {labelAngle : -70,
								        	ticks:xticks},
								        colors: [],
								        shadowSize:1,
								        tooltip: true,
										tooltipOpts: {
											content: "%s : $ %y",
											shifts: {
												x: -30,
												y: -50
											},
											defaultTheme: false
										}
									});
							}
							GetDataRevenue();
						}
					
			},error : function(xhr, data, statusText,errorThrown) {
				// log the error to the console
				console.log("The following error occured: "+ statusText,errorThrown);
			}
		});
	}
	
	function BarCharts(period){
		$("#service_table").empty();
		$("#service_table").append('<div id="Servicechoices" style="text-align: center;"></div>');
		$("#service_table").append('<div id="services" style="height:270px;width:100%;"></div>');
		$.ajax({
				url : 'rest/search/topcustomers?feature='+period,
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
//					$("#service_table").append('<div id="load" style="text-align:center;"><h4><img src="img/spinners.gif" height="24" width="24"><h4> </div>');
					$("#service_table").append('<div id="load" class="load2"><h4><img src="img/spinners.gif"> <h4> </div>');
			    },
			    complete: function(){
			    	$(".load2").remove();
			    },
				success : function(data){
					var s1=[],s2=[],s3=[],s4=[],s5=[];
					s6=[];
					if(period=="costbreakup_monthly"){
						//val=Math.floor($('#main').width()/100);
						for (var i = 0; i < data.results.length; i++) {
							s5.push([i,data.results[i].month+' '+data.results[i].year]);
							s6.push(data.results[i].month+' '+data.results[i].year);
						}
					}
					else if(period=="costbreakup_quarterly"){
						for (var i = 0; i < data.results.length; i++) {
							s5.push([i,data.results[i].quarter+' '+data.results[i].year]);
							s6.push(data.results[i].quarter+' '+data.results[i].year);
						}
					}
					else if(period=="costbreakup_yearly"){
						for (var i = 0; i < data.results.length; i++) {
							s5.push([i,data.results[i].year]);
							s6.push(data.results[i].year);
						}
					}
					for (var i = 0; i < data.results.length; i++) {
						s1.push([i,parseInt(data.results[i].cost)]);
						s2.push([i,parseInt(data.results[i].freight)]);
						s3.push([i,parseInt(data.results[i].fuel)]);
						s4.push([i,parseInt(data.results[i].labour)]);
					}
					var dataSet=[{
	         			label: "Cost", 
	         			data: s1,
	         			points: {fillColor: "#058DC7"}, color: '#058DC7'
	         		}, 
	         		{	
	         			label: "Freight", 
	         			data: s2,
	         			points: {fillColor: "#AA4643"}, color: '#AA4643'
	         		}, 
	         		{	
	         			label: "Fuel", 
	         			data: s3,
	         			points: {fillColor: "#50B432"}, color: '#50B432'
	         		}, 
	         		{	
	         			label: "Labour", 
	         			data: s4,
	         			points: {fillColor: "orange"}, color: 'orange'
	         		}]
					var lines=true,bars=false;
						
					
						$('#ServicegraphType a').removeClass('btn-primary');
						$('#ServicegraphType a').addClass('btn-inverse');
						$('.default').removeClass('btn-inverse').addClass('btn-primary');
						$('#ServicegraphType a').click(function() {
							
							if ($(this).attr("disabled") != "disabled") {
								if($(this).text()=="Bar"){
									lines=false;
									bars=true;
								}
								else if($(this).text()=="Line"){
									lines=true;
									bars=false;
								}
								$('#ServicegraphType a').removeClass('btn-primary');
								$('#ServicegraphType a').addClass('btn-inverse');
								$(this).removeClass('btn-inverse').addClass('btn-primary');
								plotAccordingToChoices();
							}

						});
						$.each(dataSet, function(key, val) {
							$("#Servicechoices").append("<input type='checkbox' name='" + key +
								"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: "+val.color+";'>"
								+ val.label + "</input>" 
								);
						});
						
							
						$("#Servicechoices").find("input").click(plotAccordingToChoices);
						GetData();
						function GetData(){
							html2canvas($('#services'), {
								  onrendered: function(canvas) {
									  $("#GetDataServiceTable").empty();
									  $("#GetDataServiceTable").append('<a href="'+canvas.toDataURL()+'" download="Cost Breakups '+period.split("_")[1]+'.png" class="getData"><span class="btn btn-block btn-default btn-icon glyphicons download_alt" style="width:120px;float:right"><i></i>Get Data</span></a>');
//									  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
								  }
								});
						}
						
						plotAccordingToChoices()
						function plotAccordingToChoices() {
							
							var data = [];
							$("#Servicechoices").find("input:checked").each(function () {
								var key = $(this).attr("name");
								if (key && dataSet[key]) {
									data.push(dataSet[key]);
								}
							});
							console.log(data.length)
							if (data.length > 0) {

								this.plot = $.plot(
									'#services', 
									data,{
										grid: {
											show: true,
										    aboveData: true,
										    color: themerPrimaryColor,
										    labelMargin: 5,
										    axisMargin: 0, 
										    borderWidth: 0,
										    borderColor:null,
										    minBorderMargin: 5 ,
										    clickable: true, 
										    hoverable: true,
										    autoHighlight: true,
										    mouseActiveRadius: 20,
										    backgroundColor : { colors: ["transparent", "transparent"] }
										},
								        series: {
								        	grow: {active:true},
								            lines: {
							            		show: lines,
							            		fill: lines,
							            		lineWidth: 2,
							            		steps: false
							            	},
							            	bars: {
												show: bars,
												barWidth: 0.6
											},
								            points: {show:false}
								        },
								        legend: { position: "nw", backgroundColor: null, backgroundOpacity: 0 },
								        yaxis: {
								        	tickFormatter : function(v, axis) {
												return '$ '+v.toFixed(axis.tickDecimals);
											},
										},
								        xaxis: {labelAngle : -30,
								        	ticks:s5},
								        colors: [],
								        shadowSize:1,
								        tooltip: true,
										tooltipOpts: {
											content: "%s : $ %y",
											shifts: {
												x: -30,
												y: -50
											},
											defaultTheme: false
										}
									});
							}
							GetData();
						}
			},error : function(xhr, data, statusText,errorThrown) {
				// log the error to the console
				console.log("The following error occured: "+ statusText,errorThrown);
			}
		});
	}
});