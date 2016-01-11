<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:33:10
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\inc_share_item_son.html" */ ?>
<?php /*%%SmartyHeaderCode:17684568f825613c9b3-37063570%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '618bcaf865227ca5e633f3c0dd4e6ad03dafd1ee' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\inc_share_item_son.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '17684568f825613c9b3-37063570',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'v' => 0,
    'request_url' => 0,
    'static_url' => 0,
    'identify' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f8256280d76_39333570',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f8256280d76_39333570')) {function content_568f8256280d76_39333570($_smarty_tpl) {?><div class="item rowitem byshid" data-shid="<?php echo $_smarty_tpl->tpl_vars['v']->value['shid'];?>
" data-ishid="<?php echo $_smarty_tpl->tpl_vars['v']->value['ishid'];?>
" data-page="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
">
  <div class="item-in">
      <?php if (($_smarty_tpl->tpl_vars['v']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['v']->value['good']['status']==1)) {?>
  	  <div class="icons-group">
        <?php if (($_smarty_tpl->tpl_vars['v']->value['good']['priv_price']>50)&&($_smarty_tpl->tpl_vars['v']->value['good']['activity_bsh']==2)) {?>
        <div class="fl mr-5 w35"><img src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/ico/1111.png?v=4" /></div>
        <?php }?>
        <div class="fl mr-5 w35 hide"><img src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/ico/5555.png?v=4" /></div>
      </div>
      <?php }?>
      <div class="rowitem-c rel rowitemTag" data-width="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['width'];?>
"> 
        <?php if (($_smarty_tpl->tpl_vars['v']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['v']->value['good']['status']==1)) {?>
          <a class="pjax" data-img="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['s_0'];?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
" href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['v']->value['gdid'];?>
&ukey=<?php echo ukey(1);?>
">
        <?php } else { ?>
          <a class="pjax" data-img="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['s_0'];?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
" href="/share/sharepage.html?shid=<?php echo $_smarty_tpl->tpl_vars['v']->value['shid'];?>
&ukey=<?php echo ukey(1);?>
">
        <?php }?>
        <img class="lazy-mas" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/pixel.gif" data-original="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['m'];?>
" alt="<?php echo $_smarty_tpl->tpl_vars['v']->value['description'];?>
" />
        </a>
      </div>
      <div class="rowitem-b">
      	<?php if (($_smarty_tpl->tpl_vars['v']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['v']->value['good']['status']==1)) {?>
      	<a class="pjax" data-img="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['s_0'];?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
" href="/share/sharepage.html?gdid=<?php echo $_smarty_tpl->tpl_vars['v']->value['gdid'];?>
&ukey=<?php echo ukey(1);?>
">
        <?php } else { ?>
        <a class="pjax" data-img="<?php echo $_smarty_tpl->tpl_vars['v']->value['imgs'][0]['s_0'];?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
" href="/share/sharepage.html?shid=<?php echo $_smarty_tpl->tpl_vars['v']->value['shid'];?>
&ukey=<?php echo ukey(1);?>
">
        <?php }?>
        <p class="color-333 p-title"><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['description_cut'], ENT_QUOTES, 'UTF-8', true);?>
</p>
        <p class="p-price">
            <?php if (($_smarty_tpl->tpl_vars['v']->value['gdid']>0)&&($_smarty_tpl->tpl_vars['v']->value['good']['status']==1)) {?>
            <?php echo $_smarty_tpl->tpl_vars['v']->value['good']['exrtitle'];?>
 <?php echo $_smarty_tpl->tpl_vars['v']->value['good']['priv_price'];?>
 
            <?php if ($_smarty_tpl->tpl_vars['v']->value['good']['priv_price_ini']>0) {?><span class="f12 color-999 market"><?php echo $_smarty_tpl->tpl_vars['v']->value['good']['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['v']->value['good']['priv_price_ini'];?>
</span><?php }?>
            <?php if ($_smarty_tpl->tpl_vars['v']->value['good']['priv_price_rate']>0&&$_smarty_tpl->tpl_vars['v']->value['good']['priv_price_rate']<10) {?><span class="f12 ml-5 bg-f13e3a market-zhe"><?php echo $_smarty_tpl->tpl_vars['v']->value['good']['priv_price_rate'];?>
折</span><?php }?>
            <?php }?>
            <?php if ($_smarty_tpl->tpl_vars['v']->value['good']['activity_bsh']==4) {?>
            <span class="f12 ml-5 bg-fc9b00 market-zhe">返<?php echo $_smarty_tpl->tpl_vars['v']->value['good']['exrtitle'];?>
<?php echo $_smarty_tpl->tpl_vars['v']->value['good']['money_act'];?>
</span>
            <?php }?>
            
            <?php if ($_smarty_tpl->tpl_vars['v']->value['good']['activity_bsh']==5) {?>
            <span class="f12 ml-5 bg-00a0e8 market-zhe">0元试穿</span>
            <?php }?>
      	</p>
        </a>
        <a class="user_div rowbox" href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['v']->value['user']['suid'];?>
">
          <div class="avatar w30 mr-5"> 
          	<img src="<?php echo $_smarty_tpl->tpl_vars['v']->value['user']['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['v']->value['user']['avatar'][1];?>
" class="lazy-mas userThumb" alt="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>
" title="More from <?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>
"/>
          </div>
           <div class="row-flex1 avatar-text">
              <h2><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['v']->value['user']['uname'], ENT_QUOTES, 'UTF-8', true);?>

             <?php  $_smarty_tpl->tpl_vars['identify'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['identify']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['v']->value['user']['identify_info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['identify']->key => $_smarty_tpl->tpl_vars['identify']->value) {
$_smarty_tpl->tpl_vars['identify']->_loop = true;
?>
               <span class="ico ico-vip" title="<?php echo $_smarty_tpl->tpl_vars['identify']->value['name'];?>
"></span>
               <span class="f12 color-gray" title="<?php echo $_smarty_tpl->tpl_vars['identify']->value['name'];?>
"><?php echo $_smarty_tpl->tpl_vars['identify']->value['name'];?>
</span>
             <?php } ?> 
            </h2>
            <p>
             <span class="x_view"></span><?php echo $_smarty_tpl->tpl_vars['v']->value['count']['pv'];?>

            </p>
            </div>
        </a> 
      </div>
  </div>
</div><?php }} ?>
