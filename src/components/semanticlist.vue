<template>
  <div class="semanticlist">
    <header>
      <div class="header">
      <router-link to="/">
        <img src="../assets/images/logo_row@2x.png" alt="logo"/>
      </router-link>
    </div>         
    <main>
      <div class="inputbox">
            <el-input
              type="textarea"
              :rows="9"
              ref="elInput"
              placeholder="请输入需要解析的文字"
              v-model="input"
              @keydown.native.enter="handleIconClick"
              prop="context">
            </el-input>          
      </div>  
      <div class="clear">
        <button @click="reset">清除</button>
      </div>  
      <div class="search">
<!-- v-on:click="" -->
        <button @click="handleIconClick">搜索</button>
      </div>  
    </main>
    </header> 
    <div id="filling"></div>  
    <section id="result-list">
      <div class="result-top">
        <div class="title-left"></div>
        <div class="result-title">语义搜索结果</div>
        <div class="title-right"></div>
      </div>
      <div class="result-bottom">
      <card v-for="item in doc_list" :key="item.id" :list="item" :q_id="q_id"></card>               
        <div class="more">
          <button @click="getMore">
          <div class="icon"></div>
          <div class="word">查看更多</div>
          </button>
        </div>      
      </div>  
    </section> 
    <footer>
      &copy;EaseStrategy 2017-2018 Terms and Conditions and Privacy Policy 苏ICP备16045103号-1
    </footer>
  </div>
</template>

<script>
import Card from "./semanticcard";
import URL from "../api/url";
import * as api from "../api/api";
import { SUCCESS_CODE } from "../api/retCode";
import { formatData, formatData2, formatData3 } from "../utils";

export default {
  name: "semanticlist",
  props: {
      list: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  components: {
    Card, 
  },
   data() {
    return {
      num: 0,
      input: '',
      listData: [],
      pageSize: 10,
      total: 0,
      msg:'',
      data:'',
      q_id:'',
      doc_list:[],
      start: 0,
      end:5 ,
      btns:[]
    };
  },
//      this.$refs.header.rewrite(this.$route.params.keywords);
    mounted() {
       
      if (window.sessionStorage.getItem('content')) {
        this.listData = JSON.parse(window.sessionStorage.getItem('content'));
         } else {
        this.init();
      };
      
      },
  methods: {
    // 初始化数据列表
      init() { 
      },
    // window.document.querySelector('.el-input__inner').focus();
    //清除按钮功能
      reset() {
        this.input = '';
        this.num = 0;
      },
 // 查询按钮        
    handleIconClick() {
      if (this.input) {
        this.input = this.input.trim();
        this.num = 0;
        this.loading = true;
        let filling = document.getElementById("filling");
        filling.style.cssText='display:none';
        let list = document.getElementById("result-list");
        list.style.cssText='display:block';
        // this.$options.methods.inquire(10).bind(this)();
         this.$http.post('/judgement/AI',
        {"search":this.input , "offset":0,"top_n": 5,},{emulateJSON : true}).then(res => {
         // 响应成功回调
        this.doc_list = res.data.data.doc_list;
        console.log(this.doc_list);
        this.q_id = res.data.data.q_id;
        console.log(this.q_id);
       window.sessionStorage.setItem('content', JSON.stringify(this.listData));
       this.start = this.end;
       this.end += 5;
      }).catch(err =>  {
        console.log(err);
         // 响应错误回调    
      });
      } else {
        this.$message({
          type: 'info',
          message: '请输入语义检索详细内容'
        }); 
      }
    },
    getMore(){
     /*  var times = 20;
      this.$options.methods.countClickedTimes(times).bind(this)();
      this.$options.methods.inquire(times).bind(this)(); */
      this.$http.post('/judgement/AI',
        {"search":this.input ,"offset":this.start,"top_n":this.end},{emulateJSON : true}).then(res => {
        // 响应成功回调
       this.doc_list =  this.doc_list.concat(res.data.data.doc_list);
        console.log(this.doc_list);
        this.q_id = res.data.data.q_id;
        console.log(this.q_id);
       window.sessionStorage.setItem('content', JSON.stringify(this.listData));
       let mid=this.start;
       this.start = this.end;
       this.end += this.end-mid;
      }).catch(err =>  {
        console.log(err);
        // 响应错误回调    
      });
      },
    //点击次数
   /*  countClickedTimes(){  
      times =+10;  
      }*/
  }
};
</script>

<style  lang="scss">
.semanticlist {
  font-family: "仿宋", serif;
  .header {
    background: #1890ff !important;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.28);
    height: 64px;
    min-width:1440px; 
    img {
      height: 24px;
      width: 177px;
      vertical-align: middle;
      margin: 20px 0 0 200px;
      cursor: pointer;
    }
  }
  main {
    position: relative;
    width: 1152px;
    height: 288px;
    margin: 24px auto 0;
    background: rgba(0, 0, 0, 0.04);
    .el-textarea__inner {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      font-size: 16px;
      line-height: 24px;
      font-family: PingFangSC-Regular;
      color: rgba(0, 0, 0, 0.45);
      height: 240px;
      &:hover {
        box-shadow: 0 1px 2px 0;
      }
    }
    .inputbox {
      position: absolute;
      top: 24px;
      height: 240px;
      width: 976px;
      margin: 0px 8px 24px 24px;
    }
    .clear {
      position: absolute;
      top: 24px;
      left: 1008px;
      width: 120px;
      height: 84px;
      margin: 0;
      button {
        font-size: 20px;
        font-family: PingFangSC-Medium;
        color: rgba(0, 0, 0, 0.65);
        letter-spacing: 0;
        line-height: 28px;
        width: 120px;
        height: 84px;
        margin: 0;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        &:hover {
          background: #fafafa;
        }
      }
    }
    .search {
      position: absolute;
      top: 116px;
      left: 1008px;
      width: 120px;
      height: 148px;
      border:0;
      button {
        font-size: 20px;
        font-family: PingFangSC-Medium;
        color: #ffffff;
        width: 120px;
        height: 148px;
        background: #1890ff;
        border-radius: 2px;
        border:0;
        &:hover {
          background: #096dd9;
        }
      }
    }
  }
  #filling{
    height: 260px;
    width: 100%;
  }
  section {
    margin: 0 auto;
    display: none;
    .result-top {
      width: 1440px;
      height: 138px;
      margin: 0 auto;
      position: relative;
      .title-left {
        position: absolute;
        left: 144px;
        top: 68px;
        background: rgba(0, 0, 0, 0.09);
        height: 2px;
        width: 33px;
      }
      .result-title {
        position: absolute;
        left: 200px;
        top: 48px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: rgba(0, 0, 0, 0.65);
        letter-spacing: 0;
      }
      .title-right {
        position: absolute;
        left: 404px;
        top: 68px;
        background: rgba(0, 0, 0, 0.09);
        height: 2px;
        width: 892px;
      }
    }
    .result-bottom {
      width: 1152px;
      // height:1800px;
      margin: 0 auto;
      position: relative;
      .more {
        position:relative;
        width: 1152px;
        height: 48px;
        &:hover {
          .icon {
            background-image: url(../assets/images/more-icon.jpg);
          }
          .word {
            color: #1890ff;
          }
        }
        button{
          width: 100%;
        height:100%;
         margin: 0 auto;
        background: rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(0, 0, 0, 0.09);
        border-radius: 4px;
        cursor: pointer !important;
        }
        .icon {
          position: absolute;
          width: 14px;
          height: 8px;
          top: 20px;
          left: 534px;
          background-image: url(../assets/images/more-icon2.jpg);
        }
        .word {
          position: absolute;
          top: 16px;
          left: 554px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
          letter-spacing: 0;
          line-height: 16px;
        }
      }
    }
  }
  footer {
   
    bottom: 0px;
    width: 100%;
    min-width:1440px;
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
