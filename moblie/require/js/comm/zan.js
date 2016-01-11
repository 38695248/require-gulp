//点赞
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	var zanint = function(){
		//点赞按钮
		$(".btn-praise").unbind("click").bind("click", function () {
			var islike = $(this).attr("data-like");
			var shid = $(this).parents(".byshid").attr("data-shid");
			var $this = $(this);
			var $rowitem_zhan = $(this).parents(".byshid").find(".rowitem-zhan");
			var $zhannum = $(this).parents(".byshid").find(".zhannum");
			var zhannum = Number($zhannum.attr("data-zhannum"));
			var $avatar_list = $(this).parents(".byshid").find(".avatar-list");
			AjaxFunUtils.ajaxInit({url:"/share/like.html", 
				yzlogin:true,
				params:{shid:shid,likevalue:islike}, 
				callback:function (result) {
					if(result.status){
						if(islike==1){
							$this.removeClass("current");
							$this.attr("data-like","0");
							$this.find(".btn-praise-text").text(config.base.lang.js_shareView_like);
							if(zhannum <= 0){
								zhannum = 0;	
							}else{
								zhannum = zhannum - 1;
							}
							$zhannum.text(zhannum).attr("data-zhannum",zhannum);
						}else{
							$this.addClass("current");
							$this.attr("data-like","1");
							$this.find(".btn-praise-text").text(config.base.lang.js_shareView_unlike);
							zhannum = zhannum + 1;
							$zhannum.text(zhannum).attr("data-zhannum",zhannum);
							
						}
						//getlikelist(zhannum);
					}
				},
				errCallback:function(){
					$this.removeClass("btn-loading");	
				}
			});
			function getlikelist(ozhannum){
				AjaxFunUtils.ajaxInit({url: '/share/sharelikes.html?shid=' + shid,
					type: "GET",
					yzlogin:true,
					dataType: 'html',
					params:{},
					callback: function(data){
						$avatar_list.html(data);
						if(ozhannum > 0){
							$rowitem_zhan.show();
							//头像图片懒加载
							$avatar_list.find("img.avatar_lazy").checkImgExists(function(obj,imgurl){
								var $myopj = obj;
								var myimgurl = imgurl;
								var $thisp = $myopj.parent(".useravatar_bg");
								$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
							});
						}else{
							$rowitem_zhan.hide();	
						}
					}
				});
			};
		});
		//转发，分享
		$(".btn-repeat").unbind("click").bind("click", function () {
			var shid = $(this).parents(".byshid").attr("data-shid");
			var ishid = $(this).parents(".byshid").attr("data-ishid");
			
			var bigimgurl = $(this).attr("data-bigimgurl");
			var title = $(this).attr("data-title");
			var url = $(this).attr("data-url");
			AjaxFunUtils.ajaxInit({
				url: '/common/gettpl.html?name=sns_repeat&ch=sns',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params:{},
				callback: function(data){
					$("body").append(data);
					config.tip.centerDiv({
						divId:"sns_repeat",
						type:1,
						callback:function(){
							//百度分享初始化
							var thishost = "http://" + window.location.host;
							config.baiduShare({
								bdPic:bigimgurl,
								bdText:title,
								url:thishost + "/share/sharepage.html?shid=" + shid + "&ukey="+ukey+"",
								title:title,
								desc:title,
								summary:title
							});
							//站内分享
							require(['comm/znshare'],function(zn){
								zn.znshare({
									shid:shid,
									ishid:ishid,
									callback:function(){
										var mynumIndex = $("#sns_repeat").attr("data-index");
										config.tip.centerDivClosed({indexNum:mynumIndex,
											indexTipDiv:$("#sns_repeat"),type:1
										});
									}
								});	
							});
							
							//微信分享
							$("#byshare_weixin").unbind("click").bind("click",function(){
								config.shareweinxtip({});	
							});
						}
					})
				}
			});	
		});
		//编辑
		$(".btn-edit").unbind("click").bind("click",function(){
			var $thisParent = $(this).parents(".rowitem");
			var shid = $(this).attr("data-shid");
			var boradid = $(this).attr("data-boradid");
			require(['comm/editShare'],function(share){
				share.editShareInit({shid:shid,thisParent:$thisParent,boradid:boradid});			
			});
			
		});	
	};
	return {zanint:zanint};
});