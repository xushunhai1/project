(function() {
	'use strict';
	// 详细栏controller
	var detailController = {
		// name
		__name: 'ex7.DetailController',
		// template
		__templates: 'view/bookDetail.ejs',
		// book
		book: null,
		//定义定时器
		timer: null,
		//定时的时间
		time: 1000,
		flag: true,
		//展示详细信息
		showDetail: function(context) {
			this.view.update('#bookDetail', 'bookDetail', {
				book: context
			});
			this.book = context;
		},
		// 添加到购物车
		'#cartBtn click': function(context) {

			var information = this.book;
			if(this.flag) {
				this.flag = false;
				this.trigger('addToCart', {
					information: this.book
				});
				this.addSuccess();
			}
		},
		// 添加成功提示语
		addSuccess: function() {
			var that = this;
			this.__dispose();
			var $detail = this.$find('.detail');
			var $promp = $('<div class="success">已加入购物车！</div>');
			$detail.append($promp);
			this.timer = setTimeout(function() {
				$promp.remove();
				that.flag = true;
			}, this.time);
		},
		__dispose: function() {
			clearTimeout(this.timer);
		}
	};
	// グローバルに公開する
	h5.core.expose(detailController);
})();