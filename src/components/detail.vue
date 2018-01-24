<template>
  <div class="detail" v-loading="loading" element-loading-text="正在加载中,请稍后...">
    <router-link to="/">
      <img src="../assets/images/word.png" alt="word"/>
    </router-link>
    <hr/>
    <main>
      <dl>
        <dt v-html="highlight"></dt>
        <dd>发布日期: {{doc.publish_date}}</dd>
      </dl>
      <hr>
      <section v-html="highlightContent">
      </section>
    </main>
    <footer>
      &copy;EaseStrategy 2017-2018 Terms and Conditions and Privacy Policy 苏ICP备16045103号-1
    </footer>
  </div>
</template>

<script>

  import HeaderNav from './header';
  import URL from '../api/url';
  import * as api from '../api/api';
  import {SUCCESS_CODE} from '../api/retCode';

  export default {
    name: 'detail',
    components: {
      HeaderNav
    },
    data() {
      return {
        loading: true,
        id: '',
        doc: {}
      };
    },
    created() {
      this.id = this.$route.params.id;
      this.init();
    },
    computed: {
      highlight() {
        if (!this.doc.title) {
          return;
        }
        let keywords = window.sessionStorage.getItem('keywords');
        return this.doc.title.replace(keywords, `<span style="color:red">${keywords}</span>`)
      },
      highlightContent() {
        if (this.doc.content) {
          let keywords = window.sessionStorage.getItem('keywords');
          return this.doc.content.replace(new RegExp(keywords, 'g'), `<span style="color: red;font-weight: bold">${keywords}</span>`)
        }
      }
    },
    methods: {
      init() {
        this.loading = true;
        let url = `${URL.GET_DETAIL}${this.id}/`;
        api.getWithNoParams(url).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            this.doc = res.data.data;
          }
        }).catch(err => {
          this.loading = false;
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .detail {
    font-family: '仿宋', serif;
    padding-top: 20px;
    background: url(../assets/images/bg.png) no-repeat center center;
    img {
      height: 24px;
      vertical-align: middle;
      margin-right: 16px;
      margin-left: 16px;
      margin-bottom: 30px;
      cursor: pointer;
    }
    main {
      width: 830px;
      margin: 0 auto;
      border: 1px solid #ddd;
      padding: 16px;
      dl {
        dt {
          font-size: 20px;
          color: #333;
        }
        dd {
          padding: 12px 0;
          font-size: 16px;
          color: #bbb;
          line-height: 16px;
        }
      }
      h6 {
        font-size: 16px;
        color: #333;
        line-height: 16px;
        text-align: right;
      }
      p {
        text-indent: 2em;
        font-size: 16px;
        color: #333;
        line-height: 26px;
      }
    }
    footer {
      font-family: "Microsoft YaHei UI", serif;
      margin-top: 55px;
      text-align: center;
      background: #f2f2f2;
      box-shadow: inset 0 1px 0 0 #e4e4e4;
      height: 40px;
      color: #bbb;
      line-height: 40px;
      &:hover {
        color: #000;
      }
    }
  }
</style>
