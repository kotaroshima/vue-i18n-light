# vue-i18n-light

Super-light i18n plugin for Vue.js

- _**Light bootstrap code**_ : The main objective of this plugin was to make bootstrap code as small as possible in terms of i18n. Instead of loading all i18n resources together at once, have each component load required i18n resources so that they can be lazy loaded.
- _**Small footprint**_ : This plugin delegates templating to external libraries (such as [ejs](http://ejs.co/), [lodash.template](https://www.npmjs.com/package/lodash.template), [underscore.template](https://www.npmjs.com/package/underscore.template), etc). So this plugin itself doesn't do much, and simply provides utility functions including a "glue" with templating function. As a result, the file size is extremely small, which is less than 1KB minified.


## Pre-requisite

It requires external templating libraries such as [ejs](http://ejs.co/), [lodash.template](https://www.npmjs.com/package/lodash.template), [underscore.template](https://www.npmjs.com/package/underscore.template), etc. Because of this, this plugin does not restrict what characters to use as a placeholder. That is totally up to whatever templating libraries you use.

## Usage

### Main JavaScript

Using [ejs](http://ejs.co/) :
```javascript
const import i18nPlugin from 'vue-i18n-light';
const import ejs from 'ejs';

Vue.use(i18nPlugin({
  templating: {
    engine: ejs.compile,
  },
}));
```
Using [lodash.template](https://www.npmjs.com/package/lodash.template) :
```javascript
const import i18nPlugin from 'vue-i18n-light';
const import template from 'lodash.template';

Vue.use(i18nPlugin({
  templating: {
    engine: template,
  },
}));
```

### i18n Resources

'en' resource (path/to/locales/en/component1.json) :
```json
{
  "headings": {
    "title": "Internationalization Sample"
  },
  "greetings": "Hello <%= name %>"
}
```

'ja' resource (path/to/locales/ja/component1.json) :
```json
{
  "headings": {
    "title": "国際化サンプル"
  },
  "greetings": "こんにちは、<%= name %>さん"
}
```

### Component

Component JavaScript:
```javascript
// For loading of i18n resources, you can do whatever you want
// If using webpack, one way is to use 'webpack.NormalModuleReplacementPlugin'
// An example can be found here:
// https://github.com/kotaroshima/vue-i18n-light-sample
import messages from 'my/i18n/component1.json';
import templateHtml from './component1.html';

Vue.component('component1', {
  i18n: messages,
  data() {
    return {
      name: 'Luke Skywalker',
    };
  },
  template: templateHtml,
});
```
Component Template HTML (`component1.html`):
```html
<!-- {% raw %} -->
<div>
  <div>{{ i18n.headings.title }}</div>
  <div>{{ $t('greeings', { name: name }) }}</div>
</div>
<!-- {% endraw %}) -->
```

## Customization

This plugin supports the following options.

### templating.engine

* **Type** : `Function`
* **Required** : true
* **Details** : Pass compile function of whatever template engine of your choice
* **Example** : See previous [Usage](#usage) section

### templating.funcName

* **Type** : `string`
* **Default** : `'$t'`
* **Details** : Name of the template interpolating function which can be called from templates
* **Example** :

  Main JavaScript:
  ```javascript
  i18nPlugin({
    templating {
      engine: ejs.compile,
      funcName: 'interpolate'
    },
  });
  ```
  Component JavaScript :
  ```javascript
  Vue.component('my-component', {
    i18n: {
      label1: "Hello <%= name %>",
    },
    data() {
      return {
        name: 'Luke Skywalker',
      };
    },
    template: templateHtml
  });
  ```
  Component HTML :
  ```html
  <!-- {% raw %} -->
  <div>{{ interpolate('label1', { name: name }) }}</div>
  <!-- {% endraw %}) -->
  ```

### optionName
* **Type** : `string`
* **Default** : `'i18n'`
* **Details** : Name of the i18n resource object that can be accessed within templates
* **Example** :

  Main JavaScript :
  ```javascript
  i18nPlugin({
    optionName: 'messages',
    templating {
      engine: ejs.compile,
    },
  });
  ```
  Component JavaScript :
  ```javascript
  Vue.component('my-component', {
    messages: {
      label1: "Hoge",
    },
    template: "<div>{{ messages.label1 }}</div>",
  });
  ```
