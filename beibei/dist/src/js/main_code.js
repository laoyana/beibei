
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"code":"code",
	},
	shim:{
		"jquery-cookie":["jquery"]
	}
})
require(['code'],function(code){
	code.code();
})