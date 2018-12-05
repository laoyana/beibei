define(['jquery',"jquery-cookie"],function($){
	function fixedNav(){
		// 事件委托 添加hover事件
		//购物车
		$(".side_a").hover(function(){
			$(this).css({
				background:"#ff647c",
				color:"#fff"
			})
			$(".side_a .side_shop").css("display","block");
		},function(){
			$(this).css({
				background:"",
				color:""
			})
			$(".side_a .side_shop").css("display","none");
		})

		// 我的购物车
		$("#xx_shop .box").hover(function(){
			$("#xx_shop .side_shop").css("display","block");
		},function(){
			$("#xx_shop .side_shop").css("display","none");
		})
		// 手机APP
		$(".side_b").hover(function(){
			$(this).css({
				background:"#ff647c",
				color:"#fff"
			})
			$(".side_phone").css("display","block");
		},function(){
			$(this).css({
				background:"",
				color:""
			})
			$(".side_phone").css("display","none");
		})
		// 客户服务 回到顶部
		$(".side_c,.side_d").hover(function(){
			$(this).css({
				background:"#ff647c",
				color:"#fff"
			})
			$(this).find(".ic").css("display","none");
			$(this).find(".tip").css("display","block");
		},function(){
			$(this).css({
				background:"",
				color:""
			})
			$(this).find(".tip").css("display","none");
			$(this).find(".ic").css("display","block");
		})


	}
	return {
		fixedNav:fixedNav
	}
})