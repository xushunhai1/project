(function() {
	'use strict';
	// 搜索一览栏controller
	var searchController = {
		// name
		__name: 'ex7.SearchController',
		// searchLogic
		_searchLogic: ex7.SearchLogic,
		// template
		__templates: 'view/bookList.ejs',
		// data
		bookData: [],
		// page
		page: 1,
		// id
		index: 0,
		// 书籍一览初始化
		init: function() {
			this._searchLogic.getBookListData(this.page).done(this.own(this._updateBookInfo));
		},
		//获取书本信息并更新全局
		_updateBookInfo: function(data) {
			this.updateList(data.list);
			this.page++;
			this.index += data.list.length;
			this.bookData = this.bookData.concat(data.list);
		},
		//获取书本信息并添加到最后
		_appendBookInfo: function(data) {
			this.appendList(data.list);
			this.page++;
			this.index += data.list.length;
			this.bookData = this.bookData.concat(data.list);
		},
		// 刷新结果一览
		updateList: function(list) {
			this.view.update('#bookList', 'bookList', {
				list: list,
				index: this.index
			})
		},
		// 结果一览插入新加载数据
		appendList: function(list) {
			this.view.append('#bookList', 'bookList', {
				list: list,
				index: this.index
			})
		},
		// 种类搜索
		'#category blur': function() {
			var value = this.$find('#category').val();
			if(value) {
				this._searchLogic.getBookListData(0, value).done(this.own(this._updateBookInfo))
			}
		},
		// 滚动条动态加载
		'.result [scroll]': function(context, $el) {
			var _self = this;
			// 滚动条到底时
			if(this.isAtBottom($el)) {
				// 获取书籍信息
				this._searchLogic.getBookListData(this.page).done(this.own(this._appendBookInfo));
			}
		},
		// 选中书名，触发详细信息显示事件
		'.book click': function(context, $el) {
			this.$find('p.book').removeClass('bookSelected');
			$el.addClass('bookSelected');
			this.trigger('showDetail', {
				message: this.bookData[$el.data('id')]
			});

			this.trigger('backToDetail');
		},
		// 判断是否到底
		isAtBottom: function($el) {
			// 滚动条高度
			var scrollHeight = $el[0].scrollHeight;
			// 滚动条距离上部高度
			var scrollTop = $el[0].scrollTop;
			// 滚动区域高度
			var divHeight = $el[0].clientHeight;
			if(scrollTop + divHeight >= scrollHeight) {
				return true;
			}
			return false;
		}
	};
	// グローバルに公開する
	h5.core.expose(searchController);
})();