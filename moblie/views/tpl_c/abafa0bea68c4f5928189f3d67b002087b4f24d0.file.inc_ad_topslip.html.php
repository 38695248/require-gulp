<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:33:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\inc_ad_topslip.html" */ ?>
<?php /*%%SmartyHeaderCode:19238568f82560daf12-35572812%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'abafa0bea68c4f5928189f3d67b002087b4f24d0' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\inc_ad_topslip.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '19238568f82560daf12-35572812',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'adv' => 0,
    'v' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82560f2627_56615336',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82560f2627_56615336')) {function content_568f82560f2627_56615336($_smarty_tpl) {?><!--广告之滑动式-->
<?php if ($_smarty_tpl->tpl_vars['adv']->value['top_pic_adv']) {?>
<div id="swiper-container-ad" class="swiper-container">
  <div class="swiper-wrapper">
  	<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['adv']->value['top_pic_adv']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
   		<div class="swiper-slide"><a href="<?php echo $_smarty_tpl->tpl_vars['v']->value['link'];?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['src'];?>
"></a></div>
    <?php } ?>
  </div>
  <div class="swiper-pagination-bg"></div>
  <div class="swiper-pagination swiper-pagination-ad"></div>
</div>
<?php }?>
<?php }} ?>
