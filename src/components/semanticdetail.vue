<template>
  <div class="semanticdetail" >
   <div class="header">
      <router-link to="/">
        <img src="../assets/images/logo_row@2x.png" alt="logo"/>
      </router-link>
    </div> 
    <hr/>        
   <article>
      <div class="top">
        <dl>
          <dt v-html="highlight"></dt>
          <!-- <dd><span>【关键词】</span> <span style="margin-left: 10px;" v-for="(keyword,index) in doc.keywords" :key="index">{{keyword}}</span>
          </dd> -->
        </dl>
      </div>
      <div class="base" id="first">
        <div style="margin-bottom: 16px;"><span
          style="display: inline-block;width: 8px;height: 20px;background-color:#1890Ff;"></span><span style="position: relative;top: -3px;left: 15px;font-size: 20px;
color: rgba(0,0,0,0.85);">基本信息</span></div>
        <dl>
          <dd><span>审理法院:</span> &nbsp;&nbsp;<span>{{doc.case_court}}</span></dd>
          <dd>法院省份: &nbsp;&nbsp;<span>{{doc.province}}{{doc.court_loc}}</span></dd>
          <dd>案&#x3000;&#x3000;号: &nbsp;&nbsp;<span>{{doc.case_code}}</span></dd>
          <dd>案件类型: &nbsp;&nbsp;<span>{{doc.case_type}}</span></dd>
          <dd>案&#x3000;&#x3000;由: &nbsp;&nbsp;<span v-html="highlightAy"/></dd>
          <dd>审理程序: &nbsp;&nbsp;<span>{{doc.trial_round}}</span></dd>
          <dd>裁判日期: &nbsp;&nbsp;<span>{{doc.trial_date}}</span></dd>
          <dd>上传日期: &nbsp;&nbsp;<span>{{doc.publish_date}}</span></dd>
          <dd>文书性质: &nbsp;&nbsp;<span>{{doc.doc_type}}</span></dd>
        </dl>
      </div>
      <div class="content" id="second">
        <div><span style="display: inline-block;width: 8px;height: 20px;background-color:#1890Ff;"></span><span style="position: relative;top: -3px;left: 15px;font-size: 20px;
color: rgba(0,0,0,0.85);">文书正文</span></div>
       
        <section v-html="highlightContent"/>
      </div>
      <div class="case" v-show="doc['related_cases'] && doc.related_cases.length!==0" id="third">
        <div><span style="display: inline-block;width: 8px;height: 20px;background-color:#1890Ff;"></span><span style="position: relative;top: -2px;left: 15px;font-size: 20px;
color: rgba(0,0,0,0.85);">相关案情</span></div>
        <p v-for="(item, index) in doc.related_cases" :key="index" style="padding-left: 24px;">{{item}}</p>
      </div>
    </article>
    <footer>
      &copy;EaseStrategy 2017-2018 Terms and Conditions and Privacy Policy 苏ICP备16045103号-1
    </footer>
    <aside>
      <ul>
        <li><a href="#first" @click="set('first')" :class="{highlight: flag === 'first'}">基本信息</a></li>
        <li><a href="#second" @click="set('second')" :class="{highlight: flag === 'second'}">文书正文</a></li>
        <li v-show="doc['related_cases'] && doc.related_cases.length!==0"><a href="#third" @click="set('third')"
                                                                             :class="{highlight: flag === 'third'}">相关案情</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import URL from "../api/url";
import * as api from "../api/api";
import { SUCCESS_CODE } from "../api/retCode";

export default {
  name: "semanticdetail",
  components: {
  },
  data() {
    return {
      loading: true,
      id: "",
      doc: {},
      flag: ''
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.init();
  },
  computed: {
    highlightAy() {
        if (this.doc.ay) {
          let keywords = window.sessionStorage.getItem('keywords');
          return this.doc.ay.replace(new RegExp(keywords, 'g'), `<span style="color: red;font-weight: bold">${keywords}</span>`)
        }
      },
      highlight() {
        if (!this.doc.case_name) {
          return;
        }
        let keywords = window.sessionStorage.getItem('keywords');
        return this.doc.case_name.replace(keywords, `<span style="color:red">${keywords}</span>`)
      },
      highlightContent() {
        if (this.doc.content_origin) {
          let keywords = window.sessionStorage.getItem('keywords');
          return this.doc.content_origin.replace(new RegExp(keywords, 'g'), `<span style="color: red;font-weight: bold">${keywords}</span>`)
        }
      }
    },
    methods: {
      set(val) {
        this.flag = val;
      },
      init() {
        this.loading = true;
       /*   let url = `47.104.92.223:5001/judgement/doc_id/${this.id}/`;
        api.getWithNoParams(url).then(res => {
          this.loading = false;
          if (res.data.code === SUCCESS_CODE) {
            this.doc = res.data.data.doc_info;
             console.log(this.doc)
          }
        }).catch(err => {
          this.loading = false;
        });  */
        
      this.$http.get(`/judgement/doc_id/${this.id}`,
      {"doc_id":this.id
      },
      {emulateJSON: true}
    )
    .then((res) => {
       this.doc = res.data.data.doc_info._source
      //  .doc_list.judgements
      console.log(url);
       console.log(this.doc)
    })
    .catch((res) => {
     
    });
      }
    }
  };
</script>

<style scoped lang="scss">
.semanticdetail {
  font-family: FZS3JW--GB1-0;
  .header {
    background: #1890ff !important;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.28);
    height: 64px;
    img {
      height: 24px;
      width: 177px;
      vertical-align: middle;
      margin: 20px 0 0 200px;
      cursor: pointer;
    }
  }
   article {
      width: 1050px;
      margin: 0 auto;
      .top {
        box-sizing: border-box;
        margin-top: 24px;
        padding: 24px;
        border-bottom: 1px solid #eee;
        dt {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 28px;
        }
        dd {
          margin-top: 8px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
        }
      }
      .base {
        margin-top: 24px;
        margin-bottom: 48px;
        dl {
          dd {
            margin-left: 24px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.65);
            line-height: 24px;
          }
        }
      }
      .content {
        section {
          width: 1002px;
          margin: 0 auto;
        }
      }
    }
    aside {
      position: fixed;
      top: 195px;
      right: 80px;
      text-align: center;
      border-radius: 4px;
      z-index: 10000;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          padding-left: 16px;
        }
        a {
          padding-left: 16px;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.65);
          &:hover {
            color: #1890FF;
          }
        }
      }
    }
    footer {
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
    .highlight {
      color: #1890FF;
      border-left: 2px solid #1890FF;
    }
  }
</style>
