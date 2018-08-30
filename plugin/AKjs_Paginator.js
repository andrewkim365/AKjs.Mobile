/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Paginator-------------------------------------------*/
(function ($) {
    $.AKjs_Paginator = function (el, options) {
        if(!(this instanceof $.AKjs_Paginator)){
            return new $.AKjs_Paginator(el, options);
        }
        var self = this;
        self.$container = $(el);
        self.$container.data('AKjs_Paginator', self);
        self.init = function () {
            self.$container.addClass("ak-pagination");
            if (options.first_text) {
                var first_text = '<li class="ak_first">'+options.first_text+'</li>';
            }
            if (options.prev_text) {
                var prev_text = '<li class="ak_prev">'+options.prev_text+'</li>';
            }
            if (options.next_text) {
                var next_text = '<li class="ak_next">'+options.next_text+'</li>';
            }
            if (options.last_text) {
                var last_text = '<li class="ak_last">'+options.last_text+'</li>';
            }
            self.options = $.extend({}, {
                ak_first: first_text,
                ak_prev: prev_text,
                ak_next: next_text,
                ak_last: last_text,
                ak_page: '<li class="ak_page">{{ak_page}}</li>'
            }, options);
            self.verify();
            self.extendJquery();
            self.render();
            self.fireEvent(this.options.currentPage, 'init');
        };
        self.verify = function () {
            var opts = self.options;
            if (!self.isNumber(opts.totalPages)) {
                throw new Error('[AKjs_Paginator] type error: totalPages');
            }
            if (!self.isNumber(opts.totalCounts)) {
                throw new Error('[AKjs_Paginator] type error: totalCounts');
            }
            if (!self.isNumber(opts.pageSize)) {
                throw new Error('[AKjs_Paginator] type error: pageSize');
            }
            if (!self.isNumber(opts.currentPage)) {
                throw new Error('[AKjs_Paginator] type error: currentPage');
            }
            if (!self.isNumber(opts.visiblePages)) {
                throw new Error('[AKjs_Paginator] type error: visiblePages');
            }
            if (!opts.totalPages && !opts.totalCounts) {
                throw new Error('[AKjs_Paginator] totalCounts or totalPages is required');
            }
            if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
                throw new Error('[AKjs_Paginator] pageSize is required');
            }
            if (opts.totalCounts && opts.pageSize) {
                opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
            }
            if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
                throw new Error('[AKjs_Paginator] currentPage is incorrect');
            }
            if (opts.totalPages < 1) {
                throw new Error('[AKjs_Paginator] totalPages cannot be less currentPage');
            }
        };
        self.extendJquery = function () {
            $.fn.AKjs_PaginatorHTML = function (s) {
                return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
            };
        };
        self.render = function () {
            self.renderHtml();
            self.setStatus();
            self.bindEvents();
        };
        self.renderHtml = function () {
            var html = [];
            var pages = self.getPages();
            for (var i = 0, j = pages.length; i < j; i++) {
                html.push(self.buildItem('ak_page', pages[i]));
            }
            self.isEnable('ak_prev') && html.unshift(self.buildItem('ak_prev', self.options.currentPage - 1));
            self.isEnable('ak_first') && html.unshift(self.buildItem('ak_first', 1));
            self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
            self.isEnable('ak_next') && html.push(self.buildItem('ak_next', self.options.currentPage + 1));
            self.isEnable('ak_last') && html.push(self.buildItem('ak_last', self.options.totalPages));
            self.$container.html(html.join(''));
        };
        self.buildItem = function (type, pageData) {
            var html = self.options[type]
                .replace(/{{ak_page}}/g, pageData)
                .replace(/{{totalPages}}/g, self.options.totalPages)
                .replace(/{{totalCounts}}/g, self.options.totalCounts);
            return $(html).attr({
                'data-role': type,
                'data-index': pageData
            }).AKjs_PaginatorHTML();
        };
        self.setStatus = function () {
            var options = self.options;
            if (!self.isEnable('ak_first') || options.currentPage === 1) {
                $('[data-role=ak_first]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_prev') || options.currentPage === 1) {
                $('[data-role=ak_prev]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_next') || options.currentPage >= options.totalPages) {
                $('[data-role=ak_next]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_last') || options.currentPage >= options.totalPages) {
                $('[data-role=ak_last]', self.$container).addClass(options.disableClass);
            }
            $('[data-role=ak_page]', self.$container).removeClass(options.activeClass);
            $('[data-role=ak_page][data-index=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
        };
        self.getPages = function () {
            var pages = [],
                visiblePages = self.options.visiblePages,
                currentPage = self.options.currentPage,
                totalPages = self.options.totalPages;
            if (visiblePages > totalPages) {
                visiblePages = totalPages;
            }
            var half = Math.floor(visiblePages / 2);
            var start = currentPage - half + 1 - visiblePages % 2;
            var end = currentPage + half;
            if (start < 1) {
                start = 1;
                end = visiblePages;
            }
            if (end > totalPages) {
                end = totalPages;
                start = 1 + totalPages - visiblePages;
            }
            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }
            return pages;
        };
        self.isNumber = function (value) {
            var type = typeof value;
            return type === 'number' || type === 'undefined';
        };
        self.isEnable = function (type) {
            return self.options[type] && typeof self.options[type] === 'string';
        };
        self.switchPage = function (pageIndex) {
            self.options.currentPage = pageIndex;
            self.render();
        };
        self.fireEvent = function (pageIndex, type) {
            return (typeof self.options.onPageChange !== 'function') || (self.options.onPageChange(pageIndex, type, self.$container) !== false);
        };
        self.callMethod = function (method, options) {
            switch (method) {
                case 'option':
                    self.options = $.extend({}, self.options, options);
                    self.verify();
                    self.render();
                    break;
                case 'destroy':
                    self.$container.empty();
                    self.$container.removeData('AKjs_Paginator');
                    break;
                default :
                    throw new Error('[AKjs_Paginator] method "' + method + '" does not exist');
            }
            return self.$container;
        };
        self.bindEvents = function () {
            var opts = self.options;
            self.$container.off();
            self.$container.on('click', '[data-role]', function () {
                var $el = $(this);
                if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
                    return;
                }
                var pageIndex = +$el.attr('data-index');
                if (self.fireEvent(pageIndex, 'change')) {
                    self.switchPage(pageIndex);
                }
            });
        };
        self.init();
        return self.$container;
    };
    $.AKjs_Paginator.defaultOptions = {
        first_text: 'First',
        prev_text: 'Previous',
        next_text: 'Next',
        last_text: 'Last',
        totalPages: 0,
        totalCounts: 0,
        pageSize: 0,
        currentPage: 1,
        visiblePages: 4,
        disableClass: 'disabled',
        activeClass: 'active',
        onPageChange: null
    };
    $.fn.AKjs_Paginator = function () {
        var self = this,
            args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
            var $instance = $(self).data('AKjs_Paginator');
            if (!$instance) {
                throw new Error('[AKjs_Paginator] the element is not instantiated');
            } else {
                return $instance.callMethod(args[0], args[1]);
            }
        } else {
            return new $.AKjs_Paginator(this, args[0]);
        }
    };

})(jQuery);