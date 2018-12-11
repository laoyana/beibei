define(['jquery','jquery-cookie'],function($){
	//请求商品数据
	function addShop(){
		$(function(){
			$.ajax({
				url:"../src/json/shop.json",
				success:function(data){
					var data = data[0];
					$(`<span>${data.h3}</span>`).appendTo($(".crumb"));
					// 图片信息
					for(var i = 0; i < data.view.length; i++){
						$(`	<li><a href="javascript:;"><img src="${data.view[i]}" alt=""></a></li>`).appendTo($(".view_img"))
					}
					$(`<img class="view" src="${data.main_img}" alt="">`).prependTo($(".cont_img").find("a"))
					$(".zoomDiv").css("background",`url(${data.bg_img})`);
					// 介绍
					$(`<h3><span>今日特卖</span>
                                ${data.h3}   
                            </h3>
                            <p>${data.pre}</p>`).appendTo($('.title'));
					// 价格
					$(`<em>￥<i>${data.pic}</i></em>`).appendTo($(".nom_pic"))
					$(`<span class="through">${data.old_pic}</span>`).appendTo($(".old_pic"))
					$(`<strong>${data.zkou}</strong>`).appendTo($(".fy1"))
					$(`<strong>${data.jsheng}</strong>`).appendTo($(".fy2"))
					// 颜色
					for(var i = 0; i < data.color.length; i++){
						$(`<li><a href="javascript:;">
							<div class="thumb-box"><img src="${data.color[i].img}" alt=""><span>${data.color[i].cor}</span></div>
							</a></li>`).appendTo($('.attr_color'));
					}
					// 尺码
					for(var i = 0; i < data.size.length; i++){
						$('.attr_size .red').before(`<li><a href="javascript:;">
							<div class="thumb-box"><span>${data.size[i]}</span></div>
							</a></li>`);
					}
				}
			})
		})
	}
	return {
		addShop:addShop,
	}
})