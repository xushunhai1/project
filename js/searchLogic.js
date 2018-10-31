(function() {
	'use strict';
	// --- URL --- //
	var GET_BOOKLIST = 'bookData/';
	// 搜索栏Logic
	var searchLogic = {
		__name: 'ex7.SearchLogic',
		// 按条件获取书本信息
		getBookListData: function(page, condition) {
			var url = GET_BOOKLIST;
			if(page < 10) {
				url = GET_BOOKLIST + "page00" + page + ".json";
			}
			if(page >= 10) {
				remainder = page % 10;
				if(remainder === 0) {
					url = GET_BOOKLIST + "page010.json";
				} else {
					url = GET_BOOKLIST + "page00" + page + ".json";
				}
			}
			if(condition === "小说") {
				url = GET_BOOKLIST + 'novel.json';
			}
			var dfd = this.deferred();
			this._getBookData(url).done(function(data) {
				var result = null;
				if(typeof data === 'string') {
					result = JSON.parse(data);
				} else {
					result = data;
				}
				dfd.resolve(result);
			}).fail(function(error) {
				dfd.reject(error.message);
			});
			return dfd.promise();
		},
		// ajax请求书本信息
		_getBookData: function(url) {
			return h5.ajax(url, {
				type: 'GET',
				datatype: 'json'
			});
		},
	};
	// グローバルに公開する
	h5.core.expose(searchLogic)
})();