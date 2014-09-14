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
	
	
	var detailTimeStats="chart",detailChartStats="chart",date1 = new Date().getTime()/1000,GridStr="";
	$('#gridType li a').live("click",function(){
		type=$(this).attr("value")
		Store("type",type)
		getGridStatus()
	});
	
	$('#gridTimeFrame li a').live("click",function(){
		interval=$(this).attr("value")
		Store("interval",interval)
		getGridStatus()
	});
	
	$('#topService tr th a').live("click",function(){
		console.log($(this).attr("value"))
		getCarrierInfo($(this).attr("value"))
	});
	
	$('#gridView').live("click",function(){
		Store("grid","true")
		$("#topService").show()
		$("#topServiceDetails").hide()
	});
	
	$('#exportGridStats').live("click",function(){
		if(Retrieve("grid")=="true"){
			tableToExcel("topService",Retrieve("type"));
		}
		else if(Retrieve("grid")=="false"){
			tableToExcel("gridDetails",Retrieve("type"));
		}
//		gridDetails
	});
	
	$('#printGridStats').click(function() {
		
		console.log("Printing the text"+GridStr)
		var printWindow = window.open('', 'On Time Statistics');
        printWindow.document.write('<html><head><title>'+Retrieve("type")+'</title>');
        printWindow.document.write('</head><body ><div>');
		printWindow.document.write(GridStr);
		printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.print();
	});
	
	$('#detailTimeStats').live("click",function(){
		if(detailTimeStats=="chart"){
			detailTimeStats="pie"
			$('#detailTimeStats a span').text("Back to  On Time Data")
			$('#detailTimeStats').removeClass("pie_chart")
			$('#detailTimeStats').addClass("charts")
			onTimeStatisticsPie()
		}else{
			detailTimeStats="chart"
			$('#detailTimeStats a span').text("Resons For Delay")
			$('#detailTimeStats').addClass("pie_chart")
			$('#detailTimeStats').removeClass("charts")
			onTimeStatisticsGraph()
			//onTimeStatisticsType
		}
		
	});
	
	$('#detailChartStats').live("click",function(){
		console.log(detailChartStats)
		if(detailChartStats=="chart"){
			detailChartStats="pie"
			$('#detailChartStats a span').text("Back to  On Time Data")
			$('#detailChartStats').removeClass("pie_chart")
			$('#detailChartStats').addClass("charts")
			cycleTimeStatisticsPie()
		}else{
			detailChartStats="chart"
			$('#detailChartStats a span').text("Resons For Delay")
			$('#detailChartStats').addClass("pie_chart")
			$('#detailChartStats').removeClass("charts")
			cycleTimeStatisticsGraph()
			//cycleTimeStatisticsPie
		}
		
	});
	
	var months = new Array('Jan', 'Feb',
			'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
			'Oct', 'Nov', 'Dec'),checkId,cycleId,gridId;
	
	
	// initialize charts
	if (typeof charts != 'undefined') {
		
		var feat = "monthly";
		var period = "costbreakup_monthly";
//		LineCharts(feat);
//		BarCharts(feat)
	 	var date = new Date().getTime()/1000;
	 	console.log(Math.round(date*1000));
	 	Store("type","customers")
	 	Store("interval","today")
	 	$('#datepicker1')
		.datepicker(
				{	
					//Date Format
					dateFormat : "d MM yy",
					//Whether the Month should be rendered as a dropdown instead of text.
					maxDate: 0,
					//showOn: "both",
					showOn: "button",
					buttonImage: "img/calendar.png",
					buttonImageOnly: true,
					buttonText:"Select date",
					defaultDate: 0,
					//When the datepicker calendar select the date
					onSelect : function(dateText, obj) {
						console.log($("#datepicker1").val())
						$("#timestamp").text($("#datepicker1").val())
						var dte = new Date($("#datepicker1").val());
						dte.setTime(dte.getTime()- dte.getTimezoneOffset()*60*1000);
						console.log(dte.toLocaleString());
						date = Date.parse(dte.toLocaleString())/1000;
						getCurrentStatus(date)
					},
					//When the datepicker close the calendar
					onClose : function(dateText, obj) {
						
					}

				});
	 	var months = new Array('January', 'February',
	 			'March', 'April', 'May', 'June', 'July', 'August', 'September',
	 			'October', 'November', 'December');
	 	today=new Date();
	 		$('#datepicker1').val(
	 				today.getDate() + ' '
	 				+ months[today.getMonth()] + ' '
	 				+ today.getFullYear());
	 		
		getCurrentStatus(date)

		$("#onTimeStatisticsCharts").append('<div id="load" class="load2"><h4><img src="img/spinners.gif"><h4> </div>');
		$("#cycleTimeStatisticsCharts").append('<div id="load" class="load3"><h4><img src="img/spinners.gif"><h4> </div>');
		/*service tab*/
		checkId=setInterval(function(){onTimeStatisticsGraph(date)},1500);
		cycleId=setInterval(function(){cycleTimeStatisticsGraph(date)},2500);
		
		gridId=setInterval(function(){getGridStatus()},3500);
		
		/*cargoTable(feat);
		ServiceMetrics(interval,type);*/
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
	
	/*function tableToExcel() {
		console.log("table To Excel");
		var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>', base64 = function(
				s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		}, format = function(s, c) {
			return s.replace(/{(\w+)}/g, function(m, p) {
				return c[p];
			});
		}
		return function("#CostTable", "Cost") {
			if (!table.nodeType)
				table = document.getElementById(table)
			var ctx = {
				worksheet : name || 'Worksheet',
				table : table.innerHTML
			}
			window.location.href = uri + base64(format(template, ctx))
		}
		
	}*/

	function getCurrentStatus(date){
		console.log("getCurrentStatus")
		$.ajax({
				url : 'rest/search/getCurrentServices?date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					
			    },
			    complete: function(){
			    	
			    },
				success : function(sdata){
					//{"results":[{"customer":"bca","carrier":"UPS","pickup":"3","dropin":"0","total":"5"}]}
					
					if(sdata.results.length==1){
						
						$("#topCarrier").text(sdata.results[0].carrier);
						$("#topCustomer").text(sdata.results[0].customer);
						
						var onTimePickup=parseInt((sdata.results[0].pickup/sdata.results[0].total)*100)
						$(".onTimePickup_percent_one").data('easyPieChart').update(onTimePickup);
						$("#onTimePickup_percent_two").text(onTimePickup);
						
						var onTimedropin=parseInt((sdata.results[0].dropin/sdata.results[0].total)*100)
						$(".onTimeDelivery_percent_one").data('easyPieChart').update(onTimedropin);
						$("#onTimeDelivery_percent_two").text(onTimedropin);
						
						var avgLead="NA"
						if(sdata.results[0].pickup!=0)
							avgLead=parseInt((sdata.results[0].total/sdata.results[0].pickup)*100)/100
						$("#avgLeadTime").text(avgLead+' days');
						
						
						var avgReturn="NA"
						if(sdata.results[0].dropin!=0)
							avgReturn=parseInt((sdata.results[0].total/sdata.results[0].dropin)*100)/100
						$("#avgReturnTime").text(avgReturn+' days');
					}
					else{
						console.log(sdata.results.length+" . . . .");
						$("#topCarrier").text("NA");
						$("#topCustomer").text("NA");
						$("#avgReturnTime").text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
		
	function getCarrierInfo(carrier){
		var current = new Date().getTime()/1000;
		var type=Retrieve("type")
		var interval=Retrieve("interval")
		console.log("getCurrentStatus")
		$.ajax({
				url : 'rest/search/topServicesInfo?type='+type+'&interval='+interval+'&carrier='+carrier+'&date='+Math.round(current),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					GridStr=''
					Store("grid","false")
					$("#gridDetails").remove();
					$("#topServiceDetails").append('<table id="gridDetails" style="display:none"></table>')
					//-----------@Sudheer--------
					//$("#topService").show();
					$("#topService").hide();
					$("#topServiceDetails").show();
					
					
					$("#company").text("NA");
					$("#rank").text("NA");
					$("#carrierName").text("NA");
					$("#shipments").text("NA");
					$("#spend").text("NA");
					$("#proft").text("NA");
					$("#gmt").text("NA");
					$("#aloh").text("NA");
					$("#awt").text("NA");
					$("#acl").text("NA");
					$("#otpickup").text("NA");
					$("#otdropin").text("NA");
					$("#dbe").text("NA");
					$("#custCount").text("NA");
				},
			    complete: function(){
					
			    },
				success : function(sdata){
					if(sdata.results.length==1){
						
						$("#company").text(sdata.results[0].company);
						$("#rank").text("# "+sdata.results[0].rank);
						$("#carrierName").text(sdata.results[0].carrier);
						$("#shipments").text(sdata.results[0].shipments);
						$("#spend").text("$ "+sdata.results[0].spend);
						$("#proft").text("$ "+sdata.results[0].profit);
						$("#gmt").text(sdata.results[0].gmt);
						$("#aloh").text(sdata.results[0].aloh+" miles");
						$("#awt").text(sdata.results[0].awt+" lbs");
						$("#acl").text(sdata.results[0].acl);
						
						var OTpickup=parseInt((sdata.results[0].pickup/sdata.results[0].shipments)*100)
						$("#otpickup").text(OTpickup+" %");
						
						var OTdropin=parseInt((sdata.results[0].dropin/sdata.results[0].shipments)*100)
						$("#otdropin").text(OTdropin+" %");
						
						$("#dbe").text(sdata.results[0].dbe);
						$("#custCount").text(sdata.results[0].customer);
					
						$("#gridDetails").append('<tr>'+
								'<th class="center"> Company </th><td class="center">'+sdata.results[0].company+
								'</td></tr><tr><th class="center"> Rank </th><td class="center"> #'+sdata.results[0].rank+
								'</td></tr><tr><th class="center"> Carrier </th><td class="center">'+sdata.results[0].carrier+
								'</td></tr><tr><th class="center"> Shipments </th><td class="center">'+sdata.results[0].shipments+
								'</td></tr><tr><th class="center"> Spend </th><td class="center">$ '+sdata.results[0].spend+
								'</td></tr><tr><th class="center"> Profit </th><td class="center">$ '+sdata.results[0].profit+
								'</td></tr><tr><th class="center"> GMT </th><td class="center">'+sdata.results[0].gmt+
								'</td></tr><tr><th class="center"> Avg.LOH </th><td class="center">'+sdata.results[0].aloh+
								' miles</td></tr><tr><th class="center"> Avg.WT </th><td class="center">'+sdata.results[0].awt+
								' lbs</td></tr><tr><th class="center"> Avg.CL </th><td class="center">'+sdata.results[0].acl+
								'</td></tr><tr><th class="center"> On Time Pickup (%) </th><td class="center">'+OTpickup+
								' %</td></tr><tr><th class="center"> In Time Delivery (%) </th><td class="center">'+OTdropin+
								' %</td></tr><tr><th class="center"> DBE </th><td class="center">'+sdata.results[0].dbe+
								'</td></tr><tr><th class="center"> # of Customers </th><td class="center">'+sdata.results[0].customer+'</tr>');
								
						GridStr='<table border="1"   style="text-align:center;width: 100%;"><tr>'+
							'<th class="center"> Company </th><td class="center">'+sdata.results[0].company+
							'</td></tr><tr><th class="center"> Rank </th><td class="center"> #'+sdata.results[0].rank+
							'</td></tr><tr><th class="center"> Carrier </th><td class="center">'+sdata.results[0].carrier+
							'</td></tr><tr><th class="center"> Shipments </th><td class="center">'+sdata.results[0].shipments+
							'</td></tr><tr><th class="center"> Spend </th><td class="center">$ '+sdata.results[0].spend+
							'</td></tr><tr><th class="center"> Profit </th><td class="center">$ '+sdata.results[0].profit+
							'</td></tr><tr><th class="center"> GMT </th><td class="center">'+sdata.results[0].gmt+
							'</td></tr><tr><th class="center"> Avg.LOH </th><td class="center">'+sdata.results[0].aloh+
							' miles</td></tr><tr><th class="center"> Avg.WT </th><td class="center">'+sdata.results[0].awt+
							' lbs</td></tr><tr><th class="center"> Avg.CL </th><td class="center">'+sdata.results[0].acl+
							'</td></tr><tr><th class="center"> On Time Pickup (%) </th><td class="center">'+OTpickup+
							' %</td></tr><tr><th class="center"> In Time Delivery (%) </th><td class="center">'+OTdropin+
							' %</td></tr><tr><th class="center"> DBE </th><td class="center">'+sdata.results[0].dbe+
							'</td></tr><tr><th class="center"> # of Customers </th><td class="center">'+sdata.results[0].customer+'</tr></table>';
					}
					else{
						$("#company").text("NA");
						$("#rank").text("NA");
						$("#carrierName").text("NA");
						$("#shipments").text("NA");
						$("#spend").text("NA");
						$("#proft").text("NA");
						$("#gmt").text("NA");
						$("#aloh").text("NA");
						$("#awt").text("NA");
						$("#acl").text("NA");
						$("#otpickup").text("NA");
						$("#otdropin").text("NA");
						$("#dbe").text("NA");
						$("#custCount").text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	function getGridStatus(){
		var current = new Date().getTime()/1000;
		var type=Retrieve("type")
		var interval=Retrieve("interval")
		console.log("getCurrentStatus")
		$.ajax({
				url : 'rest/search/topServices?type='+type+'&interval='+interval+'&date='+Math.round(current),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					Store("grid","true")
					GridStr=""
					GridStr='<table border="1"   style="text-align:center;width: 100%;">'
					window.clearTimeout(gridId);	
					$("#topService").empty()
					$("#topService").show()
					$("#topServiceDetails").hide()
					
				},
			    complete: function(){
			    	
			    },
				success : function(sdata){
					
					if(type=="customers"){
						totalRev=0,totalProfit=0;
						GridStr+='<thead><tr><th class="center">Name</th><th class="center">Shipments</th><th class="center">Revenue</th><th class="center"> Revenue % of Total </th><th class="center">Profit</th><th class="center">Profit % of Total</th></tr>	</thead>';
						$("#topService").append('<thead><tr><th class="center">Name</th><th class="center">Shipments</th><th class="center">Revenue</th><th class="center"> Revenue % of Total </th><th class="center">Profit</th><th class="center">Profit % of Total</th></tr>	</thead>')
						for(var i=0 ;i<sdata.results.length;i++){
							totalRev+=parseInt(sdata.results[i].revenue);
							totalProfit+=parseInt(sdata.results[i].profit);
						}
						for(var i=0 ;i<sdata.results.length;i++){
							GridStr+='<tr><th class="center">'+
									sdata.results[i].customer+
									'</th><th class="center">'+
									sdata.results[i].shipments+
									'</th><th class="center">$ '+
									sdata.results[i].revenue+
									'</th><th class="center">'+
									parseInt((parseInt(sdata.results[i].revenue)/totalRev)*100)+
									' %</th><th class="center">$ '+
									sdata.results[i].profit+
									'</th><th class="center">'+
									parseInt((parseInt(sdata.results[i].profit)/totalProfit)*100)+
									' %</th></tr>';
							$("#topService").append('<tr><th class="center">'+
									sdata.results[i].customer+
									'</th><th class="center">'+
									sdata.results[i].shipments+
									'</th><th class="center">$ '+
									sdata.results[i].revenue+
									'</th><th class="center">'+
									parseInt((parseInt(sdata.results[i].revenue)/totalRev)*100)+
									' %</th><th class="center">$ '+
									sdata.results[i].profit+
									'</th><th class="center">'+
									parseInt((parseInt(sdata.results[i].profit)/totalProfit)*100)+
									' %</th></tr>')
						}
					}
					if(type=="carriers"){
						totalRev=0,totalProfit=0;
						GridStr+='<thead><tr><th class="center">Name</th><th class="center">Shipments</th><th class="center">Spend </th><th class="center"> Profit </th><th class="center">Avg. LOH </th><th class="center"> # of Customers</th></tr>	</thead>'
						$("#topService").append('<thead><tr><th class="center">Name</th><th class="center">Shipments</th><th class="center">Spend </th><th class="center"> Profit </th><th class="center">Avg. LOH </th><th class="center"> # of Customers</th></tr>	</thead>')
						for(var i=0 ;i<sdata.results.length;i++){
							GridStr+='<tr><th class="center">'+
								sdata.results[i].carrier+
								'</th><th class="center">'+
								sdata.results[i].shipments+
								'</th><th class="center">$ '+
								sdata.results[i].spend+
								'</th><th class="center">$ '+
								sdata.results[i].profit+
								'</th><th class="center">'+
								sdata.results[i].aloh+
								'</th><th class="center">'+
								sdata.results[i].customer+
								'</th></tr>'
							$("#topService").append('<tr><th class="center"><a value="'+
									sdata.results[i].carrier+
									'">'+
									sdata.results[i].carrier+
									'</th><th class="center">'+
									sdata.results[i].shipments+
									'</th><th class="center">$ '+
									sdata.results[i].spend+
									'</th><th class="center">$ '+
									sdata.results[i].profit+
									'</th><th class="center">'+
									sdata.results[i].aloh+
									'</th><th class="center">'+
									sdata.results[i].customer+
									'</th></tr>')
						}
					}
					
					
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	
	function onTimeStatisticsGraph(){
		var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
		$.ajax({
				url : 'rest/search/getOnTimeStatistics?type=chart&date='+Math.round(date1),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(checkId);
					var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
					$("#onTimeStatisticsCharts").empty();
					$("#status").empty();
					$("#status").append('<ul class="span6 center" id="onTimeStatisticsType"><li class="center span6"><a href="#" style="width: 100%" class="activeType">Line</a></li><li class="center span5"><a href="#" style="width: 100%">Bar</a></li></ul>'+
								'<div class="span5" style="float: right;"><div id="GetTimeStats" style="float: left;"><span class="btn btn-block btn-default btn-icon glyphicons download_alt"	style="width: 120px; float: right"><i></i>Get Data</span></div><a href="#" id="exportTimeStats"><img src="img/excel.ico" style="height: 25px; padding: 0px 15px 0px 15px;"></i></a><a '+
								'href="#" id="printTimeStats"><img src="img/print.png" style="height: 25px"></i></a></div>')
					$("#onTimeStatisticsCharts").append('<div id="choices" style="text-align: center;"></div>');
					$("#onTimeStatisticsCharts").append('<div id="onTimeStatistics" style="height:250px"></div>');
					$("#onTimeStatisticsCharts").append('<div id="exportChart" style="display:none;"><table id="onTimeStatisticsTable"></table></div><div id="printChart" style="display:none;"></div>');
					$("#onTimeStatisticsCharts").append('<div id="load" class="load2"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".load2").remove();
			    },
				success : function(sdata){
//					costTableStr+='<thead><tr><th class="center">Quarter</th>	<th class="center">Year</th><th class="center">pickup</th><th class="center">dropin</th><th class="center">Total</th></tr>	</thead>'
					console.log(sdata)
					var pickUp=[],dropIn=[],xticks=[],lines=true,bars=false;
					TableStr+='<thead><tr><th class="center">Quarter</th><th class="center">Year</th><th class="center">On time Pickup</th><th class="center"> On time Delivery </th><th class="center">Total Booking</th><th class="center">On time Pickup (%)</th><th class="center"> On time Delivery (%)</th></tr>	</thead>';
					$("#onTimeStatisticsTable").append('<thead><tr><th class="center">Quarter</th><th class="center">Year</th><th class="center">On time Pickup</th><th class="center"> On time Delivery </th><th class="center">Total Booking</th><th class="center">On time Pickup (%)</th><th class="center"> On time Delivery (%)</th></tr>	</thead>');
						if(sdata.results.length==1){
							lines=false,bars=true
						}
						for (var i = 0; i < sdata.results.length ; i++) {
							TableStr+='<tr><th class="center">'+
									'Q'+sdata.results[i].quarter+
									'</th><th class="center">'+
									sdata.results[i].year+
									'</th><th class="center">'+
									sdata.results[i].pickup+
									'</th><th class="center">'+
									sdata.results[i].dropin+
									'</th><th class="center">'+
									sdata.results[i].total+
									'</th><th class="center">'+
									parseInt((sdata.results[i].pickup/sdata.results[i].total)*100)+
									' %</th><th class="center">'+
									parseInt((sdata.results[i].dropin/sdata.results[i].total)*100)+
									' %</th></tr>'
							$("#onTimeStatisticsTable").append('<tr><th class="center">'+
									'Q'+sdata.results[i].quarter+
									'</th><th class="center">'+
									sdata.results[i].year+
									'</th><th class="center">'+
									sdata.results[i].pickup+
									'</th><th class="center">'+
									sdata.results[i].dropin+
									'</th><th class="center">'+
									sdata.results[i].total+
									'</th><th class="center">'+
									parseInt((sdata.results[i].pickup/sdata.results[i].total)*100)+
									' %</th><th class="center">'+
									parseInt((sdata.results[i].dropin/sdata.results[i].total)*100)+
									' %</th></tr>');
							pickUp.push([i,parseInt((sdata.results[i].pickup/sdata.results[i].total)*100)]);
							dropIn.push([i,parseInt((sdata.results[i].dropin/sdata.results[i].total)*100)]);
							xticks.push([i,"Q"+sdata.results[i].quarter+' '+sdata.results[i].year]);
							
						}
						
						TableStr+='</table>'
						var dataSet=[{
			         			label: "On time Pickup ", 
			         			data: pickUp,
			         			points: {fillColor: "#058DC7"}, color: '#058DC7'
			         		}, 
			         		{	
			         			label: "On time Delivery ", 
			         			data: dropIn,
			         			points: {fillColor: "#AA4643"}, color: '#AA4643'
			         		}];
						
						$.each(dataSet, function(key, val) {
							$("#choices").append("<input type='checkbox' name='" + key +
								"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
								+ val.label + "</input>" 
								);
						});
						
						function CostType(){
							if($("#onTimeStatisticsType li a.activeType").text()=="Bar"){
								lines=false;
								bars=true;
							}
							else if($("#onTimeStatisticsType li a.activeType").text()=="Line"){
								lines=true;
								bars=false;
							}
						}
						CostType()
						$('#onTimeStatisticsType li a').click(function() {
							console.log($(this).text())
								if($(this).text()=="Bar"){
									lines=false;
									bars=true;
								}
								else if($(this).text()=="Line"){
									lines=true;
									bars=false;
								}
								$('#onTimeStatisticsType li a').removeClass('activeType');
								$(this).addClass('activeType');
//								$(this).removeClass('btn-inverse').addClass('btn-primary');
								plotAccordingToChoices();
						});
						GetPrintData();
						function GetPrintData(){
							html2canvas($('#onTimeStatistics'), {
								  onrendered: function(canvas) {
									  $("#printChart").empty();
									  $("#printChart").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getData"><span class="btn btn-block btn-default btn-icon glyphicons download_alt" style="width:120px;float:right"><i></i>Get Data</span></a>');
//									  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
								  }
								});
						}
						
						$('#GetTimeStats').click(function() {
//							 get data Pop up the data in table format
						        var myWindow = window.open("","","");
						        myWindow.document.write(TableStr);
						});	

						$('#exportTimeStats').click(function() {
							console.log("Export Table data")
							tableToExcel("onTimeStatisticsTable","on Time Statistics Table");
						});
						
						$('#printTimeStats').click(function() {
							console.log("Printing the text")
							var printWindow = window.open('', 'On Time Statistics');
					        printWindow.document.write('<html><head><title>On Time Statistics</title>');
					        printWindow.document.write('</head><body ><img src=\'');
					        printWindow.document.write($("#printChart a").attr("href"));
					        printWindow.document.write('\' /><br><br><div>');
							printWindow.document.write(TableStr);
							printWindow.document.write('</div></body></html>');
					        printWindow.document.close();
					        printWindow.print();
//					        get data Pop up the data in table format
					       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
					        myWindow.document.write(costTableStr);*/
						});
						
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
									'#onTimeStatistics', 
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
//								        	stack: true,
									    	grow: {
												active: true, 
												duration: 1000 
											},
									        shadowSize: 10,
								            lines: {
							            		show: lines,
//							            		fill: lines,
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
												return v.toFixed(axis.tickDecimals)+" \%";
											},
											min:0,
											max:100
								        },
								        xaxis: {labelAngle : -30,
								        	ticks:xticks},
								        colors: [],
								        shadowSize:1,
								        tooltip: true,
										tooltipOpts: {
											content: "%s : %y \%",
											shifts: {
												x: -30,
												y: -50
											},
											defaultTheme: false
										}
									});
							}
							GetPrintData();
						}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	function onTimeStatisticsPie(){
		
		var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
		$.ajax({
				url : 'rest/search/getOnTimeStatistics?type=pie&date='+Math.round(date1),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(checkId);
					var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
					$("#onTimeStatisticsCharts").empty();
					$("#status").empty();
					$("#status").append('<div class="span7"><h3><b>Reasons For Delay</b></h3></div>'+
							'<div class="span5" style="float: right;"><div id="GetTimeStats" style="float: left;"><span class="btn btn-block btn-default btn-icon glyphicons download_alt"	style="width: 120px; float: right"><i></i>Get Data</span></div><a href="#" id="exportTimeStats"><img src="img/excel.ico" style="height: 25px; padding: 0px 15px 0px 15px;"></i></a><a '+
												'href="#" id="printTimeStats"><img src="img/print.png" style="height: 25px"></i></a></div>')
					$("#onTimeStatisticsCharts").append('<div id="choices" style="text-align: center;"></div>');
//					$("#onTimeStatisticsCharts").append('<div id="choices" style="text-align: center;"></div>');
					$("#onTimeStatisticsCharts").append('<div id="pie_chart"><div id="labeler" ></div><div id="onTimeStatistics"  style="height:220px"></div></div>');
					$("#onTimeStatisticsCharts").append('<div id="exportChart" style="display:none;"><table id="onTimeStatisticsTable"></table></div><div id="printChart" style="display:none;"></div>');
					$("#onTimeStatisticsCharts").append('<div id="load" class="load2"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".load2").remove();
			    },
				success : function(sdata){
//					costTableStr+='<thead><tr><th class="center">Quarter</th>	<th class="center">Year</th><th class="center">pickup</th><th class="center">dropin</th><th class="center">Total</th></tr>	</thead>'
					console.log(sdata)
					var dataSet=[],data=[],xticks=[],lines=true,bars=false;
					$("#onTimeStatisticsTable").append('<thead><tr><th class="center">Reason</th><th class="center">count</th></tr>	</thead>');
					TableStr+='<thead><tr><th class="center">Reason</th><th class="center">count</th></tr>	</thead>'
					for (var i = 0; i < sdata.results.length ; i++) {
						TableStr+='<tr><th class="center">'+
								sdata.results[i].reason+
								'</th><th class="center">'+
								parseInt(sdata.results[i].count)+
								'</th></tr>'
						$("#onTimeStatisticsTable").append('<tr><th class="center">'+
								sdata.results[i].reason+
								'</th><th class="center">'+
								parseInt(sdata.results[i].count)+
								'</th></tr>');
						dataSet[i] = {
								label:sdata.results[i].reason ,
								data: parseInt(sdata.results[i].count)
							}
							
						}
					TableStr+='</table>'
					GetPrintData();
					function GetPrintData(){
						html2canvas($('#pie_chart'), {
							  onrendered: function(canvas) {
								  $("#printChart").empty();
								  $("#printChart").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getData"><span class="btn btn-block btn-default btn-icon glyphicons download_alt" style="width:120px;float:right"><i></i>Get Data</span></a>');
//								  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
							  }
							});
					}
					$('#GetTimeStats').click(function() {
//						 get data Pop up the data in table format
					        var myWindow = window.open("","","");
					        myWindow.document.write(TableStr);
					});	

					$('#exportTimeStats').click(function() {
						console.log("Export Table data")
						tableToExcel("onTimeStatisticsTable","on Time Statistics Table");
					});
					
					$('#printTimeStats').click(function() {
						console.log("Printing the text")
						var printWindow = window.open('', 'On Time Statistics Reasons');
				        printWindow.document.write('<html><head><title>On Time Statistics Reasons</title>');
				        printWindow.document.write('</head><body ><img src=\'');
				        printWindow.document.write($("#printChart a").attr("href"));
				        printWindow.document.write('\' /><br><br><div>');
						printWindow.document.write(TableStr);
						printWindow.document.write('</div></body></html>');
				        printWindow.document.close();
				        printWindow.print();
//				        get data Pop up the data in table format
				       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
				        myWindow.document.write(costTableStr);*/
					});
						
//						$.each(dataSet, function(key, val) {
//							$("#choices").append("<input type='checkbox' name='" + key +
//								"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
//								+ val.label + "</input>" 
//								);
//						});
//
//						$("#choices").find("input").click(plotAccordingToChoices);
						
						
						function labelFormatter(label, series) {
							return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + Math.round(series.percent) + "%</div>";
						}
						
						
						
						plot = $.plot(
								'#onTimeStatistics', 
								dataSet,{
									grid: {
									    clickable: true, 
									    hoverable: true,
									},
									series: {
										pie: { 
											show: true,
											radius: 1,
											tilt: 0.5,
											innerRadius: 0.4,
											label: {
												show: true,
												radius: 3/4,
												formatter: labelFormatter,
												background: {
													opacity: 0.5
												}
											}
										}
									},
									legend: {
										show: true,
										container : $("#labeler")
									},
									 tooltip: true,
										tooltipOpts: {
											content: "%s : %y ",
											shifts: {
												x: -30,
												y: -50
											},
											defaultTheme: false
										}
								});
						
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
		
	
	function cycleTimeStatisticsGraph(){
		var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
		$.ajax({
				url : 'rest/search/getOnTimeStatistics?type=chart&date='+Math.round(date1),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(cycleId);
					var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
					$("#cycleTimeStatisticsCharts").empty();
					$("#cycleStatus").empty();
					$("#cycleStatus").append('<ul class="span6 center" id="cycleTimeStatisticsType"><li class="center span6"><a href="#" style="width: 100%" class="activeType">Line</a></li><li class="center span5"><a href="#" style="width: 100%">Bar</a></li></ul>'+
								'<div class="span5" style="float: right;"><div id="GetCycleStats" style="float: left;"><span class="btn btn-block btn-default btn-icon glyphicons download_alt"	style="width: 120px; float: right"><i></i>Get Data</span></div><a href="#" id="exportCycleStats"><img src="img/excel.ico" style="height: 25px; padding: 0px 15px 0px 15px;"></i></a><a '+
								'href="#" id="printCycleStats"><img src="img/print.png" style="height: 25px"></i></a></div>')
					$("#cycleTimeStatisticsCharts").append('<div id="cycleChoices" style="text-align: center;"></div>');
					$("#cycleTimeStatisticsCharts").append('<div id="cycleTimeStatistics" style="height:250px"></div>');
					$("#cycleTimeStatisticsCharts").append('<div id="exportCycleChart" style="display:none;"><table id="cycleTimeStatisticsTable"></table></div><div id="printCycleChart" style="display:none;"></div>');
					$("#cycleTimeStatisticsCharts").append('<div id="load" class="load3"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".load3").remove();
			    },
				success : function(sdata){
//					costTableStr+='<thead><tr><th class="center">Quarter</th>	<th class="center">Year</th><th class="center">pickup</th><th class="center">dropin</th><th class="center">Total</th></tr>	</thead>'
					console.log(sdata)
					var pickUp=[],dropIn=[],xticks=[],lines=true,bars=false;
					var maxVal=0
					TableStr+='<thead><tr><th class="center">Quarter</th><th class="center">Year</th><th class="center">On time Pickup</th><th class="center"> On time Delivery </th><th class="center">Total Booking</th><th class="center">Avg.Lead Time </th><th class="center"> Avg.Returns Delivery Time</th></tr>	</thead>';
					$("#cycleTimeStatisticsTable").append('<thead><tr><th class="center">Quarter</th><th class="center">Year</th><th class="center">On time Pickup</th><th class="center"> On time Delivery </th><th class="center">Total Booking</th><th class="center">Avg.Lead Time </th><th class="center"> OAvg.Returns Delivery Time</th></tr>	</thead>');
						if(sdata.results.length==1){
							lines=false,bars=true
						}
						for (var i = 0; i < sdata.results.length ; i++) {
							if(maxVal<parseInt((sdata.results[i].total/sdata.results[i].pickup)*100)/100){
								maxVal=parseInt((sdata.results[i].total/sdata.results[i].pickup)*100)/100
							}
							if(maxVal<parseInt((sdata.results[i].total/sdata.results[i].dropin)*100)/100){
								maxVal=parseInt((sdata.results[i].total/sdata.results[i].dropin)*100)/100
							}
							TableStr+='<tr><th class="center">'+
									'Q'+sdata.results[i].quarter+
									'</th><th class="center">'+
									sdata.results[i].year+
									'</th><th class="center">'+
									sdata.results[i].pickup+
									'</th><th class="center">'+
									sdata.results[i].dropin+
									'</th><th class="center">'+
									sdata.results[i].total+
									'</th><th class="center">'+
									parseInt((sdata.results[i].total/sdata.results[i].pickup)*100)/100+
									' Days</th><th class="center">'+
									parseInt((sdata.results[i].total/sdata.results[i].dropin)*100)/100+
									' Days</th></tr>'
							$("#cycleTimeStatisticsTable").append('<tr><th class="center">'+
									'Q'+sdata.results[i].quarter+
									'</th><th class="center">'+
									sdata.results[i].year+
									'</th><th class="center">'+
									sdata.results[i].pickup+
									'</th><th class="center">'+
									sdata.results[i].dropin+
									'</th><th class="center">'+
									sdata.results[i].total+
									'</th><th class="center">'+
									parseInt((sdata.results[i].total/sdata.results[i].pickup)*100)/100+
									' Days</th><th class="center">'+
									parseInt((sdata.results[i].total/sdata.results[i].dropin)*100)/100+
									' Days</th></tr>');
							pickUp.push([i,parseInt((sdata.results[i].total/sdata.results[i].dropin)*100)/100]);
							dropIn.push([i,parseInt((sdata.results[i].total/sdata.results[i].pickup)*100)/100]);
							xticks.push([i,"Q"+sdata.results[i].quarter+' '+sdata.results[i].year]);
							
						}
						
						TableStr+='</table>'
						var dataSet=[{
			         			label: "Avg.Lead Time ", 
			         			data: pickUp,
			         			points: {fillColor: "#058DC7"}, color: '#058DC7'
			         		}, 
			         		{	
			         			label: "Avg.Returns Delivery Time ", 
			         			data: dropIn,
			         			points: {fillColor: "#AA4643"}, color: '#AA4643'
			         		}];
						
						$.each(dataSet, function(key, val) {
							$("#cycleChoices").append("<input type='checkbox' name='" + key +
								"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
								+ val.label + "</input>" 
								);
						});
						
						function CostType(){
							if($("#cycleTimeStatisticsType li a.activeType").text()=="Bar"){
								lines=false;
								bars=true;
							}
							else if($("#cycleTimeStatisticsType li a.activeType").text()=="Line"){
								lines=true;
								bars=false;
							}
						}
						CostType()
						$('#cycleTimeStatisticsType li a').click(function() {
							console.log($(this).text())
								if($(this).text()=="Bar"){
									lines=false;
									bars=true;
								}
								else if($(this).text()=="Line"){
									lines=true;
									bars=false;
								}
								$('#cycleTimeStatisticsType li a').removeClass('activeType');
								$(this).addClass('activeType');
//								$(this).removeClass('btn-inverse').addClass('btn-primary');
								plotAccordingToChoices();
						});
						GetPrintData();
						function GetPrintData(){
							html2canvas($('#cycleTimeStatistics'), {
								  onrendered: function(canvas) {
									  $("#printChart").empty();
									  $("#printChart").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getData"><span class="btn btn-block btn-default btn-icon glyphicons download_alt" style="width:120px;float:right"><i></i>Get Data</span></a>');
//									  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
								  }
								});
						}
						
						$('#GetCycleStats').click(function() {
//							 get data Pop up the data in table format
						        var myWindow = window.open("","","");
						        myWindow.document.write(TableStr);
						});	

						$('#exportCycleStats').click(function() {
							console.log("Export Table data")
							tableToExcel("cycleTimeStatisticsTable","cycle Time Statistics Table");
						});
						
						$('#printCycleStats').click(function() {
							console.log("Printing the text")
							var printWindow = window.open('', 'On Time Statistics');
					        printWindow.document.write('<html><head><title>On Time Statistics</title>');
					        printWindow.document.write('</head><body ><img src=\'');
					        printWindow.document.write($("#printChart a").attr("href"));
					        printWindow.document.write('\' /><br><br><div>');
							printWindow.document.write(TableStr);
							printWindow.document.write('</div></body></html>');
					        printWindow.document.close();
					        printWindow.print();
//					        get data Pop up the data in table format
					       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
					        myWindow.document.write(costTableStr);*/
						});
						
						$("#cycleChoices").find("input").click(plotAccordingToChoices);
						
						maxVal=Math.round(maxVal+maxVal/2);
						plotAccordingToChoices();
						function plotAccordingToChoices() {

							var data = [];
							$("#cycleChoices").find("input:checked").each(function () {
								var key = $(this).attr("name");
								if (key && dataSet[key]) {
									data.push(dataSet[key]);
								}
							});

							if (data.length > 0) {

								this.plot = $.plot(
									'#cycleTimeStatistics', 
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
//								        	stack: true,
									    	grow: {
												active: true, 
												duration: 1000 
											},
									        shadowSize: 10,
								            lines: {
							            		show: lines,
//							            		fill: lines,
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
												return v.toFixed(axis.tickDecimals)+" Days";
											},
											min:0,
											max:maxVal
								        },
								        xaxis: {labelAngle : -30,
								        	ticks:xticks},
								        colors: [],
								        shadowSize:1,
								        tooltip: true,
										tooltipOpts: {
											content: "%s : %y Days",
											shifts: {
												x: -30,
												y: -50
											},
											defaultTheme: false
										}
									});
							}
							GetPrintData();
						}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	
	function cycleTimeStatisticsPie(){
		
		var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
		$.ajax({
				url : 'rest/search/getOnTimeStatistics?type=pie&date='+Math.round(date1),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(cycleId);
					var TableStr='<table border="1"   style="text-align:center;width: 100%;">'
						$("#cycleTimeStatisticsCharts").empty();
						$("#cycleStatus").empty();
						$("#cycleStatus").append('<div class="span7"><h3><b>Reasons For Delay</b></h3></div>'+
								'<div class="span5" style="float: right;"><div id="GetCycleStats" style="float: left;"><span class="btn btn-block btn-default btn-icon glyphicons download_alt"	style="width: 120px; float: right"><i></i>Get Data</span></div><a href="#" id="exportCycleStats"><img src="img/excel.ico" style="height: 25px; padding: 0px 15px 0px 15px;"></i></a><a '+
								'href="#" id="printCycleStats"><img src="img/print.png" style="height: 25px"></i></a></div>')
						$("#cycleTimeStatisticsCharts").append('<div id="cycleChoices" style="text-align: center;"></div>');
						$("#cycleTimeStatisticsCharts").append('<div id="pie_chart"><div id="labelerCycle" ></div><div id="cycleTimeStatistics"  style="height:220px"></div></div>');
						$("#cycleTimeStatisticsCharts").append('<div id="exportCycleChart" style="display:none;"><table id="cycleTimeStatisticsTable"></table></div><div id="printCycleChart" style="display:none;"></div>');
						$("#cycleTimeStatisticsCharts").append('<div id="load" class="load3"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".load3").remove();
			    },
				success : function(sdata){
//					costTableStr+='<thead><tr><th class="center">Quarter</th>	<th class="center">Year</th><th class="center">pickup</th><th class="center">dropin</th><th class="center">Total</th></tr>	</thead>'
					console.log(sdata)
					var dataSet=[],data=[],xticks=[],lines=true,bars=false;
					$("#cycleTimeStatisticsTable").append('<thead><tr><th class="center">Reason</th><th class="center">count</th></tr>	</thead>');
					TableStr+='<thead><tr><th class="center">Reason</th><th class="center">count</th></tr>	</thead>'
					for (var i = 0; i < sdata.results.length ; i++) {
						TableStr+='<tr><th class="center">'+
								sdata.results[i].reason+
								'</th><th class="center">'+
								parseInt(sdata.results[i].count)+
								'</th></tr>'
						$("#cycleTimeStatisticsTable").append('<tr><th class="center">'+
								sdata.results[i].reason+
								'</th><th class="center">'+
								parseInt(sdata.results[i].count)+
								'</th></tr>');
						dataSet[i] = {
								label:sdata.results[i].reason ,
								data: parseInt(sdata.results[i].count)
							}
							
						}
					TableStr+='</table>'
						GetPrintData();
					function GetPrintData(){
						html2canvas($('#cycleTimeStatistics'), {
							  onrendered: function(canvas) {
								  $("#printChart").empty();
								  $("#printChart").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getData"><span class="btn btn-block btn-default btn-icon glyphicons download_alt" style="width:120px;float:right"><i></i>Get Data</span></a>');
//								  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
							  }
							});
					}
					
					$('#GetCycleStats').click(function() {
//						 get data Pop up the data in table format
					        var myWindow = window.open("","","");
					        myWindow.document.write(TableStr);
					});	

					$('#exportCycleStats').click(function() {
						console.log("Export Table data")
						tableToExcel("cycleTimeStatisticsTable","Cycle Time Statistics Table");
					});
					
					$('#printCycleStats').click(function() {
						console.log("Printing the text")
						var printWindow = window.open('', 'On Time Statistics');
				        printWindow.document.write('<html><head><title>On Time Statistics</title>');
				        printWindow.document.write('</head><body ><img src=\'');
				        printWindow.document.write($("#printChart a").attr("href"));
				        printWindow.document.write('\' /><br><br><div>');
						printWindow.document.write(TableStr);
						printWindow.document.write('</div></body></html>');
				        printWindow.document.close();
				        printWindow.print();
//				        get data Pop up the data in table format
				       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
				        myWindow.document.write(costTableStr);*/
					});
					
						
						
						function labelFormatter(label, series) {
							return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + Math.round(series.percent) + "%</div>";
						}
						
						
						plot = $.plot(
								'#cycleTimeStatistics', 
								dataSet,{
									grid: {
									    clickable: true, 
									    hoverable: true,
									},
									series: {
										pie: { 
											show: true,
											radius: 1,
											tilt: 0.5,
											innerRadius: 0.4,
											label: {
												show: true,
												radius: 3/4,
												formatter: labelFormatter,
												background: {
													opacity: 0.5
												}
											}
										}
									},
									legend: {
										show: true,
										container : $("#labelerCycle")
									},
									tooltip: true,
									tooltipOpts: {
										content: "%s : %y ",
										shifts: {
											x: -30,
											y: -50
										},
										defaultTheme: false
									}
								});
						
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
		
	
});