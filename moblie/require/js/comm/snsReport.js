// 投诉，举报
define(['jquery','config'],function($,config){
	var snsReport = function(){
		$(".reportBtn").unbind("click").bind("click",function(){
			var type = $(this).attr("data-type");
			var cmmid = $(this).attr("data-cmmid");
			var shid = $(this).attr("data-shid");
			var fsuid = $(this).attr("data-fsuid");
			var msgid = $(this).attr("data-msgid");
			if(type=='comment'){
				var url ='/common/gettpl.html?name=sns_reportComment&ch=sns'; 	
			}else if(type == 'shares'){
				var url ='/common/gettpl.html?name=sns_report&ch=sns'; 
			}else if(type == 'msg'){
				var url ='/common/gettpl.html?name=sns_report&ch=sns'; 
			}
			
			
			AjaxFunUtils.ajaxInit({url: url,
				type: "GET",
				dataType: 'html',
				params:{},
				callback:function(data){
					$("body").append(data);	
					config.tip.centerDiv({
						"divId":"reportTip","type":1,
						"callback":function(){
							var num = $("#sns_more").attr("data-index");
							config.tip.centerDivClosed({
								indexNum:num,
								indexTipDiv:$("#sns_more"),
								type:1
							});	
							$("#reportFrom").checkInput({
								submitBtnFn: function (from) {
									config.base.loadInit({status:1});
									var dataFrom = from.serializeJson();
									dataFrom.shid = shid;
									dataFrom.suid  = suid;
									dataFrom.fsuid  = fsuid;
									dataFrom.cmmid  = cmmid;
									dataFrom.msgid  = msgid;
									dataFrom.type  = type;
									AjaxFunUtils.ajaxInit({url: '/report/index.html',
										params:dataFrom,
										callback:function(res){
											config.closeTip($("#reportTip"));
											config.tip.tips({
												type:0,
												htmlmsg:'<div style="padding:30px">' + res.msg+'</div>'
											});
											config.base.loadInit({status:0});
										},
										errCallback:function(){
											config.base.loadInit({status:0});	
										}
									})
								}	
							});
						}
					});
				}
			});
		});
		
	};
	return {
		snsReport:snsReport
	}	
});