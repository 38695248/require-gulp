<?php /* Smarty version Smarty-3.1.15, created on 2016-01-09 04:20:50
         compiled from "E:\byshareSvn\byshare6\www\moblie\views\tpl\tem\sns_searchinput.html" */ ?>
<?php /*%%SmartyHeaderCode:2262056907c92e43b03-05684588%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a2aa451c061362d3d9f4d77bf71cf08887cb4980' => 
    array (
      0 => 'E:\\byshareSvn\\byshare6\\www\\moblie\\views\\tpl\\tem\\sns_searchinput.html',
      1 => 1452245276,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2262056907c92e43b03-05684588',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.15',
  'unifunc' => 'content_56907c92ebd901_63327082',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56907c92ebd901_63327082')) {function content_56907c92ebd901_63327082($_smarty_tpl) {?><div id="searchinput" class="headerbox fade" style="border-bottom:none; height:100%; z-index:9997;-webkit-overflow-scrolling: touch;overflow-y: scroll;">
	<div class="top_l">
    	<a href="javascript:void(0);" class="back-btn rel" id="closeSearch">
          <span class="b_ico ico-back-h"></span>
      	</a>
    </div>
    <div class="searchTip">
    	<form id="formsearchTagbox" data-ajax="false" action="/m_search/search.html" method="GET" name="search" onsubmit = "return BaseInitClass.checksearchTagbox();">
            <input data-role="none" type="hidden" autocomplete="off" name="t" id="searchtyleval" class="sui-Input" value="goods">
            <div class="rowbox">
            	<div id="s-input-tab-txt" class="s-input-tab-txt rel">
                	<span id="s-input-val" data-type="goods">宝贝</span>
                    <span class="b_ico"></span>
                    <div class="s-input-tab-nav hide" id="J_TabNav">
                        <ul>
                            <li data-val="goods">宝贝</li>
                            <li data-val="allshares">分享</li>
                            <li data-val="group">群</li>
                            <li data-val="bysharers">用户</li>
                        </ul>
                    </div>
                </div>
                <div class="row-flex1">
                <input id="newsearchInt" type="text" name="s" value="" placeholder="输入关键字" >
                <input type="hidden" autocomplete="off" name="ukey" class="sui-Input" value="<?php echo ukey2tmp();?>
">
                </div>
                <div class="searchbtn newsearchbtn">
                    <button data-role="none" type="submit" class="ico ico-search w30"></button>
                </div>
            </div>
        </form>
    </div>
    <ul id="searchTagbox" class="searchList"></ul>
    <div class="text-center" style="padding:10px">
    	<button type="button" id="qingkong_btn" class="btn" style="display:none">清空搜索历史</button>
    </div>
</div><?php }} ?>
