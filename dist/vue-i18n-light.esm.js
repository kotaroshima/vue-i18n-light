var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

// TODO : investigate if we can do one-time binding
var KEY_DELIMITER = '.';

var index = {
  install: function install(Vue) {
    var i18nOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // expose shorthand you can write 'vm.i18n' rather than 'vm.$options.i18n'
    var optionName = i18nOptions.optionName || 'i18n';
    i18nOptions.optionName = optionName;
    Object.defineProperty(Vue.prototype, optionName, {
      get: function get$$1() {
        return this.$options[optionName];
      }
    });

    if (i18nOptions.templating) {
      var templateFuncName = i18nOptions.templating.funcName || '$t';
      i18nOptions.templating.funcName = templateFuncName;
      var template = i18nOptions.templating.engine;

      var getByKeys = function getByKeys(data, keys) {
        var _keys = toArray(keys),
            key = _keys[0],
            remainingKeys = _keys.slice(1);

        if (!data[key] || typeof data[key] === 'string') {
          return data[key];
        } else {
          return getByKeys(data[key], remainingKeys);
        }
      };

      Object.defineProperty(Vue.prototype, templateFuncName, {
        get: function get$$1() {
          var _this = this;

          return function (key, options) {
            var str = getByKeys(_this[optionName], key.split(KEY_DELIMITER));
            return template(str)(options);
          };
        }
      });
    }
  }
};

export default index;
