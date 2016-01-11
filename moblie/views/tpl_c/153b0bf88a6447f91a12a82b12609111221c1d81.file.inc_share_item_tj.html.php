<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:55:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\inc_share_item_tj.html" */ ?>
<?php /*%%SmartyHeaderCode:29300568f877e48fe89-91395990%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '153b0bf88a6447f91a12a82b12609111221c1d81' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\inc_share_item_tj.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '29300568f877e48fe89-91395990',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'datalist' => 0,
    'v' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f877e4da217_32020406',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f877e4da217_32020406')) {function content_568f877e4da217_32020406($_smarty_tpl) {?><?php  $_smarty_tpl->tpl_vars['v'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['v']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['datalist']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value) {
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
<dd>
    <p class="img_box">
        <a data-img="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['s_0'];?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
" href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['v']->value['gdid'];?>
&ukey=<?php echo ukey(1);?>
">
    		<img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['m'];?>
" alt="<?php echo $_smarty_tpl->tpl_vars['v']->value['description'];?>
" />
        </a>
    </p>
    <p class="color-333 p-title"><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
</p>
    <p class="p-price"><?php echo $_smarty_tpl->tpl_vars['v']->value['good']['exrtitle'];?>
 <?php echo $_smarty_tpl->tpl_vars['v']->value['good']['priv_price'];?>
</p>
</dd>
<?php } ?><?php }} ?>
