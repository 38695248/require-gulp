<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:16:45
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\raise\goodsraise.html" */ ?>
<?php /*%%SmartyHeaderCode:3055256907b9d93cec7-55703013%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a41a5d7f9f9e648e154445fd715d403786f18de2' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\raise\\goodsraise.html',
      1 => 1452245273,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '3055256907b9d93cec7-55703013',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'buy_raise' => 0,
    'users_info' => 0,
    'isme' => 0,
    'raise_log' => 0,
    'val' => 0,
    'key' => 0,
    'raise_log_max' => 0,
    'user_raise_list' => 0,
    'my_score' => 0,
    'static_url' => 0,
    'signPackage' => 0,
    'jsapi_txt' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907b9daee8a3_22466584',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907b9daee8a3_22466584')) {function content_56907b9daee8a3_22466584($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox">
<div class="mainbox_p0">
    <div class="headerbox showhide headerbox_view">
     <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    </div>
    <div class="contentbox bg-fff" style="padding-bottom:55px">
    	<div class="mb-10"><a href="http://www.byshare.com/m_sns/special_feeback.html" target="_self"><img src="http://7xkdow.com2.z0.glb.qiniucdn.com/20151130/19/1806349943.jpg" ></a></div>
    	<div class="crowd-img">
        	<a href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['gdid'];?>
">
            	<img src="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['img']['b'];?>
">
            </a>
        </div>
        <div class="crowd-user">
        	<div class="crowd-text rowbox">
                <div class="row-flex1">
                	<p style="white-space:nowrap; overflow:hidden; margin-right:5px"><a class="color-blue" href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['gdid'];?>
"><?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['gdname'];?>
</a></p>
                    <p class="p-price line24">
                        ¥ <?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['total'];?>
&nbsp;<span></span>
                    </p>
                </div>
                <div class="avatar_crowd">
                	<a class="rowbox" href="/mk_market/red_packet.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['suid'];?>
">
                      <div class="avatar w30 mr-5"> 
                        <img src="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['avatar'][1];?>
" class="avatar_lazy userThumb" />
                      </div>
                       <div class="row-flex1 avatar-text">
                            <h2><?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['uname'];?>
</h2>
                            <p style="white-space:nowrap" class="color-red">
                                赏金 ¥<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['rewardtotal'];?>

                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="crowd-jd rowbox text-center line30">
            	<div class="row-flex1 crowd-text-line">
                	<p>目标</p>
                    <p class="color-red f21">¥<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['totalaim'];?>
</p>
                </div>
            	<div class="row-flex1 crowd-text-line">
                	<p>已筹</p>
                    <p class="color-red f21">¥<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['totalraise'];?>
</p>
                </div>
                <div class="row-flex1 crowd-text-line">
                	<p>差额</p>
                    <p class="color-red f21">¥<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['totalleft'];?>
</p>
                </div>
                <div class="row-flex1">
                	<p>支持</p>
                    <p class="color-red f21"><?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['numraise'];?>
</p>
                </div>
            </div>
            <div class="crowd-time text-center line50 f21 color-red">
                <?php if ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==2) {?>
            	倒计时：<span id="crowdtimers" data-time="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['lefttime'];?>
">-天-小时-秒</span>
                <?php } else { ?>
                <?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['status_txt'];?>
<?php if ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==2||$_smarty_tpl->tpl_vars['buy_raise']->value['status']==3||$_smarty_tpl->tpl_vars['buy_raise']->value['status']==6) {?>，赶快<?php if (!$_smarty_tpl->tpl_vars['isme']->value) {?>喊TA<?php }?>去 提货 吧<?php }?>
                <?php }?>
            </div>
            <div class="rowd-user rowbox">
            	<div class="avatar_crowd_c rowbox">
                   <a class="rowbox" href="/mk_market/red_packet.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['suid'];?>
">
                      <div class="avatar mr-5" style="width:46px; height:46px"> 
                        <img src="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['avatar'][1];?>
" class="avatar_lazy userThumb" />
                      </div>
                       <div class="row-flex1 avatar-text">
                            <p class="color-777 f12" style="padding-left:5px"><?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['uname'];?>
</p>
                            <div class="messageWrapper" style="margin-left:-15px">
                                <div class="cmmMessage notOwnMessage"> <em class="ico ico-caret"></em>
                                  <p style="font-size:16px; line-height:24px">
                                  	<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['shortdesc'];?>

                                    <span style="border-top:#e5e5e5 solid 1px; margin-top:10px; line-height:20px; padding-top:3px; display:block; font-size:12px">我支持百享众筹，收货满意后，我将打赏百享<span class="b">￥<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['rewardtotal'];?>
</span>元，大家也0元发起"打赏众筹“吧！</span>
                                  </p>
                                </div>
                           </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="money_list" style="padding:0">
            <div id="crowlist" data-url="/m_raise/toplist.html?ajax=1&fsuid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['suid'];?>
&raiseid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
"></div>
            
        	<div class="money_list_1" style="padding-bottom:10px">
        		<h2 class="text-center">最近支持你的朋友(Top10)</h2>
                <ul>
                <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['raise_log']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
                	<li>
                      <a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['val']->value['suid'];?>
" class="rowbox">
                          <div>
                              <span class="ico groupavatar">
                              <img src="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['avatar'][1];?>
" class="avatar_lazy userThumb" /></span>
                          </div>
                          <div class="row-flex1">
                            <p class="user_title"><span class="f12 fr"><?php echo $_smarty_tpl->tpl_vars['val']->value['edttime_txt'];?>
</span>第 <?php echo $_smarty_tpl->tpl_vars['key']->value+1;?>
 名</p>
                          	<p><?php if ($_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['uname']) {?><?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['uname'];?>
<?php } else { ?>无名英雄<?php }?>为<?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>我<?php } else { ?>TA<?php }?>支持<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['score']+$_smarty_tpl->tpl_vars['val']->value['money'];?>
</span>元
                            <?php if ($_smarty_tpl->tpl_vars['val']->value['moneyback']>0) {?>；收到感谢赏金<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['moneyback'];?>
</span>元<?php }?>
                            <?php if ($_smarty_tpl->tpl_vars['val']->value['shdesc']) {?>&nbsp;&nbsp;”<?php echo $_smarty_tpl->tpl_vars['val']->value['shdesc'];?>
“<?php }?>
                            </p>
                          </div>
                      </a>
                    </li>
                 <?php } ?> 
                 <?php if (!$_smarty_tpl->tpl_vars['raise_log']->value) {?>
                     <li class="line30 text-center">
                      <p class="blank10"></p>
                      <?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>
                      <p>还没有朋友帮您众筹？赶快分享邀请朋友帮忙众筹0元购得该宝贝吧</p>
                      <?php } else { ?>
                      <p>是TA的朋友就TA支持吧，TA准备了一笔赏金给您惊喜哟~</p>
                      <?php }?>
                     </li>
                  <?php }?>     
                </ul>
            </div>
            <div class="money_list_1">
        		<h2 class="text-center">好友支持排行榜（Top10）</h2>
                <ul>
                    <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['raise_log_max']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
                	<li>
                      <a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['val']->value['suid'];?>
" class="rowbox">
                          <div>
                              <span class="ico groupavatar">
                              <img src="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['avatar'][1];?>
" class="avatar_lazy userThumb" /></span>
                          </div>
                          <div class="row-flex1">
                            <p class="user_title"><span class="f12 fr"><?php echo $_smarty_tpl->tpl_vars['val']->value['edttime_txt'];?>
</span>第 <?php echo $_smarty_tpl->tpl_vars['key']->value+1;?>
 名</p>
                          	<p><?php if ($_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['uname']) {?><?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['val']->value['suid']]['uname'];?>
<?php } else { ?>无名英雄<?php }?>为<?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>我<?php } else { ?>TA<?php }?>支持<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['total'];?>
</span>元
                            <?php if ($_smarty_tpl->tpl_vars['val']->value['moneyback']>0) {?>；收到感谢赏金<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['moneyback'];?>
</span>元<?php }?>
                            <?php if ($_smarty_tpl->tpl_vars['val']->value['shdesc']) {?>&nbsp;&nbsp;”<?php echo $_smarty_tpl->tpl_vars['val']->value['shdesc'];?>
“<?php }?>
                            </p>
                          </div>
                      </a>
                    </li>
                    <?php } ?> 
                    <?php if (!$_smarty_tpl->tpl_vars['raise_log_max']->value) {?>
                     <li class="line30 text-center">
                      <p class="blank10"></p>
                      <?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>
                      <p>还没有朋友帮您众筹？赶快分享邀请朋友帮忙众筹0元购得该宝贝吧</p>
                      <?php } else { ?>
                      <p>是TA的朋友就支持TA吧，他有赏金给您惊喜哟~</p>
                      <?php }?>
                     </li>
                  <?php }?>   
                </ul>
            </div>
            <!--div class="money_list_1" style="padding-bottom:10px">
        		<h2 class="text-center">TA的全部众筹</h2>
                <ul>
                <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['user_raise_list']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
                	<li>
                      <a href="/m_raise/goodsraise.html?id=<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
" class="rowbox">
                          <div class="w60" style="padding:10px; height:65px; overflow:hidden">
                              <img src="<?php echo $_smarty_tpl->tpl_vars['val']->value['goodsimg']['s'];?>
" class="userThumb" />
                          </div>
                          <div class="row-flex1 line20">
                            <p class="user_title mb-5" style="line-height:20px; white-space:nowrap; overflow:hidden"><?php echo $_smarty_tpl->tpl_vars['val']->value['gdname'];?>
</p>
                            <p class="color-999">发起时间：<?php echo $_smarty_tpl->tpl_vars['val']->value['edttime_txt'];?>
</p>
                          	<p>目标:<span class="color-red">¥<?php echo $_smarty_tpl->tpl_vars['val']->value['totalaim'];?>
</span> 已筹:<span class="color-red">¥<?php echo $_smarty_tpl->tpl_vars['val']->value['totalraise'];?>
</span> 差额:<span class="color-red">¥<?php echo $_smarty_tpl->tpl_vars['val']->value['totalleft'];?>
</span> 支持:<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['numraise'];?>
</span></p>
                          </div>
                      </a>
                    </li>
                <?php } ?>    
                </ul>
            </div-->
            
        </div>
    </div>
    <div class="footerbox">
      <div class="rowbox" style="height:55px; line-height:55px">
          <div class="w50" style="border-right:#e5e5e5  solid 1px; display:none"><span class="ico-i ico-zan-i"></span></div>
          <div class="w60 btn-share-i"><span class="ico-i ico-share-i"></span></div>
          <?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>
            <?php if ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==1) {?>
            <!--a href="/m_raise/pay_reward.html?id=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
">
            <div class="row-flex1 btn-ff5000 f16" data-url="">支付赏金</div>
            </a-->
            <?php } elseif ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==2) {?>
            <div class="row-flex1 btn-ff9402 f16 crowd-btn" data-url="/m_raise/raise_do.html" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-type='1' data-act="cash">自付差额</div> 
            <?php } elseif ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==3) {?>
            <div class="row-flex1 btn-ff9402 f16 take-btn" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-rewardtotal="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['rewardtotal'];?>
" data-type="2">立即提货</div>
            <!--div class="row-flex1 btn-ff9402 f16" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-rewardtotal="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['rewardtotal'];?>
" data-type="2"><a href="/m_raise/goodsraise_end.html?raiseid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
&reward_afpay=2" class="block color-fff">立即提货</a></div-->
            <?php } elseif ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==4) {?>
            <div class="row-flex1 btn-ff9402 f16 take-btn" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-rewardtotal="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['rewardtotal'];?>
" data-type="2">重新提货</div>
            <div class="row-flex1 btn-04be01 f16"><a href="/mybuys/myorder.html?orderfid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['orderfid'];?>
&orderid=<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['orderid'];?>
" class="block color-fff">众筹订单</a></div>  
            <?php } elseif ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==6) {?>
            	<?php if ($_smarty_tpl->tpl_vars['buy_raise']->value['totalleft']>0) {?>
            	<div class="row-flex1 btn-ff9402 f16 crowd-btn" data-url="/m_raise/raise_do.html" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-type='1' data-act="cash">自付差额</div>
              	<?php } else { ?>
                <div class="row-flex1 btn-ff9402 f16 take-btn" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-rewardtotal="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['rewardtotal'];?>
" data-type="2">立即提货</div>
                <?php }?>
            <?php }?>
            <?php if ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==1||$_smarty_tpl->tpl_vars['buy_raise']->value['status']==2||$_smarty_tpl->tpl_vars['buy_raise']->value['status']==3) {?>
            <div class="row-flex1 btn-04be01 f16 crowd-btn" data-url="/m_raise/goodsraise_close.html" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-act="cancel">取消众筹</div>
            <?php }?>
            <div class="row-flex1 btn-ff5000 f16"><a href="/m_raise/goodsraise_my.html" class="block color-fff">我的众筹</a></div>        
          <?php } else { ?>
            <?php if ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==1) {?>
            <div class="row-flex1 btn-ccc f16">还没开始呢</div>
            <?php } elseif ($_smarty_tpl->tpl_vars['buy_raise']->value['status']==2) {?>
            <div class="row-flex1 btn-ff9402 f16 crowd-btn" data-url="/m_raise/raise_do.html" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-type='1' data-act="cash">现金支持</div>
            <div class="row-flex1 btn-04be01 f16 crowd-btn" data-url="/m_raise/raise_do.html" data-raiseid="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['id'];?>
" data-type='3' data-israised="<?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['israised_score'];?>
" data-act="gold">享金支持</div>
            <?php } else { ?>
            <div class="row-flex1 btn-ccc f16"><?php echo $_smarty_tpl->tpl_vars['buy_raise']->value['status_txt'];?>
</div>
            <?php }?>
            <div class="row-flex1 btn-ff5000 f16 crowd-btn" data-act="want">我要众筹</div>         
          <?php }?>
      </div>
    </div>
</div>
<!--现金支付-->
<div id="sns_crowdtip" class="tipbox tipbox_fixed fade" data-index="1">
	<form id="sns_crowdform" class="addCommentForm" method="post" action="">
        <div class="tipbox-in" data-index="0">
            <h1 class="tiptop">支持朋友</h1>
            <span class="ico02 tipclose closeBtnHtml"></span>
            <div class="tipcont tipcontbox">
               <div class="text-center">
                     <div class="avatar_money"> 
                        <img src="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['avatar'][1];?>
" class="avatar_lazy userThumb" />
                        <p class="line30"><?php echo $_smarty_tpl->tpl_vars['users_info']->value[$_smarty_tpl->tpl_vars['buy_raise']->value['suid']]['uname'];?>
</p>
                     </div>
               </div>
               <div class="blank5"></div>
               <div class="pay_f_m">
               		<h2 class="mb-10">
                    	<span id="pay_title">现金支持</span>
                        <span id="sharemony_box" style="display:none">（享金余额：<span class="color-red">¥<?php echo $_smarty_tpl->tpl_vars['my_score']->value;?>
）</span></span>
                    </h2>
                    <div id="xianj_box"  class="rowbox f16">
                    	<div class="line36">¥</div>
                        <div class="row-flex1" id="xianj_input_box">
                        	<input type="text" value="" id="raise_money" name="raise_money" placeholder="请输入您要支持的金额" class="border-fff" style="height:36px; font-size:16px" data-validate="Money" />
                        </div>
                    </div>
                    <ul id="xiangj_box" class="share_money_list rowbox">
                    	<?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['buy_raise']->value['paysel']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
                            <li data-val="<?php echo $_smarty_tpl->tpl_vars['val']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['val']->value;?>
<span class="f12">元</span></li>
                        <?php } ?>
                    </ul>
                    <div id="pay_f_m_text" class="pay_f_m_text">
                        <input id="pay_f_m_input" name="shdesc" type="text" value=" " placeholder="添加支持留言" class="border-fff" style="height:36px; font-size:14px" readonly />
                    </div>
               </div>
               <div class="pay_f_m_btn"><button id="crowd-submit-btn" class="btn btn-red w100e">立即支持</button></div>
            </div>
        </div>
    </form>
</div>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> 
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/activity_raise.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script type="text/javascript">
var iswxshare = 0;
wx.config({
	debug: false,
	appId: '<?php echo $_smarty_tpl->tpl_vars['signPackage']->value["appId"];?>
',
	timestamp: '<?php echo $_smarty_tpl->tpl_vars['signPackage']->value["timestamp"];?>
',
	nonceStr: '<?php echo $_smarty_tpl->tpl_vars['signPackage']->value["nonceStr"];?>
',
	signature: '<?php echo $_smarty_tpl->tpl_vars['signPackage']->value["signature"];?>
',
	jsApiList: [
		// 所有要调用的 API 都要加到这个列表中
		'checkJsApi',
		//'openLocation',
		//'getLocation',
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareQZone'
	  ]
});
wx.ready(function () {
	// 通过checkJsApi判断当前客户端版本是否支持分享参数自定义
	wx.checkJsApi({
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareQZone'
		],
		success: function (res) {
			//alert(JSON.stringify(res));
		}
	});
	//微信朋友
	wx.onMenuShareAppMessage({
	  title: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["title"];?>
',
	  desc: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["desc"];?>
',
	  link: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["link"];?>
',
	  imgUrl: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["imgUrl"];?>
',
	  trigger: function (res) {
		// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		//alert('用户点击发送给朋友');
	  },
	  success: function (res) {
		 iswxshare = 1;
		ActivityClass.apiweixin({});
		//alert('已分享');
	  },
	  cancel: function (res) {
		//alert('已取消');
	  },
	  fail: function (res) {
		alert(JSON.stringify(res));
	  }
	});
	//微信朋友圈
	wx.onMenuShareTimeline({
	  title: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["title"];?>
',
	  link: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["link"];?>
',
	  imgUrl: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["imgUrl"];?>
',
	  trigger: function (res) {
		// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		//alert('用户点击分享到朋友圈');
	  },
	  success: function (res) {
		//alert('已分享');
		iswxshare = 1;
		ActivityClass.apiweixin({});
	  },
	  cancel: function (res) {
		//alert('已取消');
	  },
	  fail: function (res) {
		alert(JSON.stringify(res));
	  }
	});
	//分享到QQ
	wx.onMenuShareQQ({
		title: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["title"];?>
',
		desc: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["desc"];?>
',
		link: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["link"];?>
',
		imgUrl: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["imgUrl"];?>
',
		success: function () { 
		   // 用户确认分享后执行的回调函数
		},
		cancel: function () { 
		   // 用户取消分享后执行的回调函数
		}
	});
	//分享到QQ空间
	wx.onMenuShareQZone({
		title: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["title"];?>
',
		desc: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["desc"];?>
',
		link: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["link"];?>
',
		imgUrl: '<?php echo $_smarty_tpl->tpl_vars['jsapi_txt']->value["imgUrl"];?>
',
		success: function () { 
		   // 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});
});

</script>

</body>

</html>
<?php }} ?>
