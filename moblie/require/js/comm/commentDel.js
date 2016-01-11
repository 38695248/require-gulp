// 删除评论
define(['jquery','config'],function($,config){
	var commentDel = function(){
		$(".delCommentBtn").unbind("click").bind("click",function(){
			var $thisCom = $(this).parents(".shareDescriptionComment");
			var cmmid = $(this).attr("data-cmmid");
			var shid = $(this).attr("data-shid");
			var $pl_list = $(this).parents(".pl-list");
			var $plnum = $(this).parents(".pl-listbox").find(".plnum");
			var pl_num = Number($plnum.attr("data-plnum"));
			config.tip.tips({
				w:"90%",
				htmlmsg:'<div style="padding:30px">' + lang.js_base_del_text+'</div>',
				scallback:function(){
					AjaxFunUtils.ajaxInit({
						"url":"/comment/del_comment.html", 
						"params":{cmmid:cmmid,shid:shid}, "callback":function (result) {
							if(result.status){
								$thisCom.remove();
								pl_num = pl_num - 1;
								getcommentlist({shareid:shid,pl_list:$pl_list,plnum:$plnum,pl_num:pl_num});
							}else{
								config.tip.tips({
									w:"90%",
									htmlmsg:'<div style="padding:30px">' + result.msg+'</div>'
								});
							}
						}
					});			
				}
			});
			
		});
	};
	return {
		commentDel:commentDel
	}	
});