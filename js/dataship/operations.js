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
	
	
	var date2,date = new Date().getTime()/1000,type="";
	var MapId,cargo_twoId,cargo_oneId,gridId;
	var id;
	/*Buttons*/
	$('#carriers').live("click",function(){
		$("#flip1").hide("fade")
		$("#flip2").show("fade")
		type="carrier"
		$('#carrier').removeClass('btn-warning');
		$('#carrier').addClass('btn-inverse');
		$('#customer').removeClass('btn-inverse');
		$('#customer').addClass('btn-warning');
		DisplayList(type,date)
	});	
	$('#customers').live("click",function(){
		$("#flip1").hide("fade")
		$("#flip2").show("fade")
		type="customer"
		$('#carrier').removeClass('btn-inverse');
		$('#carrier').addClass('btn-warning');
		$('#customer').removeClass('btn-warning');
		$('#customer').addClass('btn-inverse');
		DisplayList(type,date)
	});	
	$('#carrier').live("click",function(){
		$("#flip1").hide("fade")
		$("#flip2").show("fade")
		type="carrier"
		$('#carrier').removeClass('btn-warning');
		$('#carrier').addClass('btn-inverse');
		$('#customer').removeClass('btn-inverse');
		$('#customer').addClass('btn-warning');
		DisplayList(type,date)
	});	
	$('#customer').live("click",function(){
		$("#flip1").hide("fade")
		$("#flip2").show("fade")
		type="customer"
		$('#carrier').removeClass('btn-inverse');
		$('#carrier').addClass('btn-warning');
		$('#customer').removeClass('btn-warning');
		$('#customer').addClass('btn-inverse');
		DisplayList(type,date)
	});	
	
	$('#compare li a').live("click",function(){
		console.log( $(this).attr("class"));
		$('#compare').parent().hide()
		$('#clearCompare').show()
		if($(this).attr("class")!="select"){
			$('#selectedTimeFrame').show()
			$('#selectTimeFrame').hide()
			cargoListTwo($(this).attr("class"),$(this).attr("class"),date)
		}
		else{
			$('#selectedTimeFrame').hide()
			$('#selectTimeFrame').show()
			date2 =new Date().getTime()/1000
			$('#datepicker2').val(new Date())
			$("#timestamp_two").text("Today")
			cargoListTwo("today","today",date2)
		}
		
	});
	
	$('#clearCompare').live("click",function(){
		$('#compare').parent().show()
		$('#clearCompare').hide()
		$('#compairResults').hide("fade")
	});
	
	
	$('#map').live("click",function(){
		$("#flip1").show("fade")
		$("#flip2").hide("fade")
		MapMarkers("today",date)
	});	
	
	// initialize charts
	if (typeof charts != 'undefined') {
		
		Store("map","true")
		$('#datepicker2')
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
					//When the datepicker calendar select the date
					onSelect : function(dateText, obj) {
						console.log($("#datepicker2").val())
						$("#timestamp_two").text($("#datepicker2").val())
						var dte = new Date($("#datepicker2").val());
						dte.setTime(dte.getTime()- dte.getTimezoneOffset()*60*1000);
						console.log(dte.toLocaleString());
						date2 = Date.parse(dte.toLocaleString())/1000;
						cargoListTwo("today","today",date2)
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
		cargoListOne("today",date)
		
		MapId=setInterval(function(){MapMarkers("today",date)},1000);
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
						//When the datepicker calendar select the date
						onSelect : function(dateText, obj) {
							console.log($("#datepicker1").val())
							$("#timestamp_one").text($("#datepicker1").val())
							var dte = new Date($("#datepicker1").val());
							dte.setTime(dte.getTime()- dte.getTimezoneOffset()*60*1000);
							console.log(dte.toLocaleString());
							date = Date.parse(dte.toLocaleString())/1000;
							cargoListOne("today",date)
							if(Retrieve("map")=="true")
								MapId=setInterval(function(){MapMarkers("today",date)},1000);
							else
								gridId=setInterval(function(){DisplayList(type,date)},1000);
							
						},
						//When the datepicker close the calendar
						onClose : function(dateText, obj) {
							
						}

					});
		
		function randNum()
		{
			return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
		}

		var data = [[1, 3+randNum()], [2, 5+randNum()], [3, 8+randNum()], [4, 11+randNum()],[5, 14+randNum()],[6, 17+randNum()],[7, 20+randNum()], [8, 15+randNum()], [9, 18+randNum()], [10, 22+randNum()]];

		$('.sparkline').sparkline(data, 
					{ 
						type: 'bar',
						width: 10,
						height: 45,
						stackedBarColor: ["#dadada", successColor],
						lineWidth: 2
					});
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
	
	
	function cargoListOne(feat,date){
	 	
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
						$("#booked_one").text(sdata.results[0].bookings);
						$("#canceled_one").text(sdata.results[0].cancelled);
						$("#delivered_one").text(sdata.results[0].Delivered);
						$("#intransit_one").text(sdata.results[0].Intransmit);
						$("#exception_one").text(sdata.results[0].exception);
						$("#orders_one").text(sdata.results[0].Delivered);
						
						var cancelOrder=parseInt(Math.floor((sdata.results[0].cancelled/sdata.results[0].bookings)*100));
						$("#canceled_percent_one").text(cancelOrder);
						$('.canceled_percent_one').data('easyPieChart').update(cancelOrder);
						
						var deliveredOrder=parseInt(Math.floor((sdata.results[0].Delivered/sdata.results[0].bookings)*100));
						$("#delivered_percent_one").text(deliveredOrder);
						$('.delivered_percent_one').data('easyPieChart').update(deliveredOrder);
						$("#orders_percent_one").text(deliveredOrder);
						$('.orders_percent_one').data('easyPieChart').update(deliveredOrder);
						
						var intransitOrder=parseInt(Math.floor((sdata.results[0].Intransmit/sdata.results[0].bookings)*100));
						$("#intransit_percent_one").text(intransitOrder);
						$('.intransit_percent_one').data('easyPieChart').update(intransitOrder);
						
						var exceptionOrder=parseInt(Math.floor((sdata.results[0].exception/sdata.results[0].bookings)*100));
						$("#exception_percent_one").text(exceptionOrder);
						$('.exception_percent_one').data('easyPieChart').update(exceptionOrder);
						
						
					}
					else{
						$("#booked_one").text("NA");
						$("#canceled_one").text("NA");
						$("#delivered_one").text("NA");
						$("#intransit_one").text("NA");
						$("#exception_one").text("NA");
						$("#orders_one").text("NA");
//						$("#booked_percent_one").text("NA");
						$("#canceled_percent_one").text("NA");
						$("#delivered_percent_one").text("NA");
						$("#intransit_percent_one").text("NA");
						$("#exception_percent_one").text("NA");
						$("#orders_percent_one").text("NA");
						
						
						
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	function cargoListTwo(feat,head,date){
	 	
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
			    	$('#compairResults').show("fade")
			    	$(".timeframe").text(head)
			    },
				success : function(sdata){
					if(sdata.results.length==1){
						console.log(sdata.results.length+" . . . .");
						$("#booked_two").text(sdata.results[0].bookings);
						$("#canceled_two").text(sdata.results[0].cancelled);
						$("#delivered_two").text(sdata.results[0].Delivered);
						$("#intransit_two").text(sdata.results[0].Intransmit);
						$("#exception_two").text(sdata.results[0].exception);
						$("#orders_two").text(sdata.results[0].Delivered);
						
						var cancelOrder=parseInt(Math.floor((sdata.results[0].cancelled/sdata.results[0].bookings)*100));
						$("#canceled_percent_two").text(cancelOrder);
						$('.canceled_percent_two').data('easyPieChart').update(cancelOrder);
						
						var deliveredOrder=parseInt(Math.floor((sdata.results[0].Delivered/sdata.results[0].bookings)*100));
						$("#delivered_percent_two").text(deliveredOrder);
						$('.delivered_percent_two').data('easyPieChart').update(deliveredOrder);
						$("#orders_percent_two").text(deliveredOrder);
						$('.orders_percent_two').data('easyPieChart').update(deliveredOrder);
						
						var intransitOrder=parseInt(Math.floor((sdata.results[0].Intransmit/sdata.results[0].bookings)*100));
						$("#intransit_percent_two").text(intransitOrder);
						$('.intransit_percent_two').data('easyPieChart').update(intransitOrder);
						
						var exceptionOrder=parseInt(Math.floor((sdata.results[0].exception/sdata.results[0].bookings)*100));
						$("#exception_percent_two").text(exceptionOrder);
						$('.exception_percent_two').data('easyPieChart').update(exceptionOrder);
						
						
					}
					else{
						$("#booked_two").text("NA");
						$("#canceled_two").text("NA");
						$("#delivered_two").text("NA");
						$("#intransit_two").text("NA");
						$("#exception_two").text("NA");
						$("#orders_two").text("NA");
//						$("#booked_percent_two").text("NA");
						$("#canceled_percent_two").text("NA");
						$("#delivered_percent_two").text("NA");
						$("#intransit_percent_two").text("NA");
						$("#exception_percent_two").text("NA");
						$("#orders_percent_two").text("NA");
						
						
						
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	
	
function DisplayList(type,date){
	Store("map","false")
		$.ajax({
				url : 'rest/search/topOperators?type='+type+'&date='+Math.round(date),
				//data : {feature : feat},
			datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					console.log(gridId);
					window.clearTimeout(gridId)
					$("#topPerformList").empty()
			    },
			    complete: function(){
			    },
				success : function(cdata){
					console.log(cdata.results)
					if(type=="customer"){
						var str=""
							for (var i = 0; i < cdata.results.length && i<10 ; i++) {
								str=str+'<tr>'+
									'<td class="center">'+cdata.results[i].customer+
									'</td><td class=" center">'+cdata.results[i].bookings+
									'</td><td class=" center">'+cdata.results[i].cancelled+
									'</td><td class=" center">'+cdata.results[i].Intransmit+
									'</td><td class=" center">'+cdata.results[i].Delivered+
									'</td><td class=" center">'+cdata.results[i].exception+
									'</td><td class=" center">'+cdata.results[i].Delivered+
								'</td></tr>';
							}
							$("#topPerformList").append(str);
					}
					if(type=="carrier"){
						var str = "";
							for (var i = 0;  i < cdata.results.length && i<10  ; i++) {
								str=str+'<tr>'+
											'<td class="center">'+cdata.results[i].carrier+
											'</td><td class=" center">'+cdata.results[i].bookings+
											'</td><td class=" center">'+cdata.results[i].cancelled+
											'</td><td class=" center">'+cdata.results[i].Intransmit+
											'</td><td class=" center">'+cdata.results[i].Delivered+
											'</td><td class=" center">'+cdata.results[i].exception+
											'</td><td class=" center">'+cdata.results[i].Delivered+
										'</td></tr>';
							}
							$("#topPerformList").append(str);
					}
				},error : function(xhr, data, statusText,errorThrown) {
					// log the error to the console
					console.log("The following error occured: "+ statusText,errorThrown);
				}
			});
		}
	


	function MapMarkers(feat,date){
		Store("map","true")
//	 	console.log(Math.round(date));
		$.ajax({
				url : 'rest/search/getCargoMapInfo?interval='+feat+'&date='+Math.round(date),
				//data : {feature : feat},
				datatype : 'json',
				type : "GET",
				cache : false,
				beforeSend: function(){
					window.clearTimeout(MapId)
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
						    zoom:4,
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
//								   console.log(results)
							      if(status == google.maps.GeocoderStatus.OK) {
							    	  console.log(results[0].geometry.location)
							    	  for(var i=0;i<count;i++)
							    	  {
								    	  var myLatlng = new google.maps.LatLng(results[0].geometry.location.d,results[0].geometry.location.e);
								    	  var marker = new google.maps.Marker({
								            position:myLatlng,
								            map: map,
								            icon: "img/"+stat+'.ico'
								         });
							    	  }
							         google.maps.event.addListener(marker, 'click', function() {
							        	 infowindow.setContent(stat); 
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
	
	
	
});