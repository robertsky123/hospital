if ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ) {
document.execCommand("BackgroundImageCache", false, true); 
}
var Xjf={};
(function(X){
X.page_height=function(){//每个项的内容高度
	$('.hook_page').each(function(){
		var window_height=$(window).height();
		var attr_name=$(this).attr("data-hook");
		if($(this).hasClass('index_pg')){
			if($(this).height()<window_height-104){
			$(this).css("height",window_height-104);
			}
		}
		else{
			if($(this).height()<window_height){
			$(this).css("height",window_height);
			}
		}
	});

};

}(Xjf));
$(function(){
		Xjf.page_height();
	function resize_height(){
		Xjf.page_height();
	}
	var resize_gap;
	$(window).resize(function(){//改变完成后执行
		clearTimeout(resize_gap);
		resize_gap=setTimeout(resize_height,500);
	});
	$('html,body').animate({"scrollTop":0},0);
	
	var ori_x=0;//原始位置
	var ori_width=70;//原始宽度
	var ori_index=0;//原始索引
	var nav_a=$('.navis').find('a');
	var nav_line=$('.nav_line');
	var hook_str="index_tag";
	var clicked=false;
	nav_a.hover(function(){//导航脚本
			nav_line.stop();
			var navis_offset=$('.navis').offset();
			var navis_x=navis_offset.left;
			clicked=false;
			var now_x=$(this).parent('li').offset().left;
			var now_width=$(this).parent('li').width();
			var line_locate=now_x-navis_x;
			nav_line.animate({'left':line_locate,'width':now_width},{'duration':500,'easing':"easeOutBack"});
			nav_a.removeClass('active');
			$(this).addClass('active');
	},
		function(){
		if(!clicked){
		nav_line.stop();
		nav_line.animate({'left':ori_x,'width':ori_width},{'duration':500,'easing':"easeOutBack"});
		nav_a.removeClass('active');
		$('.navis').find('a:eq('+ori_index+')').addClass('active');
		}
		}
	);
	nav_a.each(function(index){
		$(this).click(function(event){
		event.preventDefault();
		$(this).blur();
		var navis_offset=$('.navis').offset();
		var navis_x=navis_offset.left;
		ori_index=index;
		var now_x=$(this).parents('.navis').find('li:eq('+ori_index+')').offset().left;
		ori_width=$(this).parents('.navis').find('li:eq('+ori_index+')').width();
		ori_x=now_x-navis_x;
		var tag=$(this).attr("data-tag");
		if(hook_str!=tag){
			hook_str=tag;
			clicked=true;
			$('#header').hide(0);
			var now_width=ori_width;
			var line_locate=ori_x;
			nav_line.animate({'left':line_locate,'width':now_width},{'duration':500,'easing':"easeOutBack"});
			nav_a.removeClass('active');
			$(this).addClass('active');
			var hook_tag=$(this).attr('data-tag');
			var target_y;
			if(tag=="index_tag"){
			target_y=0;
			var pos=$('body').scrollTop()||$('html').scrollTop();
			if(pos==0){
				$('#header').fadeIn(0);
			}
			}
			else{
			target_y=$('.hook_page[data-hook='+hook_tag+']').offset().top;
			}
			$('html,body').animate({"scrollTop":target_y},300);
		}
	});
	});

	function pos_array(){//保存每个项的top值
		var tk=[];
		$(".hook_page").each(function(){
			var off_top=$(this).offset().top;
			tk.push(off_top);
		});
		return tk;
	}
	
	function head_position(){
		var pos=$('body').scrollTop()||$('html').scrollTop();
		$('#header').animate({"top":pos},0,function(){
			$(this).fadeIn(100);
		});
		var posarray=pos_array();
		var page_index;
		for(var i=posarray.length-1;i>=0;i--){
				if(pos>=posarray[i]-10){
					page_index=i;
					break;
				}
		}
		var navis_offset=$('.navis').offset();
		var navis_x=navis_offset.left;
		ori_index=page_index;
		var now_x=$('.navis').find('li:eq('+ori_index+')').offset().left;
		ori_width=$('.navis').find('li:eq('+ori_index+')').width();
		ori_x=now_x-navis_x;
		nav_line.animate({'left':ori_x,'width':ori_width},{'duration':500,'easing':"easeOutBack"});
		nav_a.removeClass('active');
		$('.navis').find('li:eq('+ori_index+') a').addClass('active');
	}
	var header_locate;
	$(window).scroll(function(){
		$('#header').show();
		clearTimeout(header_locate);
		header_locate=setTimeout(head_position,100);
	});
	
	$('.flexslider').flexslider({ animation: "slide",slideshow:true, slideshowSpeed: 3500, 
			animationDuration: 1500,pauseOnAction: false,directionNav: true,animationLoop: true});
	
	var bktop=setTimeout(backTop,100);
	function backTop(){//ie下保存滚动位置的bug
		$('html,body').animate({"scrollTop":0},100);
	}
});

