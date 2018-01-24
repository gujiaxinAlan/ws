<template>
  <div class="semantic">
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
              v-model.trim="input"
              @change="handleChange"
              @keydown.native.enter="handleIconClick"
              prop="context">
            </el-input>          
      </div>  
      <div class="clear">
        <button @click="reset">清除</button>
      </div>  
      <div class="search">
        <button   @click="handleIconClick">搜索</button>
      </div>  
    </main>
    
  </div>
</template>

<script>

export default {
  name: "semantic",
  components: {
  },

  data() {
    return {
      num: 0,
      filter: '',
      temp: [],
      input: '',
    };
  },

  methods: {
    // window.document.querySelector('.el-input__inner').focus();
      reset() {
        this.input = '';
        this.num = 0;
      },
    handleChange() {
        if (!this.input) {
          this.num = 0;
        }
      },
     // 跳转到列表页
    handleIconClick() {
      if (this.input) {
        this.input = this.input.trim();
        this.num = 0;
//        this.$router.push({name: 'semanticlist', params: {keywords: this.input}});
        window.sessionStorage.setItem('key', this.input);
        window.localStorage.setItem('key', this.input);
        this.$router.push({name: 'semanticlist'})
      } else {
        this.$message({
          type: 'info',
          message: '请输入语义检索详细内容'
        });
      }
    },
  }
};
</script>

<style  lang="scss">
.semantic {
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
      margin: 20px 0 0 24px;
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
 
  footer {
    position: absolute;
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