// 封装一些倒计时调用的常用方法
define(['jquery','config'],function($,config){
	var countdowntime = function(options){
		var settings = {
			divid:$("#timesbox"),
			timers:60,
			callback:function(){},
			beforecall:function(){},
			type:0	
		};
		var container = settings.divid;
		var timerHtml = '<span class="day_show">00 天 </span><span class="hour_show">00 时 </span><span class="minute_show">00 分 </span><span class="second_show">00 秒 </span>';
		if(options){
			$.extend(settings,options);	
		};
		var intDiff = parseInt(settings.timers);
		var fday=0,
			fhour=0,
			fminute=0,
			fsecond=0;//时间默认值
		$(container).html(timerHtml);
		if(options.beforecall){
			settings.beforecall();
		}
		switch(settings.type){
			case 1:
				container.find('.second_show').hide();
				break;
			case 2:
				container.find('.second_show').hide();
				container.find('.minute_show').hide();	
				break;
			case 3:
				container.find('.second_show').hide();
				container.find('.minute_show').hide();
				container.find('.hour_show').hide();
				break;
			case 4:
				container.find('.day_show').hide();
				container.find('.minute_show').hide();
				container.find('.hour_show').hide();
			default:
				break;
		}
		function timerInt(){
			var day=0,
			hour=0,
			minute=0,
			second=0;//时间默认值	
			if(intDiff > 0){
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}else{
				window.clearInterval(int);
				if(options.callback){
					settings.callback(container);
				}
					
			};
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			container.find('.day_show').html(day+" 天 ");
			container.find('.hour_show').html(hour+' 时 ');
			container.find('.minute_show').html(minute+' 分 ');
			container.find('.second_show').html(second+' 秒 ');
			intDiff--;
		};
		var int=window.setInterval(timerInt,1000);
	};
	return {
		countdowntime:countdowntime
	}	
});