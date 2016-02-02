;(function ($) {
  var focusModeFactory = function ($el, options) {
    this._defaults = {
      target: 'p',
      classes: {
        body: 'is-focus-active',
        container: 'focus-container',
        element: 'focus-target',
      },
      offsetIn: '0%',
      offsetOut: '0%'
    }

    this._options = $.extend(true, {}, this._defaults, options)

    this.options = function (options) {
      return (options) ?
        $.extend(true, this._options, options) :
        this._options
    }

    this.animationOffset = function () {
      var options = this.options()
      return {
        in: parseFloat(options.offsetIn) / 100.0,
        out: parseFloat(options.offsetOut) / 100.0
      }
    }

    this.elements = []

    this.init = function () {
      var options = this.options(),
        _this = this

      // setting classes
      if (options.classes.body) {
        $('body').addClass(options.classes.body)
      }
      $el.data('focusmode', this).addClass(options.classes.container)

      $el.find(options.target).each(function (i, child) {
        $(child).addClass(options.classes.element)

        _this.elements.push(child)
      })

      $(window).on('scroll.focusMode', {
        plugin: _this,
        elements: _this.elements
      }, this.scroll)
    }

    this.scroll = function (ev) {
      var windowHeight = $(window).height(),
        scrollTop = $(window).scrollTop(),
        plugin = ev.data.plugin,
        offset = plugin.animationOffset()

      // console.log(plugin)
      $.each(ev.data.elements, function (i, v) {
        var element = {
          top: $(v).offset().top,
          height: $(v).outerHeight(true)
        }

        if ((scrollTop + (windowHeight * (1 - offset.in))) > element.top && (scrollTop + windowHeight * offset.out) < (element.top + element.height)) {
          $(v).addClass('is-active')
        } else {
          $(v).removeClass('is-active')
        }
      })
    }

    this.destroy = function () {
      var options = this.options()
      $('body').removeClass(options.classes.body)
      $el.removeClass(options.classes.container).find(options.target).each(function (i, v) {
        $(v).removeClass(options.classes.element)
      })

      $(window).off('scroll.focusMode')
      $el.data('focusmode', false)
    }

  }

  $.fn.focusMode = function (methodOrOptions) {
    var method = (typeof methodOrOptions === 'string') ? methodOrOptions : undefined

    if (method) {
      var focusMode = []

      console.log(method, $(this).data())

      var instance = $(this).data('focusmode')
      if (instance) {
        if (typeof instance[method] == 'function') {
          instance[method]()
        }
      }
    } else {
      var options = (typeof methodOrOptions === 'object') ? methodOrOptions : undefined

      function init () {
        var $el = $(this),
          focusModeInstance = new focusModeFactory($el, options)

        focusModeInstance.init()
      }

      return this.each(init)
    }

  }

}(jQuery))
