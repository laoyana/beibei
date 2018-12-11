define(['jquery',"jquery-cookie"],function($){
	// 放大镜
	function magnifying(){
		$(function(){
			var offsetLeft = 0;
			var offsetX = 229 / 2;
			var offsetY = 229 / 2;
			// 图片抓取区域跟随鼠标移动
			$(".cont_img a").mouseenter(function(event){
				var ev = event || window.event;
				$(".zoomMask,.zoomDiv").css("display","block");

				$(document).mousemove(function(event){
					var ev = event || window.event;
					$(".zoomMask").css({
						left:ev.clientX - offsetX - $(".cont_img a").offset().left,
						top:ev.clientY - offsetY - $(".cont_img a").offset().top + $(document).scrollTop()
					})
					// 左右边界
					if(parseInt($('.zoomMask').css("left")) >= parseInt($('.cont_img a').css("width")) - parseInt($(".zoomMask").css("width"))){
						$(".zoomMask").css({
							left:parseInt($('.cont_img a').css("width")) - parseInt($(".zoomMask").css("width")),
						})
					}
					if(parseInt($('.zoomMask').css("left")) <= 0 ){
						$(".zoomMask").css({
							left:0,
						})
					}
					// 上下边界
					if(parseInt($('.zoomMask').css("top")) >= parseInt($('.cont_img a').css("height")) - parseInt($(".zoomMask").css("height"))){
						$(".zoomMask").css({
							top:parseInt($('.cont_img a').css("height")) - parseInt($(".zoomMask").css("height")),
						})
					}
					if(parseInt($('.zoomMask').css("top")) <= 0 ){
						$(".zoomMask").css({
							top:0,
						})
					}
					// 大图背景图位置 根据 图片抓取区域移动 变化
					offsetLeft = parseInt($(".zoomMask").css("left"));
					offsetTop = parseInt($(".zoomMask").css("top"));
					$(".zoomDiv").css({
						backgroundPosition: -offsetLeft * 1.7 + "px " + -offsetTop * 1.7 + "px",
					})
				})
			})
			$(".cont_img a").mouseleave(function(){
				$(document).off();
				$(".zoomMask,.zoomDiv").css("display","none")
			})
		})
	}
	return {
		magnifying:magnifying
	}
})