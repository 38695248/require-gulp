<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 11:12:18
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\header_my.html" */ ?>
<?php /*%%SmartyHeaderCode:1873956907a92e48503-65229859%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b6d80a881cf325227931927c2409d9e5cbe8fabf' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\header_my.html',
      1 => 1452245275,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1873956907a92e48503-65229859',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'static_url' => 0,
    'header' => 0,
    'isme' => 0,
    'rownums' => 0,
    'mod' => 0,
    'bar' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907a92eb1c98_85127560',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907a92eb1c98_85127560')) {function content_56907a92eb1c98_85127560($_smarty_tpl) {?><div class="userbox-head">
			<div class="figure_bg useravatar_bg">
  				<img src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/images/def.jpg"  data-original="<?php echo $_smarty_tpl->tpl_vars['header']->value['figure'][1];?>
" class="avatar_lazy" />
  			</div>
            <div class="user-dh-bg"></div>
        	<div class="rowbox rel">
            	<div class="row-flex1 text-right gn-ico" style="width:50%">
                	<?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>
                    <a href="/message/msglist">
					<span class="fr rel gn-btn" data-username="<?php echo $_smarty_tpl->tpl_vars['header']->value['name'];?>
" data-uid="<?php echo $_smarty_tpl->tpl_vars['header']->value['suid'];?>
">
                    	<span class="ico ico-sx"></span>
                        <span class="numbox"><?php echo $_smarty_tpl->tpl_vars['header']->value['msgnum'];?>
</span>
                    </span>
                    
                    </a>
                    <?php } else { ?>
                    <a href="/message/msgbox.html?tosuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['suid'];?>
">
                    <span class="fr gn-btn chatBtn" data-username="<?php echo $_smarty_tpl->tpl_vars['header']->value['name'];?>
" data-uid="<?php echo $_smarty_tpl->tpl_vars['header']->value['suid'];?>
">
                    	<span class="ico ico-sx"></span>
                    </span>
                    </a>
                    <?php }?>
                </div>
            	<div class="useravatar useravatar_bg">
                <img  src="<?php echo $_smarty_tpl->tpl_vars['header']->value['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['header']->value['avatar'][1];?>
" class="avatar_lazy">	
                </div>
                <div class="row-flex1 text-left gn-ico" style="width:50%">
                    <?php if ($_smarty_tpl->tpl_vars['isme']->value) {?>
                    <span class="gn-btn" id="editProfile">
                    	<span class="ico ico-edit" data-follow="0"></span>
                    </span>
                    <?php } else { ?>
                    	<?php if ($_smarty_tpl->tpl_vars['header']->value['isfollow']==1) {?>
                        <span class="gn-btn followBtn current" data-ishome="1" data-fsuid="<?php echo $_smarty_tpl->tpl_vars['header']->value['suid'];?>
" data-type="person" data-follow="1">
                            <span class="ico ico-gz"></span>
                        </span>
                        <?php } else { ?>
                        <span class="gn-btn followBtn" data-ishome="1" data-fsuid="<?php echo $_smarty_tpl->tpl_vars['header']->value['suid'];?>
" data-type="person" data-follow="0">
                            <span class="ico ico-gz"></span>
                        </span>
                        <?php }?>
                    <?php }?>
                </div>
            </div>
            <p class="text-center line36 color-fff f21 rel"><?php echo $_smarty_tpl->tpl_vars['header']->value['name'];?>
</p>
            <p class="text-center line20 color-fff user-aboutme rel"><?php echo $_smarty_tpl->tpl_vars['header']->value['aboutme'];?>
</p>
            <p class="blank10"></p>
            <ul class="rowbox user-dh">
            	<li>
                	<a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
">
                	<p class="b f21"><?php echo $_smarty_tpl->tpl_vars['rownums']->value['shares'];?>
</p>
                    <p>分享</p>
                    </a>
                </li>
            	<li class="li-line-l <?php if ($_smarty_tpl->tpl_vars['mod']->value=='my_like') {?>current<?php }?>">
                	<a href="/share/my_like.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
">
                	<p class="b f21 "><?php echo $_smarty_tpl->tpl_vars['rownums']->value['like'];?>
</p>
                    <p>赞过</p>
                    </a>
                </li>
                <li class="li-line-l <?php if ($_smarty_tpl->tpl_vars['mod']->value=='myfollows') {?>current<?php }?>">
                	<a href="/share/myfollows.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
">
                	<p class="b f21"><?php echo $_smarty_tpl->tpl_vars['rownums']->value['followers'];?>
</p>
                    <p>粉丝</p>
                    </a>
                </li>
                <li class="li-line-l <?php if ($_smarty_tpl->tpl_vars['mod']->value=='myfollowing') {?>current<?php }?>">
                	<a href="/share/myfollowing.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
">
                	<p class="b f21"><?php echo $_smarty_tpl->tpl_vars['rownums']->value['following'];?>
</p>
                    <p>关注</p>
                    </a>
                </li>
            </ul>
            <div class="blank15"></div>
        </div>
        <?php if ($_smarty_tpl->tpl_vars['mod']->value=='myshares') {?>
		<div class="userbox-cont">
		    <ul class="rowbox user-c-dh h3_title">
		        <li class="<?php if ($_smarty_tpl->tpl_vars['bar']->value['header']=='myshare') {?> current<?php }?>"><a href="/share/myshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
"><?php echo $_smarty_tpl->tpl_vars['header']->value['user_title'];?>
的分享</a></li>
		        <li class="<?php if ($_smarty_tpl->tpl_vars['bar']->value['header']=='mygoods') {?> current<?php }?>"><a href="/b_goods/mygdshares.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
"><?php echo $_smarty_tpl->tpl_vars['header']->value['user_title'];?>
的设计</a></li>
		        <!--li class="<?php if ($_smarty_tpl->tpl_vars['bar']->value['header']=='mycat') {?> current<?php }?>"><a href="/user_group/myusergroups.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['header']->value['fsuid'];?>
"><?php echo $_smarty_tpl->tpl_vars['header']->value['user_title'];?>
的明星群</a></li-->
		    </ul>
		</div>
		<?php }?><?php }} ?>
