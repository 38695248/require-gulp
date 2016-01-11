<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:33:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\inc_share_item.html" */ ?>
<?php /*%%SmartyHeaderCode:17255568f8256102020-02691430%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e6be05953a98e77d2904ad11f8fac18af73474ee' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\inc_share_item.html',
      1 => 1452245276,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '17255568f8256102020-02691430',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'datalist' => 0,
    'pagehtml' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f825612cfa7_71128946',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f825612cfa7_71128946')) {function content_568f825612cfa7_71128946($_smarty_tpl) {?><div class="leftbox" style="float:left; width:50%">
<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['datalist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['v']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['v']->index++;
?>
  <?php if ($_smarty_tpl->tpl_vars['v']->index%2==0) {?>
		<?php echo $_smarty_tpl->getSubTemplate ("inc_share_item_son.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

   <?php }?>
<?php } ?>
</div>
<div class="rightbox" style="float:left; width:50%">
<?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['datalist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['v']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
 $_smarty_tpl->tpl_vars['v']->index++;
?>
  <?php if ($_smarty_tpl->tpl_vars['v']->index%2==1) {?>
		<?php echo $_smarty_tpl->getSubTemplate ("inc_share_item_son.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

   <?php }?>
<?php } ?>
</div>
<div class="hide"><?php echo $_smarty_tpl->tpl_vars['pagehtml']->value;?>
</div><?php }} ?>
