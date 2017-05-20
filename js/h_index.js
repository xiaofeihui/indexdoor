$(function(){
	showlist('zxdt_div',10,20,['.zxdt_div'],0);
	showlist('ldjh_div',8,18,['.ldjh_div'],0);
	showlist('tagz_div',8,18,['.tagz_div'],0);
	showlist('zxhy_div',7,18,['.zxhy_div'],0);
	showlist('llyj_div',7,18,['.llyj_div'],0);
	showlist('zxdt_div',5,40,['.toplist_p'],0);
	showlist('ul_imglist',5,10,['.ul_imglist'],2);
	showlist('scro_imglist',5,10,['.scro_div','.scro_imglist'],1);
	show_video('div_video',['.div_video']);
	setInterval('autoScroll(".top_list")', 2000);
	changeinput('.test_input');
});
/*首页列表
 lmid : 栏目id  len : 显示条数 ； zi_len : 标题长度  name : 所在div的标识 type:显示类型*/
function showlist(lmid,len,zi_len,name,type){
	var name = $(name);
	$.ajax({
		type:'post',
		url:'https://github.com/xiaofeihui/indexdoor/blob/master/datajson.json',
		dataType:'json',
		success:function(data){
			$.each(data,function(key,value){
				if(key ==lmid) {
					//console.log(len,zi_len,name,type,lmid);
					var str='',str_li = '';
					var arr = [];
					for(var i=0;i<len;i++){
						var wzid = value[i].wzid;
						var bt = value[i].bt;
						var gdtpwj = value[i].gdtpwj;
						bt  = bt.substring(0,zi_len) + '…';
						if(type==0){ /*文字列表*/
							str +='<li><i>&middot;</i><a href="/web/loadWebPage.do?4401645_'+wzid+'_'+lmid+'_'+'4&lmid='+lmid+'">'+bt+'</a></li>';
						}else if(type==1){/*轮播列表*/
							str_li +='<li></li>';
							str +='<div class="img_con"><a href="/web/loadWebPage.do?4401645_'+wzid+'_'+lmid+'_'+'4&lmid='+lmid+'"><img src="'+gdtpwj+'" /><p>'+bt+'</p></a></div>';
						}else{/*图文列表*/
							str +='<li><a href="/web/loadWebPage.do?4401645_'+wzid+'_'+lmid+'_'+'4&lmid='+lmid+'"><dl><dt><img src="'+gdtpwj+'" /><dd>'+bt+'<dd><dl></a></li>';
						}
					}
					if(name.length==1){
						$(name[0]).find('ul').append(str);
					}else{
						$(name[0]).find('ul').append(str_li);
						$(name[1]).append(str);
						img_scro(name);
					}
				}
			})
		}
	})
}
/*首页列表 end*/
/* 无缝文字轮播 start */
function autoScroll(obj) {
	$(obj).find(".toplist_p ul:first").animate({
		marginTop: "-30px"
	}, 1000, function() {
		$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
	});
}
/* 无缝文字轮播 end */

/* 输入框ie8聚焦兼容  start*/
function changeinput(obj){
	$(obj).val("这里为您搜索");
	$(obj).focus(function(){
		if($(obj).val()=="这里为您搜索"){
			$(obj).val('');
		}else{
			$(obj).val($(obj).val());
		}
	});
	$(obj).blur(function(){
		if($(obj).val()==''){
			$(obj).val("这里为您搜索");
		}else{
			$(obj).val($(obj).val());
		}
	})
}
/* 输入框ie8聚焦兼容  end*/

/* 展示播放视频部分 start*/
function show_video(lmid,name){
	console.log(lmid,name);
	$.ajax({
		type:'post',
		url:'https://github.com/xiaofeihui/indexdoor/blob/master/datajson.json',
		dataType:'json',
		success:function(data){
			$.each(data,function(key,value){
				if(key ==lmid) {
					var str='';
					console.log(value.length);
					//$(name).find("a").remove();
					//$(name).find("video").remove();
					var index_i=0;
					if(value.length>=2) {
						index_i = value.length - 1;
					}
					str += '<a><span></span><img src="'+value[index_i].gdtpwj+'"/><em></em></a><video width="280" height="158" controls="controls"><source src="'+value[index_i].url+'"type="video/mp4"></video>';
					$(name[0]).append(str);
					videoplay();
				}
			});

		}
	});
}
function videoplay(){
	var vi_sta;
	$(".div_video video").get(0).pause();
	$(".div_video>a").click(function(){
		$(this).css('display','none');
		$(".div_video video").get(0).play();
		vi_sta = 0;
		$(".div_video").click(function(){
			if(vi_sta==0){
				$(".div_video video").get(0).play();
				vi_sta=1;
			}else{
				$(".div_video video").get(0).pause();
				vi_sta=0;
			}
		});
	});
}
/* 展示播放视频部分 end*/
/*scroll*/

function img_scro(name){
	var timePlay=null;
	var timeoutid;
	var scro_li = $(name[0]).find("ul li");
	var scro_div = $(name[1]).find("div");
	scro_div.eq(0).show().siblings("div").hide();
	scro_li.each(function(index){
		var liNode = $(this);
		$(this).mouseover(function(){
			clearInterval(timePlay);
			timeoutid  = setTimeout(function(){
				scro_div.eq(index).fadeIn().siblings("div").fadeOut();
				liNode.addClass("mabg_col").siblings("li").removeClass("mabg_col");
			},300);
		}).mouseout(function(){
			clearTimeout(timeoutid);
			autoPlay(liNode.index(),scro_li,scro_div);
		});
	});
	autoPlay(scro_li.index(),scro_li,scro_div);
	function autoPlay(_index,scro_li,scro_div){
		timePlay=setInterval(function(){
			_index++;
			if(_index<scro_li.length){
				if(_index==scro_li.length){_index=-1; }
				scro_li.eq(_index).addClass("mabg_col").siblings().removeClass("mabg_col");
				scro_div.eq(_index).fadeIn().siblings("div").fadeOut();
			}else{_index=-1;}
		},3000);
	}
}
/*scroll*/
