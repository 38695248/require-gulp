<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 10:49:18
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\myorder_mycart.html" */ ?>
<?php /*%%SmartyHeaderCode:7808568f861e070245-90625327%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ffe58f61179ef1bb97dbd251e62904dce3f11efb' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\myorder_mycart.html',
      1 => 1452245273,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '7808568f861e070245-90625327',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'spm' => 0,
    'lang' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f861e0a2ed7_41779111',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f861e0a2ed7_41779111')) {function content_568f861e0a2ed7_41779111($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">
<!--购物车第一步：商品选择-->
<div class="mainbox" id="cartpage_one" data-role="page">
  <div id="headerbox" class="headerbox">
    <div class="rowbox searchbox">
    	<div class="top_l">
            <a href="javascript:void(0);" class="back-btn">
                <span class="b_ico ico-back-h"></span>
            </a>
        </div>
        <div class="row-flex1 text-center h2_title">
        	购物车
        </div>
    </div>
  </div>
  <form id="cartBoxForm" method="post" data-spm='<?php echo $_smarty_tpl->tpl_vars['spm']->value;?>
'>
  <div class="contentbox" data-role="content">
  	<div id="cartBonIn">
        <div id="goodslist" class="goodslist">
        </div>
    </div>
    <div id="cart-empty" class="text-center line26" style="padding-top:50px">
    	<p><span class="cart-empty-pic"></span></p>
    	<p><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_mybuys_myorder_cart_nogoods'];?>
</p>
        <p><?php echo $_smarty_tpl->tpl_vars['lang']->value['buy_mybuys_myorder_cart_choosegoods'];?>
</p>
        <p class="blank20"></p>
        <p class="text-center"><a href="/m_buy/index.html" class="inlineblock btn btn-red w100">去逛逛</a></p>
    </div>
  </div>
  <div id="carfooter" class="footerbox carfooter" style="padding-top:0">
    <div class="rowbox btn-buy">
    	<div class="text-left btn-fans allselect row-flex1" style="padding-right:5px">
        	<span class="">
                <input id="allselect" class="inputcheckbox" type="checkbox" value="1">
                <label for="allselect" class="label_g text-left f16"><i style="margin-bottom:-6px;" class="mr-5"></i>全选</label>
            </span>
            <span class="ml-10">合计：<span id="goodstotal">￥00.00</span></span>
        </div>
        <div class="row-flex1 btn-pri btn-cartNext">
        	<a href="javascript:void(0);">去结算<span id="js_num" style="font-size:12px">(0)</span></a>
        </div>
    </div>
  </div>
  </form>
  <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</div>
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/cart.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>

</html><?php }} ?>
