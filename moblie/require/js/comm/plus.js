// 封装一些plus切换调用的常用方法
define(['jquery','config'],function($,config){
	var plus = function(options){
		var settings = {
			divid:$("#plus"),
			defaultNum 	: 1,
			gradation 	: 1,
			isInt		: true,
			decimal 	: 2,
			minNum  	: 1,
			maxNum		: 1000000000000,
			callback:function(){return false;}
		};
		if (options) {
		   $.extend(settings, options);
		}
		var $this = settings.divid;
		var $plus = $this.find(".plus");
		var $minus = $this.find(".minus");
		var $number = $this.find(".number");
		var tempNum =settings.defaultNum;
		init();
		function init(){
			settings.decimal=settings.isInt?0:settings.decimal;
			//$number.val(settings.defaultNum.toFixed(settings.decimal));
		};
		
		$plus.unbind("click").bind("click",function(){
			var $thisNumber = $(this).siblings(".number").find("input");
			var ynum=num = Number($thisNumber.val());
			num=num+settings.gradation;
			//num=checkBoundary(settings.maxNum,settings.minNum,num).toFixed(settings.decimal);
			num=checkBoundary(settings.maxNum,settings.minNum,num);
			$thisNumber.val(num);
			if(options.callback){
				settings.callback(num,$(this),ynum);
			}
		});
		
		$minus.unbind("click").bind("click",function(){
			var $thisNumber = $(this).siblings(".number").find("input");
			var ynum=num = Number($thisNumber.val());
			num = num-settings.gradation;
			//num = checkBoundary(settings.maxNum,settings.minNum,num).toFixed(settings.decimal);
			num = checkBoundary(settings.maxNum,settings.minNum,num);
			$thisNumber.val(num);
			if(options.callback){
				settings.callback(num,$(this),ynum);
			}
		});
		
		$number.unbind("click").bind("keyup",function(){
			var num=$(this).val();
			var $this = $(this);
			if(num==""){
				tempNum=settings.defaultNum;
				return false;
			}else if(!checkNum(num,settings.isInt)||!checkMax(settings.maxNum,parseInt(num))){
				$(this).val(tempNum);
				config.tip.tips({
					htmlmsg:'<div style="padding:30px">输入错误，请重新输入。</div>',
					type:0
				});
				return false;
			};
			//tempNum=Number(num).toFixed(settings.decimal);
			if(options.callback){
				settings.callback(num,$(this));
			}
		});
		$number.change(function(){
			var num=$(this).val();
			if(num==""){
				tempNum=settings.defaultNum;
				return false;
			}else if(!checkNum(num,settings.isInt)||!checkMax(settings.maxNum,parseInt(num))){
				$(this).val(tempNum);
				config.tip.tips({
					htmlmsg:'<div style="padding:30px">The number you entered exceeds the maximum value or not in the correct format</div>'
				});
				return false;
			};
			//tempNum=Number(num).toFixed(settings.decimal);
			if(options.callback){
				settings.callback(num,$(this));
			}
		});
		$number.on("blur",function(){
			if($(this).val()==""){
				$(this).val(settings.defaultNum);
				return false;
			};
			$(this).val(Number($(this).val()).toFixed(settings.decimal));
		});
		function checkBoundary(maxNum,minNum,value){
			value=value > maxNum ? maxNum : value;
			value=value < minNum ? minNum : value;
			return value;
		};
		function checkNum (value,isInt){
			if(isInt){
				var reg=/^-?[1-9]\d*$/;
				return reg.test(value);	
			}else{
				return !isNaN(value);
			}
		};
		function checkMax(maxNum,value){
			return maxNum > value;
		};
	};
	return {
		plus:plus
	}	
});