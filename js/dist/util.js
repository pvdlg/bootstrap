

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

  var MILLIS = 1000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  var TRANSITION_END = 'bsTransitionEnd';

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
    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }
    // If the browser doesn't support transitionEnd then use the custom TRANSITION_END event
    return {
      end: TRANSITION_END
    };
  }

  function getCssTransitionDuration(element) {
    // let duration
    var durationArray = [];
    element.each(function () {
      var durationValues = element.css('transition-duration') || element.css('-webkit-transition-duration') || element.css('-moz-transition-duration') || element.css('-ms-transition-duration') || element.css('-o-transition-duration');
      if (durationValues) {
        durationArray = durationArray.concat(durationValues.split(','));
      }
    });
    $.each(durationArray, function (index, value) {
      durationArray[index] = parseFloat(value);
    });
    return durationArray.sort(function (a, b) {
      return b - a;
    })[0];
  }

  function transitionEmulator(start, complete) {
    var _this = this;

    // determine the longest transition duration (in case there is a transition on multiple attributes) from the css
    var duration = getCssTransitionDuration(this);
    // if there is a non 0 transition duration and transition are supported
    if (duration) {
      (function () {
        var called = false;
        _this.one(TRANSITION_END, function () {
          if (!called) {
            called = true;
            executeCallback(complete);
          }
        });
        // set a timeout to call complete in case (instead of using transitionend that can sometimes not be triggered). This way we can guarantee complete is always called
        setTimeout(function () {
          if (!called) {
            called = true;
            executeCallback(complete);
          }
        }, duration * MILLIS);
        // execute the start transition function, after setting the timeout
        executeCallback(start);
      })();
    } else {
      executeCallback(start);
      executeCallback(complete);
    }
    return this;
  }

  function executeCallback(callback) {
    if (callback) {
      callback();
    }
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();
    $.fn.transition = transitionEmulator;
    $.event.special[TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getTargets: function getTargets(element) {
      var selector = element.getAttribute('data-target');
      if (!selector) {
        selector = element.getAttribute('href') || '';
      }
      try {
        return $(document).find(selector);
      } catch (err) {
        return $();
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
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
//# sourceMappingURL=util.js.map
