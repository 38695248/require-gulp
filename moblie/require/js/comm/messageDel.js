// 删除聊天记录
define(['jquery','config'],function($,config){
	var messageDel = function(){
		$(".messageDel").unbind("click").bind("click",function(){
			var $this = $(this).parents(".itemmsg");
			var msgid = $this.attr("data-id");	
			AjaxFunUtils.ajaxInit({url: '/message/del.html',
				params: {msgid:msgid},
				callback:function(res){
					if(res.status){
						$this.remove();
						//alert(res.msg);	
					}else{
						//alert(res.msg);	
					}
				}
			});
		});
	};
	return {
		messageDel:messageDel
	}	
});