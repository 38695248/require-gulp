// 产品筛选接口
define(['jquery','config','ajax','mas','comm/fixedTop','stopscroll'],function($,config,AjaxFunUtils,mas){
	var chooseInt =function(opt){
		var choose_btn = $("#choose_btn").size();
		if(choose_btn<=0){
			return false;	
		}
		var ischoose = $("#choose-list-modalMask").size();
		if(ischoose <= 0){
			AjaxFunUtils.ajaxInit({
				url: '/m_buy/get_cats.html',
				params:{catids:opt.catids,price:opt.price},
				callback:function(res){
					if(res.status == 1){
						var cats = res.data.cats;
						var price = res.data.price;
						var li_html = '';
						$.each(cats,function(index,o){
							li_html += '<li id="li_catids_'+index+'" class="rowbox li_click" data-index="'+index+'" data-catids=""><div class="row-flex1">'+o.name+'</div><div id="catids_'+index+'" class="catids_text">不限</div><div class="ico ico-jt"></div></li>';	
						});
						var ch_html = '<div id="choose-list-modalMask" class="modalMask" style="display:block; z-index: 9998;"></div>'+
						'<div id="choose-list" class="custom-list choose-list" style="display:block;">'+
							'<div class="choose_heard">'+
								'<div class="top_l"><span id="choose-close" class="ico ico-back-h choose-close" data-type="b"></span></div>'+
								'<div id="choose_sub_btn" class="top_r f16" data-type="b">确定</div>'+
								'<h2 class="text-center line40">筛选</h2>'+
							'</div>'+
							'<div id="choose_cont" class="choose_cont">'+
								'<div id="choose_cont_b">'+
									'<ul id="fenlei_div" class="jsbox">'+li_html+'</ul>'+
									'<ul class="jsbox">'+
										'<li id="li_catids_price" class="rowbox li_click" data-index="price" data-catids="" data-min_price="" data-max_price="">'+
										  '<div class="row-flex1">价格'+
										  '</div>'+
										  '<div id="li_price_text" class="catids_text">不限</div>'+
										  '<div class="ico ico-jt"></div>'+
										'</li>'+
									'</ul>'+
								'</div>'+
								'<div id="choose_cont_s"></div>'+
							'</div>'+
							'<div class="text-center mt-10"><button type="button" id="clear_btn" class="btn w100">清除选项</button></div>'+
						'</div>';
						$('body').append(ch_html);
						if(!li_html){
							$("#fenlei_div").hide();	
						}
						choosestype({cats:cats,price:price});
						setchooseH();
					}
				}
			});
		}else{
			//打开帅选窗口
			$("#choose-list-modalMask,#choose-list").show();	
		}
		//禁止浏览滚动条
		$("#choose-list-modalMask").stopscroll({});
	};
	//设置选项的高度
	var setchooseH = function(){
		var bodyH = config.base.getHeightBody();
		var new_h = bodyH - 50;
		$("#choose_cont").css({"height":new_h});	
	};
	var choosestype = function(opt){
		$("#choose-list-modalMask").unbind("click").bind("click",function(){
			$("#choose-list").hide();
			$("#choose-list-modalMask").hide();	
		});
		$("#clear_btn").unbind("click").bind("click",function(){
			$("#choose_cont_b").find(".li_click").each(function(index, element) {
				$(this).attr("data-catids","");
				$(this).attr("data-min_price","");
				$(this).attr("data-max_price","");
				$(this).find(".catids_text").text("不限");
			});	
			$("#choose_dh").find(".dhpjax").each(function(index, element) {
				var thisdurl = $(this).attr("data-durl");
				$(this).attr("data-url",thisdurl);
			});
		});
		
		$("#choose-list").find(".li_click").unbind("click").bind("click",function(){
			var thisindex = $(this).attr("data-index");
			if(thisindex == 'price'){
				var li_html = '';
				$.each(opt.price,function(index,o){
					li_html += '<li class="rowbox li_click_s" data-type="price" data-catid="'+o.min_price+'-'+o.max_price+'" data-min_price="'+o.min_price+'" data-max_price="'+o.max_price+'"><div class="row-flex1">'+o.min_price+' - '+o.max_price+'</div><i class="b_ico tick"></i></li>';	
				});
				var s_typehtml = '<ul class="jsbox">'+li_html+'</ul>';	
			}else{
				var li_html = '';
				$.each(opt.cats[thisindex].son,function(index,o){
					li_html += '<li class="rowbox li_click_s" data-type="s_type" data-catid="'+o.catid+'" data-text="'+o.name+'"><div class="row-flex1">'+o.name+'</div><i class="b_ico tick"></i></li>';	
				});
				var s_typehtml = '<ul class="jsbox">'+li_html+'</ul>';	
			}
			$("#choose_cont_s").html(s_typehtml);
			$("#choose_cont_b").hide();
			$("#clear_btn").hide();
			$("#choose_sub_btn").attr("data-type","s");
			$("#choose_sub_btn").attr("data-index",thisindex);
			$("#choose-close").attr("data-type","s");
			$("#choose-close").attr("data-index",thisindex);
			var num  = 0;
			//勾选已经选中历史
			if(thisindex == 'price'){
				var thisprice = $("#li_price_text").html();
				$("#choose_cont_s").find(".li_click_s").each(function(index, element) {
					var thiscatid = $(this).attr("data-catid");
					if(thiscatid == thisprice){
						$(this).addClass("current");
					}
				});
			}else{
				var catids = $(this).attr("data-catids");
				catids = catids.split("|");
				$("#choose_cont_s").find(".li_click_s").each(function(index, element) {
					var thiscatid = $(this).attr("data-catid");
					var $lithis = $(this);
					$.each(catids,function(index,o){
						if(thiscatid == o){
							$lithis.addClass("current");
						}	
					});
				});
				num = catids.length;
			}
		
			$("#choose_cont_s").find(".li_click_s").unbind("click").bind("click",function(){
				var type = $(this).attr("data-type");
				if(type == 'price'){
					var max_price = $(this).attr("data-max_price");
					var min_price = $(this).attr("data-min_price");
					$("#choose_cont_s").html('').show();
					$("#choose_cont_b").show();
					$("#clear_btn").show();
					//alert(thisindex);
					$("#li_catids_price").attr("data-min_price",min_price);
					$("#li_catids_price").attr("data-max_price",max_price);
					$("#li_price_text").text(min_price + '-' + max_price);
					$("#choose_sub_btn").attr("data-type","b");	
					$("#choose-close").attr("data-type","b");
				}else{
					var iscurrent = $(this).hasClass("current");					
					if(iscurrent){
						$(this).removeClass("current");	
						num -= 1;	
					}else{
						if(num <= 5){
							$(this).addClass("current");
							num += 1;	
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">最多只能选择5项</div>',
								type:0
							});
						}
					}	
					
				}
				
			});	
		});	
		$("#choose-close").unbind("click").bind("click",function(){
			var thistype = $(this).attr("data-type");
			if(thistype == 's'){
				$("#choose_cont_s").html('').show();
				$("#choose_cont_b").show();
				$("#clear_btn").show();
				$("#choose_sub_btn").attr("data-type","b");
				$("#choose-close").attr("data-type","b");	
			}else{
				$("#choose-list").hide();
				$("#choose-list-modalMask").hide();		
			}
		});
		$("#choose_sub_btn").unbind("click").bind("click",function(){
			var thistype = $(this).attr("data-type");
			
			if(thistype == 's'){
				var thisindex = $(this).attr("data-index");
				var currentcatids = '';
				var currenttexts = '';
				$("#choose_cont_s").find(".li_click_s").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					var this_catid = $(this).attr("data-catid");
					var this_text = $(this).attr("data-text");
					if(iscurrent){
						currentcatids += this_catid+'|';
						currenttexts += this_text+',';	
					}
				});
				//console.log(currenttexts);
				if(!currenttexts){
					currenttexts = '不限';	
				}
				$("#choose_cont_s").html('').show();
				$("#choose_cont_b").show();
				$("#clear_btn").show();
				//alert(thisindex);
				$("#li_catids_"+thisindex).attr("data-catids",currentcatids);
				$("#catids_"+thisindex).text(currenttexts);
				$("#choose_sub_btn").attr("data-type","b");
				$("#choose-close").attr("data-type","b");
			}else{
				var catids = '';
				var min_price = $("#li_catids_price").attr("data-min_price");
				var max_price = $("#li_catids_price").attr("data-max_price");
				$("#choose_cont_b").find(".li_click").each(function(index, element) {
                    var thiscatids = $(this).attr("data-catids");
					catids += thiscatids;
                });
				//关闭帅选窗口
				$("#choose-list-modalMask,#choose-list").hide();
				var li_price_text = $("#li_price_text").text();
				
				if(!catids && li_price_text == '不限'){
					//return false;	
				}
				
				var url = $("#choose_dh").find(".current").attr("data-durl")+"&catids_choose="+catids+"&min_price_choose="+min_price+"&max_price_choose="+max_price+"&ajax=true";
				$("#choose_dh").find(".dhpjax").each(function(index, element) {
                    var thisurl = $(this).attr("data-durl")+"&catids_choose="+catids+"&min_price_choose="+min_price+"&max_price_choose="+max_price+"&ajax=true";
					$(this).attr("data-url",thisurl);
                });
				$.ajax({
				  url: url,
				  dataType: 'html',
				  beforeSend: function(xhr){
					$(window).unbind('.infscr');//瀑布流滚动解绑
					var nvnexttop = $('#masonry_2').offset().top;
					$("#data-loading").remove();
					$('#masonry_2').html('<div class="imgloading" style="height:180px; width:100%"></div>');
					//window.scrollTo(0,nvnexttop-45);
					//xhr.setRequestHeader('X-PJAX', 'true')
				  },
				  success: function(data){
					$('#masonry_2').html(data);
					mas.masonryInit({
						masonry:"masonry_2",
						issearch:true,
						islazy:1,
						callback:function(){
						}
					});
					//history.pushState(null, $(data).filter('title').text(), url);
				  }
				})	
			}	
		});
	};
	return {chooseInt:chooseInt};	
});