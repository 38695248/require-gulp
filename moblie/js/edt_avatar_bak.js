// JavaScript Document
var edt_avatar = function(){
	var avatarInt = function(){
		//edtImg();
		//头像懒加载
		$("#jc-pic-box").find(".avatar_loading").checkImgExists(
			function(){
				edtImg();	
			}
		);
		//上传头像
		creatWeixinGroup.upGroupAvatar({
			avatartype:'person',
			btn:$('.up_rzpic'),
			callback:function(opt){
				$('#targetImg').attr("src",opt.resin.data);	
				edtImg();
			}	
		});
		
	}; 
	//编辑图片
	var edtImg = function(){
		var api;
		$('#targetImg').Jcrop({
		  // 开始的Jcrop实现对光类
		  onChange: showCoords,//选框改变时的事件
		  allowResize:false,//禁止选框缩放
		  allowSelect: false,//禁止新选框
		  bgOpacity: 0.5,//背景透明度
		  bgColor: 'black',//背景颜色。颜色关键字、HEX、RGB 均可。
		  addClass: 'jcrop-light',//添加样式。假设class名为 "test"，则添加样式后为class="test jcrop-holder"
		  aspectRatio:1,//选框宽高比。说明：width/height
		  minSize :[100,100],//选框最小尺寸
		  maxSize:[300,300]//选框最大尺寸
		},function(){
		  var w = 100;
		  var h = 100;
		  var bodyH = getHeightBody();
		  var divH = bodyH -40-55;
		  var bodyW = getWidthBody();
		  var imgboxH = $("#jc-pic-box").height();
		  var top = 0;
		  if(divH > imgboxH){
			 top = divH - imgboxH;
		  }
		  $("#contentbox").css({"height":bodyH});
		  $("#jc-pic-box").css({"margin-top":top/2});
		  
		  var l = (divH - w)/2;
		  var t = (divH - h)/2;
		  
		  api = this;
		  //api.setImage(string);//设定（或改变）图像。例：jcrop_api.setImage("newpic.jpg")
		  //api.setOptions(object);//设定（或改变）参数，格式与初始化设置参数一样
		  //api.getBounds();//获取图片实际尺寸，格式为：[w,h]
		  //api.getWidgetSize();//获取图片显示尺寸，格式为：[w,h]
		  //api.getScaleFactor();//获取图片缩放的比例，格式为：[w,h]
		  api.setSelect([l,t,w,h]);//创建选框，参数格式为：[x,y,x2,y2]
		  api.setOptions({ bgFade: true });
		  api.ui.selection.addClass('jcrop-selection');
		  //console.log(api.tellSelect());//获取选框的值（实际尺寸）
		  //console.log(api.tellScaled());//获取选框的值（界面尺寸）
		  
		});
		function showCoords(c){
			savaImg({imgdata:c});
		};
	};
	//保存图片位置
	var savaImg = function(opt){
		$("#save-avatar-btn").unbind("click").bind("click",function(){
			console.log(opt.imgdata);
			AjaxFunUtils.ajaxInit({url: payUrl,
				params:opt.imgdata,
				callback: function(res){
					if(res.status == 1){
						window.location = '/myorder/payorder.html?orderid='+res.data.orderid;	
					}else{
						AlertUtils.tips({
							htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
							w:"90%",
							type:0
						});	
					}
				}
			})		
		});
		
	};
	return {avatarInt:avatarInt}
}();

