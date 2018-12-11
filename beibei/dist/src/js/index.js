
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


				sc_car();
				// 打开购物车

					$("#xx_shop,.side_a").mouseenter(function(){
						sc_msg();
					});
					
					// 购物车商品数量(种类)
					function sc_car(){
						var sc_str = $.cookie("goods");
						if(sc_str){
							var sc_arr = eval(sc_str);
							var sc_num = 0;

							sc_num = sc_arr.length;

							$(".cart_num").html(sc_num);
							
						}
					}
					// 加载cookie数据
					function sc_msg(){
						$.ajax({
							url:"src/json/shop.json",
							success:function(res){
								if($.cookie("goods")){
						
									var sc_arr = eval($.cookie("goods"));
									var sum = 0;
									$(".empty_shop").html("");
									for(var i in sc_arr){
										$(`<li>
									<a class="empty_a1" href="javascript:;">
										<img src="${res[0].view[sc_arr[i].shopColor]}" alt="">
									</a>
									<a class="empty_a2" href="javascript:;">${res[0].h3}</a>
									<p class="empty_p1">颜色:${res[0].color[sc_arr[i].shopColor].cor} 尺码:${res[0].size[sc_arr[i].shopSize]}</p>
									<p class="empty_p2">¥${res[0].pic}</p>
									<br>
									<span> x${sc_arr[i].shopNum}</span>
								</li>`).appendTo($(".empty_shop"));
									sum = sum + res[0].pic * sc_arr[i].shopNum;
									}
									$(".pic_c").html("￥" + parseInt(sum));
								}
							}
						})
					}	
			
		})
	}
	return {
		index:index
	}
})