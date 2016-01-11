//公共模块
define(['jquery','config','ajax','comm/gzweixin','plugin/checkImgExists','lazyload'],function($,config,AjaxFunUtils,gz){
	var init = function(){
		if($("#viewpage").size()<=0 && $("#index_ad").size()<=0){
			var h_height = $(".headerbox").height();
			$(".mainbox").css({"padding-top":h_height});
		}
		//头像图片懒加载
		//$("img.avatar_lazy").checkImgExists(function(obj,imgurl){});
		//图片懒加载
		$("img.lazy,img.avatar_lazy").lazyload({
			effect: "fadeIn",
			threshold:500,//滚动条在离目标位置还有1000的高度时就开始加载图片
			failurelimit:100,
			skip_invisible : false 	
		});
		//返回键
		$('body').delegate(".back-btn","click",function(){
			window.history.back();	
		});	
		//获取头部购物车数据
		if($(".cartItemnum").size() > 0){
			getCartInit();
		}
		allsearch();
		footerUp();
		infomore();
		goTopExUtils({topdiv:$("#topButton")});
		gz.gzweixin({});
		shareawards();
		windowscrollInt();
	};
	//头部公共搜索
	var allsearch = function(){
		$(".searchstart").unbind("focus").bind("focus",function(){
			var placeholder = $(this).attr("data-placeholder");
			var searchtype = $(this).attr("data-searchtype");
			searchInt({placeholder:placeholder,searchtype:searchtype});	
		});
		$(".searchtop").unbind("click").bind("click",function(){
			var placeholder = $(this).attr("data-placeholder");
			var searchtype = $(this).attr("data-searchtype");
			searchInt({placeholder:placeholder,searchtype:searchtype});	
		});
		function searchInt(opt){
			var $searchbox = $('<div id="search-modalMask" class="modalMask" style="z-index:9996;display: block"></div>');
			
			$('body').append($searchbox);
				
			var searchUrl = '/common/gettpl.html?name=sns_searchinput&ch=sns';
			if(opt.searchtype == "weixingroup"){
				searchUrl = '/common/gettpl.html?name=sns_searchgroup&ch=sns';
			}
			AjaxFunUtils.ajaxInit({url: searchUrl,
				type: "GET",
				dataType: 'html',
				params:{},
				callback: function(data){
					$("body").append(data);
					var searchtyleval = "goods";
					$("#searchinput").addClass("loaded");
					$("#newsearchInt").focus();
					$("#searchtyleval").val(searchtyleval);
					//搜索选择分类
					selectsearchType();
					//搜索关键字
					searchTagbox();
					//关闭搜索
					closeSearch();
					//清空历史搜索
					$("#qingkong_btn").unbind("click").bind("click",function(){
						AjaxFunUtils.ajaxInit({
							url:'/m_search/clearwords.html',	
							params:'',
							callback:function(res){
								if(res.status == 1){
									$("#searchTagbox").html('');
									$("#qingkong_btn").hide();
								}
							}
						});
					});
				}
			});	
		};
		//搜索选择分类
		function selectsearchType(){
			$("#s-input-tab-txt").unbind("click").bind("click",function(){
				var isshow = $("#J_TabNav").is(":hidden");	
				if(isshow){
					$("#J_TabNav").show();	
				}else{
					$("#J_TabNav").hide();	
				}
			});
			$("#s-input-tab-txt").find("li").unbind("click").bind("click",function(){
				var thisval = $(this).text();
				var thisval_type = $(this).attr("data-val");
				$("#s-input-val").text(thisval);
				$("#s-input-val").attr("data-type",thisval_type);
				$("#searchtyleval").val(thisval_type);	
				//alert($("#searchtyleval").val());
				searchTagbox();
			});
		};
		function closeSearch(){
			$('#closeSearch,#search-modalMask').unbind("click").bind('click',function(){
				$("#searchinput").remove();
				$("#search-modalMask").remove();	
			});	
		}
		function searchTagbox(osearchtype){
			var thisT = $("#searchtyleval").val();
			var val = '';
			$("#newsearchInt").unbind('input').bind('input', function(){
				var $thisIput = $(this);
				thisT = $("#s-input-val").attr("data-type");
				val = $.trim($thisIput.val());
				ajaxSearch();
			});
			ajaxSearch();
			function ajaxSearch(){
				AjaxFunUtils.ajaxInit({
					url:'/m_search/getwordlists.html?t='+thisT+'&s='+val+'',	
					params:{},
					callback:function(res){
						if(res.status){
							$("#searchTagbox").show();
							var resSearchData = res.data.keyword;
							var lihtml ='<li class="li-title">历史记录</li>';
							if(val==''){
								lihtml ='<li class="li-title">历史记录</li>';
								$("#qingkong_btn").show();
							}
							$.each(resSearchData,function(index,keyword){
								lihtml+='<li><a href="/m_search/search.html?t='+thisT+'&s='+encodeURIComponent(keyword.val)+'" data-val='+keyword.val+'>'+keyword.val+'</a></li>';	
							});
							$("#searchTagbox").html(lihtml);
						}else{
							$("#searchTagbox").hide();
							$("#qingkong_btn").hide();
						}
					}
				});	
			}
		};
		
	};	
	//向上向下滚动判断
	var windowscrollInt = function(){
		//向上向下滚动判断
		var carfooter = $("#carfooter").size() >0?1:0;
		windowscroll(function(direction) {
			var mydirection = direction;
			if(mydirection == 'up'){
				$("#headerbox").show();
				if(!carfooter){	
					$("#footerbox").show();	
				}
			}else if(mydirection == 'down'){
				if(!carfooter){	
					$("#footerbox").hide();	
				}
				$("#headerbox").hide();	
			}else{
					
			}	
		});    
		function windowscroll( fn ) {
			var beforeScrollTop = document.body.scrollTop,
				fn = fn || function() {};
				window.addEventListener("scroll", function() {
				var afterScrollTop = document.body.scrollTop,
					delta = afterScrollTop - beforeScrollTop;
				if( delta === 0 ) return false;
				fn( delta > 0 ? "down" : "up" );
				beforeScrollTop = afterScrollTop;
			}, false);
		}
			
	};
	/*回到顶部*/
	var goTopExUtils = function(opt){
		var $this = opt.topdiv;
		$this.bind("click",function(){
			$("html,body").animate({scrollTop:0},100);
			$this.hide();
		});
		var getScrollTop = function(){
			return (document.body.scrollTop+document.documentElement.scrollTop);
		};
		var setScrollTop = function(value){
			if(navigator.appName=="Netscape" && navigator.userAgent.toUpperCase().indexOf("CHROME")>0){
				document.body.scrollTop=value;
			}else{
				document.documentElement.scrollTop=value;
			}
		};    
		window.onscroll=function(){getScrollTop()>0?$this.fadeIn():$this.fadeOut();};
	};
	//头部AJAX购物车信息列表
	var getCartInit	= function(){
		if(islogin==0){
			$(".cartItemnum").hide();
			return false;
		}
		AjaxFunUtils.ajaxInit({
			url:"/myorder/getcart.html",
			params:{partdata:"goods"},
			callback:function(res){
				var itemnum = res.data.itemnum;
				if(itemnum > 0){
					$(".cartItemnum").html(itemnum).show();	
					$(".cartItemnum").html(itemnum).show();	
				}else{
					$(".cartItemnum").hide();
					$(".cartItemnum").html(itemnum).show();		
				}
				
			}
		});	
	};
	//顶部消息
	var infomore = function(){
		var suid = $("#send").attr("data-suid");
		AjaxFunUtils.ajaxInit({
			"url":'/message/getmsgnum.html', 
			"params":{suid:suid}, 
			"callback":function (res) {
				if(res.status ==1){
					$(".infomore_num,.infomnum").text(res.data.num).show();	
				}
			}
		});
		$(".infomore_btn").unbind("click").bind("click",function(){
			var $thisparnt = $(this).parents(".top_r");
			var isshow = $thisparnt.find(".infomore").is(":hidden");
			if(isshow){
				$thisparnt.find(".infomore").show();
			}else{
				$thisparnt.find(".infomore").hide();	
			}
			$(document).unbind("click").bind('click',function(e){
				  var target = $(e.target);
				  if(target.closest($(".infomore_btn")).length == 0){
					$thisparnt.find(".infomore").hide();	
				  };
			});	
		});	
	};
	//分享奖励
	var shareawards = function(){
		if(urlfee_fromsuid && urlfee_url){
			setTimeout(shareawardsInt,5000);
			function shareawardsInt(){
				AjaxFunUtils.ajaxInit({
					"url":'/mk_market/urlfee.html', 
					"params":{fromsuid:urlfee_fromsuid,url:urlfee_url}, 
					"callback":function (res) {
						//console.log(res);	
					}
				});
			}
		}
	};
	//底部上传图片按钮
	var footerUp = function(){
		$(".shareUpload").unbind("click").bind("click",function(){
			$("#addbox").show();
			$("body").css({"overflow":"hidden"});
			$("#addbox_bg,#addbox_btn").unbind("click").bind("click",function(){
				$("#addbox").hide();
				$("body").css({"overflow":"auto"});	
			});	
		});
		//底部上传图片按钮
		$(".add-share").unbind("click").bind("click",function(){
			var ismjx = $(this).attr("data-ismjx");
			var ischecklogin = config.loginCheck();
			if(!ischecklogin){
				return false;	
			}
			require(['up'],function(up){
				up.uploadInit({
					tip:true,
					uptitle:'请选择1~5张图片上传',
					yzlogin:true,
					container:'allcontainer',
					browse_button:'allpickfiles',
					drop_element:'allcontainer',
					isarray:true,
					bucket:'share',
					isarray:true,
					multi_selection:true,
					auto_start:true,
					fileNumLimit:5,
					callback:function(oimgdata){
						var myoimgdata = oimgdata;
						up.successFun(myoimgdata,{ismjx:ismjx});	
					},
					bcallback:function(){}
				});
			});
		});
	};
	
	return {init:init,getCartInit:getCartInit};
});