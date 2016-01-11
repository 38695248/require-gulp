<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:18:31
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\myorder_payorder.html" */ ?>
<?php /*%%SmartyHeaderCode:2065756907c07e405a1-37650189%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '689825b5dd3e8f363235c35c35a7f0ee95b19fcc' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\myorder_payorder.html',
      1 => 1452245277,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2065756907c07e405a1-37650189',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'lang' => 0,
    'orderid' => 0,
    'currency' => 0,
    'orderinfo' => 0,
    'static_url' => 0,
    'payhtml' => 0,
    'isformsubmit' => 0,
    'payment_inf' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907c07ec1439_19309116',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907c07ec1439_19309116')) {function content_56907c07ec1439_19309116($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">
<div class="mainbox" id="fxpage_user" data-role="page">

  <div id="headerbox" class="headerbox">
    <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  
  
  <div class="contentbox" data-role="content">
	<ul class="jsbox">
    	<li class="rowbox">
        	<?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_myorder_payorder_beenorder'];?>

        </li>
        <li class="rowbox">
        	<div class="row-flex1">支付单号</div>
            <div class="text-right color-red"><a href="/mybuys/myorder.html?orderfid=<?php echo $_smarty_tpl->tpl_vars['orderid']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['orderid']->value;?>
【查看】</a></div>
        </li>
        <li class="rowbox">
        	<div class="row-flex1"><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_order_topaytotal'];?>
</div>
            <div class="text-right color-red"><?php echo $_smarty_tpl->tpl_vars['currency']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['orderinfo']->value['topaytotal'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['currency']->value['exrcode'];?>
</div>
        </li>
        <li class="text-center">
        	<div class="mb-10">
            	<?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_myorder_payorder_loadding'];?>

            	<img style="width:100px; margin:0 auto;" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/default/images/payloading.gif" />
            </div>
            <div>
            	<?php echo $_smarty_tpl->tpl_vars['payhtml']->value;?>

            </div>
            
            <div class="line24 mb-10">
            	<?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_myorder_payorder_msg'];?>

            </div>
           <div class="text-center mb-10">
            <?php if ($_smarty_tpl->tpl_vars['isformsubmit']->value) {?>
            	<a href="javascript:void(0);" onClick="document.getElementById('frm_payment_now').submit();">
                	<img src="<?php echo $_smarty_tpl->tpl_vars['payment_inf']->value['btt_img'];?>
" class="w150" style="margin:0 auto" />
                </a>
            <?php } elseif ($_smarty_tpl->tpl_vars['payment_inf']->value['paymentid']=='wxh5') {?>
                <a href="javascript:void(0);" onClick="callpay()">
                    <img src="<?php echo $_smarty_tpl->tpl_vars['payment_inf']->value['btt_img'];?>
" class="w50" style="margin:0 auto">
                </a>
            <?php }?>
           </div>
            
        </li>
    </ul>
</div>
   <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 </div>
  
</div>  
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/cart_pay.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>

</html><?php }} ?>
