<?php /* Smarty version Smarty-3.1.15, created on 2016-01-08 17:33:09
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\buy\index.html" */ ?>
<?php /*%%SmartyHeaderCode:27240568f8255f00052-50197922%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f8992a26656e9663831d5b3d3d3ce319e29f2132' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\buy\\index.html',
      1 => 1452245277,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '27240568f8255f00052-50197922',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'weixin_first_img' => 0,
    'cat_imgs' => 0,
    'adv' => 0,
    'v' => 0,
    'static_url' => 0,
    'request_url' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_568f8256071782_31486188',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_568f8256071782_31486188')) {function content_568f8256071782_31486188($_smarty_tpl) {?><?php echo $_smarty_tpl->getSubTemplate ("header_comm.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


<body class="bodybox bodyclick">
<div style="height:0px; overflow:hidden"> <img id="weixin_first_img" src="<?php echo $_smarty_tpl->tpl_vars['weixin_first_img']->value;?>
" />
</div>
<div class="mainbox" id="gzpage" data-role="page">
  <div id="headerbox" class="headerbox">
  	<?php echo $_smarty_tpl->getSubTemplate ("header_back.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

  </div>
  
  <div class="contentbox" data-role="content">
    <?php echo $_smarty_tpl->getSubTemplate ("inc_ad_topslip.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

    
	<div class="typebox-n" style="border-bottom:#e5e5e5 solid 1px; border-top:#e5e5e5 solid 1px">
	   <ul class="typebox-start typebox-start-buy rowbox-r">
	      
	      <!--
	      <li><a href="/m_buy/showcat.html?catid=86&mod=&h_name=箱包&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>箱包</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=&mod=women_clothes&h_name=女装&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>女装</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=&mod=man_clothes&h_name=男装&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>男装</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=&mod=shoes&h_name=男鞋女鞋&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>男鞋女鞋</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=&mod=beauty&h_name=美妆日化&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>美妆日化</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=&mod=digital&h_name=数码家电&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>数码家电</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=&mod=warm_home&h_name=保暖居家&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>保暖居家</p>
	      </a> </li>
	      -->
	      
	      <li><a href="/m_buy/showcat.html?catid=17&mod=&h_name=上装&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[0]['img'];?>
"></p>
	      <p>上装</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=18&mod=&h_name=裙装&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[1]['img'];?>
"></p>
	      <p>裙装</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=19&mod=&h_name=裤装&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[2]['img'];?>
"></p>
	      <p>裤装</p>
	      </a> </li>
	      
	      <li><a href="/m_buy/showcat.html?catid=93&mod=&h_name=套装&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[3]['img'];?>
"></p>
	      <p>套装</p>
	      </a></li>
	      
	      <li><a href="/m_buy/showcat.html?catid=147&mod=&h_name=礼服&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[4]['img'];?>
"></p>
	      <p>礼服</p>
	      </a></li>
	      
	      <li><a href="/m_buy/showcat.html?catid=85&mod=&h_name=饰品&color=t_e47d7e">
	      <p><img src="<?php echo $_smarty_tpl->tpl_vars['cat_imgs']->value[5]['img'];?>
"></p>
	      <p>饰品</p>
	      </a></li>
	      
	  </ul>
	</div>
	
    <div class="blank10"></div>
    <div class="edt_box"> <?php echo $_smarty_tpl->tpl_vars['adv']->value['middle_txt_adv'][0]['text_val'];?>
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
        	<li class="dhpjax current" data-url="/m_buy/index.html?type=new&orders=new">每日新品</li>
            <li class="line">|</li>
            <li class="dhpjax" data-url="/m_buy/index.html?type=hot&orders=hot">人气热销</li>
            <li class="line">|</li>
            <li class="dhpjax" data-url="/m_buy/index.html?type=low_price&orders=price_asc">特价优惠</li>
        </ul>
      </div>
      <div id="masonry_2" class="masonry larger-view">
      	<?php echo $_smarty_tpl->getSubTemplate ("inc_share_item.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

      </div>
    </div>
    
    <div class="pager"> 
      <span class="pager-next">
        <a href="<?php echo $_smarty_tpl->tpl_vars['request_url']->value;?>
"></a>
      </span> 
    </div>
  </div>
  
  <?php echo $_smarty_tpl->getSubTemplate ("footer_bar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</div>

<input type="hidden" id="isseacrch" value="1" /><!-- 1搜索，0正常 -->
<script data-main="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/js/search.js" src="<?php echo $_smarty_tpl->tpl_vars['static_url']->value;?>
/moblie/app/require.js"></script>
<?php echo $_smarty_tpl->getSubTemplate ("footer_comm_new.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

</body>
</html><?php }} ?>
