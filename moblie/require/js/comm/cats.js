// 获取评论
define(['jquery','config','ajax'],function($,config,AjaxFunUtils){
	var init = function(){
		$("#mylist").unbind("click").bind("click",function(){
			if($("#sns_cats").length>0){
				$("#cats-modalMask,#sns_cats").show();	
				$("body").css({"overflow":"hidden"});
			}else{
				AjaxFunUtils.ajaxInit({url:'/common/gettpl.html?name=sns_cats&ch=sns',
					type: "GET",
					dataType: 'html',
					isloading:true,
					params:{},
					callback: function(data){
						data +='<div id="cats-modalMask" class="modalMask" style="z-index:9996;display: block"></div>';
						$("body").append(data);
						$("#sns_cats").addClass("loaded");
						catslist({});
						closesns_cats();
						var bodyh = config.base.getHeightBody();
						$("#t_content_box,#t_sitebar_box").css({"height":bodyh});
						require(['comm/allsearch'],function(){});
						$("body").css({"overflow":"hidden"});
					}
				});
			}
			
		});
		function closesns_cats(){
			$('#closecats,#cats-modalMask').unbind("click").bind('click',function(){
				$("#cats-modalMask,#sns_cats").hide();	
				$("body").css({"overflow":"auto"});
			});	
		}
	};
	//一级分类
	var catslist = function(opt){
		//一级分类
		AjaxFunUtils.ajaxInit({
			url: '/m_buy/get_all_cats.html',
			params:{catid:opt.catid},
			callback:function(res){
				if(res.status == 1){
					var cats = res.data.cats;
					var li_html = '';
					var sondata = '';
					$.each(cats,function(index,o){
						if(index == 0){
							li_html += '<li class="rowbox cats_click current" data-catid="'+o.catid+'"><div class="row-flex1">'+o.name+'</div></li>';
							sondata = o.son;
						}else{
							li_html += '<li class="rowbox cats_click" data-catid="'+o.catid+'"><div class="row-flex1">'+o.name+'</div></li>';	
						}
					});
					if(!opt.catid){
						$("#t_sitebar_box").html(li_html);
					}
					soncatslist(sondata);
					$("#t_sitebar_box").find(".cats_click").unbind("click").bind("click",function(){
						var catid = $(this).attr("data-catid");
						$(this).addClass("current");
						$(this).siblings(".cats_click").removeClass("current");
						$("#son_soncats").html('<div class="imgloading" style="height:180px; width:100%"></div>');
						catslist({catid:catid});	
					});
				}
			}
		});
	},
	//二级分类
	soncatslist = function(sondata){
		var li_son = '';
		var li_son_son = '';
		$.each(sondata,function(oindex,oo){
			li_son += '<li><a href="'+oo.url+'"><p><img src="'+oo.img+'"></p><p class="line30">'+oo.name+'</p></a></li>';
			li_son_son += soncatslist_son({name:oo.name,sondata:oo.son});	
		});
		$("#t_content").html(li_son);
		$("#son_soncats").html(li_son_son);	
	},
	//三级分类
	soncatslist_son = function(opt){
		var li_son ='<div class="clearfix"><h3 class="line24 ml-10 mt-10">'+opt.name+'</h3><ul>';;
		$.each(opt.sondata,function(oindex,oo){
			li_son += '<li><a href="'+oo.url+'"><p><img src="'+oo.img+'"></p><p class="line30">'+oo.name+'</p></a></li>';	
		});
		li_son +='</ul></div>';
		return li_son;
	};

	return {
		init:init
	}	
});