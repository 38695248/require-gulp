var dzClass = function(){
	var basedz = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	//上传图片
	var uploadpicDz = function(){
		//获取token
		getuptoken();
		function getuptoken(){
			AjaxFunUtils.ajaxInit({
				"url":"/qiniu/uptoken.html", 
				"params":{bucket:"yinhua"}, 
				"callback":function (res) {
					if(res.status == 1){
						uploaderQiNiu({
							token:res.data.token,
							domain:res.data.domain,
							bucket:res.data.bucket
						});
						//底部按钮初始化
						footerMenu(res.data.domain);
					}
				}
			});
		};
		
		//拖动放大图片
		function dragAndResiza(){
			var img_w = $("#printableImg").width();
			var img_h = $("#printableImg").height();
			var aspectRatio = img_w/img_h;
			var img_left = $("#printableImgBox").position().left;
			var img_left = $("#printableImgBox").position().top;

			$( "#printableImgBox" ).resizable({
				containment:'parent',
				aspectRatio:aspectRatio,
				alsoResize: '#printableImg',
				start:function(){
					$("#printableArea").addClass("printableArea-over");	
				},
				stop:function(){
					$("#printableArea").removeClass("printableArea-over");	
				}
			});
			$( "#printableImgBox" ).draggable({
				containment:'parent' ,
				start:function(){
					$("#printableArea").addClass("printableArea-over");	
				},
				stop: function(event, ui) { 
					$("#printableArea").removeClass("printableArea-over");	
					var printableArea_w = $("#printableArea").width();
					var printableArea_h = $("#printableArea").height();
					var printableImgBox_l = $("#printableImgBox").position().left;
					var printableImgBox_t = $("#printableImgBox").position().top;
					var printableImgBox_w = $("#printableImgBox").width();
					var printableImgBox_h = $("#printableImgBox").height();	
					var l_flag = printableArea_w - printableImgBox_w - printableImgBox_l;
					var maxtop = printableArea_h - printableImgBox_h;
					//console.log(t_flag);
					if(l_flag <=0){
						$("#printableImgBox").css({"left":printableArea_w - printableImgBox_w});	
					}
					if(printableImgBox_t > maxtop){
						$("#printableImgBox").css({"top":maxtop});	
					}
					img_left = $("#printableImgBox").position().left;
					img_top = $("#printableImgBox").position().top;
					$(".printableImgLeft").val(img_left);
					$(".printableImgTop").val(img_top);
				} 
			});	
		};
		//显示图片
		function viewImg(options){
			var settings = {
				key:'',
				imgUrl:''	
			};	
			if(options){
				$.extend(settings,options);	
			}
			var ImgObj = new Image();  
			var newimgUrl = settings.imgUrl+'?imageMogr2/auto-orient';
			ImgObj.src = newimgUrl; 
			console.log(settings.imgUrl);
			ImgObj.onload = function() {
				var printableArea_w = $("#printableArea").width();
				var printableArea_h = $("#printableArea").height();
				var imgWidth = ImgObj.width;
				var imgHeight = ImgObj.height;
				var imgBili = imgWidth/imgHeight;
				console.log("imgWidth:" + imgWidth);
				console.log("imgHeight:" + imgHeight);
				
				if(imgWidth > printableArea_w){
					imgWidth = printableArea_w;
					imgHeight = imgWidth/imgBili-2;
				}
				if(imgHeight > printableArea_h){
					imgHeight = printableArea_h;
					imgWidth = imgHeight*imgBili-2;
				}
				
				var ImgBox_l = (printableArea_w - imgWidth)/2;
				var ImgBox_t = (printableArea_h - imgHeight)/2;
				
				$("#printableImg").attr("src",newimgUrl);
				$("#printableImg").attr("data-key",settings.key);
				$("#printableImg").attr("data-url",settings.imgUrl);
				$("#printableImg").css({"width":imgWidth,"height":imgHeight});
				$("#printableImgBox").css({"width":imgWidth,"height":imgHeight,"top":ImgBox_t,"left":ImgBox_l});
				$(".printableImgLeft").val(ImgBox_l);
				$(".printableImgTop").val(ImgBox_t);
				dragAndResiza();
			};
			// 为Image对象添加图片加载失败的处理方法
			ImgObj.onerror = function() {
				
			}; 
		};
		//点击下一步
		$("#next-btn").unbind("click").bind("click",function(){
			var is_key = $("#printableImg").attr("data-key");
			if(!is_key){
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">亲，您还没有上传图片！如果不需要图片定制，请点击确定。</div>',
					scallback:function(){
						var activity = BaseInitClass.getQueryString("act");
						var printableGdid = $(".printableGdid").val();
						var printableColor = $(".printableColor").val();
						var url = '/share/sharepage.html?gdid='+printableGdid+'&ukey='+ukey+'&activity='+activity+'&img_print=emptypic&img_pview=emptypic&color='+printableColor+'#fanspage';	
						window.location.href = url;	
					}
				});	
				return false;	
			}
			var printableColor = $(".printableColor").val();
			var printableGdid = $(".printableGdid").val();
			var bili = 794/$("#printableArea").width();
			var xbili = $("#product-positive").height()/490;
			//图片实际放大的宽度
			var img_shiji_w=513 * xbili;
			//图片看不到的部分
			var img_overflow = img_shiji_w - $("#product-positive").width();
			//console.log("xbili:" + xbili);
			//console.log("img_shiji_w:" + img_shiji_w);
			//console.log("img_overflow:" + img_overflow);
			
			var print_bg = $("#product-positive").attr("data-key");
			var printableImgBox_h = parseInt($("#printableImgBox").height()*bili-5);
			var printableImgBox_w = parseInt($("#printableImgBox").width()*bili-5);
			var printableArea_dx = parseInt($("#printableArea").position().left);
			var printableArea_dy = parseInt($("#printableArea").position().top);
			var product_h = parseInt($("#printableImgBox").height()/xbili-5);
			var product_w = parseInt($("#printableImgBox").width()/xbili-5);
			var printableImgLeft = $(".printableImgLeft").val();
			var printableImgTop = $(".printableImgTop").val();
			var dx = parseInt(printableImgLeft*bili);
			var dy = parseInt(printableImgTop*bili);
			var xdx = parseInt((Number(printableImgLeft)+printableArea_dx+img_overflow/2)/xbili);
			var xdy = parseInt((Number(printableImgTop) + printableArea_dy)/xbili);
			var imgUrl = $("#printableImg").attr("data-url");
			var key = $("#printableImg").attr("data-key");

			suofangImg({
				print_bg:print_bg,
				imgUrl:imgUrl,
				w:printableImgBox_w,
				h:printableImgBox_h,
				xw:product_w,
				xh:product_h,
				dx:dx,
				dy:dy,
				xdx:xdx,
				xdy:xdy,
				key:key,
				printableColor:printableColor,
				printableGdid:printableGdid
			});
		});
		//七牛处理缩放图片
		function suofangImg(options){
			var settings = {
				print_bg:'',
				imgUrl:'',
				w:'',
				h:'',
				xw:'',
				xh:'',
				dx:'',
				dy:'',
				xdx:'',
				xdy:'',
				key:'',
				printableColor:'',
				printableGdid:''
			};
			if(options){
				$.extend(settings,options);	
			}
			//打印图放大
			var imageMogr2 = settings.imgUrl + "?imageMogr2/auto-orient/thumbnail/"+settings.w+"x";
			//console.log(settings.w);
			//console.log(imageMogr2);
			//效果图放大
			var ximageMogr2 = settings.imgUrl + "?imageMogr2/auto-orient/thumbnail/"+settings.xw+"x";
			//console.log(settings.xw);
			//console.log(ximageMogr2);
			//console.log(imageMogr2);
			//返回效果图
			var xgimg = hechengxgImg({
				print_bg:settings.print_bg,
				w:settings.xw,
				h:settings.xh,
				xdx:settings.xdx,
				xdy:settings.xdy,
				key:settings.key,
				sourceLink:ximageMogr2	
			});
			//console.log(xgimg);
			//返回打印图
			var priimg = hechengImg({
				print_bg:settings.print_bg,
				w:settings.w,
				h:settings.h,
				dx:settings.dx,
				dy:settings.dy,
				key:settings.key,
				sourceLink:imageMogr2	
			});
			//console.log(priimg);
			sendByshareSave({
				printableColor:settings.printableColor,
				printableGdid:settings.printableGdid,
				xgimg:xgimg,
				priimg:priimg	
			});		
		};
		//发送到byshare服务器
		function sendByshareSave(options){
			var settings = {
				printableColor:'',
				printableGdid:'',
				xgimg:'',
				priimg:''
			};
			if(options){
				$.extend(settings,options);	
			}
			var activity = BaseInitClass.getQueryString("act");
			var url = '/share/sharepage.html?gdid='+settings.printableGdid+'&ukey='+ukey+'&activity='+activity+'&img_print='+encodeURIComponent(settings.priimg)+'&img_pview='+encodeURIComponent(settings.xgimg)+'&color='+settings.printableColor+'#fanspage';	
			//window.location.href = url;
		};
		//七牛处理合成图片：效果图
		function hechengxgImg(options){
			var settings = {
				print_bg:'',
				imgboxH:'',
				imgboxW:'',
				xdx:'10',
				xdy:'10',
				key:'',
				sourceLink:''
			};
			if(options){
				$.extend(settings,options);	
			}
			//console.log("settings.xdx:" + settings.xdx);
			//console.log("settings.xdy:" + settings.xdy);
			if(settings.xdx<=0){
				settings.xdx = 1;	
			}
			if(settings.xdy <= 0){
				settings.xdy = 1;	
			}
			
			var imgLink = Qiniu.watermark({
				 mode: 1,  // 图片水印
				 image: settings.sourceLink, // 图片水印的Url，mode = 1 时 **必需**
				 dissolve: 100,          // 透明度，取值范围1-100，非必需，下同
				 gravity: "NorthWest",  // 水印位置，为以下参数[NorthWest、North、NorthEast、West、Center、East、SouthWest、South、SouthEast]之一
				 dx: settings.xdx,  // 横轴边距，单位:像素(px)
				 dy: settings.xdy   // 纵轴边距，单位:像素(px)
			 },settings.print_bg);      // key 为非必需参数，下同
			 console.log(imgLink);	
			 if(settings.key){
				return imgLink;
			 }
			 
		};
		//七牛处理合成图片：打印图
		function hechengImg(options){
			var settings = {
				print_bg:'',
				imgboxH:'',
				imgboxW:'',
				dx:'10',
				dy:'10',
				key:'',
				sourceLink:''
			};
			if(options){
				$.extend(settings,options);	
			}
			if(settings.dx<=0){
				settings.dx = 1;	
			}
			if(settings.dy <= 0){
				settings.dy = 1;	
			}
			var imgLink = Qiniu.watermark({
				 mode: 1,  // 图片水印
				 image: settings.sourceLink, // 图片水印的Url，mode = 1 时 **必需**
				 dissolve: 100,          // 透明度，取值范围1-100，非必需，下同
				 gravity: "NorthWest",  // 水印位置，为以下参数[NorthWest、North、NorthEast、West、Center、East、SouthWest、South、SouthEast]之一
				 dx: settings.dx,  // 横轴边距，单位:像素(px)
				 dy: settings.dy   // 纵轴边距，单位:像素(px)
			 },"printbg.jpg");      // key 为非必需参数，下同
			 console.log(imgLink);
			 if(settings.key){
				return imgLink;
			 }
			 
		};
		//七牛上传图片接口
		function uploaderQiNiu(options){
			var settings = {
				token:'',
				domain:'',
				bucket:''
			};
			if(options){
				$.extend(settings,options);
			}	
			var uploader = Qiniu.uploader({
				runtimes: 'html5,flash,html4',    //上传模式,依次退化
				browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
				//uptoken_url: '/qiniu/uptoken.html?bucket=test',
				//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
				uptoken : settings.token,
					//若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
				unique_names: false,
					// 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
				// save_key: true,
					// 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
				domain: settings.domain,
				multi_selection:false,//是否可选择多张图
				bucket:settings.bucket, //域名，下载资源时用到，**必需**
				container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
				max_file_size: '100mb',           //最大文件体积限制
				flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
				max_retries: 3,                   //上传失败最大重试次数
				dragdrop: true,                   //开启可拖曳上传
				drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
				chunk_size: '4mb',                //分块上传时，每片的体积
				auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
				init: {
					'FilesAdded': function(up, files) {
						
						plupload.each(files, function(file) {
							// 文件添加进队列后,处理相关的事情
							var progress = new FileProgress(file, 'fsUploadProgress');
							progress.setStatus("等待...");
						});
					},
					'BeforeUpload': function(up, file) {
						   // 每个文件上传前,处理相关的事情
						var progress = new FileProgress(file, 'fsUploadProgress');
						var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
						if (up.runtime === 'html5' && chunk_size) {
							progress.setChunkProgess(chunk_size);
						}
						AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=progress&ch=sns',
							type: "GET",
							yzlogin:true,
							isloading:true,
							dataType: 'html',
							params: '',
							callback: function(data){
								$("body").append(data);
								AlertUtils.centerDiv({divId:"dzuploadid",type:1});
							}
						});
					},
					'UploadProgress': function(up, file) {
						   // 每个文件上传时,处理相关的事情
						var progress = new FileProgress(file, 'fsUploadProgress');
						var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
						progress.setProgress(file.percent + "%", up.total.bytesPerSec, chunk_size);
						$("#progress").find(".text").html(file.percent + "%");
						$("#progress").find(".percentage").css({"width":file.percent+"%"});
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
						 var res = $.parseJSON(info);
						 var sourceLink = settings.domain + "/" + res.key; //获取上传成功后的文件的Url
						 viewImg({
							key:res.key,
							imgUrl:	sourceLink 
						});
						 //key = res.key;
					},
					'Error': function(up, err, errTip) {
						//alert('Error');
						   //上传出错时,处理相关的事情
					},
					'UploadComplete': function() {
						var num = $('#dzuploadid').attr("data-index");
						AlertUtils.centerDivClosed({indexTipDiv:$('#dzuploadid'),type:1,indexNum:num});
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
						var datatime = vYear+""+vMon+""+vDay;
						var randomNum = Math.floor(Math.random()*10000000+1);
						var key = datatime + "/"+suid+"/"+h+""+m+""+s+""+randomNum+".jpg";
						// do something with key here
						return key
					}
				}
			});		
		};
	};
	//选择颜色
	var selectColorbox = function(odomain){
		//检查选中了什么颜色
		var mydomain = odomain;
		var thisGdid = $(".printableGdid").val();
		var thisColor = $(".printableColor").val();
		var thisType = $(".printableType").val();
		checkColor();
		function checkColor(){
			var colorshtml='';
			$.each(goods,function(index,o){
				if(o.gdid == thisGdid){
					$.each(o.colors,function(oindex,oo){
						var colorhtml = '<div class="ColorCircle" data-color="'+oo.val+'" data-title="'+oo.name+'" data-img="'+oo.img+'"><span class="color is-white" style="background:#'+oo.val+'"></span></div>';
						
						if(oo.val == thisColor){
							colorhtml = '<div class="ColorCircle is-selected" data-color="'+oo.val+'" data-img="'+oo.img+'"><span class="color is-white" style="background:#'+oo.val+'"></span></div>';	
							var randomNum = 1;
							$("#product-positive").css({"background-image":"url("+mydomain+"/"+oo.img+".jpg?v="+randomNum+")"});
							$("#product-positive").attr("data-key",oo.img+".jpg");
						}
						colorshtml+=colorhtml;	
					});
					$("#selectColors").html(colorshtml);
					return true;
				}
				
			});		
		};
		$("#selectColorbox").find(".ColorCircle").unbind("click").bind("click",function(){
			var inthisColor = $(this).attr("data-color");
			var inthisTitle = $(this).attr("data-title");
			var thisImg = $(this).attr("data-img");
			$(this).addClass("is-selected");
			$(this).siblings(".ColorCircle").removeClass("is-selected");
			var randomNum = 1;
			
			$("#Controls-title").html(inthisTitle);
			$("#Controls-title").attr("data-color",inthisColor);
			$("#Controls-title").attr("data-type",thisType);
			$("#product-positive").css({"background-image":"url("+mydomain+"/"+thisImg+".jpg?v="+randomNum+")"});	
			$("#product-positive").attr("data-key",thisImg+".jpg");
		});	
		$("#action-Accept").unbind("click").bind("click",function(){
			var acceptColor = $("#Controls-title").attr("data-color");
			var acceptType = $("#Controls-title").attr("data-type");
			$("#printableImgBox").find(".printableColor").val(acceptColor);
			$("#printableImgBox").find(".printableType").val(acceptType);
			$(this).parents(".pdefaultMenu").hide();	
		});
		
		$("#action-Cancel").unbind("click").bind("click",function(){
			$(this).parents(".pdefaultMenu").hide();
			$("#product-positive").css({"background-image":"url("+mydomain+"/front-"+thisType+"-"+thisColor+".jpg)"});
			$("#product-positive").attr("data-key","front-"+thisType+"-"+thisColor+".jpg");	
		});
	};
	//选择款式
	var selectStylebox = function(odomain){
		var mydomain = odomain;
		var thisGdid = $(".printableGdid").val();
		var thisType = $(".printableType").val();
		//默认颜色
		var thisColor = $(".printableColor").val();
		//$(".printableColor").val(thisColor);
		var stylehtml='';
		$.each(goods,function(index,o){
			var typehtml = '<div class="row-flex1 styleCircle" data-gdid="'+o.gdid+'" data-title="'+o.title+'" data-type="'+o.type+'"><span class="bordercolor is-white mr-5"><span class="bg-color"></span></span><span>'+o.title+'</span></div>';
			if(o.gdid == thisGdid){
				typehtml = '<div class="row-flex1 styleCircle is-selected" data-gdid="'+o.gdid+'" data-title="'+o.title+'" data-type="'+o.type+'"><span class="bordercolor is-white mr-5"><span class="bg-color"></span></span><span>'+o.title+'</span></div>';
				$("#Controls-styletitle").attr("data-gdid",thisGdid);
				$("#Controls-styletitle").attr("data-type",thisType);
				var randomNum = 1;
				$("#product-positive").css({"background-image":"url("+mydomain+"/front-"+thisType+"-"+thisColor+".jpg?v="+randomNum+")"});	
				$("#product-positive").attr("data-key","front-"+thisType+"-"+thisColor+".jpg");	
			}
			stylehtml+=typehtml;
		});
		$("#selectStyle").html(stylehtml);
		
		$("#selectStylebox").find(".styleCircle").unbind("click").bind("click",function(){
			var inthisGdid = $(this).attr("data-gdid");
			var inthisTitle = $(this).attr("data-title");	
			var inthisType = $(this).attr("data-type");
			var inthisColor = $(".printableColor").val();	
			if(inthisType !=thisType){
				inthisColor = "ffffff";
			}
			
			$("#Controls-styletitle").attr("data-gdid",inthisGdid);
			$("#Controls-styletitle").attr("data-type",inthisType);
			$("#Controls-styletitle").html(inthisTitle);
			$(this).addClass("is-selected");
			$(this).siblings(".styleCircle").removeClass("is-selected");
			var randomNum = 1;
			$("#product-positive").css({"background-image":"url("+mydomain+"/front-"+inthisType+"-"+inthisColor+".jpg?v="+randomNum+")"});	
			$("#product-positive").attr("data-key","front-"+inthisType+"-"+inthisColor+".jpg");	
		});
		$("#action-styleAccept").unbind("click").bind("click",function(){
			var acceptGdid = $("#Controls-styletitle").attr("data-gdid");
			var acceptType = $("#Controls-styletitle").attr("data-type");
			if(acceptType !=thisType){
				$("#printableImgBox").find(".printableColor").val("ffffff");
			}else{
				$("#printableImgBox").find(".printableColor").val(thisColor);	
			}
			$("#printableImgBox").find(".printableGdid").val(acceptGdid);
			$("#printableImgBox").find(".printableType").val(acceptType);
			
			$(this).parents(".pdefaultMenu").hide();	
		});
		$("#action-styleCancel").unbind("click").bind("click",function(){
			$(this).parents(".pdefaultMenu").hide();
			$("#product-positive").css({"background-image":"url("+mydomain+"/front-"+thisType+"-"+thisColor+".jpg)"});	
			$("#product-positive").attr("data-key","front-"+thisType+"-"+thisColor+".jpg");
		});	
	};
	//底部按钮初始化
	var footerMenu = function(odomain){
		$(".footerMenu").unbind("click").bind("click",function(){
			var datatype = $(this).attr("data-type");
			var thistitle = $(this).attr("data-title");
			$("#" + datatype).show();
			if(datatype == "selectStylebox"){
				selectStylebox(odomain);	
			}else if(datatype == "selectColorbox"){
				selectColorbox(odomain);	
			}
		});	
	};
	var dzInit = function(){
		//上传图片按钮初始化
		uploadpicDz();
		//页面排版
		viewShow();
		function viewShow(){
			var bodyH = getHeightBody();
			var bodyW = $("#bodywidth").width();
			var heard_h = $(".headerbox").height();
			var footer_h = $(".footerbox").height();
			var thisbodyH = bodyH - heard_h - footer_h;
			var bili = bodyW/750;
			if(bodyW < thisbodyH){
				var abodyW = thisbodyH*0.8;	
			}
			var thissonh = (thisbodyH+140*bili)/2;
			var thissonw = thissonh*0.8;
			var thisson_l = (bodyW - thissonw)/2+3;
			var thisson_t = (thisbodyH - thissonh)/2;
			if(thisbodyH < 490){
				thisbodyH = 490;	
			}
			$("#product-positive").css({"height":thisbodyH,"width":bodyW});
			$("#printableArea").css({"left":thisson_l,"top":thisson_t,"width":thissonw,"height":thissonh});	
		};
		function newviewShow(){
			var bodyW = $("#bodywidth").width();
			var bodyH = getHeightBody();
			var heard_h = $(".headerbox").height();
			var footer_h = $(".footerbox").height();
			var thisbodyH = bodyH - heard_h - footer_h;
			var bili = bodyW/750;
			if(bodyW < thisbodyH){
				var abodyW = thisbodyH*0.8;	
			}
			var thissonh = (thisbodyH+140*bili)/2;
			var thissonw = thissonh*0.8;
			var thisson_l = (bodyW - thissonw)/2+3;
			var thisson_t = (thisbodyH - thissonh)/2;
			if(thisbodyH < 490){
				thisbodyH = 490;	
			}
			$("#product-positive").css({"height":thisbodyH,"width":bodyW});
			$("#printableArea").css({"left":thisson_l,"top":thisson_t,"width":thissonw,"height":thissonh});	
		};	
		//帮助中心
		$("#help-btn").unbind("click").bind("click",function(){
			AlertUtils.centerDiv({"divId":"sns_helpTipbox",
				type:0,
				w:"100%",
				position:"fixed",
				istop:true,
				isShade:false,
				callback:function(){
					var bodyHeight = getHeightBody()-45;
					$("#help-cont").css({"height":bodyHeight});
				}
			});
		});
	};
	
	return {basedz:basedz,dzInit:dzInit}
}();