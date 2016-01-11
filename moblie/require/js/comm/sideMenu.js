//我的更多信息
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	//我的更多信息
	var sideMenu = function(){
		var bodyW = $("#bodywidth").width();
		var side_w = bodyW*0.8;
		$(".mylist").unbind("click").bind("click",function(event){
			event.stopPropagation();//阻止事件往上冒泡
			var is_div = $("#side-menu").length;
			if(is_div <= 0){
				var $sidebox = $('<div id="side-modalMask" class="modalMask"></div><div id="side-menu" class="side-menu sb-slidebar" style="margin-left:'+-side_w+'px;width:'+side_w+'px"><div id="closeside" class="closeHead"><span class="ico02 closeside"></span></div></div>');
				$('body').append($sidebox);	
				AjaxFunUtils.ajaxInit({url:"/user/settinglist.html",//default/upload/index.html
					type: "GET",
					dataType: 'html',
					params: '',
					callback: function(data){
						$("#side-menu").append($(data).find(".settings").html());
						//头像图片懒加载
						$("#side-menu").find("img.avatar_lazy").checkImgExists(function(obj,imgurl){
							var $myopj = obj;
							var myimgurl = imgurl;
							var $thisp = $myopj.parent(".useravatar_bg");
							$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
						});
					}
				});	
			}
			var flag_show = $("#side-menu").is(":visible");
			var flag = 1;
			if(flag){
				$("#side-modalMask").show().css({"z-index":9998});
				$("#side-menu").show().css({"transform": "translate("+side_w+"px)","z-index":9999});
				flag = 0;	
			}else{
				$("#side-modalMask").hide();
				$("#side-menu").css({"transform": "translate(0px)"});
				flag = 1;
			}			
			
		});
		$("body").delegate("#closeside","click",function(){
			$("#side-menu").css({"transform": "translate(0px)"});
			$("#side-modalMask").hide();	
		});
		$(document).bind('click',function(e){
			  var target = $(e.target);
			  if(target.closest("#side-menu").length == 0){
				$("#side-menu").css({"transform": "translate(0px)"});
				$("#side-modalMask").hide();
			  };
			  
		});	
	};
	return sideMenu();
});