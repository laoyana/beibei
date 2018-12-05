define(['jquery',"jquery-cookie"],function($){
	
	function load(){
		var page = 0; //第几页数据
		var isLogin = false;
		$(function(){
			// 加载页面
			getList(page);

			$(document).scroll(function(){
				// 滚动条加载后续数据
				var windowHeight = $(window).height();
				var scrollTop = $(document).scrollTop();
				var offsetTop = $(".show_link").eq(-1).offset().top;
				var windowB = windowHeight + scrollTop;
				if(windowB >= offsetTop){
					if(page >= 3){
						isLogin = true;
						$(".center_box .dianji").css("display","block");
					}
					if(!isLogin){
						isLogin = true;
						page++;
						getList(page);
					}
				}
			})

			$(".center_box .dianji").click(function(){
				getList(page);
			})
		})




		//瀑布流加载页面
		var sNum = 0; //记录商品个数
		function getList(cPage){
			$.ajax({
				url:"src/json/small.json",
				success:function(data){
					var shopBox = data[2].box;
					for(var i = 0; i < shopBox[cPage].shop.length; i++){
						$(`<a href="" class="show_link">
							<div class="shop">
								<img src="${shopBox[cPage].shop[i].img}" alt="">
								<p class="s_title">${shopBox[cPage].shop[i].title}</p>
								<div class="pic_box">		
									<p class="s_pic">
										<span class="currency">￥</span>
										<span class="price-num">${shopBox[cPage].shop[i].pic}</span>
										<span class="price-little">${shopBox[cPage].shop[i].pics}</span>	
									</p>
									<p class="old-pic">${shopBox[cPage].shop[i].old}</p>
									<p class="desc">${shopBox[cPage].shop[i].desc}</p>
								</div>
							</div>
						</a>`).appendTo($(".show_shop"));
						sNum++;
						if(sNum % 3 == 0){
							$(".show_link").eq(sNum - 1).addClass("s-r");
						}
					}
					isLogin =  false;
				}
			})
		}
	}
	return {
		load:load
	}
})