$(function() {
	$.fn.manhuaHtmlArea = function(options) {
		var defaults = {
			Event : "click",	//��Ӧ���¼�
			Left : 0,			//�������ʾƫ��Ԫ����ߵ�λ��
			Top : 22,			//�������ʾƫ��Ԫ���ϱߵ�λ��
			id : "content"  	//���ݲ������ID
		};
		var options = $.extend(defaults,options);
		var bid = parseInt(Math.random()*100000);	
		$("#mbar").prepend("<div id='showAddFacePic"+bid+"'class='addons layer-emotions'><b class='tri-b'></b><b class='tri-t'></b><div class='layer-tab clearfix'><a id='close"+bid+"' class='close' href='javascript:void(0)'></a><span>���ñ���</span></div><div class='layer-content'><ul id='emotions"+bid+"' class='emotions clearfix'><li><img src='"+static_url_comm+"/files/faces/smilea.gif' addFacesPic='[�Ǻ�]' alt='�Ǻ�' title='�Ǻ�'/></li><li><img src='"+static_url_comm+"/files/faces/tootha.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/laugh.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/tza.gif' addFacesPic='[�ɰ�]' alt='�ɰ�' title='�ɰ�'/></li><li><img src='"+static_url_comm+"/files/faces/kl.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/kbsa.gif' addFacesPic='[�ڱ�ʺ]' alt='�ڱ�ʺ' title='�ڱ�ʺ'/></li><li><img src='"+static_url_comm+"/files/faces/cj.gif' addFacesPic='[�Ծ�]' alt='�Ծ�' title='�Ծ�'/></li><li><img src='"+static_url_comm+"/files/faces/shamea.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/zy.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/bz.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/bs2.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/lovea.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/sada.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/heia.gif' addFacesPic='[͵Ц]' alt='͵Ц' title='͵Ц'/></li><li><img src='"+static_url_comm+"/files/faces/qq.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/sb.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/mb.gif' addFacesPic='[̫����]' alt='̫����' title='̫����'/></li><li><img src='"+static_url_comm+"/files/faces/ldln.gif' addFacesPic='[��������]' alt='��������' title='��������'/></li><li><img src='"+static_url_comm+"/files/faces/yhh.gif' addFacesPic='[�Һߺ�]' alt='�Һߺ�' title='�Һߺ�'/></li><li><img src='"+static_url_comm+"/files/faces/zhh.gif' addFacesPic='[��ߺ�]' alt='��ߺ�' title='��ߺ�'/></li><li><img src='"+static_url_comm+"/files/faces/x.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/cry.gif' addFacesPic='[˥]' alt='˥' title='˥'/></li><li><img src='"+static_url_comm+"/files/faces/wq.gif' addFacesPic='[ί��]' alt='ί��' title='ί��'/></li><li><img src='"+static_url_comm+"/files/faces/t.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/k.gif' addFacesPic='[�����]' alt='�����' title='�����'/></li><li><img src='"+static_url_comm+"/files/faces/bba.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/angrya.gif' addFacesPic='[ŭ]' alt='ŭ' title='ŭ'/></li><li><img src='"+static_url_comm+"/files/faces/yw.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/cza.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/88.gif' addFacesPic='[�ݰ�]' alt='�ݰ�' title='�ݰ�'/></li><li><img src='"+static_url_comm+"/files/faces/sk.gif' addFacesPic='[˼��]' alt='˼��' title='˼��'/></li><li><img src='"+static_url_comm+"/files/faces/sweata.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/sleepya.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/sleepa.gif' addFacesPic='[˯��]' alt='˯��' title='˯��'/></li><li><img src='"+static_url_comm+"/files/faces/money.gif' addFacesPic='[Ǯ]' alt='Ǯ' title='Ǯ'/></li><li><img src='"+static_url_comm+"/files/faces/sw.gif' addFacesPic='[ʧ��]' alt='ʧ��' title='ʧ��'/></li><li><img src='"+static_url_comm+"/files/faces/cool.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/hsa.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/hatea.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/gza.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/dizzya.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/bs.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/crazya.gif' addFacesPic='[ץ��]' alt='ץ��' title='ץ��'/></li><li><img src='"+static_url_comm+"/files/faces/h.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/yx.gif' addFacesPic='[����]' alt='����' title='����'/></li><li><img src='"+static_url_comm+"/files/faces/nm.gif' addFacesPic='[ŭ��]' alt='ŭ��' title='ŭ��'/></li><li><img src='"+static_url_comm+"/files/faces/hearta.gif' addFacesPic='[��]' alt='��' title='��'/></li><li><img src='"+static_url_comm+"/files/faces/unheart.gif' addFacesPic='[����]' alt='����' title='����'/></li></ul></div></div>");	
		var $btn = $(this);
		var $biaoqing = $("#showAddFacePic"+bid);	
		var $emotions = $("#emotions"+bid+" li img");
		var $close = $("#close"+bid);
		var $input = $("#"+options.id);
		//�������¼�
		$emotions.die().click(function(){
			 $biaoqing.hide();
			 $input.die().insertContent($(this).attr("addFacesPic"));			 
		});		
		//�رձ����
		$close.click(function(){
			 $biaoqing.hide();			 	 
		});
		$biaoqing.hover(function(){$biaoqing.show();},function(){$biaoqing.hide();	});
		//ѡ����鰴ť�����¼�
		$btn.live(options.Event,function(e){						
		  var iof = $(this).offset();
		  var w = $(this).width();
		  var h = $(this).height();
		  $biaoqing.css({ "left" : iof.left+options.Left,"top" : iof.top+options.Top });
		  $biaoqing.show();		  
		});			
	};
	
	//�����������
	$.fn.extend({
		replaceContent : function(content){
		content = content.replace("[�Ǻ�]","<img src='"+static_url_comm+"/files/faces/smilea.gif' addFacesPic='[�Ǻ�]' alt='�Ǻ�' title='�Ǻ�'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/tootha.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/laugh.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[�ɰ�]","<img src='"+static_url_comm+"/files/faces/tza.gif' addFacesPic='[�ɰ�]' alt='�ɰ�' title='�ɰ�'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/kl.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[�ڱ�ʺ]","<img src='"+static_url_comm+"/files/faces/kbsa.gif' addFacesPic='[�ڱ�ʺ]' alt='�ڱ�ʺ' title='�ڱ�ʺ'/>").replace("[�Ծ�]","<img src='"+static_url_comm+"/files/faces/cj.gif' addFacesPic='[�Ծ�]' alt='�Ծ�' title='�Ծ�'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/shamea.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/zy.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/bz.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/bs2.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/lovea.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/sada.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[͵Ц]","<img src='"+static_url_comm+"/files/faces/heia.gif' addFacesPic='[͵Ц]' alt='͵Ц' title='͵Ц'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/qq.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/sb.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[̫����]","<img src='"+static_url_comm+"/files/faces/mb.gif' addFacesPic='[̫����]' alt='̫����' title='̫����'/>").replace("[��������]","<img src='"+static_url_comm+"/files/faces/ldln.gif' addFacesPic='[��������]' alt='��������' title='��������'/>").replace("[�Һߺ�]","<img src='"+static_url_comm+"/files/faces/yhh.gif' addFacesPic='[�Һߺ�]' alt='�Һߺ�' title='�Һߺ�'/>").replace("[��ߺ�]","<img src='"+static_url_comm+"/files/faces/zhh.gif' addFacesPic='[��ߺ�]' alt='��ߺ�' title='��ߺ�'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/x.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[˥]","<img src='"+static_url_comm+"/files/faces/cry.gif' addFacesPic='[˥]' alt='˥' title='˥'/>").replace("[ί��]","<img src='"+static_url_comm+"/files/faces/wq.gif' addFacesPic='[ί��]' alt='ί��' title='ί��'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/t.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[�����]","<img src='"+static_url_comm+"/files/faces/k.gif' addFacesPic='[�����]' alt='�����' title='�����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/bba.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[ŭ]","<img src='"+static_url_comm+"/files/faces/angrya.gif' addFacesPic='[ŭ]' alt='ŭ' title='ŭ'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/yw.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/cza.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[�ݰ�]","<img src='"+static_url_comm+"/files/faces/88.gif' addFacesPic='[�ݰ�]' alt='�ݰ�' title='�ݰ�'/>").replace("[˼��]","<img src='"+static_url_comm+"/files/faces/sk.gif' addFacesPic='[˼��]' alt='˼��' title='˼��'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/sweata.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/sleepya.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[˯��]","<img src='"+static_url_comm+"/files/faces/sleepa.gif' addFacesPic='[˯��]' alt='˯��' title='˯��'/>").replace("[Ǯ]","<img src='"+static_url_comm+"/files/faces/money.gif' addFacesPic='[Ǯ]' alt='Ǯ' title='Ǯ'/>").replace("[ʧ��]","<img src='"+static_url_comm+"/files/faces/sw.gif' addFacesPic='[ʧ��]' alt='ʧ��' title='ʧ��'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/cool.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/hsa.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/hatea.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/gza.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/dizzya.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/bs.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[ץ��]","<img src='"+static_url_comm+"/files/faces/crazya.gif' addFacesPic='[ץ��]' alt='ץ��' title='ץ��'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/h.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/yx.gif' addFacesPic='[����]' alt='����' title='����'/>").replace("[ŭ��]","<img src='"+static_url_comm+"/files/faces/nm.gif' addFacesPic='[ŭ��]' alt='ŭ��' title='ŭ��'/>").replace("[��]","<img src='"+static_url_comm+"/files/faces/hearta.gif' addFacesPic='[��]' alt='��' title='��'/>").replace("[����]","<img src='"+static_url_comm+"/files/faces/unheart.gif' addFacesPic='[����]' alt='����' title='����'/>");
		$(this).html(content);
		}		
	});
	//�����괦�Ĳ��
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
