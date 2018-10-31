(function() {
	'use strict';
	// 购物车controller
	var shoppingCartController = {
		// name
		__name: 'ex7.ShoppingCartController',
		// template
		__templates: 'view/buyList.ejs',
		//购物车信息对象
		_buyInfo: {},
		//总数
		_totalNum: 0,
		// 添加到购物车
		addToCart: function(context) {
			//判断是否存在添加到购物车的信息，如果有，把信息添加到对象中去
			if(context != null) {
				var key = context.key;
				var title = context.title;
				var price = context.price;

				if(this._buyInfo[key] != null) {
					this._buyInfo[key].num = this._buyInfo[key].num + 1;
				} else {
					this._buyInfo[key] = {};
					this._buyInfo[key].title = title;
					this._buyInfo[key].price = price;
					this._buyInfo[key].key = key;
					this._buyInfo[key].num = 1;
				}
				this._totalNum = this._totalNum + 1;
				this._updatebuyInfo(this._buyInfo);
				this._updateCartNum(this._totalNum);
			} else {
				alert("书籍信息缺失")
			}
		},
		//		 返回
		'{rootElement} backToDetail': function() {
			this._showCartIcon();
			this._hideCartList();
		},
		// 点击购物车图标
		'.cart-icon click': function() {
			this._hideCartIcon();
			this._showCartList();
		},
		// 点击返回按钮
		'.return-btn click': function() {
			this._showCartIcon();
			this._hideCartList();
		},
		// 数量增加
		'.add-num-btn click': function(context, $el) {
			var key = $el.attr('data-key');
			console.log(key)
			this._buyInfo[key].num = this._buyInfo[key].num + 1;
			this._totalNum = this._totalNum + 1;
			this._updatebuyInfo(this._buyInfo);
			this._updateCartNum(this._totalNum);
		},
		// 数量减少
		'.min-num-btn click': function(context, $el) {
			var key = $el.attr('data-key');
			//记录当前的值
			var preNum = this._buyInfo[key].num;
			if(preNum === 0) {
				return;
			}
			//更新全局变量
			this._buyInfo[key].num = this._buyInfo[key].num - 1;
			this._totalNum = this._totalNum - 1;
			this._updatebuyInfo(this._buyInfo);
			this._updateCartNum(this._totalNum);
		},
		// 输入数量
		'.input-num blur': function(context, $el) {
			var key = $el.attr('data-key');
			var value = $el.val();
			if(isNaN(value) || value < 0) {
				alert('购买数量必须>0');
				value = 0;
			}
			var preNum = this._buyInfo[key].num;
			this._buyInfo[key].num = parseInt(value);
			this._totalNum = this._totalNum - preNum + this._buyInfo[key].num;
			this._updatebuyInfo(this._buyInfo);
			this._updateCartNum(this._totalNum);
		},
		// 删除按钮
		'.remove-btn click': function(context, $el) {
			var key = $el.data('key');
			var num = this._buyInfo[key].num;
			delete this._buyInfo[key];
			this._totalNum = this._totalNum - num;
			this._updatebuyInfo(this._buyInfo);
			this._updateCartNum(this._totalNum);
		},
		// 支付按钮
		'.pay-btn click': function(context, $el) {
			alert('支付成功！');
		},
		// 隐藏购物车图标
		_hideCartIcon: function() {
			this.$find('.cart-icon').hide();
		},
		// 显示购物车图标
		_showCartIcon: function() {
			this.$find('.cart-icon').show();
		},
		// 显示购物车一览
		_showCartList: function() {
			this.$find('.cart-list').animate({
				left: '0.5rem'
			});
		},
		// 显示购物车一览
		_hideCartList: function() {
			this.$find('.cart-list').animate({
				left: '-50rem'
			});
		},
		// 刷新结果一览
		_updatebuyInfo: function(info) {
			this.view.update('#buyList', 'buyList', {
				buyInfo: info,
			})
		},
		// 刷新购物车中商品数量
		_updateCartNum: function(num) {
			this.$find('.cart-icon').attr('data-num', num);
		}
	};
	// グローバルに公開する
	h5.core.expose(shoppingCartController);
})();