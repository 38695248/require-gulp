define(["jquery","config"],function(e,t){var n=function(t){function l(){var e=0,i=0,o=0,u=0;s>0?(e=Math.floor(s/86400),i=Math.floor(s/3600)-e*24,o=Math.floor(s/60)-e*24*60-i*60,u=Math.floor(s)-e*24*60*60-i*60*60-o*60):(window.clearInterval(c),t.callback&&n.callback(r)),o<=9&&(o="0"+o),u<=9&&(u="0"+u),r.find(".day_show").html(e+" 天 "),r.find(".hour_show").html(i+" 时 "),r.find(".minute_show").html(o+" 分 "),r.find(".second_show").html(u+" 秒 "),s--}var n={divid:e("#timesbox"),timers:60,callback:function(){},beforecall:function(){},type:0},r=n.divid,i='<span class="day_show">00 天 </span><span class="hour_show">00 时 </span><span class="minute_show">00 分 </span><span class="second_show">00 秒 </span>';t&&e.extend(n,t);var s=parseInt(n.timers),o=0,u=0,a=0,f=0;e(r).html(i),t.beforecall&&n.beforecall();switch(n.type){case 1:r.find(".second_show").hide();break;case 2:r.find(".second_show").hide(),r.find(".minute_show").hide();break;case 3:r.find(".second_show").hide(),r.find(".minute_show").hide(),r.find(".hour_show").hide();break;case 4:r.find(".day_show").hide(),r.find(".minute_show").hide(),r.find(".hour_show").hide();default:}var c=window.setInterval(l,1e3)};return{countdowntime:n}});