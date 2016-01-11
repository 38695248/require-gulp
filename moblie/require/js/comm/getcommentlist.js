// 获取评论
define(['jquery','config'],function($,config){
	var getcommentlist = function(options){
		var settings = {
			shareid:'',
			plnum:'',
			pl_num:'',
			num:2,
			pl_list:'',
			pl_box:$(".test"),
			type:''
	
		};
		if(options){
			$.extend(settings,options);	
		}
		if(shareView){
			settings.num = 4;		
		}
		AjaxFunUtils.ajaxInit({url:"/comment/read.html",//请求的数据地址
			params: { 'page': 1, 'pagenum':settings.num,"ajax":1 ,'shid':settings.shareid},//请求数据的参数
			callback:function(res){
				var li_html = '';
				var li_more = '<li class="text-right mt-15"><p class="blank5"></p><a href="/share/sharepage.html?shid='+settings.shareid+'" class="color-blue">查看所有更多评论</a></li>';
				if(shareView){
					li_more = '';
				}
				
				$.each(res.data.rows,function(index,o){
					if(o.isme){
						var reportAndDel = '<span class="fr shareBtn reportComment delCommentBtn" data-cmmid="'+o.cmmid+'" data-shid="'+o.shid+'"><em class="ico ico-delComment"></em></span>';	
					}else{
						var reportAndDel = '<span class="fr shareBtn reportComment reportBtn" data-type="comment" data-cmmid="'+o.cmmid+'" data-shid="'+o.shid+'"><em class="ico ico-reportComment"></em></span>';	
					}
					var reuser = '';
					if(o.fsuid > 0){
						reuser = ' 回复 <span class="color-blue btn-addpl" data-fsuid="'+o.fsuid+'" data-fuid_uname="'+o.fuid_uname+'">'+o.fuid_uname+'</span>';
					}
					var commentTem = '<li class="rowbox">'+
						'<a href="/share/myshares.html?fsuid='+o.suid+'&ukey='+ukey+'"><div class="rowbox avatar useravatar_bg w30 mr-5 mt-5">'+
							'<img class="userThumb avatar_loading" src="'+o.avatar[2]+'" data-original="'+o.avatar[1]+'">'+
							'</div></a>'+
							'<div class="row-flex1 avatar-text">'+
								'<div class="commenterWrapper">'+
									'<span class="color-blue btn-addpl" data-fsuid="'+o.suid+'" data-fuid_uname="'+o.fname+'">'+o.fname+'</span>'+
									''+reuser+'<span class="color-999"> • '+o.edttime+'</span>'+
									''+reportAndDel+''+
								'</div>'+
								'<div class="shareDesc color-555">'+o.comment+'</div>'+
							'</div>'+
					'</div>';
					li_html +=commentTem;
				});
				settings.pl_list.html(li_html+li_more);
				settings.plnum.text(settings.pl_num).attr("data-plnum",settings.pl_num);
				//头像图片懒加载
				settings.pl_list.find("img.avatar_loading").checkImgExists(function(obj,imgurl){
					var $myopj = obj;
					var myimgurl = imgurl;
					var $thisp = $myopj.parent(".useravatar_bg");
					$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
				});
				//添加按钮绑定
				commentBtnBind();
				//绑定删除按钮
				commentDel();
			}
		});		
	};
	return {
		getcommentlist:getcommentlist
	}	
});