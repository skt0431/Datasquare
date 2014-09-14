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
	
	
	$("#revcategory").change(function () {
		feat = $("#revcategory").val();
		LineCharts(feat);
	});	
	$("#costcategory").change(function () {
		period = $("#costcategory").val();
		BarCharts(period);
	});
	
	
	// initialize charts
	if (typeof charts != 'undefined') {
		var feat = "revenue_monthly";
		var period = "costbreakup_monthly";
		LineCharts(feat);
		BarCharts(period);
		console.log("Check It out");
		initialize();
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
	
	function LineCharts(feat){
		
		var costData = [], revenueData = [], profitData = [], xticks = [];
		$.ajax({
				url : 'rest/search/topcustomers?feature='+feat,
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					$("#charts").empty();
					$("#GetDataRevenue").empty();
					$("#charts").append('<div id="choices" style="text-align: center;"></div>');
					$("#charts").append('<div id="revenue"></div>');
					$("#charts").append('<div id="load" class="load2"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".load2").remove();
			    },
				success : function(sdata){
					
						for (var i = 0; i < sdata.results.length ; i++) {
							costData.push([i,parseInt(sdata.results[i].cost)]);
							revenueData.push([i,parseInt(sdata.results[i].revenue)]);
							profitData.push([i,parseInt(sdata.results[i].profit)]);
							//xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
							if(feat=="revenue_monthly"){
								xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
							} else if(feat=="revenvue_quarterly"){
								xticks.push([i,sdata.results[i].quarter+" "+sdata.results[i].year]);
							}else{
								xticks.push([i,sdata.results[i].year]);
							}
						}
						var lines=true,bars=false, dataSet=[{
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