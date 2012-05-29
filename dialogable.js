/**
 * dialogable.js
 *
 * @author Jordan Stout <jordanstout@gmail.com>
 * @link   http://github.com/jstout24/dialogable.js
 */
;(function ($, window, undefined) {

    /**
     * Dialogable class definition.
     */
    function Dialogable(content, options) {
        this.options = $.extend({}, $.fn.dialogable.defaults, options);
        this.$element = $(content);
        this.$dialog = false;
    }

    Dialogable.prototype = {
        toggle: function () {
            return this[!this.$dialog ? 'show' : 'destroy']();
        },
        show: function() {
            var that = this,
                e = $.Event('show');

            this.$element.trigger(e);

            if (this.$dialog || e.isDefaultPrevented()) return;

            else initialize.call(this);

            this.$dialog.load(this.options.url, function() {
                positionDialog.call(that);
                $(this).show();
                that.$element.trigger('shown');
            });
        },
        destroy: function(e) {
            var that = this;

            e && e.preventDefault();
            e = $.Event('destroy');

            this.$element.trigger(e);

            if (!this.$dialog || e.isDefaultPrevented()) return;

            destroyDialog.call(this, function() {
                that.$element.trigger('destroyed');
            });
        }
    };

    /**
     * Private functions
     */
    function initialize() {
        this.$dialog = this.options.prototype.clone()
            .appendTo('body')
            .on('click.dismiss.dialogable', '[data-dismiss="dialog"]', $.proxy(this.destroy, this));
    }

    function destroyDialog(callback) {
        this.$dialog.remove();
        this.$dialog = false;
        callback();
    }

    function positionDialog() {
        var top = (($(window).height() - this.$dialog.outerHeight()) / 2) + $(window).scrollTop(),
            left = (($(window).width() - this.$dialog.outerWidth()) / 2) + $(window).scrollLeft();

        this.$dialog.css({
            position: 'absolute',
            margin: 0,
            top: top + 'px',
            left: left + 'px'
        });
    }

    /**
     * Dialogable plugin definition
     */
    $.fn.dialogable = function(option) {
        return this.each(function () {
            var dialogable = $.data(this, 'dialogable'),
                options = $.extend({}, $.fn.dialogable.defaults, { url: $(this).attr('href') },
                    $(this).data(), typeof option == 'object' && option
                );

            if (!dialogable) $.data(this, 'dialogable', (dialogable = new Dialogable(this, options)));

            if (typeof option == 'string')  dialogable[option]();
            else if (options.show) dialogable.show();
            else {
                $(this).bind('click.show.dialogable', function(e) {
                    e.preventDefault();
                    dialogable.toggle();
                });
            }
        })
    };

    $.fn.dialogable.defaults = {
        prototype: $('<div />', { class: 'dialog' }).hide()
    };

    /**
     * Dialogable data-api.
     */
    $(function () {
        $('body').on('click.dialogable.data-api', '[data-toggle="dialog"]', function (e) {
            e.preventDefault();
            $(this).dialogable('toggle');
        })
    })

}(jQuery, window));