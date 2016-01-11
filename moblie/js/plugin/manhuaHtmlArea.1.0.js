$(function() {
	$.fn.manhuaHtmlArea = function(options) {
		var defaults = {
			Event : "click",	//ÏìÓ¦µÄÊÂ¼ş
			Left : 0,			//±íÇé²ãÏÔÊ¾Æ«ÒÆÔªËØ×ó±ßµÄÎ»ÖÃ
			Top : 22,			//±íÇé²ãÏÔÊ¾Æ«ÒÆÔªËØÉÏ±ßµÄÎ»ÖÃ
			id : "content"  	//ÄÚÈİ²å¼ş±íµ¥µÄID
		};
		var options = $.extend(defaults,options);
		var bid = parseInt(Math.random()*100000);	
		$("#mbar").prepend("<div id='showAddFacePic"+bid+"'class='addons layer-emotions'><b class='tri-b'></b><b class='tri-t'></b><div class='layer-tab clearfix'><a id='close"+bid+"' class='close' href='javascript:void(0)'></a><span>³£ÓÃ±íÇé</span></div><div class='layer-content'><ul id='emotions"+bid+"' class='emotions clearfix'><li><img src='"+static_url_comm+"/files/faces/smilea.gif' addFacesPic='[ºÇºÇ]' alt='ºÇºÇ' title='ºÇºÇ'/></li><li><img src='"+static_url_comm+"/files/faces/tootha.gif' addFacesPic='[ÎûÎû]' alt='ÎûÎû' title='ÎûÎû'/></li><li><img src='"+static_url_comm+"/files/faces/laugh.gif' addFacesPic='[¹ş¹ş]' alt='¹ş¹ş' title='¹ş¹ş'/></li><li><img src='"+static_url_comm+"/files/faces/tza.gif' addFacesPic='[¿É°®]' alt='¿É°®' title='¿É°®'/></li><li><img src='"+static_url_comm+"/files/faces/kl.gif' addFacesPic='[¿ÉÁ¯]' alt='¿ÉÁ¯' title='¿ÉÁ¯'/></li><li><img src='"+static_url_comm+"/files/faces/kbsa.gif' addFacesPic='[ÍÚ±ÇÊº]' alt='ÍÚ±ÇÊº' title='ÍÚ±ÇÊº'/></li><li><img src='"+static_url_comm+"/files/faces/cj.gif' addFacesPic='[³Ô¾ª]' alt='³Ô¾ª' title='³Ô¾ª'/></li><li><img src='"+static_url_comm+"/files/faces/shamea.gif' addFacesPic='[º¦Ğß]' alt='º¦Ğß' title='º¦Ğß'/></li><li><img src='"+static_url_comm+"/files/faces/zy.gif' addFacesPic='[¼·ÑÛ]' alt='¼·ÑÛ' title='¼·ÑÛ'/></li><li><img src='"+static_url_comm+"/files/faces/bz.gif' addFacesPic='[±Õ×ì]' alt='±Õ×ì' title='±Õ×ì'/></li><li><img src='"+static_url_comm+"/files/faces/bs2.gif' addFacesPic='[±ÉÊÓ]' alt='±ÉÊÓ' title='±ÉÊÓ'/></li><li><img src='"+static_url_comm+"/files/faces/lovea.gif' addFacesPic='[°®Äã]' alt='°®Äã' title='°®Äã'/></li><li><img src='"+static_url_comm+"/files/faces/sada.gif' addFacesPic='[Àá]' alt='Àá' title='Àá'/></li><li><img src='"+static_url_comm+"/files/faces/heia.gif' addFacesPic='[ÍµĞ¦]' alt='ÍµĞ¦' title='ÍµĞ¦'/></li><li><img src='"+static_url_comm+"/files/faces/qq.gif' addFacesPic='[Ç×Ç×]' alt='Ç×Ç×' title='Ç×Ç×'/></li><li><img src='"+static_url_comm+"/files/faces/sb.gif' addFacesPic='[Éú²¡]' alt='Éú²¡' title='Éú²¡'/></li><li><img src='"+static_url_comm+"/files/faces/mb.gif' addFacesPic='[Ì«¿ªĞÄ]' alt='Ì«¿ªĞÄ' title='Ì«¿ªĞÄ'/></li><li><img src='"+static_url_comm+"/files/faces/ldln.gif' addFacesPic='[ÀÁµÃÀíÄã]' alt='ÀÁµÃÀíÄã' title='ÀÁµÃÀíÄã'/></li><li><img src='"+static_url_comm+"/files/faces/yhh.gif' addFacesPic='[ÓÒºßºß]' alt='ÓÒºßºß' title='ÓÒºßºß'/></li><li><img src='"+static_url_comm+"/files/faces/zhh.gif' addFacesPic='[×óºßºß]' alt='×óºßºß' title='×óºßºß'/></li><li><img src='"+static_url_comm+"/files/faces/x.gif' addFacesPic='[Ğê]' alt='Ğê' title='Ğê'/></li><li><img src='"+static_url_comm+"/files/faces/cry.gif' addFacesPic='[Ë¥]' alt='Ë¥' title='Ë¥'/></li><li><img src='"+static_url_comm+"/files/faces/wq.gif' addFacesPic='[Î¯Çü]' alt='Î¯Çü' title='Î¯Çü'/></li><li><img src='"+static_url_comm+"/files/faces/t.gif' addFacesPic='[ÍÂ]' alt='ÍÂ' title='ÍÂ'/></li><li><img src='"+static_url_comm+"/files/faces/k.gif' addFacesPic='[´ò¹şÆø]' alt='´ò¹şÆø' title='´ò¹şÆø'/></li><li><img src='"+static_url_comm+"/files/faces/bba.gif' addFacesPic='[±§±§]' alt='±§±§' title='±§±§'/></li><li><img src='"+static_url_comm+"/files/faces/angrya.gif' addFacesPic='[Å­]' alt='Å­' title='Å­'/></li><li><img src='"+static_url_comm+"/files/faces/yw.gif' addFacesPic='[ÒÉÎÊ]' alt='ÒÉÎÊ' title='ÒÉÎÊ'/></li><li><img src='"+static_url_comm+"/files/faces/cza.gif' addFacesPic='[²ö×ì]' alt='²ö×ì' title='²ö×ì'/></li><li><img src='"+static_url_comm+"/files/faces/88.gif' addFacesPic='[°İ°İ]' alt='°İ°İ' title='°İ°İ'/></li><li><img src='"+static_url_comm+"/files/faces/sk.gif' addFacesPic='[Ë¼¿¼]' alt='Ë¼¿¼' title='Ë¼¿¼'/></li><li><img src='"+static_url_comm+"/files/faces/sweata.gif' addFacesPic='[º¹]' alt='º¹' title='º¹'/></li><li><img src='"+static_url_comm+"/files/faces/sleepya.gif' addFacesPic='[À§]' alt='À§' title='À§'/></li><li><img src='"+static_url_comm+"/files/faces/sleepa.gif' addFacesPic='[Ë¯¾õ]' alt='Ë¯¾õ' title='Ë¯¾õ'/></li><li><img src='"+static_url_comm+"/files/faces/money.gif' addFacesPic='[Ç®]' alt='Ç®' title='Ç®'/></li><li><img src='"+static_url_comm+"/files/faces/sw.gif' addFacesPic='[Ê§Íû]' alt='Ê§Íû' title='Ê§Íû'/></li><li><img src='"+static_url_comm+"/files/faces/cool.gif' addFacesPic='[¿á]' alt='¿á' title='¿á'/></li><li><img src='"+static_url_comm+"/files/faces/hsa.gif' addFacesPic='[»¨ĞÄ]' alt='»¨ĞÄ' title='»¨ĞÄ'/></li><li><img src='"+static_url_comm+"/files/faces/hatea.gif' addFacesPic='[ºß]' alt='ºß' title='ºß'/></li><li><img src='"+static_url_comm+"/files/faces/gza.gif' addFacesPic='[¹ÄÕÆ]' alt='¹ÄÕÆ' title='¹ÄÕÆ'/></li><li><img src='"+static_url_comm+"/files/faces/dizzya.gif' addFacesPic='[ÔÎ]' alt='ÔÎ' title='ÔÎ'/></li><li><img src='"+static_url_comm+"/files/faces/bs.gif' addFacesPic='[±¯ÉË]' alt='±¯ÉË' title='±¯ÉË'/></li><li><img src='"+static_url_comm+"/files/faces/crazya.gif' addFacesPic='[×¥¿ñ]' alt='×¥¿ñ' title='×¥¿ñ'/></li><li><img src='"+static_url_comm+"/files/faces/h.gif' addFacesPic='[ºÚÏß]' alt='ºÚÏß' title='ºÚÏß'/></li><li><img src='"+static_url_comm+"/files/faces/yx.gif' addFacesPic='[ÒõÏÕ]' alt='ÒõÏÕ' title='ÒõÏÕ'/></li><li><img src='"+static_url_comm+"/files/faces/nm.gif' addFacesPic='[Å­Âî]' alt='Å­Âî' title='Å­Âî'/></li><li><img src='"+static_url_comm+"/files/faces/hearta.gif' addFacesPic='[ĞÄ]' alt='ĞÄ' title='ĞÄ'/></li><li><img src='"+static_url_comm+"/files/faces/unheart.gif' addFacesPic='[ÉËĞÄ]' alt='ÉËĞÄ' title='ÉËĞÄ'/></li></ul></div></div>");	
		var $btn = $(this);
		var $biaoqing = $("#showAddFacePic"+bid);	
		var $emotions = $("#emotions"+bid+" li img");
		var $close = $("#close"+bid);
		var $input = $("#"+options.id);
		//±íÇéµã»÷ÊÂ¼ş
		$emotions.die().click(function(){
			 $biaoqing.hide();
			 $input.die().insertContent($(this).attr("addFacesPic"));			 
		});		
		//¹Ø±Õ±íÇé²ã
		$close.click(function(){
			 $biaoqing.hide();			 	 
		});
		$biaoqing.hover(function(){$biaoqing.show();},function(){$biaoqing.hide();	});
		//Ñ¡Ôñ±íÇé°´Å¥´¥·¢ÊÂ¼ş
		$btn.live(options.Event,function(e){						
		  var iof = $(this).offset();
		  var w = $(this).width();
		  var h = $(this).height();
		  $biaoqing.css({ "left" : iof.left+options.Left,"top" : iof.top+options.Top });
		  $biaoqing.show();		  
		});			
	};
	
	//´úÌæ±íÇéÄÚÈİ
	$.fn.extend({
		replaceContent : function(content){
		content = content.replace("[ºÇºÇ]","<img src='"+static_url_comm+"/files/faces/smilea.gif' addFacesPic='[ºÇºÇ]' alt='ºÇºÇ' title='ºÇºÇ'/>").replace("[ÎûÎû]","<img src='"+static_url_comm+"/files/faces/tootha.gif' addFacesPic='[ÎûÎû]' alt='ÎûÎû' title='ÎûÎû'/>").replace("[¹ş¹ş]","<img src='"+static_url_comm+"/files/faces/laugh.gif' addFacesPic='[¹ş¹ş]' alt='¹ş¹ş' title='¹ş¹ş'/>").replace("[¿É°®]","<img src='"+static_url_comm+"/files/faces/tza.gif' addFacesPic='[¿É°®]' alt='¿É°®' title='¿É°®'/>").replace("[¿ÉÁ¯]","<img src='"+static_url_comm+"/files/faces/kl.gif' addFacesPic='[¿ÉÁ¯]' alt='¿ÉÁ¯' title='¿ÉÁ¯'/>").replace("[ÍÚ±ÇÊº]","<img src='"+static_url_comm+"/files/faces/kbsa.gif' addFacesPic='[ÍÚ±ÇÊº]' alt='ÍÚ±ÇÊº' title='ÍÚ±ÇÊº'/>").replace("[³Ô¾ª]","<img src='"+static_url_comm+"/files/faces/cj.gif' addFacesPic='[³Ô¾ª]' alt='³Ô¾ª' title='³Ô¾ª'/>").replace("[º¦Ğß]","<img src='"+static_url_comm+"/files/faces/shamea.gif' addFacesPic='[º¦Ğß]' alt='º¦Ğß' title='º¦Ğß'/>").replace("[¼·ÑÛ]","<img src='"+static_url_comm+"/files/faces/zy.gif' addFacesPic='[¼·ÑÛ]' alt='¼·ÑÛ' title='¼·ÑÛ'/>").replace("[±Õ×ì]","<img src='"+static_url_comm+"/files/faces/bz.gif' addFacesPic='[±Õ×ì]' alt='±Õ×ì' title='±Õ×ì'/>").replace("[±ÉÊÓ]","<img src='"+static_url_comm+"/files/faces/bs2.gif' addFacesPic='[±ÉÊÓ]' alt='±ÉÊÓ' title='±ÉÊÓ'/>").replace("[°®Äã]","<img src='"+static_url_comm+"/files/faces/lovea.gif' addFacesPic='[°®Äã]' alt='°®Äã' title='°®Äã'/>").replace("[Àá]","<img src='"+static_url_comm+"/files/faces/sada.gif' addFacesPic='[Àá]' alt='Àá' title='Àá'/>").replace("[ÍµĞ¦]","<img src='"+static_url_comm+"/files/faces/heia.gif' addFacesPic='[ÍµĞ¦]' alt='ÍµĞ¦' title='ÍµĞ¦'/>").replace("[Ç×Ç×]","<img src='"+static_url_comm+"/files/faces/qq.gif' addFacesPic='[Ç×Ç×]' alt='Ç×Ç×' title='Ç×Ç×'/>").replace("[Éú²¡]","<img src='"+static_url_comm+"/files/faces/sb.gif' addFacesPic='[Éú²¡]' alt='Éú²¡' title='Éú²¡'/>").replace("[Ì«¿ªĞÄ]","<img src='"+static_url_comm+"/files/faces/mb.gif' addFacesPic='[Ì«¿ªĞÄ]' alt='Ì«¿ªĞÄ' title='Ì«¿ªĞÄ'/>").replace("[ÀÁµÃÀíÄã]","<img src='"+static_url_comm+"/files/faces/ldln.gif' addFacesPic='[ÀÁµÃÀíÄã]' alt='ÀÁµÃÀíÄã' title='ÀÁµÃÀíÄã'/>").replace("[ÓÒºßºß]","<img src='"+static_url_comm+"/files/faces/yhh.gif' addFacesPic='[ÓÒºßºß]' alt='ÓÒºßºß' title='ÓÒºßºß'/>").replace("[×óºßºß]","<img src='"+static_url_comm+"/files/faces/zhh.gif' addFacesPic='[×óºßºß]' alt='×óºßºß' title='×óºßºß'/>").replace("[Ğê]","<img src='"+static_url_comm+"/files/faces/x.gif' addFacesPic='[Ğê]' alt='Ğê' title='Ğê'/>").replace("[Ë¥]","<img src='"+static_url_comm+"/files/faces/cry.gif' addFacesPic='[Ë¥]' alt='Ë¥' title='Ë¥'/>").replace("[Î¯Çü]","<img src='"+static_url_comm+"/files/faces/wq.gif' addFacesPic='[Î¯Çü]' alt='Î¯Çü' title='Î¯Çü'/>").replace("[ÍÂ]","<img src='"+static_url_comm+"/files/faces/t.gif' addFacesPic='[ÍÂ]' alt='ÍÂ' title='ÍÂ'/>").replace("[´ò¹şÆø]","<img src='"+static_url_comm+"/files/faces/k.gif' addFacesPic='[´ò¹şÆø]' alt='´ò¹şÆø' title='´ò¹şÆø'/>").replace("[±§±§]","<img src='"+static_url_comm+"/files/faces/bba.gif' addFacesPic='[±§±§]' alt='±§±§' title='±§±§'/>").replace("[Å­]","<img src='"+static_url_comm+"/files/faces/angrya.gif' addFacesPic='[Å­]' alt='Å­' title='Å­'/>").replace("[ÒÉÎÊ]","<img src='"+static_url_comm+"/files/faces/yw.gif' addFacesPic='[ÒÉÎÊ]' alt='ÒÉÎÊ' title='ÒÉÎÊ'/>").replace("[²ö×ì]","<img src='"+static_url_comm+"/files/faces/cza.gif' addFacesPic='[²ö×ì]' alt='²ö×ì' title='²ö×ì'/>").replace("[°İ°İ]","<img src='"+static_url_comm+"/files/faces/88.gif' addFacesPic='[°İ°İ]' alt='°İ°İ' title='°İ°İ'/>").replace("[Ë¼¿¼]","<img src='"+static_url_comm+"/files/faces/sk.gif' addFacesPic='[Ë¼¿¼]' alt='Ë¼¿¼' title='Ë¼¿¼'/>").replace("[º¹]","<img src='"+static_url_comm+"/files/faces/sweata.gif' addFacesPic='[º¹]' alt='º¹' title='º¹'/>").replace("[À§]","<img src='"+static_url_comm+"/files/faces/sleepya.gif' addFacesPic='[À§]' alt='À§' title='À§'/>").replace("[Ë¯¾õ]","<img src='"+static_url_comm+"/files/faces/sleepa.gif' addFacesPic='[Ë¯¾õ]' alt='Ë¯¾õ' title='Ë¯¾õ'/>").replace("[Ç®]","<img src='"+static_url_comm+"/files/faces/money.gif' addFacesPic='[Ç®]' alt='Ç®' title='Ç®'/>").replace("[Ê§Íû]","<img src='"+static_url_comm+"/files/faces/sw.gif' addFacesPic='[Ê§Íû]' alt='Ê§Íû' title='Ê§Íû'/>").replace("[¿á]","<img src='"+static_url_comm+"/files/faces/cool.gif' addFacesPic='[¿á]' alt='¿á' title='¿á'/>").replace("[»¨ĞÄ]","<img src='"+static_url_comm+"/files/faces/hsa.gif' addFacesPic='[»¨ĞÄ]' alt='»¨ĞÄ' title='»¨ĞÄ'/>").replace("[ºß]","<img src='"+static_url_comm+"/files/faces/hatea.gif' addFacesPic='[ºß]' alt='ºß' title='ºß'/>").replace("[¹ÄÕÆ]","<img src='"+static_url_comm+"/files/faces/gza.gif' addFacesPic='[¹ÄÕÆ]' alt='¹ÄÕÆ' title='¹ÄÕÆ'/>").replace("[ÔÎ]","<img src='"+static_url_comm+"/files/faces/dizzya.gif' addFacesPic='[ÔÎ]' alt='ÔÎ' title='ÔÎ'/>").replace("[±¯ÉË]","<img src='"+static_url_comm+"/files/faces/bs.gif' addFacesPic='[±¯ÉË]' alt='±¯ÉË' title='±¯ÉË'/>").replace("[×¥¿ñ]","<img src='"+static_url_comm+"/files/faces/crazya.gif' addFacesPic='[×¥¿ñ]' alt='×¥¿ñ' title='×¥¿ñ'/>").replace("[ºÚÏß]","<img src='"+static_url_comm+"/files/faces/h.gif' addFacesPic='[ºÚÏß]' alt='ºÚÏß' title='ºÚÏß'/>").replace("[ÒõÏÕ]","<img src='"+static_url_comm+"/files/faces/yx.gif' addFacesPic='[ÒõÏÕ]' alt='ÒõÏÕ' title='ÒõÏÕ'/>").replace("[Å­Âî]","<img src='"+static_url_comm+"/files/faces/nm.gif' addFacesPic='[Å­Âî]' alt='Å­Âî' title='Å­Âî'/>").replace("[ĞÄ]","<img src='"+static_url_comm+"/files/faces/hearta.gif' addFacesPic='[ĞÄ]' alt='ĞÄ' title='ĞÄ'/>").replace("[ÉËĞÄ]","<img src='"+static_url_comm+"/files/faces/unheart.gif' addFacesPic='[ÉËĞÄ]' alt='ÉËĞÄ' title='ÉËĞÄ'/>");
		$(this).html(content);
		}		
	});
	//²åÈë¹â±ê´¦µÄ²å¼ş
	$.fn.extend({  
		insertContent : function(myValue, t) {  
			var $t = $(this)[0];  
			if (document.selection) {  
				this.focus();  
				var sel = document.selection.createRange();  
				sel.text = myValue;  
				this.focus();  
				sel.moveStart('character', -l);  
				var wee = sel.text.length;  
				if (arguments.length == 2) {  
				var l = $t.value.length;  
				sel.moveEnd("character", wee + t);  
				t <= 0 ? sel.moveStart("character", wee - 2 * t	- myValue.length) : sel.moveStart("character", wee - t - myValue.length);  
				sel.select();  
				}  
			} else if ($t.selectionStart || $t.selectionStart == '0') {  
				var startPos = $t.selectionStart;  
				var endPos = $t.selectionEnd;  
				var scrollTop = $t.scrollTop;  
				$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,$t.value.length);  
				this.focus();  
				$t.selectionStart = startPos + myValue.length;  
				$t.selectionEnd = startPos + myValue.length;  
				$t.scrollTop = scrollTop;  
				if (arguments.length == 2) { 
					$t.setSelectionRange(startPos - t,$t.selectionEnd + t);  
					this.focus(); 
				}  
			} else {                              
				this.value += myValue;                              
				this.focus();  
			}  
		}  
	});
});
