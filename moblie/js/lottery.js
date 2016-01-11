$.fn.lottery = function(options){
	var $this = $(this);
	var settings = {
		lotteryurl:'',
		index:-1,	//当前转动到哪个位置，起点位置
		count:0,	//总共有多少个位置
		timer:0,	//setTimeout的ID，用clearTimeout清除
		speed:20,	//初始转动速度
		times:0,	//转动次数
		cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize:-1,	//中奖位置
		click:false,
		btn:$("#lotteryBtn")
	};
	if(options){
		$.extend(settings,options);	
	}
	var init = function(id){
		if ($this.find(".lottery-unit").length>0) {
			var $units = $this.find(".lottery-unit");
			settings.count = $units.length;
			$this.find(".lottery-unit-"+settings.index).addClass("active");
		};
	};
	var roll = function(){
		var index = settings.index;
		var count = settings.count;
		$this.find(".lottery-unit-"+index).removeClass("active");
		index += 1;
		if (index>count-1) {
			index = 0;
		};
		$this.find(".lottery-unit-"+index).addClass("active");
		settings.index=index;
		return false;
	};
	var stop = function(index){
		settings.prize=index;
		return false;
	};
	var showlottery = function(osize){
		switch(osize){
			case 30:
				settings.prize = 1;	
				break;
			case 50:
				settings.prize = 2;
			case 30:
				settings.prize = 3;	
				break;
			case 50:
				settings.prize = 4;
			case 30:
				settings.prize = 1;	
				break;
			case 50:
				settings.prize = 1;
			case 30:
				settings.prize = 1;	
				break;
			case 50:
				settings.prize = 1;
			case 30:
				settings.prize = 1;	
				break;
			case 50:
				settings.prize = 1;
		}	
	};
	var rollstart = function(){
		settings.times += 1;
		roll();
		if (settings.times > settings.cycle+10 && settings.prize==settings.index) {
			clearTimeout(settings.timer);
			settings.prize=-1;
			settings.times=0;
			settings.click=false;
		}else{
			if (settings.times<settings.cycle) {
				settings.speed -= 10;
			}else if(settings.times==settings.cycle) {
				AjaxFunUtils.ajaxInit({
					url: settings.lotteryurl,
					params:{},
					callback:function(res){
						if(res.status == 1){
							showlottery(res.data.size);
						}
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							type:0
						});
					},
					errCallback: function(){
							
					}	
				});
				var index = Math.random()*(settings.count)|0;
				settings.prize = index;		
			}else{
				if (settings.times > settings.cycle+10 && ((settings.prize==0 && settings.index==7) || settings.prize==settings.index+1)) {
					settings.speed += 110;
				}else{
					settings.speed += 20;
				}
			}
			if (settings.speed<40) {
				settings.speed=40;
			};
			//console.log(settings.times+'^^^^^^'+settings.speed+'^^^^^^^'+settings.prize);
			settings.timer = setTimeout(rollstart,settings.speed);
		}
		return false;
	};
	var $btn = settings.btn;
	init();
	$btn.unbind("click").bind("click",function(){
		if (settings.click) {
			return false;
		}else{
			settings.speed=100;
			rollstart();
			settings.click=true;
			return false;
		}	
	})
};