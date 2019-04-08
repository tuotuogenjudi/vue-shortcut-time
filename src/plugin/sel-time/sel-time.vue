<template>
  <div class="time-wrap">
    <el-button class="btn-time" type="primary"
      @click="toggleShow" :style="{ background: options.color, 'border-color': options.color }">
      <i class="iconfont icon-clock"></i> {{ btnActive }}
    </el-button>
    <div class="sub-wrap">
      <div class="wraperContent" v-if="isShow && !options.isCustom">
        <el-row :gutter="20">
          <i class="iconfont icon-arrow-up tab-close" @click="tabClose"></i>
            <el-col :md="6" :small="12" class="divideRight">
              <h3>精确选择</h3>
              <el-form label-position="top" :rules="timeFormRules" ref="timeForm">
                <el-form-item label="开始时间:" prop="firsttime">
                  <el-date-picker
                    v-model="firsttime"
                    type="datetime"
                    placeholder="开始时间"
                    style="width: 100%;"
                    value-format="timestamp"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间:" prop="lasttime">
                  <el-date-picker
                    v-model="lasttime"
                    type="datetime"
                    placeholder="结束时间"
                    style="width: 100%;"
                    value-format="timestamp"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
                <el-button size="small" :disabled="firsttime === '' || lasttime === ''"
                  type="primary"
                  @click="clickTime({ firsttime, lasttime }, 'precise')">
                  查询
                </el-button>
              </el-form>
            </el-col>
            <el-col :md="18" :small="12">
              <el-row class="quick-sel">
                <h3>快速选择</h3>
                <el-col :span="6"
                  v-for="(item, index) of ((list && list.length > 0)  ? list : shortcutList )"
                  :key="index">
                  <el-button :type="btnActive === item.name ? 'primary': 'text'"
                    size="small"
                    @click="clickTime(item, 'shortcut')">
                    {{ item.name }}
                  </el-button>
                </el-col>
              </el-row>
            </el-col>
        </el-row>
      </div>
      <slot v-if="isShow && options.isCustom" name="content"></slot>
    </div>
  </div>
</template>
<script>
import util from '../../utils';

export default {
  name: 'sel-time',
  props: ['options', 'list', 'defaultTime'],
  data() {
    return {
      time: '',
      isShow: false,
      activeName: 'first',
      /**
       * type: currentEnd: 从过去时间截止到现在时间
       *       beforeEndOne: 从过去时间到过去时间, 持续一个单位（例如： 过去1年，过去1天等）
       *       beforeEndMulti: 从过去时间到过去时间, 持续多个单位（例如： 过去2年，过去5天等）
       */
      shortcutList: [{
        name: '前15分钟',
        start: [15, 'm'],
        type: 'currentEnd',
      }, {
        name: '前30分钟',
        start: [30, 'm'],
        type: 'currentEnd',
      }, {
        name: '前1小时',
        start: [1, 'h'],
        type: 'currentEnd',
      }, {
        name: '前4小时',
        start: [4, 'h'],
        type: 'currentEnd',
      }, {
        name: '前12小时',
        start: [12, 'h'],
        type: 'currentEnd',
      }, {
        name: '前24小时',
        start: [24, 'h'],
        type: 'currentEnd',
      }, {
        name: '今天',
        start: [0, 'd'],
        type: 'beforeEndOne',
      }, {
        name: '昨天',
        start: [1, 'd'],
        type: 'beforeEndOne',
      }, {
        name: '前天',
        start: [2, 'd'],
        type: 'beforeEndOne',
      }, {
        name: '上周的今天',
        start: [7, 'd'],
        type: 'beforeEndOne',
      }, {
        name: '最近7天',
        start: [7, 'd'],
        type: 'beforeEndMulti',
      }, {
        name: '最近30天',
        start: [30, 'd'],
        type: 'beforeEndMulti',
      }, {
        name: '本周',
        start: [0, 'w'],
        type: 'beforeEndOne',
      }, {
        name: '上周',
        start: [1, 'w'],
        type: 'beforeEndOne',
      }, {
        name: '本月',
        start: [0, 'M'],
        type: 'beforeEndOne',
      }, {
        name: '上个月',
        start: [1, 'M'],
        type: 'beforeEndOne',
      }, {
        name: '今年',
        start: [0, 'y'],
        type: 'beforeEndOne',
      }, {
        name: '去年',
        start: [1, 'y'],
        type: 'beforeEndOne',
      }, {
        name: '前60天',
        start: [60, 'd'],
        type: 'currentEnd',
      }, {
        name: '前90天',
        start: [90, 'd'],
        type: 'currentEnd',
      }, {
        name: '前6个月',
        start: [6, 'M'],
        type: 'currentEnd',
      }, {
        name: '前1年',
        start: [1, 'y'],
        type: 'currentEnd',
      }, {
        name: '前2年',
        start: [2, 'y'],
        type: 'currentEnd',
      }, {
        name: '前5年',
        start: [5, 'y'],
        type: 'currentEnd',
      }],
      btnActive: '前15分钟',
      range: [],
      interval: '30s',
      // 精确时间选择
      firsttime: '',
      lasttime: '',
      timeFormRules: {
        firsttime: [
          {
            validator: (rule, value, callback) => {
              alert('aaa');
              if (this.lasttime && this.firsttime) {
                if (this.firsttime > this.lasttime) {
                  callback(new Error('开始时间不能大于结束时间'));
                }
                callback();
              } else {
                callback();
              }
            },
            trigger: 'blur, change',
          },
        ],
        lasttime: [
          {
            validator: (rule, value, callback) => {
              if (this.lasttime && this.firsttime) {
                if (this.firsttime > this.lasttime) {
                  callback(new Error('结束时间不能小于开始时间'));
                }
                callback();
              } else {
                callback();
              }
            },
            trigger: 'blur, change',
          },
        ],
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.lasttime) {
            return time.getTime() >= Number(this.lasttime);
          }
          return time.getTime() >= this.$moment().format('x');
        },
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.firsttime) {
            return time.getTime() <= Number(this.firsttime) - 8.64e7 || time.getTime() >= this.$moment().format('x');
          }
          return time.getTime() >= this.$moment().format('x');
        },
      },
    };
  },
  mounted() {
    if (this.defaultTime) {
      this.btnActive = this.defaultTime;
      this.shortcutList.forEach((key) => {
        if (this.btnActive === key.name) {
          this.clickTime(key, 'shortcut');
        }
      });
    } else {
      this.clickTime({
        name: '前15分钟',
        start: [15, 'm'],
        type: 'currentEnd',
      }, 'shortcut');
    }
  },
  methods: {
    // 关闭时间选择
    tabClose() {
      this.isShow = false;
    },
    /**
     * 获取时间范围、时间文字、时间间隔
     * currentEnd: 从过去时间截止到现在时间
     * beforeEndOne: 之前的某一天
     * beforeEndMulti: 之前的很多天
     */
    clickTime(item, type) {
      if (type === 'shortcut') {
        this.btnActive = item.name;
        let [start, end] = ['', ''];
        if (item.type === 'currentEnd') {
          start = this.$moment().subtract(Number(item.start[0]), item.start[1]).format('x');
          end = this.$moment().format('x');
        }
        if (item.type === 'beforeEndOne') {
          const tmp = this.$moment().subtract(Number(item.start[0]), item.start[1]);
          start = tmp.startOf(item.start[1]).format('x');
          end = tmp.endOf(item.start[1]).format('x');
        }
        if (item.type === 'beforeEndMulti') {
          const tmp = this.$moment().subtract(Number(item.start[0]), item.start[1]);
          start = tmp.startOf(item.start[1]).format('x');
          end = this.$moment().endOf('d').format('x');
        }
        this.range = [Number(start), Number(end)];
        this.interval = util.getInterval((this.range[1] - this.range[0]) / 30);
      }
      if (type === 'precise') {
        const firsttimeTmp = Number(item.firsttime);
        const lasttimeTmp = Number(item.lasttime);
        this.btnActive = `${this.$moment(firsttimeTmp).format('YYYY-MM-DD HH:mm:ss')} - ${this.$moment(lasttimeTmp).format('YYYY-MM-DD HH:mm:ss')}`;
        this.range = [firsttimeTmp, lasttimeTmp];
        this.interval = util.getInterval((this.range[1] - this.range[0]) / 30);
      }
      this.sendMsgToParent({ range: this.range, interval: this.interval });
      this.isShow = false;
    },
    /**
     * 回传给父元素
     */
    sendMsgToParent(msg) {
      this.$emit('receiveTimeInfo', msg);
    },
    /**
     * 点击显示快捷时间列表
     */
    toggleShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
<style>
  @import '../../assets/css/iconfont/iconfont.css';
  .time-wrap{
    /* position: relative; */
  }
  .time-wrap .tab-close {
    cursor: pointer;
    position: absolute;
    top: -7px;
    right: 10px;
    z-index: 99;
  }
  .time-wrap .tab-close:hover {
    cursor: hand;
  }
  .wraperContent {
    padding: 20px 30px;
    overflow-x: hidden;
    background: #fff;
    z-index: 1000;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .wraperContent .grid-content {
    min-height: 36px;
    text-align: left;
    line-height: 29px;
    font-weight: bold;
  }
  .wraperContent .grid-content .el-button {
    width: 80px;
  }
  .wraperContent .grid-content .el-button .el-button--text {
    font-weight: bold;
  }
  .wraperContent .divideRight {
    border-right: 1px solid rgba(72, 86, 106, 0.1);
    text-align: left;
  }
  .sub-wrap {
    position: absolute;
    right: 0;
    width: 100%;
    margin-top: 0;
    line-height: 29px;
    color: #000;
    z-index: 100000;
  }
  .el-tabs {
    position: relative;
  }
  .el-tabs .sub-close {
    position: absolute;
    top: 0;
    right: 0;
  }
  .quick-sel {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
</style>

