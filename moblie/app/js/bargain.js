require.config({paths:{jquery:"http://static.byshare.com/moblie/js/jquery-1.8.3.min",config:"comm/config",base:"comm/base",ajax:"comm/ajax",up:"comm/uploadUtils",swiper:"libs/swiper.min",jquery_ui:"jqui/jquery-ui.min"}}),require(["jquery","config","base"],function(e,t,n){function r(){e(".money_btn_act").unbind("click").bind("click",function(){var n=e(this).attr("data-url"),r=(new Date).getTime();t.tip.tips({htmlmsg:'<div style="padding:20px 20px">'+n+"</div>"});var i=(new Date).getTime();console.log(i-r+"ms")})}e(".shareUpload").unbind("click").bind("click",function(){e("#addbox").addClass("show"),e("body").addClass("noScroll"),e("#addbox_bg,#addbox_btn").unbind("click").bind("click",function(){e("#addbox").removeClass("show"),e("body").removeClass("noScroll")})}),e(".add-share").unbind("click").bind("click",function(){var n=e(this).attr("data-ismjx"),r=t.loginCheck();if(!r)return!1;require(["up"],function(e){e.uploadInit({tip:!0,uptitle:"请选择1~5张图片上传",yzlogin:!0,container:"allcontainer",browse_button:"allpickfiles",drop_element:"allcontainer",isarray:!0,bucket:"share",isarray:!0,multi_selection:!0,auto_start:!0,fileNumLimit:5,callback:function(t){var r=t;e.successFun(r,{ismjx:n})},bcallback:function(){}})})}),r()});