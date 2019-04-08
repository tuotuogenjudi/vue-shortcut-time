# vue-shortcut-time

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 使用说明:
# 1. 安装
npm install vue-shortcut-time --save

import MyPlugin from 'vue-shortcut-time';

Vue.use(MyPlugin);

# 2. 页面使用

```
<sel-time :options = "options"
  v-model="defaultTime"
  v-on:receiveTimeInfo="receiveTimeInfo">
</sel-time>

 data() {
    return {
      options: {
        isCustom: false, // false: 显示默认快捷选项; true: 自定义自己的快捷时间
        color: #2e89ea, // 按钮背景颜色;  
      },
      defaultTime: '前15分钟', // 初始化快捷时间
      // isCustom为true是才起作用
      list: [{
        name: '前15分钟',
        start: [15, 'm'],
        type: 'currentEnd',
      }, {
        name: '前30分钟',
        start: [30, 'm'],
        type: 'currentEnd',
      }],
    }
 },
methods: {
  // 接收时间范围、时间间隔;
  receiveTimeInfo(info) {
    console.log('0-0-0-0-');
    console.log(info);
  },
},
```
