define(["jquery","config"],function(e,t){var n=function(){e(".messageDel").unbind("click").bind("click",function(){var t=e(this).parents(".itemmsg"),n=t.attr("data-id");AjaxFunUtils.ajaxInit({url:"/message/del.html",params:{msgid:n},callback:function(e){e.status&&t.remove()}})})};return{messageDel:n}});