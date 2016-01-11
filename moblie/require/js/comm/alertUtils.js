// 弹窗模块
define(['jquery','config'],function($,config){
	var tips = function(options){
		var settings = {
			htmlmsg:'',
			title:config.base.lang.js_base_tip,
			type:1,
			istop:false,
			position:"fixed",
			isShade:true,
			touchmove:0,
			callback:function(){},
			scallback:function(){},
			dcallback:function(){},
			closeback:function(){},
			w:"96%"
		};
		if(options){
			$.extend(settings,options);
		};
		var tipHtml ='<div class="tipbox-in" data-index="0">'+
				'<h1 class="tiptop">'+settings.title+'</h1>'+
				'<span class="ico02 tipclose closeBtn"></span>'+
				'<form class="tipForm">'+
				'<div class="tipcont">'+settings.htmlmsg+'</div>'+
				'<div id="tipbottom" class="tipbottom">'+
					'<div class="fr formFooterButtons">'+
						'<button class="btn-border btn rounded mr-5 btnCancel closeBtn" type="button">'+
							'<span class="buttonText">'+config.base.lang.js_base_cancel+'</span>'+
						'</button>'+
						'<button type="button" class="btn btn-danger btnTipsubmit">'+
							'<span class="buttonText">'+config.base.lang.js_base_confirm+'</span>'+
						'</button>'+
					'</div>'+
					'<div class="blank0"></div>'+
				'</div></form>'+
		'</div>',
		num = $(".modalMask").size(),
		tipDiv = $('<div id="tipbox_'+num+'" data-index="'+num+'" class="tipbox fade" style="width:'+settings.w+'">'+tipHtml+'</div>');
		if(settings.type == 0){
			tipDiv.find(".btnCancel").remove();
		};
		$("body").append(tipDiv);	
		if(options.callback){
			settings.callback();	
		};
		var myTipId = "tipbox_"+num;
		currentPosition({divId:myTipId,num:num,shade:settings.isShade,position:settings.position,istop:settings.istop,touchmove:settings.touchmove});
		
		tipDiv.find(".closeBtn").unbind("click").bind("click",function(){
			var numIndex = $(this).parents(".tipbox").attr("data-index");
			var myIndeTipDiv = $(this).parents(".tipbox");
			tipsClosed({myIndeTipDiv:myIndeTipDiv,numIndex:numIndex});	
			if(options.closeback){
				settings.closeback();	
			};
		});
		tipDiv.find(".btnTipsubmit").unbind("click").bind("click",function(){
			var numIndex = $(this).parents(".tipbox").attr("data-index");
			var myIndeTipDiv = $(this).parents(".tipbox");
			if(options.scallback){
				settings.scallback();	
			};
			tipsClosed({myIndeTipDiv:myIndeTipDiv,numIndex:numIndex});
			if(options.dcallback){
				settings.dcallback();	
			};
				
		});
	},
	centerDiv = function(options){
		var settings = {
			divId:'',
			isShade:true,
			w:"96%",
			type:0,
			istop:false,
			isbottom:false,
			position:"absolute",
			p_new:0,
			touchmove:0,
			callback:function(){},
			zcallback:function(){},
			closeback:function(){}
		};
		if(options){
			$.extend(settings,options);
		};
		var num = $(".modalMask").size();
		$("#" + settings.divId).attr("data-index",num);
		$("#" + settings.divId).css({"width":settings.w});
		if(options.callback){
			settings.callback({num:num});	
		};
		if(settings.p_new == 1){
			newcurrentPosition({divId:settings.divId,num:num,shade:settings.isShade,position:settings.position,callback:settings.zcallback,istop:settings.istop,touchmove:settings.touchmove,isbottom:settings.isbottom});	
		}else{
			currentPosition({divId:settings.divId,num:num,shade:settings.isShade,position:settings.position,callback:settings.zcallback,istop:settings.istop,touchmove:settings.touchmove,isbottom:settings.isbottom});
		}
		$(".closeBtnHtml").unbind("click").bind("click",function(){
			var mynumIndex = $(this).parents(".tipbox").attr("data-index");
			var myIndeTipDiv = $(this).parents(".tipbox");
			centerDivClosed({"indexTipDiv":myIndeTipDiv,"indexNum":mynumIndex,"type":settings.type});
			var num = $("#bigcategorybox").attr("data-index");
			config.tip.centerDivClosed({indexNum:num,indexTipDiv:$("#bigcategorybox"),type:1});	
			if(options.closeback){
				settings.closeback();
			}
		});
	},
	currentPosition = function(opt) {
		var mypos = opt.position;
		if(mypos == "absolute"){
			var c_left = getPageOffset().x + ($("body").width() - $("#" + opt.divId).width()) / 2;
			var c_top = getPageOffset().y + (config.base.getHeightBody() - $("#" + opt.divId).height()) / 2;
		}else{
			var c_left = ($("body").width() - $("#" + opt.divId).width()) / 2;
			var c_top = (config.base.getHeightBody() - $("#" + opt.divId).height()) / 2;
		};
		
		var len = $(".modalMask").size() *90 + 9999;
		var shodenum = opt.num;
		if(opt.shade){
			addShade({num:shodenum,touchmove:opt.touchmove});	
		};
		if (c_top <= 0 && !opt.istop) {
			c_top = 20;
		}else if(opt.istop){
			c_top = 0;	
		};
		if (c_left <= 0 && !opt.istop) {
			c_left = 20;
		}else if(opt.istop){
			c_left = 0;	
		};
		if(opt.isbottom == true){
			$("#" + opt.divId).css({
				"z-index":len + 1
			}).show();
		}else{
			$("#" + opt.divId).css({
				"left": c_left,
				"top": c_top,
				"position":mypos,
				"z-index":len + 1
			}).show().addClass("loaded");
		}
		if(opt.callback){
			opt.callback();	
		};
	},
	tipsClosed = function(opt){
		var myIndeNum = opt.numIndex;
		var myIndeTipDiv = opt.myIndeTipDiv;
		myIndeTipDiv.remove();
		$("#modalMask_" + myIndeNum).remove();
		if(opt.callback){
			opt.callback();	
		};
	},
	centerDivClosed = function(options){
		var settings = {
			indexNum:'',
			indexTipDiv:'',
			type:0,
			callback:function(){}
		};
		if(options){
			$.extend(settings,options);
		};
		if(settings.type == 1){
			settings.indexTipDiv.remove();	
			$("#modalMask_" + settings.indexNum).remove();	
		}else if(settings.type == 2){
			settings.indexTipDiv.hide();	
			$("#modalMask_" + settings.indexNum).remove();
		}else{
			settings.indexTipDiv.hide();	
			$("#modalMask_" + settings.indexNum).hide();
		};
		
		if(options.callback){
			settings.callback();	
		};
	},
	addShade = function(opt){
		var myIndex = opt.num;
		var len = opt.num *90 + 9998;
		var shadDiv = document.createElement('div');
		shadDiv.id = "modalMask_" + myIndex;
		shadDiv.className = "modalMask";
		$("body").append(shadDiv);
		$("#modalMask_" + myIndex).show().css({"z-index":len});
		//禁止浏览滚动条
		if(opt.touchmove == 1){
			$('#modalMask_' + myIndex).bind("touchmove",function(e){  
				e.preventDefault();  
			});
		}
	},
	getPageOffset = function() {
		var pageOffset = {};
		if (window.innerWidth) {
			pageOffset.x = window.pageXOffset;
			pageOffset.y = window.pageYOffset;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			pageOffset.x = document.documentElement.scrollLeft;
			pageOffset.y = document.documentElement.scrollTop;
		} else if (document.body.clientWidth) {
			pageOffset.x = document.body.scrollLeft;
			pageOffset.y = document.body.scrollTop;
		};
		return pageOffset;
	};
	return {
		tips:tips,
		centerDiv:centerDiv,
		tipsClosed:tipsClosed,
		centerDivClosed:centerDivClosed
	};
});
