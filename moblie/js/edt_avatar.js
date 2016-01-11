// JavaScript Document
var edt_avatar = function(){
	var upsettins = {};
	var avatarInt = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
		//jcropInt();
		//头像懒加载
		$("#jc-pic-box").find(".avatar_loading").checkImgExists(
			function(i,j,params){
			  params.type = 'edt';
			  params.div = $("#target");
			  imgInt(params);
			}
		);
		//上传图片绑定
		if($("#avatar_up_cmm").length > 0){
			var picname = $("#avatar_up_cmm").attr("data-avatar");
			UploadUtils.uploadInit({
				container:'avatar_up_cmm',
				browse_button:'avatar_up_cmm_pickfiles',
				drop_element:'avatar_up_cmm',
				bucket:'avatar',
				iscover:true,
				auto_start:false,
				multi_selection:false,
				picname:picname,
				typebucket:2,
				callback:function(oimgdata){
					savaImg(upsettins);
				},
				previewback:function(previewback,options){
					addImg(options,previewback);
				}
			});
		}
	}; 
	//计算图片显示大小
	var imgInt = function(opt,oupload){
	  var bodyH = getHeightBody();
	  var f_h = $("#footerbox").height();
	  var a_h = $("#avatar_up_cmm").height();
	  var headerbox_h = $("#headerbox").height();
	  var divH = bodyH -f_h - a_h - headerbox_h;
	  var bodyW = getWidthBody();
	  var imgW_def=imgW = opt.w;
	  var imgH = opt.h;
	  var imgbili = imgW/imgH;
	  if(bodyW >= 750){
		  bodyW = 750;	
	  }
	  //console.log(imgbili);
	  if(imgbili<=1){ 
			//高度等比缩放
			imgH = divH;
			//console.log(imgH);
			imgW = imgH*imgbili; 
	  }else{
			imgW = bodyW;
			imgH = imgW/imgbili;
	  };
	 // alert("imgbili:"+imgbili +'divH:'+divH+ 'imgH:' +imgH+'imgW:'+imgW);
	 // var top = (divH - imgH)/2-20 ;
	 // $("#jc-pic-box").css({"margin-top":top});
	  var bili = imgW/imgW_def;
	  if(opt.type == 'edt'){
	  	 opt.bili = bili;
	  }else{
		 opt.bili = bili*opt.bili; 
	  }
	  
	  //console.log(opt.bili);
	  if(opt.type == 'edt'){
		$("#target").css({"width":imgW,"height":imgH});
		jcropInt(opt);  
	  }else{
		$("#target-new").css({"width":imgW,"height":imgH});
		jcropInt(opt,oupload);  
	  }
	  //jcropInt({bili:bili});
	}
	//新加图片
	var addImg = function(opt,upload){
		var imgDiv = '<img src="'+opt.imgsrc+'" class="avatar_loading" id="target-new" />';
		$("#jc-pic-box").html(imgDiv);
		opt.div = $("#target-new");
		imgInt(opt,upload);
	};
	//边框初始化
	var jcropInt = function(opt,oupload){
		// Create variables (in this scope) to hold the API and image size
		var uptype = $("#save-avatar-btn").attr("data-type");
		var maxSize = [300,300];
		var minSize = [100,100];
		var setSelect = [0,0,200,200];
		var aspectRatio = 1;
		if(uptype == 'figure'){
			maxSize = [800,600];
			minSize = [200,150];
			setSelect = [0,0,200,150];	
			aspectRatio = 4/3;
		}
		var api;
		var $div = opt.div;
		$div.Jcrop({
		  handleSize:10,//缩放按钮大小
		  bgColor:'black',//背景颜色
		  allowSelect: false,//禁止新选框
		  onChange: showCoords,
		  onSelect: showCoords,
		  maxSize:maxSize,
		  minSize:minSize,
		  aspectRatio: aspectRatio
		},function(){
		  api = this;
		  //api.setOptions({aspectRatio:1})
		  api.setSelect(setSelect);//创建选框，参数格式为：[x,y,x2,
		  //console.log(api.getBounds());//获取图片实际尺寸，格式为：[w,h]
		  //console.log(api.getWidgetSize());//获取图片显示尺寸，格式为：[w,h]
		  //console.log(api.getScaleFactor());//获取图片缩放的比例，格式为：[w,h]
		  //api.destroy();//移除 Jcrop
		  //api.enable();//启用 Jcrop
      	 
		});
	
		function showCoords(c){
			upsettins = {imgdata:c,bili:opt.bili};
		};
		
		$("#save-avatar-btn").unbind("click").bind("click",function(){
			//console.log(upsettins);
			//return false;
			if(opt.type !='edt'){
				oupload();
			}else{
				savaImg(upsettins);	
			}
		});
	};
	//保存图片位置
	var savaImg = function(opt){
		var h = parseInt(opt.imgdata.h/opt.bili);
		var w = parseInt(opt.imgdata.w/opt.bili);
		var x = parseInt(opt.imgdata.x/opt.bili);
		var y = parseInt(opt.imgdata.y/opt.bili);
		var cutsize = '!'+w+'x'+h+'a'+x+'a'+y+'';
		console.log("http://7xkdoy.com2.z0.glb.qiniucdn.com/000/08/07/76.jpg?imageMogr2/crop/"+cutsize);
		var act = $("#save-avatar-btn").attr("data-act");
		var gpid = $("#save-avatar-btn").attr("data-gpid");
		var type = $("#save-avatar-btn").attr("data-type");
		var isthird = $("#save-avatar-btn").attr("data-isthird"); 
		AjaxFunUtils.ajaxInit({url: '/common/avatar_up_cmm_back.html',
			params:{act:act,type:type,gpid:gpid,cutsize:cutsize,ch:'cut'},
			callback: function(res){
				if(res.status == 1){
					var ref = BaseInitClass.getQueryString("ref");
					if(ref){
						window.location = ref;
					}else{
						window.location = '/share/myshares.html';	
					}
				}else{
					AlertUtils.tips({
						htmlmsg:'<div style="padding:30px">'+res.msg+'</div>',
						w:"90%",
						type:0
					});	
				}
			}
		})
	};
	return {avatarInt:avatarInt}
}();

