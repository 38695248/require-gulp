var editorInit = function(otitle){
	var dataFace = [
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/0.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/1.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/2.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/3.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/4.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/5.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/6.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/7.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/8.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/9.gif"},
		{name:"萌",msrc:static_url_comm + "/files/emoticons/10.gif"},
		{name:"鄙视",msrc:static_url_comm + "/files/emoticons/11.gif"},
		{name:"晕",msrc:static_url_comm + "/files/emoticons/12.gif"},
		{name:"汗",msrc:static_url_comm + "/files/emoticons/13.gif"},
		{name:"可怜",msrc:static_url_comm + "/files/emoticons/14.gif"},
		{name:"靠",msrc:static_url_comm + "/files/emoticons/15.gif"},
		{name:"委屈",msrc:static_url_comm + "/files/emoticons/16.gif"},
		{name:"大哭",msrc:static_url_comm + "/files/emoticons/17.gif"},
		{name:"生气",msrc:static_url_comm + "/files/emoticons/18.gif"},
		{name:"拜拜",msrc:static_url_comm + "/files/emoticons/19.gif"},
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/20.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/21.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/22.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/23.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/24.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/25.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/26.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/27.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/28.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/29.gif"},
		{name:"萌",msrc:static_url_comm + "/files/emoticons/30.gif"},
		{name:"鄙视",msrc:static_url_comm + "/files/emoticons/31.gif"},
		{name:"晕",msrc:static_url_comm + "/files/emoticons/32.gif"},
		{name:"汗",msrc:static_url_comm + "/files/emoticons/33.gif"},
		{name:"可怜",msrc:static_url_comm + "/files/emoticons/34.gif"},
		{name:"靠",msrc:static_url_comm + "/files/emoticons/35.gif"},
		{name:"委屈",msrc:static_url_comm + "/files/emoticons/36.gif"},
		{name:"大哭",msrc:static_url_comm + "/files/emoticons/37.gif"},
		{name:"生气",msrc:static_url_comm + "/files/emoticons/38.gif"},
		{name:"拜拜",msrc:static_url_comm + "/files/emoticons/39.gif"},
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/40.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/41.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/42.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/43.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/44.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/45.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/46.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/47.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/48.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/49.gif"},
		{name:"萌",msrc:static_url_comm + "/files/emoticons/50.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/51.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/52.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/53.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/54.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/55.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/56.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/57.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/58.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/59.gif"},
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/60.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/61.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/62.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/63.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/64.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/65.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/66.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/67.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/68.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/69.gif"},
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/70.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/71.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/72.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/73.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/74.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/75.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/76.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/77.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/78.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/79.gif"},
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/80.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/81.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/82.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/83.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/84.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/85.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/86.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/87.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/88.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/89.gif"},
		{name:"微笑",msrc:static_url_comm + "/files/emoticons/90.gif"},
		{name:"大笑",msrc:static_url_comm + "/files/emoticons/91.gif"},
		{name:"偷笑",msrc:static_url_comm + "/files/emoticons/92.gif"},
		{name:"酷",msrc:static_url_comm + "/files/emoticons/93.gif"},
		{name:"鬼脸",msrc:static_url_comm + "/files/emoticons/94.gif"},
		{name:"流鼻血",msrc:static_url_comm + "/files/emoticons/95.gif"},
		{name:"色",msrc:static_url_comm + "/files/emoticons/96.gif"},
		{name:"疑问",msrc:static_url_comm + "/files/emoticons/97.gif"},
		{name:"羞",msrc:static_url_comm + "/files/emoticons/98.gif"},
		{name:"囧",msrc:static_url_comm + "/files/emoticons/99.gif"},
		{name:"萌",msrc:static_url_comm + "/files/emoticons/100.gif"}
	];
	var editor = document.getElementById("meditor");
	var ul = document.createElement("ul");
	var ulHtml = "";
	for(var i = 0,l= dataFace.length;i<l;i++){
		ulHtml +="<li><img alt='"+dataFace[i].name+"' src='"+dataFace[i].msrc+"' /></li>";
	};
	ul.innerHTML=ulHtml;
	$("#bqbox").append(ul);
	
	var mytitle = otitle;
   
	var textarea = document.getElementById("meditortxt");
	textarea.style.display = "none";
	var iframe = document.createElement("iframe");
	iframe.id = "myeditable";
	iframe.className = "myeditable";
	iframe.style.width = "100%";
	iframe.style.height = "36px";
	iframe.frameBorder=0;
	textarea.parentNode.insertBefore(iframe,textarea);
	var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
	iframeDocument.designMode = "on";
	iframeDocument.open();
	iframeDocument.write('<html><head></head><body id="message" style="line-height:26px; font-size:14px; display:block;height:26px;overflow:hidden">'+mytitle+'</body></html>');
	iframeDocument.close();
	

	$("#mbar").unbind("click").bind("click",function(event){
		var flag = $("#bqbox").is(':hidden');
		if(flag){
			$("#bqbox").show();
			var msghtml = $(this).html();
			if(msghtml == mytitle){
				$("#myeditable").contents().find("#message").html('&nbsp;');  
			}
			event.stopPropagation();
			$(document).bind('click',function(e){
				  var target = $(e.target);
				  if(target.closest("#bqbox").length == 0){
					$("#bqbox").hide();
				  };
				  
			});
		}else{
			$("#bqbox").hide();	
		}
	});
	
	var lis = editor.getElementsByTagName("li");
	for(var i = 0, l = lis.length; i<l;i++){
		lis[i].onclick = new function(){
			var choose = lis[i];
			return function(){
				$("#bqbox").hide();
				var value = choose.getElementsByTagName("img")[0].src;
				$("#myeditable").contents().find("#message").focus();
				iframeDocument.execCommand("insertimage",false,value);
			}
		}
	};
   $("#myeditable").contents().find("#message").focus(function(){
	   var msghtml = $(this).html();
	   if(msghtml == mytitle){
			$(this).html('&nbsp;');  
	   }
   });
   $("#myeditable").contents().find("#message").bind('input', function(){
		var msg2=msg = $(this).html();
		//msg2=msg = 'dfgfd<img src="http://192.168.1.103/default/images/emoticons/78.gif">fgfdgddgdfg<img src="http://192.168.1.103/default/images/emoticons/79.gif">';
		var req = /<img src=".*?">/g;
		var arr;
		var img;
		while((arr = req.exec(msg2)) !=null){
			img = arr[0].split(".gif");
			img_code = img[0].split("/");
			img_code = '[em]' +img_code[img_code.length -1] + '[/em]';
			msg=msg.replace(arr[0],img_code);
			//console.log(arr[0]);
		}
		//console.log(img_code);
		//console.log(msg.replace(/<img src="\http:\/\/192.168.1.103\/default\/images\/emoticons\/78.gif">/,"["+img_code+"]"));
		msg = msg.replace(/<br>/,'');
   		$("#meditortxt").val(msg);   
   });
   
};