<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:15:49
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\mybuys_myorders.html" */ ?>
<?php /*%%SmartyHeaderCode:1415856907b65bff113-88779374%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '31508ea042e00ea501062fd70baa0f112e226fe3' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\mybuys_myorders.html',
      1 => 1452245273,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1415856907b65bff113-88779374',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'orderlist' => 0,
    'val' => 0,
    'lang' => 0,
    'val2' => 0,
    'pagehtml' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907b65d04cd0_54696960',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907b65d04cd0_54696960')) {function content_56907b65d04cd0_54696960($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">
<div class="mainbox" id="fxpage_user" data-role="page">
    <div id="headerbox" class="headerbox">
     <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  
  <div class="contentbox" data-role="content">
  <div id="masonry" class="masonry">
  <?php  $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false;
 $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['orderlist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true;
 $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['val']->key;
?>
    <ul class="jsbox item rowitem">
      <li class="h3_title">
      	<a class="rowbox" href="/mybuys/myorder.html?orderfid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderfid'];?>
&orderid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
">
      	<div class="row-flex1 w60 color-red"><?php echo $_smarty_tpl->tpl_vars['val']->value['status_txt'];?>
</div>
        <div class="row-flex1 text-right">
        <?php if ($_smarty_tpl->tpl_vars['val']->value['status_pay']==1) {?>支付单号：<?php echo $_smarty_tpl->tpl_vars['val']->value['orderfid'];?>
<?php } else { ?><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_orderno'];?>
：<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
<?php }?>
        </div>
        <!--div class="ico ico-delete ml-10"></div-->
        </a>
      </li>
      
      <?php  $_smarty_tpl->tpl_vars['val2'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val2']->_loop = false;
 $_smarty_tpl->tpl_vars['key2'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['val']->value['goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val2']->key => $_smarty_tpl->tpl_vars['val2']->value) {
$_smarty_tpl->tpl_vars['val2']->_loop = true;
 $_smarty_tpl->tpl_vars['key2']->value = $_smarty_tpl->tpl_vars['val2']->key;
?>
      
      <li class="orderinfo">
      	<a class="rowbox" href="/mybuys/myorder.html?orderfid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderfid'];?>
&orderid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
">
      	<div class="cartimg w70 mr-10">
            <img src="<?php echo $_smarty_tpl->tpl_vars['val2']->value['img'];?>
" />
        </div>
        <div class="cartinfo row-flex1">
            <h3 class="color-333">
                <?php if ($_smarty_tpl->tpl_vars['val2']->value['tuanid']>0) {?><span class="order_type">团</span><?php }?>
                <?php echo $_smarty_tpl->tpl_vars['val2']->value['gdname'];?>

            </h3>
            <div class="color-777">
              <span><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_color'];?>
：</span><span class="color-333 mr-10"><?php echo $_smarty_tpl->tpl_vars['val2']->value['color'][1];?>
<?php if ($_smarty_tpl->tpl_vars['val2']->value['color'][2]) {?>（<?php echo $_smarty_tpl->tpl_vars['val2']->value['color'][2];?>
）<?php }?></span>
              <span><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_size'];?>
：</span><span class="color-333"><?php echo $_smarty_tpl->tpl_vars['val2']->value['size'][1];?>
<?php if ($_smarty_tpl->tpl_vars['val2']->value['size'][2]) {?>（<?php echo $_smarty_tpl->tpl_vars['val2']->value['size'][2];?>
）<?php }?></span>
            </div>
            <div class="color-777">
              <span class="mr-10">X <?php echo $_smarty_tpl->tpl_vars['val2']->value['num'];?>
</span>
              <span class="mr-10"><?php echo $_smarty_tpl->tpl_vars['val2']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['val2']->value['price'];?>
&nbsp;<?php echo $_smarty_tpl->tpl_vars['val2']->value['exrcode'];?>
</span>
            </div>
        </div>
        </a>
      </li>
      
      <?php } ?>
      <li class="rowbox ">
      	<div class="row-flex1 f18 color-333">
        	<?php echo $_smarty_tpl->tpl_vars['val']->value['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['val']->value['ordertotal'];?>
&nbsp;<span class="f12 color-777"><?php echo $_smarty_tpl->tpl_vars['val']->value['exrcode'];?>
</span>
        </div>
        <!--订单操作-->
        <div class="row-flex2 text-right">
        <?php  $_smarty_tpl->tpl_vars['val2'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val2']->_loop = false;
 $_smarty_tpl->tpl_vars['key2'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['val']->value['useract']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['val2']->key => $_smarty_tpl->tpl_vars['val2']->value) {
$_smarty_tpl->tpl_vars['val2']->_loop = true;
 $_smarty_tpl->tpl_vars['key2']->value = $_smarty_tpl->tpl_vars['val2']->key;
?>
        <?php if ($_smarty_tpl->tpl_vars['val2']->value['act']=='topay') {?>
        	<a href="/myorder/paymentlist.html?orderid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
"><span class="spanbtn"><?php echo $_smarty_tpl->tpl_vars['val2']->value['title'];?>
</span></a>
        <?php } elseif ($_smarty_tpl->tpl_vars['val2']->value['act']=='topay_tryon') {?><!--支付穿后补差-->
        <a href="/m_tryon/topay.html?orderid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
"><span class="spanbtn"><?php echo $_smarty_tpl->tpl_vars['val2']->value['title'];?>
</span></a>
        <?php } elseif ($_smarty_tpl->tpl_vars['val2']->value['act']=='shouhou') {?>
            <a href="/mybuys/myorder.html?orderid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
&orderfid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderfid'];?>
#goodslist"><span class="spanbtn"><?php echo $_smarty_tpl->tpl_vars['val2']->value['title'];?>
</span></a>
        <?php } elseif ($_smarty_tpl->tpl_vars['val2']->value['act']=='shippingstep') {?>
            <a href="/mybuys/shipping_step.html?orderid=<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
"><span class="spanbtn"><?php echo $_smarty_tpl->tpl_vars['val2']->value['title'];?>
</span></a>
        <?php } else { ?>
            <span class="spanbtn order-act-btn" data-ch="order" data-act="<?php echo $_smarty_tpl->tpl_vars['val2']->value['act'];?>
" data-orderid="<?php echo $_smarty_tpl->tpl_vars['val']->value['orderid'];?>
" data-orderfid="<?php echo $_smarty_tpl->tpl_vars['val']->value['orderfid'];?>
"><?php echo $_smarty_tpl->tpl_vars['val2']->value['title'];?>
</span>
        <?php }?>
        <?php } ?>
      </li>
    </ul>
    <?php } ?>

    </div>
    <div class="pager">
       <span class="pager-next"><a href="/mybuys/myorders.html?page=1"></a></span>
    </div>
  </div>
  
  <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</div>
  <div style="display:none"><?php echo $_smarty_tpl->tpl_vars['pagehtml']->value;?>
</div>
</div>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<?php echo $_smarty_tpl->getSubTemplate ("footer_myshare.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script type="text/javascript">
$(function(){
	MyShare.myShareInit({order:1,flag:0});	
	
	//订单操作
	
	
})
</script>
</body>

</html>
<?php }} ?>
