define(["jquery","config"],function(e,t){var n=function(t){var n={divid:e(".select_showbox"),deNum:0,isDef:!1,callback:null};t&&e.extend(n,t);var r=n.divid,i=r.find(".select_option"),s=i.find("ul"),o=r.find(".select_showbox"),u=r.find(".select_analog"),a=s.find("li"),f=r.width();i.css({width:f-20});if(n.isDef==1){var l=s.find("li:eq("+n.deNum+")"),c=l.text(),h=l.attr("data-value")?l.attr("data-value"):l.val();l.addClass("active"),o.find("span").text(c).addClass("active"),o.find("span").siblings("em").addClass("active"),r.find(".select_showbox .select_analog").val(h)}var p=function(){o.toggle(function(){e(this).css({"z-index":99}),i.show().css({"z-index":99})},function(){e(this).css({"z-index":0}),i.hide().css({"z-index":0})})};p(),e(document).bind("click",function(t){var n=e(t.target);n.closest(r).length==0&&(i.hide(),p())}),a.on("click",function(){e(this).addClass("active").siblings().removeClass("active");var t=e(this).text(),s=e(this).attr("data-value")?e(this).attr("data-value"):e(this).val();o.attr("data-value",s),o.find("span").text(t).addClass("active"),o.find("span").siblings("em").addClass("active"),r.find(".select_showbox .select_analog").val(s),i.hide(),p(),n.callback&&n.callback(t,s)}),a.hover(function(){e(this).addClass("hover").siblings().removeClass("hover")},function(){e(this).removeClass("hover")})};return{selectUtils:n}});