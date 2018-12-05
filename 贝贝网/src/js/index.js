
define(['fixedNav','topNav','jquery','jquery-cookie'],function(fixedNav,topNav,$){
	function index(){
		$(function(){
			// 显示导航条
			topNav.topNav();

			fixedNav.fixedNav();

			// 请求在售分类数据
			$.ajax({
				url:'src/json/index.json',
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
			// 轮播图
			// 获取当前选中按钮的下标
			var iNow= 0;
			$('.b-num span').click(function(){
				iNow = $(this).index();
				tab();
			});
			$(".main,.banner").css({
				width:$(window).width(),
			});
			for(var i = 0; i < $(".banner").children(".b-img").length; i++){
				$(".b-img").eq(i).css({
					width:$(window).width(),
					left:$(window).width() * i,
				});
			}
			// 实时获取浏览器的宽度
			$(window).resize(function(){
				for(var i = 0; i < $(".banner").children(".b-img").length; i++){
					$(".b-img").eq(i).css({
						width:$(window).width(),
						left:$(window).width() * i,
					});
				}
				$(".main").css({
					width:$(window).width(),
				})
				$(".banner").css({
					width:$(window).width(),
					left:-$(window).width() * iNow
				});
			});
			//切换图片
			function tab(){
				$(".b-num").find("span").attr("class",'');
				$(".b-num span").eq(iNow).attr("class","active");
				$(window).resize(function(){

				})
				$(".banner").stop().animate({left:-$(window).width() * iNow},500,function(){
					if(iNow == $(".b-img").size() - 1){
						iNow = 0;
						$(".banner").css("left",0)
					}
				})
			}
			// 自动轮播
			var timer = null;
			function timerInner(){
				iNow++;

				tab();

				if(iNow == $(".b-img").size() - 1){
					$(".b-num span").eq(0).attr("class","active");
				}
			}
			timer = setInterval(timerInner,2000);

			$(".b-img").hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(timerInner,2000);
			});
			// 数据抓取，小图展示区
			$.ajax({
				url:'src/json/small.json',
				success:function(msg){
					console.log(msg);
					var shopSmall = msg[0].shop;
					for(var i = 0; i < shopSmall.length; i++){
						$(`<img src="${shopSmall[i].img}" alt="">
							<span>${shopSmall[i].title}</span>
							<div class="ball">${shopSmall[i].pic}</div>`).appendTo($(".show-box .box").eq(i));
					}
				},
			})
			// 求情数据 热卖排行榜
			$.ajax({
				url:'src/json/small.json',
				success:function(msg){
					console.log(msg);
					var shopSmall = 0;
					for(var i = 0; i < msg[1].box.length; i++){
						shopSmall = msg[1].box[i].shop;
						for(var j = 0; j < shopSmall.length; j++){
							$(`<a href="">
								<img src="${shopSmall[j].img}" alt="">
								<div class="re-item">
									<div class="item-t">${shopSmall[j].title}</div>
									<div class="item-pic">
										<span class="m-l">${shopSmall[j].pic}</span>
										<span class="m-r">${shopSmall[j].pics}</span>
									</div>
								</div>
							</a>`).appendTo($(".re-box").eq(i));
						}
					}
				},
			})
			//按钮切换热卖排行榜
			$(".re_title").on("mouseover",".t_nav",function(){
				$(".t_nav").removeClass("active");
				$(this).addClass("active");
				var reNum = $(this).index();
				$(".re-box").css("display","none");
				$(".re-box").eq(reNum).css("display","block");
			})
			
		})
	}
	return {
		index:index
	}
})