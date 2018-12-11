define(['jquery','jquery-cookie'],function($){
	//选择商品加入购物车
	function choose(){
		$(function(){
			var shopColor = null; //选择的颜色
			var shopSize = null; //选择的尺寸
			var shopNum = 1; //选择的数量 最小为1
			var  colorNum = 0;
			var sizeNum = 0;
			var id = 0;
			sc_car();

			$.ajax({
			url:"../src/json/shop.json",
			success:function(data){
				var data = data[0];
				id = data.id;
					// 切换商品展示区图片
						tabView();
						function tabView(){
							$(".view_imgs").on("click","a",function(){
								var index = $(this).parent().index();

								$(".view_img li").css("border","2px solid #dfdfdf");
								$(this).parent().css("border","2px solid #fe4a7a");
							
								$(".view").attr("src",`${data.mask_img[index]}`)
								$(".zoomDiv").css("background",`url(${data.zoom_img[index]})`)
							})
								}
					
					// 选择颜色
					$(".attr_color").on("click","a",function(){
						$(".attr_color a").attr("class",'');
						$(this).attr("class","color_active");
						colorNum = $(this).parent().index();
						shopColor = data.color[colorNum].cor;
						// alert(shopColor);
					})
					// 选择尺寸
					$(".attr_size").on("click","li a",function(){
						$(".attr_size a").removeClass("color_active");
						$(this).addClass("color_active");
						sizeNum = $(this).parent("li").index();
						shopSize = data.size[sizeNum];
						// alert(shopSize);
					})

					// 商品数量
					// 加
					$(".sum_num").click(function(){
						// 限购5件
						if(shopNum >= 1 && shopNum < 5){
							shopNum++;
						}
						if(shopNum > 1){
							$(".del_num").css({
								background:"-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))"
							})
							$(".jian").css("display","none");
							if(shopNum == 5){
								$(".sum_num").css({
									background:"-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))"
								})
								$(".jian").css("display","inline");
							}
						}
						$(".view_BuyNum").attr("value",`${shopNum}`);
					})
					// 减
					$(".del_num").click(function(){
						// 限购5件
						if(shopNum > 1 && shopNum <= 5){
							shopNum--;
						}
						$(".jian").css("display","none");
						if(shopNum < 5){
							$(".del_num").css({
								background:"-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))"
							})
							$(".sum_num").css({
								background:"-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee))"
							})
							if(shopNum == 1){
								$(".del_num").css({
									background:"-webkit-gradient(linear,left top,left bottom,from(#e0e0e0),to(#f0f0f0))"
								})
							}
						}
						$(".view_BuyNum").attr("value",`${shopNum}`);
					})
				}
			})
	
					// 加入购物车
					$(".ops .ops_shop").off("click").on("click",function(){
				
						if(shopColor && shopSize){
							// 是不是第一次加入购物车
							var first = $.cookie("goods") == null ? true : false;
							if(first){
								//第一次添加  
								$.cookie("goods", '[{shopColor:' + colorNum + ',shopSize:' + sizeNum + ',shopNum:'+ shopNum + ",id:" + id + '}]', {
									path:'/',
									expires: 7
								});
							}else{
								var str = $.cookie("goods");
								var arr = eval(str);
								var same = false;

								// 是否具有相同商品
								for(var i in arr){
									if(arr[i].shopColor == colorNum && arr[i].shopSize == sizeNum && arr[i].id == id){
										arr[i].shopNum = arr[i].shopNum + shopNum;

										var cookieStr = JSON.stringify(arr);
										$.cookie("goods",cookieStr,{
											path:'/',
											expires:7
										})

										same = true;
										break; 	
									}
								}
								// 没有相同的商品
								if(!same){
									var obj = {shopColor:colorNum,shopSize:sizeNum,shopNum:shopNum,id:id};
									arr.push(obj);
									var cookieStr = JSON.stringify(arr);
									$.cookie("goods",cookieStr,{
										path:'/',
										expires:7
									})
								}
							}
						}else{
							alert("请选择商品");
						
						}
						sc_car();
						return false;
						
					})


					// 打开购物车

					$(".side_a,#xx_shop").mouseenter(function(){
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
							url:"../src/json/shop.json",
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
		choose:choose,
	}
})