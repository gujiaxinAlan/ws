<template>
  <div class="list">
    <header>
      <header-nav ref="header" @changeSearch="handleChange" @changeSearch2="handleChange2"/>
      <div class="bottom">
      <span v-for="item in cube" :key="item.key" v-show="item.show">
      {{item.key}}
      <img src="../assets/images/close.png" alt="close" @click="handleClick(item)">
      </span>
      </div>
    </header>
    <!--<div class="middle" v-show="listData.length!==0">
      <span class="span" :class="{highlight: orderFlag === '0_sprq'}" @click="order({order:'0_sprq'})">
        裁判日期↓
      </span>
      <span class="span" :class="{highlight: orderFlag === ''}" style="position: relative;left: -160px;" @click="order({order:''})">相关性↓</span>
    </div>
    <p>共搜索到: <span style="color: #177dff;font-size: 20px;font-weight: bold;font-style: italic">{{total}}</span>条结果
    </p>-->
    <main class="clearfix">
      <section element-loading-text="正在加载中,请稍后..." v-loading="loading">
        <div class="middle" v-show="listData.length!==0">
      <span class="span" :class="{highlight: orderFlag === '0_sprq'}" @click="order({order:'0_sprq'})">
        裁判日期↓
      </span>
          <span class="span" :class="{highlight: orderFlag === ''}" style="position: relative;left: -160px;" @click="order({order:''})">相关性↓</span>
        </div>
        <p>共搜索到约: <span style="color: #177dff;font-size: 20px;font-weight: bold;font-style: italic">{{total}}</span> 条结果
        </p>
        <card v-for="item in listData" :key="item.id" :list="item"></card>
        <div class="text-center">
          <Page :total="showSize" :page-size="pageSize" @on-change="handleCurrentChange" :current="currentPage" v-show="listData.length!==0"></Page>
        </div>
      </section>
      <aside>
        <h3 style="position: absolute;top: -25px;" v-show="listData.length!==0">筛选</h3>
        <div class="section" v-show="ayData.length!==0">
          <div class="space">
            <h4 class="hover">案由
              <span>多选</span>
            </h4>
            <el-tree
              :data="ayData"
              show-checkbox
              node-key="id"
              ref="tree1"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </div>
          <div class="button" style="margin-bottom: 50px;margin-top: -40px;display: flex;">
            <button class="btn btn-default" style="flex:1" @click="getFilter({currentPage},'tree1')">确定</button>
          </div>
        </div>
        <div class="section" v-show="fyData.length!==0">
          <div class="space">
            <h4 class="hover">法院层级
              <span>多选</span>
            </h4>
            <el-tree
              :data="fyData"
              show-checkbox
              node-key="id"
              ref="tree3"
              highlight-current
              :props="defaultProps2">
            </el-tree>
          </div>
          <div class="button" style="margin-bottom: 50px;margin-top: -40px;display: flex;">
            <button class="btn btn-default" style="flex:1" @click="getFilter({currentPage},'tree3')">确定</button>
          </div>
        </div>
        <div class="section" v-show="cjData.length!==0">
          <div class="space">
            <h4 class="hover">地域
              <span>多选</span>
            </h4>
            <el-tree
              :data="cjData"
              show-checkbox
              node-key="id"
              ref="tree2"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </div>
          <div class="button" style="margin-bottom: 50px;margin-top: -40px;display: flex;">
            <button class="btn btn-default" style="flex:1" @click="getFilter({currentPage},'tree2')">确定</button>
          </div>
        </div>
        <div class="section" v-show="sprqData.length!==0">
          <div class="space">
            <h4 class="hover">裁判年份
              <span>多选</span>
            </h4>
            <el-tree
              :data="sprqData"
              show-checkbox
              node-key="id"
              ref="tree4"
              highlight-current
              :props="defaultProps1">
            </el-tree>
          </div>
          <div class="button" style="margin-bottom: 50px;margin-top: -40px;display: flex;">
            <button class="btn btn-default" style="flex:1" @click="getFilter({currentPage},'tree4')">确定</button>
          </div>
        </div>
        <div class="section" v-show="spcxData.length!==0">
          <div class="space">
            <h4 class="hover">审判程序
              <span>多选</span>
            </h4>
            <el-tree
              :data="spcxData"
              node-key="id"
              show-checkbox
              ref="tree5"
              highlight-current
              :props="defaultProps1">
            </el-tree>
          </div>
          <div class="button" style="margin-bottom: 50px;margin-top: -40px;display: flex;">
            <button class="btn btn-default" style="flex:1" @click="getFilter({currentPage},'tree5')">确定</button>
          </div>
        </div>
        <div class="section" v-show="wslxData.length!==0">
          <div class="space">
            <h4 class="hover">文书类型
              <span>多选</span>
            </h4>
            <el-tree
              :data="wslxData"
              node-key="id"
              ref="tree6"
              show-checkbox
              highlight-current
              :props="defaultProps1">
            </el-tree>
          </div>
          <div class="button" style="margin-bottom: 50px;margin-top: -40px;display: flex;">
            <button class="btn btn-default" style="flex:1" @click="getFilter({currentPage},'tree6')">确定</button>
          </div>
        </div>
      </aside>
    </main>
    <div class="null" style="height: 500px;text-align: center;" v-show="listData.length===0">
      <img src="../assets/images/null.png" alt="null">
      <h1>未搜索到结果</h1>
    </div>
    <footer>
      &copy;EaseStrategy 2017-2018 Terms and Conditions and Privacy Policy 苏ICP备16045103号-1
    </footer>
  </div>
</template>

<script>

  import Card from './card';
  import HeaderNav from './header';
  import URL from '../api/url';
  import * as api from '../api/api';
  import {SUCCESS_CODE} from '../api/retCode';
  import {formatData, formatData2, formatData3} from "../utils";

  export default {
    name: 'list',
    components: {
      Card,
      HeaderNav
    },
    created() {
      // this.keywords = this.$route.params.keywords;
      this.keywords = window.sessionStorage.getItem('key');
      this.cubeFun();
    },
    data() {
      return {
        orderFlag: '',
        ay: '',
        cpnf: '',
        spcx: '',
        wslx: '',
        cj: '',
        count: 1,
        loading: false,
        keywords: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        show: true,
        input: '',
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        defaultProps1: {
          label: 'name'
        },
        defaultProps2: {
          label: 'text'
        },
        listData: [],
        ayData: [],
        cjData: [],
        fyData: [],
        sprqData: [],
        spcxData: [],
        wslxData: [],
        cube: [],
        showSize: 0,
      };
    },
    mounted() {
//      this.$refs.header.rewrite(this.$route.params.keywords);
      if (window.sessionStorage.getItem('content')) {
        this.listData = JSON.parse(window.sessionStorage.getItem('content'));
        this.total = parseInt(window.sessionStorage.getItem('total'));
        this.currentPage = + window.sessionStorage.getItem('page');
        this.cjData = JSON.parse(window.sessionStorage.getItem('cjData'));
        this.sprqData = JSON.parse(window.sessionStorage.getItem('sprqData'));
        this.ayData = JSON.parse(window.sessionStorage.getItem('ayData'));
        this.spcxData = JSON.parse(window.sessionStorage.getItem('spcxData'));
        this.wslxData = JSON.parse(window.sessionStorage.getItem('wslxData'));
        this.fyData = JSON.parse(window.sessionStorage.getItem('fyData'));
        this.cube = JSON.parse(window.sessionStorage.getItem('cube'));
        this.cube = [...new Set(this.cube)]
      } else {
        this.init();
      }
      /*$('.span').click(function () {
        $(this).addClass('highlight').siblings().removeClass('highlight');
      })*/
    },
    methods: {
      handleChange(value) {
        this.keywords = value;
        this.currentPage = 1;
        this.getP({}, URL.GET_LIST);
      },
      handleChange2(value) {
        this.keywords = value;
        this.currentPage = 1;
        this.get({}, URL.GET_LIST);
      },
      cubeFun() {
        let temp = [];
        if (!this.keywords) {
          return;
        }
        let keyw = this.keywords.split(' ');
        keyw.forEach(item => {
          let obj = {};
          obj.show = true;
          obj.key = item;
          temp.push(obj)
        });
        this.cube = temp;
      },

    getFilter(item, id) {
        if (id === 'tree1') {
          window.sessionStorage.setItem('ayC', this.$refs.tree1.getCheckedKeys().join('-'));
          this.$refs.tree1.getCheckedNodes().forEach(item => {
            this.cube.push({
              show: true,
              key: item.text.slice(0,item.text.indexOf('('))
            });
          });
        } else if (id === 'tree2') {
          window.sessionStorage.setItem('cjC', this.$refs.tree2.getCheckedKeys().join('-'));
          this.$refs.tree2.getCheckedNodes().forEach(item => {
            this.cube.push({
              show: true,
              key: item.text.slice(0, item.text.indexOf('('))
            });
          });
        } else if (id === 'tree4') {
          window.sessionStorage.setItem('cpnfC', this.$refs.tree4.getCheckedKeys().join('-'));
          this.$refs.tree4.getCheckedNodes().forEach(item => {
            this.cube.push({
              show: true,
              key: item.name.slice(0,item.name.indexOf('('))
            });
          });
        } else if (id === 'tree5') {
          window.sessionStorage.setItem('spcxC', this.$refs.tree5.getCheckedKeys().join('-'));
          this.$refs.tree5.getCheckedNodes().forEach(item => {
            this.cube.push({
              show: true,
              key: item.name.slice(0, item.name.indexOf('('))
            });
          });
        } else if (id === 'tree6') {
          window.sessionStorage.setItem('wslxC', this.$refs.tree6.getCheckedKeys().join('-'));
          this.$refs.tree6.getCheckedNodes().forEach(item => {
            this.cube.push({
              show: true,
              key: item.name.slice(0, item.name.indexOf('('))
            });
          });
        } else if (id === 'tree3') {
          window.sessionStorage.setItem('fyC', this.$refs.tree3.getCheckedKeys().join('-'));
          this.$refs.tree3.getCheckedNodes().forEach(item => {
            this.cube.push({
              show: true,
              key: item.text.slice(0, item.text.indexOf('('))
            });
          });
        }
        this.loading = true;
        this.total = 0;
//        let url = URL.GET_LIST;
        let filter = {
          ay: this.$refs.tree1.getCheckedKeys()[this.$refs.tree1.getCheckedKeys().length - 1],
          fy: this.$refs.tree3.getCheckedKeys().join('-'),
          cj: this.$refs.tree2.getCheckedKeys().join('-'),
          cpnf: this.$refs.tree4.getCheckedKeys().join('-'),
          spcx: this.$refs.tree5.getCheckedKeys().join('-'),
          wslx: this.$refs.tree6.getCheckedKeys().join('-')
        };
        this.ay = window.sessionStorage.getItem('ayC') || '';
        this.cj = window.sessionStorage.getItem('cjC') || '';
        this.cpnf = window.sessionStorage.getItem('cpnfC') || '';
        this.spcx = window.sessionStorage.getItem('spcxC') || '';
        this.wslx = window.sessionStorage.getItem('wslxC') || '';
        this.fy = window.sessionStorage.getItem('fyC') || '';
        let data = {
          keyword: this.keywords.split(' ').join('-'),
          sprq: this.cpnf,
          ay: this.ay,
          fy: this.cj,
          cj: this.fy,
          spcx: this.spcx,
          wslx: this.wslx,
          order: '0_sprq',
          current_page: item.currentPage,
          page_size: 10,
        };
        api.post(URL.GET_LIST, data).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            let temp = res.data.data;
            this.listData = temp.judgements;
            window.sessionStorage.setItem('content', JSON.stringify(this.listData));
            this.total = temp.totalCount;
            if (this.total < temp.showSize) {
              this.showSize = this.total;
            } else {
              this.showSize = temp.showSize;
            }
            window.sessionStorage.setItem('total', this.total);
            window.sessionStorage.setItem('page', this.currentPage);
            this.cjData = formatData2(temp.courtResults, 'children');
            this.sprqData = formatData(temp.judgementDateResults);
            this.ayData = formatData2(temp.reasonResults, 'children');
            this.spcxData = formatData(temp.trialRoundResults);
            this.wslxData = formatData(temp.judgementTypeResults);
            this.fyData = formatData3(temp.courtLevelResults);
            window.sessionStorage.setItem('sprqData', JSON.stringify(temp.judgementDateResults));
            window.sessionStorage.setItem('ayData', JSON.stringify(temp.reasonResults));
            window.sessionStorage.setItem('spcxData', JSON.stringify(temp.trialRoundResults));
            window.sessionStorage.setItem('wslxData', JSON.stringify(temp.judgementTypeResults));
            window.sessionStorage.setItem('cjData', JSON.stringify(temp.courtResults));
            window.sessionStorage.setItem('fyData', JSON.stringify(temp.courtLevelResults));
            window.sessionStorage.setItem('cube', JSON.stringify(this.cube));
          } else {
            this.$message.error('无效输入');
          }
        }).catch(err => {
          this.loading = false;
        });
      },
      get({currentPage = this.currentPage, order = ''}, url) {
        window.sessionStorage.clear();
        this.cubeFun();
        this.loading = true;
        this.total = 0;
        this.orderFlag = order;
        let data = {
          keyword: this.keywords.split(' ').join('-'),
          sprq: this.cpnf,
          ay: this.ay,
          fy: this.cj,
          cj: this.fy,
          spcx: this.spcx,
          wslx: this.wslx,
          order: order,
          current_page: currentPage,
          page_size: 10
        };
        api.post(url, data).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            let temp = res.data.data;
            this.listData = temp.judgements;
            window.sessionStorage.setItem('content', JSON.stringify(this.listData));
            this.total = temp.totalCount;
            if (this.total < temp.showSize) {
              this.showSize = this.total;
            } else {
              this.showSize = temp.showSize;
            }
            window.sessionStorage.setItem('total', this.total);
            window.sessionStorage.setItem('page', this.currentPage);
            window.sessionStorage.setItem('sprqData', JSON.stringify(temp.judgementDateResults));
            window.sessionStorage.setItem('keywords', this.keywords);
            window.sessionStorage.setItem('ayData', JSON.stringify(temp.reasonResults));
            window.sessionStorage.setItem('fyData', JSON.stringify(temp.courtLevelResults));
            window.sessionStorage.setItem('spcxData', JSON.stringify(temp.trialRoundResults));
            window.sessionStorage.setItem('wslxData', JSON.stringify(temp.judgementTypeResults));
            window.sessionStorage.setItem('cjData', JSON.stringify(temp.courtResults));
            // window.sessionStorage.setItem('cube', JSON.stringify(this.cube));
            this.cjData = formatData2(temp.courtResults,'children');
            this.sprqData = formatData(temp.judgementDateResults);
            this.ayData = formatData2(temp.reasonResults, 'children');
            this.spcxData = formatData(temp.trialRoundResults);
            this.wslxData = formatData(temp.judgementTypeResults);
            this.fyData = formatData3(temp.courtLevelResults);
          } else {
            this.$message.error('无效输入');
          }
        }).catch(err => {
          this.loading = false;
        });
      },
      getP({currentPage = this.currentPage, order = ''}, url) {
        this.cubeFun();
        this.loading = true;
        this.total = 0;
        this.orderFlag = order;
        let data = {
          keyword: this.keywords.split(' ').join('-'),
          sprq: '',
          ay: '',
          fy: '',
          cj: '',
          spcx: '',
          wslx: '',
          order: order,
          current_page: currentPage,
          page_size: 10
        };
        api.post(url, data).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            let temp = res.data.data;
            this.listData = temp.judgements;
            window.sessionStorage.setItem('content', JSON.stringify(this.listData));
            this.total = temp.totalCount;
            if (this.total < temp.showSize) {
              this.showSize = this.total;
            } else {
              this.showSize = temp.showSize;
            }
            window.sessionStorage.setItem('total', this.total);
            window.sessionStorage.setItem('page', this.currentPage);
            window.sessionStorage.setItem('sprqData', JSON.stringify(temp.judgementDateResults));
            window.sessionStorage.setItem('keywords', this.keywords);
            window.sessionStorage.setItem('ayData', JSON.stringify(temp.reasonResults));
            window.sessionStorage.setItem('fyData', JSON.stringify(temp.courtLevelResults));
            window.sessionStorage.setItem('spcxData', JSON.stringify(temp.trialRoundResults));
            window.sessionStorage.setItem('wslxData', JSON.stringify(temp.judgementTypeResults));
            window.sessionStorage.setItem('cjData', JSON.stringify(temp.courtResults));
            // window.sessionStorage.setItem('cube', JSON.stringify(this.cube));
            this.cjData = formatData2(temp.courtResults, 'children');
            this.sprqData = formatData(temp.judgementDateResults,'children');
            this.ayData = formatData2(temp.reasonResults,'children');
            this.spcxData = formatData(temp.trialRoundResults);
            this.wslxData = formatData(temp.judgementTypeResults);
            this.fyData = formatData3(temp.courtLevelResults);
          } else {
            this.$message.error('无效输入');
          }
        }).catch(err => {
          this.loading = false;
        });
      },

      // 排序处理函数
      order(item) {
        this.orderFlag = item.order;
        this.loading = true;
        let url = URL.GET_LIST;
       /* let filter = {
          ay: this.$refs.tree1.getCheckedKeys().join('-'),
          cj: this.$refs.tree2.getCheckedKeys().join('-'),
          fy: this.$refs.tree3.getCheckedKeys().join('-'),
          cpnf: this.$refs.tree4.getCheckedKeys().join('-'),
          spcx: this.$refs.tree5.getCheckedKeys().join('-'),
          wslx: this.$refs.tree6.getCheckedKeys().join('-')
        };*/
        let data = {
          keyword: window.sessionStorage.getItem('keywords').split(' ').join('-') || '',
          sprq: window.sessionStorage.getItem('cpnfC') || '',
          ay: window.sessionStorage.getItem('ayC') || '',
          fy: window.sessionStorage.getItem('cjC') || '',
          spcx: window.sessionStorage.getItem('spcxC') || '',
          wslx: window.sessionStorage.getItem('wslxC') || '',
          cj: window.sessionStorage.getItem('fyC') || '',
          order: item.order,
          current_page: this.currentPage,
          page_size: 10,
        };
        api.post(url, data).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            let temp = res.data.data;
            this.listData = temp.judgements;
            this.total = temp.totalCount;
            if (this.total < temp.showSize) {
              this.showSize = this.total;
            } else {
              this.showSize = temp.showSize;
            }
            window.sessionStorage.setItem('content', JSON.stringify(this.listData));
            window.sessionStorage.setItem('page', this.currentPage);
          } else {
            this.$message.error('无效输入');
          }
        }).catch(err => {
          this.loading = false;
        });
      },

      // 初始化数据列表
      init() {
        this.getP({}, URL.GET_LIST);
      },

      // 分页处理函数
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        // this.get({}, URL.GET_LIST);
        this.loading = true;
        let url = URL.GET_LIST;
        let filter = {
          ay: this.$refs.tree1.getCheckedKeys().join('-'),
          cj: this.$refs.tree2.getCheckedKeys().join('-'),
          fy: this.$refs.tree3.getCheckedKeys().join('-'),
          cpnf: this.$refs.tree4.getCheckedKeys().join('-'),
          spcx: this.$refs.tree5.getCheckedKeys().join('-'),
          wslx: this.$refs.tree6.getCheckedKeys().join('-')
        };
        let data = {
          keyword: window.sessionStorage.getItem('keywords').split(' ').join('-') || '',
          sprq: window.sessionStorage.getItem('cpnfC') || '',
          ay: window.sessionStorage.getItem('ayC') || '',
          fy: window.sessionStorage.getItem('cjC') || '',
          spcx: window.sessionStorage.getItem('spcxC') || '',
          wslx: window.sessionStorage.getItem('wslxC') || '',
          cj: window.sessionStorage.getItem('fyC') || '',
          order: this.orderFlag,
          current_page: currentPage,
          page_size: 10,
        };
        api.post(url, data).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            let temp = res.data.data;
            this.listData = temp.judgements;
            this.total = temp.totalCount;
            if (this.total < temp.showSize) {
              this.showSize = this.total;
            } else {
              this.showSize = temp.showSize;
            }
            window.sessionStorage.setItem('content', JSON.stringify(this.listData));
            window.sessionStorage.setItem('page', this.currentPage);
          } else {
            this.$message.error('无效输入');
          }
        }).catch(err => {
          this.loading = false;
        });
      },

      handleClick(item) {
        item.show = false;
      },

      // 处理搜索图表点击事件
      handleIconClick() {
        this.get({}, URL.GET_LIST);
      },

      // 清空输入框
      reset() {
        this.input = '';
      }
    }
  };
</script>

<style scoped lang="scss">
  .list {
    header {
      font-family: "Microsoft YaHei UI", serif;
      margin: 8px 0;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      img {
        height: 24px;
        vertical-align: middle;
        margin-right: 16px;
        margin-left: 16px;
      }
      .right {
        position: relative;
        display: inline-block;
        width: 500px;
        img {
          position: absolute;
          right: 19px;
          top: 12px;
          width: 16px;
          height: 16px;
          &:hover {
            cursor: pointer;
            opacity: .8;
          }
        }
      }
      .bottom {
        width: 800px;
        margin-left: 190px;
        span {
          display: inline-block;
          line-height: 32px;
          height: 32px;
          border-radius: 15px;
          border: 1px solid transparent;
          margin-left: 20px;
          position: relative;
          padding-right: 50px;
          padding-left: 10px;
          cursor: pointer;
          background-color: #155e9f;
          color: #fff;
          font-size: 16px;
          img {
            margin-left: 10px;
            width: 24px;
            height: 24px;
            position: absolute;
            right: -10px;
            top: 3px;
            &:hover {
              opacity: .7;
            }
          }
        }
      }
    }
    .middle {
      width: 300px;
      /*margin-left: 110px;*/
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      .active {
        color: #298deb;
      }
      span {
        position: relative;
        top: -1px;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: deepskyblue;
        }
        .t {
          transform: rotate(180deg);
          position: absolute;
          top: 4px;
          right: -10px;
          color: #bbb;
          font-size: 26px;
          &:hover, &:active {
            color: deepskyblue;
            cursor: pointer;
          }
        }
        .b {
          position: absolute;
          right: -10px;
          top: 11px;
          color: #bbb;
          &:hover, &:active {
            color: deepskyblue;
            cursor: pointer;
          }
        }
      }
    }
    p {
      /*margin-left: 110px;*/
      margin-top: 10px;
      margin-bottom: 10px;
      color: #999;
    }
    main {
      width: 1300px;
      margin: 0 auto;
      section {
        /*display: inline-block;*/
        float: left;
        width: 60%;
        margin-left: 80px;
      }
      aside {
        h3 {
          font-size: 18px;
          color: #333333;
          letter-spacing: 0;
          height: 18px;
          line-height: 18px;
        }
        /*display: inline-block;*/
        position: relative;
        left: -10px;
        float: right;
        margin-top: 50px;
        margin-left: 20px;
        width: 300px;
        margin-right: 30px;
        button {
          border-top: none;
          &:hover {
            background-color: #1D8CE0;
            color: #fff;
          }
          &:active {
            background-color: #13CE66;
          }
        }
        .space {
          border: 1px solid #bbb;
          margin-bottom: 40px;
          /*height: 400px;*/
          h4 {
            position: relative;
            margin: 0;
            padding: 10px;
            background-color: #fafafa;
            border-bottom: 1px solid #bbb;
            font-weight: bold;
            span {
              display: none;
              position: absolute;
              right: 6px;
              top: 13px;
              width: 28px;
              height: 14px;
              font-size: 14px;
              color: #333;
              letter-spacing: 0;
              line-height: 14px;
              &:hover {
                color: skyblue;
              }
            }
            &:hover {
              span {
                display: block;
              }
            }
          }
          ul {
            margin-left: 20px;
            color: #333;
            li {
              height: 30px;
              line-height: 30px;
              cursor: pointer;
              &:hover {
                color: deepskyblue;
              }
            }
          }
        }
      }
    }
    footer {
      margin-top: 50px;
      clear: both;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: rgba(0, 0, 0, .6);
      font-size: 12px;
      letter-spacing: 0;
      background: #f2f2f2;
      box-shadow: inset 0 1px 0 0 #e4e4e4;
      &:hover {
        color: #000;
      }
    }
  }

  .el-tree {
    border: none;
  }
  .highlight {
    color: deepskyblue !important;
  }
  .caret {
    font-size: 18px;
  }
</style>
