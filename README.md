# vue-i18n-light

Super-light i18n plugin for Vue.js

- Light bootstrap code. Main objective of this plugin was to bundle only required i18n resources to each components rather than loading all i18n resources at once. So it allows to build light bootstrap and lazy load components with required i18n resources bundled together.
- Small footprint. This plugin itself doesn't do much, and it delegates templating to external libraries (such as 'ejs', 'lodash', 'underscore', etc). It only provides utility functions including a "glue" with a templating function, so the file size is extremely small.


## Pre-requisite

It requires external templating libraries such as 'ejs', 'lodash', 'underscore', etc. Because of this, this plugin is not aware of what characters to use as placeholder. That is totally up to whatever templating libraries you use.

## Usage

### Main JavaScript

Using 'ejs':
```javascript
const import i18nPlugin from 'vue-i18n-light';
const import ejs from 'ejs';

Vue.use(i18nPlugin({
  templating: {
    engine: ejs.compile,
  },
}));
```
Using 'lodash.template':
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

path/to/locales/en/component1.json
```json
{
  "headings": {
    "title": "Internationalization Sample"
  },
  "greetings": "Hello <%= name %>"
}
```

path/to/locales/ja/component1.json
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
// One way is to use 'webpack.NormalModuleReplacementPlugin'
// example can be found here:
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
<div>
  <div>{{ i18n.headings.title }}</div>
  <div>{{ $t('greeings', { name: name }) }}</div>
</div>
```

## Customization

This plugin supports the following options.

### templating.engine
* **Type** : `Function`
* **Required** : true
* **Details** : Pass compile function of whatever template engine of your choice
* **Example** : See previous "Usage" section

### templating.funcName
* **Type** : `string`
* **Default** : `$t`
* **Details** : Name of the template interpolating function which can be called within templates
* **Example** : See previous "Usage" section

  Main JavaScript:
  ```javascript
  i18nPlugin({
    templating {
      engine: ejs.compile,
      funcName: 'interpolate'
    },
  });
  ```
  Component JavaScript:
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
  });
  ```
  Component Template HTML:
  ```html
  <div>{{ interpolate('label1', { name: name} }}</div>
  ```

### optionName
* **Type** : `string`
* **Default** : `i18n`
* **Details** : Name of the i18n resource object that can be accessed within templates
* **Example** :

  Main JavaScript:
  ```javascript
  i18nPlugin({
    optionName: 'messages',
  });
  ```
  Component JavaScript:
  ```javascript
  Vue.component('my-component', {
    messages: {
      label1: "Hoge",
    },
  });
  ```
  Component Template HTML:
  ```html
  <div>{{ messages.label1 }}</div>
  ```
