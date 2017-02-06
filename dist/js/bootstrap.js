/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function () {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
        }
      }

      this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.NEXT);
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (this._isSliding) {
        throw new Error('Carousel is sliding');
      }
      this._slide(Direction.PREV);
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .show, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if ($(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).find(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning) {
        throw new Error('Collapse is transitioning');
      }

      if (!$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE + '|' + SPACE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    SHOW: 'show'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', true);

      $(parent).toggleClass(ClassName.SHOW);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Dropdown(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this9 = this;

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this9.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this9._element)) {
            _this9._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this9._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this10 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning) {
        throw new Error('Modal is transitioning');
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this10._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this11 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this11._config.focus) {
          _this11._element.focus();
        }
        _this11._isTransitioning = false;
        $(_this11._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this12 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
          _this12._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this13 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this13.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this14 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this14._handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this15 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this15._resetAdjustments();
        _this15._resetScrollbar();
        $(_this15._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this16 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this16._ignoreBackdropClick) {
            _this16._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this16._config.backdrop === 'static') {
            _this16._element.focus();
          } else {
            _this16.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this16._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this17 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this17).is(':visible')) {
          _this17.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this18 = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this18._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this19 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this19._offsets.push(item[0]);
        _this19._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this20 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.LIST)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this20._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this20._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this21 = this;

      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = function complete() {
        return _this21._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (typeof Tether === 'undefined') {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: [],
    container: false
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array',
    container: '(string|element|boolean)'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._isTransitioning = false;
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this22 = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        if (this._isTransitioning) {
          throw new Error('Tooltip is transitioning');
        }
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(container);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.SHOW);

        var complete = function complete() {
          var prevHoverState = _this22._hoverState;
          _this22._hoverState = null;
          _this22._isTransitioning = false;

          $(_this22.element).trigger(_this22.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this22._leave(null, _this22);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this23 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      if (this._isTransitioning) {
        throw new Error('Tooltip is transitioning');
      }
      var complete = function complete() {
        if (_this23._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this23.element.removeAttribute('aria-describedby');
        $(_this23.element).trigger(_this23.constructor.Event.HIDDEN);
        _this23._isTransitioning = false;
        _this23.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this24 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this24.element).on(_this24.constructor.Event.CLICK, _this24.config.selector, function (event) {
            return _this24.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSEENTER : _this24.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this24.constructor.Event.MOUSELEAVE : _this24.constructor.Event.FOCUSOUT;

          $(_this24.element).on(eventIn, _this24.config.selector, function (event) {
            return _this24._enter(event);
          }).on(eventOut, _this24.config.selector, function (event) {
            return _this24._leave(event);
          });
        }

        $(_this24.element).closest('.modal').on('hide.bs.modal', function () {
          return _this24.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.6';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);

}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL3NyYy91dGlsLmpzIiwiLi4vLi4vanMvc3JjL2FsZXJ0LmpzIiwiLi4vLi4vanMvc3JjL2J1dHRvbi5qcyIsIi4uLy4uL2pzL3NyYy9jYXJvdXNlbC5qcyIsIi4uLy4uL2pzL3NyYy9jb2xsYXBzZS5qcyIsIi4uLy4uL2pzL3NyYy9kcm9wZG93bi5qcyIsIi4uLy4uL2pzL3NyYy9tb2RhbC5qcyIsIi4uLy4uL2pzL3NyYy9zY3JvbGxzcHkuanMiLCIuLi8uLi9qcy9zcmMvdGFiLmpzIiwiLi4vLi4vanMvc3JjL3Rvb2x0aXAuanMiLCIuLi8uLi9qcy9zcmMvcG9wb3Zlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQUcsQUFDSCxBQUFDLEFBQUMsQUFBQyxBQUEwRSxBQUM3RSxBQUFDLEFBQUMsQUFBQyxBQUFTLEFBQUMsQUFBQyxBQUFFLEFBQUMsQUFBQyxBQUFDLEFBQUMsQUFBQyxBQUFLLEFBQUMsQUFBQyxBQUFFLEFBQUMsQUFBSSxBQUFDLEFBQUUsQUFDdEMsQUFBQyxBQUFDLEFBQUMsQUFBUSxBQUFDLEFBQUssQUFBQyxBQUFHLEFBQUMsQUFBQyxBQUFLLEFBQUcsQUFBTSxBQUFDLEFBQUcsQUFBQyxBQUFJLEFBQUMsQUFBUyxBQUFDLEFBQUksQUFBQyxBQUFNLEFBQUMsQUFBTyxBQUFDLEFBQzdFLEFBQUMsQUFBQyxBQUFDLEFBQTBFLEFBQzdFLEFBQUMsQUFBRSxBQUNIOzs7Ozs7O0FBQ0EsQUFBSyxJQUFDLEFBQUksQUFBQyxBQUFDLGlCQUFLLEFBQUMsQUFBRSxHQUFDLEFBQUMsQUFDdEIsQUFDQSxBQUNBOztBQUFFLEFBQUcsQUFDTCxBQUFHLEFBQUMsQUFBQyxBQUF3RSxBQUM3RSxBQUFHLEFBQUMsQUFBQyxBQUFPLEFBQUMsQUFBYSxBQUFDLEFBQU8sQUFDbEMsQUFBRyxBQUFDLEFBQUMsQUFBd0UsQUFDN0UsQUFBRyxBQUFFLEFBQ0wsQUFDQTs7Ozs7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QUFBSyxNQUFDLEFBQWMsQUFBQyxnQkFBQyxBQUFRLFNBQUMsQUFBVyxBQUFDLGFBQUMsQUFBUSxBQUFDLFVBQUMsQUFBSyxBQUFDO0FBQUMsQUFBQyxBQUMvRTs7QUFBSSxBQUFHLFFBQUMsQUFBTSxBQUNkO0FBQUksQUFBSyxRQUFDLEFBQVEsQUFBQyxBQUFDLFdBQUMsQUFBSSxLQUFDLEFBQXNCLHVCQUFDLEFBQUksQUFBQyxBQUN0RCxBQUNBOztBQUFJLEFBQUUsQUFBQyxRQUFDLEFBQVEsQUFBQyxVQUFDLEFBQUMsQUFDbkI7QUFBTSxBQUFNLEFBQUMsQUFBQyxlQUFDLEVBQUUsQUFBUSxVQUFFLEFBQUMsQUFBQyxBQUM3QixBQUFJO0FBQUMsQUFDTCxBQUNBOztBQUFJLEFBQUssUUFBQyxBQUFNLEFBQUMsQUFBQyxTQUFDLEVBQUUsQUFBTSxRQUFFLEFBQUksS0FBQyxBQUFRLEFBQUMsQUFBQyxBQUFDLEFBQzdDLFlBQU0sQUFBQyxBQUFNLEFBQUMsQUFBQyxBQUFDLFdBQUMsRUFBRSxBQUFNLE9BQUksSUFBQyxFQUFFLEFBQU0sUUFBRSxBQUFJLEFBQUcsUUFBQyxFQUFFLEFBQUksTUFBRSxBQUFJLEFBQUcsQUFDL0QsQUFDQTs7QUFBSSxBQUFFLEFBQUMsUUFBQyxBQUFJLEtBQUMsQUFBTyxBQUFDLEFBQUcsWUFBQyxBQUFDLEFBQUMsQUFBQyxBQUFDLEFBQUUsT0FBQyxBQUFJLEtBQUMsQUFBTyxBQUFDLEFBQUcsWUFBQyxBQUFDLEFBQUksQUFBRSxRQUFDLEFBQUMsQUFDMUQ7QUFBTSxBQUFLLFlBQUMsQUFBYyxBQUFFLEFBQzVCLEFBQUk7QUFBQyxBQUNMLEFBQ0E7O0FBQUksQUFBSyxRQUFDLEFBQUMsQUFBTSxBQUFDLEFBQUMsWUFBRyxBQUFNLFFBQUUsQUFBRyxJQUFDLEFBQUssTUFBQyxBQUFJLEFBQUMsTUFBQyxVQUFDLEFBQVMsQUFBQyxBQUFDLEFBQUUsV0FBQyxBQUFDLEFBQzlEO0FBQU0sQUFBRSxBQUFDLFVBQUMsQUFBUyxVQUFDLEFBQWtCLEFBQUcsc0JBQUMsQUFBQyxB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N0UsQUFBRyxBQUFDLEFBQUMsQUFBTSxBQUNYLEFBQUcsQUFBQyxBQUFDLEFBQXdFLEFBQzdFLEFBQUcsQUFBRSxBQUNMLEFBQ0E7Ozs7OztBQUFFLElBQUUsQUFBRSxHQUFDLEFBQUksQUFBQyxBQUFhLEFBQUMsUUFBQyxBQUFPLFFBQUMsQUFBZ0IsQUFDbkQ7QUFBRSxJQUFFLEFBQUUsR0FBQyxBQUFJLE1BQUUsQUFBVyxBQUFDLEFBQUMsY0FBQyxBQUFPLEFBQ2xDO0FBQUUsSUFBRSxBQUFFLEdBQUMsQUFBSSxNQUFFLEFBQVUsQUFBRSxBQUFDLGFBQUMsQUFBUSxBQUFDLEFBQUUsWUFBQyxBQUFDLEFBQ3hDO0FBQUksTUFBRSxBQUFFLEdBQUMsQUFBSSxBQUFDLEFBQUMsQUFBQyxRQUFDLEFBQWtCLEFBQ25DO0FBQUksQUFBTSxXQUFDLEFBQU8sUUFBQyxBQUFnQixBQUNuQyxBQUFFO0FBQUMsQUFDSCxBQUNBOztBQUFFLEFBQU0sU0FBQyxBQUFPLEFBQ2hCLEFBQ0E7Q0F0S2dCLENBc0tiLEFBQU0sQUFBQyxBQUNWLEFBQ0EiLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IHV0aWwuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFV0aWwgPSAoKCQpID0+IHtcblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogUHJpdmF0ZSBUcmFuc2l0aW9uRW5kIEhlbHBlcnNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGxldCB0cmFuc2l0aW9uID0gZmFsc2VcblxuICBjb25zdCBNQVhfVUlEID0gMTAwMDAwMFxuXG4gIGNvbnN0IFRyYW5zaXRpb25FbmRFdmVudCA9IHtcbiAgICBXZWJraXRUcmFuc2l0aW9uIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIE1velRyYW5zaXRpb24gICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgT1RyYW5zaXRpb24gICAgICA6ICdvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCcsXG4gICAgdHJhbnNpdGlvbiAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICB9XG5cbiAgLy8gc2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuICBmdW5jdGlvbiB0b1R5cGUob2JqKSB7XG4gICAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxzKFthLXpBLVpdKykvKVsxXS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBpc0VsZW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmluZFR5cGU6IHRyYW5zaXRpb24uZW5kLFxuICAgICAgZGVsZWdhdGVUeXBlOiB0cmFuc2l0aW9uLmVuZCxcbiAgICAgIGhhbmRsZShldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZFRlc3QoKSB7XG4gICAgaWYgKHdpbmRvdy5RVW5pdCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib290c3RyYXAnKVxuXG4gICAgZm9yIChjb25zdCBuYW1lIGluIFRyYW5zaXRpb25FbmRFdmVudCkge1xuICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlbmQ6IFRyYW5zaXRpb25FbmRFdmVudFtuYW1lXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kRW11bGF0b3IoZHVyYXRpb24pIHtcbiAgICBsZXQgY2FsbGVkID0gZmFsc2VcblxuICAgICQodGhpcykub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsICgpID0+IHtcbiAgICAgIGNhbGxlZCA9IHRydWVcbiAgICB9KVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMpXG4gICAgICB9XG4gICAgfSwgZHVyYXRpb24pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKSB7XG4gICAgdHJhbnNpdGlvbiA9IHRyYW5zaXRpb25FbmRUZXN0KClcblxuICAgICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uRW5kRW11bGF0b3JcblxuICAgIGlmIChVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpKSB7XG4gICAgICAkLmV2ZW50LnNwZWNpYWxbVXRpbC5UUkFOU0lUSU9OX0VORF0gPSBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KClcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBQdWJsaWMgVXRpbCBBcGlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgVXRpbCA9IHtcblxuICAgIFRSQU5TSVRJT05fRU5EOiAnYnNUcmFuc2l0aW9uRW5kJyxcblxuICAgIGdldFVJRChwcmVmaXgpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKSAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgICAgcmV0dXJuIHByZWZpeFxuICAgIH0sXG5cbiAgICBnZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG5cbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnXG4gICAgICAgIHNlbGVjdG9yID0gL14jW2Etel0vaS50ZXN0KHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogbnVsbFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZWN0b3JcbiAgICB9LFxuXG4gICAgcmVmbG93KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodFxuICAgIH0sXG5cbiAgICB0cmlnZ2VyVHJhbnNpdGlvbkVuZChlbGVtZW50KSB7XG4gICAgICAkKGVsZW1lbnQpLnRyaWdnZXIodHJhbnNpdGlvbi5lbmQpXG4gICAgfSxcblxuICAgIHN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRyYW5zaXRpb24pXG4gICAgfSxcblxuICAgIHR5cGVDaGVja0NvbmZpZyhjb21wb25lbnROYW1lLCBjb25maWcsIGNvbmZpZ1R5cGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGNvbmZpZ1R5cGVzKSB7XG4gICAgICAgIGlmIChjb25maWdUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldXG4gICAgICAgICAgY29uc3QgdmFsdWUgICAgICAgICA9IGNvbmZpZ1twcm9wZXJ0eV1cbiAgICAgICAgICBjb25zdCB2YWx1ZVR5cGUgICAgID0gdmFsdWUgJiYgaXNFbGVtZW50KHZhbHVlKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSlcblxuICAgICAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYCR7Y29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpfTogYCArXG4gICAgICAgICAgICAgIGBPcHRpb24gXCIke3Byb3BlcnR5fVwiIHByb3ZpZGVkIHR5cGUgXCIke3ZhbHVlVHlwZX1cIiBgICtcbiAgICAgICAgICAgICAgYGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKVxuXG4gIHJldHVybiBVdGlsXG5cbn0pKGpRdWVyeSlcblxuXG4iLCJcblxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogYWxlcnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IEFsZXJ0ID0gKCgkKSA9PiB7XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdhbGVydCdcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICA9ICc0LjAuMC1hbHBoYS42J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmFsZXJ0J1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG4gIGNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSAxNTBcblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBESVNNSVNTIDogJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgfVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIENMT1NFICAgICAgICAgIDogYGNsb3NlJHtFVkVOVF9LRVl9YCxcbiAgICBDTE9TRUQgICAgICAgICA6IGBjbG9zZWQke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLX0RBVEFfQVBJIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIEFMRVJUIDogJ2FsZXJ0JyxcbiAgICBGQURFICA6ICdmYWRlJyxcbiAgICBTSE9XICA6ICdzaG93J1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIEFsZXJ0IHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuXG4gICAgLy8gcHVibGljXG5cbiAgICBjbG9zZShlbGVtZW50KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLl9lbGVtZW50XG5cbiAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudClcbiAgICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gdGhpcy5fdHJpZ2dlckNsb3NlRXZlbnQocm9vdEVsZW1lbnQpXG5cbiAgICAgIGlmIChjdXN0b21FdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVtb3ZlRWxlbWVudChyb290RWxlbWVudClcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgICB9XG5cblxuICAgIC8vIHByaXZhdGVcblxuICAgIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuICAgICAgbGV0IHBhcmVudCAgICAgPSBmYWxzZVxuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50ID0gJChzZWxlY3RvcilbMF1cbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50ID0gJChlbGVtZW50KS5jbG9zZXN0KGAuJHtDbGFzc05hbWUuQUxFUlR9YClbMF1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcmVudFxuICAgIH1cblxuICAgIF90cmlnZ2VyQ2xvc2VFdmVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBjbG9zZUV2ZW50ID0gJC5FdmVudChFdmVudC5DTE9TRSlcblxuICAgICAgJChlbGVtZW50KS50cmlnZ2VyKGNsb3NlRXZlbnQpXG4gICAgICByZXR1cm4gY2xvc2VFdmVudFxuICAgIH1cblxuICAgIF9yZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGlmICghVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB8fFxuICAgICAgICAgICEkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICB0aGlzLl9kZXN0cm95RWxlbWVudChlbGVtZW50KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgJChlbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCwgZXZlbnQpKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9XG5cbiAgICBfZGVzdHJveUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgJChlbGVtZW50KVxuICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgLnRyaWdnZXIoRXZlbnQuQ0xPU0VEKVxuICAgICAgICAucmVtb3ZlKClcbiAgICB9XG5cblxuICAgIC8vIHN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKHRoaXMpXG4gICAgICAgIGxldCBkYXRhICAgICAgID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IEFsZXJ0KHRoaXMpXG4gICAgICAgICAgJGVsZW1lbnQuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcgPT09ICdjbG9zZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10odGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2hhbmRsZURpc21pc3MoYWxlcnRJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH1cblxuICAgICAgICBhbGVydEluc3RhbmNlLmNsb3NlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKFxuICAgIEV2ZW50LkNMSUNLX0RBVEFfQVBJLFxuICAgIFNlbGVjdG9yLkRJU01JU1MsXG4gICAgQWxlcnQuX2hhbmRsZURpc21pc3MobmV3IEFsZXJ0KCkpXG4gIClcblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gQWxlcnQuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQWxlcnRcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBBbGVydFxuXG59KShqUXVlcnkpXG5cblxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IGJ1dHRvbi5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgQnV0dG9uID0gKCgkKSA9PiB7XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdidXR0b24nXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4wLjAtYWxwaGEuNidcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgICA9ICdicy5idXR0b24nXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICA9ICQuZm5bTkFNRV1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgQUNUSVZFIDogJ2FjdGl2ZScsXG4gICAgQlVUVE9OIDogJ2J0bicsXG4gICAgRk9DVVMgIDogJ2ZvY3VzJ1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgREFUQV9UT0dHTEVfQ0FSUk9UIDogJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLFxuICAgIERBVEFfVE9HR0xFICAgICAgICA6ICdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJyxcbiAgICBJTlBVVCAgICAgICAgICAgICAgOiAnaW5wdXQnLFxuICAgIEFDVElWRSAgICAgICAgICAgICA6ICcuYWN0aXZlJyxcbiAgICBCVVRUT04gICAgICAgICAgICAgOiAnLmJ0bidcbiAgfVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIENMSUNLX0RBVEFfQVBJICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gLFxuICAgIEZPQ1VTX0JMVVJfREFUQV9BUEkgOiBgZm9jdXMke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgKyBgYmx1ciR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBCdXR0b24ge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgICB9XG5cblxuICAgIC8vIGdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgIGxldCB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSB0cnVlXG4gICAgICBjb25zdCByb290RWxlbWVudCAgICAgID0gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KFxuICAgICAgICBTZWxlY3Rvci5EQVRBX1RPR0dMRVxuICAgICAgKVswXVxuXG4gICAgICBpZiAocm9vdEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSAkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuSU5QVVQpWzBdXG5cbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5jaGVja2VkICYmXG4gICAgICAgICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkpIHtcbiAgICAgICAgICAgICAgdHJpZ2dlckNoYW5nZUV2ZW50ID0gZmFsc2VcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9ICQocm9vdEVsZW1lbnQpLmZpbmQoU2VsZWN0b3IuQUNUSVZFKVswXVxuXG4gICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJChhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9ICEkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICAgICAkKGlucHV0KS50cmlnZ2VyKCdjaGFuZ2UnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlucHV0LmZvY3VzKClcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLFxuICAgICAgICAhJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSlcblxuICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsXG4gICAgfVxuXG5cbiAgICAvLyBzdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQnV0dG9uKHRoaXMpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ3RvZ2dsZScpIHtcbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEVfQ0FSUk9ULCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgbGV0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldFxuXG4gICAgICBpZiAoISQoYnV0dG9uKS5oYXNDbGFzcyhDbGFzc05hbWUuQlVUVE9OKSkge1xuICAgICAgICBidXR0b24gPSAkKGJ1dHRvbikuY2xvc2VzdChTZWxlY3Rvci5CVVRUT04pXG4gICAgICB9XG5cbiAgICAgIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJChidXR0b24pLCAndG9nZ2xlJylcbiAgICB9KVxuICAgIC5vbihFdmVudC5GT0NVU19CTFVSX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRV9DQVJST1QsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9uID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoU2VsZWN0b3IuQlVUVE9OKVswXVxuICAgICAgJChidXR0b24pLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5GT0NVUywgL15mb2N1cyhpbik/JC8udGVzdChldmVudC50eXBlKSlcbiAgICB9KVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gICAgICAgICAgICAgPSBCdXR0b24uX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQnV0dG9uXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBCdXR0b24uX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIEJ1dHRvblxuXG59KShqUXVlcnkpXG5cblxuIiwiXG5cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IGNhcm91c2VsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBDYXJvdXNlbCA9ICgoJCkgPT4ge1xuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAnY2Fyb3VzZWwnXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4wLjAtYWxwaGEuNidcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgICA9ICdicy5jYXJvdXNlbCdcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IERBVEFfQVBJX0tFWSAgICAgICAgPSAnLmRhdGEtYXBpJ1xuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuICBjb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OID0gNjAwXG4gIGNvbnN0IEFSUk9XX0xFRlRfS0VZQ09ERSAgPSAzNyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBsZWZ0IGFycm93IGtleVxuICBjb25zdCBBUlJPV19SSUdIVF9LRVlDT0RFID0gMzkgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgcmlnaHQgYXJyb3cga2V5XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBpbnRlcnZhbCA6IDUwMDAsXG4gICAga2V5Ym9hcmQgOiB0cnVlLFxuICAgIHNsaWRlICAgIDogZmFsc2UsXG4gICAgcGF1c2UgICAgOiAnaG92ZXInLFxuICAgIHdyYXAgICAgIDogdHJ1ZVxuICB9XG5cbiAgY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gICAgaW50ZXJ2YWwgOiAnKG51bWJlcnxib29sZWFuKScsXG4gICAga2V5Ym9hcmQgOiAnYm9vbGVhbicsXG4gICAgc2xpZGUgICAgOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gICAgcGF1c2UgICAgOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgd3JhcCAgICAgOiAnYm9vbGVhbidcbiAgfVxuXG4gIGNvbnN0IERpcmVjdGlvbiA9IHtcbiAgICBORVhUICAgICA6ICduZXh0JyxcbiAgICBQUkVWICAgICA6ICdwcmV2JyxcbiAgICBMRUZUICAgICA6ICdsZWZ0JyxcbiAgICBSSUdIVCAgICA6ICdyaWdodCdcbiAgfVxuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIFNMSURFICAgICAgICAgIDogYHNsaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBTTElEICAgICAgICAgICA6IGBzbGlkJHtFVkVOVF9LRVl9YCxcbiAgICBLRVlET1dOICAgICAgICA6IGBrZXlkb3duJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUVOVEVSICAgICA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUxFQVZFICAgICA6IGBtb3VzZWxlYXZlJHtFVkVOVF9LRVl9YCxcbiAgICBMT0FEX0RBVEFfQVBJICA6IGBsb2FkJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBDQVJPVVNFTCA6ICdjYXJvdXNlbCcsXG4gICAgQUNUSVZFICAgOiAnYWN0aXZlJyxcbiAgICBTTElERSAgICA6ICdzbGlkZScsXG4gICAgUklHSFQgICAgOiAnY2Fyb3VzZWwtaXRlbS1yaWdodCcsXG4gICAgTEVGVCAgICAgOiAnY2Fyb3VzZWwtaXRlbS1sZWZ0JyxcbiAgICBORVhUICAgICA6ICdjYXJvdXNlbC1pdGVtLW5leHQnLFxuICAgIFBSRVYgICAgIDogJ2Nhcm91c2VsLWl0ZW0tcHJldicsXG4gICAgSVRFTSAgICAgOiAnY2Fyb3VzZWwtaXRlbSdcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEFDVElWRSAgICAgIDogJy5hY3RpdmUnLFxuICAgIEFDVElWRV9JVEVNIDogJy5hY3RpdmUuY2Fyb3VzZWwtaXRlbScsXG4gICAgSVRFTSAgICAgICAgOiAnLmNhcm91c2VsLWl0ZW0nLFxuICAgIE5FWFRfUFJFViAgIDogJy5jYXJvdXNlbC1pdGVtLW5leHQsIC5jYXJvdXNlbC1pdGVtLXByZXYnLFxuICAgIElORElDQVRPUlMgIDogJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyxcbiAgICBEQVRBX1NMSURFICA6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gICAgREFUQV9SSURFICAgOiAnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJ1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIENhcm91c2VsIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5faXRlbXMgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pbnRlcnZhbCAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgICAgID0gbnVsbFxuXG4gICAgICB0aGlzLl9pc1BhdXNlZCAgICAgICAgICA9IGZhbHNlXG4gICAgICB0aGlzLl9pc1NsaWRpbmcgICAgICAgICA9IGZhbHNlXG5cbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgID0gJChlbGVtZW50KVswXVxuICAgICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuSU5ESUNBVE9SUylbMF1cblxuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cblxuXG4gICAgLy8gZ2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFxuICAgIH1cblxuXG4gICAgLy8gcHVibGljXG5cbiAgICBuZXh0KCkge1xuICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhcm91c2VsIGlzIHNsaWRpbmcnKVxuICAgICAgfVxuICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLk5FWFQpXG4gICAgfVxuXG4gICAgbmV4dFdoZW5WaXNpYmxlKCkge1xuICAgICAgLy8gRG9uJ3QgY2FsbCBuZXh0IHdoZW4gdGhlIHBhZ2UgaXNuJ3QgdmlzaWJsZVxuICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgdGhpcy5uZXh0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2KCkge1xuICAgICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhcm91c2VsIGlzIHNsaWRpbmcnKVxuICAgICAgfVxuICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLlBSRVYpXG4gICAgfVxuXG4gICAgcGF1c2UoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuTkVYVF9QUkVWKVswXSAmJlxuICAgICAgICBVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpKSB7XG4gICAgICAgIFV0aWwudHJpZ2dlclRyYW5zaXRpb25FbmQodGhpcy5fZWxlbWVudClcbiAgICAgICAgdGhpcy5jeWNsZSh0cnVlKVxuICAgICAgfVxuXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKVxuICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsXG4gICAgfVxuXG4gICAgY3ljbGUoZXZlbnQpIHtcbiAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuaW50ZXJ2YWwgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA/IHRoaXMubmV4dFdoZW5WaXNpYmxlIDogdGhpcy5uZXh0KS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHRoaXMuX2NvbmZpZy5pbnRlcnZhbFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgdG8oaW5kZXgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuQUNUSVZFX0lURU0pWzBdXG5cbiAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHRoaXMuX2FjdGl2ZUVsZW1lbnQpXG5cbiAgICAgIGlmIChpbmRleCA+IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub25lKEV2ZW50LlNMSUQsICgpID0+IHRoaXMudG8oaW5kZXgpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgICAgdGhpcy5jeWNsZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBpbmRleCA+IGFjdGl2ZUluZGV4ID9cbiAgICAgICAgRGlyZWN0aW9uLk5FWFQgOlxuICAgICAgICBEaXJlY3Rpb24uUFJFVlxuXG4gICAgICB0aGlzLl9zbGlkZShkaXJlY3Rpb24sIHRoaXMuX2l0ZW1zW2luZGV4XSlcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKVxuICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKVxuXG4gICAgICB0aGlzLl9pdGVtcyAgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pbnRlcnZhbCAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2lzUGF1c2VkICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNTbGlkaW5nICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9hY3RpdmVFbGVtZW50ICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2luZGljYXRvcnNFbGVtZW50ID0gbnVsbFxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpXG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIGlmICh0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAgIC5vbihFdmVudC5LRVlET1dOLCAoZXZlbnQpID0+IHRoaXMuX2tleWRvd24oZXZlbnQpKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInICYmXG4gICAgICAgICEoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgICAgLm9uKEV2ZW50Lk1PVVNFRU5URVIsIChldmVudCkgPT4gdGhpcy5wYXVzZShldmVudCkpXG4gICAgICAgICAgLm9uKEV2ZW50Lk1PVVNFTEVBVkUsIChldmVudCkgPT4gdGhpcy5jeWNsZShldmVudCkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX2tleWRvd24oZXZlbnQpIHtcbiAgICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIEFSUk9XX0xFRlRfS0VZQ09ERTpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgdGhpcy5wcmV2KClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEFSUk9XX1JJR0hUX0tFWUNPREU6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHRoaXMubmV4dCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2l0ZW1zID0gJC5tYWtlQXJyYXkoJChlbGVtZW50KS5wYXJlbnQoKS5maW5kKFNlbGVjdG9yLklURU0pKVxuICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmluZGV4T2YoZWxlbWVudClcbiAgICB9XG5cbiAgICBfZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudCkge1xuICAgICAgY29uc3QgaXNOZXh0RGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVFxuICAgICAgY29uc3QgaXNQcmV2RGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFVlxuICAgICAgY29uc3QgYWN0aXZlSW5kZXggICAgID0gdGhpcy5fZ2V0SXRlbUluZGV4KGFjdGl2ZUVsZW1lbnQpXG4gICAgICBjb25zdCBsYXN0SXRlbUluZGV4ICAgPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxXG4gICAgICBjb25zdCBpc0dvaW5nVG9XcmFwICAgPSBpc1ByZXZEaXJlY3Rpb24gJiYgYWN0aXZlSW5kZXggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTmV4dERpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gbGFzdEl0ZW1JbmRleFxuXG4gICAgICBpZiAoaXNHb2luZ1RvV3JhcCAmJiAhdGhpcy5fY29uZmlnLndyYXApIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUVsZW1lbnRcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVsdGEgICAgID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFViA/IC0xIDogMVxuICAgICAgY29uc3QgaXRlbUluZGV4ID0gKGFjdGl2ZUluZGV4ICsgZGVsdGEpICUgdGhpcy5faXRlbXMubGVuZ3RoXG5cbiAgICAgIHJldHVybiBpdGVtSW5kZXggPT09IC0xID9cbiAgICAgICAgdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV0gOiB0aGlzLl9pdGVtc1tpdGVtSW5kZXhdXG4gICAgfVxuXG5cbiAgICBfdHJpZ2dlclNsaWRlRXZlbnQocmVsYXRlZFRhcmdldCwgZXZlbnREaXJlY3Rpb25OYW1lKSB7XG4gICAgICBjb25zdCBzbGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5TTElERSwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0LFxuICAgICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZVxuICAgICAgfSlcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRlRXZlbnQpXG5cbiAgICAgIHJldHVybiBzbGlkZUV2ZW50XG4gICAgfVxuXG4gICAgX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuX2luZGljYXRvcnNFbGVtZW50KSB7XG4gICAgICAgICQodGhpcy5faW5kaWNhdG9yc0VsZW1lbnQpXG4gICAgICAgICAgLmZpbmQoU2VsZWN0b3IuQUNUSVZFKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuXG4gICAgICAgIGNvbnN0IG5leHRJbmRpY2F0b3IgPSB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5jaGlsZHJlbltcbiAgICAgICAgICB0aGlzLl9nZXRJdGVtSW5kZXgoZWxlbWVudClcbiAgICAgICAgXVxuXG4gICAgICAgIGlmIChuZXh0SW5kaWNhdG9yKSB7XG4gICAgICAgICAgJChuZXh0SW5kaWNhdG9yKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgX3NsaWRlKGRpcmVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuZmluZChTZWxlY3Rvci5BQ1RJVkVfSVRFTSlbMF1cbiAgICAgIGNvbnN0IG5leHRFbGVtZW50ICAgPSBlbGVtZW50IHx8IGFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgdGhpcy5fZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudClcblxuICAgICAgY29uc3QgaXNDeWNsaW5nID0gQm9vbGVhbih0aGlzLl9pbnRlcnZhbClcblxuICAgICAgbGV0IGRpcmVjdGlvbmFsQ2xhc3NOYW1lXG4gICAgICBsZXQgb3JkZXJDbGFzc05hbWVcbiAgICAgIGxldCBldmVudERpcmVjdGlvbk5hbWVcblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgICAgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBDbGFzc05hbWUuTEVGVFxuICAgICAgICBvcmRlckNsYXNzTmFtZSA9IENsYXNzTmFtZS5ORVhUXG4gICAgICAgIGV2ZW50RGlyZWN0aW9uTmFtZSA9IERpcmVjdGlvbi5MRUZUXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXJlY3Rpb25hbENsYXNzTmFtZSA9IENsYXNzTmFtZS5SSUdIVFxuICAgICAgICBvcmRlckNsYXNzTmFtZSA9IENsYXNzTmFtZS5QUkVWXG4gICAgICAgIGV2ZW50RGlyZWN0aW9uTmFtZSA9IERpcmVjdGlvbi5SSUdIVFxuICAgICAgfVxuXG4gICAgICBpZiAobmV4dEVsZW1lbnQgJiYgJChuZXh0RWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkpIHtcbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNsaWRlRXZlbnQgPSB0aGlzLl90cmlnZ2VyU2xpZGVFdmVudChuZXh0RWxlbWVudCwgZXZlbnREaXJlY3Rpb25OYW1lKVxuICAgICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZlRWxlbWVudCB8fCAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgLy8gc29tZSB3ZWlyZG5lc3MgaXMgaGFwcGVuaW5nLCBzbyB3ZSBiYWlsXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc1NsaWRpbmcgPSB0cnVlXG5cbiAgICAgIGlmIChpc0N5Y2xpbmcpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQobmV4dEVsZW1lbnQpXG5cbiAgICAgIGNvbnN0IHNsaWRFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0xJRCwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiBuZXh0RWxlbWVudCxcbiAgICAgICAgZGlyZWN0aW9uOiBldmVudERpcmVjdGlvbk5hbWVcbiAgICAgIH0pXG5cbiAgICAgIGlmIChVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmXG4gICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNMSURFKSkge1xuXG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKG9yZGVyQ2xhc3NOYW1lKVxuXG4gICAgICAgIFV0aWwucmVmbG93KG5leHRFbGVtZW50KVxuXG4gICAgICAgICQoYWN0aXZlRWxlbWVudCkuYWRkQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUpXG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKVxuXG4gICAgICAgICQoYWN0aXZlRWxlbWVudClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsICgpID0+IHtcbiAgICAgICAgICAgICQobmV4dEVsZW1lbnQpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhgJHtkaXJlY3Rpb25hbENsYXNzTmFtZX0gJHtvcmRlckNsYXNzTmFtZX1gKVxuICAgICAgICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcblxuICAgICAgICAgICAgJChhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhgJHtDbGFzc05hbWUuQUNUSVZFfSAke29yZGVyQ2xhc3NOYW1lfSAke2RpcmVjdGlvbmFsQ2xhc3NOYW1lfWApXG5cbiAgICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudCksIDApXG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3ljbGluZykge1xuICAgICAgICB0aGlzLmN5Y2xlKClcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgICAgICA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCAkKHRoaXMpLmRhdGEoKSlcblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAkLmV4dGVuZChfY29uZmlnLCBjb25maWcpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhY3Rpb24gPSB0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyA/IGNvbmZpZyA6IF9jb25maWcuc2xpZGVcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIF9jb25maWcpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZGF0YS50byhjb25maWcpXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVthY3Rpb25dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHthY3Rpb259XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2FjdGlvbl0oKVxuICAgICAgICB9IGVsc2UgaWYgKF9jb25maWcuaW50ZXJ2YWwpIHtcbiAgICAgICAgICBkYXRhLnBhdXNlKClcbiAgICAgICAgICBkYXRhLmN5Y2xlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2RhdGFBcGlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpXG5cbiAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICQoc2VsZWN0b3IpWzBdXG5cbiAgICAgIGlmICghdGFyZ2V0IHx8ICEkKHRhcmdldCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNBUk9VU0VMKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnICAgICA9ICQuZXh0ZW5kKHt9LCAkKHRhcmdldCkuZGF0YSgpLCAkKHRoaXMpLmRhdGEoKSlcbiAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZS10bycpXG5cbiAgICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAgIGNvbmZpZy5pbnRlcnZhbCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRhcmdldCksIGNvbmZpZylcblxuICAgICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpLnRvKHNsaWRlSW5kZXgpXG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudClcbiAgICAub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfU0xJREUsIENhcm91c2VsLl9kYXRhQXBpQ2xpY2tIYW5kbGVyKVxuXG4gICQod2luZG93KS5vbihFdmVudC5MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gICAgJChTZWxlY3Rvci5EQVRBX1JJREUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGNhcm91c2VsID0gJCh0aGlzKVxuICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gICAgICAgICAgICAgPSBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDYXJvdXNlbFxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIENhcm91c2VsXG5cbn0pKGpRdWVyeSlcblxuXG4iLCJcblxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IENvbGxhcHNlID0gKCgkKSA9PiB7XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbnN0YW50c1xuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdjb2xsYXBzZSdcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICA9ICc0LjAuMC1hbHBoYS42J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmNvbGxhcHNlJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG4gIGNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSA2MDBcblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIHRvZ2dsZSA6IHRydWUsXG4gICAgcGFyZW50IDogJydcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIHRvZ2dsZSA6ICdib29sZWFuJyxcbiAgICBwYXJlbnQgOiAnc3RyaW5nJ1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgU0hPVyAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gICAgU0hPV04gICAgICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICAgIEhJREUgICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICAgIEhJRERFTiAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0tfREFUQV9BUEkgOiBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG4gIH1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgU0hPVyAgICAgICA6ICdzaG93JyxcbiAgICBDT0xMQVBTRSAgIDogJ2NvbGxhcHNlJyxcbiAgICBDT0xMQVBTSU5HIDogJ2NvbGxhcHNpbmcnLFxuICAgIENPTExBUFNFRCAgOiAnY29sbGFwc2VkJ1xuICB9XG5cbiAgY29uc3QgRGltZW5zaW9uID0ge1xuICAgIFdJRFRIICA6ICd3aWR0aCcsXG4gICAgSEVJR0hUIDogJ2hlaWdodCdcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEFDVElWRVMgICAgIDogJy5jYXJkID4gLnNob3csIC5jYXJkID4gLmNvbGxhcHNpbmcnLFxuICAgIERBVEFfVE9HR0xFIDogJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJ1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIENvbGxhcHNlIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgICAgPSAkLm1ha2VBcnJheSgkKFxuICAgICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMke2VsZW1lbnQuaWR9XCJdLGAgK1xuICAgICAgICBgW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJHtlbGVtZW50LmlkfVwiXWBcbiAgICAgICkpXG5cbiAgICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnQgPyB0aGlzLl9nZXRQYXJlbnQoKSA6IG51bGxcblxuICAgICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLl9lbGVtZW50LCB0aGlzLl90cmlnZ2VyQXJyYXkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcudG9nZ2xlKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlKClcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIGdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRcbiAgICB9XG5cblxuICAgIC8vIHB1YmxpY1xuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKVxuICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29sbGFwc2UgaXMgdHJhbnNpdGlvbmluZycpXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IGFjdGl2ZXNcbiAgICAgIGxldCBhY3RpdmVzRGF0YVxuXG4gICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIGFjdGl2ZXMgPSAkLm1ha2VBcnJheSgkKHRoaXMuX3BhcmVudCkuZmluZChTZWxlY3Rvci5BQ1RJVkVTKSlcbiAgICAgICAgaWYgKCFhY3RpdmVzLmxlbmd0aCkge1xuICAgICAgICAgIGFjdGl2ZXMgPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZXMpIHtcbiAgICAgICAgYWN0aXZlc0RhdGEgPSAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGlmIChhY3RpdmVzRGF0YSAmJiBhY3RpdmVzRGF0YS5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhcnRFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVylcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVzKSB7XG4gICAgICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKGFjdGl2ZXMpLCAnaGlkZScpXG4gICAgICAgIGlmICghYWN0aXZlc0RhdGEpIHtcbiAgICAgICAgICAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVksIG51bGwpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDBcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgICAgaWYgKHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgJCh0aGlzLl90cmlnZ2VyQXJyYXkpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSlcblxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG4gICAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJydcblxuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpXG5cbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LlNIT1dOKVxuICAgICAgfVxuXG4gICAgICBpZiAoIVV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkpIHtcbiAgICAgICAgY29tcGxldGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FwaXRhbGl6ZWREaW1lbnNpb24gPSBkaW1lbnNpb25bMF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSgxKVxuICAgICAgY29uc3Qgc2Nyb2xsU2l6ZSAgICAgICAgICAgPSBgc2Nyb2xsJHtjYXBpdGFsaXplZERpbWVuc2lvbn1gXG5cbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IGAke3RoaXMuX2VsZW1lbnRbc2Nyb2xsU2l6ZV19cHhgXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2xsYXBzZSBpcyB0cmFuc2l0aW9uaW5nJylcbiAgICAgIH1cblxuICAgICAgaWYgKCEkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhcnRFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSlcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpbWVuc2lvbiAgICAgICA9IHRoaXMuX2dldERpbWVuc2lvbigpXG4gICAgICBjb25zdCBvZmZzZXREaW1lbnNpb24gPSBkaW1lbnNpb24gPT09IERpbWVuc2lvbi5XSURUSCA/XG4gICAgICAgICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0J1xuXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50W29mZnNldERpbWVuc2lvbl19cHhgXG5cbiAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICAgIGlmICh0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICQodGhpcy5fdHJpZ2dlckFycmF5KVxuICAgICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKGZhbHNlKVxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKVxuICAgICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpXG4gICAgICAgICAgLnRyaWdnZXIoRXZlbnQuSElEREVOKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJ1xuXG4gICAgICBpZiAoIVV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkpIHtcbiAgICAgICAgY29tcGxldGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9XG5cbiAgICBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gaXNUcmFuc2l0aW9uaW5nXG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fcGFyZW50ICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdHJpZ2dlckFycmF5ICAgID0gbnVsbFxuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gbnVsbFxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpXG4gICAgICBjb25maWcudG9nZ2xlID0gQm9vbGVhbihjb25maWcudG9nZ2xlKSAvLyBjb2VyY2Ugc3RyaW5nIHZhbHVlc1xuICAgICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSlcbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG5cbiAgICBfZ2V0RGltZW5zaW9uKCkge1xuICAgICAgY29uc3QgaGFzV2lkdGggPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKERpbWVuc2lvbi5XSURUSClcbiAgICAgIHJldHVybiBoYXNXaWR0aCA/IERpbWVuc2lvbi5XSURUSCA6IERpbWVuc2lvbi5IRUlHSFRcbiAgICB9XG5cbiAgICBfZ2V0UGFyZW50KCkge1xuICAgICAgY29uc3QgcGFyZW50ICAgPSAkKHRoaXMuX2NvbmZpZy5wYXJlbnQpWzBdXG4gICAgICBjb25zdCBzZWxlY3RvciA9XG4gICAgICAgIGBbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIiR7dGhpcy5fY29uZmlnLnBhcmVudH1cIl1gXG5cbiAgICAgICQocGFyZW50KS5maW5kKHNlbGVjdG9yKS5lYWNoKChpLCBlbGVtZW50KSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhcbiAgICAgICAgICBDb2xsYXBzZS5fZ2V0VGFyZ2V0RnJvbUVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgW2VsZW1lbnRdXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBwYXJlbnRcbiAgICB9XG5cbiAgICBfYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKGVsZW1lbnQsIHRyaWdnZXJBcnJheSkge1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaXNPcGVuID0gJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG5cbiAgICAgICAgaWYgKHRyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAkKHRyaWdnZXJBcnJheSlcbiAgICAgICAgICAgIC50b2dnbGVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VELCAhaXNPcGVuKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHN0YXRpY1xuXG4gICAgc3RhdGljIF9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuICAgICAgcmV0dXJuIHNlbGVjdG9yID8gJChzZWxlY3RvcilbMF0gOiBudWxsXG4gICAgfVxuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJHRoaXMgICA9ICQodGhpcylcbiAgICAgICAgbGV0IGRhdGEgICAgICA9ICR0aGlzLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSAkLmV4dGVuZChcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBEZWZhdWx0LFxuICAgICAgICAgICR0aGlzLmRhdGEoKSxcbiAgICAgICAgICB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcbiAgICAgICAgKVxuXG4gICAgICAgIGlmICghZGF0YSAmJiBfY29uZmlnLnRvZ2dsZSAmJiAvc2hvd3xoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICBfY29uZmlnLnRvZ2dsZSA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IENvbGxhcHNlKHRoaXMsIF9jb25maWcpXG4gICAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KHRoaXMpXG4gICAgY29uc3QgZGF0YSAgID0gJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpXG4gICAgY29uc3QgY29uZmlnID0gZGF0YSA/ICd0b2dnbGUnIDogJCh0aGlzKS5kYXRhKClcblxuICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRhcmdldCksIGNvbmZpZylcbiAgfSlcblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZVxuICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBDb2xsYXBzZVxuXG59KShqUXVlcnkpXG5cblxuIiwiXG5cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IGRyb3Bkb3duLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBEcm9wZG93biA9ICgoJCkgPT4ge1xuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgICA9ICdkcm9wZG93bidcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICAgICAgID0gJzQuMC4wLWFscGhhLjYnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgICAgICA9ICdicy5kcm9wZG93bidcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICAgICAgID0gJC5mbltOQU1FXVxuICBjb25zdCBFU0NBUEVfS0VZQ09ERSAgICAgICAgICAgPSAyNyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG4gIGNvbnN0IFNQQUNFX0tFWUNPREUgICAgICAgICAgICA9IDMyIC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHNwYWNlIGtleVxuICBjb25zdCBBUlJPV19VUF9LRVlDT0RFICAgICAgICAgPSAzOCAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciB1cCBhcnJvdyBrZXlcbiAgY29uc3QgQVJST1dfRE9XTl9LRVlDT0RFICAgICAgID0gNDAgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgZG93biBhcnJvdyBrZXlcbiAgY29uc3QgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMyAvLyBNb3VzZUV2ZW50LndoaWNoIHZhbHVlIGZvciB0aGUgcmlnaHQgYnV0dG9uIChhc3N1bWluZyBhIHJpZ2h0LWhhbmRlZCBtb3VzZSlcbiAgY29uc3QgUkVHRVhQX0tFWURPV04gPSBuZXcgUmVnRXhwKGAke0FSUk9XX1VQX0tFWUNPREV9fCR7QVJST1dfRE9XTl9LRVlDT0RFfXwke0VTQ0FQRV9LRVlDT0RFfXwke1NQQUNFX0tFWUNPREV9YClcblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICAgIEhJRERFTiAgICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XICAgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLICAgICAgICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICAgIENMSUNLX0RBVEFfQVBJICAgOiBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gLFxuICAgIEZPQ1VTSU5fREFUQV9BUEkgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gICAgS0VZRE9XTl9EQVRBX0FQSSA6IGBrZXlkb3duJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIEJBQ0tEUk9QIDogJ2Ryb3Bkb3duLWJhY2tkcm9wJyxcbiAgICBESVNBQkxFRCA6ICdkaXNhYmxlZCcsXG4gICAgU0hPVyAgICAgOiAnc2hvdydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEJBQ0tEUk9QICAgICAgOiAnLmRyb3Bkb3duLWJhY2tkcm9wJyxcbiAgICBEQVRBX1RPR0dMRSAgIDogJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyxcbiAgICBGT1JNX0NISUxEICAgIDogJy5kcm9wZG93biBmb3JtJyxcbiAgICBST0xFX01FTlUgICAgIDogJ1tyb2xlPVwibWVudVwiXScsXG4gICAgUk9MRV9MSVNUQk9YICA6ICdbcm9sZT1cImxpc3Rib3hcIl0nLFxuICAgIE5BVkJBUl9OQVYgICAgOiAnLm5hdmJhci1uYXYnLFxuICAgIFZJU0lCTEVfSVRFTVMgOiAnW3JvbGU9XCJtZW51XCJdIGxpOm5vdCguZGlzYWJsZWQpIGEsICdcbiAgICAgICAgICAgICAgICAgICsgJ1tyb2xlPVwibGlzdGJveFwiXSBsaTpub3QoLmRpc2FibGVkKSBhJ1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIERyb3Bkb3duIHtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG5cblxuICAgIC8vIGdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyZW50ICAgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcylcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICBEcm9wZG93bi5fY2xlYXJNZW51cygpXG5cbiAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxuICAgICAgICAgISQocGFyZW50KS5jbG9zZXN0KFNlbGVjdG9yLk5BVkJBUl9OQVYpLmxlbmd0aCkge1xuXG4gICAgICAgIC8vIGlmIG1vYmlsZSB3ZSB1c2UgYSBiYWNrZHJvcCBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkb24ndCBkZWxlZ2F0ZVxuICAgICAgICBjb25zdCBkcm9wZG93biAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBkcm9wZG93bi5jbGFzc05hbWUgPSBDbGFzc05hbWUuQkFDS0RST1BcbiAgICAgICAgJChkcm9wZG93bikuaW5zZXJ0QmVmb3JlKHRoaXMpXG4gICAgICAgICQoZHJvcGRvd24pLm9uKCdjbGljaycsIERyb3Bkb3duLl9jbGVhck1lbnVzKVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0IDogdGhpc1xuICAgICAgfVxuICAgICAgY29uc3Qgc2hvd0V2ZW50ICAgICA9ICQuRXZlbnQoRXZlbnQuU0hPVywgcmVsYXRlZFRhcmdldClcblxuICAgICAgJChwYXJlbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICB0aGlzLmZvY3VzKClcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgICAgJChwYXJlbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgJChwYXJlbnQpLnRyaWdnZXIoJC5FdmVudChFdmVudC5TSE9XTiwgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDSywgdGhpcy50b2dnbGUpXG4gICAgfVxuXG5cbiAgICAvLyBzdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10uY2FsbCh0aGlzKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBfY2xlYXJNZW51cyhldmVudCkge1xuICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LndoaWNoID09PSBSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0gpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhY2tkcm9wID0gJChTZWxlY3Rvci5CQUNLRFJPUClbMF1cbiAgICAgIGlmIChiYWNrZHJvcCkge1xuICAgICAgICBiYWNrZHJvcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhY2tkcm9wKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0b2dnbGVzID0gJC5tYWtlQXJyYXkoJChTZWxlY3Rvci5EQVRBX1RPR0dMRSkpXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9nZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJlbnQgICAgICAgID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRvZ2dsZXNbaV0pXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgICAgcmVsYXRlZFRhcmdldCA6IHRvZ2dsZXNbaV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiZcbiAgICAgICAgICAgIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpIHx8IGV2ZW50LnR5cGUgPT09ICdmb2N1c2luJylcbiAgICAgICAgICAgICYmICQuY29udGFpbnMocGFyZW50LCBldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSwgcmVsYXRlZFRhcmdldClcbiAgICAgICAgJChwYXJlbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZXNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcblxuICAgICAgICAkKHBhcmVudClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICAgICAgLnRyaWdnZXIoJC5FdmVudChFdmVudC5ISURERU4sIHJlbGF0ZWRUYXJnZXQpKVxuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0UGFyZW50RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgbGV0IHBhcmVudFxuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudClcblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHBhcmVudCA9ICQoc2VsZWN0b3IpWzBdXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlXG4gICAgfVxuXG4gICAgc3RhdGljIF9kYXRhQXBpS2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICAgIGlmICghUkVHRVhQX0tFWURPV04udGVzdChldmVudC53aGljaCkgfHxcbiAgICAgICAgIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAkKHRoaXMpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmVudCAgID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMpXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9ICQocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgaWYgKCFpc0FjdGl2ZSAmJiBldmVudC53aGljaCAhPT0gRVNDQVBFX0tFWUNPREUgfHxcbiAgICAgICAgICAgaXNBY3RpdmUgJiYgZXZlbnQud2hpY2ggPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG5cbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9ICQocGFyZW50KS5maW5kKFNlbGVjdG9yLkRBVEFfVE9HR0xFKVswXVxuICAgICAgICAgICQodG9nZ2xlKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cblxuICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2NsaWNrJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gJChwYXJlbnQpLmZpbmQoU2VsZWN0b3IuVklTSUJMRV9JVEVNUykuZ2V0KClcblxuICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoZXZlbnQudGFyZ2V0KVxuXG4gICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEFSUk9XX1VQX0tFWUNPREUgJiYgaW5kZXggPiAwKSB7IC8vIHVwXG4gICAgICAgIGluZGV4LS1cbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7IC8vIGRvd25cbiAgICAgICAgaW5kZXgrK1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gMFxuICAgICAgfVxuXG4gICAgICBpdGVtc1tpbmRleF0uZm9jdXMoKVxuICAgIH1cblxuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbihFdmVudC5LRVlET1dOX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpXG4gICAgLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLlJPTEVfTUVOVSwgICAgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcilcbiAgICAub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuUk9MRV9MSVNUQk9YLCBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyKVxuICAgIC5vbihgJHtFdmVudC5DTElDS19EQVRBX0FQSX0gJHtFdmVudC5GT0NVU0lOX0RBVEFfQVBJfWAsIERyb3Bkb3duLl9jbGVhck1lbnVzKVxuICAgIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUpXG4gICAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5GT1JNX0NISUxELCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH0pXG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSAgICAgICAgICAgICA9IERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gRHJvcGRvd25cblxufSkoalF1ZXJ5KVxuXG5cbiIsIlxuXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjYpOiBtb2RhbC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTW9kYWwgPSAoKCQpID0+IHtcblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29uc3RhbnRzXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgICAgICAgICAgID0gJ21vZGFsJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgICAgICAgICAgID0gJzQuMC4wLWFscGhhLjYnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgICAgICAgICAgPSAnYnMubW9kYWwnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgICAgICAgICAgID0gJy5kYXRhLWFwaSdcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICAgICAgICAgICA9ICQuZm5bTkFNRV1cbiAgY29uc3QgVFJBTlNJVElPTl9EVVJBVElPTiAgICAgICAgICA9IDMwMFxuICBjb25zdCBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG4gIGNvbnN0IEVTQ0FQRV9LRVlDT0RFICAgICAgICAgICAgICAgPSAyNyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBiYWNrZHJvcCA6IHRydWUsXG4gICAga2V5Ym9hcmQgOiB0cnVlLFxuICAgIGZvY3VzICAgIDogdHJ1ZSxcbiAgICBzaG93ICAgICA6IHRydWVcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIGJhY2tkcm9wIDogJyhib29sZWFufHN0cmluZyknLFxuICAgIGtleWJvYXJkIDogJ2Jvb2xlYW4nLFxuICAgIGZvY3VzICAgIDogJ2Jvb2xlYW4nLFxuICAgIHNob3cgICAgIDogJ2Jvb2xlYW4nXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBISURERU4gICAgICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgICBGT0NVU0lOICAgICAgICAgICA6IGBmb2N1c2luJHtFVkVOVF9LRVl9YCxcbiAgICBSRVNJWkUgICAgICAgICAgICA6IGByZXNpemUke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLX0RJU01JU1MgICAgIDogYGNsaWNrLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICAgIEtFWURPV05fRElTTUlTUyAgIDogYGtleWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VVUF9ESVNNSVNTICAgOiBgbW91c2V1cC5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRURPV05fRElTTUlTUyA6IGBtb3VzZWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0tfREFUQV9BUEkgICAgOiBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG4gIH1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgU0NST0xMQkFSX01FQVNVUkVSIDogJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJyxcbiAgICBCQUNLRFJPUCAgICAgICAgICAgOiAnbW9kYWwtYmFja2Ryb3AnLFxuICAgIE9QRU4gICAgICAgICAgICAgICA6ICdtb2RhbC1vcGVuJyxcbiAgICBGQURFICAgICAgICAgICAgICAgOiAnZmFkZScsXG4gICAgU0hPVyAgICAgICAgICAgICAgIDogJ3Nob3cnXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBESUFMT0cgICAgICAgICAgICAgOiAnLm1vZGFsLWRpYWxvZycsXG4gICAgREFUQV9UT0dHTEUgICAgICAgIDogJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJyxcbiAgICBEQVRBX0RJU01JU1MgICAgICAgOiAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJyxcbiAgICBGSVhFRF9DT05URU5UICAgICAgOiAnLmZpeGVkLXRvcCwgLmZpeGVkLWJvdHRvbSwgLmlzLWZpeGVkLCAuc3RpY2t5LXRvcCdcbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBNb2RhbCB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgICAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX2RpYWxvZyAgICAgICAgICAgICAgPSAkKGVsZW1lbnQpLmZpbmQoU2VsZWN0b3IuRElBTE9HKVswXVxuICAgICAgdGhpcy5fYmFja2Ryb3AgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2lzU2hvd24gICAgICAgICAgICAgPSBmYWxzZVxuICAgICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgICA9IGZhbHNlXG4gICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyAgICAgPSBmYWxzZVxuICAgICAgdGhpcy5fb3JpZ2luYWxCb2R5UGFkZGluZyA9IDBcbiAgICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoICAgICAgPSAwXG4gICAgfVxuXG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIHRvZ2dsZShyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gICAgfVxuXG4gICAgc2hvdyhyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kYWwgaXMgdHJhbnNpdGlvbmluZycpXG4gICAgICB9XG5cbiAgICAgIGlmIChVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmXG4gICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywge1xuICAgICAgICByZWxhdGVkVGFyZ2V0XG4gICAgICB9KVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgICBpZiAodGhpcy5faXNTaG93biB8fCBzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlXG5cbiAgICAgIHRoaXMuX2NoZWNrU2Nyb2xsYmFyKClcbiAgICAgIHRoaXMuX3NldFNjcm9sbGJhcigpXG5cbiAgICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pXG5cbiAgICAgIHRoaXMuX3NldEVzY2FwZUV2ZW50KClcbiAgICAgIHRoaXMuX3NldFJlc2l6ZUV2ZW50KClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihcbiAgICAgICAgRXZlbnQuQ0xJQ0tfRElTTUlTUyxcbiAgICAgICAgU2VsZWN0b3IuREFUQV9ESVNNSVNTLFxuICAgICAgICAoZXZlbnQpID0+IHRoaXMuaGlkZShldmVudClcbiAgICAgIClcblxuICAgICAgJCh0aGlzLl9kaWFsb2cpLm9uKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTLCAoKSA9PiB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub25lKEV2ZW50Lk1PVVNFVVBfRElTTUlTUywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcyh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICB0aGlzLl9zaG93QmFja2Ryb3AoKCkgPT4gdGhpcy5fc2hvd0VsZW1lbnQocmVsYXRlZFRhcmdldCkpXG4gICAgfVxuXG4gICAgaGlkZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGlzIHRyYW5zaXRpb25pbmcnKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uID0gVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJlxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKVxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuXG4gICAgICBpZiAoIXRoaXMuX2lzU2hvd24gfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc1Nob3duID0gZmFsc2VcblxuICAgICAgdGhpcy5fc2V0RXNjYXBlRXZlbnQoKVxuICAgICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKVxuXG4gICAgICAkKGRvY3VtZW50KS5vZmYoRXZlbnQuRk9DVVNJTilcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuQ0xJQ0tfRElTTUlTUylcbiAgICAgICQodGhpcy5fZGlhbG9nKS5vZmYoRXZlbnQuTU9VU0VET1dOX0RJU01JU1MpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5faGlkZU1vZGFsKGV2ZW50KSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hpZGVNb2RhbCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgICAgJCh3aW5kb3csIGRvY3VtZW50LCB0aGlzLl9lbGVtZW50LCB0aGlzLl9iYWNrZHJvcCkub2ZmKEVWRU5UX0tFWSlcblxuICAgICAgdGhpcy5fY29uZmlnICAgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9kaWFsb2cgICAgICAgICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fYmFja2Ryb3AgICAgICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2lzU2hvd24gICAgICAgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAgID0gbnVsbFxuICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IG51bGxcbiAgICAgIHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmcgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCAgICAgID0gbnVsbFxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpXG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uID0gVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJlxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKVxuXG4gICAgICBpZiAoIXRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSB8fFxuICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50KVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxuICAgICAgdGhpcy5fZWxlbWVudC5zY3JvbGxUb3AgPSAwXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgICAgdGhpcy5fZW5mb3JjZUZvY3VzKClcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2hvd25FdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPV04sIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldFxuICAgICAgfSlcblxuICAgICAgY29uc3QgdHJhbnNpdGlvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3duRXZlbnQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICQodGhpcy5fZGlhbG9nKVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgdHJhbnNpdGlvbkNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbkNvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5mb3JjZUZvY3VzKCkge1xuICAgICAgJChkb2N1bWVudClcbiAgICAgICAgLm9mZihFdmVudC5GT0NVU0lOKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgICAgLm9uKEV2ZW50LkZPQ1VTSU4sIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChkb2N1bWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgICAhJCh0aGlzLl9lbGVtZW50KS5oYXMoZXZlbnQudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBfc2V0RXNjYXBlRXZlbnQoKSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5LRVlET1dOX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duKSB7XG4gICAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LktFWURPV05fRElTTUlTUylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfc2V0UmVzaXplRXZlbnQoKSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgICAkKHdpbmRvdykub24oRXZlbnQuUkVTSVpFLCAoZXZlbnQpID0+IHRoaXMuX2hhbmRsZVVwZGF0ZShldmVudCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHdpbmRvdykub2ZmKEV2ZW50LlJFU0laRSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGlkZU1vZGFsKCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKCgpID0+IHtcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuT1BFTilcbiAgICAgICAgdGhpcy5fcmVzZXRBZGp1c3RtZW50cygpXG4gICAgICAgIHRoaXMuX3Jlc2V0U2Nyb2xsYmFyKClcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LkhJRERFTilcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgX3JlbW92ZUJhY2tkcm9wKCkge1xuICAgICAgaWYgKHRoaXMuX2JhY2tkcm9wKSB7XG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIF9zaG93QmFja2Ryb3AoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGFuaW1hdGUgPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSA/XG4gICAgICAgIENsYXNzTmFtZS5GQURFIDogJydcblxuICAgICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmJhY2tkcm9wKSB7XG4gICAgICAgIGNvbnN0IGRvQW5pbWF0ZSA9IFV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgYW5pbWF0ZVxuXG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLkJBQ0tEUk9QXG5cbiAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5hZGRDbGFzcyhhbmltYXRlKVxuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSlcblxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoZG9BbmltYXRlKSB7XG4gICAgICAgICAgVXRpbC5yZWZsb3codGhpcy5fYmFja2Ryb3ApXG4gICAgICAgIH1cblxuICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRvQW5pbWF0ZSkge1xuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5fYmFja2Ryb3ApXG4gICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFjaylcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTilcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93biAmJiB0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgICBjb25zdCBjYWxsYmFja1JlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVCYWNrZHJvcCgpXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiZcbiAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKVxuICAgICAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuICAgIC8vIHRvZG8gKGZhdCk6IHRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSByZWZhY3RvcmVkIG91dCBvZiBtb2RhbC5qc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIF9oYW5kbGVVcGRhdGUoKSB7XG4gICAgICB0aGlzLl9hZGp1c3REaWFsb2coKVxuICAgIH1cblxuICAgIF9hZGp1c3REaWFsb2coKSB7XG4gICAgICBjb25zdCBpc01vZGFsT3ZlcmZsb3dpbmcgPVxuICAgICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgICAgaWYgKCF0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiBpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IGAke3RoaXMuX3Njcm9sbGJhcldpZHRofXB4YFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMuX3Njcm9sbGJhcldpZHRofXB4YFxuICAgICAgfVxuICAgIH1cblxuICAgIF9yZXNldEFkanVzdG1lbnRzKCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICcnXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnXG4gICAgfVxuXG4gICAgX2NoZWNrU2Nyb2xsYmFyKCkge1xuICAgICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDwgd2luZG93LmlubmVyV2lkdGhcbiAgICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoID0gdGhpcy5fZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICAgIH1cblxuICAgIF9zZXRTY3JvbGxiYXIoKSB7XG4gICAgICBjb25zdCBib2R5UGFkZGluZyA9IHBhcnNlSW50KFxuICAgICAgICAkKFNlbGVjdG9yLkZJWEVEX0NPTlRFTlQpLmNzcygncGFkZGluZy1yaWdodCcpIHx8IDAsXG4gICAgICAgIDEwXG4gICAgICApXG5cbiAgICAgIHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmcgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJ1xuXG4gICAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPVxuICAgICAgICAgIGAke2JvZHlQYWRkaW5nICsgdGhpcy5fc2Nyb2xsYmFyV2lkdGh9cHhgXG4gICAgICB9XG4gICAgfVxuXG4gICAgX3Jlc2V0U2Nyb2xsYmFyKCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSB0aGlzLl9vcmlnaW5hbEJvZHlQYWRkaW5nXG4gICAgfVxuXG4gICAgX2dldFNjcm9sbGJhcldpZHRoKCkgeyAvLyB0aHggZC53YWxzaFxuICAgICAgY29uc3Qgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHNjcm9sbERpdi5jbGFzc05hbWUgPSBDbGFzc05hbWUuU0NST0xMQkFSX01FQVNVUkVSXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdilcbiAgICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aFxuICAgIH1cblxuXG4gICAgLy8gc3RhdGljXG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcsIHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZGF0YSAgICAgID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBjb25zdCBfY29uZmlnID0gJC5leHRlbmQoXG4gICAgICAgICAge30sXG4gICAgICAgICAgTW9kYWwuRGVmYXVsdCxcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoKSxcbiAgICAgICAgICB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcbiAgICAgICAgKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgTW9kYWwodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10ocmVsYXRlZFRhcmdldClcbiAgICAgICAgfSBlbHNlIGlmIChfY29uZmlnLnNob3cpIHtcbiAgICAgICAgICBkYXRhLnNob3cocmVsYXRlZFRhcmdldClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgdGFyZ2V0XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcylcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGFyZ2V0ID0gJChzZWxlY3RvcilbMF1cbiAgICB9XG5cbiAgICBjb25zdCBjb25maWcgPSAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkgP1xuICAgICAgJ3RvZ2dsZScgOiAkLmV4dGVuZCh7fSwgJCh0YXJnZXQpLmRhdGEoKSwgJCh0aGlzKS5kYXRhKCkpXG5cbiAgICBpZiAodGhpcy50YWdOYW1lID09PSAnQScgfHwgdGhpcy50YWdOYW1lID09PSAnQVJFQScpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBjb25zdCAkdGFyZ2V0ID0gJCh0YXJnZXQpLm9uZShFdmVudC5TSE9XLCAoc2hvd0V2ZW50KSA9PiB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgICR0YXJnZXQub25lKEV2ZW50LkhJRERFTiwgKCkgPT4ge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0YXJnZXQpLCBjb25maWcsIHRoaXMpXG4gIH0pXG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIGpRdWVyeVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJC5mbltOQU1FXSAgICAgICAgICAgICA9IE1vZGFsLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IE1vZGFsXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gTW9kYWxcblxufSkoalF1ZXJ5KVxuXG5cbiIsIlxuXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjYpOiBzY3JvbGxzcHkuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFNjcm9sbFNweSA9ICgoJCkgPT4ge1xuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdzY3JvbGxzcHknXG4gIGNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjAuMC1hbHBoYS42J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnYnMuc2Nyb2xsc3B5J1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgPSAnLmRhdGEtYXBpJ1xuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBvZmZzZXQgOiAxMCxcbiAgICBtZXRob2QgOiAnYXV0bycsXG4gICAgdGFyZ2V0IDogJydcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIG9mZnNldCA6ICdudW1iZXInLFxuICAgIG1ldGhvZCA6ICdzdHJpbmcnLFxuICAgIHRhcmdldCA6ICcoc3RyaW5nfGVsZW1lbnQpJ1xuICB9XG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgQUNUSVZBVEUgICAgICA6IGBhY3RpdmF0ZSR7RVZFTlRfS0VZfWAsXG4gICAgU0NST0xMICAgICAgICA6IGBzY3JvbGwke0VWRU5UX0tFWX1gLFxuICAgIExPQURfREFUQV9BUEkgOiBgbG9hZCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBEUk9QRE9XTl9JVEVNIDogJ2Ryb3Bkb3duLWl0ZW0nLFxuICAgIERST1BET1dOX01FTlUgOiAnZHJvcGRvd24tbWVudScsXG4gICAgTkFWX0xJTksgICAgICA6ICduYXYtbGluaycsXG4gICAgTkFWICAgICAgICAgICA6ICduYXYnLFxuICAgIEFDVElWRSAgICAgICAgOiAnYWN0aXZlJ1xuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgREFUQV9TUFkgICAgICAgIDogJ1tkYXRhLXNweT1cInNjcm9sbFwiXScsXG4gICAgQUNUSVZFICAgICAgICAgIDogJy5hY3RpdmUnLFxuICAgIExJU1RfSVRFTSAgICAgICA6ICcubGlzdC1pdGVtJyxcbiAgICBMSSAgICAgICAgICAgICAgOiAnbGknLFxuICAgIExJX0RST1BET1dOICAgICA6ICdsaS5kcm9wZG93bicsXG4gICAgTkFWX0xJTktTICAgICAgIDogJy5uYXYtbGluaycsXG4gICAgRFJPUERPV04gICAgICAgIDogJy5kcm9wZG93bicsXG4gICAgRFJPUERPV05fSVRFTVMgIDogJy5kcm9wZG93bi1pdGVtJyxcbiAgICBEUk9QRE9XTl9UT0dHTEUgOiAnLmRyb3Bkb3duLXRvZ2dsZSdcbiAgfVxuXG4gIGNvbnN0IE9mZnNldE1ldGhvZCA9IHtcbiAgICBPRkZTRVQgICA6ICdvZmZzZXQnLFxuICAgIFBPU0lUSU9OIDogJ3Bvc2l0aW9uJ1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIFNjcm9sbFNweSB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgPSBlbGVtZW50XG4gICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gZWxlbWVudC50YWdOYW1lID09PSAnQk9EWScgPyB3aW5kb3cgOiBlbGVtZW50XG4gICAgICB0aGlzLl9jb25maWcgICAgICAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICAgIHRoaXMuX3NlbGVjdG9yICAgICAgPSBgJHt0aGlzLl9jb25maWcudGFyZ2V0fSAke1NlbGVjdG9yLk5BVl9MSU5LU30sYFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIGAke3RoaXMuX2NvbmZpZy50YXJnZXR9ICR7U2VsZWN0b3IuRFJPUERPV05fSVRFTVN9YFxuICAgICAgdGhpcy5fb2Zmc2V0cyAgICAgICA9IFtdXG4gICAgICB0aGlzLl90YXJnZXRzICAgICAgID0gW11cbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCAgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgID0gMFxuXG4gICAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9uKEV2ZW50LlNDUk9MTCwgKGV2ZW50KSA9PiB0aGlzLl9wcm9jZXNzKGV2ZW50KSlcblxuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICAgIHRoaXMuX3Byb2Nlc3MoKVxuICAgIH1cblxuXG4gICAgLy8gZ2V0dGVyc1xuXG4gICAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgICAgcmV0dXJuIFZFUlNJT05cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFxuICAgIH1cblxuXG4gICAgLy8gcHVibGljXG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgY29uc3QgYXV0b01ldGhvZCA9IHRoaXMuX3Njcm9sbEVsZW1lbnQgIT09IHRoaXMuX3Njcm9sbEVsZW1lbnQud2luZG93ID9cbiAgICAgICAgT2Zmc2V0TWV0aG9kLlBPU0lUSU9OIDogT2Zmc2V0TWV0aG9kLk9GRlNFVFxuXG4gICAgICBjb25zdCBvZmZzZXRNZXRob2QgPSB0aGlzLl9jb25maWcubWV0aG9kID09PSAnYXV0bycgP1xuICAgICAgICBhdXRvTWV0aG9kIDogdGhpcy5fY29uZmlnLm1ldGhvZFxuXG4gICAgICBjb25zdCBvZmZzZXRCYXNlID0gb2Zmc2V0TWV0aG9kID09PSBPZmZzZXRNZXRob2QuUE9TSVRJT04gP1xuICAgICAgICB0aGlzLl9nZXRTY3JvbGxUb3AoKSA6IDBcblxuICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdXG4gICAgICB0aGlzLl90YXJnZXRzID0gW11cblxuICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gdGhpcy5fZ2V0U2Nyb2xsSGVpZ2h0KClcblxuICAgICAgY29uc3QgdGFyZ2V0cyA9ICQubWFrZUFycmF5KCQodGhpcy5fc2VsZWN0b3IpKVxuXG4gICAgICB0YXJnZXRzXG4gICAgICAgIC5tYXAoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICBsZXQgdGFyZ2V0XG4gICAgICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudClcblxuICAgICAgICAgIGlmICh0YXJnZXRTZWxlY3Rvcikge1xuICAgICAgICAgICAgdGFyZ2V0ID0gJCh0YXJnZXRTZWxlY3RvcilbMF1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0ICYmICh0YXJnZXQub2Zmc2V0V2lkdGggfHwgdGFyZ2V0Lm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgICAgIC8vIHRvZG8gKGZhdCk6IHJlbW92ZSBza2V0Y2ggcmVsaWFuY2Ugb24galF1ZXJ5IHBvc2l0aW9uL29mZnNldFxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgJCh0YXJnZXQpW29mZnNldE1ldGhvZF0oKS50b3AgKyBvZmZzZXRCYXNlLFxuICAgICAgICAgICAgICB0YXJnZXRTZWxlY3RvclxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChpdGVtKSAgPT4gaXRlbSlcbiAgICAgICAgLnNvcnQoKGEsIGIpICAgID0+IGFbMF0gLSBiWzBdKVxuICAgICAgICAuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuX29mZnNldHMucHVzaChpdGVtWzBdKVxuICAgICAgICAgIHRoaXMuX3RhcmdldHMucHVzaChpdGVtWzFdKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxFbGVtZW50ID0gbnVsbFxuICAgICAgdGhpcy5fY29uZmlnICAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX3NlbGVjdG9yICAgICAgPSBudWxsXG4gICAgICB0aGlzLl9vZmZzZXRzICAgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdGFyZ2V0cyAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCAgPSBudWxsXG4gICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgID0gbnVsbFxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpXG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRhcmdldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGV0IGlkID0gJChjb25maWcudGFyZ2V0KS5hdHRyKCdpZCcpXG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICBpZCA9IFV0aWwuZ2V0VUlEKE5BTUUpXG4gICAgICAgICAgJChjb25maWcudGFyZ2V0KS5hdHRyKCdpZCcsIGlkKVxuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy50YXJnZXQgPSBgIyR7aWR9YFxuICAgICAgfVxuXG4gICAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuXG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfVxuXG4gICAgX2dldFNjcm9sbFRvcCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB3aW5kb3cgP1xuICAgICAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQucGFnZVlPZmZzZXQgOiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbFRvcFxuICAgIH1cblxuICAgIF9nZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudC5zY3JvbGxIZWlnaHQgfHwgTWF0aC5tYXgoXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0XG4gICAgICApXG4gICAgfVxuXG4gICAgX2dldE9mZnNldEhlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB3aW5kb3cgP1xuICAgICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCA6IHRoaXMuX3Njcm9sbEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgfVxuXG4gICAgX3Byb2Nlc3MoKSB7XG4gICAgICBjb25zdCBzY3JvbGxUb3AgICAgPSB0aGlzLl9nZXRTY3JvbGxUb3AoKSArIHRoaXMuX2NvbmZpZy5vZmZzZXRcbiAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuX2dldFNjcm9sbEhlaWdodCgpXG4gICAgICBjb25zdCBtYXhTY3JvbGwgICAgPSB0aGlzLl9jb25maWcub2Zmc2V0XG4gICAgICAgICsgc2Nyb2xsSGVpZ2h0XG4gICAgICAgIC0gdGhpcy5fZ2V0T2Zmc2V0SGVpZ2h0KClcblxuICAgICAgaWYgKHRoaXMuX3Njcm9sbEhlaWdodCAhPT0gc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb3AgPj0gbWF4U2Nyb2xsKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX3RhcmdldHNbdGhpcy5fdGFyZ2V0cy5sZW5ndGggLSAxXVxuXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRhcmdldCkge1xuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRhcmdldClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCAmJiBzY3JvbGxUb3AgPCB0aGlzLl9vZmZzZXRzWzBdICYmIHRoaXMuX29mZnNldHNbMF0gPiAwKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGxcbiAgICAgICAgdGhpcy5fY2xlYXIoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX29mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIGNvbnN0IGlzQWN0aXZlVGFyZ2V0ID0gdGhpcy5fYWN0aXZlVGFyZ2V0ICE9PSB0aGlzLl90YXJnZXRzW2ldXG4gICAgICAgICAgICAmJiBzY3JvbGxUb3AgPj0gdGhpcy5fb2Zmc2V0c1tpXVxuICAgICAgICAgICAgJiYgKHRoaXMuX29mZnNldHNbaSArIDFdID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3AgPCB0aGlzLl9vZmZzZXRzW2kgKyAxXSlcblxuICAgICAgICBpZiAoaXNBY3RpdmVUYXJnZXQpIHtcbiAgICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0aGlzLl90YXJnZXRzW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2FjdGl2YXRlKHRhcmdldCkge1xuICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0XG5cbiAgICAgIHRoaXMuX2NsZWFyKClcblxuICAgICAgbGV0IHF1ZXJpZXMgPSB0aGlzLl9zZWxlY3Rvci5zcGxpdCgnLCcpXG4gICAgICBxdWVyaWVzICAgICA9IHF1ZXJpZXMubWFwKChzZWxlY3RvcikgPT4ge1xuICAgICAgICByZXR1cm4gYCR7c2VsZWN0b3J9W2RhdGEtdGFyZ2V0PVwiJHt0YXJnZXR9XCJdLGAgK1xuICAgICAgICAgICAgICAgYCR7c2VsZWN0b3J9W2hyZWY9XCIke3RhcmdldH1cIl1gXG4gICAgICB9KVxuXG4gICAgICBjb25zdCAkbGluayA9ICQocXVlcmllcy5qb2luKCcsJykpXG5cbiAgICAgIGlmICgkbGluay5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUERPV05fSVRFTSkpIHtcbiAgICAgICAgJGxpbmsuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTikuZmluZChTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICRsaW5rLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0b2RvIChmYXQpIHRoaXMgaXMga2luZGEgc3VzLi4uXG4gICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGFkZCBhY3RpdmVzIHRvIHRlc3RlZCBuYXYtbGlua3NcbiAgICAgICAgJGxpbmsucGFyZW50cyhTZWxlY3Rvci5MSSkuZmluZChgPiAke1NlbGVjdG9yLk5BVl9MSU5LU31gKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgfVxuXG4gICAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLnRyaWdnZXIoRXZlbnQuQUNUSVZBVEUsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogdGFyZ2V0XG4gICAgICB9KVxuICAgIH1cblxuICAgIF9jbGVhcigpIHtcbiAgICAgICQodGhpcy5fc2VsZWN0b3IpLmZpbHRlcihTZWxlY3Rvci5BQ1RJVkUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgfVxuXG5cbiAgICAvLyBzdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhICAgICAgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFNjcm9sbFNweSh0aGlzLCBfY29uZmlnKVxuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJCh3aW5kb3cpLm9uKEV2ZW50LkxPQURfREFUQV9BUEksICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxTcHlzID0gJC5tYWtlQXJyYXkoJChTZWxlY3Rvci5EQVRBX1NQWSkpXG5cbiAgICBmb3IgKGxldCBpID0gc2Nyb2xsU3B5cy5sZW5ndGg7IGktLTspIHtcbiAgICAgIGNvbnN0ICRzcHkgPSAkKHNjcm9sbFNweXNbaV0pXG4gICAgICBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZS5jYWxsKCRzcHksICRzcHkuZGF0YSgpKVxuICAgIH1cbiAgfSlcblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBTY3JvbGxTcHlcblxufSkoalF1ZXJ5KVxuXG5cbiIsIlxuXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjYpOiB0YWIuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFRhYiA9ICgoJCkgPT4ge1xuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAndGFiJ1xuICBjb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMC4wLWFscGhhLjYnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICAgPSAnYnMudGFiJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG4gIGNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSAxNTBcblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgICBISURERU4gICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICAgIFNIT1cgICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgICBDTElDS19EQVRBX0FQSSA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBEUk9QRE9XTl9NRU5VIDogJ2Ryb3Bkb3duLW1lbnUnLFxuICAgIEFDVElWRSAgICAgICAgOiAnYWN0aXZlJyxcbiAgICBESVNBQkxFRCAgICAgIDogJ2Rpc2FibGVkJyxcbiAgICBGQURFICAgICAgICAgIDogJ2ZhZGUnLFxuICAgIFNIT1cgICAgICAgICAgOiAnc2hvdydcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEEgICAgICAgICAgICAgICAgICAgICA6ICdhJyxcbiAgICBMSSAgICAgICAgICAgICAgICAgICAgOiAnbGknLFxuICAgIERST1BET1dOICAgICAgICAgICAgICA6ICcuZHJvcGRvd24nLFxuICAgIExJU1QgICAgICAgICAgICAgICAgICA6ICd1bDpub3QoLmRyb3Bkb3duLW1lbnUpLCBvbDpub3QoLmRyb3Bkb3duLW1lbnUpLCBuYXY6bm90KC5kcm9wZG93bi1tZW51KScsXG4gICAgRkFERV9DSElMRCAgICAgICAgICAgIDogJz4gLm5hdi1pdGVtIC5mYWRlLCA+IC5mYWRlJyxcbiAgICBBQ1RJVkUgICAgICAgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gICAgQUNUSVZFX0NISUxEICAgICAgICAgIDogJz4gLm5hdi1pdGVtID4gLmFjdGl2ZSwgPiAuYWN0aXZlJyxcbiAgICBEQVRBX1RPR0dMRSAgICAgICAgICAgOiAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS10b2dnbGU9XCJwaWxsXCJdJyxcbiAgICBEUk9QRE9XTl9UT0dHTEUgICAgICAgOiAnLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgRFJPUERPV05fQUNUSVZFX0NISUxEIDogJz4gLmRyb3Bkb3duLW1lbnUgLmFjdGl2ZSdcbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICBjbGFzcyBUYWIge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgICB9XG5cblxuICAgIC8vIGdldHRlcnNcblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OXG4gICAgfVxuXG5cbiAgICAvLyBwdWJsaWNcblxuICAgIHNob3coKSB7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudC5wYXJlbnROb2RlICYmXG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJlxuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkgfHxcbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCB0YXJnZXRcbiAgICAgIGxldCBwcmV2aW91c1xuICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoU2VsZWN0b3IuTElTVClbMF1cbiAgICAgIGNvbnN0IHNlbGVjdG9yICAgID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgIGlmIChsaXN0RWxlbWVudCkge1xuICAgICAgICBwcmV2aW91cyA9ICQubWFrZUFycmF5KCQobGlzdEVsZW1lbnQpLmZpbmQoU2VsZWN0b3IuQUNUSVZFKSlcbiAgICAgICAgcHJldmlvdXMgPSBwcmV2aW91c1twcmV2aW91cy5sZW5ndGggLSAxXVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUsIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgICAgfSlcblxuICAgICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXZpb3VzXG4gICAgICB9KVxuXG4gICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgJChwcmV2aW91cykudHJpZ2dlcihoaWRlRXZlbnQpXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHxcbiAgICAgICAgIGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHRhcmdldCA9ICQoc2VsZWN0b3IpWzBdXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FjdGl2YXRlKFxuICAgICAgICB0aGlzLl9lbGVtZW50LFxuICAgICAgICBsaXN0RWxlbWVudFxuICAgICAgKVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaGlkZGVuRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJRERFTiwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzaG93bkV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHByZXZpb3VzXG4gICAgICAgIH0pXG5cbiAgICAgICAgJChwcmV2aW91cykudHJpZ2dlcihoaWRkZW5FdmVudClcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3duRXZlbnQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUodGFyZ2V0LCB0YXJnZXQucGFyZW50Tm9kZSwgY29tcGxldGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICQucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZVxuXG4gICAgX2FjdGl2YXRlKGVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGFjdGl2ZSAgICAgICAgICA9ICQoY29udGFpbmVyKS5maW5kKFNlbGVjdG9yLkFDVElWRV9DSElMRClbMF1cbiAgICAgIGNvbnN0IGlzVHJhbnNpdGlvbmluZyA9IGNhbGxiYWNrXG4gICAgICAgICYmIFV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKClcbiAgICAgICAgJiYgKGFjdGl2ZSAmJiAkKGFjdGl2ZSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG4gICAgICAgICAgIHx8IEJvb2xlYW4oJChjb250YWluZXIpLmZpbmQoU2VsZWN0b3IuRkFERV9DSElMRClbMF0pKVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHRoaXMuX3RyYW5zaXRpb25Db21wbGV0ZShcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgYWN0aXZlLFxuICAgICAgICBpc1RyYW5zaXRpb25pbmcsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgICApXG5cbiAgICAgIGlmIChhY3RpdmUgJiYgaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICQoYWN0aXZlKVxuICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAkKGFjdGl2ZSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICB9XG4gICAgfVxuXG4gICAgX3RyYW5zaXRpb25Db21wbGV0ZShlbGVtZW50LCBhY3RpdmUsIGlzVHJhbnNpdGlvbmluZywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgJChhY3RpdmUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgICAgY29uc3QgZHJvcGRvd25DaGlsZCA9ICQoYWN0aXZlLnBhcmVudE5vZGUpLmZpbmQoXG4gICAgICAgICAgU2VsZWN0b3IuRFJPUERPV05fQUNUSVZFX0NISUxEXG4gICAgICAgIClbMF1cblxuICAgICAgICBpZiAoZHJvcGRvd25DaGlsZCkge1xuICAgICAgICAgICQoZHJvcGRvd25DaGlsZCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2ZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcbiAgICAgIH1cblxuICAgICAgJChlbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgICBpZiAoaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIFV0aWwucmVmbG93KGVsZW1lbnQpXG4gICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICYmXG4gICAgICAgICAgJChlbGVtZW50LnBhcmVudE5vZGUpLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9NRU5VKSkge1xuXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudCA9ICQoZWxlbWVudCkuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTilbMF1cbiAgICAgICAgaWYgKGRyb3Bkb3duRWxlbWVudCkge1xuICAgICAgICAgICQoZHJvcGRvd25FbGVtZW50KS5maW5kKFNlbGVjdG9yLkRST1BET1dOX1RPR0dMRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpXG4gICAgICAgIGxldCBkYXRhICAgID0gJHRoaXMuZGF0YShEQVRBX0tFWSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFRhYih0aGlzKVxuICAgICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgVGFiLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gICAgfSlcblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gVGFiLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRhYlxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gVGFiLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBUYWJcblxufSkoalF1ZXJ5KVxuXG5cbiIsIi8qIGdsb2JhbCBUZXRoZXIgKi9cblxuXG5cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuNik6IHRvb2x0aXAuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFRvb2x0aXAgPSAoKCQpID0+IHtcblxuICAvKipcbiAgICogQ2hlY2sgZm9yIFRldGhlciBkZXBlbmRlbmN5XG4gICAqIFRldGhlciAtIGh0dHA6Ly90ZXRoZXIuaW8vXG4gICAqL1xuICBpZiAodHlwZW9mIFRldGhlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcCB0b29sdGlwcyByZXF1aXJlIFRldGhlciAoaHR0cDovL3RldGhlci5pby8pJylcbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAndG9vbHRpcCdcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICA9ICc0LjAuMC1hbHBoYS42J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLnRvb2x0aXAnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuICBjb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG4gIGNvbnN0IENMQVNTX1BSRUZJWCAgICAgICAgPSAnYnMtdGV0aGVyJ1xuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgYW5pbWF0aW9uICAgOiB0cnVlLFxuICAgIHRlbXBsYXRlICAgIDogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj4nXG4gICAgICAgICAgICAgICAgKyAnPGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIHRyaWdnZXIgICAgIDogJ2hvdmVyIGZvY3VzJyxcbiAgICB0aXRsZSAgICAgICA6ICcnLFxuICAgIGRlbGF5ICAgICAgIDogMCxcbiAgICBodG1sICAgICAgICA6IGZhbHNlLFxuICAgIHNlbGVjdG9yICAgIDogZmFsc2UsXG4gICAgcGxhY2VtZW50ICAgOiAndG9wJyxcbiAgICBvZmZzZXQgICAgICA6ICcwIDAnLFxuICAgIGNvbnN0cmFpbnRzIDogW10sXG4gICAgY29udGFpbmVyICAgOiBmYWxzZVxuICB9XG5cbiAgY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gICAgYW5pbWF0aW9uICAgOiAnYm9vbGVhbicsXG4gICAgdGVtcGxhdGUgICAgOiAnc3RyaW5nJyxcbiAgICB0aXRsZSAgICAgICA6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJyxcbiAgICB0cmlnZ2VyICAgICA6ICdzdHJpbmcnLFxuICAgIGRlbGF5ICAgICAgIDogJyhudW1iZXJ8b2JqZWN0KScsXG4gICAgaHRtbCAgICAgICAgOiAnYm9vbGVhbicsXG4gICAgc2VsZWN0b3IgICAgOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgcGxhY2VtZW50ICAgOiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICAgIG9mZnNldCAgICAgIDogJ3N0cmluZycsXG4gICAgY29uc3RyYWludHMgOiAnYXJyYXknLFxuICAgIGNvbnRhaW5lciAgIDogJyhzdHJpbmd8ZWxlbWVudHxib29sZWFuKSdcbiAgfVxuXG4gIGNvbnN0IEF0dGFjaG1lbnRNYXAgPSB7XG4gICAgVE9QICAgIDogJ2JvdHRvbSBjZW50ZXInLFxuICAgIFJJR0hUICA6ICdtaWRkbGUgbGVmdCcsXG4gICAgQk9UVE9NIDogJ3RvcCBjZW50ZXInLFxuICAgIExFRlQgICA6ICdtaWRkbGUgcmlnaHQnXG4gIH1cblxuICBjb25zdCBIb3ZlclN0YXRlID0ge1xuICAgIFNIT1cgOiAnc2hvdycsXG4gICAgT1VUICA6ICdvdXQnXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICAgIEhJRERFTiAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICAgIElOU0VSVEVEICAgOiBgaW5zZXJ0ZWQke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICAgIEZPQ1VTSU4gICAgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfWAsXG4gICAgRk9DVVNPVVQgICA6IGBmb2N1c291dCR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VFTlRFUiA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUxFQVZFIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gXG4gIH1cblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgRkFERSA6ICdmYWRlJyxcbiAgICBTSE9XIDogJ3Nob3cnXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBUT09MVElQICAgICAgIDogJy50b29sdGlwJyxcbiAgICBUT09MVElQX0lOTkVSIDogJy50b29sdGlwLWlubmVyJ1xuICB9XG5cbiAgY29uc3QgVGV0aGVyQ2xhc3MgPSB7XG4gICAgZWxlbWVudCA6IGZhbHNlLFxuICAgIGVuYWJsZWQgOiBmYWxzZVxuICB9XG5cbiAgY29uc3QgVHJpZ2dlciA9IHtcbiAgICBIT1ZFUiAgOiAnaG92ZXInLFxuICAgIEZPQ1VTICA6ICdmb2N1cycsXG4gICAgQ0xJQ0sgIDogJ2NsaWNrJyxcbiAgICBNQU5VQUwgOiAnbWFudWFsJ1xuICB9XG5cblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNsYXNzIFRvb2x0aXAge1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG5cbiAgICAgIC8vIHByaXZhdGVcbiAgICAgIHRoaXMuX2lzRW5hYmxlZCAgICAgICAgPSB0cnVlXG4gICAgICB0aGlzLl90aW1lb3V0ICAgICAgICAgID0gMFxuICAgICAgdGhpcy5faG92ZXJTdGF0ZSAgICAgICA9ICcnXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyICAgID0ge31cbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyAgPSBmYWxzZVxuICAgICAgdGhpcy5fdGV0aGVyICAgICAgICAgICA9IG51bGxcblxuICAgICAgLy8gcHJvdGVjdGVkXG4gICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICB0aGlzLmNvbmZpZyAgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKVxuICAgICAgdGhpcy50aXAgICAgID0gbnVsbFxuXG4gICAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKVxuXG4gICAgfVxuXG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUVcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERBVEFfS0VZKCkge1xuICAgICAgcmV0dXJuIERBVEFfS0VZXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBFdmVudCgpIHtcbiAgICAgIHJldHVybiBFdmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRVZFTlRfS0VZKCkge1xuICAgICAgcmV0dXJuIEVWRU5UX0tFWVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgICB9XG5cblxuICAgIC8vIHB1YmxpY1xuXG4gICAgZW5hYmxlKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIHRvZ2dsZUVuYWJsZWQoKSB7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSAhdGhpcy5faXNFbmFibGVkXG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0YUtleSA9IHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVlcbiAgICAgICAgbGV0IGNvbnRleHQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSlcblxuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoXG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgICAgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKVxuICAgICAgICAgIClcbiAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXIuY2xpY2sgPSAhY29udGV4dC5fYWN0aXZlVHJpZ2dlci5jbGlja1xuXG4gICAgICAgIGlmIChjb250ZXh0Ll9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgICBjb250ZXh0Ll9lbnRlcihudWxsLCBjb250ZXh0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRleHQuX2xlYXZlKG51bGwsIGNvbnRleHQpXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoJCh0aGlzLmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VudGVyKG51bGwsIHRoaXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KVxuXG4gICAgICB0aGlzLmNsZWFudXBUZXRoZXIoKVxuXG4gICAgICAkLnJlbW92ZURhdGEodGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKVxuXG4gICAgICAkKHRoaXMuZWxlbWVudCkub2ZmKHRoaXMuY29uc3RydWN0b3IuRVZFTlRfS0VZKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmNsb3Nlc3QoJy5tb2RhbCcpLm9mZignaGlkZS5icy5tb2RhbCcpXG5cbiAgICAgIGlmICh0aGlzLnRpcCkge1xuICAgICAgICAkKHRoaXMudGlwKS5yZW1vdmUoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc0VuYWJsZWQgICAgID0gbnVsbFxuICAgICAgdGhpcy5fdGltZW91dCAgICAgICA9IG51bGxcbiAgICAgIHRoaXMuX2hvdmVyU3RhdGUgICAgPSBudWxsXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0gbnVsbFxuICAgICAgdGhpcy5fdGV0aGVyICAgICAgICA9IG51bGxcblxuICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICAgICAgdGhpcy5jb25maWcgID0gbnVsbFxuICAgICAgdGhpcy50aXAgICAgID0gbnVsbFxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBpZiAoJCh0aGlzLmVsZW1lbnQpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgdXNlIHNob3cgb24gdmlzaWJsZSBlbGVtZW50cycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5TSE9XKVxuICAgICAgaWYgKHRoaXMuaXNXaXRoQ29udGVudCgpICYmIHRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUb29sdGlwIGlzIHRyYW5zaXRpb25pbmcnKVxuICAgICAgICB9XG4gICAgICAgICQodGhpcy5lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudClcblxuICAgICAgICBjb25zdCBpc0luVGhlRG9tID0gJC5jb250YWlucyhcbiAgICAgICAgICB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgdGhpcy5lbGVtZW50XG4gICAgICAgIClcblxuICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0aXAgICA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpXG4gICAgICAgIGNvbnN0IHRpcElkID0gVXRpbC5nZXRVSUQodGhpcy5jb25zdHJ1Y3Rvci5OQU1FKVxuXG4gICAgICAgIHRpcC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGlwSWQpXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZClcblxuICAgICAgICB0aGlzLnNldENvbnRlbnQoKVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgICAgICAkKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbGFjZW1lbnQgID0gdHlwZW9mIHRoaXMuY29uZmlnLnBsYWNlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgdGhpcy5jb25maWcucGxhY2VtZW50LmNhbGwodGhpcywgdGlwLCB0aGlzLmVsZW1lbnQpIDpcbiAgICAgICAgICB0aGlzLmNvbmZpZy5wbGFjZW1lbnRcblxuICAgICAgICBjb25zdCBhdHRhY2htZW50ID0gdGhpcy5fZ2V0QXR0YWNobWVudChwbGFjZW1lbnQpXG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb25maWcuY29udGFpbmVyID09PSBmYWxzZSA/IGRvY3VtZW50LmJvZHkgOiAkKHRoaXMuY29uZmlnLmNvbnRhaW5lcilcblxuICAgICAgICAkKHRpcClcbiAgICAgICAgICAuZGF0YSh0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZLCB0aGlzKVxuICAgICAgICAgIC5hcHBlbmRUbyhjb250YWluZXIpXG5cbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5JTlNFUlRFRClcblxuICAgICAgICB0aGlzLl90ZXRoZXIgPSBuZXcgVGV0aGVyKHtcbiAgICAgICAgICBhdHRhY2htZW50LFxuICAgICAgICAgIGVsZW1lbnQgICAgICAgICA6IHRpcCxcbiAgICAgICAgICB0YXJnZXQgICAgICAgICAgOiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgY2xhc3NlcyAgICAgICAgIDogVGV0aGVyQ2xhc3MsXG4gICAgICAgICAgY2xhc3NQcmVmaXggICAgIDogQ0xBU1NfUFJFRklYLFxuICAgICAgICAgIG9mZnNldCAgICAgICAgICA6IHRoaXMuY29uZmlnLm9mZnNldCxcbiAgICAgICAgICBjb25zdHJhaW50cyAgICAgOiB0aGlzLmNvbmZpZy5jb25zdHJhaW50cyxcbiAgICAgICAgICBhZGRUYXJnZXRDbGFzc2VzOiBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIFV0aWwucmVmbG93KHRpcClcbiAgICAgICAgdGhpcy5fdGV0aGVyLnBvc2l0aW9uKClcblxuICAgICAgICAkKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJldkhvdmVyU3RhdGUgPSB0aGlzLl9ob3ZlclN0YXRlXG4gICAgICAgICAgdGhpcy5faG92ZXJTdGF0ZSAgID0gbnVsbFxuICAgICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlXG5cbiAgICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LlNIT1dOKVxuXG4gICAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLk9VVCkge1xuICAgICAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVXRpbC5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSAmJiAkKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlXG4gICAgICAgICAgJCh0aGlzLnRpcClcbiAgICAgICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpXG4gICAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5fVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKGNhbGxiYWNrKSB7XG4gICAgICBjb25zdCB0aXAgICAgICAgPSB0aGlzLmdldFRpcEVsZW1lbnQoKVxuICAgICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkhJREUpXG4gICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVG9vbHRpcCBpcyB0cmFuc2l0aW9uaW5nJylcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBsZXRlICA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2hvdmVyU3RhdGUgIT09IEhvdmVyU3RhdGUuU0hPVyAmJiB0aXAucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRpcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRpcClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkhJRERFTilcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgICAgdGhpcy5jbGVhbnVwVGV0aGVyKClcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuXG4gICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAkKHRpcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVHJpZ2dlci5DTElDS10gPSBmYWxzZVxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUcmlnZ2VyLkZPQ1VTXSA9IGZhbHNlXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuSE9WRVJdID0gZmFsc2VcblxuICAgICAgaWYgKFV0aWwuc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiZcbiAgICAgICAgICAkKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZVxuICAgICAgICAkKHRpcClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hvdmVyU3RhdGUgPSAnJ1xuICAgIH1cblxuXG4gICAgLy8gcHJvdGVjdGVkXG5cbiAgICBpc1dpdGhDb250ZW50KCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5nZXRUaXRsZSgpKVxuICAgIH1cblxuICAgIGdldFRpcEVsZW1lbnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aXAgPSB0aGlzLnRpcCB8fCAkKHRoaXMuY29uZmlnLnRlbXBsYXRlKVswXVxuICAgIH1cblxuICAgIHNldENvbnRlbnQoKSB7XG4gICAgICBjb25zdCAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSlcblxuICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuVE9PTFRJUF9JTk5FUiksIHRoaXMuZ2V0VGl0bGUoKSlcblxuICAgICAgJHRpcC5yZW1vdmVDbGFzcyhgJHtDbGFzc05hbWUuRkFERX0gJHtDbGFzc05hbWUuU0hPV31gKVxuXG4gICAgICB0aGlzLmNsZWFudXBUZXRoZXIoKVxuICAgIH1cblxuICAgIHNldEVsZW1lbnRDb250ZW50KCRlbGVtZW50LCBjb250ZW50KSB7XG4gICAgICBjb25zdCBodG1sID0gdGhpcy5jb25maWcuaHRtbFxuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0JyAmJiAoY29udGVudC5ub2RlVHlwZSB8fCBjb250ZW50LmpxdWVyeSkpIHtcbiAgICAgICAgLy8gY29udGVudCBpcyBhIERPTSBub2RlIG9yIGEgalF1ZXJ5XG4gICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgaWYgKCEkKGNvbnRlbnQpLnBhcmVudCgpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICAgJGVsZW1lbnQuZW1wdHkoKS5hcHBlbmQoY29udGVudClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGVsZW1lbnQudGV4dCgkKGNvbnRlbnQpLnRleHQoKSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGVsZW1lbnRbaHRtbCA/ICdodG1sJyA6ICd0ZXh0J10oY29udGVudClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUaXRsZSgpIHtcbiAgICAgIGxldCB0aXRsZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuXG4gICAgICBpZiAoIXRpdGxlKSB7XG4gICAgICAgIHRpdGxlID0gdHlwZW9mIHRoaXMuY29uZmlnLnRpdGxlID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICB0aGlzLmNvbmZpZy50aXRsZS5jYWxsKHRoaXMuZWxlbWVudCkgOlxuICAgICAgICAgIHRoaXMuY29uZmlnLnRpdGxlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aXRsZVxuICAgIH1cblxuICAgIGNsZWFudXBUZXRoZXIoKSB7XG4gICAgICBpZiAodGhpcy5fdGV0aGVyKSB7XG4gICAgICAgIHRoaXMuX3RldGhlci5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHByaXZhdGVcblxuICAgIF9nZXRBdHRhY2htZW50KHBsYWNlbWVudCkge1xuICAgICAgcmV0dXJuIEF0dGFjaG1lbnRNYXBbcGxhY2VtZW50LnRvVXBwZXJDYXNlKCldXG4gICAgfVxuXG4gICAgX3NldExpc3RlbmVycygpIHtcbiAgICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5jb25maWcudHJpZ2dlci5zcGxpdCgnICcpXG5cbiAgICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgICAgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgICAkKHRoaXMuZWxlbWVudCkub24oXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkNMSUNLLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMudG9nZ2xlKGV2ZW50KVxuICAgICAgICAgIClcblxuICAgICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT09IFRyaWdnZXIuTUFOVUFMKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnRJbiAgPSB0cmlnZ2VyID09PSBUcmlnZ2VyLkhPVkVSID9cbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuRXZlbnQuTU9VU0VFTlRFUiA6XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTSU5cbiAgICAgICAgICBjb25zdCBldmVudE91dCA9IHRyaWdnZXIgPT09IFRyaWdnZXIuSE9WRVIgP1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUxFQVZFIDpcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNPVVRcblxuICAgICAgICAgICQodGhpcy5lbGVtZW50KVxuICAgICAgICAgICAgLm9uKFxuICAgICAgICAgICAgICBldmVudEluLFxuICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zZWxlY3RvcixcbiAgICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9lbnRlcihldmVudClcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5vbihcbiAgICAgICAgICAgICAgZXZlbnRPdXQsXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdG9yLFxuICAgICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2xlYXZlKGV2ZW50KVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLmNsb3Nlc3QoJy5tb2RhbCcpLm9uKFxuICAgICAgICAgICdoaWRlLmJzLm1vZGFsJyxcbiAgICAgICAgICAoKSA9PiB0aGlzLmhpZGUoKVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5jb25maWcsIHtcbiAgICAgICAgICB0cmlnZ2VyICA6ICdtYW51YWwnLFxuICAgICAgICAgIHNlbGVjdG9yIDogJydcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZpeFRpdGxlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZml4VGl0bGUoKSB7XG4gICAgICBjb25zdCB0aXRsZVR5cGUgPSB0eXBlb2YgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScpXG4gICAgICBpZiAodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fFxuICAgICAgICAgdGl0bGVUeXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICdkYXRhLW9yaWdpbmFsLXRpdGxlJyxcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8ICcnXG4gICAgICAgIClcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZW50ZXIoZXZlbnQsIGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZXG5cbiAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5KVxuXG4gICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKFxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgICAgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKVxuICAgICAgICApXG4gICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlcltcbiAgICAgICAgICBldmVudC50eXBlID09PSAnZm9jdXNpbicgPyBUcmlnZ2VyLkZPQ1VTIDogVHJpZ2dlci5IT1ZFUlxuICAgICAgICBdID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJChjb250ZXh0LmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpIHx8XG4gICAgICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLlNIT1cpIHtcbiAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuU0hPV1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpXG5cbiAgICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLlNIT1dcblxuICAgICAgaWYgKCFjb250ZXh0LmNvbmZpZy5kZWxheSB8fCAhY29udGV4dC5jb25maWcuZGVsYXkuc2hvdykge1xuICAgICAgICBjb250ZXh0LnNob3coKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29udGV4dC5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5TSE9XKSB7XG4gICAgICAgICAgY29udGV4dC5zaG93KClcbiAgICAgICAgfVxuICAgICAgfSwgY29udGV4dC5jb25maWcuZGVsYXkuc2hvdylcbiAgICB9XG5cbiAgICBfbGVhdmUoZXZlbnQsIGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZXG5cbiAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5KVxuXG4gICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKFxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgICAgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKVxuICAgICAgICApXG4gICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlcltcbiAgICAgICAgICBldmVudC50eXBlID09PSAnZm9jdXNvdXQnID8gVHJpZ2dlci5GT0NVUyA6IFRyaWdnZXIuSE9WRVJcbiAgICAgICAgXSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChjb250ZXh0Ll9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dChjb250ZXh0Ll90aW1lb3V0KVxuXG4gICAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5PVVRcblxuICAgICAgaWYgKCFjb250ZXh0LmNvbmZpZy5kZWxheSB8fCAhY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSkge1xuICAgICAgICBjb250ZXh0LmhpZGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29udGV4dC5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5PVVQpIHtcbiAgICAgICAgICBjb250ZXh0LmhpZGUoKVxuICAgICAgICB9XG4gICAgICB9LCBjb250ZXh0LmNvbmZpZy5kZWxheS5oaWRlKVxuICAgIH1cblxuICAgIF9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkge1xuICAgICAgZm9yIChjb25zdCB0cmlnZ2VyIGluIHRoaXMuX2FjdGl2ZVRyaWdnZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRyaWdnZXJbdHJpZ2dlcl0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSAkLmV4dGVuZChcbiAgICAgICAge30sXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLmRhdGEoKSxcbiAgICAgICAgY29uZmlnXG4gICAgICApXG5cbiAgICAgIGlmIChjb25maWcuZGVsYXkgJiYgdHlwZW9mIGNvbmZpZy5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICAgIHNob3cgOiBjb25maWcuZGVsYXksXG4gICAgICAgICAgaGlkZSA6IGNvbmZpZy5kZWxheVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKFxuICAgICAgICBOQU1FLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGVcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cblxuICAgIF9nZXREZWxlZ2F0ZUNvbmZpZygpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHt9XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRba2V5XSAhPT0gdGhpcy5jb25maWdba2V5XSkge1xuICAgICAgICAgICAgY29uZmlnW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG5cblxuICAgIC8vIHN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgICAgICA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZ1xuXG4gICAgICAgIGlmICghZGF0YSAmJiAvZGlzcG9zZXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBfY29uZmlnKVxuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogalF1ZXJ5XG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAkLmZuW05BTUVdICAgICAgICAgICAgID0gVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBUb29sdGlwXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBUb29sdGlwXG5cbn0pKGpRdWVyeSlcblxuXG4iLCJcblxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS42KTogcG9wb3Zlci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgUG9wb3ZlciA9ICgoJCkgPT4ge1xuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb25zdGFudHNcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAncG9wb3ZlcidcbiAgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICA9ICc0LjAuMC1hbHBoYS42J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLnBvcG92ZXInXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuXG4gIGNvbnN0IERlZmF1bHQgPSAkLmV4dGVuZCh7fSwgVG9vbHRpcC5EZWZhdWx0LCB7XG4gICAgcGxhY2VtZW50IDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyICAgOiAnY2xpY2snLFxuICAgIGNvbnRlbnQgICA6ICcnLFxuICAgIHRlbXBsYXRlICA6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+J1xuICAgICAgICAgICAgICArICc8aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+PC9oMz4nXG4gICAgICAgICAgICAgICsgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nXG4gIH0pXG5cbiAgY29uc3QgRGVmYXVsdFR5cGUgPSAkLmV4dGVuZCh7fSwgVG9vbHRpcC5EZWZhdWx0VHlwZSwge1xuICAgIGNvbnRlbnQgOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKSdcbiAgfSlcblxuICBjb25zdCBDbGFzc05hbWUgPSB7XG4gICAgRkFERSA6ICdmYWRlJyxcbiAgICBTSE9XIDogJ3Nob3cnXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBUSVRMRSAgIDogJy5wb3BvdmVyLXRpdGxlJyxcbiAgICBDT05URU5UIDogJy5wb3BvdmVyLWNvbnRlbnQnXG4gIH1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBISURFICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICAgIEhJRERFTiAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICAgIFNIT1dOICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICAgIElOU0VSVEVEICAgOiBgaW5zZXJ0ZWQke0VWRU5UX0tFWX1gLFxuICAgIENMSUNLICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICAgIEZPQ1VTSU4gICAgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfWAsXG4gICAgRk9DVVNPVVQgICA6IGBmb2N1c291dCR7RVZFTlRfS0VZfWAsXG4gICAgTU9VU0VFTlRFUiA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgICBNT1VTRUxFQVZFIDogYG1vdXNlbGVhdmUke0VWRU5UX0tFWX1gXG4gIH1cblxuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY2xhc3MgUG9wb3ZlciBleHRlbmRzIFRvb2x0aXAge1xuXG5cbiAgICAvLyBnZXR0ZXJzXG5cbiAgICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgICByZXR1cm4gVkVSU0lPTlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUVcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERBVEFfS0VZKCkge1xuICAgICAgcmV0dXJuIERBVEFfS0VZXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBFdmVudCgpIHtcbiAgICAgIHJldHVybiBFdmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRVZFTlRfS0VZKCkge1xuICAgICAgcmV0dXJuIEVWRU5UX0tFWVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgICB9XG5cblxuICAgIC8vIG92ZXJyaWRlc1xuXG4gICAgaXNXaXRoQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgfVxuXG4gICAgZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQodGhpcy5jb25maWcudGVtcGxhdGUpWzBdXG4gICAgfVxuXG4gICAgc2V0Q29udGVudCgpIHtcbiAgICAgIGNvbnN0ICR0aXAgPSAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKVxuXG4gICAgICAvLyB3ZSB1c2UgYXBwZW5kIGZvciBodG1sIG9iamVjdHMgdG8gbWFpbnRhaW4ganMgZXZlbnRzXG4gICAgICB0aGlzLnNldEVsZW1lbnRDb250ZW50KCR0aXAuZmluZChTZWxlY3Rvci5USVRMRSksIHRoaXMuZ2V0VGl0bGUoKSlcbiAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLkNPTlRFTlQpLCB0aGlzLl9nZXRDb250ZW50KCkpXG5cbiAgICAgICR0aXAucmVtb3ZlQ2xhc3MoYCR7Q2xhc3NOYW1lLkZBREV9ICR7Q2xhc3NOYW1lLlNIT1d9YClcblxuICAgICAgdGhpcy5jbGVhbnVwVGV0aGVyKClcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlXG5cbiAgICBfZ2V0Q29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKVxuICAgICAgICB8fCAodHlwZW9mIHRoaXMuY29uZmlnLmNvbnRlbnQgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jb250ZW50LmNhbGwodGhpcy5lbGVtZW50KSA6XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnLmNvbnRlbnQpXG4gICAgfVxuXG5cbiAgICAvLyBzdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhICAgICAgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGxcblxuICAgICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgX2NvbmZpZylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBqUXVlcnlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gICQuZm5bTkFNRV0gICAgICAgICAgICAgPSBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFBvcG92ZXJcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIFBvcG92ZXJcblxufSkoalF1ZXJ5KVxuXG5cbiJdfQ==