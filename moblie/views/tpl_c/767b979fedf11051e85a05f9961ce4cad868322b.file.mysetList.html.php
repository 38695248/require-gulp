<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 10:35:22
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\mysetList.html" */ ?>
<?php /*%%SmartyHeaderCode:12035568f82da093385-84408141%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '767b979fedf11051e85a05f9961ce4cad868322b' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\mysetList.html',
      1 => 1452245277,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '12035568f82da093385-84408141',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'data' => 0,
    'suid' => 0,
    'static_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82da0d1b93_65128834',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82da0d1b93_65128834')) {function content_568f82da0d1b93_65128834($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">

<div id="my_setlist" data-role="page" class="mainbox my_setlist">
    <div id="headerbox" class="headerbox">
        <?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    </div>
  
	<div class="contentbox settings" data-role="content">
      <ul class="jsbox">
        <li>
          <a class="rowbox" href="/user/setting.html">
          <div class="mr-10" style="padding:8px 0">
              <div class="useravatar_set">
                <img src="<?php echo $_smarty_tpl->tpl_vars['data']->value['avatar'][2];?>
" data-original="<?php echo $_smarty_tpl->tpl_vars['data']->value['avatar'][1];?>
" class="avatar_lazy">
              </div>
          </div>
          <div class="row-flex1 mt-10">
          	<h3 class="line20 color-black"><?php echo $_smarty_tpl->tpl_vars['data']->value['fname'];?>
<?php echo $_smarty_tpl->tpl_vars['data']->value['lname'];?>
</h3>
            <p class="f12 color-999 line20">登录账号：<?php echo $_smarty_tpl->tpl_vars['data']->value['account'];?>
</p>
          </div>
          <div class="ico ico-jt mt-10"></div>
          </a>
        </li>
      </ul>
      <ul class="jsbox">
        <li>
          <a href="/message/msglist" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-infocenter mr-5"></span>消息中心
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
      </ul>
      <ul class="jsbox">
      	<li>
          <a href="/share/myshares.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-myhome mr-5"></span>我的主页
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/user_group/my.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico my-xq mr-5"></span>我的明星群
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
       </ul>
       <ul class="jsbox">
        <li>
          <a href="/mybuys/myorders.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-myorder mr-5"></span>我的订单
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/mybuys/aftersales.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-myorder mr-5"></span>售后中心
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/ask/myasks.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-myorder mr-5"></span>我求定制
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/m_raise/goodsraise_my.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-myorder mr-5"></span>超级筹
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/m_cut/goodscut_my.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mypurse mr-5"></span>超级砍
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/mk_market/feeback_my.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mypurse mr-5"></span>超级返
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        </ul>
        
        <ul class="jsbox">
        <li>
          <a href="/mk_market/index.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-bole mr-5"></span>大伯乐
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/mk_market/red_packet.html?fsuid=<?php echo $_smarty_tpl->tpl_vars['suid']->value;?>
" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mypurse mr-5"></span>抢红包
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/mybuys/mysharemoney.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mypurse mr-5"></span>现金
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/mybuys/myscore.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mypurse mr-5"></span>享金
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
        <li>
          <a href="/mybuys/mycoupons.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mypurse mr-5"></span>卡券
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
      </ul>
      <ul class="jsbox">
        <li>
          <a href="/identify.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-rzcenter mr-5"></span>认证
          </div>
          <div class="ico ico-jt"></div>
          </a>
        </li>
      </ul>
      <ul class="jsbox">
        <li>
        <a href="/user/setting.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-mysetting mr-5"></span>设置
          </div>
          <div class="ico ico-jt"></div>
        </a>
        </li>
      </ul>
      <?php if (getsession('is_third_login')&&getsession('account_type')!=2) {?>
      <ul class="jsbox">
        <li>
        <a href="/user/bang_cellphone.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-out mr-5"></span>绑定登陆手机
          </div>
          <div class="ico ico-jt"></div>
        </a>
        </li>
      </ul>
      <?php }?>
      <ul class="jsbox">
        <li>
        <a href="/user/logout.html" class="rowbox">
          <div class="row-flex1">
              <span class="ico ico-out mr-5"></span>切换登陆账号
          </div>
        </a>
        </li>
      </ul>
  </div>
    <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
 </div>
</div>

<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/myShare_mysetlist.js?v=77" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>

</html><?php }} ?>
