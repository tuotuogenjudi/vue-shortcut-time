import Vue from 'vue';
import { Button, Select, Tabs, TabPane, Row, Col, Form, FormItem,
  TimeSelect, TimePicker, DatePicker, Tooltip } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import '@/assets/css/iconfont/iconfont.css';
import App from './App';

Vue.config.productionTip = false;
Vue.use(Select);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Tooltip);

Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
