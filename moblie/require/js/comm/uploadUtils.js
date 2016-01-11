//上传图片
define(['jquery','config','ajax','comm/shareUtils','qiniu/ui','qiniu/plupload.full.min','qiniu/qiniu'],function($,config,ajax,shareUtils){
	//七牛上传图片接口
	var uploaderQiNiu = function(options){
		var settings = {
			token:'',
			domain:'',
			bucket:'',
			typebucket:'',
			iscover:false,
			container:'upcontainer',
			browse_button:'uppickfiles',
			drop_element:'upcontainer',
			multi_selection:'',
			auto_start:true,
			picname:'',
			fileNumLimit:10,
			imgw:750,
			imgh:1000,
			startload:null,
			endload:null,
			callback:null,
			bcallback:null,
			previewback:null,
			upbtnback:null,
			selectFileAfer:null //选择文件后处理回调
		};
		
		if(options){
			$.extend(true,settings,options);
		}
		
		var imgListArr = [];//上传成功图片数组
		//alert(settings.multi_selection);
		var sets = {
			runtimes: 'html5,flash,html4',    //上传模式,依次退化
			browse_button: settings.browse_button,       //上传选择的点选按钮，**必需**
			//uptoken_url: '/qiniu/uptoken.html?bucket=test',
			//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
			uptoken : settings.token,
				//若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
			unique_names: false,
				// 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
			// save_key: true,
				// 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
			domain: settings.domain,
			multi_selection:settings.multi_selection,//是否可选择多张图
			bucket:settings.bucket, //域名，下载资源时用到，**必需**
			container: settings.container,           //上传区域DOM ID，默认是browser_button的父元素，
			resize : {width :settings.imgw, height : settings.imgh, quality : 100},
			filters : [
				{title : "Image files", extensions : "jpg,gif,png,jpeg"}
			],
			max_file_size: '5mb',           //最大文件体积限制
			flash_swf_url: 'plupload/Moxie.swf',  //引入flash,相对路径
			max_retries: 1,                   //上传失败最大重试次数
			dragdrop: true,                   //开启可拖曳上传
			drop_element: settings.container,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
			chunk_size: '4mb',                //分块上传时，每片的体积
			auto_start: settings.auto_start, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
			init: {
				'FilesAdded': function(up, files) {
					
					//上传，修改头像
					if(settings.typebucket == 2 && settings.typebucket == 2){
						//组件添加文件事件中，删除之前已添加的文件
						$.each(up.files, function (i, file) {
							if (up.files.length <= 1) {
								return;
							}
							up.removeFile(file);
						});
						if(options.previewback){
							//头像，形象图片上传前预览
							previewImage(files[0],function(opt){
								settings.previewback(function(){uploader2.start()},opt);
								//var ImgObj = new Image();
								//ImgObj.src = imgsrc; 
								//ImgObj.onload = function() {
									//alert(this.width+'-'+this.height);
									//var params = {w:this.width,h:this.height,imgsrc:imgsrc};
									//settings.previewback(function(){uploader2.start()},opt);
								//};
								
								//$("#imgbox").attr("src",imgsrc);
								
							});
						}
					}else{
						plupload.each(files, function(file) {
							//自己添加
							if(settings.auto_start == false && settings.typebucket == 4){
								previewImage(file,function(imgsrc){
									$("#uploadTable").append("<li id='"+file.id+"tr'><img src='"+imgsrc+"' /><button type='button' id='"+file.id+"btn' class='del_file_btn btn btn-s' data-id='"+file.id+"'>删除</button><span id='"+file.id+"_progress'></span></li>");
									//根据文件id删除此文件，并且在table中删除此文件的信息 
									$(".del_file_btn").unbind("click").bind("click",function(){
										var thisId = $(this).attr("data-id");
										uploader4.removeFile(thisId); 
										$("#"+thisId+"tr").remove(); 	
									});
									if(options.selectFileAfer){
										settings.selectFileAfer();	
									}
								});
							}
							// 文件添加进队列后,处理相关的事情
							var progress = new FileProgress(file, 'fsUploadProgress');
							progress.setStatus("等待...");
						});	
						if(settings.auto_start == false && options.upbtnback){
							settings.upbtnback(function(){uploader4.start()});
						}
					}
					//多张图片上传
					if(settings.multi_selection==true){
						if(uploader.files.length>settings.fileNumLimit){ // 最多上传10张图
							uploader.splice(settings.fileNumLimit,999);
						}
					}
				},
				'BeforeUpload': function(up, file) {
					//console.log(file);
					//return false;
					// 每个文件上传前,处理相关的事情
					var progress = new FileProgress(file, 'fsUploadProgress');
					var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					if (up.runtime === 'html5' && chunk_size) {
						progress.setChunkProgess(chunk_size);
					}
					if(!settings.tip){
						if(options.startload){
							settings.startload();
						}else{
							ajax.ajaxInit({url: '/common/gettpl.html?name=progress&ch=sns',
								type: "GET",
								yzlogin:true,
								isloading:true,
								dataType: 'html',
								params: '',
								callback: function(data){
									$("body").append(data);
									config.tip.centerDiv({divId:"dzuploadid",type:1});
								}
							});
						}
					}
				},
				'UploadProgress': function(up, file) {
					// 每个文件上传时,处理相关的事情
					var progress = new FileProgress(file, 'fsUploadProgress');
					var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
					progress.setProgress(file.percent + "%", up.total.bytesPerSec, chunk_size);
					if(settings.tip){
						$("#progress").find(".text").html(file.percent + "%");
						$("#progress").find(".percentage").css({"width":file.percent+"%"});
						$("#tipclose").hide();	
					}else{
						$("#progress").find(".text").html(file.percent + "%");
						$("#progress").find(".percentage").css({"width":file.percent+"%"});
					}
				},
				'FileUploaded': function(up, file, info) {
					   // 每个文件上传成功后,处理相关的事情
					   // 其中 info 是文件上传成功后，服务端返回的json，形式如
					   // {
					   //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
					   //    "key": "gogopher.jpg"
					   //  }
					   // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
					 
					 //var domain = up.getOption('http://7xjrtd.com1.z0.glb.clouddn.com/');
					 if(!settings.tip){
						if(options.endload){
							settings.endload();
						}else{
							var num = $('#dzuploadid').attr("data-index");
							config.tip.centerDivClosed({indexTipDiv:$('#dzuploadid'),type:1,indexNum:num});
						}
					 }
					 var res = $.parseJSON(info);
					 if(settings.typebucket == 2){
						//群头像和群二维码上传
						var imageInfoObj = avatarUp.imageInfo(res.key);	
					 }else if(settings.typebucket == 3){
						//认证图片上传
						var imageInfoObj = {};		
					 }else if(settings.typebucket == 4){
						//分享图片上传
						var imageInfoObj = needUp.imageInfo(res.key);
					 }else{
						//分享图片上传
						var imageInfoObj = shareUp.imageInfo(res.key);	
					 }
					 var new_w = imageInfoObj.width;
					 var new_h = imageInfoObj.height;
					 if(imageInfoObj.orientation == 'Right-top' || imageInfoObj.orientation == 'Left-bottom'){
						new_w = imageInfoObj.height;
						new_h = imageInfoObj.width;	 
					 }
					 imageInfoObj.width = new_w;
					 imageInfoObj.height = new_h;
					 if(settings.isarray){
						 var biliimg = new_w/236;
						 res.key = "/"+ res.key;
						 res.src = settings.domain + "/" + res.key+"?imageMogr2/auto-orient";
						 res.swidth = parseInt(new_w/biliimg);
						 res.sheight = parseInt(new_h/biliimg);
						 imageInfoObj.width = new_w;
						 imageInfoObj.height = new_h;					 
						 var res_new = $.extend(true,res,imageInfoObj);
						 imgListArr.push(res_new);
					 }else{
						 var res_new = $.extend(true,res,imageInfoObj);
						 imgListArr = res_new;
					 }
					 if(options.bcallback){
						 settings.bcallback(res,settings.domain);
					 }
					
					 //key = res.key;
				},
				'Error': function(up, err, errTip) {
					if(options.errorcallback){
						settings.errorcallback(up, err, errTip);	
					}else{
						config.tip.tips({
							htmlmsg:'<div style="padding:30px">'+errTip+'</div>',
							type:0,
							scallback:function(){
								var num = $('#dzuploadid').attr("data-index");
								config.tip.centerDivClosed({indexTipDiv:$('#dzuploadid'),type:1,indexNum:num});	
							}
						});
					}
					//上传出错时,处理相关的事情
				},
				'UploadComplete': function() {
					if(options.callback){
						//console.log(imgListArr);
						settings.callback(imgListArr,settings.domain);	
					}
					if(settings.tip){
						config.closeTip($("#uploadid"));
					}
					//alert('UploadComplete');
					   //队列文件处理完毕后,处理相关的事情
				},
				'Key': function(up, file) {
					//alert('Key');
					// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
					// 该配置必须要在 unique_names: false , save_key: false 时才生效
					var d = new Date();
					var vYear = d.getFullYear();
					var vMon = d.getMonth() + 1;
					var vDay = d.getDate();
					var h = d.getHours(); 
					var m = d.getMinutes(); 
					var s = d.getSeconds();
					if(h<=9){
						h = "0"+h;	
					}
					if(m<=9){
						m = "0"+m;	
					}
					if(s<=9){
						s = "0"+s;	
					}
					if(vMon<=9){
						vMon = "0"+vMon;	
					}
					if(vDay<=9){
						vDay = "0"+vDay;	
					}
					var datatime = vYear+""+vMon+""+vDay;
					var randomNum = String(Math.floor(Math.random()*100000000+1));
					if(randomNum.length < 4){
						randomNum = randomNum + "0000";	
					}
					randomNum = randomNum.substr(0,4);
					var key = datatime + "/"+suid+"/"+h+""+m+""+s+""+randomNum+".jpg";
					//console.log(settings.bucket);
					if(settings.iscover == true){
						key = settings.picname;	
					}
					//var key = "a.jpg";
					// do something with key here
					return key
				}
			}
		};
		
		//初始化上传按钮
		if(settings.typebucket == 2){
			//群头像和群二维码上传
			var avatarUp = new QiniuJsSDK();
			var uploader2 = avatarUp.uploader(sets);	
		}else if(settings.typebucket == 3){
			//认证图片上传
			var rzpicUp = new QiniuJsSDK();
			var uploader3 = rzpicUp.uploader(sets);	
		}else if(settings.typebucket == 4){
			//发布需求图片上传
			var needUp = new QiniuJsSDK();
			var uploader4 = needUp.uploader(sets);
		}else{
			//分享图片上传
			var shareUp = new QiniuJsSDK();
			var uploader = shareUp.uploader(sets);	
		}
	},
	//图片上传前预览
	previewImage = function(file,callback){
		//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
		if(!file || !/image\//.test(file.type)) return; //确保文件是图片
		if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function(){
				callback(fr.result);
				fr.destroy();
				fr = null;
			};
			fr.readAsDataURL(file.getSource());
		}else{
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				var bodyH = config.base.getHeightBody();
				var f_h = $("#footerbox").height();
				var a_h = $("#avatar_up_cmm").height();
				var headerbox_h = $("#headerbox").height();
				var divH = bodyH -f_h - a_h - headerbox_h;
				var bodyW = config.base.getWidthBody();
				var defW = thisW = preloader.width;
				var defH = thisH = preloader.height;
				var imgbili = thisW/thisH;
				if(bodyW >= 750){
					bodyW = 750;	
				}
				//alert(imgbili);
				//alert(bodyW + '-' + divH + '-' + bodyH);
				if(imgbili<=1){ 
						//高度等比缩放
						thisH = divH;
						//console.log(imgH);
						thisW = thisH*imgbili; 
				}else{
					
						thisW = bodyW;
						thisH = thisW/imgbili;
				};
				
				preloader.downsize( thisW, thisH );//先压缩一下要预览的图片,宽300，高300
				var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
				var settings = {
					imgsrc:imgsrc,
					bili:imgbili,
					w:thisW,
					h:thisH,
					dfw:defW,
					dfh:defH
				};
				callback && callback(settings); //callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load( file.getSource() );
		}	
	},
	uploadInit = function(options){
		var settings = {
			yzlogin:true,
			bucket:'share',
			typebucket:'',
			container:'upcontainer',
			browse_button:'uppickfiles',
			drop_element:'upcontainer',
			multi_selection:true,
			auto_start:true,
			picname:'',
			tip:false,
			isarray:false,
			imgw:736,
			imgh:1000,
			startcallback:function(){},
			callback:function(){},
			bcallback:function(){}
		};
		if(options){
			$.extend(settings,options);
		}
		//是否要登录
		if(settings.yzlogin){
			var loginflag = config.loginCheck(1);
			if(!loginflag){
				$("#up_input").hide();
				$("#upcontainer").unbind("click").bind("click",function(){
					config.loginCheck();
				});
				return false;
			}else if(settings.tip){
				allUp();
				return true;	
			}else{
				$("#up_input").show();
				//获取token
				getuptoken();	
			}
		}else{
			allUp();
			return true;	
		}
		function allUp(){
			ajax.ajaxInit({url: "/common/gettpl.html?name=uppic&ch=sns",//default/upload/index.html
				type: "GET",
				yzlogin:true,
				isloading:true,
				dataType: 'html',
				params: '',
				callback: function(data){
					$("body").append(data);
					$("#uppic_title").html(settings.uptitle);
					config.tip.centerDiv({
						divId:"uploadid",
						type:1,
						callback:function(){
							getuptoken();
						},
						closeback:function(){
						//location.reload();
					}});
				}
			})	
		}
		function getuptoken(){
			ajax.ajaxInit({
				"url":"/qiniu/uptoken.html", 
				"params":{bucket:settings.bucket,picname:settings.picname}, 
				"callback":function (res) {
					if(res.status == 1){
						if(options.startcallback){
							settings.startcallback(res);
						}
						settings.token=res.data.token;
						settings.domain=res.data.domain;
						settings.bucket=res.data.bucket;
						uploaderQiNiu(settings);
					}
				}
			});	
		}
	},
	//分享图片上传完成下一步处理方法
	successFun = function(oarrData,options){
		var settings= {
			share:'up',
			isOri:'true',
			boradid:'',
			fileNumLimit:10,
			ismjx:0
		};
		if(options){
			$.extend(true,settings,options);	
		}
		config.closeTip($("#uploadid"));
		shareUtils.addShareInit(oarrData,{share:settings.share,isOri:settings.isOri,boradid:settings.boradid,ismjx:settings.ismjx});
	};
	return {
		uploadInit:uploadInit,
		successFun:successFun	
	};	
});