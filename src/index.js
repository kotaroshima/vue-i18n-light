const KEY_DELIMITER = '.';

export default {
  install(Vue, i18nOptions = {}) {
    // expose shorthand you can write 'vm.i18n' rather than 'vm.$options.i18n'
    const optionName = i18nOptions.optionName || 'i18n';
    i18nOptions.optionName = optionName;
    Object.defineProperty(Vue.prototype, optionName, {
      get() {
        return this.$options[optionName];
      },
    });

    if (i18nOptions.templating) {
      const templateFuncName = i18nOptions.templating.funcName || '$t';
      i18nOptions.templating.funcName = templateFuncName;
      const template = i18nOptions.templating.engine;

      const getByKeys = (data, keys) => {
        const [key, ...remainingKeys] = keys;
        if (!data[key] || typeof data[key] === 'string') {
          return data[key];
        } else {
          return getByKeys(data[key], remainingKeys);
        }
      };

      Object.defineProperty(Vue.prototype, templateFuncName, {
        get() {
          return (key, options) => {
            const str = getByKeys(this[optionName], key.split(KEY_DELIMITER));
            return template(str)(options);
          };
        },
      });
    }
  },
};
