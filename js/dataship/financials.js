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
		cargoTable(feat);
	});	
		
	
	var interval="today",type="customers";
	var percentageCost,percentageRevenue,percentageProfit,sym1c,sym2c,sym1r,sym2r,sym1p,sym2p;
	
	$('#CostGraphType span').live("click",function(){
		console.log("CostGraphType");
		console.log($(this).attr('value'));
		var costType=$(this).attr('value');
		Store("costType",costType)
		CostGraph(costType)
		$('#CostGraphType span').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$("#percentCost").removeAttr("disabled");

	});	

	$('#RevenueGraphType span').live("click",function(){
		console.log("RevenueGraphType");
		console.log($(this).attr('value'));
		var revenueType=$(this).attr('value');
		Store("revenueType",revenueType)
		RevenueGraph(revenueType)
		$('#RevenueGraphType span').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$("#percentRevenue").removeAttr("disabled");
	});	
	
	$('#ProfitGraphType span').live("click",function(){
		console.log("ProfitGraphType");
		console.log($(this).attr('value'));
		var profitType=$(this).attr('value');
		Store("profitType",profitType)
		ProfitGraph(profitType)
		$('#ProfitGraphType span').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$("#percentProfit").removeAttr("disabled");
	});	
	
	//percentCost
	
	$('#percentCost').live("click",function(){
		costType=Retrieve("costType")
		if(costType!="current"){
			if(percentageCost==false){
				percentageCost=true;
				sym1c=""
				sym2c="%"
				$(this).addClass('btn-primary');
			}else{
				percentageCost=false;
				sym1c="$"
				sym2c=""
				$(this).removeClass('btn-primary');
			}
			CostGraph(costType)
		}
	});
	
	$('#percentRevenue').live("click",function(){
		revenueType=Retrieve("revenueType")
		if(revenueType!="current"){
			if(percentageRevenue==false && revenueType!="current"){
				percentageRevenue=true;
				sym1r=""
				sym2r="%"
				$(this).addClass('btn-primary');
			
			}else{
				percentageRevenue=false;
				sym1r="$"
				sym2r=""
				$(this).removeClass('btn-primary');
			}
			RevenueGraph(revenueType)
		}
		
	});
	
	$('#percentProfit').live("click",function(){
		profitType=Retrieve("profitType")
		if(profitType!="current"){
			if(percentageProfit==false && profitType!="current"){
				percentageProfit=true;
				sym1p=""
				sym2p="%"
				$(this).addClass('btn-primary');
			
			}else{
				percentageProfit=false;
				sym1p="$"
				sym2p=""
				$(this).removeClass('btn-primary');
			}
			ProfitGraph(profitType)
		}
		
	});
	// initialize charts
	if (typeof charts != 'undefined') {
		
		percentageCost=false;
		percentageRevenue=false;
		percentageProfit=false;
			if(percentageCost==true){
				sym1c=""
				sym2c="%"
			}else{
				sym1c="$"
				sym2c=""
			}
			if(percentageRevenue==true){
				sym1r=""
				sym2r="%"
			}else{
				sym1r="$"
				sym2r=""
			}
			if(percentageProfit==true){
				sym1p=""
				sym2p="%"
			}else{
				sym1p="$"
				sym2p=""
			}
		
		var feat = "monthly";
		var period = "costbreakup_monthly";
//		LineCharts(feat);
//		BarCharts(feat)
	 	var date = new Date().getTime()/1000;
	 	console.log(Math.round(date*1000));
	 	
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
						getCurrentStatu(date)
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
	 		$('#datepicker2').val(
	 				today.getDate() + ' '
	 				+ months[today.getMonth()] + ' '
	 				+ today.getFullYear());
	 		
		getCurrentStatus(date)
		Store("costType","current")
		Store("revenueType","current")
		Store("profitType","current")
		costId=setInterval(function(){CostGraph("current")},2000);
		revenueId=setInterval(function(){RevenueGraph("current")},3000);
		profitId=setInterval(function(){ProfitGraph("current")},4000);
		/*cargoTable(feat);
		ServiceMetrics(interval,type);*/
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
	var costId,revenueId,profitId

	function getCurrentStatus(date){

		$.ajax({
				url : 'rest/search/getTodayFinancial?date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					$("#costCharts").append('<div id="load" class="loadCost"><h4><img src="img/spinners.gif"><h4> </div>');
					$("#revenueCharts").append('<div id="load" class="loadRevenue"><h4><img src="img/spinners.gif"><h4> </div>');
					$("#profitCharts").append('<div id="load" class="loadProfit"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	
			    },
				success : function(sdata){
					console.log("time started")
					
					if(sdata.results.length==1){
						console.log(sdata.results.length+" . . . .");
						$("#totalCost").text(sdata.results[0].cost);
						$("#totalRevenue").text(sdata.results[0].revenue);
						$("#totalProfit").text(sdata.results[0].profit);
					}
					else{
						console.log(sdata.results.length+" . . . .");
						$("#totalCost").text("NA");
						$("#totalRevenue").text("NA");
						$("#totalProfit").text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
		
	function getCurrentStatu(date){

		$.ajax({
				url : 'rest/search/getTodayFinancial?date='+Math.round(date),
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
						$("#totalCost").text(sdata.results[0].cost);
						$("#totalRevenue").text(sdata.results[0].revenue);
						$("#totalProfit").text(sdata.results[0].profit);
					}
					else{
						console.log(sdata.results.length+" . . . .");
						$("#totalCost").text("NA");
						$("#totalRevenue").text("NA");
						$("#totalProfit").text("NA");
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	function CostGraph(feat){
		
		var costData = [],labourData=[],fuelData=[],freightData=[],otherData=[] ,xticks = [];
		var a1=[],a2=[],a3=[],a4=[],a5=[]
		var totalCost=0;
		var costTableStr='<table border="1"   style="text-align:center;width: 100%;">'
		var date = new Date().getTime()/1000;
		   console.log(Math.round(date*1000)); // Wrong result
		$.ajax({
				url : 'rest/search/getCostFinancial?type='+feat+'&date='+Math.round(date)+'&callback=costGraph',
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(costId)
					$("#costCharts").empty();
					$("#GetDataCost").empty();
					$("#costCharts").append('<div id="costChoices" style="text-align: left;"></div>');
					$("#costCharts").append('<div id="cost"></div>');
					$("#costCharts").append('<table id="CostTable" rules="groups" frame="hsides" border="2" style="display:none">');
					$("#costCharts").append('<div id="load" class="loadCost"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".loadCost").remove();
			    },
				success : function(sdata){
					
					var months = new Array('Jan', 'Feb',
							'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
							'Oct', 'Nov', 'Dec');
					if(feat=="current"){
						$("#CostTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Cost</th>	</tr>	</thead>');
						costTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">cost</th>	</tr>	</thead>'
					}else if(feat=="customer"){
						$("#CostTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Customer</th><th class="center">Cost</th>	</tr>	</thead>');
						costTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Customer</th><th class="center">Cost</th>	</tr>	</thead>'
					} else if(feat=="carrier"){
						$("#CostTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Carrier</th><th class="center">Cost</th>	</tr>	</thead>');
						costTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Carrier</th><th class="center">cost</th>	</tr>	</thead>'
					}else if(feat=="component"){
						$("#CostTable").append('<thead><tr> <th class="center">month and year</th>  <th class="center">Cost</th><th class="center">Labour</th><th class="center">Fuel</th><th class="center">Freight</th><th class="center">Other</th></tr>	</thead>');
						costTableStr+='<thead><tr><th class="center">month and year</th>  <th class="center">Cost</th><th class="center">Labour</th><th class="center">Fuel</th><th class="center">Freight</th><th class="center">Other</th></tr>	</thead>'
					}
					for (var i = 0; i < sdata.results.length ; i++) {
						xticks.push([i,months[sdata.results[i].month-1]+' '+sdata.results[i].year]);
						if(percentageCost==false){
								if(feat=="current"){
									costTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].cost+
											'</th></tr>';
									$("#CostTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].cost+
											'</th></tr>');
									costData.push([i,parseInt(sdata.results[i].cost)]);
									totalCost+=parseInt(sdata.results[i].cost);
								}else if(feat=="customer"){
									
									var j,total=0;
									for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
										if(j==0){
											a1.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==1){
											a2.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==2){
											a3.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==3){
											a4.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==4){
											a5.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										total+=parseInt(sdata.results[i].data[j].cost);
										costTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[j].customer+
											'</th><th class="center">'+
											sdata.results[i].data[j].cost+
											'</th></tr>'
										$("#CostTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].customer+
												'</th><th class="center">'+
												sdata.results[i].data[j].cost+
												'</th></tr>');
									}
									if(j<sdata.results[i].data.length){
										for (;j < sdata.results[i].data.length ;j++) {
											total+=parseInt(sdata.results[i].data[j].cost);
											costTableStr+='<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].customer+
													'</th><th class="center">'+
													sdata.results[i].data[j].cost+
													'</th></tr>'
											$("#CostTable").append('<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].customer+
													'</th><th class="center">'+
													sdata.results[i].data[j].cost+
													'</th></tr>');
										}
									}
									costData.push([i,total]);
									
								}  else if(feat=="carrier"){
									
									var j,total=0;
									for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
										if(j==0){
											a1.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==1){
											a2.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==2){
											a3.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==3){
											a4.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										if(j==4){
											a5.push([i,parseInt(sdata.results[i].data[j].cost)]);
										}
										total+=parseInt(sdata.results[i].data[j].cost);
										costTableStr+='<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].carrier+
												'</th><th class="center">'+
												sdata.results[i].data[j].cost+
												'</th></tr>'
										$("#CostTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].carrier+
												'</th><th class="center">'+
												sdata.results[i].data[j].cost+
												'</th></tr>');
										
										
									}
									if(j<sdata.results[i].data.length){
										for (;j < sdata.results[i].data.length ;j++) {
											total+=parseInt(sdata.results[i].data[j].cost);
											costTableStr+='<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].carrier+
													'</th><th class="center">'+
													sdata.results[i].data[j].cost+
													'</th></tr>'
											$("#CostTable").append('<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].carrier+
													'</th><th class="center">'+
													sdata.results[i].data[j].cost+
													'</th></tr>');
										}
									}
									costData.push([i,total]);
								}else if(feat=="component"){
									costTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+' '+sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].cost+
											'</th><th class="center">'+
											sdata.results[i].labour+
											'</th><th class="center">'+
											sdata.results[i].fuel+
											'</th><th class="center">'+
											sdata.results[i].freight+
											'</th><th class="center">'+
											sdata.results[i].other+
											'</th></tr>'
									$("#CostTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+' '+sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].cost+
											'</th><th class="center">'+
											sdata.results[i].labour+
											'</th><th class="center">'+
											sdata.results[i].fuel+
											'</th><th class="center">'+
											sdata.results[i].freight+
											'</th><th class="center">'+
											sdata.results[i].other+
											'</th></tr>');
									labourData.push([i,parseInt(sdata.results[i].labour)]);
									fuelData.push([i,parseInt(sdata.results[i].fuel)]);
									freightData.push([i,parseInt(sdata.results[i].freight)]);
									otherData.push([i,parseInt(sdata.results[i].other)]);
									costData.push([i,parseInt(sdata.results[i].cost)]);
									totalCost+=parseInt(sdata.results[i].cost);
								}
							}
						else if(percentageCost==true){
							if(feat=="current"){
								costTableStr+='<tr><th class="center">'+
										months[sdata.results[i].month-1]+
										'</th><th class="center">'+
										sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].cost+
										'</th></tr>';
								$("#CostTable").append('<tr><th class="center">'+
										months[sdata.results[i].month-1]+
										'</th><th class="center">'+
										sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].cost+
										'</th></tr>');
								costData.push([i,parseInt(sdata.results[i].cost)]);
								totalCost+=parseInt(sdata.results[i].cost);
							}else if(feat=="customer"){
								
								var j,total=0;
								for (var k=0;k < sdata.results[i].data.length ;k++) {
										console.log(sdata.results[i].data[k].cost)
										total+=parseInt(sdata.results[i].data[k].cost);
										costTableStr+='<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[k].customer+
												'</th><th class="center">'+
												sdata.results[i].data[k].cost+
												'</th></tr>'
										$("#CostTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[k].customer+
												'</th><th class="center">'+
												sdata.results[i].data[k].cost+
												'</th></tr>');
									}
								console.log(total)
								costData.push([i,100]);
								
								for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
									if(j==0){
										a1.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==1){
										a2.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==2){
										a3.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==3){
										a4.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==4){
										a5.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
								}
								
								
							}  else if(feat=="carrier"){
								
								var j,total=0;
								for (var k=0;k < sdata.results[i].data.length ;k++) {
									console.log(sdata.results[i].data[k].cost)
									total+=parseInt(sdata.results[i].data[k].cost);
									costTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[k].carrier+
											'</th><th class="center">'+
											sdata.results[i].data[k].cost+
											'</th></tr>'
									$("#CostTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[k].carrier+
											'</th><th class="center">'+
											sdata.results[i].data[k].cost+
											'</th></tr>');
								}
								console.log(total)
								costData.push([i,100]);
								
								for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
									if(j==0){
										a1.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==1){
										a2.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==2){
										a3.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==3){
										a4.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									if(j==4){
										a5.push([i,Math.floor((parseInt(sdata.results[i].data[j].cost)/total)*100)]);
									}
									
								}
								
							}else if(feat=="component"){
								costTableStr+='<tr><th class="center">'+
										months[sdata.results[i].month-1]+' '+sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].cost+
										'</th><th class="center">'+
										sdata.results[i].labour+
										'</th><th class="center">'+
										sdata.results[i].fuel+
										'</th><th class="center">'+
										sdata.results[i].freight+
										'</th><th class="center">'+
										sdata.results[i].other+
										'</th></tr>'
								$("#CostTable").append('<tr><th class="center">'+
										months[sdata.results[i].month-1]+' '+sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].cost+
										'</th><th class="center">'+
										sdata.results[i].labour+
										'</th><th class="center">'+
										sdata.results[i].fuel+
										'</th><th class="center">'+
										sdata.results[i].freight+
										'</th><th class="center">'+
										sdata.results[i].other+
										'</th></tr>');
								
								totalCost+=parseInt(sdata.results[i].cost);
								var total=parseInt(sdata.results[i].cost);
								labourData.push([i,Math.floor((parseInt(sdata.results[i].labour)/total)*1000)/10]);
								fuelData.push([i,Math.floor((parseInt(sdata.results[i].fuel)/total)*1000)/10]);
								freightData.push([i,Math.floor((parseInt(sdata.results[i].freight)/total)*1000)/10]);
								otherData.push([i,Math.floor((parseInt(sdata.results[i].other)/total)*1000)/10]);
								costData.push([i,parseInt(sdata.results[i].cost)]);
							}
						
						}
						
						//xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
					}
					
					costTableStr+='</table>'
					var lines=true,bars=false, dataSet=[];
					if(feat=="current"){
						console.log(feat)
						 dataSet=[{	
			         			label: "Cost", 
			         			data: costData,
			         			stack:true,
			         			points: {fillColor: "#058DC7"}, color: '#058DC7',
			         			lines:{fill: true},
			         			bar:{fill: true}
			         		}];
					}else if((feat=="customer" || feat=="carrier" ) && percentageCost==false){
						console.log(feat)
						dataSet=[{	
		         			label: "Cost", 
		         			data: costData,
		         			stack:false,
		         			points: {fillColor: "#04638B"}, color: '#04638B',
		         			lines:{fill: false},
		         			bar:{fill: false}
		         		},
		         		{	
		         			label: "Top 1", 
		         			data: a1,
		         			 stack:true,
		         			points: {fillColor: "	#047FB3"}, color: '	#047FB3',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 2", 
		         			data: a2,
		         			 stack:true,
		         			points: {fillColor: "	#1E98CD"}, color: '	#1E98CD',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 3", 
		         			data: a3,
		         			 stack:true,
		         			points: {fillColor: "#50AFD8"}, color: '#50AFD8',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 4", 
		         			data: a4,
		         			 stack:true,
		         			points: {fillColor: "	#82C6E3"}, color: '	#82C6E3',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},{	
		         			label: "Top 5", 
		         			data: a5,
		         			 stack:true,
		         			points: {fillColor: "#B4DDEE"}, color: '#B4DDEE',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		}];
					}else if((feat=="customer" || feat=="carrier" ) && percentageCost==true){
						console.log(feat)
						dataSet=[{	
		         			label: "Top 1", 
		         			data: a1,
		         			 stack:true,
		         			points: {fillColor: "	#047FB3"}, color: '	#047FB3',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 2", 
		         			data: a2,
		         			 stack:true,
		         			points: {fillColor: "	#1E98CD"}, color: '	#1E98CD',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 3", 
		         			data: a3,
		         			 stack:true,
		         			points: {fillColor: "#50AFD8"}, color: '#50AFD8',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 4", 
		         			data: a4,
		         			 stack:true,
		         			points: {fillColor: "	#82C6E3"}, color: '	#82C6E3',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},{	
		         			label: "Top 5", 
		         			data: a5,
		         			 stack:true,
		         			points: {fillColor: "#B4DDEE"}, color: '#B4DDEE',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		}];
					}else if(feat=="component" && percentageCost==false){
						console.log("component")
//						lines=false,bars=true
						dataSet=[{	
		         			label: "Labour", 
		         			data: labourData,
		         			 stack:true,
	         				points: {fillColor: "	#82C6E3"}, color: '	#82C6E3',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Fuel", 
		         			data: fuelData,
		         			 stack:true,
		         			points: {fillColor: "#50AFD8"}, color: '#50AFD8',
		         			lines:{fill: true},
		         			bar:{fill: true}		         		
		         		},
		         		{	
		         			label: "Freight", 
		         			data: freightData,
		         			 stack:true,
		         			points: {fillColor: "#1E98CD"}, color: '#1E98CD',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Other", 
		         			data: otherData,
		         			 stack:true,
		         			points: {fillColor: "#047FB3"}, color: '#047FB3',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		}];
					}else if(feat=="component"  && percentageCost==true){
						console.log("component ")
//						lines=false,bars=true
						dataSet=[{	
		         			label: "Labour", 
		         			data: labourData,
		         			 stack:true,
	         				points: {fillColor: "	#82C6E3"}, color: '	#82C6E3',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Fuel", 
		         			data: fuelData,
		         			 stack:true,
		         			points: {fillColor: "#50AFD8"}, color: '#50AFD8',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}		         		
		         		},
		         		{	
		         			label: "Freight", 
		         			data: freightData,
		         			 stack:true,
		         			points: {fillColor: "#1E98CD"}, color: '#1E98CD',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Other", 
		         			data: otherData,
		         			 stack:true,
		         			points: {fillColor: "#047FB3"}, color: '#047FB3',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		}];
					}
//					$("#totalCost").text(totalCost);
					
					function CostType(){
						if($("#CostType li a.activeType").text()=="Bar"){
							lines=false;
							bars=true;
						}
						else if($("#CostType li a.activeType").text()=="Line"){
							lines=true;
							bars=false;
						}
					}
					CostType()
					$('#CostType li a').click(function() {
						console.log($(this).text())
							if($(this).text()=="Bar"){
								lines=false;
								bars=true;
							}
							else if($(this).text()=="Line"){
								lines=true;
								bars=false;
							}
							$('#CostType li a').removeClass('activeType');
							$(this).addClass('activeType');
//							$(this).removeClass('btn-inverse').addClass('btn-primary');
							plotAccordingToChoices();
					});

					
					$.each(dataSet, function(key, val) {
						$("#costChoices").append("<input type='checkbox' name='" + key +
							"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
							+ val.label + "</input>" 
							);
					});
//					$("#choices").append('<div id="GetDataCost"></div>');
					$("#costChoices").append("<div style='float:right' class='span3'><div id='GetTableDataCost' style='float:left;'><span class='btn btn-block btn-default btn-icon glyphicons download_alt' style='width:120px;float:right'><i></i>Get Data</span></div><div id='GetDataCost' style='display:none;'></div> <a href='#' id='CostData'><img src='img/excel.ico' style='height:25px;padding: 0px 15px 0px 15px;'></i></a><a href='#'id='printCost'><img src='img/print.png' style='height:25px'></i></a></div><br><br>" );
					
				
					GetDataCost();
					function GetDataCost(){
						html2canvas($('#cost'), {
							  onrendered: function(canvas) {
								  $("#GetDataCost").empty();
//								  $("#GetDataCost").append('<a href="'+canvas.toDataURL()+'" download="Cost.png" class="getCostData"></a>');
								  $("#GetDataCost").append('<a href="'+canvas.toDataURL()+'" download="Cost.png" class="getCostData"></a>');
//								  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Cost.png');
							  }
							});
					}
					$("#costChoices").find("input").click(plotAccordingToChoices);

					$('#CostData').click(function() {
						console.log("Cost Table");
						tableToExcel("CostTable","cost");
					});
					
					$('#GetTableDataCost').click(function() {
//						 get data Pop up the data in table format
					        var myWindow = window.open("","","");
					        myWindow.document.write(costTableStr);
					});	
					
					
					
					$('#printCost').click(function() {
						console.log("Printing the text")
						var printWindow = window.open('', 'Total Cost');
				        printWindow.document.write('<html><head><title>Total Cost</title>');
				        printWindow.document.write('</head><body ><img src=\'');
				        printWindow.document.write($("#GetDataCost a").attr("href"));
				        printWindow.document.write('\' /><br><br><div>');
						printWindow.document.write(costTableStr);
						printWindow.document.write('</div></body></html>');
				        printWindow.document.close();
				        printWindow.print();
				        
//				        get data Pop up the data in table format
				       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
				        myWindow.document.write(costTableStr);*/
				        
					});
										
					
					plotAccordingToChoices();
					function plotAccordingToChoices() {
						
						var data = [];
						$("#costChoices").find("input:checked").each(function () {
							var key = $(this).attr("name");
							if (key && dataSet[key]) {
								data.push(dataSet[key]);
							}
						});

						if (data.length > 0) {

							this.plot = $.plot(
								'#cost', 
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
//							        	stack: true,
								    	grow: {
											active: true, 
											duration: 1000 
										},
								        shadowSize: 10,
							            lines: {
						            		show: lines,
//						            		fill: lines,
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
											return sym1c +v.toFixed(axis.tickDecimals)+sym2c;
										},
							        },
							        xaxis: {labelAngle : -30,
							        	ticks:xticks},
							        colors: [],
							        shadowSize:1,
							        tooltip: true,
									tooltipOpts: {
										content: "%s :"+sym1c+" %y"+sym2c,
										shifts: {
											x: -30,
											y: -50
										},
										defaultTheme: false
									}
								});
						}
						GetDataCost();
					}
					
			},error : function(xhr, data, statusText,errorThrown) {
				// log the error to the console
				console.log("The following error occured: "+ statusText,errorThrown);
			}
		});
		
	}	

	
	function RevenueGraph(feat){
		
		var revenueData = [], xticks = [];
		var a1=[],a2=[],a3=[],a4=[],a5=[]
		var totalRevenue=0;
		var revenueTableStr='<table border="1"   style="text-align:center;width: 100%;">'
		   var date = new Date().getTime()/1000;
		   console.log(Math.round(date)); // Wrong result
		$.ajax({
				url : 'rest/search/getRevenueFinancial?type='+feat+'&date='+Math.round(date)+'&callback=RevenueGraph',
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(revenueId)
					$("#revenueCharts").empty();
					$("#GetDataRevenue").empty();
					$("#revenueCharts").append('<div id="revenueChoices" style="text-align: left;"></div>');
					$("#revenueCharts").append('<div id="revenue"></div>');
					$("#revenueCharts").append('<table id="RevenueTable" rules="groups" frame="hsides" border="2" style="display:none">');
					$("#revenueCharts").append('<div id="load" class="loadRevenue"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".loadRevenue").remove();
			    },
				success : function(sdata){
					var months = new Array('Jan', 'Feb',
							'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
							'Oct', 'Nov', 'Dec');
					if(feat=="current"){
						$("#RevenueTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Revenue</th>	</tr>	</thead>');
						revenueTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Revenue</th>	</tr>	</thead>'
					}else if(feat=="customer"){
						$("#RevenueTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Customer</th><th class="center">Revenue</th>	</tr>	</thead>');
						revenueTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Customer</th><th class="center">Revenue</th>	</tr>	</thead>'
					} else if(feat=="carrier"){
						$("#RevenueTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Carrier</th><th class="center">Revenue</th>	</tr>	</thead>');
						revenueTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Carrier</th><th class="center">Revenue</th>	</tr>	</thead>'
					}else if(feat=="component"){
						$("#RevenueTable").append('<thead><tr> <th class="center">Month and year</th>  <th class="center">Revenue</th><th class="center">Labour</th><th class="center">Fuel</th><th class="center">Freight</th><th class="center">Other</th></tr>	</thead>');
						revenueTableStr+='<thead><tr><th class="center">Month and year</th>  <th class="center">Revenue</th><th class="center">Labour</th><th class="center">Fuel</th><th class="center">Freight</th><th class="center">Other</th></tr>	</thead>'
					}
					for (var i = 0; i < sdata.results.length ; i++) {
						xticks.push([i,months[sdata.results[i].month-1]+' '+sdata.results[i].year]);
						if(percentageRevenue==false){
								if(feat=="current"){
									revenueTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].revenue+
											'</th></tr>';
									$("#RevenueTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].revenue+
											'</th></tr>');
									revenueData.push([i,parseInt(sdata.results[i].revenue)]);
									totalRevenue+=parseInt(sdata.results[i].revenue);
								}else if(feat=="customer"){
									
									var j,total=0;
									for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
										if(j==0){
											a1.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==1){
											a2.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==2){
											a3.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==3){
											a4.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==4){
											a5.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										total+=parseInt(sdata.results[i].data[j].revenue);
										revenueTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[j].customer+
											'</th><th class="center">'+
											sdata.results[i].data[j].revenue+
											'</th></tr>'
										$("#RevenueTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].customer+
												'</th><th class="center">'+
												sdata.results[i].data[j].revenue+
												'</th></tr>');
									}
									if(j<sdata.results[i].data.length){
										for (;j < sdata.results[i].data.length ;j++) {
											total+=parseInt(sdata.results[i].data[j].revenue);
											revenueTableStr+='<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].customer+
													'</th><th class="center">'+
													sdata.results[i].data[j].revenue+
													'</th></tr>'
											$("#RevenueTable").append('<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].customer+
													'</th><th class="center">'+
													sdata.results[i].data[j].revenue+
													'</th></tr>');
										}
									}
									revenueData.push([i,total]);
									
								}  else if(feat=="carrier"){
									
									var j,total=0;
									for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
										if(j==0){
											a1.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==1){
											a2.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==2){
											a3.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==3){
											a4.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										if(j==4){
											a5.push([i,parseInt(sdata.results[i].data[j].revenue)]);
										}
										total+=parseInt(sdata.results[i].data[j].revenue);
										revenueTableStr+='<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].carrier+
												'</th><th class="center">'+
												sdata.results[i].data[j].revenue+
												'</th></tr>'
										$("#RevenueTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].carrier+
												'</th><th class="center">'+
												sdata.results[i].data[j].revenue+
												'</th></tr>');
										
										
									}
									if(j<sdata.results[i].data.length){
										for (;j < sdata.results[i].data.length ;j++) {
											total+=parseInt(sdata.results[i].data[j].revenue);
											revenueTableStr+='<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].carrier+
													'</th><th class="center">'+
													sdata.results[i].data[j].revenue+
													'</th></tr>'
											$("#RevenueTable").append('<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].carrier+
													'</th><th class="center">'+
													sdata.results[i].data[j].revenue+
													'</th></tr>');
										}
									}
									revenueData.push([i,total]);
								}
							}
						else if(percentageRevenue==true){
							if(feat=="current"){
								revenueTableStr+='<tr><th class="center">'+
										months[sdata.results[i].month-1]+
										'</th><th class="center">'+
										sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].revenue+
										'</th></tr>';
								$("#RevenueTable").append('<tr><th class="center">'+
										months[sdata.results[i].month-1]+' '+sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].revenue+
										'</th></tr>');
								revenueData.push([i,parseInt(sdata.results[i].revenue)]);
								totalRevenue+=parseInt(sdata.results[i].revenue);
							}else if(feat=="customer"){
								
								var j,total=0;
								for (var k=0;k < sdata.results[i].data.length ;k++) {
										console.log(sdata.results[i].data[k].revenue)
										total+=parseInt(sdata.results[i].data[k].revenue);
										revenueTableStr+='<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[k].customer+
												'</th><th class="center">'+
												sdata.results[i].data[k].revenue+
												'</th></tr>'
										$("#RevenueTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[k].customer+
												'</th><th class="center">'+
												sdata.results[i].data[k].revenue+
												'</th></tr>');
									}
								console.log(total)
								revenueData.push([i,100]);
								
								for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
									if(j==0){
										a1.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==1){
										a2.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==2){
										a3.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==3){
										a4.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==4){
										a5.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
								}
								
								
							}  else if(feat=="carrier"){
								
								var j,total=0;
								for (var k=0;k < sdata.results[i].data.length ;k++) {
									console.log(sdata.results[i].data[k].revenue)
									total+=parseInt(sdata.results[i].data[k].revenue);
									revenueTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[k].carrier+
											'</th><th class="center">'+
											sdata.results[i].data[k].revenue+
											'</th></tr>'
									$("#RevenueTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[k].carrier+
											'</th><th class="center">'+
											sdata.results[i].data[k].revenue+
											'</th></tr>');
								}
								console.log(total)
								revenueData.push([i,100]);
								
								for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
									if(j==0){
										a1.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==1){
										a2.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==2){
										a3.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==3){
										a4.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									if(j==4){
										a5.push([i,Math.floor((parseInt(sdata.results[i].data[j].revenue)/total)*100)]);
									}
									
								}
								
							}
						
						}
						
						//xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
					}
					
					revenueTableStr+='</table>'
					var lines=true,bars=false, dataSet=[];
					if(feat=="current"){
						console.log(feat)
						 dataSet=[{	
			         			label: "Revenue", 
			         			data: revenueData,
			         			stack:true,
			         			points: {fillColor: "#77312F"}, color: '#77312F',
			         			lines:{fill: true},
			         			bar:{fill: true}
			         		}];
					}else if((feat=="customer" || feat=="carrier" ) && percentageRevenue==false){
						console.log(feat)
						dataSet=[{	
		         			label: "Revenue", 
		         			data: revenueData,
		         			stack:false,
		         			points: {fillColor: "#77312F"}, color: '#77312F',
		         			lines:{fill: false},
		         			bar:{fill: false}
		         		},
		         		{	
		         			label: "Top 1", 
		         			data: a1,
		         			 stack:true,
		         			points: {fillColor: "	#993F3C"}, color: '	#993F3C',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 2", 
		         			data: a2,
		         			 stack:true,
		         			points: {fillColor: "	#B25856"}, color: '	#B25856',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 3", 
		         			data: a3,
		         			 stack:true,
		         			points: {fillColor: "#C47E7B"}, color: '#C47E7B',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 4", 
		         			data: a4,
		         			 stack:true,
		         			points: {fillColor: "	#D4A2A1"}, color: '	#D4A2A1',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},{	
		         			label: "Top 5", 
		         			data: a5,
		         			 stack:true,
		         			points: {fillColor: "#E6C8C7"}, color: '#E6C8C7',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		}];
					}else if((feat=="customer" || feat=="carrier" ) && percentageRevenue==true){
						console.log(feat)
						dataSet=[{	
		         			label: "Top 1", 
		         			data: a1,
		         			 stack:true,
		         			points: {fillColor: "	#993F3C"}, color: '	#993F3C',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 2", 
		         			data: a2,
		         			 stack:true,
		         			points: {fillColor: "	#B25856"}, color: '	#B25856',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 3", 
		         			data: a3,
		         			 stack:true,
		         			points: {fillColor: "#C47E7B"}, color: '#C47E7B',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 4", 
		         			data: a4,
		         			 stack:true,
		         			points: {fillColor: "	#D4A2A1"}, color: '	#D4A2A1',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},{	
		         			label: "Top 5", 
		         			data: a5,
		         			 stack:true,
		         			points: {fillColor: "#E6C8C7"}, color: '#E6C8C7',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		}];
					}
//					$("#totalRevenue").text(totalRevenue);
					
					function RevenueType(){
						if($("#RevenueType li a.activeType").text()=="Bar"){
							lines=false;
							bars=true;
						}
						else if($("#RevenueType li a.activeType").text()=="Line"){
							lines=true;
							bars=false;
						}
					}
					RevenueType()
					$('#RevenueType li a').click(function() {
						console.log($(this).text())
							if($(this).text()=="Bar"){
								lines=false;
								bars=true;
							}
							else if($(this).text()=="Line"){
								lines=true;
								bars=false;
							}
							$('#RevenueType li a').removeClass('activeType');
							$(this).addClass('activeType');
//							$(this).removeClass('btn-inverse').addClass('btn-primary');
							plotAccordingToChoices();
					});

					
					$.each(dataSet, function(key, val) {
						$("#revenueChoices").append("<input type='checkbox' name='" + key +
							"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
							+ val.label + "</input>" 
							);
					});
//					$("#choices").append('<div id="GetDataRevenue"></div>');
					$("#revenueChoices").append("<div style='float:right' class='span3'><div id='GetTableDataRevenue' style='float:left;'><span class='btn btn-block btn-default btn-icon glyphicons download_alt' style='width:120px;float:right'><i></i>Get Data</span></div><div id='GetDataRevenue' style='display:none;'></div> <a href='#' id='RevenueData'><img src='img/excel.ico' style='height:25px;padding: 0px 15px 0px 15px;'></i></a><a href='#'id='printRevenue'><img src='img/print.png' style='height:25px'></i></a></div><br><br>" );
					
				
					GetDataRevenue();
					function GetDataRevenue(){
						html2canvas($('#revenue'), {
							  onrendered: function(canvas) {
								  $("#GetDataRevenue").empty();
//								  $("#GetDataRevenue").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getRevenueData"></a>');
								  $("#GetDataRevenue").append('<a href="'+canvas.toDataURL()+'" download="Revenue.png" class="getRevenueData"></a>');
//								  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Revenue.png');
							  }
							});
					}
					$("#revenueChoices").find("input").click(plotAccordingToChoices);
//--------------------@Sudheer-----------------------------


					$('#RevenueData').click(function() {
						console.log("Revenue Table");
						tableToExcel("RevenueTable","revenue");
					});
					
					$('#GetTableDataRevenue').click(function() {
//						 get data Pop up the data in table format
					        var myWindow = window.open("","","");
					        myWindow.document.write(revenueTableStr);
					});	
					
				
					
					/*$('#RevenueData').click(function() {
						console.log("Revenue Table");
						tableToExcel("RevenueTable","revenue");
					});*/
					
					$('#printRevenue').click(function() {
						console.log("Printing the text")
						var printWindow = window.open('', 'Total Revenue');
				        printWindow.document.write('<html><head><title>Total Revenue</title>');
				        printWindow.document.write('</head><body ><img src=\'');
				        printWindow.document.write($("#GetDataRevenue a").attr("href"));
				        printWindow.document.write('\' /><br><br><div>');
						printWindow.document.write(revenueTableStr);
						printWindow.document.write('</div></body></html>');
				        printWindow.document.close();
				        printWindow.print();
				        
//				        get data Pop up the data in table format
				       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
				        myWindow.document.write(revenueTableStr);*/
				        
					});
										
					
					plotAccordingToChoices();
					function plotAccordingToChoices() {
						
						var data = [];
						$("#revenueChoices").find("input:checked").each(function () {
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
//							        	stack: true,
								    	grow: {
											active: true, 
											duration: 1000 
										},
								        shadowSize: 10,
							            lines: {
						            		show: lines,
//						            		fill: lines,
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
											return sym1r +v.toFixed(axis.tickDecimals)+sym2r;
										},
							        },
							        xaxis: {labelAngle : -30,
							        	ticks:xticks},
							        colors: [],
							        shadowSize:1,
							        tooltip: true,
									tooltipOpts: {
										content: "%s :"+sym1r+" %y"+sym2r,
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

	function ProfitGraph(feat){

		var profitData = [], xticks = [];
		var a1=[],a2=[],a3=[],a4=[],a5=[]
		var totalProfit=0;
		var profitTableStr='<table border="1"  style="text-align:center;width: 100%;">'
		   var date = new Date().getTime()/1000;
		   console.log(Math.round(date)); // Wrong result
		$.ajax({
				url : 'rest/search/getProfitFinancial?type='+feat+'&date='+Math.round(date)+'&callback=ProfitGraph',
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(profitId)
					$("#profitCharts").empty();
					$("#GetDataProfit").empty();
					$("#profitCharts").append('<div id="profitChoices" style="text-align: left;"></div>');
					$("#profitCharts").append('<div id="profit"></div>');
					$("#profitCharts").append('<table id="ProfitTable" rules="groups" frame="hsides" border="2" style="display:none">');
					$("#profitCharts").append('<div id="load" class="loadProfit"><h4><img src="img/spinners.gif"><h4> </div>');
			    },
			    complete: function(){
			    	$(".loadProfit").remove();
			    },
				success : function(sdata){
					var months = new Array('Jan', 'Feb',
							'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
							'Oct', 'Nov', 'Dec');
					if(feat=="current"){
						$("#ProfitTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Profit</th>	</tr>	</thead>');
						profitTableStr+='<thead><tr><th class="center">Month </th>	<th class="center">Year</th><th class="center">Profit</th>	</tr>	</thead>'
					}else if(feat=="customer"){
						$("#ProfitTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Customer</th><th class="center">Profit</th>	</tr>	</thead>');
						profitTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Customer</th><th class="center">Profit</th>	</tr>	</thead>'
					} else if(feat=="carrier"){
						$("#ProfitTable").append('<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Carrier</th><th class="center">Profit</th>	</tr>	</thead>');
						profitTableStr+='<thead><tr><th class="center">Month</th>	<th class="center">Year</th><th class="center">Carrier</th><th class="center">Profit</th>	</tr>	</thead>'
					}
					for (var i = 0; i < sdata.results.length ; i++) {
						xticks.push([i,months[sdata.results[i].month-1]+' '+sdata.results[i].year]);
						if(percentageProfit==false){
								if(feat=="current"){
									profitTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].profit+
											'</th></tr>';
									$("#ProfitTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].profit+
											'</th></tr>');
									profitData.push([i,parseInt(sdata.results[i].profit)]);
									totalProfit+=parseInt(sdata.results[i].profit);
								}else if(feat=="customer"){
									
									var j,total=0;
									for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
										if(j==0){
											a1.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==1){
											a2.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==2){
											a3.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==3){
											a4.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==4){
											a5.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										total+=parseInt(sdata.results[i].data[j].profit);
										profitTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[j].customer+
											'</th><th class="center">'+
											sdata.results[i].data[j].profit+
											'</th></tr>'
										$("#ProfitTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].customer+
												'</th><th class="center">'+
												sdata.results[i].data[j].profit+
												'</th></tr>');
									}
									if(j<sdata.results[i].data.length){
										for (;j < sdata.results[i].data.length ;j++) {
											total+=parseInt(sdata.results[i].data[j].profit);
											profitTableStr+='<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].customer+
													'</th><th class="center">'+
													sdata.results[i].data[j].profit+
													'</th></tr>'
											$("#ProfitTable").append('<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].customer+
													'</th><th class="center">'+
													sdata.results[i].data[j].profit+
													'</th></tr>');
										}
									}
									profitData.push([i,total]);
									
								}  else if(feat=="carrier"){
									
									var j,total=0;
									for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
										if(j==0){
											a1.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==1){
											a2.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==2){
											a3.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==3){
											a4.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										if(j==4){
											a5.push([i,parseInt(sdata.results[i].data[j].profit)]);
										}
										total+=parseInt(sdata.results[i].data[j].profit);
										profitTableStr+='<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].carrier+
												'</th><th class="center">'+
												sdata.results[i].data[j].profit+
												'</th></tr>'
										$("#ProfitTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[j].carrier+
												'</th><th class="center">'+
												sdata.results[i].data[j].profit+
												'</th></tr>');
										
										
									}
									if(j<sdata.results[i].data.length){
										for (;j < sdata.results[i].data.length ;j++) {
											total+=parseInt(sdata.results[i].data[j].profit);
											profitTableStr+='<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].carrier+
													'</th><th class="center">'+
													sdata.results[i].data[j].profit+
													'</th></tr>'
											$("#ProfitTable").append('<tr><th class="center">'+
													months[sdata.results[i].month-1]+
													'</th><th class="center">'+
													sdata.results[i].year+
													'</th><th class="center">'+
													sdata.results[i].data[j].carrier+
													'</th><th class="center">'+
													sdata.results[i].data[j].profit+
													'</th></tr>');
										}
									}
									profitData.push([i,total]);
								}
							}
						else if(percentageProfit==true){
							if(feat=="current"){
								profitTableStr+='<tr><th class="center">'+
										months[sdata.results[i].month-1]+
										'</th><th class="center">'+
										sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].profit+
										'</th></tr>';
								$("#ProfitTable").append('<tr><th class="center">'+
										months[sdata.results[i].month-1]+
										'</th><th class="center">'+
										sdata.results[i].year+
										'</th><th class="center">'+
										sdata.results[i].profit+
										'</th></tr>');
								profitData.push([i,parseInt(sdata.results[i].profit)]);
								totalProfit+=parseInt(sdata.results[i].profit);
							}else if(feat=="customer"){
								
								var j,total=0;
								for (var k=0;k < sdata.results[i].data.length ;k++) {
										console.log(sdata.results[i].data[k].profit)
										total+=parseInt(sdata.results[i].data[k].profit);
										profitTableStr+='<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[k].customer+
												'</th><th class="center">'+
												sdata.results[i].data[k].profit+
												'</th></tr>'
										$("#ProfitTable").append('<tr><th class="center">'+
												months[sdata.results[i].month-1]+
												'</th><th class="center">'+
												sdata.results[i].year+
												'</th><th class="center">'+
												sdata.results[i].data[k].customer+
												'</th><th class="center">'+
												sdata.results[i].data[k].profit+
												'</th></tr>');
									}
								console.log(total)
								profitData.push([i,100]);
								
								for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
									if(j==0){
										a1.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==1){
										a2.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==2){
										a3.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==3){
										a4.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==4){
										a5.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
								}
								
								
							}  else if(feat=="carrier"){
								
								var j,total=0;
								for (var k=0;k < sdata.results[i].data.length ;k++) {
									console.log(sdata.results[i].data[k].profit)
									total+=parseInt(sdata.results[i].data[k].profit);
									profitTableStr+='<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[k].carrier+
											'</th><th class="center">'+
											sdata.results[i].data[k].profit+
											'</th></tr>'
									$("#ProfitTable").append('<tr><th class="center">'+
											months[sdata.results[i].month-1]+
											'</th><th class="center">'+
											sdata.results[i].year+
											'</th><th class="center">'+
											sdata.results[i].data[k].carrier+
											'</th><th class="center">'+
											sdata.results[i].data[k].profit+
											'</th></tr>');
								}
								console.log(total)
								profitData.push([i,100]);
								
								for (j = 0; j < 5 && j < sdata.results[i].data.length ;j++) {
									if(j==0){
										a1.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==1){
										a2.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==2){
										a3.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==3){
										a4.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									if(j==4){
										a5.push([i,Math.floor((parseInt(sdata.results[i].data[j].profit)/total)*100)]);
									}
									
								}
								
							}
						
						}
						
						//xticks.push([i,sdata.results[i].month+" "+sdata.results[i].year]);
					}
					
					profitTableStr+='</table>'
					var lines=true,bars=false, dataSet=[];
					if(feat=="current"){
						console.log(feat)
						 dataSet=[{	
			         			label: "Profit", 
			         			data: profitData,
			         			stack:true,
			         			points: {fillColor: "#387E23"}, color: '#387E23',
			         			lines:{fill: true},
			         			bar:{fill: true}
			         		}];
					}else if((feat=="customer" || feat=="carrier" ) && percentageProfit==false){
						console.log(feat)
						dataSet=[{	
		         			label: "Profit", 
		         			data: profitData,
		         			stack:false,
		         			points: {fillColor: "#387E23"}, color: '#387E23',
		         			lines:{fill: false},
		         			bar:{fill: false}
		         		},
		         		{	
		         			label: "Top 1", 
		         			data: a1,
		         			 stack:true,
		         			points: {fillColor: "	#48A22D"}, color: '	#48A22D',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 2", 
		         			data: a2,
		         			 stack:true,
		         			points: {fillColor: "	#62BC46"}, color: '	#62BC46',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 3", 
		         			data: a3,
		         			 stack:true,
		         			points: {fillColor: "#84CA70"}, color: '#84CA70',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},
		         		{	
		         			label: "Top 4", 
		         			data: a4,
		         			 stack:true,
		         			points: {fillColor: "	#A8DA98"}, color: '	#A8DA98',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		},{	
		         			label: "Top 5", 
		         			data: a5,
		         			 stack:true,
		         			points: {fillColor: "#CAE8C2"}, color: '#CAE8C2',
		         			lines:{fill: true},
		         			bar:{fill: true}
		         		}];
					}else if((feat=="customer" || feat=="carrier" ) && percentageProfit==true){
						console.log(feat)
						dataSet=[{	
		         			label: "Top 1", 
		         			data: a1,
		         			 stack:true,
		         			points: {fillColor: "#48A22D"}, color: '	#48A22D',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 2", 
		         			data: a2,
		         			 stack:true,
		         			points: {fillColor: "#62BC46"}, color: '	#62BC46',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 3", 
		         			data: a3,
		         			 stack:true,
		         			points: {fillColor: "#84CA70"}, color: '#84CA70',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},
		         		{	
		         			label: "Top 4", 
		         			data: a4,
		         			 stack:true,
		         			points: {fillColor: "#A8DA98"}, color: '	#A8DA98',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		},{	
		         			label: "Top 5", 
		         			data: a5,
		         			 stack:true,
		         			points: {fillColor: "#CAE8C2"}, color: '#CAE8C2',
		         			lines:{fill: true},
		         			bar:{fill: true},
		         			yaxis: {max:100}
		         		}];
					}
//					$("#totalProfit").text(totalProfit);
					
					function ProfitType(){
						if($("#ProfitType li a.activeType").text()=="Bar"){
							lines=false;
							bars=true;
						}
						else if($("#ProfitType li a.activeType").text()=="Line"){
							lines=true;
							bars=false;
						}
					}
					ProfitType()
					$('#ProfitType li a').click(function() {
						console.log($(this).text())
							if($(this).text()=="Bar"){
								lines=false;
								bars=true;
							}
							else if($(this).text()=="Line"){
								lines=true;
								bars=false;
							}
							$('#ProfitType li a').removeClass('activeType');
							$(this).addClass('activeType');
//							$(this).removeClass('btn-inverse').addClass('btn-primary');
							plotAccordingToChoices();
					});

					
					$.each(dataSet, function(key, val) {
						$("#profitChoices").append("<input type='checkbox' name='" + key +
							"' checked='checked' id='id" + key + "' style='margin: 7px;background-color: '"+val.color+"'>"
							+ val.label + "</input>" 
							);
					});
//					$("#choices").append('<div id="GetDataProfit"></div>');
					$("#profitChoices").append("<div style='float:right' class='span3'><div id='GetTableDataProfit' style='float:left;'><span class='btn btn-block btn-default btn-icon glyphicons download_alt' style='width:120px;float:right'><i></i>Get Data</span></div><div id='GetDataProfit' style='display:none'></div> <a href='#' id='ProfitData'><img src='img/excel.ico' style='height:25px;padding: 0px 15px 0px 15px;'></i></a><a href='#'id='printProfit'><img src='img/print.png' style='height:25px'></i></a></div><br><br>" );
					
				
					GetDataProfit();
					function GetDataProfit(){
						html2canvas($('#profit'), {
							  onrendered: function(canvas) {
								  $("#GetDataProfit").empty();
//								  $("#GetDataProfit").append('<a href="'+canvas.toDataURL()+'" download="Profit.png" class="getProfitData"></a>');
								  $("#GetDataProfit").append('<a href="'+canvas.toDataURL()+'" download="Profit.png" class="getProfitData"></a>');
//								  $(".getData").attr("href", canvas.toDataURL()).attr("download",'Profit.png');
							  }
							});
					}
					$("#profitChoices").find("input").click(plotAccordingToChoices);

					$('#ProfitData').click(function() {
						console.log("Profit Table");
						tableToExcel("ProfitTable","profit");
					});
					
					$('#GetTableDataProfit').click(function() {
//						 get data Pop up the data in table format
					        var myWindow = window.open("","","");
					        myWindow.document.write(profitTableStr);
					});
					
					$('#printProfit').click(function() {
						console.log("Printing the text")
						var printWindow = window.open('', 'Total Profit');
				        printWindow.document.write('<html><head><title>Total Profit</title>');
				        printWindow.document.write('</head><body ><img src=\'');
				        printWindow.document.write($("#GetDataProfit a").attr("href"));
				        printWindow.document.write('\' /><br><br><div>');
						printWindow.document.write(profitTableStr);
						printWindow.document.write('</div></body></html>');
				        printWindow.document.close();
				        printWindow.print();
				        
//				        get data Pop up the data in table format
				       /* var myWindow = window.open("","MsgWinw","width=500,height=500");
				        myWindow.document.write(profitTableStr);*/
				        
					});
										
					
					plotAccordingToChoices();
					function plotAccordingToChoices() {
						
						var data = [];
						$("#profitChoices").find("input:checked").each(function () {
							var key = $(this).attr("name");
							if (key && dataSet[key]) {
								data.push(dataSet[key]);
							}
						});

						if (data.length > 0) {

							this.plot = $.plot(
								'#profit', 
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
//							        	stack: true,
								    	grow: {
											active: true, 
											duration: 1000 
										},
								        shadowSize: 10,
							            lines: {
						            		show: lines,
//						            		fill: lines,
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
											return sym1r +v.toFixed(axis.tickDecimals)+sym2r;
										},
							        },
							        xaxis: {labelAngle : -30,
							        	ticks:xticks},
							        colors: [],
							        shadowSize:1,
							        tooltip: true,
									tooltipOpts: {
										content: "%s :"+sym1r+" %y"+sym2r,
										shifts: {
											x: -30,
											y: -50
										},
										defaultTheme: false
									}
								});
						}
						GetDataProfit();
					}
						
			},error : function(xhr, data, statusText,errorThrown) {
				// log the error to the console
				console.log("The following error occured: "+ statusText,errorThrown);
			}
		});
		
	}
		
	
});