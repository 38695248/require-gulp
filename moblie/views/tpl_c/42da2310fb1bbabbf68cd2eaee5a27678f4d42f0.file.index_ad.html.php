<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:53:55
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\index_ad.html" */ ?>
<?php /*%%SmartyHeaderCode:6866568f8261450437-09596871%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '42da2310fb1bbabbf68cd2eaee5a27678f4d42f0' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\index_ad.html',
      1 => 1452246758,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '6866568f8261450437-09596871',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82614f83e2_70553363',
  'variables' => 
  array (
    'weixin_first_img' => 0,
    'static_url' => 0,
    'adv' => 0,
    'v' => 0,
    'request_url' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82614f83e2_70553363')) {function content_568f82614f83e2_70553363($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<body id="index_ad" class="bodybox bodyclick">
<div style="height:0; overflow:hidden"> <img id="weixin_first_img" src="<?php echo $_smarty_tpl->tpl_vars['weixin_first_img']->value;?>
" /> </div>
<div id="homepage" class="mainbox">
  <div id="headerbox" class="headerbox">
     <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  <div id="contentbox" class="contentbox">
    <?php echo $_smarty_tpl->getSubTemplate ("inc_ad_topslip.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    <!--
    <div class="custom_box">
    	<ul class="rowbox">
        	<li>
            	<a href="/ask/toask.html"><img src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/q_custom_btn.png" /></a>
            </li>
            <li class="w10 h_line"></li>
            <li>
            	<a href="javascript:void(0);" class="add-share"><img src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/f_share_btn.png" /></a>
            </li>
        </ul>
    </div>
    -->
    <?php if ($_smarty_tpl->tpl_vars['adv']->value['top_pic_big']) {?>
    <div class="blank10"></div>
    <ul class="top_pic_big">
    	<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['adv']->value['top_pic_big']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
            <li><a href="<?php echo $_smarty_tpl->tpl_vars['v']->value['link'];?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['src'];?>
" /></a></li>
        <?php } ?>
    </ul>
    <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['adv']->value['top_pic_small']) {?>
    <ul class="top_pic_small">
    	<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['adv']->value['top_pic_small']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
            <li><a href="<?php echo $_smarty_tpl->tpl_vars['v']->value['link'];?>
"><img class="lazy" src="<?php echo $_smarty_tpl->tpl_vars['v']->value['src'];?>
" /></a></li>
        <?php } ?>
    </ul>
    <?php }?>
    <div class="banner_box_m">
    	<?php echo $_smarty_tpl->tpl_vars['adv']->value['middle_txt_adv'][0]['text_val'];?>

    </div>   
    <?php if ($_smarty_tpl->tpl_vars['adv']->value['bottom_pic']) {?>
    <div class="bottom_pic">
    	<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['adv']->value['bottom_pic']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
   			<a href="<?php echo $_smarty_tpl->tpl_vars['v']->value['link'];?>
" class="mt-10 block"><img class="lazy" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/pixel.gif" data-original="<?php echo $_smarty_tpl->tpl_vars['v']->value['src'];?>
"/></a>
    	<?php } ?>
    </div>
    <?php }?>
    <div class="combox">
      <div id="choose_dh" class="masonry_dh">
      	<ul class="rowbox text-center f16">
        	<li class="dhpjax current" data-url="/index/index_ad.html?type=new&orders=new">每日新品</li>
            <li class="line">|</li>
            <li class="dhpjax" data-url="/index/index_ad.html?type=hot&orders=hot">人气热销</li>
            <li class="line">|</li>
            <li class="dhpjax" data-url="/index/index_ad.html?type=low_price&orders=price_asc">特价优惠</li>
        </ul>
      </div>
      <div id="masonry_2" class="masonry larger-view">
      	<?php echo $_smarty_tpl->getSubTemplate ("inc_share_item.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

      </div>
    </div>
    <div class="pager" style="display: none;"> 
    	<span class="pager-next"><a href="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
"></a></span> 
    </div>
  </div>
  <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 
</div>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/index" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
</body>
</html><?php }} ?>
