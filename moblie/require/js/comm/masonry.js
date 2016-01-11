// 封装滚动到指定位置的常用方法
define(['jquery','config','pjax','infinitescroll','lazyload'],function($,config,pjax){
	var init = function(opt){
		var pagecol = $("#pagecol").val();
		var issearch = $("#isseacrch").val();
		var types = $("#types").val();
		var isfollow = $("#isfollow").val(); 
		var settings = {
			dataType:'html',
			appendjsonback:null
		};
		if(opt){	
			$.extend(true,settings,opt);
		}
		if(pagecol == 1){
			var divmas = 'masonry';
			if(opt.div){
				divmas = opt.div;	
			}
			if(issearch==1){
				masonryInit({masonry:divmas,dataType:settings.dataType,issearch:true,islazy:0,callback:function(){
					if(isfollow==1){
						require(['comm/followBtn'],function(followBtn){
							followBtn.followBtn();	
						});
					}
					if(opt.callback){
						opt.callback();	
					}
				},appendjsonback:settings.appendjsonback});	
			}else{
				
				masonryInit({masonry:divmas,dataType:settings.dataType,issearch:false,islazy:0,callback:function(){
					if(isfollow){
						require(['comm/followBtn'],function(followBtn){
							followBtn.followBtn();	
						});
					}
					if(opt.callback){
						opt.callback();	
					}
				},appendjsonback:settings.appendjsonback});	
			}	
		}else{
			var divmas = 'masonry_2';
			if(opt.div){
				divmas = opt.div;	
			}
			if(issearch==1){
				masonryInit({masonry:divmas,dataType:settings.dataType,issearch:true,islazy:1,callback:function(){
					if(isfollow==1){
						require(['comm/followBtn'],function(followBtn){
							followBtn.followBtn();	
						});
					}
					if(opt.callback){
						opt.callback();	
					}
				},appendjsonback:settings.appendjsonback});	
			}else{
				masonryInit({masonry:divmas,dataType:settings.dataType,issearch:false,islazy:1,callback:function(){
					if(isfollow==1){
						require(['comm/followBtn'],function(followBtn){
							followBtn.followBtn();	
						});
					}
					if(opt.callback){
						opt.callback();	
					}
				},appendjsonback:settings.appendjsonback});	
			}	
		}	
		
	};
	var masonryInit = function(options){
		var settings = {
			masonry:'masonry',
			navSelector:'.pager',
			nextSelector:'.pager .pager-next a',
			itemSelector:'.item',
			resize:true,//是否窗口大小改变
			islazy:true,//是否懒加载
			ispage:true,//是否有分页
			threshold:1000,//滚动条在离目标位置还有1000的高度时就开始加载图片
			failurelimit:20,
			issearch:false,//是否为搜索特殊需求
			skip_invisible : false,
			pathParse:'',//默认分页地址
			dataType:'html',
			appendjsonback:null,
			w:1,
			h:4,
			callback:null
		};
		/**/
		if(options){
			$.extend(settings,options);	
		}
		var $container = $('#' + settings.masonry),sTimer;
		var $itemSelector =$container.find(".item");
		var itemlen = $itemSelector.length;

		if(itemlen <= 0){
			return false;	
		}
		//pjax
		pjax.pjaxInt();
		//两列瀑布流
		var doublerow = function(otype){
			$container.find("img.lazy-mas").lazyload({	
				effect: "fadeIn",
				threshold : settings.threshold,	
				failurelimit:settings.failurelimit
			});	
		};
		//单列瀑布流
		var singlerow = function(){
			//显示隐藏购买按钮
			$container.find("img.lazy-mas").lazyload({
				effect: "fadeIn",	
				threshold : settings.threshold,
				failurelimit:settings.failurelimit
			});	
		};
		//懒加载及瀑布流加载函数
		if(settings.islazy == 1){
			//两列瀑布流
			doublerow();			
		}else{
			//单列瀑布流
			singlerow();	
		}

		if(settings.ispage){
			var searchflag = false;
			if(settings.issearch){
				searchflag = true;	
			}
			$container.infinitescroll({
					navSelector: settings.navSelector,    // 在分页导航器
					nextSelector: settings.nextSelector,  // 下一个链接的选择器（2页） 
					itemSelector: settings.itemSelector,     // 您将检索的所有项目的选择器
					donetext: '<p style="padding-top:15px">No more pages to load.</p>',
					loadingImg: static_url + '/moblie/images/loading.gif',
					dataType:settings.dataType,
					loading:{
						finished:function(){
							$('#data-loading').animate({opacity: .8}, 2000).fadeOut('normal');
						}
					},
					//debug:true,
					bufferPx     : 400,//提示语展现的时长，数字越大，展现时间越短
					pixelsFromNavToBottom:50,//滚动条到底部距离触发下一页
					searchflag:searchflag,
					pathParse:settings.pathParse,
					errorCallback: function () {//当出错的时候，比如404页面的时候执行的函数
						// fade out the error message after 2 seconds
						jQuery('#data-loading').animate({opacity: .8}, 2000).fadeOut('normal');
					}
				},
				function(arrayOfNewElems){
					
					if(options.dataType == 'json'){
						settings.appendjsonback(arrayOfNewElems);
						if(options.callback){
							settings.callback();	
						}
						return true;	
					}
					
					//$(arrayOfNewElems).appendTo($container);
					if(settings.islazy == 1){
						$(arrayOfNewElems).each(function(index, element) {
							if(index%2==0){
								$container.find(".rightbox").append($(this));
							}else{
								$container.find(".leftbox").append($(this));
							}
							$(this).find("img.lazy-mas").lazyload({	
								threshold : settings.threshold,	
								failurelimit:settings.failurelimit
							});
						});
					}else{
						$(arrayOfNewElems).appendTo($container);
						//头像图片懒加载
						$("img.avatar_lazy").checkImgExists(function(obj,imgurl){
							var $myopj = obj;
							var myimgurl = imgurl;
							var $thisp = $myopj.parent(".useravatar_bg");
							$thisp.css({"background": "url("+myimgurl+") no-repeat","background-size": "cover"});		
						});	
						//单列瀑布流
						singlerow();
					}
					if(options.callback){
						settings.callback();	
					}
				}
			);
		}
	};
	return {
		init:init,
		masonryInit:masonryInit
	}	
});