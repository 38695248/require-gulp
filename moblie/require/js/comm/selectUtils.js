// 下拉框的常用方法
define(['jquery','config'],function($,config){
	var selectUtils = function(options){
		var settings = {
			divid: $(".select_showbox"),
			deNum:0,
			isDef:false,
			callback: null
		};
		if (options) {
		   $.extend(settings, options);
		}
		var tag_select = settings.divid;
		var div_show = tag_select.find('.select_option');
		var ul_option = div_show.find('ul');
		var select_showbox = tag_select.find('.select_showbox');
		var select_analog = tag_select.find('.select_analog');
		var li_option = ul_option.find('li');
		var thisW = tag_select.width();
		div_show.css({"width":thisW-20});
		
		
		if(settings.isDef == true){
			var li_def = ul_option.find("li:eq("+settings.deNum+")");
			var val_def = li_def.text();
			var index_def=li_def.attr('data-value')?li_def.attr('data-value'):li_def.val();
			li_def.addClass("active");
			select_showbox.find('span').text(val_def).addClass("active");
			select_showbox.find('span').siblings('em').addClass("active");
			tag_select.find('.select_showbox .select_analog').val(index_def);
		};
		
		var toggleFun = function(){
			select_showbox.toggle(function(){
				$(this).css({"z-index":99});
				div_show.show().css({"z-index":99});
			},function(){
				$(this).css({"z-index":0});
				div_show.hide().css({"z-index":0});
			});		
		};
		toggleFun();
		$(document).bind('click',function(e){
		  var target = $(e.target);
		  if(target.closest(tag_select).length == 0){
			div_show.hide();
			toggleFun();
		  };
		});
		li_option.on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			var value=$(this).text();
			var value_val=$(this).attr('data-value')?$(this).attr('data-value'):$(this).val();
			select_showbox.attr('data-value',value_val);
			select_showbox.find('span').text(value).addClass("active");
			select_showbox.find('span').siblings('em').addClass("active");
			tag_select.find('.select_showbox .select_analog').val(value_val);
			div_show.hide();
			toggleFun();
			if(settings.callback){
				settings.callback(value,value_val);	
			};
		});
		li_option.hover(function(){
			$(this).addClass('hover').siblings().removeClass('hover');
		},function(){
			$(this).removeClass('hover');
		});	
	};
	return {
		selectUtils:selectUtils
	}	
});