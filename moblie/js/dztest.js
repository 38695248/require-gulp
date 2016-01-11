var dzClass = function(){
	var basedz = function(){
		BaseInitClass.baseInit();//整个网站公共初始化
	};
	//加入购物车
	var addNextCart = function(options){
		var settings = {
			tuanid:'1',
			gdid:'',
			buycolor:'',
			buysize:'',
			buynum:'',
			img_print_front:'emptypic',
			img_pview_front:'emptypic',
			img_print_back:'emptypic',
			img_pview_back:'emptypic',
			activity:''	
		};
		if(options){
			$.extend(settings,options);	
		}
		console.log("img_print_front:"+settings.img_print_front);
		console.log("img_pview_front:"+settings.img_pview_front);
		console.log("img_print_back:"+settings.img_print_back);
		console.log("img_pview_back:"+settings.img_pview_back);
		//return false;
		AjaxFunUtils.ajaxInit({url:'/myorder/addtocart.html',
			params:settings,
			callback:function(res){
				if(res.status==1){
					AlertUtils.tips({
						w:"90%",
						htmlmsg:'<div style="padding:30px"><p>恭喜您，定制成功;已成功加入购物车!</div>',
						callback:function(){
							$(".btnTipsubmit").html("继续定制");
							$(".btnCancel").html("去购物车结算");	
						},
						closeback:function(){
							window.location="/myorder/mycart.html";	
						}
					});	
				}else{
					AlertUtils.tips({
						w:"90%",
						htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
						type:0,
						scallback:function(){
							if(res.data.url){
								window.location=res.data.url;
							}
						}
					});	
					
				}
			}
		})
	};
	//选择颜色尺码
	var selectColorbox = function(odomain){
		//检查选中了什么颜色
		var mydomain = odomain;
		var thisGdid = $("#printableGdid").val();
		var thisTuanid = $("#printableGdid").attr("data-tuanid");
		var thisbuynum = $("#printableGdid").attr("data-buynum");
		var thisType = $("#printableGdid").attr("data-type");
		var thisColor = $("#printableColor").val();
		var thisColorTitle = $("#printableColor").attr("data-title");
		var thisAroundVal = $("#aroundVal").val();
		var thisselectSize = $("#selectSize").val();
		$("#buynum").val(thisbuynum);
		$("#buynumbox").html(thisbuynum);
		
		if(!thisselectSize){
			thisselectSize="未选择尺码";	
		}
		var showTitle = thisColorTitle +"/" + thisselectSize + "/" + thisbuynum;
		$("#Controls-title").html(showTitle);
		$("#Controls-title").attr("data-color",thisColor);
		$("#Controls-title").attr("data-title",thisColorTitle);
		$("#Controls-title").attr("data-type",thisType);
		$("#Controls-title").attr("data-size",thisselectSize);
		//选择数量
		
		buyNum();
		function buyNum(){
			$(".buynum").plus({maxNum:99999,callback:function(){
				thisColorTitle = $("#Controls-title").attr("data-title");
				thisselectSize = $("#Controls-title").attr("data-size");
				thisbuynum = $("#buynum").val();
				$("#Controls-title").attr("data-buynum",thisbuynum);
				$("#buynumbox").html(thisbuynum);
				var showTitle = thisColorTitle +"/" + thisselectSize + "/" + thisbuynum;	
				$("#Controls-title").html(showTitle);
			}});		
		};
		//选择尺码
		selectSizes();
		function selectSizes(){
			var sizeshtml='';
			$.each(goods,function(index,o){
				if(o.gdid == thisGdid){
					$.each(o.sizes,function(oindex,oo){
						var sizehtml='<span class="sizeClass" data-val="'+oo+'">'+oo+'</span>';
						if(oo == thisselectSize){
							sizehtml='<span class="sizeClass is-selected" data-val="'+oo+'">'+oo+'</span>';	
						}
						sizeshtml+=sizehtml;
					})
					$("#selectSizes").html(sizeshtml);
					//选择尺码绑定
					$("#selectSizes").find(".sizeClass").unbind("click").bind("click",function(){
						var thisSize = $(this).attr("data-val");
						$(this).addClass("is-selected");
						$(this).siblings(".sizeClass").removeClass("is-selected");
						thisbuynum =  $("#buynum").val();
						if(!thisSize){
							thisSize="未选择尺码";	
						}
						var showTitle = thisColorTitle +"/" + thisSize + "/" + thisbuynum;
						$("#Controls-title").html(showTitle);
						$("#Controls-title").attr("data-size",thisSize);
					});
				}
			});
				
		};
		//选择颜色
		checkColor();
		function checkColor(){
			var colorshtml='';
			$.each(goods,function(index,o){
				if(o.gdid == thisGdid){
					$.each(o.colors,function(oindex,oo){
						var img = "front-"+o.type+"-"+oo.val;						
						var imgUrl = '';				
						var colorhtml = '<div class="ColorCircle" data-color="'+oo.val+'" data-title="'+oo.name+'" data-img="'+img+'"><span class="color is-white" style="background:#'+oo.val+'"></span></div>';
						
						if(oo.val == thisColor){
							colorhtml = '<div class="ColorCircle is-selected" data-color="'+oo.val+'" data-title="'+oo.name+'" data-img="'+img+'"><span class="color is-white" style="background:#'+oo.val+'"></span></div>';	
							var randomNum = 1;
							$("#product-positive").css({"background-image":"url("+mydomain+"/"+img+".jpg?v="+randomNum+")"});
							$("#product-positive").attr("data-key",img+".jpg");
						}
						colorshtml+=colorhtml;	
					});
					$("#selectColors").html(colorshtml);
					//选择颜色绑定
					$("#selectColors").find(".ColorCircle").unbind("click").bind("click",function(){
						var inthisColor = $(this).attr("data-color");
						var inthisTitle = $(this).attr("data-title");
						var thisImg = $(this).attr("data-img");
						$(this).addClass("is-selected");
						$(this).siblings(".ColorCircle").removeClass("is-selected");
						var randomNum = 1;
						showTitle = inthisTitle +"/" + thisselectSize + "/" + thisbuynum;
						$("#Controls-title").html(showTitle);
						$("#Controls-title").attr("data-color",inthisColor);
						$("#Controls-title").attr("data-title",inthisTitle);
						$("#Controls-title").attr("data-type",thisType);
						$("#product-positive").css({"background-image":"url("+mydomain+"/"+thisImg+".jpg?v="+randomNum+")"});	
						$("#product-positive").attr("data-key",thisImg+".jpg");
					});	
					return true;
				}
				
			});	
			
		};
		//选择颜色尺码数量确定按钮	
		$("#action-Accept").unbind("click").bind("click",function(){
			var acceptColor = $("#Controls-title").attr("data-color");
			var acceptColorTitle = $("#Controls-title").attr("data-title");
			var acceptType = $("#Controls-title").attr("data-type");
			var acceptSize = $("#Controls-title").attr("data-size");
			var accepttuanid = $("#Controls-title").attr("data-tuanid"); 
			var acceptbuynum = $("#Controls-title").attr("data-buynum");
			
			$("#printableColor").val(acceptColor);
			$("#printableColor").attr("data-title",acceptColorTitle);
			$("#printableGdid").attr("data-type",acceptType);
			$("#printableGdid").attr("data-tuanid",accepttuanid);
			$("#printableGdid").attr("data-buynum",acceptbuynum);
			$("#selectSize").val(acceptSize);
			$("#front_bg").val("front-"+acceptType+"-"+acceptColor+".jpg");
			$("#back_bg").val("back-"+acceptType+"-"+acceptColor+".jpg");
			$(this).parents(".pdefaultMenu").hide();	
		});
		//选择颜色尺码数量取消按钮
		$("#action-Cancel").unbind("click").bind("click",function(){
			$(this).parents(".pdefaultMenu").hide();
			$("#product-positive").css({"background-image":"url("+mydomain+"/front-"+thisType+"-"+thisColor+".jpg)"});
			$("#product-positive").attr("data-key","front-"+thisType+"-"+thisColor+".jpg");	
		});
	};
	//选择款式
	var selectStylebox = function(odomain){
		var mydomain = odomain;
		var thisGdid = $("#printableGdid").val();
		var thisType = $("#printableGdid").attr("data-type");
		var thisTuanid = $("#printableGdid").attr("data-tuanid");
		var thisbuynum = $("#printableGdid").attr("data-buynum");
		var thisColor = $("#printableColor").val();
		var thisColorTitle = $("#printableColor").data("data-title");
		var thisSize = $("#selectSize").val();
		
		var thisaroundVal = $("#aroundVal").val();
		//$("#printableColor").val(thisColor);
		var stylehtml='';
		$.each(goods,function(index,o){
			var typehtml = '<div class="row-flex1 styleCircle" data-gdid="'+o.gdid+'" data-tuanid="'+o.tuanid+'" data-title="'+o.title+'" data-type="'+o.type+'"><span class="bordercolor is-white mr-5"><span class="bg-color"></span></span><span>'+o.title+'</span></div>';
			if(o.gdid == thisGdid){
				typehtml = '<div class="row-flex1 styleCircle is-selected" data-gdid="'+o.gdid+'" data-tuanid="'+o.tuanid+'" data-title="'+o.title+'" data-type="'+o.type+'"><span class="bordercolor is-white mr-5"><span class="bg-color"></span></span><span>'+o.title+'</span></div>';
				$("#Controls-styletitle").attr("data-gdid",thisGdid);
				$("#Controls-styletitle").attr("data-type",thisType);
				$("#Controls-styletitle").attr("data-tuanid",thisTuanid);
				$("#Controls-styletitle").attr("data-aroundVal",thisaroundVal);
				var randomNum = 1;
				$("#product-positive").css({"background-image":"url("+mydomain+"/"+thisaroundVal+"-"+thisType+"-"+thisColor+".jpg?v="+randomNum+")"});	
				$("#product-positive").attr("data-key",""+thisaroundVal+"-"+thisType+"-"+thisColor+".jpg");	
			}
			stylehtml+=typehtml;
		});
		$("#selectStyle").html(stylehtml);
		//选择款式选择按钮绑定
		$("#selectStyle").find(".styleCircle").unbind("click").bind("click",function(){
			var inthisGdid = $(this).attr("data-gdid");
			var inthisTitle = $(this).attr("data-title");	
			var inthisType = $(this).attr("data-type");
			var inthisTuanid = $(this).attr("data-tuanid");
			var inthisColor = thisColor;
			if(inthisType !=thisType){
				inthisColor = "ffffff";
				var inthisSize = '';
				var inthisbuynum = 1;
				//thisaroundVal = 'front';
				//$("#aroundselect").find(".front").addClass("current");
				//$("#aroundselect").find(".front").siblings("span").removeClass("current");
			}
			
			$("#Controls-styletitle").attr("data-gdid",inthisGdid);
			$("#Controls-styletitle").attr("data-tuanid",inthisTuanid);
			$("#Controls-styletitle").attr("data-type",inthisType);
			$("#Controls-styletitle").attr("data-color",inthisColor);
			$("#Controls-styletitle").attr("data-size",inthisSize);
			$("#Controls-styletitle").html(inthisTitle);
			$(this).addClass("is-selected");
			$(this).siblings(".styleCircle").removeClass("is-selected");
			var randomNum = 1;
			$("#product-positive").css({"background-image":"url("+mydomain+"/"+thisaroundVal+"-"+inthisType+"-"+inthisColor+".jpg?v="+randomNum+")"});	
			$("#product-positive").attr("data-key",""+thisaroundVal+"-"+inthisType+"-"+inthisColor+".jpg");	
		});
		//选择款式确定按钮绑定
		$("#action-styleAccept").unbind("click").bind("click",function(){
			var acceptGdid = $("#Controls-styletitle").attr("data-gdid");
			var acceptTuanid = $("#Controls-styletitle").attr("data-tuanid");
			var acceptType = $("#Controls-styletitle").attr("data-type");
			var acceptColor = $("#Controls-styletitle").attr("data-color");
			var acceptSize = $("#Controls-styletitle").attr("data-size");
			var acceptTuanid = $("#Controls-styletitle").attr("data-tuanid");
			if(acceptType !=thisType){
				$("#printableColor").val("ffffff");
				$("#printableColor").attr("data-title","白色");
				$("#selectSize").val('');
				$("#printableGdid").attr("data-buynum",1)
				//$("#aroundselect").find(".front").addClass("current");
				//$("#aroundselect").find(".front").siblings("span").removeClass("current");
			}else{
				$("#printableColor").val(thisColor);
				$("#printableColor").attr("data-title",thisColorTitle);	
				$("#selectSize").val(thisSize);
				$("#printableGdid").attr("data-buynum",thisbuynum)
			}
			$("#printableGdid").val(acceptGdid);
			$("#printableGdid").attr("data-type",acceptType);
			$("#printableGdid").attr("data-tuanid",acceptTuanid);
			$("#front_bg").val("front-"+acceptType+"-"+thisColor+".jpg");
			$("#back_bg").val("back-"+acceptType+"-"+thisColor+".jpg");
			$(this).parents(".pdefaultMenu").hide();	
		});
		//选择款式取消按钮绑定
		$("#action-styleCancel").unbind("click").bind("click",function(){
			$(this).parents(".pdefaultMenu").hide();
			$("#product-positive").css({"background-image":"url("+mydomain+"/"+thisaroundVal+"-"+thisType+"-"+thisColor+".jpg)"});	
			$("#product-positive").attr("data-key",""+thisaroundVal+"-"+thisType+"-"+thisColor+".jpg");
		});	
	};
	//上传图片
	var uploadpicDz = function(){
		//选择前后左右
		aroundselectFn();
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
						$("#domain").val(res.data.domain);
						//$("#domain").val(static_url_comm+'/moblie/images/activity/bg/');
						footerMenu();
					}
				}
			});
		};
		
		//拖动放大图片
		function dragAndResiza(options){
			var settings = {
				flag:0,
				aroundVal:''	
			};
			if(options){
				$.extend(settings,options);	
			}
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
					if(settings.flag==0){
						var aroundVal = $("#aroundVal").val();
						$("#"+aroundVal+"_flag").val(1);
					}
					var ImgBox_w = $("#printableImg").width();
					var ImgBox_h = $("#printableImg").height();
					$("#"+settings.aroundVal+"_w").val(ImgBox_w);
					$("#"+settings.aroundVal+"_h").val(ImgBox_h);
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
					if(settings.flag==0){
						var aroundVal = $("#aroundVal").val();
						$("#"+aroundVal+"_flag").val(1);
					}
					$("#"+settings.aroundVal+"_l").val(img_left);
					$("#"+settings.aroundVal+"_t").val(img_top);
				} 
			});	
		};
		//选择前后左右
		function aroundselectFn(){
			$("#aroundselect").find("span").unbind("click").bind("click",function(){
				var domain = $("#domain").val();
				var selectAround = $(this).attr("data-aroundVal");
				var thisGdid = $("#printableGdid").val();
				var thisColor = $("#printableColor").val();
				var thisType = $("#printableGdid").attr("data-type");;
				//console.log("selectAround:" + selectAround);
				//底图切换
				var thisImgUrlBg = selectAround+"-"+thisType+"-"+thisColor;
				$(this).addClass("current");
				$(this).siblings("span").removeClass("current");
				$("#product-positive").css({"background-image":"url("+domain+"/"+thisImgUrlBg+".jpg)"});
				$("#product-positive").attr("data-key",thisImgUrlBg+".jpg");
				
				$("#aroundVal").val(selectAround);//设置当前位置
				
				
				//上传图片展示
				var thisUpImg = $("#"+selectAround+"_Img").val();			
				viewImg({
					aroundVal:selectAround,
					imgUrl:thisUpImg
				});
			});
		};
		//图片赋值
		function viewImg(options){
			var settings = {
				aroundVal:"front",
				key:'',
				imgUrl:''
			};	
			if(options){
				$.extend(settings,options);	
			}
			//初始化DIV
			$("#printableArea").html('');
			var flag = $("#"+settings.aroundVal+"_flag").val();
			//console.log("aroundVal:" + settings.aroundVal);
			if(!settings.imgUrl){
				return false;	
			}
			if(flag==0){
				Loading.loadInit({status:1});
				var ImgObj = new Image();  
				var newimgUrl = settings.imgUrl+'?imageMogr2/auto-orient';
				ImgObj.src = newimgUrl; 
				ImgObj.onload = function() {
					var printableArea_w = $("#printableArea").width();
					var printableArea_h = $("#printableArea").height();
					var ImgBox_w = ImgObj.width;
					var ImgBox_h = ImgObj.height;
					var imgBili = ImgBox_w/ImgBox_h;
					
					if(ImgBox_w > printableArea_w){
						ImgBox_w = printableArea_w;
						ImgBox_h = ImgBox_w/imgBili;
					}
					if(ImgBox_h > printableArea_h){
						ImgBox_h = printableArea_h;
						ImgBox_w = ImgBox_h*imgBili;
					}
					
					var ImgBox_l = (printableArea_w - ImgBox_w)/2;
					var ImgBox_t = (printableArea_h - ImgBox_h)/2;
					/*
					$("#printableImg").attr("data-key",settings.key);
					$("#printableImg").attr("data-url",settings.imgUrl);
					$("#printableImg").css({"width":ImgBox_w,"height":ImgBox_h});
					$("#printableImgBox").css({"width":ImgBox_w,"height":ImgBox_h,"top":ImgBox_t,"left":ImgBox_l});
					$("#printableImg").attr("src",newimgUrl).show();
					$("#printableImgBox").show();
					*/
					$("#"+settings.aroundVal+"_l").val(ImgBox_l);
					$("#"+settings.aroundVal+"_t").val(ImgBox_t);
					$("#"+settings.aroundVal+"_w").val(ImgBox_w);
					$("#"+settings.aroundVal+"_h").val(ImgBox_h);
					
					var $imgDiv = '<div id="printableImgBox" style="left:'+ImgBox_l+'px;top:'+ImgBox_t+'px;width:'+ImgBox_w+'px;height:'+ImgBox_h+'px;"><img id="printableImg" src="'+newimgUrl+'" data-key="'+settings.key+'" style="width:'+ImgBox_w+'px;height:'+ImgBox_h+'px;" /></div>';
					$("#printableArea").html($imgDiv);
					dragAndResiza({
						flag:flag,
						aroundVal:settings.aroundVal	
					});
					Loading.loadInit({status:0});
				};
				// 为Image对象添加图片加载失败的处理方法
				ImgObj.onerror = function() {
					
				};
			}else{
				var this_l = $("#"+settings.aroundVal+"_l").val();	
				var this_t = $("#"+settings.aroundVal+"_t").val();
				var this_w = $("#"+settings.aroundVal+"_w").val();	
				var this_h = $("#"+settings.aroundVal+"_h").val();
				var newthisimgUrl = settings.imgUrl+'?imageMogr2/auto-orient';
				//console.log("this_w:"+this_w +"this_h:" + this_h + "this_l:"+this_l+"this_t:"+this_t);
				var $imgDiv = '<div id="printableImgBox" style="left:'+this_l+'px;top:'+this_t+'px;width:'+this_w+'px;height:'+this_h+'px;"><img id="printableImg" src="'+newthisimgUrl+'" data-key="'+settings.key+'" /></div>';
				$("#printableArea").html($imgDiv);
				dragAndResiza({
					flag:flag,
					aroundVal:settings.aroundVal	
				});
			}	
		};
		//点击下一步
		$("#next-btn").unbind("click").bind("click",function(){
			var is_size = $("#selectSize").val();
			var is_front_key = $("#front_Img").val();
			var is_back_key = $("#back_Img").val();
			var is_left_key = $("#left_Img").val();
			var is_right_key = $("#right_Img").val();
			var domain = $("#domain").val();
			
			//打印公共数据
			var printableColor = $("#printableColor").val();
			var printableGdid = $("#printableGdid").val();
			var bili = 794/$("#printableArea").width();
			var xbili = $("#product-positive").height()/490;
			//图片实际放大的宽度
			var img_shiji_w=513 * xbili;
			//图片看不到的部分
			var img_overflow = img_shiji_w - $("#product-positive").width();
			//console.log("xbili:" + xbili);
			//console.log("img_shiji_w:" + img_shiji_w);
			//console.log("img_overflow:" + img_overflow);
			
			//打印公共数据
			var printableArea_dx = parseInt($("#printableArea").position().left);
			var printableArea_dy = parseInt($("#printableArea").position().top);
			
			if(!is_size || is_size=='未选择尺码'){
				$("#selectColorbox").show();
				selectColorbox(domain);
				return false;	
			}
			//添加到购物车数据
			var activity = BaseInitClass.getQueryString("act");
			var thisGdid = $("#printableGdid").val();
			var thisTuanid = $("#printableGdid").attr("data-tuanid");
			var thisColor = $("#printableColor").val();
			var thisSize = $("#selectSize").val();
			var thisbuynum = $("#printableGdid").attr("data-buynum");
			
			if(!is_front_key && !is_back_key && !is_left_key && !is_right_key){
				AlertUtils.tips({
					htmlmsg:'<div style="padding:30px">亲，您还没有上传图片！如果不需要图片定制，请点击确定。</div>',
					scallback:function(){
						
						//var url = '/share/sharepage.html?gdid='+printableGdid+'&ukey='+ukey+'&activity='+activity+'&img_print=emptypic&img_pview=emptypic&color='+printableColor+'#fanspage';	
						//window.location.href = url;
						//添加购物车	
						addNextCart({
							tuanid:thisTuanid,
							gdid:thisGdid,
							buycolor:thisColor,
							buysize:thisSize,
							buynum:thisbuynum,
							img_print_front:'emptypic',
							img_pview_front:'emptypic',
							img_print_back:'emptypic',
							img_pview_back:'emptypic',
							activity:activity
						});
					}
				});	
				return false;	
			}else{
				
				//发送到byshare服务器
				sendByshareSave();
				function sendByshareSave(){
					var img_print_front='emptypic';
					var img_pview_front='emptypic';
					var img_print_back='emptypic';
					var img_pview_back='emptypic';
					//背后数据收集
					if(is_back_key){
						img_print_back = backData();
					}
					//前面数据收集
					if(is_front_key){
						img_print_front = frontData();
					}
					addNextCart({
						tuanid:thisTuanid,
						gdid:thisGdid,
						buycolor:thisColor,
						buysize:thisSize,
						buynum:thisbuynum,
						img_print_front:img_print_front.priimg,
						img_pview_front:img_print_front.xgimg,
						img_print_back:img_print_back.priimg,
						img_pview_back:img_print_back.xgimg,
						activity:activity
					});
				};	
			}
			
			//前面数据收集
			function frontData(){
				var front_bg = $("#front_bg").val();
				var front_l = $("#front_l").val();
				var front_t = $("#front_t").val();
				var front_w = $("#front_w").val();
				var front_h = $("#front_h").val();
				var front_imgUrl = $("#front_Img").val();
				var front_key = $("#front_Img").attr("data-key");
				//前面打印图数据
				var front_img_w = parseInt(front_w*bili-5);
				//console.log("front_img_w:"+front_img_w);
				var front_img_h = parseInt(front_h*bili-5);
				var front_dx = parseInt(front_l*bili);
				var front_dy = parseInt(front_t*bili);
				//前面效果数据
				var front_img_xw = parseInt(front_w/xbili-5);
				var front_img_xh = parseInt(front_h/xbili-5);
				var front_xdx = parseInt((Number(front_l)+printableArea_dx+img_overflow/2)/xbili);
				var front_xdy = parseInt((Number(front_t) + printableArea_dy)/xbili);	
				//七牛处理
				var front_img = suofangImg({
						bg:front_bg,
						imgUrl:front_imgUrl,
						w:front_img_w,
						h:front_img_h,
						xw:front_img_xw,
						xh:front_img_xh,
						dx:front_dx,
						dy:front_dy,
						xdx:front_xdx,
						xdy:front_xdy,
						key:front_key,
						printableColor:printableColor,
						printableGdid:printableGdid
					});
				//console.log(front_img);
				return front_img;	
			};
			//背后数据收集
			function backData(){
				var back_bg = $("#back_bg").val();
				var back_l = $("#back_l").val();
				var back_t = $("#back_t").val();
				var back_w = $("#back_w").val();
				var back_h = $("#back_h").val();
				var back_imgUrl = $("#back_Img").val();
				var back_key = $("#back_Img").attr("data-key");
				//前面打印图数据
				var back_img_w = parseInt(back_w*bili-5);
				var back_img_h = parseInt(back_h*bili-5);
				var back_dx = parseInt(back_l*bili);
				var back_dy = parseInt(back_t*bili);
				//前面效果数据
				var back_img_xw = parseInt(back_w/xbili-5);
				var back_img_xh = parseInt(back_h/xbili-5);
				var back_xdx = parseInt((Number(back_l)+printableArea_dx+img_overflow/2)/xbili);
				var back_xdy = parseInt((Number(back_t) + printableArea_dy)/xbili);	
				//七牛处理
				var back_img = suofangImg({
						bg:back_bg,
						imgUrl:back_imgUrl,
						w:back_img_w,
						h:back_img_h,
						xw:back_img_xw,
						xh:back_img_xh,
						dx:back_dx,
						dy:back_dy,
						xdx:back_xdx,
						xdy:back_xdy,
						key:back_key,
						printableColor:printableColor,
						printableGdid:printableGdid
					});	
				
				return back_img;
			}			
		});
		//七牛处理缩放图片
		function suofangImg(options){
			var settings = {
				bg:'',
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
			//console.log("settings.w:"+settings.w);
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
				print_bg:settings.bg,
				w:settings.xw,
				h:settings.xh,
				xdx:settings.xdx,
				xdy:settings.xdy,
				key:settings.key,
				sourceLink:ximageMogr2	
			});
			//console.log(xgimg);
			//返回打印图
			//var priimg = hechengImg({
				//print_bg:settings.bg,
				//w:settings.w,
				//h:settings.h,
				//dx:settings.dx,
				//dy:settings.dy,
				//key:settings.key,
				//sourceLink:imageMogr2	
			//});
			//console.log(priimg);
			return 	{priimg:imageMogr2,xgimg:xgimg};
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
			//console.log("settings.print_bg:"+settings.print_bg + "settings.sourceLink:"+settings.sourceLink);
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
			 //console.log(imgLink);
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
				multi_selection:false,//是否可选择多张图片
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
						 //当前选择的前 后 左 右
						 var thisaroundVal = $("#aroundVal").val();
						 var appendHtml = $('<input type="hidden" name="'+thisaroundVal+'_w" id="'+thisaroundVal+'_w"><input type="hidden" name="'+thisaroundVal+'_h" id="'+thisaroundVal+'_h"><input type="hidden" name="'+thisaroundVal+'_l" id="'+thisaroundVal+'_l"><input type="hidden" name="'+thisaroundVal+'_t" id="'+thisaroundVal+'_t"><input type="hidden" name="'+thisaroundVal+'_Img" id="'+thisaroundVal+'_Img" value="'+sourceLink+'" data-key="'+res.key+'"><input type="hidden" name="'+thisaroundVal+'_flag" id="'+thisaroundVal+'_flag" value="0">');
						 var $imgFlag = $("#"+thisaroundVal+"_Img");
						 if($imgFlag.length <= 0){
							$("#printdata").append(appendHtml); 
						 }else{
							$("#"+thisaroundVal+"_flag").val(0);
							$imgFlag.val(sourceLink);	 
						 }
						 viewImg({
							aroundVal:thisaroundVal,
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
	//底部按钮初始化
	var footerMenu = function(){
		$(".footerMenu").unbind("click").bind("click",function(){
			var datatype = $(this).attr("data-type");
			var thistitle = $(this).attr("data-title");
			var domain = $("#domain").val();
			$("#" + datatype).show();
			if(datatype == "selectStylebox"){
				selectStylebox(domain);	
			}else if(datatype == "selectColorbox"){
				selectColorbox(domain);	
			}
		});	
	};
	var dzInit = function(){
		//上传图片按钮初始化
		uploadpicDz();
		//页面排版
		viewShow();
		function viewShow(){
			var bodyW = $("#bodywidth").width();
			var heard_h = $(".headerbox").height();
			var footer_h = $(".footerbox").height();
			var bodyH = getHeightBody() - heard_h - footer_h;
			var bili = bodyW/750;
			var imgW = 513;
			var imgH = 490;
			var bg_imgW = 794;
			var bg_imgH = 992;
			var imgBili = imgW/imgH;
			var bg_imgBili = bg_imgW/bg_imgH;
			//console.log("bodyH:"+bodyH+"bodyW:"+bodyW);
			if(bodyH < bodyW){
				bodyH = bodyW/imgBili;
			}
			var thissonh = (bodyH+140*bili)/2;
			var thissonw = thissonh*bg_imgBili;
			var thisson_l = (bodyW - thissonw)/2+3;
			var thisson_t = (bodyH - thissonh)/2;
			
			$("#product-positive").css({"height":bodyH,"width":bodyW});
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