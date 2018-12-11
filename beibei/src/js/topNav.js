define(["jquery","jquery-cookie"],function($){
	// 活动导航
	function topNav(){
		$(function(){
			$(document).scroll(function(){
				var scrollTop = $(document).scrollTop();
				// 当滚动条到达190px 时 显示导航
				if(scrollTop > 190){
					$(".sub_nav").css("display","block");
				}else{
					$(".sub_nav").css("display","none");
				}
			})
		})
	}
	return {
		topNav:topNav
	}
})