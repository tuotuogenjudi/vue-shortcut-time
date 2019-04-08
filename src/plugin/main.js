// import selInterval from './sel-interval';
import selTime from './sel-time';

const MyPlugin = {};
MyPlugin.install = (Vue) => {
  // Vue.component(selInterval.name, selInterval); // testPanel.name 组件的name属性
  Vue.component(selTime.name, selTime); // testPanel.name 组件的name属性
};

export default MyPlugin;
