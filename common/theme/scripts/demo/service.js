
var toptype="customer",period="today";
$("#top_perform tr th").click(function () {
	$('#top_perform tr th').removeAttr('style');
	$('#top_perform tr th').css({"text-align":"center"});
	$(this).css({"background":"#7C888A"});
	toptype = $(this).attr('id');
	getTopTable(toptype+'_'+period);			
});

$("#top_perf_time tr th").click(function () {
	$('#top_perf_time tr th').removeAttr('style');
	$('#top_perf_time tr th').css({"text-align":"center"});
	$(this).css({"background":"#667477"});
	period = $(this).attr('id');
	getTopTable(toptype+'_'+period);
});
getTopTable(toptype+'_'+period);
function getTopTable(request) {	
	$.ajax({
		url : 'rest/search/topcustomers',
		data : {feature : request},
		datatype : 'json',
		type : "GET",
		cache : false,
		beforeSend: function(){
			$("#top_performers").empty();
			$("#top_performers").append('<div id="load" style="text-align:center;"><h4><img src="img/30.gif">loading . . . .<h4> </div>');
	    },
	    complete: function(){
	    	$("#load").remove();
	    },
		success : function(data) {
			if(toptype=="customer"){
				$('#top_performers').append('<tr><th>Name</th><th>Ship</th><th>Rev</th><th>% of total</th><th>Prof</th><th>% of total</th></tr>');
				for ( var k = 0;k<10 ; k++){
					//data.results[k].bookdate==data.results[0].bookdate
					$('#top_performers').append('<tbody><td>'+data.results[k].customer+'</td><td>'+data.results[k].total+'</td><td>'+data.results[k].cost+'</td><td>'+Math.floor(data.results[k].costper/65)+' %</td><td>'+data.results[k].revenue+'</td><td>'+Math.floor(data.results[k].revenueper/60)+' %</td></tbody>');
				}	
			}else if(toptype=="agents"){
				$('#top_performers').append('<tr><th>Agent</th><th>Ship</th><th>Rev</th><th>Prof</th><th>% of total</th></tr>');
				for ( var k = 0;k<10 ; k++){
					//data.results[k].bookdate==data.results[0].bookdate
					$('#top_performers').append('<tbody><td>'+data.results[k].customer+'</td><td>'+data.results[k].total+'</td><td>'+data.results[k].cost+'</td><td>'+data.results[k].revenue+'</td><td>'+Math.floor(data.results[k].revenueper/60)+' %</td></tbody>');
				}	
			}else if(toptype=="carriers"){
				$('#top_performers').append('<tr><th>Name</th><th>Ship</th><th>Spend</th><th>Prof</th><th>Avg LOH</th><th># of total</th></tr>');
				for ( var k = 0;k<10 ; k++){
					//data.results[k].bookdate==data.results[0].bookdate
					$('#top_performers').append('<tbody><td>'+data.results[k].carriers+'</td><td>'+data.results[k].total+'</td><td>'+data.results[k].cost+'</td><td>'+data.results[k].profit+'</td><td>'+data.results[k].loh+'</td><td>'+data.results[k].customers+' </td></tbody>');
				}	
			}
		},error : function(xhr, data, statusText,errorThrown) {
			// log the error to the console
			console.log("The following error occured: "+ statusText,errorThrown);
		}
	});
}	
