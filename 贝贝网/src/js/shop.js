
define(['fixedNav','jquery','jquery-cookie'],function(fixedNav,$){
	function shop(){
		$(function(){
			
			// 网页右侧固定导航
			fixedNav.fixedNav();

			// 请求在售分类数据
			$.ajax({
				url:'../src/json/index.json',
				success:function(data){
					// 在售分类移入移出事件
					$(".search_left").mouseenter(function(){
						$(".search_box").css("display","block");
						// 每次移入 都会显示 第一标题和商品内容
						$(".more").removeClass("active");
						$(".more").eq(0).addClass("active");
						$(".search_shop").empty();
						for(var j = 0; j < data[0].shop.length; j++){
							$(`<li class="sli"><a href=""><img src="${data[0].shop[j].img}" alt=""><span>${data[0].shop[j].title}</span></a></li>`).appendTo($(".search_shop"));
							if((j + 1) % 4 == 0){
								$(".sli").eq(j).addClass("sli-r");
							}
						}
						$(".sli").eq(-1).addClass("sli-r");
						var sum = $(".sli").eq(-1).index() + 1;
						if(sum % 4 == 0){
							for(var i = 0; i < 4; i++){
								$(".sli").eq(-(i+1)).addClass("sli-b");
							}
						}else{
							var op = sum % 4;
							for(var i = 0; i < op; i++){
								$(".sli").eq(-(i+1)).addClass("sli-b");
							}
						}
						
					})
					$(".search_left").mouseleave(function(){
						$(".search_box").css("display","none");
					})
					//添加标题
					for(var i = 0; i < data.length; i++){
						if(i == 0){
							$(`<li class="more active">${data[i].title}</li>`).appendTo($(".search_more"));	
						}else{
							$(`<li class="more">${data[i].title}</li>`).appendTo($(".search_more"));							
						}
					}
					//事件委托
					// 添加各个标题下的商品数据
					$(".search_more").on("mouseover",".more",function(){

						$(".search_shop").empty();

						$(".more").removeClass("active");
						$(this).addClass("active");
						// 获取当前选择的标题下标
						var num = $(".more").index($(this));

						for(var i = 0; i < data.length; i++){
							var shop = data[i].shop;
							if(num == data[i].id){
								for(var j = 0; j < shop.length; j++){
									$(`<li class="sli"><a href=""><img src="${shop[j].img}" alt=""><span>${shop[j].title}</span></a></li>`).appendTo($(".search_shop"));
									if((j + 1) % 4 == 0){
										$(".sli").eq(j).addClass("sli-r");
									}
								}
							}
							$(".sli").eq(-1).addClass("sli-r");
						}
						var sum = $(".sli").eq(-1).index() + 1;
						if(sum % 4 == 0){
							for(var i = 0; i < 4; i++){
								$(".sli").eq(-(i+1)).addClass("sli-b");
							}
						}else{
							var op = sum % 4;
							for(var i = 0; i < op; i++){
								$(".sli").eq(-(i+1)).addClass("sli-b");
							}
						}
					})
				}
			})
			
		})
	}
	return {
		shop:shop
	}
})