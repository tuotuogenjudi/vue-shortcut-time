<template>
  <div id="app">
    <div class="header">
      <el-row class="quick-sel">
        <el-col :span="12">test-logo</el-col>
        <el-col :span="12">
          <sel-time :options = "options"
            ref="selTime"
            :defaultTime="defaultTime"
            v-on:receiveTimeInfo="receiveTimeInfo">
          </sel-time>
        </el-col>
      </el-row>
    </div>
    <div class="content-wrap">
      <div>时间范围：{{ range }}</div>
      <div>时间间隔：{{ interval }}</div>
    </div>

    <div style="color: #2e89ea; cursor: pointer;" @click="getTime">更改时间(前10分钟)</div>
  </div>
</template>

<script>
import Vue from 'vue';
import MyPlugin from '@/plugin/main';

Vue.use(MyPlugin);

export default {
  name: 'App',
  data() {
    return {
      options: {
        isCustom: false, // 默认false
        color: '#2e89ea',
      },
      defaultTime: '前24小时',
      list: [{
        name: '前15分钟',
        start: [15, 'm'],
        type: 'currentEnd',
      }, {
        name: '前30分钟',
        start: [30, 'm'],
        type: 'currentEnd',
      }],
      range: [],
      interval: '',
    };
  },
  methods: {
    receiveTimeInfo(info) {
      this.range = info.range;
      this.interval = info.interval;
      console.log(info);
    },
    getTime() {
      const start = this.$moment().subtract(10, 'm').format('x');
      const end = this.$moment().format('x');
      this.$refs.selTime.clickTime([start, end], 'precise');
    },
  },
  mounted() {
  },
};
</script>

<style>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 10px;
  background: #2e89ea;
}
.content-wrap {
  padding-top: 60px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
