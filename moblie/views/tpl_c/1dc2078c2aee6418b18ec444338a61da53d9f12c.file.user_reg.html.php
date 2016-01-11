<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 10:32:52
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\user_reg.html" */ ?>
<?php /*%%SmartyHeaderCode:15636568f8244544697-90225535%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1dc2078c2aee6418b18ec444338a61da53d9f12c' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\user_reg.html',
      1 => 1452245276,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '15636568f8244544697-90225535',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'v_css_js' => 0,
    'lang' => 0,
    'isweixin' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f82445d8db4_96695975',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f82445d8db4_96695975')) {function content_568f82445d8db4_96695975($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<style type="text/css?v=<?php echo $_smarty_tpl->tpl_vars['v_css_js']->value;?>
">
html,body{ height:100%;padding-top:0; background:#000}
</style>
<body>

<!--注册第一步-->
<div id="regbox" class="loginbox" data-index="0">
	<div class="tipbox-in login_bg">
        <a href="/index/index.html?useract=view">
           <button data-role="none" type="button" class="btn-border btn rounded login-btn b">
           <?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_login_go_to_view'];?>

           </button>
        </a>
    	<button data-role="none" type="button" id="forgotPwd" class="btn-border btn rounded login-btn b" style="display:none">
           <?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_login_forget'];?>

        </button>
    	<h1 class="text-center" style="padding-top:10px">
            <span class="ico ico-homeLogo"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_byshare'];?>
</span>
        </h1>
        <div id="regFirst" class="tipcont login-in text-center">
            <div class="blank5"></div>
        	<h2 class="color-fff line40"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_dream'];?>
</h2>
            <p class="stit color-fff"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_dream_en'];?>
 <?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_join'];?>
</p>
            <div class="sns-box" style="border:none; padding:15px 0">
            	<div style="display:none">
                    <button data-role="none" class="regfacebook" data-backend="Facebook" next="/">
                        <em class="snsico ico-reg-facebook"></em>
                    </button>
                    <button data-role="none" class="reggoogle" data-backend="Google" next="/">
                        <em class="snsico ico-reg-google"></em>
                    </button>
                    <button data-role="none" class="regtwitter" data-backend="Twitter" next="/">
                        <em class="snsico ico-reg-twitter"></em>
                    </button>
                </div>
                <div>
                    <a href="https://api.weibo.com/oauth2/authorize?client_id=3171756207&redirect_uri=http%3A%2F%2Fwww.byshare.com%2Foauth%2Fweibo%2Fcallback.php&response_type=code">
                    <button data-role="none" class="regsina" data-backend="sina" next="/">
                        <em class="snsico ico-reg-sina"></em>
                    </button>
                    </a>
                    <a href="/qq/login.html">
                    <button data-role="none" class="regqq" data-backend="qq" next="/">
                        <em class="snsico ico-reg-qq"></em>
                    </button>
                    </a>
                    <?php if ($_smarty_tpl->tpl_vars['isweixin']->value) {?>
                    <a href="/index/weixin_login.html">
                    <button data-role="none" class="regweixin" data-backend="weixin" next="/">
                        <em class="snsico ico-reg-weixin"></em>
                    </button>
                    </a>
                   <?php } else { ?>
                     <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wxb679f8d6f6b42a36&redirect_uri=http%3A%2F%2Fwww.byshare.com%2Foauth%2Fweixin%2Fcallback.php&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect">
                    <button data-role="none" class="regweixin" data-backend="weixin" next="/">
                        <em class="snsico ico-reg-weixin"></em>
                    </button>
                    </a>
                    <?php }?>
                </div>
			</div>
            <div class="or_box">
                <div class="or_box_in">
                    <p class="or_line">or</p>
                </div>
            </div>
            <p class="blank10"></p>
            <form action="" method="post" id="ajaxRegFirstFrom" class="frm clearfix frmReg">
               <ul>
                    <li>
                        <label class="label" style="display:none"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_account'];?>
</label>
                        <input type="text" id="account" name="account" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_account'];?>
" maxlength="40" class="inputClass" data-validate="mailmoblie">
                    </li>
                    <li class="blank15"></li>
                    <li>
                        <label class="label" style="display:none"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_password'];?>
</label>
                        <input data-role="none" type="password" id="password" name="password" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_enterpassword'];?>
" class="inputClass" data-validate="Pwd">
                    </li>
                    <li class="blank20"></li>
                    <li>
                        <button data-role="none" type="submit" class="btn-danger btn-signup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_regnextsubmit'];?>
</button>
                    </li>
               </ul>
            </form>
            <p class="blank0"></p>
            <p class="color-fff xieyi"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_regdesc1'];?>
<br /><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_regdesc2'];?>
</p>
            <p class="color-555 beian"><a target="_blank" class="color-555" href="http://www.miitbeian.gov.cn/">粤ICP备14099851号-1</a></p>
        </div>
        <!--注册第二步-->
        <div id="regSecond" class="login-in text-center" style="display:none">
        	<h2 class="color-fff"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_nextdesc'];?>
</h2>
            <p class="blank30"></p>
            <form id="ajaxRegSecondFrom" class="multiStepRedesign frmReg" method="post">
            	<div class="rowbox">
                	<div class="row-flex1 mr-10">
                    	<input data-role="none" type="text" class="inputClass rowbox-flex1 mr-5" name="first_name" id="userFullName" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_name'];?>
" value="" data-validate="isempty">
                    </div>
                    <div class="w80">
                    	<input data-role="none" type="text" class="inputClass" name="age" id="age" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_age'];?>
" value="" data-validate="num">
                    </div>
                </div>
                <div class="mt-10 mb-10 text-left color-fff">
                	<div class="fl mr-10">
                       <input data-role="none" name="sex" id="reg_male" type="radio" value="1">
                       <label for="reg_male" class="labradio"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_male'];?>
</label>
                    </div>
                    <div class="fl ml-10">
                    	<input data-role="none" name="sex" id="reg_fmail"  type="radio" value="2" checked>
                        <label for="reg_fmail" class="labradio"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_fmail'];?>
</span></label>
                    </div>
                    <div class="blank10"></div>
                </div>
                <button data-role="none" type="submit" class="btn-danger btn-signup"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_regsubmit'];?>
</button>
        	</form>
            <p class="blank60"></p>
            <p class="color-fff xieyi"><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_regdesc1'];?>
<br /><?php echo $_smarty_tpl->tpl_vars['lang']->value['sns_user_reg_regdesc2'];?>
</p>
            <p class="color-555 beian"><a target="_blank" class="color-555" href="http://www.miitbeian.gov.cn/">粤ICP备14099851号-1</a></p>
        </div>
    </div>
</div>
 
<?php echo $_smarty_tpl->getSubTemplate ("footer_login_reg.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

<script type="text/javascript">
$(function(){
	RegUtils.regInit();
})
</script>
</body>
</html>
<?php }} ?>
