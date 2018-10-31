$(function() {
	'use strict';
	// 页面pageController
	var pageController = {
		// name
		__name: 'pageController',
		// 搜索一览Controlelr
		_searchController: ex7.SearchController,
		// 详细一览Controlelr
		_detailController: ex7.DetailController,
		// 购物车Controlelr
		_cartController: ex7.ShoppingCartController,
		__ready: function() {
			// 页面初始化
			this.init();
		},
		// 页面初始化
		init: function() {
			// 书籍搜索一览初始化
			this._searchController.init();
		},
		//展示细节功能
		'{rootElement} showDetail': function(context) {
			var message = context.evArg.message;
			this._detailController.showDetail(message);
		},
		//展示购物车一览功能
		'{rootElement} addToCart': function(context) {
			var information = context.evArg.information;
			this._cartController.addToCart(information);
		}
	};
	h5.core.controller('#container', pageController);
});