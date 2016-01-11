// 删除聊天记录
define(['jquery','config'],function($,config){
	var bodyW = $("#bodywidth").width();
	var side_w = bodyW*0.8;
	//选择群分类
	var selectCat = function(opt){
		if(opt.catid_area){
			var select_cat_text = '';
			if(opt.catid_type == 1){
				select_cat_text += '明星,';	
			}else if(opt.catid_type == 2){
				select_cat_text += '街拍达人,';		
			}else{
				select_cat_text += '模特,';	
			}
			$("#user_group_area").find(".li_click").each(function(index, element) {
				//var thisIndex = $(this).val();
				if(index+1 == opt.catid_area){
					var thisText = $(this).text();
					//alert(thisText);
					select_cat_text +=	thisText;
				}
			});
			
			if(opt.catid_sex == 1){
				select_cat_text += ',男';	
			}else{
				select_cat_text += ',女';		
			}	
			$("#select_cat_text").html(select_cat_text);
		}
		$("#group_cat").unbind("click").bind("click",function(ocatid){
			AjaxFunUtils.ajaxInit({url: '/common/gettpl.html?name=sns_grouptype&ch=sns',
				isloading:true,
				yzlogin:true,
				type: "GET",
				dataType: 'html',
				params:{},
				callback: function(data){
					$("body").append(data);
					var catListHtml = $("#user_group_area").html();
					$("#catlist_area").html(catListHtml);
					config.tip.centerDiv({
						"divId":"sns_grouptype",
						"type":1,
						"callback":function(){
							var isSelectval_type = $("#select_cat_type").val();
							var isSelectval_area = $("#select_cat_area").val();
							var isSelectval_sex = $("#select_cat_sex").val();
							isselected();
							$("#catlist_type").find(".li_click").each(function(index, element) {
								var thisVal = $(this).attr("value");
								if(thisVal == isSelectval_type){
									$(this).addClass("current");
									isselected();
								}
							});
							$("#catlist_area").find(".li_click").each(function(index, element) {
								var thisVal = $(this).attr("value");
								if(thisVal == isSelectval_area){
									$(this).addClass("current");
									isselected();
								}
							});
							$("#catlist_sex").find(".li_click").each(function(index, element) {
								var thisVal = $(this).attr("value");
								if(thisVal == isSelectval_sex){
									$(this).addClass("current");
									isselected();
								}
							});
							$(".catlist").find(".li_click").unbind("click").bind("click",function(){
								$(this).addClass("current");
								$(this).siblings(".li_click").removeClass("current");
								isselected();
							});	
						}
						
					});
				}
			});
			//是否选择了分类
			function isselected(){
				var flag_type = false;
				var flag_sex = false;
				var flag_area = false;
				$("#catlist_type").find("li").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					if(iscurrent){
						flag_type = true;
					}
				});
				$("#catlist_sex").find("li").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					if(iscurrent){
						flag_sex = true;
					}
				});
				$("#catlist_area").find("li").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					if(iscurrent){
						var thisVal = $(this).attr("value");
						flag_area = true;
					}
				});
				if(flag_type && flag_area && flag_sex){
					$("#sns_grouptype").find(".btn-danger").addClass("btnTipsubmit").removeClass("btn-danger-gray");
					$("#sns_grouptype").find(".btnTipsubmit").unbind("click").bind("click",function(){
						quedingSub();	
					});
				}else{
					$("#sns_grouptype").find(".btn-danger").removeClass("btnTipsubmit").addClass("btn-danger-gray");	
				}
			}
			//按确定处理
			function quedingSub(){
				var thisText = '';
				$("#catlist_type").find("li").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					if(iscurrent){
						var thisVal = $(this).attr("value");
						thisText += $(this).text()+',';
						$("#select_cat_type").val(thisVal);
					}
				});
				$("#catlist_area").find("li").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					if(iscurrent){
						var thisVal = $(this).attr("value");
						thisText += $(this).text()+',';
						$("#select_cat_area").val(thisVal);
					}
				});
				$("#catlist_sex").find("li").each(function(index, element) {
					var iscurrent = $(this).hasClass("current");
					if(iscurrent){
						var thisVal = $(this).attr("value");
						thisText += $(this).text();
						$("#select_cat_sex").val(thisVal);
					}
				});
				$("#select_cat_text").text(thisText);
				config.closeTip($("#sns_grouptype"));	
			}
		});
		
	};
	//获取群列表
	var getGroupList = function(){
		AjaxFunUtils.ajaxInit({url:"/user_group/add_pin_groups.html	",//default/upload/index.html
			params: {ajax:1},
			callback: function(res){
				if(res.status == 1){
					if(!res.data){
						$("#groupList").hide();
						return false;	
					}
					var htmllist='<input name="gpid" id="gpid" value="" type="hidden">';
					$.each(res.data,function(index,o){
						
						var lihtml = '<li style="padding-right:20px" class="rowbox li_radio_p"><span class="ico groupavatar"><img src="'+o.avatar[2]+'" data-original="'+o.avatar[1]+'" class="lazy_groupavatar"></span><div class="row-flex1 line40"><label for="'+o.gpid+'" class="row-flex1 label li_radio" style="line-height:60px;background-position: right 18px;" data-gpid="'+o.gpid+'">'+o.gpname+'</label></div></li>';						
						htmllist +=lihtml;
					});
					$("#group_cat_share").find(".group_categoryList").html(htmllist);
					$("img.lazy_groupavatar").checkImgExists();
					$(".li_radio").unbind("click").bind("click",function(){
						var ischecked = $(this).hasClass("current");
						var thisgpid = $(this).attr("data-gpid");
						if(ischecked){
							$(this).removeClass("current");
							$("#gpid").val('');
						}else{
							$("#gpid").val(thisgpid);
							$(this).addClass("current");
							$(this).parents(".li_radio_p").siblings(".li_radio_p").find(".li_radio").removeClass("current");	
						}	
					});
				}
				//初始化群分类
				$("#group_cat_share").selectUtils({
					deNum:0,
					isDef:true,
					callback:function(j,i){
						var select_analog = $("#group_cat").find('input');
						checkInputFun.initContext(select_analog, checkInputFun.myIt);
						select_analog.siblings("p").show();
						checkInputFun.mycheckIn(select_analog);	
						$("#group_cat").siblings(".select_box").find('span').html('选择分类').removeClass('active');
						$("#group_cat").siblings(".select_box").find('.select_analog ').val('');
					}
				});
			}
		});
	};
	//上传群形象，个人主页形象和群头像，个人头像
	var upGroupAvatar = function(options){
		var settings = {
			gpid:'',
			pic_avatar:'',
			pic_qrcode:'',
			pic_figure:'',
			btn:'',
			avatartype:'',
			auto_start:false,
			callback:null	
		};
		if(options){
			$.extend(true,settings,options);	
		}
		config.loginCheck();
		settings.btn.unbind("click").bind("click",function(){
			var $this = $(this);
			var inputName = $(this).attr("data-name");
			var avatar = $(this).attr("data-avatar");
			var type = $this.attr("data-type");
			var act = $this.attr("data-act");
			var picname = settings.pic_avatar;
			var title = $this.attr("data-title");	
			var $imgbox = $this.siblings(".uppro_pic_list");
			var ismult = false;
			var fileNumLimit = 1;
			if(type == 3){
				ismult = true;
				fileNumLimit = 3;	
			}
			if(type == "qrcode"){
				picname	 = settings.pic_qrcode;
			}
			if(type == "figure"){
				picname = settings.pic_figure;	
			}
			if(avatar){
				picname = avatar;	
			}
			UploadUtils.uploadInit({
				tip:true,
				uptitle:title,
				container:'allcontainer',
				browse_button:'allpickfiles',
				drop_element:'allcontainer',
				bucket:'avatar',
				iscover:true,
				auto_start:settings.auto_start,
				multi_selection:false,
				picname:picname,
				typebucket:2,
				callback:function(arrData,odomain){
					//个人头像和个人形象图
					AjaxFunUtils.ajaxInit({
						url: '/common/avatar_up_cmm_back.html',
						params:{act:act,type:type,gpid:settings.gpid,ch:'up',cutsize:''},
						callback: function(resin){
							var opt = {arrData:arrData,odomain:odomain,resin:resin,btn:$this};
							if(options.callback){
								settings.callback(opt);	
							}
						}
					});
				}
			});
		});
	};
	//创建微信群share
	var creatWeixinGroup_share = function(){
		$(".creatGroupBtn").unbind("click").bind("click",function(event){
			var loginflag = config.loginCheck();
			if(!loginflag){
				return false;	
			}
			event.stopPropagation();//阻止事件往上冒泡
			AjaxFunUtils.ajaxInit({url:"/user_group/add.html",//default/upload/index.html
					type: "post",
					yzlogin:true,
					params: {ajax:1},
					callback: function(res){
						if(res.status == 1){
							var $groupbox = $('<div id="creatGroupTipbox" class="tipbox fade" data-index="0" style="display:none;"><div class="tipbox-in"><h1 class="tiptop">绑定微信群</h1><span class="ico02 tipclose closeBtnHtml"></span><div class="tipcont" id="creatGroupCont"></div>');
							$('body').append($groupbox);
							$("#creatGroupCont").html($(res.data).find(".contentbox").html());
							config.tip.centerDiv({
								divId:"creatGroupTipbox",
								callback:function(){
									addgrouppage({type:'share'});
								}
							});	
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">' + res.msg+'</div>',
								type:0
							});	
						}
					}
				});	
		});
	};
	//创建微信群页面/user_group/add.html
	var addgrouppage = function(opt){
		var settings = {
			type:''	
		};
		if(opt){
			$.extend(true,settings,opt);	
		}
		selectCat({});
		$("#creatGroupForm").checkInput({
			submitBtnFn: function (from) {
				var dataFrom = from.serializeJson();
				var actUrl = $("#creatGroupForm").attr("data-action");
				AjaxFunUtils.ajaxInit({
					url:actUrl,
					params:dataFrom, 
					callback:function (result) {
						if(result.status == 1){
							window.location.href='/user_group/home.html?gpid='+result.data.gpid+'&ukey='+ukey;
							//$("#creatGroupImgForm").show();
							//$("#creatGroupForm").hide();
							//getGroupList();
							$("#creatbtn_wc").unbind("click").bind("click",function(){
								if(settings.type == "share"){
									config.closeTip($("#creatGroupTipbox"));
								}else{
									window.location.href='/user_group/my.html';	
								}
							});
							//绑定图片上传事件
							//bindUpheadler({gpid:result.data.gpid,pic_avatar:result.data.pic_avatar,pic_qrcode:result.data.pic_qrcode,pic_figure:result.data.pic_figure});
						}else{
							config.tip.tips({
								htmlmsg:'<div style="padding:30px">'+result.msg+'</div>',
								w:"90%",
								type:0
							});	
						}
					}
				});
				
			}	
		});	
		//是否有图片
		function isimg(){
			var isupflag = false;
			$(".uppro_pic").each(function(index, element) {
				  $(this).checkboxFn({
					checkbox:'hidden',
					scallback:function(othis){
						othis.removeClass("error_validate");	
						isupflag = true;
					},
					errorcallback:function(othis){
						othis.addClass("error_validate");	
						isupflag = false;	
					}	
				});	
				return isupflag
			});
			return isupflag;
		}
		
		function bindUpheadler(options){
			var settings = {
				picname:''	
			};
			if(options){
				$.extend(true,settings,options);
			}
			//上传群二维码和头
			up_rzpic();
			function up_rzpic($obtn){
				var $btn = $(".up_rzpic");
				if($obtn){
					$btn = $obtn;		
				}
				//上传群二维码和头像
				upGroupAvatar({
					gpid:settings.gpid,
					pic_avatar:settings.pic_avatar,
					pic_qrcode:settings.pic_qrcode,
					pic_figure:settings.pic_figure,
					btn:$btn,
					callback:function(opt){
						var lihtml = '<li class="li_del"><input type="hidden" class="hideimageurl" name="'+opt.inputName+'" value="/'+opt.arrData.key+'"><img src="'+opt.resin.data+'" /><div class="operate"><i class="ico del"></i></div></li>';
						opt.imgbox.find("ul").append(lihtml);
						hoverImg(opt.imgbox,opt.btn,opt.type);
						isup(opt.imgbox,opt.btn,opt.type);
						delImg(opt.imgbox,opt.btn,opt.type);		
					}	
				});
			}
			
			//鼠标经过显示删除按钮
			function hoverImg($imgbox,$this,type){
				$imgbox.show();
				$imgbox.find("li").hover(function(){
					$(this).find(".operate").show();	
				},function(){
					$(this).find(".operate").hide();
				});	
			}
			//删除图片
			function delImg($imgbox,$this,type){
				$imgbox.find(".del").unbind("click").bind("click",function(){
					$(this).parents("li.li_del").remove();	
					var num = $imgbox.find("li").size();
					if(num <= 0){
						$imgbox.hide();	
					}
					isup($imgbox,$this,type);
				});	
			}
			//是否可以继续上传
			function isup($imgbox,$this,type){
				isimg($imgbox,$this,type);
				var num = $imgbox.find("li").size();
				var maxNum = 1;
				if(type == 3){
					maxNum = 3;	
				}
				var flg = true;
				if(num >= maxNum ){
					$this.addClass("btn-danger-gray");
					$this.unbind("click");
					flg = false;
					return flg;	
				}else{
					$this.removeClass("btn-danger-gray");
					up_rzpic($this);
					maxNum = maxNum - num;
					return flg;
				}
					
			}
				
		}	
	};
	return {creatWeixinGroup_share:creatWeixinGroup_share,addgrouppage:addgrouppage,getGroupList:getGroupList,selectCat:selectCat,upGroupAvatar:upGroupAvatar};	
});