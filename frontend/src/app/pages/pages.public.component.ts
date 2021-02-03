import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const jQuery: any;
declare const window: any;
declare let transition: any;

@Component({
  selector: 'app-pages-public',
  templateUrl: './pages.public.component.html',
})
export class PagesPublicComponent implements OnInit {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      (function ($) {
        $('#main_nav').collapse('hide');
      })(jQuery);
    });
  }

  ngOnInit(): void {
    (function ($) {
      'use strict';

      var _jquery2 = _interopRequireDefault($);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule
          ? obj
          : {
            default: obj,
          };
      }

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (obj) {
            return typeof obj;
          }
          : function (obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          };

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      var Util = (function ($) {
        transition = false;

        var TransitionEndEvent = {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend',
          transition: 'transitionend',
        };

        function getSpecialTransitionEndEvent() {
          return {
            bindType: transition.end,
            delegateType: transition.end,
            handle: function handle(event) {
              if ($(event.target).is(this)) {
                return event.handleObj.handler.apply(this, arguments);
              }
              return undefined;
            },
          };
        }

        function transitionEndTest() {
          if (window.QUnit) {
            return false;
          }

          var el = document.createElement('mm');

          for (var name in TransitionEndEvent) {
            if (el.style[name] !== undefined) {
              return {
                end: TransitionEndEvent[name],
              };
            }
          }

          return false;
        }

        function transitionEndEmulator(duration) {
          var _this2 = this;

          var called = false;

          $(this).one(Util.TRANSITION_END, function () {
            called = true;
          });

          setTimeout(function () {
            if (!called) {
              Util.triggerTransitionEnd(_this2);
            }
          }, duration);

          return this;
        }

        function setTransitionEndSupport() {
          transition = transitionEndTest();
          $.fn.emulateTransitionEnd = transitionEndEmulator;

          if (Util.supportsTransitionEnd()) {
            $.event.special[
              Util.TRANSITION_END
            ] = getSpecialTransitionEndEvent();
          }
        }

        var Util = {
          TRANSITION_END: 'mmTransitionEnd',

          triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(transition.end);
          },
          supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(transition);
          },
        };

        setTransitionEndSupport();

        return Util;
      })(jQuery);

      var AdminMenu = (function ($) {
        var NAME = 'AdminMenu';
        var DATA_KEY = 'AdminMenu';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 350;

        var Default = {
          toggle: true,
          preventDefault: true,
          activeClass: 'active',
          collapseClass: 'collapse',
          collapseInClass: 'in',
          collapsingClass: 'collapsing',
          triggerElement: 'a',
          parentTrigger: 'li',
          subMenu: 'ul',
        };

        var Event = {
          SHOW: 'show' + EVENT_KEY,
          SHOWN: 'shown' + EVENT_KEY,
          HIDE: 'hide' + EVENT_KEY,
          HIDDEN: 'hidden' + EVENT_KEY,
          CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
        };

        var AdminMenu = (function () {
          function AdminMenu(element, config) {
            _classCallCheck(this, AdminMenu);

            this._element = element;
            this._config = this._getConfig(config);
            this._transitioning = null;

            this.init();
          }

          AdminMenu.prototype.init = function init() {
            var self = this;
            $(this._element)
              .find(this._config.parentTrigger + '.' + this._config.activeClass)
              .has(this._config.subMenu)
              .children(this._config.subMenu)
              .attr('aria-expanded', true)
              .addClass(
                this._config.collapseClass + ' ' + this._config.collapseInClass
              );

            $(this._element)
              .find(this._config.parentTrigger)
              .not('.' + this._config.activeClass)
              .has(this._config.subMenu)
              .children(this._config.subMenu)
              .attr('aria-expanded', false)
              .addClass(this._config.collapseClass);

            $(this._element)
              .find(this._config.parentTrigger)
              .has(this._config.subMenu)
              .children(this._config.triggerElement)
              .on(Event.CLICK_DATA_API, function (e) {
                var _this = $(this);
                var _parent = _this.parent(self._config.parentTrigger);
                var _siblings = _parent
                  .siblings(self._config.parentTrigger)
                  .children(self._config.triggerElement);
                var _list = _parent.children(self._config.subMenu);
                if (self._config.preventDefault) {
                  e.preventDefault();
                }
                if (_this.attr('aria-disabled') === 'true') {
                  return;
                }
                if (_parent.hasClass(self._config.activeClass)) {
                  _this.attr('aria-expanded', false);
                  self._hide(_list);
                } else {
                  self._show(_list);
                  _this.attr('aria-expanded', true);
                  if (self._config.toggle) {
                    _siblings.attr('aria-expanded', false);
                  }
                }

                if (self._config.onTransitionStart) {
                  self._config.onTransitionStart(e);
                }
              });
          };

          AdminMenu.prototype._show = function _show(element) {
            if (
              this._transitioning ||
              $(element).hasClass(this._config.collapsingClass)
            ) {
              return;
            }
            var _this = this;
            var _el = $(element);

            var startEvent = $.Event(Event.SHOW);
            _el.trigger(startEvent);

            if (startEvent.isDefaultPrevented()) {
              return;
            }

            _el
              .parent(this._config.parentTrigger)
              .addClass(this._config.activeClass);

            if (this._config.toggle) {
              this._hide(
                _el
                  .parent(this._config.parentTrigger)
                  .siblings()
                  .children(
                    this._config.subMenu + '.' + this._config.collapseInClass
                  )
                  .attr('aria-expanded', false)
              );
            }

            _el
              .removeClass(this._config.collapseClass)
              .addClass(this._config.collapsingClass)
              .height(0);

            this.setTransitioning(true);

            var complete = function complete() {
              _el
                .removeClass(_this._config.collapsingClass)
                .addClass(
                  _this._config.collapseClass +
                  ' ' +
                  _this._config.collapseInClass
                )
                .height('')
                .attr('aria-expanded', true);

              _this.setTransitioning(false);

              _el.trigger(Event.SHOWN);
            };

            if (!Util.supportsTransitionEnd()) {
              complete();
              return;
            }

            _el
              .height(_el[0].scrollHeight)
              .one(Util.TRANSITION_END, complete)
              .emulateTransitionEnd(TRANSITION_DURATION);
          };

          AdminMenu.prototype._hide = function _hide(element) {
            if (
              this._transitioning ||
              !$(element).hasClass(this._config.collapseInClass)
            ) {
              return;
            }
            var _this = this;
            var _el = $(element);

            var startEvent = $.Event(Event.HIDE);
            _el.trigger(startEvent);

            if (startEvent.isDefaultPrevented()) {
              return;
            }

            _el
              .parent(this._config.parentTrigger)
              .removeClass(this._config.activeClass);
            _el.height(_el.height())[0].offsetHeight;

            _el
              .addClass(this._config.collapsingClass)
              .removeClass(this._config.collapseClass)
              .removeClass(this._config.collapseInClass);

            this.setTransitioning(true);

            var complete = function complete() {
              if (_this._transitioning && _this._config.onTransitionEnd) {
                _this._config.onTransitionEnd();
              }

              _this.setTransitioning(false);
              _el.trigger(Event.HIDDEN);

              _el
                .removeClass(_this._config.collapsingClass)
                .addClass(_this._config.collapseClass)
                .attr('aria-expanded', false);
            };

            if (!Util.supportsTransitionEnd()) {
              complete();
              return;
            }

            _el.height() == 0 || _el.css('display') == 'none'
              ? complete()
              : _el
                .height(0)
                .one(Util.TRANSITION_END, complete)
                .emulateTransitionEnd(TRANSITION_DURATION);
          };

          AdminMenu.prototype.setTransitioning = function setTransitioning(
            isTransitioning
          ) {
            this._transitioning = isTransitioning;
          };

          AdminMenu.prototype.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);

            $(this._element)
              .find(this._config.parentTrigger)
              .has(this._config.subMenu)
              .children(this._config.triggerElement)
              .off('click');

            this._transitioning = null;
            this._config = null;
            this._element = null;
          };

          AdminMenu.prototype._getConfig = function _getConfig(config) {
            config = $.extend({}, Default, config);
            return config;
          };

          AdminMenu._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
              var $this = $(this);
              var data = $this.data(DATA_KEY);
              var _config = $.extend(
                {},
                Default,
                $this.data(),
                (typeof config === 'undefined'
                  ? 'undefined'
                  : _typeof(config)) === 'object' && config
              );

              if (!data && /dispose/.test(config)) {
                this.dispose();
              }

              if (!data) {
                data = new AdminMenu(this, _config);
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

          return AdminMenu;
        })();

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = AdminMenu._jQueryInterface;
        $.fn[NAME].Constructor = AdminMenu;
        $.fn[NAME].noConflict = function () {
          $.fn[NAME] = JQUERY_NO_CONFLICT;
          return AdminMenu._jQueryInterface;
        };
        return AdminMenu;
      })(jQuery);
    });

    (function ($) {
      'use strict';
      $(function () {
        $('.preloader').fadeOut();
      }),
        jQuery(document).on('click', '.mega-dropdown', function (e) {
          e.stopPropagation();
        });
      var set = function () {
        (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1170
          ? ($('body').addClass('mini-sidebar'),
            $('.navbar-brand span').hide(),
            $('.sidebartoggler i').addClass('ti-menu'))
          : ($('body').removeClass('mini-sidebar'),
            $('.navbar-brand span').show());
        var height =
          (window.innerHeight > 0 ? window.innerHeight : this.screen.height) -
          1;
        (height -= 0) < 1 && (height = 1),
          height > 0 && $('.page-wrapper').css('min-height', height + 'px');
      };
      $(window).ready(set),
        $(window).on('resize', set),
        $('.sidebartoggler').on('click', function () {
          $('body').hasClass('mini-sidebar')
            ? ($('body').trigger('resize'),
              $('body').removeClass('mini-sidebar'),
              $('.navbar-brand span').show())
            : ($('body').trigger('resize'),
              $('body').addClass('mini-sidebar'),
              $('.navbar-brand span').hide());
        }),
        $('.nav-toggler').click(function () {
          $('body').toggleClass('show-sidebar'),
            $('.nav-toggler i').toggleClass('ti-menu'),
            $('.nav-toggler i').addClass('ti-close');
        }),
        $('.search-box a, .search-box .app-search .srh-btn').on(
          'click',
          function () {
            $('.app-search').toggle(200);
          }
        ),
        $('.right-side-toggle').click(function () {
          $('.right-sidebar').slideDown(50),
            $('.right-sidebar').toggleClass('shw-rside');
        }),
        $('.floating-labels .form-control')
          .on('focus blur', function (e) {
            $(this)
              .parents('.form-group')
              .toggleClass(
                'focused',
                'focus' === e.type || this.value.length > 0
              );
          })
          .trigger('blur'),
        $(function () {
          for (
            var url = window.location,
            element = $('ul#sidebarnav a')
              .filter(function () {
                return this.href == url;
              })
              .addClass('active')
              .parent()
              .addClass('active');
            ;

          ) {
            if (!element.is('li')) break;
            element = element
              .parent()
              .addClass('in')
              .parent()
              .addClass('active');
          }
        }),
        $(function () {
          $('[data-toggle="tooltip"]').tooltip();
        }),
        $(function () {
          $('[data-toggle="popover"]').popover();
        }),
        $('body').trigger('resize'),
        $('.list-task li label').click(function () {
          $(this).toggleClass('task-done');
        }),
        $('a[data-action="collapse"]').on('click', function (e) {
          e.preventDefault(),
            $(this)
              .closest('.card')
              .find('[data-action="collapse"] i')
              .toggleClass('ti-minus ti-plus'),
            $(this).closest('.card').children('.card-body').collapse('toggle');
        }),
        $('a[data-action="expand"]').on('click', function (e) {
          e.preventDefault(),
            $(this)
              .closest('.card')
              .find('[data-action="expand"] i')
              .toggleClass('mdi-arrow-expand mdi-arrow-compress'),
            $(this).closest('.card').toggleClass('card-fullscreen');
        }),
        $('a[data-action="close"]').on('click', function () {
          $(this).closest('.card').removeClass().slideUp('fast');
        });
    })(jQuery);
  }
}
