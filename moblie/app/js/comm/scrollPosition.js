define(["jquery","config"],function(e,t){var n=function(t){var n={divid:e("#divid"),time:1e3,method:"click",callback:function(){}};t&&e.extend(n,t);var r=n.divid;r.bind(n.method,function(){var t=e("#"+e(this).attr("data-op"));e(this).siblings().removeClass("selected"),e(this).addClass("selected"),e("html,body").animate({scrollTop:t.offset().top-100},n.time)})};return{scrollPosition:n}});