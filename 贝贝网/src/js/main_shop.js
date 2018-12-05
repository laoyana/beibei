
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"shop":"shop",
	},
	shim:{
		"jquery-cookie":["jquery"]
	}
})
require(['shop'],function(shop){
	shop.shop();
})