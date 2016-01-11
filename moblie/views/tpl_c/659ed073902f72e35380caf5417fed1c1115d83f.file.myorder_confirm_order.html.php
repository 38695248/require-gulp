<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 04:17:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\myorder_confirm_order.html" */ ?>
<?php /*%%SmartyHeaderCode:1904956907bb6de3b99-13408253%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '659ed073902f72e35380caf5417fed1c1115d83f' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\myorder_confirm_order.html',
      1 => 1452245276,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1904956907bb6de3b99-13408253',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'cartinfo' => 0,
    'val' => 0,
    'buy_ask' => 0,
    'currency' => 0,
    'val2' => 0,
    'val3' => 0,
    'key' => 0,
    'data_more' => 0,
    'num_paymentlist' => 0,
    'lang' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907bb706e709_67627306',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907bb706e709_67627306')) {function content_56907bb706e709_67627306($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">
<div class="mainbox" id="fxpage_user" data-role="page">
<form id="paymentForm2" method="post" action="/myorder/submit_order.html" data-ajax="true">
  <div id="headerbox" class="headerbox">
    <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  <div class="contentbox" data-role="content">
    <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['cartinfo']->value['order_son']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
    <ul class="jsbox jsbox-pd">
      	<!--li class="rowbox">
        	<div class="row-flex1">设计师：<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['shopname'];?>
</span></div>
        </li-->
        <?php if ($_smarty_tpl->tpl_vars['buy_ask']->value['askid']>0) {?>
        <li class="rowbox">
            <div class="w60 cartimg goodsImg mr-10">
            <a href="/ask/viewask.html?askid=<?php echo $_smarty_tpl->tpl_vars['buy_ask']->value['askid'];?>
">
            <img src="<?php echo $_smarty_tpl->tpl_vars['buy_ask']->value['img'];?>
">
            </a>
            </div>
            <div class="cartinfo row-flex1">
              <div class="rowbox color-333">
                  <div class="row-flex1 color-blue"><?php echo $_smarty_tpl->tpl_vars['buy_ask']->value['title'];?>
</div>
                  <div class="color-red">
                  	<p><?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
 <?php echo $_smarty_tpl->tpl_vars['buy_ask']->value['total_svr'];?>
</p>
                  </div>
              </div>
              <div class="color-777 goodsotherinfo rowbox">
              	<div class="row-flex1"><span class="mr-10">定制要求：<?php echo $_smarty_tpl->tpl_vars['buy_ask']->value['askinfo_s'];?>
</div>
              </div>
            </div>
         </li>
        <?php } else { ?>
        <?php  $_smarty_tpl->tpl_vars['val2'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val2']->_loop = false;
 $_smarty_tpl->tpl_vars['key2'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['val']->value['cart_goods_key']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val2']->key => $_smarty_tpl->tpl_vars['val2']->value) {
$_smarty_tpl->tpl_vars['val2']->_loop = true;
 $_smarty_tpl->tpl_vars['key2']->value = $_smarty_tpl->tpl_vars['val2']->key;
?>
      	<li class="rowbox">
            <div class="w60 cartimg goodsImg mr-10">
            <a href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['gdid'];?>
">
            <img src="<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['pic'];?>
">
            </a>
            </div>
            <div class="cartinfo row-flex1">
              <div class="rowbox color-333">
                  <div class="row-flex1 color-blue"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['gdname'];?>
</div>
                  <div class="color-red">
                  	<p><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['exrtitle'];?>
 <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['price'];?>
</p>
                  </div>
              </div>
              <div class="color-777 goodsotherinfo rowbox">
              	<div class="row-flex1"><span class="mr-10">颜色：<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buycolor'][1];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buycolor'][2];?>
</span><span>尺寸：<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buysize'][1];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buysize'][2];?>
<?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['bodyData_name']) {?>（量身人：<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['bodyData_name'];?>
）<?php }?></span>
                <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buyattr']) {?>
                <span>定制元素：<?php  $_smarty_tpl->tpl_vars['val3'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val3']->_loop = false;
 $_smarty_tpl->tpl_vars['key3'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buyattr']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val3']->key => $_smarty_tpl->tpl_vars['val3']->value) {
$_smarty_tpl->tpl_vars['val3']->_loop = true;
 $_smarty_tpl->tpl_vars['key3']->value = $_smarty_tpl->tpl_vars['val3']->key;
?><?php echo $_smarty_tpl->tpl_vars['val3']->value[3];?>
、<?php } ?></span>
                <?php }?>
                </div>
                <div class="w50 text-right">X&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buynum'];?>
</div>
              </div>
              <div class="color-777 goodsotherinfo rowbox">
                <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['money_back']>0) {?>
                <div class="row-flex1"><span class="mr-10 color-red">返现：￥<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['money_back'];?>
&nbsp;X&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goods'][$_smarty_tpl->tpl_vars['val2']->value]['buynum'];?>
</span></div>
                <?php }?>
              </div>
            </div>
         </li>
         <?php } ?>
         <?php }?>
         <li class="rowbox">
         	<div class="mr-5">订单备注：</div>
            <div class="row-flex1">
         		<input type="text" name="note_<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
" id="userAbout" style="height:30px" class="noborder" placeholder="选填，订单备注">
            </div>
         </li>
         <li class="text-right">
         	<?php if ($_smarty_tpl->tpl_vars['val']->value['discounttotal']>0) {?>
         	<p>折扣：<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
 <?php echo $_smarty_tpl->tpl_vars['val']->value['discounttotal'];?>
</span></p>
            <?php }?>
         	<p>小计：<span class="color-red"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
 <?php echo $_smarty_tpl->tpl_vars['val']->value['goodstotal'];?>
</span></p>
         </li>
    </ul>
    <?php } ?>
	<ul class="jsbox">
          <li class="rowbox">
            <div class="w60">送货到</div>
            <div class="row-flex1 text-right">
                        <!--a data-role="none" rel="external" href="javascript:void(0);" class="wxAddressBtn color-blue mr-5" data-address="0">使用微信地址</a> | --> 
            
            <a href="javascript:void(0);" class="addAddressBtn color-blue mr-5" data-address="0" data-act="add">增加新地址
            	<div class="ico ico-jt-d"></div>
             </a>
            </div>
          </li>
          <div id="addrid">
          </div>
        </ul>
    <ul class="jsbox">
        <li class="rowbox">
            <div class="row-flex1">送货方式</div>
            <div class="ico ico-jt-d"></div>
        </li>
        <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['data_more']->value['shippinglist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
        <li>
            <div class="rowbox mt-10" id="shippinglist"> <div class="rowbox"><input data-role="none" name="shippingid" type="radio" value="<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
" id="shippingid_<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
" <?php if ($_smarty_tpl->tpl_vars['key']->value==0) {?>checked<?php }?>><label for="shippingid_<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
"><?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
</label></div></div>
        </li>
        <?php } ?>
    </ul>
    <ul class="jsbox">
      <li class="rowbox">
        <div class="row-flex1 w60">支付方式</div>
        <div class="ico ico-jt-d"></div>
      </li>
      <?php $_smarty_tpl->tpl_vars['num_paymentlist'] = new Smarty_variable(count($_smarty_tpl->tpl_vars['data_more']->value['paymentlist']), null, 0);?>
      <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['data_more']->value['paymentlist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
      <li>
        <div class="mt-10" id="paymentlist"> <div class="rowbox"><input data-role="none" name="paymentid" type="radio" value="<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
" id="paymentid_<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
" <?php if ($_smarty_tpl->tpl_vars['num_paymentlist']->value==1) {?>checked<?php }?>><label for="paymentid_<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
"><?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
</label></div></div>
      </li>
      <?php } ?>
    </ul>
    <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['okpayType']['coupon']) {?>
    <ul class="jsbox cartCoupons">
      <li class="rowbox cilckItem" style="border:none" data-type="couponMoney">
        <div class="row-flex1 w60">优惠券支付</div>
        <div class="ico ico-jt-d"></div>
      </li>
      <li class="cartCouponList text-center margin-t10 hide">
        <div id="couponList-d" class="endbox color-555 text-left line20 hide mb-10">
            <span class="js_cart_coupons">本次使用</span>
            <span class="b">优惠券：</span> 
            <span class="ccode" id="coupons_code">【】</span>，
            <span>折合</span>
            <span class="color-red b money">$0.00</span> 
            <span class="ml-10">
                <a href="javascript:void(0);" class="color-blue canceluseBtn" data-type="couponMoney">取消使用</a>
            </span>
        </div>
        <div id="couponList" class="startbox mb-10 line30">
        	<?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['data_more']->value['cashcouponlist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
              <div class="checkbox-parent rowbox text-left">
                  <input data-val="<?php echo $_smarty_tpl->tpl_vars['val']->value['cardcode'];?>
" type="checkbox" value="<?php echo $_smarty_tpl->tpl_vars['val']->value['cardcode'];?>
" id="cashcoupon_<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
" class="inputcheckbox" <?php if ($_smarty_tpl->tpl_vars['key']->value==0) {?>checked<?php }?>>
                  <label for="cashcoupon_<?php echo $_smarty_tpl->tpl_vars['val']->value['id'];?>
"><i style="margin:0 10px -6px 0"></i><span class="color-red f18"><?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['val']->value['money'];?>
</span><span class="f12 color-999">现金劵</span></label>
              </div>
            <?php } ?>
            <p class="blank10"></p>
            <div class="rowbox">
            	<div class="row-flex1 cartCoupon-input"><input type="text" id="couponsInput" class="textbox" maxlength="200" placeholder="请输入优惠券号码"></div>
                <div id="cartCoupon-Btn" class="btn btn-s btn-danger cartCoupon-Btn w80" style="margin-left:5px; margin-right:20px; line-height:30px" data-type="couponMoney">
                立刻使用
            </div>
            </div>
            
            <p class="blank10"></p>
            
        </div>
      </li>
    </ul>
    <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['okpayType']['score']) {?>
    <ul class="jsbox cartCoupons">
      <li class="rowbox cilckItem" style="border:none">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_scoremoney'];?>
</div>
        <div class="ico ico-jt-d"></div>
      </li>
      <li class="cartCouponList text-center margin-t10 hide">
        <div class="endbox color-555 text-left hide">
            <span class="js_cart_coupons">本次使用</span>
            <span><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_score'];?>
</span>
            <span class="color-red"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
</span>
            <span class="b ccode color-red" id="pay_score"></span> 
            <span class="exrcode"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span>
            <span class="ml-10">
                <a href="javascript:void(0);" class="color-blue canceluseBtn" data-type="scoreMoney">取消使用</a>
            </span>
        </div>
        <div class="startbox">
            <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['statusscore']==1) {?>
            <div class="rowbox">
                <div class="mr-5" style="line-height:38px">本次使用</div>
                <div class="row-flex1 mb-5">
                    <input fmax="100" class="textbox" type="text" id="scoreInt" value="">
                </div>
                <div class="btn btn-s btn-danger cartCoupon-Btn w80" data-type="scoreMoney" style="height:30px; margin-left:5px; margin-right:20px; line-height:20px">立刻使用</div>
            </div>
            <?php }?>
            <p class="margin-t10 text-left">
                您有
                <span class="b color-black">
                    <span class="currency_exrtitle"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
</span>
                    <span id="totalscore"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['totalscore'];?>
 <span class="f12 color-999"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span></span>
                </span>
                <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['statusscore']==1) {?>
                     , 本次可使用 
                <span class="b color-red">
                    <span class="currency_exrtitle"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
</span>
                    <span id="availscore" data-availscore="<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['availscore'];?>
"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['availscore'];?>
 <span class="f12 color-999"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span></span>
                </span>
                <?php } else { ?>
                	, <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['msgscore'];?>

                <?php }?>
            </p>
        </div>
      </li>
    </ul>
    <?php }?>
    <ul class="jsbox cartCoupons">
      <li class="rowbox cilckItem" style="border:none">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_shmoney'];?>
</div>
        <div class="ico ico-jt-d"></div>
      </li>
      <li class="cartCouponList text-center margin-t10 hide">
        <div class="endbox color-555 text-left hide">
            <span class="js_cart_coupons">本次使用</span>
            <span><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_shmoney'];?>
</span>
            <span class="color-red"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
</span>
            <span class="b ccode color-red" id="pay_shmoney"></span> 
            <span class="exrcode"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span>
            <span class="ml-10">
                <a href="javascript:void(0);" class="color-blue canceluseBtn" data-type="shareMoney">取消使用</a>
            </span>
        </div>
        <div class="startbox">
            <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['statusshmoney']==1) {?>
            <div class="rowbox">
                <div class="mr-5" style="line-height:38px">本次使用</div>
                <div class="row-flex1 mb-5">
                    <input fmax="100" class="textbox" type="text" id="shmoneyInt" value="">
                </div>
                <div id="cartpayment-Btn" class="btn btn-s btn-danger cartCoupon-Btn w80" data-type="shareMoney" style="height:30px; margin-left:5px; margin-right:20px; line-height:30px">
                	立刻使用
            	</div>
            </div>
            <?php }?>
            <p class="margin-t10 text-left">
                您有
                <span class="b color-black">
                    <span class="currency_exrtitle"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
</span>
                    <span id="totalshmoney"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['totalshmoney'];?>
 <span class="f12 color-999"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span></span>
                </span>
                <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['statusshmoney']==1) {?>
                     , 本次可使用 
                <span class="b color-red">
                    <span class="currency_exrtitle"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
</span>
                    <span id="availshmoney" data-availshmoney="<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['availshmoney'];?>
"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['availshmoney'];?>
 <span class="f12 color-999"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span></span>
                </span>
                <?php } else { ?>
                	, <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['msgshmoney'];?>

                <?php }?>
            </p>
        </div>
      </li>
    </ul>
    <ul class="jsbox">
      <li class="rowbox">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_subtotal'];?>
</div>
        <div class="row-flex1 text-right color-red">+ <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['goodstotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</div>
      </li>
      <li class="rowbox">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_shippingtotal'];?>
</div>
        <div class="row-flex1 text-right color-red"><?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['shippingtotal']>0) {?>+ <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['shippingtotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
<?php } else { ?>（包邮）<?php }?></div>
      </li>
      <!--li class="rowbox">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_tax'];?>
</div>
        <div class="row-flex1 text-right color-red">+ <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['taxtotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span></div>
      </li-->
      <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['discounttotal']>0) {?>
      <li class="rowbox">
        <div class="row-flex1 w60">折扣</div>
        <div class="row-flex1 text-right color-red">- <?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['discounttotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</div>
      </li>
      <?php }?>
      <li class="rowbox" style="display:none">
        <div class="row-flex1 w60">优惠券支付</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                -
                <span class="currency_exrtitle"></span>
                <span id="couponMoney" data-couponmoney-int=""></span>
            </span>
        </div>
      </li>
      <li class="rowbox" style="display:none">
        <div class="row-flex1 w60">享金支付</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                -
                <span class="currency_exrtitle"></span>
                <span id="scoreMoney"></span>
            </span>
        </div>
      </li>
      <li class="rowbox" style="display:none">
        <div class="row-flex1 w60">活动优惠</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                -
                <span class="currency_exrtitle"></span>
                <span id="totaldiscount" data-totaldiscount="0.00">¥ 0.00<span class="f12 color-999">CNY</span></span>
            </span>
        </div>
      </li>
      <li class="rowbox" style="display:none">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_shmoney'];?>
</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                -
                <span id="shareMoney"></span>
            </span>
        </div>
      </li>
      <!--试穿押金+穿后补差-->
      <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['istryon']) {?>
      <li class="rowbox" style="display:">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_tryon_money'];?>
</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                
                <span id="shareMoney"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['tryon_topaytotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span>
            </span>
        </div>
      </li>
      <li class="rowbox" style="display:">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_tryon_moneyback'];?>
</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                
                <span id="shareMoney"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['tryon_topaytotal_back'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span>
            </span>
        </div>
      </li>
      <?php }?>
      <!--砍价赏金-->
      <?php if ($_smarty_tpl->tpl_vars['cartinfo']->value['othertotal']>0) {?>
      <li class="rowbox" style="display:">
        <div class="row-flex1 w60"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_othertotal_cut'];?>
</div>
        <div class="row-flex1 text-right color-red">
            <span class="fr color-555">
                +
                <span id="shareMoney"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['othertotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span>
            </span>
        </div>
      </li>
      <?php }?>
    </ul>
  </div>
  <div class="footerbox border-b-none">
  <div class="rowbox btn-buy">
    <div class="row-flex1 text-left">
      <h3 class="line60 pl-10 color-red"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_topaytotal'];?>
：<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrtitle'];?>
<span id="topaytotal" data-topaytotal="<?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['topaytotal_left'];?>
"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['topaytotal_left'];?>
</span>&nbsp;<span class="f12 color-999"><?php echo $_smarty_tpl->tpl_vars['cartinfo']->value['currency_exrcode'];?>
</span></h3>
    </div>
    <div class="btn-pri row-flex1">
      <button data-role="none" type="submit" class="btn-pri-buy">提交订单</button>
    </div>
  </div>
  </div>
</form>
  <div class="blank30"></div>
</div>
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/cart_sub.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>
</html><?php }} ?>
